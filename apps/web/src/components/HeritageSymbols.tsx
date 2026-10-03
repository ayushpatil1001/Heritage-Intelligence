"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

/**
 * 24-spoke Ashoka Chakra (Dharma Wheel) Emblem
 */
export function AshokaChakra({ className = "text-primary", size = 32, animate = false }: IconProps) {
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  const content = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Ashoka Chakra 24-Spoke Dharma Wheel"
    >
      {/* Outer Rim */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
      {/* Inner Hub */}
      <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.15" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
      {/* 24 Spokes */}
      {spokes.map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="50"
          x2="50"
          y2="9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );

  if (animate) {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="inline-flex items-center justify-center shrink-0"
      >
        {content}
      </motion.div>
    );
  }

  return <div className="inline-flex items-center justify-center shrink-0">{content}</div>;
}

/**
 * Scales of Justice (Constitutional Morality & Rule of Law)
 */
export function ScalesOfJustice({ className = "text-accent", size = 32 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Scales of Constitutional Justice"
    >
      {/* Central Pillar */}
      <rect x="30.5" y="10" width="3" height="42" rx="1.5" fill="currentColor" />
      <path d="M22 56H42V52H22V56Z" fill="currentColor" />
      <circle cx="32" cy="10" r="4" fill="currentColor" />
      {/* Balance Beam */}
      <path d="M12 18C12 17.4477 12.4477 17 13 17H51C51.5523 17 52 17.4477 52 18V19C52 19.5523 51.5523 20 51 20H13C12.4477 20 12 19.5523 12 19V18Z" fill="currentColor" />
      {/* Left Pan Chains & Pan */}
      <line x1="16" y1="20" x2="9" y2="34" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="20" x2="27" y2="34" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 34C7 40 29 40 29 34H7Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
      {/* Right Pan Chains & Pan */}
      <line x1="44" y1="20" x2="37" y2="34" stroke="currentColor" strokeWidth="1.5" />
      <line x1="48" y1="20" x2="55" y2="34" stroke="currentColor" strokeWidth="1.5" />
      <path d="M35 34C35 40 57 40 57 34H35Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/**
 * Constitutional Quill Pen & Open Parchment Folio
 */
export function ConstitutionalQuill({ className = "text-primary", size = 32 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Constitutional Quill and Drafting Folio"
    >
      {/* Open Parchment Book */}
      <path d="M8 44C16 41 26 41 32 46C38 41 48 41 56 44V18C48 15 38 15 32 20C26 15 16 15 8 18V44Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
      <line x1="32" y1="20" x2="32" y2="46" stroke="currentColor" strokeWidth="2.5" />
      {/* Feathery Quill */}
      <path d="M52 8C50 14 44 26 34 32L32 30C36 22 42 14 52 8Z" fill="currentColor" />
      <path d="M34 32L30 38L32 30L34 32Z" fill="currentColor" />
      <path d="M42 16C46 19 46 22 44 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Lion Capital / National Seal Motif (Government of India / DAIC)
 */
export function LionCapital({ className = "text-accent", size = 32 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="State Emblem of India Lion Capital Silhouette"
    >
      {/* Abacus Base */}
      <rect x="14" y="52" width="36" height="5" rx="1.5" fill="currentColor" />
      <rect x="18" y="47" width="28" height="5" rx="1" fill="currentColor" fillOpacity="0.4" />
      <circle cx="32" cy="49.5" r="2.5" fill="currentColor" />
      {/* Central Lion Silhouette */}
      <path d="M32 12C36 12 39 15 39 19C39 23 37 26 38 29C39 33 41 37 41 43H23C23 37 25 33 26 29C27 26 25 23 25 19C25 15 28 12 32 12Z" fill="currentColor" />
      {/* Left Facing Lion Silhouette */}
      <path d="M25 20C22 20 18 22 17 26C16 30 18 36 21 41L23 43C22 36 22 30 25 20Z" fill="currentColor" fillOpacity="0.75" />
      {/* Right Facing Lion Silhouette */}
      <path d="M39 20C42 20 46 22 47 26C48 30 46 36 43 41L41 43C42 36 42 30 39 20Z" fill="currentColor" fillOpacity="0.75" />
      {/* Crown / Top Mane */}
      <circle cx="32" cy="14" r="3" fill="currentColor" />
    </svg>
  );
}

/**
 * Sacred Bodhi Leaf (Philosophy of Liberation & Universal Dhamma)
 */
export function BodhiLeaf({ className = "text-emerald-700", size = 32 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Sacred Bodhi Leaf Motif"
    >
      {/* Heart-shaped leaf with extended slender tip */}
      <path
        d="M32 6C32 6 20 22 12 34C6 43 12 56 24 56C28 56 32 52 32 52C32 52 36 56 40 56C52 56 58 43 52 34C44 22 32 6 32 6Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Midrib & Veins */}
      <path d="M32 10V52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 24C26 21 21 23 18 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 24C38 21 43 23 46 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 34C24 32 18 35 15 39" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 34C40 32 46 35 49 39" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 44C26 43 22 45 20 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 44C38 43 42 45 44 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Torch of Liberty & Civil Rights (Mahad Satyagraha Flame)
 */
export function TorchOfLiberty({ className = "text-amber-600", size = 32 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Torch of Liberty and Human Rights"
    >
      {/* Handle */}
      <path d="M28 34L26 56H38L36 34H28Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {/* Torch Cup */}
      <path d="M22 28L25 34H39L42 28H22Z" fill="currentColor" />
      {/* Multi-layered Flame */}
      <path
        d="M32 6C32 6 38 12 38 18C38 22 36 24 38 26C35 27 30 25 30 22C28 25 24 25 24 20C24 14 32 6 32 6Z"
        fill="currentColor"
        fillOpacity="0.8"
      />
      <path
        d="M32 14C32 14 35 18 35 22C35 24 33 25 32 26C31 25 30 23 30 22C30 19 32 14 32 14Z"
        fill="#FFE885"
      />
    </svg>
  );
}
