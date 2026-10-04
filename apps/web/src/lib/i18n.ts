export type Language = "en" | "hi" | "mr";

export interface Translations {
  appName: string;
  subtitle: string;
  common: {
    back: string;
    search: string;
    close: string;
    explore: string;
    loading: string;
    error: string;
    success: string;
    save: string;
    saved: string;
    remove: string;
    copied: string;
    copy: string;
    date: string;
    category: string;
    source: string;
    status: string;
    language: string;
    all: string;
    viewOriginal: string;
    readMore: string;
    inspectScan: string;
    readFolio: string;
    viewOnMap: string;
    openInTimeline: string;
    openInReader: string;
    verified: string;
    continue: string;
  };
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
    explore: string;
  };
  footer: {
    treatisesTitle: string;
    interactiveTitle: string;
    researchTitle: string;
    surfacesTitle: string;
    allTreatises: string;
    sitemap: string;
    robots: string;
    govMinistry: string;
    institution: string;
    hackathonTag: string;
  };
  home: {
    govBar: string;
    institution: string;
    ingestStatus: string;
    securityAudit: string;
    nationalArchiveBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    searchButton: string;
    stats: {
      bawsVolumes: string;
      bawsSub: string;
      scans: string;
      scansSub: string;
      span: string;
      spanSub: string;
      citations: string;
      citationsSub: string;
    };
    epochsTitle: string;
    epochsSubtitle: string;
    epochsBadge: string;
    epochs: Array<{
      title: string;
      subtitle: string;
      date: string;
      badge: string;
      description: string;
    }>;
    features: {
      readerTitle: string;
      readerDesc: string;
      timelineTitle: string;
      timelineDesc: string;
      assistantTitle: string;
      assistantDesc: string;
      verifierTitle: string;
      verifierDesc: string;
    };
    catalogTitle: string;
    catalogSubtitle: string;
    catalogCategories: {
      all: string;
      book: string;
      debate: string;
      speech: string;
      manuscript: string;
      photo: string;
      audio: string;
    };
    publicDomain: string;
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
    kioskHeaderTitle: string;
    touchSearchPlaceholder: string;
    highContrast: string;
    interactiveMode: string;
    listenSpeech: string;
    stopSpeech: string;
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
    transcriptTab: string;
    facsimileTab: string;
    splitTab: string;
    exportCitation: string;
    citationCopied: string;
    closeModal: string;
  };
  search: {
    title: string;
    subtitle: string;
    placeholder: string;
    voiceSearch: string;
    suggestedTopics: string;
    filters: string;
    allTypes: string;
    resultsFound: string;
    noResults: string;
    noResultsSuggestion: string;
    searching: string;
    matchScore: string;
    openPageInReader: string;
    categories: {
      all: string;
      book: string;
      debate: string;
      speech: string;
      manuscript: string;
    };
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
    zeroHallucination: string;
    yourInquiry: string;
    assistantName: string;
    verifiedCitationActive: string;
    sampleQuestions: string[];
    disclaimer: string;
  };
  quoteVerifier: {
    title: string;
    subtitle: string;
    inputLabel: string;
    placeholder: string;
    verifyButton: string;
    verdictVerified: string;
    verdictSimilar: string;
    verdictNotFound: string;
    disclaimer: string;
    matchConfidence: string;
    sourceAuthority: string;
    matchedExcerpt: string;
    sampleQuotes: Array<{ label: string; quote: string }>;
  };
  timeline: {
    title: string;
    subtitle: string;
    chronologicalArchive: string;
    dossierTitle: string;
    linkedRecords: string;
    inspectAssociated: string;
    categories: Record<string, string>;
  };
  map: {
    title: string;
    subtitle: string;
    scopeIndia: string;
    scopeGlobal: string;
    legendTitle: string;
    legendStruggles: string;
    legendEducation: string;
    legendGovernance: string;
    legendSpiritual: string;
    jumpTo: string;
    keyMilestones: string;
    connectedWork: string;
    readZoom: string;
  };
  graph: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterLabel: string;
    legendTitle: string;
    entityTypes: {
      all: string;
      person: string;
      place: string;
      concept: string;
      legislation: string;
      organization: string;
      work: string;
    };
    selectedDossier: string;
    connectedEntities: string;
    inspectCitations: string;
    canvasHint: string;
  };
  stories: {
    badge: string;
    title: string;
    subtitle: string;
    chapters: string;
    experienceButton: string;
    backToStories?: string;
    chapterProgress?: string;
    visualEssay?: string;
    prevChapter?: string;
    nextChapter?: string;
    archivalFacsimile?: string;
    authenticSource?: string;
    verifiedSource?: string;
    reference?: string;
    openDeepZoom?: string;
  };
  media: {
    title: string;
    subtitle: string;
    historicalAudio: string;
    chapterCuePoints: string;
    transcriptSearch: string;
    allSpeakers: string;
    ambedkarOnly: string;
    audioRecordings: string;
    historicalAudioBadge?: string;
    syncTranscript?: string;
    webvttActive?: string;
    clickToJump?: string;
    sourceArchives?: string;
    verifyInQuotes?: string;
  };
  collections: {
    badge: string;
    title: string;
    subtitle: string;
    printBibliography: string;
    exportToken: string;
    linkCopied: string;
    savedRecords: string;
    citationsGrounded: string;
    readSource: string;
    remove: string;
    emptyMessage: string;
    qrTitle: string;
    qrSubtitle: string;
  };
  display: {
    wallTitle: string;
    wallSubtitle: string;
    treatises: string;
    integrity: string;
    scans: string;
    visitors: string;
    fullscreen: string;
    exitPortal: string;
    listen: string;
    narrating: string;
    continueOnMobile: string;
    continueSub: string;
    launchKiosk: string;
    searchArchive: string;
  };
  admin: {
    consoleBadge: string;
    consoleTitle: string;
    consoleSubtitle: string;
    fixityIntegrity: string;
    hashesVerified: string;
    tabs: {
      ingest: string;
      ocr: string;
      metadata: string;
      preservation: string;
      kiosks: string;
    };
    uploadTitle?: string;
    uploadDesc?: string;
    uploadProcessing?: string;
    uploadButton?: string;
    livePipeline?: string;
    batches?: string;
    ingested?: string;
    ocrProcessing?: string;
    embeddings?: string;
    facsimileScan?: string;
    flagged?: string;
    flaggedNote?: string;
    correctionField?: string;
    devanagariLang?: string;
    editableText?: string;
    correctionNote?: string;
    correctionApproved?: string;
    approveButton?: string;
    dublinTitle?: string;
    dublinDesc?: string;
    metaSaved?: string;
    saveDublin?: string;
    premisTitle?: string;
    premisDesc?: string;
    runChecksumScan?: string;
    tableItemId?: string;
    tableTitle?: string;
    tableSha?: string;
    tableLastVerified?: string;
    tableStatus?: string;
    tableMatch?: string;
    kioskFleetTitle?: string;
    kioskFleetDesc?: string;
    openNewKiosk?: string;
    remoteReset?: string;
    inspectSurface?: string;
    location?: string;
    activeScreen?: string;
    lastPing?: string;
    battery?: string;
  };
  keyboard?: {
    touchKeyboard: string;
    backspace: string;
    del: string;
    space: string;
    search: string;
    close: string;
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
  switcher: {
    kioskTitle: string;
    wallTitle: string;
    kioskLabel: string;
    wallLabel: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: "AmbedkarVerse",
    subtitle: "AI-Powered Institutional Digital Heritage Archive",
    common: {
      back: "Back",
      search: "Search",
      close: "Close",
      explore: "Explore",
      loading: "Loading...",
      error: "An error occurred",
      success: "Success",
      save: "Save",
      saved: "Saved",
      remove: "Remove",
      copied: "Copied!",
      copy: "Copy",
      date: "Date",
      category: "Category",
      source: "Source",
      status: "Status",
      language: "Language",
      all: "All",
      viewOriginal: "View Original",
      readMore: "Read More",
      inspectScan: "Inspect Primary Scan",
      readFolio: "Read Folio",
      viewOnMap: "View on Map",
      openInTimeline: "Open in Timeline",
      openInReader: "Open in Reader",
      verified: "Verified",
      continue: "Continue",
    },
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
      ask: "Ask AI",
      explore: "Explore",
    },
    footer: {
      treatisesTitle: "Archival Treatises",
      interactiveTitle: "Interactive Discovery",
      researchTitle: "Grounded AI & Research",
      surfacesTitle: "Exhibition Surfaces & SEO",
      allTreatises: "All 30 Primary Works & Papers →",
      sitemap: "Sitemap XML",
      robots: "Robots TXT",
      govMinistry: "Ministry of Social Justice and Empowerment, Government of India",
      institution: "Dr. Ambedkar International Centre (DAIC)",
      hackathonTag: "Smart India Hackathon 2026 • Problem Statement ID 26096",
    },
    home: {
      govBar: "Government of India • Ministry of Social Justice & Empowerment",
      institution: "Dr. Ambedkar International Centre (DAIC)",
      ingestStatus: "Archive Ingest: 03/10/2026",
      securityAudit: "ISO/IEC 27001 • STQC Audited",
      nationalArchiveBadge: "National Digital Heritage Archive • PS 26096",
      heroTitle: "Dr. B. R. Ambedkar Digital Heritage Archive",
      heroSubtitle:
        "Preserving 22 authenticated volumes of Dr. Ambedkar Writings & Speeches (BAWS), verbatim Constituent Assembly Debates, synchronized historic audio recordings, and museum kiosk exhibits.",
      searchButton: "Search",
      stats: {
        bawsVolumes: "BAWS Volumes",
        bawsSub: "Complete Writings & Speeches",
        scans: "Facsimile Scans",
        scansSub: "600 DPI Archival Pages",
        span: "Chronological Span",
        spanSub: "Mhow to Mahaparinirvan",
        citations: "Grounded Citations",
        citationsSub: "Verifiable Primary Proof",
      },
      epochsTitle: "Pivotal Epochs & Constitutional Architecture",
      epochsSubtitle: "Milestones grounded in primary documents, speeches, and legal folios.",
      epochsBadge: "Curated Heritage Exhibits",
      epochs: [
        {
          title: "The Mahad Satyagraha",
          subtitle: "Water as a Universal Human Right",
          date: "20/03/1927",
          badge: "Civil Dignity",
          description:
            "Historic assertion of civic equality at Chavdar Lake, declaring public watering places open to all humanity.",
        },
        {
          title: "Architect of the Constitution",
          subtitle: "Constitution Hall Debates & Final Warning",
          date: "25/11/1949",
          badge: "Constitutional Law",
          description:
            "Dr. Ambedkar's monumental defense of Liberty, Equality, Fraternity and his prophetic warning against political Bhakti.",
        },
        {
          title: "Heart and Soul of the Constitution",
          subtitle: "Constituent Assembly Article 32 Intervention",
          date: "09/12/1948",
          badge: "Fundamental Rights",
          description:
            "The pivotal declaration that the right to constitutional remedies is the very core without which the charter is a nullity.",
        },
        {
          title: "Deekshabhoomi & Navayana",
          subtitle: "Spiritual Renaissance & Social Morality",
          date: "14/10/1956",
          badge: "Social Liberation",
          description:
            "Historic religious transformation in Nagpur, rejecting ritual hierarchy in favor of an egalitarian moral philosophy.",
        },
      ],
      features: {
        readerTitle: "Archival Reader",
        readerDesc: "Split OCR transcript beside 600 DPI original facsimile scans.",
        timelineTitle: "1891–1956 Timeline",
        timelineDesc: "25 milestones across 6 categories with dates in DD/MM/YYYY.",
        assistantTitle: "AI Assistant",
        assistantDesc: "Zero-hallucination RAG with mandatory document and page citations.",
        verifierTitle: "Quote Verifier",
        verifierDesc: "Paste attributed quotes to check authenticity against BAWS & CAD.",
      },
      catalogTitle: "Authenticated Primary Source Catalog",
      catalogSubtitle:
        "30 Seeded Public-Domain Records from Dr. Ambedkar Writings & Speeches (BAWS) and Constituent Assembly Debates",
      catalogCategories: {
        all: "All Types",
        book: "Books (BAWS)",
        debate: "CAD Debates",
        speech: "Speeches",
        manuscript: "Manuscripts",
        photo: "Photographs",
        audio: "Audio / Video",
      },
      publicDomain: "Public Domain",
    },
    kiosk: {
      touchToBegin: "Touch Anywhere to Begin",
      chooseLanguage: "Choose Your Language / भाषा चुनें / भाषा निवडा",
      idleWarning: "Are you still exploring?",
      idleCountdown: "Session will reset in {seconds} seconds",
      sessionWillReset:
        "To protect your privacy, the kiosk clears personal collections after idle timeout.",
      imStillHere: "I'm Still Here",
      resetNow: "Reset Session Now",
      attractTitle: "Dr. B. R. Ambedkar Digital Heritage Archive",
      attractSubtitle:
        "Explore manuscripts, debates, and historical speeches with verified citations.",
      kioskHeaderTitle: "Ambedkar Heritage Kiosk",
      touchSearchPlaceholder: "Touch here to search speeches, CAD debates, or writings...",
      highContrast: "High Contrast",
      interactiveMode: "Interactive Exhibition Mode",
      listenSpeech: "Listen (Speech Narration)",
      stopSpeech: "Stop Narration",
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
      scholarlyProvenance: "Scholarly Provenance & Authority",
      transcriptTab: "Transcript & Translation",
      facsimileTab: "Facsimile Scan",
      splitTab: "Split View",
      exportCitation: "Export Citation",
      citationCopied: "Citation copied to clipboard!",
      closeModal: "Close",
    },
    search: {
      title: "Cross-Lingual Archival Search",
      subtitle: "Cross-lingual hybrid search powered by BGE-M3 embeddings, BM25, and Reciprocal Rank Fusion.",
      placeholder: "Search Dr. Ambedkar's writings, Constituent Assembly debates, speeches...",
      voiceSearch: "Voice Search (Bhashini)",
      suggestedTopics: "Suggested Topics:",
      filters: "Filter by Media Type",
      allTypes: "All Types",
      resultsFound: "records found in verified archive",
      noResults: "No primary source records found matching query.",
      noResultsSuggestion: "Please try searching with broader keywords such as 'Article 32', 'Mahad', 'Rupee', or 'Caste'.",
      searching: "Searching archive...",
      matchScore: "Match Score",
      openPageInReader: "Open in Reader",
      categories: {
        all: "All Types",
        book: "Books",
        debate: "Debates",
        speech: "Speeches",
        manuscript: "Manuscripts",
      },
    },
    assistant: {
      title: "Grounded AI Research Assistant",
      subtitle:
        "Answers generated strictly from primary sources (BAWS Vol. 1–22 & CAD). Zero hallucination.",
      inputPlaceholder: "Ask a constitutional or archival question...",
      send: "Ask Assistant",
      modeScholarly: "Scholarly Mode",
      modeSimple: "Explain Simply",
      citations: "Verified Source Citations:",
      verifiedGrounded: "100% Grounded in Primary Sources",
      zeroHallucination: "Zero Hallucination Guaranteed",
      yourInquiry: "Your Inquiry",
      assistantName: "Grounded Archival Assistant",
      verifiedCitationActive: "Verified Citation Active",
      sampleQuestions: [
        "Why did Dr. Ambedkar describe Article 32 as the heart and soul of the Constitution?",
        "What was Dr. Ambedkar's role in the establishment of the Reserve Bank of India?",
        "Explain the key principles of the Mahad Chavdar Tale Satyagraha in 1927.",
      ],
      disclaimer: "All responses cite verified volume numbers, pages, and paragraph coordinates.",
    },
    quoteVerifier: {
      title: "Archival Quote Verifier",
      subtitle:
        "Paste any attributed quotation to verify its authenticity against Dr. Ambedkar's collected works.",
      inputLabel: "Enter Quote to Verify Against Primary Sources:",
      placeholder:
        "Paste quote here, e.g., 'Caste is not just a division of labour, it is a division of labourers.'",
      verifyButton: "Verify Against Archive",
      verdictVerified: "Verified Authentic Quote",
      verdictSimilar: "Similar Passage Found",
      verdictNotFound: "Not Found in Primary Sources",
      disclaimer:
        "Our repository strictly flags fake or misattributed quotes to preserve historical truth.",
      matchConfidence: "Match Confidence",
      sourceAuthority: "Source Authority",
      matchedExcerpt: "Matched Archival Excerpt",
      sampleQuotes: [
        { label: "Authentic Quote 1", quote: "Caste is not just a division of labour, it is a division of labourers." },
        { label: "Authentic Quote 2", quote: "It is the very soul of the Constitution and the very heart of it." },
        { label: "Authentic Quote 3", quote: "These methods are nothing but the Grammar of Anarchy." },
        { label: "Fake Quote Test", quote: "Success in life comes from waking up at 5 am and trading Bitcoin in financial markets." },
      ],
    },
    timeline: {
      title: "1891–1956 Life Timeline",
      subtitle: "25 authenticated milestones from 1891 birth in Mhow to the adoption of the Constitution and timeless legacy.",
      chronologicalArchive: "Chronological Archive (1891–1956)",
      dossierTitle: "Milestone Dossier",
      linkedRecords: "Linked Primary Archival Records:",
      inspectAssociated: "Inspect Associated Document Scan",
      categories: {
        All: "All Milestones",
        Education: "Education",
        "Social Reform": "Social Reform",
        Politics: "Politics",
        Constitution: "Constitution",
        Buddhism: "Buddhism",
        Legacy: "Legacy",
      },
    },
    map: {
      title: "Geospatial Heritage Map",
      subtitle: "Cartographic voyage across India, the UK, and the USA marking pivotal historical events.",
      scopeIndia: "Focused India Map",
      scopeGlobal: "Global Footprint (US & UK)",
      legendTitle: "Legend",
      legendStruggles: "Mass Struggles & Civil Rights",
      legendEducation: "Academic & Overseas Degrees",
      legendGovernance: "Constitutional & Statecraft",
      legendSpiritual: "Spiritual Rebirth (Deeksha)",
      jumpTo: "Jump to:",
      keyMilestones: "Key Milestones at this Site",
      connectedWork: "Connected Archival Work",
      readZoom: "Read original text & facsimile in Deep Zoom Reader",
    },
    graph: {
      title: "Semantic Knowledge Graph",
      subtitle: "Interactive entity graph linking Dr. Ambedkar's treatises, concepts, mentors, and institutions.",
      searchPlaceholder: "Search entities (e.g. Dewey, Constitution, Mahad)...",
      filterLabel: "Filter by Entity Type",
      legendTitle: "Entity Legend",
      entityTypes: {
        all: "All Entities",
        person: "Person",
        place: "Place",
        concept: "Concept",
        legislation: "Legislation",
        organization: "Organization",
        work: "Archival Work",
      },
      selectedDossier: "Selected Entity Dossier",
      connectedEntities: "Connected Entities & Relations",
      inspectCitations: "Inspect Primary Citations",
      canvasHint: "Drag or click nodes to inspect semantic connections.",
    },
    stories: {
      badge: "Curated Scroll-Driven Narratives",
      title: "Exhibition Narratives & Guided Histories",
      subtitle: "Four immersive, scrollytelling visual essays woven from verified historical source materials, original facsimiles, and parliamentary records.",
      chapters: "Chapters",
      experienceButton: "Experience Interactive Story",
    },
    media: {
      title: "Audiovisual Speeches & WebVTT Sync",
      subtitle: "Historical recordings with sentence-by-sentence synchronized multi-lingual transcriptions.",
      historicalAudio: "Historical Audio Recording",
      chapterCuePoints: "Chapter Cue Points",
      transcriptSearch: "Search spoken transcript...",
      allSpeakers: "All Speakers",
      ambedkarOnly: "Dr. Ambedkar Only",
      audioRecordings: "Archival Audio Recordings",
      historicalAudioBadge: "Historical Audio",
      syncTranscript: "Synchronized Multilingual Transcript",
      webvttActive: "WebVTT Active",
      clickToJump: "Click any sentence to jump the audio playback directly to that speech timestamp.",
      sourceArchives: "Source: National Archives & All India Radio Records",
      verifyInQuotes: "Verify this excerpt in Quote Verifier →",
    },
    collections: {
      badge: "Personal Archival Binder",
      title: "My Archival Collection",
      subtitle: "Saved treatises, citations, and ephemeral 7-day transfer token to take your research from kiosk to mobile.",
      printBibliography: "Print Bibliography",
      exportToken: "Export 7-Day Link",
      linkCopied: "Link Copied!",
      savedRecords: "Saved Records",
      citationsGrounded: "Citations Grounded",
      readSource: "Read Primary Source",
      remove: "Remove",
      emptyMessage: "Your collection binder is currently empty. Explore the archive or reader to save documents.",
      qrTitle: "Ephemeral 7-Day Mobile Transfer",
      qrSubtitle: "Scan with your smartphone camera to access this binder on your personal device.",
    },
    display: {
      wallTitle: "Dr. B. R. Ambedkar Heritage Archive",
      wallSubtitle: "Grand Display Wall",
      treatises: "Treatises",
      integrity: "Integrity",
      scans: "Scans",
      visitors: "Visitors",
      fullscreen: "Toggle Cinema Fullscreen",
      exitPortal: "Exit to Portal",
      listen: "Listen",
      narrating: "Narrating...",
      continueOnMobile: "Continue on Smartphone",
      continueSub: "Scan with mobile camera to take exhibition quotes and citations with you.",
      launchKiosk: "Launch Kiosk",
      searchArchive: "Search Archive",
    },
    admin: {
      consoleBadge: "Archivist & Curatorial Operations Console",
      consoleTitle: "Heritage Preservation & Ingestion Management",
      consoleSubtitle: "Compliant with ISO 14721 (OAIS), Dublin Core 15, PREMIS 3.0 fixity, and Indic Tesseract OCR pipeline.",
      fixityIntegrity: "Fixity Integrity: 100%",
      hashesVerified: "30 / 30 Hashes Verified",
      tabs: {
        ingest: "1. Document Ingest & Queue",
        ocr: "2. OCR Confidence & Correction",
        metadata: "3. Dublin Core / PREMIS Metadata",
        preservation: "4. Preservation & Fixity Logs",
        kiosks: "5. Kiosk Fleet Monitoring",
      },
      uploadTitle: "Upload Historical Scans or PDF Bundles",
      uploadDesc: "Supports TIFF (400+ DPI), PDF/A-1b preservation format, and JPEG2000. Computes SHA-256 before transmission.",
      uploadProcessing: "Processing Ingest & SHA-256...",
      uploadButton: "Select & Ingest Archival Item",
      livePipeline: "Live Ingest Processing Pipeline",
      batches: "Batches",
      ingested: "Ingested",
      ocrProcessing: "OCR Processing...",
      embeddings: "pgvector Embeddings...",
      facsimileScan: "Original Facsimile (Issue 1, Page 1)",
      flagged: "OCR Confidence: 82.1% (Flagged)",
      flaggedNote: "Words flagged below 85% confidence are highlighted with amber tint for manual verification.",
      correctionField: "Archivist Correction Field",
      devanagariLang: "Marathi (Devanagari)",
      editableText: "Editable Extracted Text:",
      correctionNote: "Correcting text triggers immediate real-time re-indexing in PostgreSQL tsvector and regenerates contextual semantic chunks.",
      correctionApproved: "Correction Approved & Saved",
      approveButton: "Approve & Re-Index Text",
      dublinTitle: "Dublin Core Metadata Elements (ISO 15836)",
      dublinDesc: "Archival metadata schema mapping to international bibliographic and museum records.",
      metaSaved: "Metadata Saved",
      saveDublin: "Save Dublin Core Record",
      premisTitle: "PREMIS 3.0 Fixity Audit Log",
      premisDesc: "Automated cryptographic checksum verification verifying bit-level storage integrity.",
      runChecksumScan: "Run Scheduled Checksum Scan",
      tableItemId: "Item ID",
      tableTitle: "Title",
      tableSha: "Recorded SHA-256",
      tableLastVerified: "Last Verified",
      tableStatus: "Status",
      tableMatch: "MATCH",
      kioskFleetTitle: "Connected Kiosk Fleet Status",
      kioskFleetDesc: "Real-time heartbeat ping, active viewport, battery telemetry, and remote session reset.",
      openNewKiosk: "Open New Kiosk Surface ↗",
      remoteReset: "Remote Reset",
      inspectSurface: "Inspect Surface",
      location: "Location:",
      activeScreen: "Active Screen:",
      lastPing: "Last Ping:",
      battery: "Battery:",
    },
    keyboard: {
      touchKeyboard: "Touch Keyboard",
      backspace: "Backspace",
      del: "Del",
      space: "Space",
      search: "Search",
      close: "Close",
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
      close: "Save & Close",
    },
    switcher: {
      kioskTitle: "Launch Museum Kiosk Mode (1080×1920 Touch Surface)",
      wallTitle: "Launch Grand Display Wall (1920×1080 Ambient Showcase)",
      kioskLabel: "Kiosk",
      wallLabel: "Wall",
    },
  },
  hi: {
    appName: "आंबेडकरवर्स",
    subtitle: "एआई-संचालित राष्ट्रीय डिजिटल विरासत एवं अभिलेखागार मंच",
    common: {
      back: "पीछे जाएं",
      search: "खोजें",
      close: "बंद करें",
      explore: "अन्वेषण करें",
      loading: "लोड हो रहा है...",
      error: "त्रुटि उत्पन्न हुई",
      success: "सफल",
      save: "सहेजें",
      saved: "सहेजा गया",
      remove: "हटाएं",
      copied: "कॉपी किया गया!",
      copy: "कॉपी करें",
      date: "दिनांक",
      category: "श्रेणी",
      source: "स्रोत",
      status: "स्थिति",
      language: "भाषा",
      all: "सभी",
      viewOriginal: "मूल देखें",
      readMore: "और पढ़ें",
      inspectScan: "मूल प्रति देखें",
      readFolio: "ग्रंथ पढ़ें",
      viewOnMap: "मानचित्र पर देखें",
      openInTimeline: "कालक्रम में खोलें",
      openInReader: "पाठक में खोलें",
      verified: "सत्यापित",
      continue: "जारी रखें",
    },
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
      ask: "एआई से पूछें",
      explore: "अन्वेषण",
    },
    footer: {
      treatisesTitle: "अभिलेखीय ग्रंथ व रचनाएं",
      interactiveTitle: "इंटरैक्टिव अन्वेषण",
      researchTitle: "सत्यापित एआई व शोध उपकरण",
      surfacesTitle: "प्रदर्शनी पटल एवं तकनीकी कड़ियाँ",
      allTreatises: "सभी 30 प्राथमिक कृतियाँ एवं शोधपत्र →",
      sitemap: "साइटमैप (XML)",
      robots: "रोबोट्स (TXT)",
      govMinistry: "सामाजिक न्याय और अधिकारिता मंत्रालय, भारत सरकार",
      institution: "डॉ. आंबेडकर अंतर्राष्ट्रीय केंद्र (DAIC)",
      hackathonTag: "स्मार्ट इंडिया हैकाथॉन 2026 • समस्या विवरण ID 26096",
    },
    home: {
      govBar: "भारत सरकार • सामाजिक न्याय एवं अधिकारिता मंत्रालय",
      institution: "डॉ. आंबेडकर अंतर्राष्ट्रीय केंद्र (DAIC)",
      ingestStatus: "अभिलेखागार प्रविष्टि: 03/10/2026",
      securityAudit: "ISO/IEC 27001 • STQC द्वारा परीक्षित",
      nationalArchiveBadge: "राष्ट्रीय डिजिटल विरासत अभिलेखागार • PS 26096",
      heroTitle: "डॉ. बी. आर. आंबेडकर डिजिटल विरासत अभिलेखागार",
      heroSubtitle:
        "डॉ. आंबेडकर के 22 प्रामाणिक ग्रंथ खंडों (BAWS), संविधान सभा की ऐतिहासिक बहसों, मूल भाषणों की ऑडियो रिकॉर्डिंग एवं डिजिटल कियोस्क का राष्ट्रीय संरक्षण।",
      searchButton: "खोजें",
      stats: {
        bawsVolumes: "बीएडब्ल्यूएस खंड",
        bawsSub: "संपूर्ण साहित्य एवं भाषण",
        scans: "मूल पांडुलिपि स्कैन",
        scansSub: "600 डीपीआई उच्च गुणवत्ता",
        span: "ऐतिहासिक कालखंड",
        spanSub: "महू से महापरिनिर्वाण तक",
        citations: "सत्यापित संदर्भ",
        citationsSub: "100% प्राथमिक प्रमाण",
      },
      epochsTitle: "युगप्रवर्तक मील के पत्थर एवं संवैधानिक वास्तुकला",
      epochsSubtitle: "मूल दस्तावेजों, भाषणों और कानूनी अभिलेखों पर आधारित ऐतिहासिक पड़ाव।",
      epochsBadge: "विशेष ऐतिहासिक प्रदर्शनी",
      epochs: [
        {
          title: "महाड सत्याग्रह",
          subtitle: "जल: एक सार्वभौमिक मानवाधिकार",
          date: "20/03/1927",
          badge: "नागरिक अस्मिता",
          description:
            "चवदार तालाब पर सार्वजनिक जल स्रोतों को समस्त मानवता के लिए समान रूप से खोलने की ऐतिहासिक घोषणा।",
        },
        {
          title: "संविधान के मुख्य शिल्पकार",
          subtitle: "संविधान सभा का विदाई भाषण एवं चेतावनी",
          date: "25/11/1949",
          badge: "संवैधानिक न्याय",
          description:
            "स्वतंत्रता, समता और बंधुत्व की रक्षा का ऐतिहासिक आह्वान तथा राजनीतिक 'भक्ति' के विरुद्ध गंभीर चेतावनी।",
        },
        {
          title: "संविधान का हृदय और आत्मा",
          subtitle: "संविधान सभा में अनुच्छेद 32 का प्रतिपादन",
          date: "09/12/1948",
          badge: "मौलिक अधिकार",
          description:
            "संवैधानिक उपचारों के अधिकार को संविधान का सबसे महत्वपूर्ण आधार घोषित किया गया।",
        },
        {
          title: "दीक्षाभूमि एवं नवयान",
          subtitle: "आध्यात्मिक पुनर्जागरण एवं सामाजिक समता",
          date: "14/10/1956",
          badge: "सामाजिक मुक्ति",
          description:
            "नागपुर में कर्मकांडी व्यवस्था को त्यागकर समतावादी नैतिक दर्शन अपनाने का ऐतिहासिक धार्मिक परिवर्तन।",
        },
      ],
      features: {
        readerTitle: "अभिलेख पाठक",
        readerDesc: "600 डीपीआई मूल प्रति के साथ लिप्यांतरित ओसीआर पाठ का द्वि-फलकीय पठन।",
        timelineTitle: "1891–1956 कालक्रम",
        timelineDesc: "6 श्रेणियों में विभाजित 25 ऐतिहासिक मील के पत्थर (दिनांक: DD/MM/YYYY)।",
        assistantTitle: "एआई शोध सहायक",
        assistantDesc: "केवल मूल अभिलेखों से उत्तर देने वाला शून्य-भ्रांति शोध सहायक।",
        verifierTitle: "उद्धरण सत्यापक",
        verifierDesc: "किसी भी उद्धरण को मूल BAWS एवं CAD अभिलेखों से सत्यापित करें।",
      },
      catalogTitle: "प्रमाणित प्राथमिक स्रोत सूचीपत्र",
      catalogSubtitle:
        "डॉ. आंबेडकर राइटिंग्स एंड स्पीचेस (BAWS) तथा संविधान सभा बहसों से 30 सार्वजनिक डोमेन अभिलेख",
      catalogCategories: {
        all: "सभी प्रकार",
        book: "ग्रंथ (BAWS)",
        debate: "संविधान सभा बहस",
        speech: "भाषण",
        manuscript: "पांडुलिपियां",
        photo: "छायाचित्र",
        audio: "ऑडियो / वीडियो",
      },
      publicDomain: "सार्वजनिक डोमेन",
    },
    kiosk: {
      touchToBegin: "प्रारंभ करने के लिए कहीं भी स्पर्श करें",
      chooseLanguage: "अपनी भाषा चुनें",
      idleWarning: "क्या आप अभी भी अध्ययन कर रहे हैं?",
      idleCountdown: "सत्र {seconds} सेकंड में रीसेट हो जाएगा",
      sessionWillReset:
        "आपकी गोपनीयता की रक्षा के लिए कियोस्क निष्क्रियता के बाद व्यक्तिगत डेटा को हटा देता है।",
      imStillHere: "मैं यहीं हूँ",
      resetNow: "अभी रीसेट करें",
      attractTitle: "डॉ. बी. आर. आंबेडकर डिजिटल विरासत अभिलेखागार",
      attractSubtitle:
        "सत्यापित संदर्भों के साथ मूल पांडुलिपियों, संविधान सभा बहसों और भाषणों का अन्वेषण करें।",
      kioskHeaderTitle: "आंबेडकर विरासत कियोस्क",
      touchSearchPlaceholder: "भाषण, संविधान सभा बहस या ग्रंथ खोजने के लिए यहाँ स्पर्श करें...",
      highContrast: "उच्च कंट्रास्ट",
      interactiveMode: "इंटरैक्टिव प्रदर्शनी मोड",
      listenSpeech: "सुनें (ध्वनि वाचन)",
      stopSpeech: "वाचन रोकें",
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
      scholarlyProvenance: "प्रामाणिक ऐतिहासिक स्रोत",
      transcriptTab: "अनुवाद एवं पाठ",
      facsimileTab: "मूल प्रति स्कैन",
      splitTab: "संयुक्त दृश्य",
      exportCitation: "उद्धरण निर्यात करें",
      citationCopied: "उद्धरण क्लिपबोर्ड में कॉपी हो गया!",
      closeModal: "बंद करें",
    },
    search: {
      title: "बहुभाषी अभिलेखीय खोज",
      subtitle: "BGE-M3 एम्बेडिंग्स, BM25 और RRF हाइब्रिड तकनीक द्वारा संचालित सटीक खोज।",
      placeholder: "डॉ. आंबेडकर के लेखन, संविधान सभा बहसों और ऐतिहासिक भाषणों में खोजें...",
      voiceSearch: "ध्वनि खोज (भाषिणी)",
      suggestedTopics: "सुझाए गए विषय:",
      filters: "माध्यम प्रकार से फ़िल्टर करें",
      allTypes: "सभी प्रकार",
      resultsFound: "सत्यापित अभिलेख मिले",
      noResults: "खोजे गए शब्दों से संबंधित कोई अभिलेख नहीं मिला।",
      noResultsSuggestion: "कृपया 'अनुच्छेद 32', 'महाड', 'रुपया' या 'जाति' जैसे व्यापक शब्दों से खोजें।",
      searching: "अभिलेख खोज रहे हैं...",
      matchScore: "प्रासंगिकता स्कोर",
      openPageInReader: "पाठक में खोलें",
      categories: {
        all: "सभी प्रकार",
        book: "ग्रंथ",
        debate: "बहस",
        speech: "भाषण",
        manuscript: "पांडुलिपियां",
      },
    },
    assistant: {
      title: "सत्यापित एआई शोध सहायक",
      subtitle:
        "केवल प्रमाणित प्राथमिक स्रोतों (BAWS खंड 1-22 और CAD) से उत्तर। शून्य भ्रांति।",
      inputPlaceholder: "संवैधानिक या अभिलेखीय प्रश्न पूछें...",
      send: "पूछें",
      modeScholarly: "विद्वत्तापूर्ण शैली",
      modeSimple: "सरल भाषा में",
      citations: "सत्यापित स्रोत संदर्भ:",
      verifiedGrounded: "100% प्राथमिक स्रोतों पर आधारित",
      zeroHallucination: "शून्य भ्रांति गारंटीकृत",
      yourInquiry: "आपका प्रश्न",
      assistantName: "सत्यापित अभिलेख सहायक",
      verifiedCitationActive: "प्रमाणित संदर्भ सक्रिय",
      sampleQuestions: [
        "डॉ. आंबेडकर ने अनुच्छेद 32 को संविधान की आत्मा और हृदय क्यों कहा?",
        "भारतीय रिज़र्व बैंक की स्थापना में डॉ. आंबेडकर की क्या भूमिका थी?",
        "1927 के महाड चवदार तालाब सत्याग्रह के प्रमुख सिद्धांत क्या थे?",
      ],
      disclaimer: "प्रत्येक उत्तर प्रमाणित खंड, पृष्ठ संख्या और संदर्भ अनुच्छेदों के साथ दिया जाता है।",
    },
    quoteVerifier: {
      title: "अभिलेखीय उद्धरण सत्यापक",
      subtitle:
        "डॉ. आंबेडकर के नाम से उद्धृत किसी भी वाक्य को प्रमाणित करने के लिए यहाँ चिपकाएँ।",
      inputLabel: "प्राथमिक स्रोतों से सत्यापित करने के लिए उद्धरण दर्ज करें:",
      placeholder: "उद्धरण यहाँ पेस्ट करें, उदा. 'जाति केवल श्रम का विभाजन नहीं है, यह श्रमिकों का भी विभाजन है।'...",
      verifyButton: "अभिलेख से सत्यापित करें",
      verdictVerified: "सत्यापित प्रामाणिक उद्धरण",
      verdictSimilar: "समान विचार अभिलेख में उपलब्ध",
      verdictNotFound: "प्राथमिक स्रोतों में नहीं मिला",
      disclaimer:
        "ऐतिहासिक सत्य की रक्षा के लिए भ्रामक अथवा मनगढ़ंत उद्धरणों को तुरंत चिन्हित किया जाता है।",
      matchConfidence: "समानता प्रतिशत",
      sourceAuthority: "स्रोत प्राधिकार",
      matchedExcerpt: "अभिलेख से प्राप्त मूल अंश",
      sampleQuotes: [
        { label: "प्रामाणिक उद्धरण 1", quote: "जाति केवल श्रम का विभाजन नहीं है, यह श्रमिकों का भी विभाजन है।" },
        { label: "प्रामाणिक उद्धरण 2", quote: "यह संविधान की आत्मा और इसका हृदय है।" },
        { label: "प्रामाणिक उद्धरण 3", quote: "ये पद्धतियाँ अराजकता के व्याकरण के सिवा कुछ नहीं हैं।" },
        { label: "काल्पनिक उद्धरण परीक्षण", quote: "जीवन में सफलता सुबह 5 बजे उठने और बिटकॉइन का व्यापार करने से मिलती है।" },
      ],
    },
    timeline: {
      title: "1891–1956 जीवन कालक्रम",
      subtitle: "1891 में महू जन्म से लेकर संविधान निर्माण और अमर विरासत तक के 25 प्रामाणिक पड़ाव।",
      chronologicalArchive: "कालक्रमानुसार अभिलेखागार (1891–1956)",
      dossierTitle: "ऐतिहासिक विवरण दस्तावेज़",
      linkedRecords: "जुड़े हुए मूल अभिलेखीय दस्तावेज़:",
      inspectAssociated: "संबंधित दस्तावेज़ का स्कैन देखें",
      categories: {
        All: "सभी पड़ाव",
        Education: "शिक्षा",
        "Social Reform": "समाज सुधार",
        Politics: "राजनीति",
        Constitution: "संविधान",
        Buddhism: "धम्म दीक्षा",
        Legacy: "अमर विरासत",
      },
    },
    map: {
      title: "भू-स्थानिक विरासत मानचित्र",
      subtitle: "भारत, ब्रिटेन और अमेरिका में डॉ. आंबेडकर के जीवन से जुड़े ऐतिहासिक स्थलों की यात्रा।",
      scopeIndia: "भारत केंद्रित मानचित्र",
      scopeGlobal: "वैश्विक पदचिह्न (अमेरिका व ब्रिटेन)",
      legendTitle: "संकेतक",
      legendStruggles: "जन संघर्ष एवं नागरिक अधिकार",
      legendEducation: "उच्च शिक्षा एवं विदेशी उपाधियां",
      legendGovernance: "संविधान एवं राष्ट्र निर्माण",
      legendSpiritual: "धम्म पुनर्जागरण (दीक्षा)",
      jumpTo: "सीधे जाएं:",
      keyMilestones: "इस स्थल के प्रमुख मील के पत्थर",
      connectedWork: "संबंधित ऐतिहासिक रचना",
      readZoom: "गहन ज़ूम पाठक में मूल पाठ एवं प्रतिलिपि पढ़ें",
    },
    graph: {
      title: "ज्ञान संबंध मानचित्र (नॉलेज ग्राफ)",
      subtitle: "डॉ. आंबेडकर के ग्रंथों, अवधारणाओं, सहयोगियों और संस्थाओं को जोड़ने वाला नेटवर्क।",
      searchPlaceholder: "इकाई खोजें (उदा. डेवी, संविधान, महाड)...",
      filterLabel: "इकाई प्रकार से फ़िल्टर करें",
      legendTitle: "इकाई संकेतक",
      entityTypes: {
        all: "सभी इकाइयां",
        person: "व्यक्ति",
        place: "स्थान",
        concept: "अवधारणा",
        legislation: "विधान / कानून",
        organization: "संस्था",
        work: "ग्रंथ / रचना",
      },
      selectedDossier: "चयनित इकाई विवरण",
      connectedEntities: "जुड़े हुए संबंध एवं संस्थाएं",
      inspectCitations: "प्राथमिक संदर्भ देखें",
      canvasHint: "संबंधों को देखने के लिए बिंदुओं को खींचें या स्पर्श करें।",
    },
    stories: {
      badge: "संयोजित स्क्रॉल-कथाएं",
      title: "विशेष प्रदर्शनी ऐतिहासिक वृत्तांत",
      subtitle: "सत्यापित ऐतिहासिक स्रोतों, मूल पांडुलिपियों और संसदीय अभिलेखों पर आधारित चार दृश्य कथाएं।",
      chapters: "अध्याय",
      experienceButton: "संवादात्मक कथा का अनुभव करें",
      backToStories: "सभी ऐतिहासिक कथाओं पर वापस जाएं",
      chapterProgress: "अध्याय {current} / {total}",
      visualEssay: "ऐतिहासिक दृश्य निबंध",
      prevChapter: "पिछला अध्याय",
      nextChapter: "अगला अध्याय",
      archivalFacsimile: "अभिलेखीय दस्तावेज़ प्रतिकृति",
      authenticSource: "प्रामाणिक स्रोत",
      verifiedSource: "सत्यापित स्रोत:",
      reference: "संदर्भ:",
      openDeepZoom: "गहन ज़ूम पाठक में संपूर्ण दस्तावेज़ खोलें",
    },
    media: {
      title: "ऐतिहासिक ऑडियो-वीडियो एवं उपशीर्षक",
      subtitle: "ऐतिहासिक भाषणों की मूल रिकॉर्डिंग और वाक्य-दर-वाक्य समन्वित बहुभाषी प्रतिलेख।",
      historicalAudio: "मूल ऐतिहासिक ऑडियो रिकॉर्डिंग",
      chapterCuePoints: "अध्याय संकेत बिंदु",
      transcriptSearch: "भाषण पाठ में खोजें...",
      allSpeakers: "सभी वक्ता",
      ambedkarOnly: "केवल डॉ. आंबेडकर",
      audioRecordings: "अभिलेखीय ऑडियो रिकॉर्डिंग्स",
      historicalAudioBadge: "ऐतिहासिक ऑडियो",
      syncTranscript: "समन्वित बहुभाषी प्रतिलेख",
      webvttActive: "WebVTT सक्रिय",
      clickToJump: "ऑडियो प्लेबैक को उस वाक्य पर ले जाने के लिए किसी भी पंक्ति पर क्लिक करें।",
      sourceArchives: "स्रोत: राष्ट्रीय अभिलेखागार एवं आकाशवाणी रिकॉर्ड्स",
      verifyInQuotes: "इस अंश को उद्धरण सत्यापनकर्ता में सत्यापित करें →",
    },
    collections: {
      badge: "व्यक्तिगत अभिलेख बाइंडर",
      title: "मेरा व्यक्तिगत संग्रह",
      subtitle: "सहेजे गए ग्रंथ, संदर्भ और कियोस्क से मोबाइल पर ले जाने हेतु 7-दिवसीय टोकन।",
      printBibliography: "संदर्भ सूची प्रिंट करें",
      exportToken: "7-दिवसीय लिंक साझा करें",
      linkCopied: "लिंक कॉपी हो गया!",
      savedRecords: "सहेजे गए अभिलेख",
      citationsGrounded: "सत्यापित संदर्भ",
      readSource: "मूल स्रोत पढ़ें",
      remove: "हटाएं",
      emptyMessage: "आपका संग्रह वर्तमान में खाली है। अभिलेखागार से दस्तावेज़ सहेजने के लिए अन्वेषण करें।",
      qrTitle: "7-दिवसीय मोबाइल ट्रांसफर क्यूआर कोड",
      qrSubtitle: "अपने फोन के कैमरे से स्कैन कर इस संग्रह को अपने निजी उपकरण पर ले जाएं।",
    },
    display: {
      wallTitle: "डॉ. बी. आर. आंबेडकर विरासत अभिलेखागार",
      wallSubtitle: "स्मार्ट प्रदर्शनी दीवार",
      treatises: "ग्रंथ",
      integrity: "प्रामाणिकता",
      scans: "स्कैन",
      visitors: "दर्शक",
      fullscreen: "सिनेमा फुलस्क्रीन",
      exitPortal: "पोर्टल पर लौटें",
      listen: "सुनें",
      narrating: "वाचन जारी...",
      continueOnMobile: "स्मार्टफोन पर जारी रखें",
      continueSub: "मोबाइल कैमरे से स्कैन कर प्रदर्शनी उद्धरण एवं संदर्भ अपने साथ ले जाएं।",
      launchKiosk: "कियोस्क खोलें",
      searchArchive: "अभिलेख खोजें",
    },
    admin: {
      consoleBadge: "अभिलेखागार एवं संरक्षण कंसोल",
      consoleTitle: "विरासत संरक्षण एवं दस्तावेज़ प्रबंधन",
      consoleSubtitle: "ISO 14721 (OAIS), डबलिन कोर 15, PREMIS 3.0 और टेसेरैक्ट ओसीआर पाइपलाइन के अनुरूप।",
      fixityIntegrity: "फिक्सिटी अखंडता: 100%",
      hashesVerified: "30 / 30 हैश सत्यापित",
      tabs: {
        ingest: "1. दस्तावेज़ प्रविष्टि एवं कतार",
        ocr: "2. ओसीआर सटीकता एवं सुधार",
        metadata: "3. डबलिन कोर / PREMIS मेटाडेटा",
        preservation: "4. संरक्षण एवं फिक्सिटी लॉग",
        kiosks: "5. कियोस्क बेड़े की निगरानी",
      },
      uploadTitle: "ऐतिहासिक स्कैन या पीडीएफ बंडल अपलोड करें",
      uploadDesc: "TIFF (400+ DPI), PDF/A-1b संरक्षण प्रारूप और JPEG2000 समर्थित। प्रसारण से पूर्व SHA-256 की गणना की जाती है।",
      uploadProcessing: "प्रविष्टि एवं SHA-256 प्रक्रमण जारी...",
      uploadButton: "अभिलेखीय मद का चयन करें एवं अपलोड करें",
      livePipeline: "लाइव प्रविष्टि प्रक्रमण पाइपलाइन",
      batches: "बैच",
      ingested: "प्रविष्ट",
      ocrProcessing: "ओसीआर प्रक्रमण...",
      embeddings: "pgvector एम्बेडिंग्स...",
      facsimileScan: "मूल प्रतिकृति (अंक 1, पृष्ठ 1)",
      flagged: "ओसीआर सटीकता: 82.1% (सत्यापन आवश्यक)",
      flaggedNote: "85% से कम सटीकता वाले शब्दों को मैनुअल सत्यापन हेतु हाइलाइट किया गया है।",
      correctionField: "अभिलेखागार सुधार फ़ील्ड",
      devanagariLang: "मराठी (देवनागरी)",
      editableText: "संपादन योग्य निकाला गया पाठ:",
      correctionNote: "पाठ सुधारने से PostgreSQL tsvector में तत्काल पुनर्क्रमण होता है और अर्थपूर्ण खंड पुनः उत्पन्न होते हैं।",
      correctionApproved: "सुधार स्वीकृत एवं सहेजा गया",
      approveButton: "स्वीकृत करें एवं पुनर्क्रमित करें",
      dublinTitle: "डबलिन कोर मेटाडेटा तत्व (ISO 15836)",
      dublinDesc: "अंतर्राष्ट्रीय ग्रंथसूची एवं संग्रहालय अभिलेखों के साथ समन्वित अभिलेखीय मेटाडेटा स्कीमा।",
      metaSaved: "मेटाडेटा सहेजा गया",
      saveDublin: "डबलिन कोर रिकॉर्ड सहेजें",
      premisTitle: "PREMIS 3.0 फिक्सिटी ऑडिट लॉग",
      premisDesc: "बिट-स्तरीय भंडारण अखंडता सुनिश्चित करने वाला स्वचालित क्रिप्टोग्राफ़िक चेकसम सत्यापन।",
      runChecksumScan: "अनुसूचित चेकसम स्कैन चलाएं",
      tableItemId: "मद आईडी",
      tableTitle: "शीर्षक",
      tableSha: "अभिलेखित SHA-256",
      tableLastVerified: "अंतिम सत्यापन",
      tableStatus: "स्थिति",
      tableMatch: "सत्यापित (MATCH)",
      kioskFleetTitle: "सक्रिय कियोस्क नेटवर्क स्थिति",
      kioskFleetDesc: "रीयल-टाइम हार्टबीट पिंग, सक्रिय व्यूपोर्ट, बैटरी स्थिति और रिमोट सत्र रीसेट।",
      openNewKiosk: "नया कियोस्क स्क्रीन खोलें ↗",
      remoteReset: "रिमोट रीसेट",
      inspectSurface: "सतह का निरीक्षण करें",
      location: "स्थान:",
      activeScreen: "सक्रिय स्क्रीन:",
      lastPing: "अंतिम पिंग:",
      battery: "बैटरी:",
    },
    keyboard: {
      touchKeyboard: "टच कीबोर्ड",
      backspace: "बैकस्पेस",
      del: "हटाएं",
      space: "स्पेस",
      search: "खोजें",
      close: "बंद करें",
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
      close: "सहेजें और बंद करें",
    },
    switcher: {
      kioskTitle: "म्यूज़ियम कियोस्क मोड खोलें (1080×1920 टच स्क्रीन)",
      wallTitle: "स्मार्ट डिस्प्ले वॉल खोलें (1920×1080 वॉल स्क्रीन)",
      kioskLabel: "कियोस्क",
      wallLabel: "वॉल",
    },
  },
  mr: {
    appName: "आंबेडकरव्हर्स",
    subtitle: "एआय-सक्षम राष्ट्रीय डिजिटल वारसा व अभिलेखागार",
    common: {
      back: "मागे जा",
      search: "शोधा",
      close: "बंद करा",
      explore: "अन्वेषण",
      loading: "लोड होत आहे...",
      error: "त्रुटी आढळली",
      success: "यशस्वी",
      save: "साठवा",
      saved: "साठवले",
      remove: "काढून टाका",
      copied: "कॉपी केले!",
      copy: "कॉपी करा",
      date: "दिनांक",
      category: "वर्गवारी",
      source: "संदर्भ",
      status: "स्थिती",
      language: "भाषा",
      all: "सर्व",
      viewOriginal: "मूळ पहा",
      readMore: "अधिक वाचा",
      inspectScan: "मूळ प्रत तपासा",
      readFolio: "ग्रंथ वाचा",
      viewOnMap: "नकाशावर पहा",
      openInTimeline: "कालपटात उघडा",
      openInReader: "वाचकात उघडा",
      verified: "प्रमाणित",
      continue: "पुढे जा",
    },
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
      ask: "एआय ला विचारा",
      explore: "अन्वेषण",
    },
    footer: {
      treatisesTitle: "अभिलेखीय ग्रंथ व लेखन",
      interactiveTitle: "संवादी अन्वेषण",
      researchTitle: "सत्यापित एआय व संशोधन साधने",
      surfacesTitle: "प्रदर्शनी पटल आणि तांत्रिक दुवे",
      allTreatises: "सर्व ३० प्राथमिक ग्रंथ व शोधनिबंध →",
      sitemap: "साइटमॅप (XML)",
      robots: "रोबोट्स (TXT)",
      govMinistry: "सामाजिक न्याय आणि सक्षमीकरण मंत्रालय, भारत सरकार",
      institution: "डॉ. आंबेडकर आंतरराष्ट्रीय केंद्र (DAIC)",
      hackathonTag: "स्मार्ट इंडिया हॅकाथॉन २०२६ • समस्या आयडी २६०९६",
    },
    home: {
      govBar: "भारत सरकार • सामाजिक न्याय आणि सक्षमीकरण मंत्रालय",
      institution: "डॉ. आंबेडकर आंतरराष्ट्रीय केंद्र (DAIC)",
      ingestStatus: "अभिलेख संकलन: ०३/१०/२०२६",
      securityAudit: "ISO/IEC 27001 • STQC प्रमाणित",
      nationalArchiveBadge: "राष्ट्रीय डिजिटल वारसा अभिलेखागार • PS 26096",
      heroTitle: "डॉ. बाबासाहेब आंबेडकर डिजिटल वारसा अभिलेखागार",
      heroSubtitle:
        "डॉ. आंबेडकरांच्या २२ अधिकृत ग्रंथखंडांचे (BAWS), संविधान सभेच्या ऐतिहासिक वादविवादांचे, मूळ भाषणांच्या ध्वनीमुद्रणांचे आणि डिजिटल किओस्कचे राष्ट्रीय जतन.",
      searchButton: "शोधा",
      stats: {
        bawsVolumes: "बीएडब्ल्यूएस खंड",
        bawsSub: "संपूर्ण साहित्य व भाषणे",
        scans: "मूळ हस्तलिखित स्कॅन",
        scansSub: "६०० डीपीआय उच्च गुणवत्ता",
        span: "जीवनप्रवास कालखंड",
        spanSub: "महू ते महापरिनिर्वाण",
        citations: "सत्यापित संदर्भ",
        citationsSub: "१००% प्राथमिक पुरावे",
      },
      epochsTitle: "युगप्रवर्तक टप्पे आणि घटनात्मक वास्तुकला",
      epochsSubtitle: "मूळ दस्तऐवज, भाषणे आणि ऐतिहासिक संदर्भांवर आधारलेले ऐतिहासिक क्षण.",
      epochsBadge: "निवडक ऐतिहासिक प्रदर्शनी",
      epochs: [
        {
          title: "महाड सत्याग्रह",
          subtitle: "पाणी: एक मूलभूत मानवाधिकार",
          date: "20/03/1927",
          badge: "नागरी प्रतिष्ठा",
          description:
            "चवदार तळ्यावर सार्वजनिक पाण्याचे हक्क मानवी समानतेसाठी खुले करणारी ऐतिहासिक क्रांती.",
        },
        {
          title: "संविधानाचे शिल्पकार",
          subtitle: "संविधान सभेतील अखेरचे भाषण व इशारा",
          date: "25/11/1949",
          badge: "घटनात्मक कायदा",
          description:
            "स्वातंत्र्य, समता आणि बंधुतेचा गौरव तसेच राजकीय 'भक्ती' विरुद्ध दिलेला ऐतिहासिक इशारा.",
        },
        {
          title: "संविधानाचा आत्मा आणि हृदय",
          subtitle: "संविधान सभेत कलम ३२ चे प्रतिपादन",
          date: "09/12/1948",
          badge: "मूलभूत हक्क",
          description:
            "घटनात्मक उपायांचा अधिकार हा संपूर्ण संविधानाचा आत्मा आणि हृदय असल्याचे ठाम प्रतिपादन.",
        },
        {
          title: "दीक्षाभूमी आणि नवयान",
          subtitle: "आध्यात्मिक पुनरुत्थान व सामाजिक समता",
          date: "14/10/1956",
          badge: "सामाजिक मुक्ती",
          description:
            "नागपूर येथे विषमतेची उतरंड नाकारून समतावादी नैतिक बौद्ध धम्माचा स्वीकार करणारा ऐतिहासिक क्षण.",
        },
      ],
      features: {
        readerTitle: "अभिलेख वाचक",
        readerDesc: "६०० डीपीआय मूळ हस्तलिखितासह डिजिटल ओसीआर मजकुराचे द्वैध वाचन.",
        timelineTitle: "१८९१–१९५६ जीवनप्रवास",
        timelineDesc: "६ प्रमुख विभागांमधील २५ ऐतिहासिक मैलाचे दगड (तारीख: DD/MM/YYYY).",
        assistantTitle: "एआय सहाय्यक",
        assistantDesc: "शून्य खोटी माहिती; केवळ मूळ संदर्भांवरून उत्तर देणारा एआय.",
        verifierTitle: "विधान पडताळणी",
        verifierDesc: "बाबासाहेबांच्या नावावर असलेले कोणतेही विधान थेट अभिलेखातून तपासा.",
      },
      catalogTitle: "अधिकृत प्राथमिक ऐतिहासिक संदर्भ सूची",
      catalogSubtitle:
        "डॉ. बाबासाहेब आंबेडकर राइटिंग्स अँड स्पीचेस (BAWS) व संविधान सभा चर्चांमधील ३० सार्वजनिक दस्तऐवज",
      catalogCategories: {
        all: "सर्व प्रकार",
        book: "ग्रंथ (BAWS)",
        debate: "संविधान सभा चर्चा",
        speech: "भाषणे",
        manuscript: "हस्तलिखिते",
        photo: "छायाचित्रे",
        audio: "ध्वनी / चित्रफीत",
      },
      publicDomain: "सार्वजनिक वारसा",
    },
    kiosk: {
      touchToBegin: "सुरू करण्यासाठी कुठेही स्पर्श करा",
      chooseLanguage: "आपली भाषा निवडा",
      idleWarning: "आपण अजूनही वाचन करत आहात का?",
      idleCountdown: "सत्र {seconds} सेकंदात रीसेट होईल",
      sessionWillReset:
        "आपल्या गोपनीयतेसाठी किओस्क निष्क्रियतेनंतर वैयक्तिक संग्रह पुसून टाकते.",
      imStillHere: "मी इथेच आहे",
      resetNow: "आत्ताच रीसेट करा",
      attractTitle: "डॉ. बाबासाहेब आंबेडकर डिजिटल वारसा अभिलेखागार",
      attractSubtitle:
        "सत्यापित संदर्भांसह हस्तलिखिते, घटना समिती चर्चा आणि ऐतिहासिक भाषणांचे अवलोकन करा.",
      kioskHeaderTitle: "आंबेडकर वारसा किओस्क",
      touchSearchPlaceholder: "भाषणे, घटना समिती वादविवाद किंवा ग्रंथ शोधण्यासाठी स्पर्श करा...",
      highContrast: "हाय कॉन्ट्रास्ट",
      interactiveMode: "संवादी प्रदर्शनी मोड",
      listenSpeech: "ऐका (ध्वनी वाचन)",
      stopSpeech: "वाचन थांबवा",
    },
    reader: {
      originalScan: "मूळ ६०० DPI स्कॅन",
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
      scholarlyProvenance: "अधिकृत ऐतिहासिक संदर्भ",
      transcriptTab: "भाषांतर व मजकूर",
      facsimileTab: "मूळ प्रत स्कॅन",
      splitTab: "संयुक्त दृश्य",
      exportCitation: "संदर्भ निर्यात करा",
      citationCopied: "संदर्भ क्लिपबोर्डवर कॉपी केला!",
      closeModal: "बंद करा",
    },
    search: {
      title: "बहुभाषिक ऐतिहासिक शोध",
      subtitle: "BGE-M3 एम्बेडिंग आणि BM25 हायब्रिड अल्गोरिदमवर आधारित अचूक शोध.",
      placeholder: "डॉ. आंबेडकरांचे लेखन, घटना समिती चर्चा, भाषणांमध्ये शोधा...",
      voiceSearch: "आवाज शोध (भाषिणी)",
      suggestedTopics: "सुचवलेले विषय:",
      filters: "माध्यम प्रकारानुसार निवडा",
      allTypes: "सर्व प्रकार",
      resultsFound: "दस्तऐवज सापडले",
      noResults: "शोधलेल्या शब्दांशी संबंधित दस्तऐवज सापडला नाही.",
      noResultsSuggestion: "कृपया 'कलम ३२', 'महाड', 'रुपया' किंवा 'जात' यांसारख्या व्यापक शब्दांनी शोधा.",
      searching: "दस्तऐवज शोधत आहे...",
      matchScore: "अचूकता गुणांक",
      openPageInReader: "वाचकात उघडा",
      categories: {
        all: "सर्व प्रकार",
        book: "ग्रंथ",
        debate: "चर्चा",
        speech: "भाषणे",
        manuscript: "हस्तलिखिते",
      },
    },
    assistant: {
      title: "सत्यापित एआय संशोधन सहाय्यक",
      subtitle:
        "केवळ अधिकृत प्राथमिक संदर्भांवर (BAWS खंड 1-22 आणि CAD) आधारित उत्तरे. शून्य चुकीची माहिती.",
      inputPlaceholder: "घटनात्मक किंवा ऐतिहासिक प्रश्न विचारा...",
      send: "विचारा",
      modeScholarly: "अभ्यासपूर्ण शैली",
      modeSimple: "सोप्या भाषेत",
      citations: "सत्यापित संदर्भ:",
      verifiedGrounded: "१००% प्राथमिक दस्तऐवजांवर आधारित",
      zeroHallucination: "शून्य भ्रांतीची हमी",
      yourInquiry: "आपला प्रश्न",
      assistantName: "सत्यापित अभिलेख सहाय्यक",
      verifiedCitationActive: "सत्यापित संदर्भ सक्रिय",
      sampleQuestions: [
        "डॉ. बाबासाहेब आंबेडकरांनी कलम ३२ ला संविधानाचा आत्मा आणि हृदय का म्हटले?",
        "रिझर्व्ह बँक ऑफ इंडियाच्या स्थापनेमध्ये डॉ. आंबेडकरांचे काय योगदान होते?",
        "१९२७ च्या महाड चवदार तळे सत्याग्रहाची प्रमुख तत्त्वे स्पष्ट करा.",
      ],
      disclaimer: "प्रत्येक उत्तरासोबत अचूक खंड, पृष्ठ क्रमांक आणि संदर्भ परिच्छेद दिले जातात.",
    },
    quoteVerifier: {
      title: "अभिलेखीय विधान पडताळणी",
      subtitle:
        "डॉ. बाबासाहेब आंबेडकरांच्या नावावर असलेले कोणतेही विधान पडताळून पाहण्यासाठी येथे टाका.",
      inputLabel: "मूळ संदर्भांशी पडताळण्यासाठी विधान टाका:",
      placeholder: "येथे विधान पेस्ट करा, उदा. 'जात ही केवळ श्रमाची विभागणी नसून ती श्रमिकांची विभागणी आहे.'...",
      verifyButton: "अभिलेखातून पडताळा",
      verdictVerified: "सत्यापित अस्सल विधान",
      verdictSimilar: "समान विचार अभिलेखात उपलब्ध",
      verdictNotFound: "प्राथमिक संदर्भांमध्ये आढळले नाही",
      disclaimer:
        "ऐतिहासिक सत्याचे जतन करण्यासाठी खोट्या व काल्पनिक विधानांना तात्काळ सूचित केले जाते.",
      matchConfidence: "तंतोतंत प्रमाण",
      sourceAuthority: "संदर्भ प्राधिकार",
      matchedExcerpt: "अभिलेखातील मूळ उतारा",
      sampleQuotes: [
        { label: "अस्सल विधान १", quote: "जात ही केवळ श्रमाची विभागणी नसून ती श्रमिकांची विभागणी आहे." },
        { label: "अस्सल विधान २", quote: "हा संविधानाचा आत्मा आणि त्याचे हृदय आहे." },
        { label: "अस्सल विधान ३", quote: "या पद्धती म्हणजे अराजकतेचे व्याकरण ठरतील." },
        { label: "काल्पनिक विधान चाचणी", quote: "जीवनात यश मिळवण्यासाठी सकाळी ५ वाजता उठून शेअर बाजारात ट्रेडिंग करा." },
      ],
    },
    timeline: {
      title: "१८९१–१९५६ जीवनप्रवास कालपट",
      subtitle: "१८९१ मध्ये महू येथील जन्मापासून ते संविधान निर्मिती व महापरिनिर्वाणापर्यंतचे २५ ऐतिहासिक टप्पे.",
      chronologicalArchive: "कालक्रमानुसार अभिलेखागार (१८९१–१९५६)",
      dossierTitle: "ऐतिहासिक तपशील दस्तऐवज",
      linkedRecords: "जोडलेले मूळ अभिलेख दस्तऐवज:",
      inspectAssociated: "संबंधित मूळ दस्तऐवज स्कॅन पहा",
      categories: {
        All: "सर्व टप्पे",
        Education: "शिक्षण",
        "Social Reform": "समाजसुधारणा",
        Politics: "राजकारण",
        Constitution: "संविधान",
        Buddhism: "धम्मदीक्षा",
        Legacy: "अमर वारसा",
      },
    },
    map: {
      title: "भू-स्थानिक ऐतिहासिक वारसा नकाशा",
      subtitle: "भारत, ब्रिटन आणि अमेरिकेतील डॉ. बाबासाहेब आंबेडकरांच्या ऐतिहासिक पदचिन्हांची सफर.",
      scopeIndia: "भारत नकाशा दृश्य",
      scopeGlobal: "जागतिक पदचिन्ह (अमेरिका व ब्रिटन)",
      legendTitle: "संकेतक सूची",
      legendStruggles: "जनआंदोलने व नागरी हक्क",
      legendEducation: "परदेशी शिक्षण व पदव्या",
      legendGovernance: "संविधान व राष्ट्र उभारणी",
      legendSpiritual: "धम्मदीक्षा (दीक्षाभूमी)",
      jumpTo: "थेट जा:",
      keyMilestones: "या स्थानावरील प्रमुख ऐतिहासिक प्रसंग",
      connectedWork: "संबंधित ग्रंथ व दस्तऐवज",
      readZoom: "डीप झूम वाचकात मूळ दस्तऐवज व प्रत वाचा",
    },
    graph: {
      title: "ज्ञान संबंध आलेख (नॉलेज ग्राफ)",
      subtitle: "डॉ. आंबेडकरांचे ग्रंथ, संकल्पना, सहकारी आणि संस्थांना जोडणारा संवादी ज्ञान नकाशा.",
      searchPlaceholder: "घटक शोधा (उदा. जॉन ड्युई, संविधान, महाड)...",
      filterLabel: "घटक प्रकारानुसार निवडा",
      legendTitle: "घटक संकेतक",
      entityTypes: {
        all: "सर्व घटक",
        person: "व्यक्ती",
        place: "स्थान",
        concept: "संकल्पना",
        legislation: "कायदा / ठराव",
        organization: "संस्था",
        work: "ग्रंथ / साहित्य",
      },
      selectedDossier: "निवडलेल्या घटकाचा तपशील",
      connectedEntities: "जोडलेले घटक व संबंध",
      inspectCitations: "प्राथमिक संदर्भ तपासा",
      canvasHint: "संबंध तपासण्यासाठी घटकांना ओढा किंवा स्पर्श करा.",
    },
    stories: {
      badge: "संपादकीय स्क्रॉल-गाथा",
      title: "विशेष ऐतिहासिक प्रदर्शनी गाथा",
      subtitle: "प्रमाणित ऐतिहासिक पुरावे, मूळ हस्तलिखिते आणि संसदीय नोंदींवर आधारलेल्या चार चित्रमय गाथा.",
      chapters: "अध्याय",
      experienceButton: "संवादी कथेचा अनुभव घ्या",
    },
    media: {
      title: "ऐतिहासिक ध्वनीमुद्रणे व समन्वित मजकूर",
      subtitle: "ऐतिहासिक भाषणांची मूळ ध्वनीमुद्रणे आणि वाक्यनिहाय समन्वित बहुभाषिक मजकूर.",
      historicalAudio: "ऐतिहासिक मूळ ध्वनीमुद्रण",
      chapterCuePoints: "अध्याय संकेतबिंदू",
      transcriptSearch: "भाषण मजकुरात शोधा...",
      allSpeakers: "सर्व वक्ते",
      ambedkarOnly: "केवळ डॉ. आंबेडकर",
      audioRecordings: "अभिलेखीय ध्वनीमुद्रणे",
    },
    collections: {
      badge: "वैयक्तिक संशोधन संच",
      title: "माझा वैयक्तिक संग्रह",
      subtitle: "आपण जतन केलेले दस्तऐवज, संदर्भ आणि किओस्कवरून मोबाईलवर नेण्यासाठी ७-दिवसांचा तात्पुरता टोकन.",
      printBibliography: "संदर्भसूची प्रिंट करा",
      exportToken: "७-दिवसीय दुवा सामायिक करा",
      linkCopied: "दुवा कॉपी झाला!",
      savedRecords: "जतन केलेले दस्तऐवज",
      citationsGrounded: "सत्यापित संदर्भ",
      readSource: "मूळ दस्तऐवज वाचा",
      remove: "काढून टाका",
      emptyMessage: "आपला संग्रह सध्या रिकामा आहे. ग्रंथ जतन करण्यासाठी अभिलेखागाराचा शोध घ्या.",
      qrTitle: "७-दिवसीय मोबाईल ट्रान्सफर क्यूआर कोड",
      qrSubtitle: "आपल्या स्मार्टफोनच्या कॅमेऱ्याने स्कॅन करून हा संग्रह वैयक्तिक उपकरणावर उघडा.",
    },
    display: {
      wallTitle: "डॉ. बाबासाहेब आंबेडकर वारसा अभिलेखागार",
      wallSubtitle: "स्मार्ट प्रदर्शनी वॉल",
      treatises: "ग्रंथ",
      integrity: "अचूकता",
      scans: "स्कॅन",
      visitors: "अभ्यागत",
      fullscreen: "सिनेमा फुलस्क्रीन",
      exitPortal: "पोर्टलवर परत जा",
      listen: "ऐका",
      narrating: "वाचन सुरू...",
      continueOnMobile: "स्मार्टफोनवर सुरू ठेवा",
      continueSub: "प्रदर्शनीतील विचार व संदर्भ सोबत नेण्यासाठी मोबाईल कॅमेऱ्याने स्कॅन करा.",
      launchKiosk: "किओस्क उघडा",
      searchArchive: "अभिलेखागार शोधा",
    },
    admin: {
      consoleBadge: "अभिलेखागार आणि जतन नियंत्रक",
      consoleTitle: "वारसा जतन आणि दस्तऐवज व्यवस्थापन",
      consoleSubtitle: "ISO 14721 (OAIS), डब्लिन कोर १५, PREMIS ३.० आणि ओसीआर पाइपलाइन सुसंगत.",
      fixityIntegrity: "फिक्सिटी अखंडता: १००%",
      hashesVerified: "३० / ३० हॅश सत्यापित",
      tabs: {
        ingest: "१. दस्तऐवज प्रविष्टी व प्रतीक्षा सूची",
        ocr: "२. ओसीआर अचूकता व दुरुस्ती",
        metadata: "३. डब्लिन कोर / PREMIS मेटाडेटा",
        preservation: "४. जतन व फिक्सिटी नोंदी",
        kiosks: "५. किओस्क ताफ्याचे निरीक्षण",
      },
      uploadTitle: "ऐतिहासिक स्कॅन किंवा पीडीएफ संच अपलोड करा",
      uploadDesc: "TIFF (400+ DPI), PDF/A-1b संरक्षण स्वरूप आणि JPEG2000 समर्थित. पाठवण्यापूर्वी SHA-256 ची गणना केली जाते.",
      uploadProcessing: "प्रविष्टी व SHA-256 प्रक्रिया सुरू...",
      uploadButton: "दस्तऐवज निवडा आणि प्रविष्ट करा",
      livePipeline: "थेट प्रविष्टी प्रक्रिया पाइपलाइन",
      batches: "बॅचेस",
      ingested: "प्रविष्ट",
      ocrProcessing: "ओसीआर प्रक्रिया...",
      embeddings: "pgvector एम्बेडिंग्स...",
      facsimileScan: "मूळ प्रतिकृती (अंक १, पान १)",
      flagged: "ओसीआर अचूकता: ८२.१% (तपासणी आवश्यक)",
      flaggedNote: "८५% पेक्षा कमी अचूकता असलेले शब्द मानवी पडताळणीसाठी पिवळ्या रंगात दाखवले आहेत.",
      correctionField: "अभिलेखागार दुरुस्ती क्षेत्र",
      devanagariLang: "मराठी (देवनागरी)",
      editableText: "संपादनायोग्य काढलेला मजकूर:",
      correctionNote: "मजकूर दुरुस्त केल्यास PostgreSQL tsvector मध्ये तत्काळ पुनर्क्रमण होते आणि संदर्भ पुन्हा तयार होतात.",
      correctionApproved: "दुरुस्ती मंजूर आणि जतन केली",
      approveButton: "मंजूर करा आणि पुनर्क्रमित करा",
      dublinTitle: "डब्लिन कोर मेटाडेटा घटक (ISO 15836)",
      dublinDesc: "आंतरराष्ट्रीय ग्रंथसूची आणि संग्रहालय नोंदींशी सुसंगत अभिलेखागार मेटाडेटा रचना.",
      metaSaved: "मेटाडेटा जतन केला",
      saveDublin: "डब्लिन कोर नोंद जतन करा",
      premisTitle: "PREMIS ३.० फिक्सिटी ऑडिट लॉग",
      premisDesc: "बिट-स्तरीय साठवण अखंडतेची पडताळणी करणारी स्वयंचलित क्रिप्टोग्राफिक चेकसम तपासणी.",
      runChecksumScan: "अनुसूचित चेकसम स्कॅन चालवा",
      tableItemId: "दस्तऐवज आयडी",
      tableTitle: "शीर्षक",
      tableSha: "नोंदवलेला SHA-256",
      tableLastVerified: "शेवटची पडताळणी",
      tableStatus: "स्थिती",
      tableMatch: "सत्यापित (MATCH)",
      kioskFleetTitle: "सक्रिय किओस्क ताफ्याची स्थिती",
      kioskFleetDesc: "थेट पिंग, सक्रिय पडदा, बॅटरी टेलीमेट्री आणि रिमोट सत्र रीसेट.",
      openNewKiosk: "नवीन किओस्क स्क्रीन उघडा ↗",
      remoteReset: "रिमोट रीसेट",
      inspectSurface: "स्क्रीनची पाहणी करा",
      location: "स्थान:",
      activeScreen: "सक्रिय पडदा:",
      lastPing: "शेवटचे पिंग:",
      battery: "बॅटरी:",
    },
    keyboard: {
      touchKeyboard: "टच कीबोर्ड",
      backspace: "बॅकस्पेस",
      del: "काढून टाका",
      space: "स्पेस",
      search: "शोधा",
      close: "बंद करा",
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
      close: "जतन करा आणि बंद करा",
    },
    switcher: {
      kioskTitle: "म्युझियम किओस्क मोड उघडा (1080×1920 टच स्क्रीन)",
      wallTitle: "स्मार्ट डिस्प्ले वॉल उघडा (1920×1080 वॉल स्क्रीन)",
      kioskLabel: "किओस्क",
      wallLabel: "वॉल",
    },
  },
};
