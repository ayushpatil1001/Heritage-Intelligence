export interface TimelineEventItem {
  id: string;
  date: string;
  category: string;
  title_i18n: Record<string, string>;
  description_i18n: Record<string, string>;
  place_id?: string;
  entity_ids?: string[];
  media_item_ids?: string[];
}

export const TIMELINE_EVENTS: TimelineEventItem[] = [
  {
    "id": "tl-1891-birth",
    "date": "1891-04-14",
    "category": "Education",
    "title_i18n": {
      "en": "Birth in Mhow",
      "hi": "महू में जन्म",
      "mr": "महू येथे जन्म"
    },
    "description_i18n": {
      "en": "Bhimrao Ramji Ambedkar was born in the military cantonment town of Mhow (Central Provinces, now Madhya Pradesh).",
      "hi": "भीमराव रामजी आंबेडकर का जन्म महू सैन्य छावनी में हुआ (मध्य प्रांत, वर्तमान मध्य प्रदेश)।",
      "mr": "भीमराव रामजी आंबेडकर यांचा जन्म महू लष्करी छावणीत झाला (मध्य प्रांत, आता मध्य प्रदेश)."
    },
    "place_id": "place-mhow",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-photo-drafting-committee"
    ]
  },
  {
    "id": "tl-1907-matriculation",
    "date": "1907-11-01",
    "category": "Education",
    "title_i18n": {
      "en": "Matriculation from Elphinstone High School",
      "hi": "एल्फिंस्टन हाई स्कूल से मैट्रिक",
      "mr": "एल्फिन्स्टन हायस्कूलमधून मॅट्रिक उत्तीर्ण"
    },
    "description_i18n": {
      "en": "Became the first Mahar youth to pass the matriculation examination, celebrated across Bombay.",
      "hi": "मैट्रिक परीक्षा उत्तीर्ण करने वाले पहले महार युवक बने, पूरे मुंबई में अभिनंदन किया गया।",
      "mr": "मॅट्रिक परीक्षा उत्तीर्ण होणारे पहिले महार तरुण ठरले, मुंबईत जाहीर सत्कार करण्यात आला."
    },
    "place_id": "place-bombay",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": []
  },
  {
    "id": "tl-1913-columbia",
    "date": "1913-07-20",
    "category": "Education",
    "title_i18n": {
      "en": "Enrolment at Columbia University, New York",
      "hi": "कोलंबिया विश्वविद्यालय, न्यूयॉर्क में प्रवेश",
      "mr": "कोलंबिया विद्यापीठ, न्यूयॉर्क येथे प्रवेश"
    },
    "description_i18n": {
      "en": "Awarded the Baroda State scholarship to pursue postgraduate studies under John Dewey, Edwin Seligman, and Alexander Goldenweiser.",
      "hi": "बड़ौदा राज्य छात्रवृत्ति प्राप्त कर जॉन डेवी और एडविन सेलिगमैन के मार्गदर्शन में उच्च शिक्षा आरंभ की।",
      "mr": "बडोदा संस्थानाची शिष्यवृत्ती मिळवून जॉन ड्युई व एडविन सेलिगमन यांच्या मार्गदर्शनाखाली उच्च शिक्षण सुरू केले."
    },
    "place_id": "place-columbia",
    "entity_ids": [
      "entity-ambedkar",
      "entity-john-dewey"
    ],
    "media_item_ids": [
      "item-dissertation-columbia"
    ]
  },
  {
    "id": "tl-1916-lse",
    "date": "1916-10-01",
    "category": "Education",
    "title_i18n": {
      "en": "Admitted to Gray's Inn and London School of Economics",
      "hi": "ग्रेज इन और लंदन स्कूल ऑफ इकोनॉमिक्स में प्रवेश",
      "mr": "ग्रेज इन आणि लंडन स्कूल ऑफ इकॉनॉमिक्समध्ये प्रवेश"
    },
    "description_i18n": {
      "en": "Commenced legal studies for the Bar at Gray's Inn and advanced research in monetary economics at LSE.",
      "hi": "ग्रेज इन में बैरिस्टर की पढ़ाई और एलएसई में मौद्रिक अर्थशास्त्र में अनुसंधान शुरू किया।",
      "mr": "ग्रेज इन येथे बॅरिस्टर पदवीसाठी आणि लंडन स्कूल ऑफ इकॉनॉमिक्समध्ये अर्थशास्त्रातील संशोधनासाठी प्रवेश."
    },
    "place_id": "place-london",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-baws-06-rupee"
    ]
  },
  {
    "id": "tl-1919-southborough",
    "date": "1919-01-27",
    "category": "Politics",
    "title_i18n": {
      "en": "Testimony before Southborough Committee",
      "hi": "साउथबरो समिति के समक्ष साक्ष्य",
      "mr": "साउथबरो समितीसमोर साक्ष"
    },
    "description_i18n": {
      "en": "Demanded separate electorates and universal adult franchise for the depressed classes in British India.",
      "hi": "ब्रिटिश भारत में वंचित वर्गों के लिए पृथक निर्वाचन क्षेत्र और वयस्क मताधिकार की मांग की।",
      "mr": "ब्रिटिश भारतात अस्पृश्य वर्गासाठी स्वतंत्र मतदारसंघ आणि प्रौढ मतदानाच्या अधिकाराची मागणी केली."
    },
    "place_id": "place-bombay",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-baws-12-southborough"
    ]
  },
  {
    "id": "tl-1920-mooknayak",
    "date": "1920-01-31",
    "category": "Social Reform",
    "title_i18n": {
      "en": "Launch of Mooknayak Fortnightly",
      "hi": "मूकनायक पाक्षिक का प्रकाशन",
      "mr": "मूकनायक पाक्षिकाची सुरुवात"
    },
    "description_i18n": {
      "en": "Launched the Marathi journal 'Mooknayak' (Leader of the Voiceless) with the support of Chhatrapati Shahu Maharaj.",
      "hi": "छत्रपति शाहू महाराज के सहयोग से 'मूकनायक' मराठी पाक्षिक समाचार पत्र की शुरुआत की।",
      "mr": "छत्रपती शाहू महाराजांच्या आर्थिक सहकार्याने 'मूकनायक' हे पाक्षिक सुरू केले."
    },
    "place_id": "place-bombay",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-editorial-mooknayak"
    ]
  },
  {
    "id": "tl-1923-rupee-dsc",
    "date": "1923-11-01",
    "category": "Education",
    "title_i18n": {
      "en": "Conferment of D.Sc. by University of London",
      "hi": "लंदन विश्वविद्यालय द्वारा डी.एससी. उपाधि",
      "mr": "लंडन विद्यापीठाकडून डी.एस्सी. पदवी बहाल"
    },
    "description_i18n": {
      "en": "Awarded Doctor of Science for the seminal work 'The Problem of the Rupee: Its Origin and Its Solution'.",
      "hi": "मौलिक शोधग्रंथ 'द प्रॉब्लम ऑफ द रूपी' के लिए डॉक्टर ऑफ साइंस की उपाधि प्रदान की गई।",
      "mr": "'द प्रॉब्लेम ऑफ द रूपी' या ग्रंथासाठी लंडन विद्यापीठाने डॉक्टर ऑफ सायन्स पदवी प्रदान केली."
    },
    "place_id": "place-london",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-baws-06-rupee"
    ]
  },
  {
    "id": "tl-1924-bahishkrit-sabha",
    "date": "1924-07-20",
    "category": "Social Reform",
    "title_i18n": {
      "en": "Founding of Bahishkrit Hitakarini Sabha",
      "hi": "बहिष्कृत हितकारिणी सभा की स्थापना",
      "mr": "बहिष्कृत हितकारिणी सभेची स्थापना"
    },
    "description_i18n": {
      "en": "Adopted the historic clarion call: 'Educate, Agitate, Organise' to elevate the social standing of the depressed classes.",
      "hi": "'शिक्षित बनो, आंदोलन करो, संगठित रहो' के ऐतिहासिक संदेश के साथ सभा की स्थापना की।",
      "mr": "'शिका, संघटित व्हा आणि संघर्ष करा' हे ब्रीदवाक्य घेऊन बहिष्कृत हितकारिणी सभेची स्थापना केली."
    },
    "place_id": "place-bombay",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": []
  },
  {
    "id": "tl-1927-mahad-satyagraha",
    "date": "1927-03-20",
    "category": "Social Reform",
    "title_i18n": {
      "en": "Mahad Chavdar Tale Satyagraha",
      "hi": "महाड चवदार तालाब सत्याग्रह",
      "mr": "महाड चवदार तळे सत्याग्रह"
    },
    "description_i18n": {
      "en": "Asserted fundamental civic rights by drinking water from the public Chavdar water reservoir at Mahad.",
      "hi": "महाड के सार्वजनिक चवदार तालाब से जल पीकर मानवाधिकारों और नागरिक समानता का उद्घोष किया।",
      "mr": "महाड येथील सार्वजनिक चवदार तळ्याचे पाणी प्राशन करून मानवी हक्कांची ऐतिहासिक क्रांती घडवली."
    },
    "place_id": "place-mahad",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-mahad-declaration"
    ]
  },
  {
    "id": "tl-1927-manusmriti-dahan",
    "date": "1927-12-25",
    "category": "Social Reform",
    "title_i18n": {
      "en": "Manusmriti Dahan at Mahad",
      "hi": "महाड में मनुस्मृति दहन",
      "mr": "महाड येथे मनुस्मृती दहन"
    },
    "description_i18n": {
      "en": "Public burning of the Manusmriti to repudiate ancient caste sanction and assert human dignity.",
      "hi": "जातिगत असमानता को अस्वीकार करने और मानवीय गरिमा स्थापित करने के लिए सार्वजनिक रूप से मनुस्मृति का दहन किया।",
      "mr": "जातीव्यवस्थेचा पाया असणाऱ्या ग्रंथाचे जाहीर दहन करून मानवी समतेची घोषणा केली."
    },
    "place_id": "place-mahad",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-mahad-declaration"
    ]
  },
  {
    "id": "tl-1930-kalaram",
    "date": "1930-03-02",
    "category": "Social Reform",
    "title_i18n": {
      "en": "Kalaram Temple Entry Satyagraha",
      "hi": "कालाराम मंदिर प्रवेश सत्याग्रह",
      "mr": "काळाराम मंदिर प्रवेश सत्याग्रह"
    },
    "description_i18n": {
      "en": "Launched a peaceful 5-year satyagraha at Nashik demanding equal right of entry into Hindu temples.",
      "hi": "नासिक में हिंदू मंदिरों में समान प्रवेश अधिकार की मांग को लेकर 5 वर्षीय अहिंसक सत्याग्रह प्रारंभ किया।",
      "mr": "नाशिक येथे मंदिरात प्रवेशाचा हक्क मिळवण्यासाठी शांततापूर्ण सत्याग्रह सुरू केला."
    },
    "place_id": "place-nashik",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": []
  },
  {
    "id": "tl-1930-round-table",
    "date": "1930-11-12",
    "category": "Politics",
    "title_i18n": {
      "en": "First Round Table Conference, London",
      "hi": "प्रथम गोलमेज सम्मेलन, लंदन",
      "mr": "पहिली गोलमेज परिषद, लंडन"
    },
    "description_i18n": {
      "en": "Represented the Depressed Classes of India, presenting their sovereign constitutional charter of rights.",
      "hi": "भारत के शोषित वर्गों का प्रतिनिधित्व करते हुए उनके संवैधानिक अधिकारों का घोषणापत्र प्रस्तुत किया।",
      "mr": "भारतातील अस्पृश्य वर्गाचे प्रतिनिधित्व करून त्यांच्या घटनात्मक हक्कांची भक्कम मांडणी केली."
    },
    "place_id": "place-london",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": []
  },
  {
    "id": "tl-1932-poona-pact",
    "date": "1932-09-24",
    "category": "Politics",
    "title_i18n": {
      "en": "Signing of the Historic Poona Pact",
      "hi": "ऐतिहासिक पूना समझौते पर हस्ताक्षर",
      "mr": "ऐतिहासिक पुणे करारावर स्वाक्षरी"
    },
    "description_i18n": {
      "en": "Negotiated with Mahatma Gandhi in Yerwada Prison, securing reserved seats in provincial legislatures.",
      "hi": "यरवदा जेल में महात्मा गांधी के साथ वार्ता के बाद प्रांतीय विधायिकाओं में सुरक्षित सीटों का ऐतिहासिक समझौता हुआ।",
      "mr": "येरवडा कारागृहात महात्मा गांधींशी चर्चा करून प्रांतिक विधिमंडळात राखीव जागांचा ऐतिहासिक करार केला."
    },
    "place_id": "place-pune",
    "entity_ids": [
      "entity-ambedkar",
      "entity-gandhi"
    ],
    "media_item_ids": [
      "item-poona-pact-doc"
    ]
  },
  {
    "id": "tl-1935-yeola",
    "date": "1935-10-13",
    "category": "Buddhism",
    "title_i18n": {
      "en": "Historic Yeola Conversion Declaration",
      "hi": "ऐतिहासिक येवला धर्मांतरण घोषणा",
      "mr": "ऐतिहासिक येवला धर्मांतरण घोषणा"
    },
    "description_i18n": {
      "en": "Solemnly declared: 'Even though I was born a Hindu, I will not die a Hindu.'",
      "hi": "ऐतिहासिक घोषणा की: 'यद्यपि मेरा जन्म हिंदू के रूप में हुआ है, किंतु मैं हिंदू के रूप में मरूंगा नहीं।'",
      "mr": "'मी हिंदू म्हणून जन्मलो असलो तरी हिंदू म्हणून मरणार नाही' ही ऐतिहासिक घोषणा केली."
    },
    "place_id": "place-yeola",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": []
  },
  {
    "id": "tl-1936-aoc",
    "date": "1936-05-15",
    "category": "Social Reform",
    "title_i18n": {
      "en": "Publication of Annihilation of Caste",
      "hi": "जाति का विनाश का प्रकाशन",
      "mr": "जातीचे निर्मूलन या ग्रंथाचे प्रकाशन"
    },
    "description_i18n": {
      "en": "Published the seminal manifesto critiquing the caste system, graded inequality, and the shastras.",
      "hi": "जाति व्यवस्था, श्रेणीबद्ध असमानता और शास्त्रों की तार्किक समीक्षा करते हुए विश्वप्रसिद्ध ग्रंथ प्रकाशित किया।",
      "mr": "जातीव्यवस्था, उतरंड आणि धार्मिक ग्रंथांची चिकित्सक मीमांसा करणारा जगप्रसिद्ध ग्रंथ प्रकाशित केला."
    },
    "place_id": "place-bombay",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-baws-01-aoc"
    ]
  },
  {
    "id": "tl-1936-ilp",
    "date": "1936-08-15",
    "category": "Politics",
    "title_i18n": {
      "en": "Founding of Independent Labour Party",
      "hi": "स्वतंत्र लेबर पार्टी की स्थापना",
      "mr": "स्वतंत्र मजूर पक्षाची स्थापना"
    },
    "description_i18n": {
      "en": "Formed the party to protect the rights of agricultural peasants, mill workers, and factory labourers.",
      "hi": "श्रमिकों, किसानों और मजदूरों के सामाजिक-आर्थिक अधिकारों की रक्षा के लिए स्वतंत्र लेबर पार्टी का गठन किया।",
      "mr": "शेतकरी, गिरणी कामगार आणि कष्टकऱ्यांच्या आर्थिक हक्कांसाठी स्वतंत्र मजूर पक्षाची स्थापना केली."
    },
    "place_id": "place-bombay",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": []
  },
  {
    "id": "tl-1942-labour-member",
    "date": "1942-07-20",
    "category": "Politics",
    "title_i18n": {
      "en": "Labour Member in Viceroy's Executive Council",
      "hi": "वायसराय की कार्यकारी परिषद में श्रम सदस्य",
      "mr": "व्हाइसरॉयच्या कार्यकारी परिषदेत कामगार मंत्री"
    },
    "description_i18n": {
      "en": "Pioneered landmark labour reforms including the 8-hour workday, maternity benefits, and Employee State Insurance.",
      "hi": "8 घंटे का कार्यदिवस, मातृत्व अवकाश और कर्मचारी राज्य बीमा जैसे ऐतिहासिक श्रम सुधार लागू किए।",
      "mr": "कामाचे ८ तास, महिलांसाठी प्रसूती रजा, आणि कर्मचारी राज्य विमा अशा क्रांतिकारक कामगार सुधारणा लागू केल्या."
    },
    "place_id": "place-delhi",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": []
  },
  {
    "id": "tl-1946-baws-cabinet",
    "date": "1946-12-09",
    "category": "Constitution",
    "title_i18n": {
      "en": "Elected to the Constituent Assembly",
      "hi": "संविधान सभा में निर्वाचन",
      "mr": "घटना समितीवर निवड"
    },
    "description_i18n": {
      "en": "Elected to the Constituent Assembly from Bengal with support from Jogendra Nath Mandal.",
      "hi": "जोगेंद्र नाथ मंडल के समर्थन से बंगाल प्रांत से संविधान सभा के लिए ऐतिहासिक निर्वाचन।",
      "mr": "जोगेंद्र नाथ मंडल यांच्या सहकार्याने बंगाल प्रांतातून घटना समितीवर ऐतिहासिक निवड झाली."
    },
    "place_id": "place-delhi",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": []
  },
  {
    "id": "tl-1947-drafting-chairman",
    "date": "1947-08-29",
    "category": "Constitution",
    "title_i18n": {
      "en": "Appointed Chairman of the Drafting Committee",
      "hi": "प्रारूप समिति के अध्यक्ष नियुक्त",
      "mr": "मसुदा समितीचे अध्यक्ष म्हणून नियुक्ती"
    },
    "description_i18n": {
      "en": "Elected unanimously by the Constituent Assembly to pilot the drafting of the Constitution of free India.",
      "hi": "स्वतंत्र भारत के संविधान के निर्माण हेतु संविधान सभा द्वारा सर्वसम्मति से प्रारूप समिति का अध्यक्ष चुना गया।",
      "mr": "स्वतंत्र भारताच्या राज्यघटनेची निर्मिती करण्यासाठी घटना समितीने एकमुखाने मसुदा समितीचे अध्यक्ष म्हणून निवड केली."
    },
    "place_id": "place-delhi",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-photo-drafting-committee"
    ]
  },
  {
    "id": "tl-1948-art32-speech",
    "date": "1948-12-09",
    "category": "Constitution",
    "title_i18n": {
      "en": "Defense of Article 32 (Constitutional Remedies)",
      "hi": "अनुच्छेद 32 का ऐतिहासिक बचाव",
      "mr": "कलम 32 चे ऐतिहासिक समर्थन"
    },
    "description_i18n": {
      "en": "Declared Article 32 to be the 'Heart and Soul' of the Constitution safeguarding fundamental rights.",
      "hi": "अनुच्छेद 32 को मौलिक अधिकारों की सुरक्षा हेतु संविधान का 'हृदय और आत्मा' घोषित किया।",
      "mr": "मूलभूत हक्कांचे रक्षण करणारे कलम 32 हे संविधानाचा 'आत्मा आणि हृदय' असल्याचे घोषित केले."
    },
    "place_id": "place-delhi",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-cad-art32"
    ]
  },
  {
    "id": "tl-1949-constitution-adoption",
    "date": "1949-11-26",
    "category": "Constitution",
    "title_i18n": {
      "en": "Adoption of the Constitution of India",
      "hi": "भारतीय संविधान का अंगीकरण",
      "mr": "भारतीय राज्यघटना स्वीकारण्यात आली"
    },
    "description_i18n": {
      "en": "The Constituent Assembly adopted the Constitution of India, setting January 26, 1950 as Republic Day.",
      "hi": "संविधान सभा ने भारतीय संविधान को औपचारिक रूप से स्वीकार किया।",
      "mr": "घटना समितीने भारताचे संविधान अधिकृतरीत्या स्वीकारले व 26 नोव्हेंबर हा संविधान दिन ठरला."
    },
    "place_id": "place-delhi",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-cad-final-speech"
    ]
  },
  {
    "id": "tl-1951-resignation",
    "date": "1951-09-27",
    "category": "Politics",
    "title_i18n": {
      "en": "Resignation over Hindu Code Bill",
      "hi": "हिंदू कोड बिल पर विधि मंत्री पद से इस्तीफा",
      "mr": "हिंदू कोड बिलावरून कायदामंत्री पदाचा राजीनामा"
    },
    "description_i18n": {
      "en": "Resigned as India's first Law Minister when women's property and marriage rights in the Hindu Code Bill were stalled.",
      "hi": "महिलाओं के संपत्ति और विवाह अधिकारों से जुड़े हिंदू कोड बिल के पारित न होने पर कानून मंत्री पद से त्यागपत्र दे दिया।",
      "mr": "महिलांच्या मालमत्ता व विवाह हक्कांचे रक्षण करणारे हिंदू कोड बिल मंजूर न झाल्यामुळे कायदामंत्री पदाचा राजीनामा दिला."
    },
    "place_id": "place-delhi",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-hindu-code-resignation"
    ]
  },
  {
    "id": "tl-1956-deekshabhoomi",
    "date": "1956-10-14",
    "category": "Buddhism",
    "title_i18n": {
      "en": "Deekshabhoomi Nagpur: Dhamma Conversion",
      "hi": "दीक्षाभूमि नागपुर: बौद्ध धम्म दीक्षा",
      "mr": "दीक्षाभूमी नागपूर: ऐतिहासिक धम्मदीक्षा"
    },
    "description_i18n": {
      "en": "Embraced Buddhism along with over 500,000 followers, administering the historic 22 Vows.",
      "hi": "5 लाख से अधिक अनुयायियों के साथ बौद्ध धम्म स्वीकार किया और 22 प्रतिज्ञाएं दिलाईं।",
      "mr": "नागपूर येथे ५ लाखांहून अधिक अनुयायांसह बौद्ध धम्माची दीक्षा घेतली आणि २२ प्रतिज्ञा दिल्या."
    },
    "place_id": "place-nagpur",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": [
      "item-deekshabhoomi-speech"
    ]
  },
  {
    "id": "tl-1956-mahaparinirvana",
    "date": "1956-12-06",
    "category": "Legacy",
    "title_i18n": {
      "en": "Mahaparinirvana at 26 Alipur Road, New Delhi",
      "hi": "महापरिनिर्वाण: 26 अलीपुर रोड, नई दिल्ली",
      "mr": "महापरिनिर्वाण: २६ अलीपूर रोड, नवी दिल्ली"
    },
    "description_i18n": {
      "en": "Passed away peacefully in his residence, leaving behind an immortal legacy of human freedom, dignity, and constitutional justice.",
      "hi": "नई दिल्ली स्थित आवास पर महापरिनिर्वाण हुआ; मानवीय स्वतंत्रता और संवैधानिक न्याय की अमर विरासत छोड़ गए।",
      "mr": "नवी दिल्ली येथील निवासस्थानी महापरिनिर्वाण झाले; स्वातंत्र्य, समता आणि बंधुतेचा शाश्वत वारसा जगाला दिला."
    },
    "place_id": "place-delhi",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": []
  },
  {
    "id": "tl-1990-bharat-ratna",
    "date": "1990-04-14",
    "category": "Legacy",
    "title_i18n": {
      "en": "Conferment of Bharat Ratna",
      "hi": "मरणोपरांत भारत रत्न से सम्मानित",
      "mr": "मरणोत्तर 'भारतरत्न' सर्वोच्च सन्मान"
    },
    "description_i18n": {
      "en": "Posthumously conferred India's highest civilian honour, Bharat Ratna, on his birth centenary.",
      "hi": "जन्म शताब्दी वर्ष के अवसर पर भारत के सर्वोच्च नागरिक सम्मान 'भारत रत्न' से विभूषित किया गया।",
      "mr": "जन्मशताब्दी वर्षात भारताचा सर्वोच्च नागरी सन्मान 'भारतरत्न' मरणोत्तर प्रदान करण्यात आला."
    },
    "place_id": "place-delhi",
    "entity_ids": [
      "entity-ambedkar"
    ],
    "media_item_ids": []
  }
];
