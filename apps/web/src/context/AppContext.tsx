"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, TRANSLATIONS, Translations } from "@/lib/i18n";

export interface CollectionItem {
  id: string;
  title: string;
  source: string;
  type: string;
  category?: string;
  quote?: string;
  date?: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  toggleHighContrast: () => void;
  textScale: "normal" | "large" | "extraLarge";
  setTextScale: (val: "normal" | "large" | "extraLarge") => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  audioFirst: boolean;
  setAudioFirst: (val: boolean) => void;
  oneHandReach: boolean;
  setOneHandReach: (val: boolean) => void;
  isAccessibilityOpen: boolean;
  setIsAccessibilityOpen: (val: boolean) => void;
  myCollection: CollectionItem[];
  savedItems: CollectionItem[];
  addToCollection: (item: CollectionItem) => void;
  removeFromCollection: (id: string) => void;
  removeSavedItem: (id: string) => void;
  clearCollection: () => void;
  kioskMode: boolean;
  setKioskMode: (val: boolean) => void;
  isIdleWarning: boolean;
  idleCountdown: number;
  resetIdleTimer: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [highContrast, setHighContrast] = useState(false);
  const [textScale, setTextScale] = useState<"normal" | "large" | "extraLarge">("normal");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [audioFirst, setAudioFirst] = useState(false);
  const [oneHandReach, setOneHandReach] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [myCollection, setMyCollection] = useState<CollectionItem[]>([]);
  const [kioskMode, setKioskModeState] = useState(false);
  const [isIdleWarning, setIsIdleWarning] = useState(false);
  const [idleCountdown, setIdleCountdown] = useState(30);

  // Sync language with localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("ambedkarverse_lang") as Language;
    if (saved && (saved === "en" || saved === "hi" || saved === "mr")) {
      setLanguageState(saved);
    }
    const savedColl = localStorage.getItem("ambedkarverse_collection");
    if (savedColl) {
      try {
        setMyCollection(JSON.parse(savedColl));
      } catch (e) {}
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("ambedkarverse_lang", lang);
  };

  const addToCollection = (item: CollectionItem) => {
    setMyCollection((prev) => {
      if (prev.some((x) => x.id === item.id)) return prev;
      const updated = [...prev, item];
      localStorage.setItem("ambedkarverse_collection", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCollection = (id: string) => {
    setMyCollection((prev) => {
      const updated = prev.filter((x) => x.id !== id);
      localStorage.setItem("ambedkarverse_collection", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCollection = () => {
    setMyCollection([]);
    localStorage.removeItem("ambedkarverse_collection");
  };

  // Sync highContrast & reducedMotion with document.documentElement
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("high-contrast", highContrast);
    }
  }, [highContrast]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("motion-reduce", reducedMotion);
    }
  }, [reducedMotion]);

  // Check initial route or session for kiosk mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname.startsWith("/kiosk") || sessionStorage.getItem("ambedkarverse_kiosk") === "true") {
        setKioskMode(true);
      }
    }
  }, []);

  const setKioskMode = (val: boolean) => {
    setKioskModeState(val);
    if (typeof window !== "undefined") {
      if (val) sessionStorage.setItem("ambedkarverse_kiosk", "true");
      else sessionStorage.removeItem("ambedkarverse_kiosk");
    }
  };

  // Kiosk Idle Detection: 60s idle triggers warning, 90s wipes session
  const warningTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = React.useCallback(() => {
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const startTimers = React.useCallback(() => {
    clearAllTimers();
    setIsIdleWarning(false);
    setIdleCountdown(30);

    if (!kioskMode) return;

    // 60s idle -> show warning modal with countdown
    warningTimerRef.current = setTimeout(() => {
      setIsIdleWarning(true);
      let remaining = 30;
      setIdleCountdown(30);

      countdownIntervalRef.current = setInterval(() => {
        remaining -= 1;
        setIdleCountdown(remaining);
        if (remaining <= 0) {
          clearAllTimers();
          setIsIdleWarning(false);
          clearCollection();
          if (typeof window !== "undefined") {
            window.location.href = "/kiosk";
          }
        }
      }, 1000);
    }, 60000);
  }, [kioskMode, clearAllTimers]);

  const resetIdleTimer = React.useCallback(() => {
    startTimers();
  }, [startTimers]);

  useEffect(() => {
    if (!kioskMode) {
      clearAllTimers();
      setIsIdleWarning(false);
      return;
    }

    const handleUserActivity = () => {
      // Don't auto-reset while warning modal is explicitly awaiting user action
      if (!isIdleWarning) {
        startTimers();
      }
    };

    window.addEventListener("pointerdown", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);
    startTimers();

    return () => {
      clearAllTimers();
      window.removeEventListener("pointerdown", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
    };
  }, [kioskMode, isIdleWarning, startTimers, clearAllTimers]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        highContrast,
        setHighContrast,
        toggleHighContrast: () => setHighContrast((prev) => !prev),
        textScale,
        setTextScale,
        reducedMotion,
        setReducedMotion,
        audioFirst,
        setAudioFirst,
        oneHandReach,
        setOneHandReach,
        isAccessibilityOpen,
        setIsAccessibilityOpen,
        myCollection,
        savedItems: myCollection,
        addToCollection,
        removeFromCollection,
        removeSavedItem: removeFromCollection,
        clearCollection,
        kioskMode,
        setKioskMode,
        isIdleWarning,
        idleCountdown,
        resetIdleTimer,
      }}
    >
      <div
        className={`${highContrast ? "high-contrast" : ""} ${
          textScale === "large" ? "text-lg" : textScale === "extraLarge" ? "text-xl" : ""
        } ${reducedMotion ? "motion-reduce" : ""}`}
      >
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
