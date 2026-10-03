export type Language = "en" | "hi" | "mr";

export interface Translations {
  appName: string;
  subtitle: string;
  nav: {
    home: string;
    search: string;
    reader: string;
    timeline: string;
    map: string;
    graph: string;
    stories: string;
    media: string;
    assistant: string;
    quoteVerifier: string;
    myCollection: string;
    kioskMode: string;
    displayWall: string;
    admin: string;
    accessibility: string;
    back: string;
    ask: string;
  };
  kiosk: {
    touchToBegin: string;
    chooseLanguage: string;
    idleWarning: string;
    idleCountdown: string;
    sessionWillReset: string;
    imStillHere: string;
    resetNow: string;
    attractTitle: string;
    attractSubtitle: string;
  };
  reader: {
    originalScan: string;
    ocrText: string;
    zoomIn: string;
    zoomOut: string;
    resetZoom: string;
    toggleTranslation: string;
    aiSummary: string;
    listenTTS: string;
    citeItem: string;
    addToCollection: string;
    addedToCollection: string;
    page: string;
    of: string;
    confidence: string;
    scholarlyProvenance: string;
  };
  search: {
    placeholder: string;
    voiceSearch: string;
    suggestedTopics: string;
    filters: string;
    allTypes: string;
    resultsFound: string;
    noResults: string;
  };
  assistant: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    send: string;
    modeScholarly: string;
    modeSimple: string;
    citations: string;
    verifiedGrounded: string;
    sampleQuestions: string[];
  };
  quoteVerifier: {
    title: string;
    subtitle: string;
    placeholder: string;
    verifyButton: string;
    verdictVerified: string;
    verdictSimilar: string;
    verdictNotFound: string;
    disclaimer: string;
  };
  accessibility: {
    title: string;
    textSize: string;
    normal: string;
    large: string;
    extraLarge: string;
    highContrast: string;
    reducedMotion: string;
    audioFirst: string;
    oneHandReach: string;
    close: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: "AmbedkarVerse",
    subtitle: "AI-Powered Institutional Digital Heritage Archive",
    nav: {
      home: "Home Hub",
      search: "Search & Discovery",
      reader: "Archival Reader",
      timeline: "Timeline (1891–1956)",
      map: "Historic Places",
      graph: "Knowledge Graph",
      stories: "Curated Stories",
      media: "Audio / Video",
      assistant: "AI Assistant",
      quoteVerifier: "Quote Verifier",
      myCollection: "My Collection",
      kioskMode: "Kiosk Mode",
      displayWall: "Display Wall",
      admin: "Archivist Console",
      accessibility: "Accessibility",
      back: "Back",
      ask: "Ask AI"
    },
    kiosk: {
      touchToBegin: "Touch Anywhere to Begin",
      chooseLanguage: "Choose Your Language / भाषा चुनें / भाषा निवडा",
      idleWarning: "Are you still exploring?",
      idleCountdown: "Session will reset in {seconds} seconds",
      sessionWillReset: "To protect your privacy, the kiosk clears personal collections after idle timeout.",
      imStillHere: "I'm Still Here",
      resetNow: "Reset Session Now",
      attractTitle: "Dr. B. R. Ambedkar Digital Heritage Archive",
      attractSubtitle: "Explore manuscripts, debates, and historical speeches with verified citations."
    },
    reader: {
      originalScan: "Digitized 600 DPI Scan",
      ocrText: "Transcribed OCR Text",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      resetZoom: "Reset",
      toggleTranslation: "Translate Text",
      aiSummary: "AI Summary",
      listenTTS: "Listen (TTS)",
      citeItem: "Export Citation",
      addToCollection: "Save to Collection",
      addedToCollection: "Saved to Collection",
      page: "Page",
      of: "of",
      confidence: "OCR Confidence",
      scholarlyProvenance: "Scholarly Provenance & Authority"
    },
    search: {
      placeholder: "Search Dr. Ambedkar's writings, Constituent Assembly debates, speeches...",
      voiceSearch: "Voice Search (Bhashini)",
      suggestedTopics: "Suggested Topics:",
      filters: "Filter by Media Type",
      allTypes: "All Types",
      resultsFound: "records found in verified archive",
      noResults: "No primary source records found matching query."
    },
    assistant: {
      title: "Grounded AI Research Assistant",
      subtitle: "Answers generated strictly from primary sources (BAWS Vol. 1–22 & CAD). Zero hallucination.",
      inputPlaceholder: "Ask a constitutional or archival question...",
      send: "Ask Assistant",
      modeScholarly: "Scholarly Mode",
      modeSimple: "Explain Simply",
      citations: "Verified Source Citations:",
      verifiedGrounded: "100% Grounded in Primary Sources",
      sampleQuestions: [
        "Why did Dr. Ambedkar describe Article 32 as the heart and soul of the Constitution?",
        "What was Dr. Ambedkar's role in the establishment of the Reserve Bank of India?",
        "Explain the key principles of the Mahad Chavdar Tale Satyagraha in 1927."
      ]
    },
    quoteVerifier: {
      title: "Archival Quote Verifier",
      subtitle: "Paste any attributed quotation to verify its authenticity against Dr. Ambedkar's collected works.",
      placeholder: "Paste quote here, e.g., 'Caste is not just a division of labour, it is a division of labourers.'",
      verifyButton: "Verify Against Archive",
      verdictVerified: "Verified Authentic Quote",
      verdictSimilar: "Similar Passage Found",
      verdictNotFound: "Not Found in Primary Sources",
      disclaimer: "Our repository strictly flags fake or misattributed quotes to preserve historical truth."
    },
    accessibility: {
      title: "Accessibility Settings (WCAG 2.2 AA)",
      textSize: "Text Sizing",
      normal: "Default",
      large: "Large (120%)",
      extraLarge: "Extra Large (140%)",
      highContrast: "High Contrast Mode",
      reducedMotion: "Reduce Motion & Animations",
      audioFirst: "Audio-First Narration",
      oneHandReach: "One-Hand Reach Mode (Lower 50%)",
      close: "Save & Close"
    }
  },
  hi: {
    appName: "आंबेडकरवर्स (AmbedkarVerse)",
    subtitle: "एआई-संचालित डिजिटल विरासत एवं अभिलेखागार मंच",
    nav: {
      home: "मुख्य केंद्र",
      search: "खोज एवं अन्वेषण",
      reader: "अभिलेख पाठक",
      timeline: "कालक्रम (1891–1956)",
      map: "ऐतिहासिक स्थल",
      graph: "ज्ञान मानचित्र",
      stories: "विशेष कथाएं",
      media: "ऑडियो / वीडियो",
      assistant: "एआई सहायक",
      quoteVerifier: "उद्धरण सत्यापक",
      myCollection: "मेरा संग्रह",
      kioskMode: "कियोस्क मोड",
      displayWall: "स्मार्ट डिस्प्ले वॉल",
      admin: "अभिलेखागार कंसोल",
      accessibility: "सुलभता सेटिंग्स",
      back: "पीछे जाएं",
      ask: "एआई से पूछें"
    },
    kiosk: {
      touchToBegin: "प्रारंभ करने के लिए कहीं भी स्पर्श करें",
      chooseLanguage: "अपनी भाषा चुनें",
      idleWarning: "क्या आप अभी भी अध्ययन कर रहे हैं?",
      idleCountdown: "सत्र {seconds} सेकंड में रीसेट हो जाएगा",
      sessionWillReset: "आपकी गोपनीयता की रक्षा के लिए कियोस्क निष्क्रियता के बाद व्यक्तिगत डेटा को हटा देता है।",
      imStillHere: "मैं यहीं हूँ",
      resetNow: "अभी रीसेट करें",
      attractTitle: "डॉ. बी. आर. आंबेडकर डिजिटल विरासत अभिलेखागार",
      attractSubtitle: "सत्यापित संदर्भों के साथ मूल पांडुलिपियों, संविधान सभा बहसों और भाषणों का अन्वेषण करें।"
    },
    reader: {
      originalScan: "मूल 600 डीपीआई स्कैन",
      ocrText: "लिप्यांतरित पाठ (OCR)",
      zoomIn: "बड़ा करें",
      zoomOut: "छोटा करें",
      resetZoom: "रीसेट",
      toggleTranslation: "हिंदी में पढ़ें",
      aiSummary: "एआई सारांश",
      listenTTS: "सुनें (भाषिणी)",
      citeItem: "उद्धरण निर्यात करें",
      addToCollection: "संग्रह में जोड़ें",
      addedToCollection: "संग्रह में सहेजा गया",
      page: "पृष्ठ",
      of: "का",
      confidence: "ओसीआर विश्वसनीयता",
      scholarlyProvenance: "प्रामाणिक ऐतिहासिक स्रोत"
    },
    search: {
      placeholder: "डॉ. आंबेडकर के लेखन, संविधान सभा बहसों और ऐतिहासिक भाषणों में खोजें...",
      voiceSearch: "ध्वनि खोज (भाषिणी)",
      suggestedTopics: "सुझाए गए विषय:",
      filters: "माध्यम प्रकार से फ़िल्टर करें",
      allTypes: "सभी प्रकार",
      resultsFound: "सत्यापित अभिलेख मिले",
      noResults: "खोजे गए शब्दों से संबंधित कोई अभिलेख नहीं मिला।"
    },
    assistant: {
      title: "सत्यापित एआई शोध सहायक",
      subtitle: "केवल प्रमाणित प्राथमिक स्रोतों (BAWS खंड 1-22 और CAD) से उत्तर। शून्य भ्रांति।",
      inputPlaceholder: "संवैधानिक या अभिलेखीय प्रश्न पूछें...",
      send: "पूछें",
      modeScholarly: "विद्वत्तापूर्ण शैली",
      modeSimple: "सरल भाषा में",
      citations: "सत्यापित स्रोत संदर्भ:",
      verifiedGrounded: "100% प्राथमिक स्रोतों पर आधारित",
      sampleQuestions: [
        "डॉ. आंबेडकर ने अनुच्छेद 32 को संविधान की आत्मा और हृदय क्यों कहा?",
        "भारतीय रिज़र्व बैंक की स्थापना में डॉ. आंबेडकर की क्या भूमिका थी?",
        "1927 के महाड चवदार तालाब सत्याग्रह के प्रमुख सिद्धांत क्या थे?"
      ]
    },
    quoteVerifier: {
      title: "अभिलेखीय उद्धरण सत्यापक",
      subtitle: "डॉ. आंबेडकर के नाम से उद्धृत किसी भी वाक्य को प्रमाणित करने के लिए यहाँ चिपकाएँ।",
      placeholder: "उद्धरण यहाँ पेस्ट करें...",
      verifyButton: "अभिलेख से सत्यापित करें",
      verdictVerified: "सत्यापित प्रामाणिक उद्धरण",
      verdictSimilar: "समान विचार अभिलेख में उपलब्ध",
      verdictNotFound: "प्राथमिक स्रोतों में नहीं मिला",
      disclaimer: "ऐतिहासिक सत्य की रक्षा के लिए भ्रामक अथवा मनगढ़ंत उद्धरणों को तुरंत चिन्हित किया जाता है।"
    },
    accessibility: {
      title: "सुलभता सेटिंग्स (WCAG 2.2 AA / GIGW 3.0)",
      textSize: "अक्षर का आकार",
      normal: "सामान्य",
      large: "बड़ा (120%)",
      extraLarge: "अति विशाल (140%)",
      highContrast: "उच्च कंट्रास्ट मोड",
      reducedMotion: "एनीमेशन कम करें",
      audioFirst: "ऑडियो-प्रथम वाचन",
      oneHandReach: "एक-हाथ पहुंच मोड (निचला 50%)",
      close: "सहेजें और बंद करें"
    }
  },
  mr: {
    appName: "आंबेडकरव्हर्स (AmbedkarVerse)",
    subtitle: "एआय-सक्षम डिजिटल वारसा व राष्ट्रीय अभिलेखागार",
    nav: {
      home: "मुख्य दालन",
      search: "शोध व अन्वेषण",
      reader: "अभिलेख वाचक",
      timeline: "जीवनप्रवास (1891–1956)",
      map: "ऐतिहासिक स्थळे",
      graph: "ज्ञान आलेख",
      stories: "विशेष गाथा",
      media: "ध्वनी / चित्रफीत",
      assistant: "एआय सहाय्यक",
      quoteVerifier: "विधान पडताळणी",
      myCollection: "माझा संग्रह",
      kioskMode: "किओस्क मोड",
      displayWall: "स्मार्ट डिस्प्ले वॉल",
      admin: "अभिलेखागार नियंत्रक",
      accessibility: "सुलभता सुविधा",
      back: "मागे",
      ask: "एआय ला विचारा"
    },
    kiosk: {
      touchToBegin: "सुरू करण्यासाठी कुठेही स्पर्श करा",
      chooseLanguage: "आपली भाषा निवडा",
      idleWarning: "आपण अजूनही वाचन करत आहात का?",
      idleCountdown: "सत्र {seconds} सेकंदात रीसेट होईल",
      sessionWillReset: "आपल्या गोपनीयतेसाठी किओस्क निष्क्रियतेनंतर वैयक्तिक संग्रह पुसून टाकते.",
      imStillHere: "मी इथेच आहे",
      resetNow: "आत्ताच रीसेट करा",
      attractTitle: "डॉ. बाबासाहेब आंबेडकर डिजिटल वारसा अभिलेखागार",
      attractSubtitle: "सत्यापित संदर्भांसह हस्तलिखिते, घटना समिती चर्चा आणि ऐतिहासिक भाषणांचे अवलोकन करा."
    },
    reader: {
      originalScan: "मूळ 600 DPI स्कॅन",
      ocrText: "रूपांतरित मजकूर (OCR)",
      zoomIn: "मोठे करा",
      zoomOut: "लहान करा",
      resetZoom: "मूळ आकार",
      toggleTranslation: "मराठीत वाचा",
      aiSummary: "एआय सारांश",
      listenTTS: "ऐका (भाषिणी)",
      citeItem: "संदर्भ निर्यात करा",
      addToCollection: "संग्रहात साठवा",
      addedToCollection: "संग्रहात साठवले",
      page: "पृष्ठ",
      of: "पैकी",
      confidence: "ओसीआर अचूकता",
      scholarlyProvenance: "अधिकृत ऐतिहासिक संदर्भ"
    },
    search: {
      placeholder: "डॉ. आंबेडकरांचे लेखन, घटना समिती चर्चा, भाषणांमध्ये शोधा...",
      voiceSearch: "आवाज शोध (भाषिणी)",
      suggestedTopics: "सुचवलेले विषय:",
      filters: "माध्यम प्रकारानुसार निवडा",
      allTypes: "सर्व प्रकार",
      resultsFound: "दस्तऐवज सापडले",
      noResults: "शोधलेल्या शब्दांशी संबंधित दस्तऐवज सापडला नाही."
    },
    assistant: {
      title: "सत्यापित एआय संशोधन सहाय्यक",
      subtitle: "केवळ अधिकृत प्राथमिक संदर्भांवर (BAWS खंड 1-22 आणि CAD) आधारित उत्तरे. शून्य चुकीची माहिती.",
      inputPlaceholder: "घटनात्मक किंवा ऐतिहासिक प्रश्न विचारा...",
      send: "विचारा",
      modeScholarly: "अभ्यासपूर्ण शैली",
      modeSimple: "सोप्या भाषेत",
      citations: "सत्यापित संदर्भ:",
      verifiedGrounded: "100% प्राथमिक दस्तऐवजांवर आधारित",
      sampleQuestions: [
        "डॉ. बाबासाहेब आंबेडकरांनी कलम 32 ला संविधानाचा आत्मा आणि हृदय का म्हटले?",
        "रिझर्व्ह बँक ऑफ इंडियाच्या स्थापनेमध्ये डॉ. आंबेडकरांचे काय योगदान होते?",
        "1927 च्या महाड चवदार तळे सत्याग्रहाची प्रमुख तत्त्वे स्पष्ट करा."
      ]
    },
    quoteVerifier: {
      title: "अभिलेखीय विधान पडताळणी",
      subtitle: "डॉ. बाबासाहेब आंबेडकरांच्या नावावर असलेले कोणतेही विधान पडताळून पाहण्यासाठी येथे टाका.",
      placeholder: "येथे विधान पेस्ट करा...",
      verifyButton: "अभिलेखातून पडताळा",
      verdictVerified: "सत्यापित अस्सल विधान",
      verdictSimilar: "समान विचार अभिलेखात उपलब्ध",
      verdictNotFound: "प्राथमिक संदर्भांमध्ये आढळले नाही",
      disclaimer: "ऐतिहासिक सत्याचे जतन करण्यासाठी खोट्या व काल्पनिक विधानांना तात्काळ सूचित केले जाते."
    },
    accessibility: {
      title: "सुलभता सुविधा (WCAG 2.2 AA / GIGW 3.0)",
      textSize: "फॉन्ट आकार",
      normal: "सामान्य",
      large: "मोठा (120%)",
      extraLarge: "अति मोठा (140%)",
      highContrast: "हाय कॉन्ट्रास्ट मोड",
      reducedMotion: "अ‍ॅनिमेशन कमी करा",
      audioFirst: "ऑडिओ-प्रथम वाचन",
      oneHandReach: "एका हाताने वापर मोड (खालील 50%)",
      close: "जतन करा आणि बंद करा"
    }
  }
};
