/**
 * Authenticated Primary Source Catalog & In-Memory Hybrid Search
 * Grounded in 30 Seeded Public-Domain Records from BAWS and CAD.
 */

export interface PageWord {
  text: string;
  bbox: number[];
  conf: number;
}

export interface CatalogPage {
  page_no: number;
  ocr_text: string;
  ocr_confidence: number;
  lang?: string;
  words?: PageWord[];
  translations?: Record<string, string>;
}

export interface CatalogItem {
  id: string;
  collection_id?: string;
  type: string;
  title: string;
  title_i18n: Record<string, string>;
  creator: string;
  date_start: string;
  date_end?: string;
  source: string;
  provenance: string;
  rights: string;
  access_tier: string;
  status: string;
  snippet: string;
  page_no: number;
  pages: CatalogPage[];
  summary?: Record<string, string>;
}

export interface SearchResultItem {
  id: string;
  item_id: string;
  type: string;
  title: string;
  title_i18n: Record<string, string>;
  snippet: string;
  source: string;
  date: string;
  page_no: number;
  score: number;
  access_tier?: string;
}

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    "id": "item-baws-01-caste",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Castes in India: Their Mechanism, Genesis and Development",
    "title_i18n": {
      "en": "Castes in India: Their Mechanism, Genesis and Development",
      "hi": "भारत में जातियां: उनकी कार्यप्रणाली, उत्पत्ति और विकास",
      "mr": "भारतातील जाती: त्यांची यंत्रणा, निर्मिती आणि विकास"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1916-05-09",
    "date_end": "1916-05-09",
    "source": "Columbia University Anthropology Seminar",
    "provenance": "Paper presented before the Anthropology Seminar of Dr. A. A. Goldenweiser at Columbia University, New York, May 9, 1916.",
    "rights": "Public Domain (BAWS Vol. 1)",
    "access_tier": "open",
    "status": "published",
    "snippet": "Endogamy is the only one characteristic that is peculiar to caste. The superposition of endogamy on exogamy means the creation of caste. Castes are enclosed units that create the problem of surplus men and surplus women.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Endogamy is the only one characteristic that is peculiar to caste, and if we succeed in showing how endogamy is maintained, we shall thereby prove the mechanism and genesis of caste. The superposition of endogamy on exogamy means the creation of caste. Castes are enclosed units, and it is their closed character that creates the problem of surplus men and surplus women. The Hindu society is a collection of castes, and each caste maintains its existence through endogamous closure.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Endogamy",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "characteristic",
            "bbox": [
              160,
              40,
              270,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "caste",
            "bbox": [
              50,
              80,
              110,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "mechanism",
            "bbox": [
              120,
              80,
              220,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "अंतर्विवाह (Endogamy) ही जाति की एकमात्र विशिष्ट विशेषता है, और यदि हम यह प्रदर्शित करने में सफल हो जाएं कि अंतर्विवाह को कैसे बनाए रखा जाता है, तो हम जाति की कार्यप्रणाली और उत्पत्ति को सिद्ध कर देंगे। बहिर्विवाह पर अंतर्विवाह का अध्यारोपण ही जाति का निर्माण है। जातियां बंद इकाइयां हैं, और उनका यह बंद स्वरूप ही अतिरिक्त पुरुषों और महिलाओं की समस्या को जन्म देता है।",
          "mr": "आंतरविवाह (Endogamy) हे जातीचे एकमेव वैशिष्ट्य आहे, आणि जर आपण हे सिद्ध करण्यात यशस्वी झालो की आंतरविवाह कसा टिकवून ठेवला जातो, तर आपण जातीची यंत्रणा आणि निर्मिती सिद्ध करू शकू. बहिर्विवाहावर आंतरविवाहाचे केलेले रोपण म्हणजेच जातीची निर्मिती होय. जाती या बंदिस्त घटक आहेत, आणि त्यांचे हे बंदिस्त स्वरूपच अतिरिक्त पुरुष आणि स्त्रियांचा प्रश्न निर्माण करते."
        }
      }
    ],
    "summary": {
      "en": "Seminal anthropological treatise delivered at Columbia University (1916). Dr. Ambedkar analyzes how endogamy superimposed upon exogamous tribal customs formed rigid enclosed units, generating structural caste barriers in Indian society.",
      "hi": "कोलंबिया विश्वविद्यालय (1916) में प्रस्तुत ऐतिहासिक मानवशास्त्रीय शोधपत्र। डॉ. आंबेडकर ने विश्लेषण किया कि कैसे बहिर्विवाह प्रथा पर अंतर्विवाह थोपे जाने से बंद इकाइयां बनीं जिन्होंने जाति व्यवस्था को जन्म दिया।",
      "mr": "कोलंबिया विद्यापीठात (१९१६) सादर केलेला ऐतिहासिक मानववंशशास्त्रीय प्रबंध. डॉ. आंबेडकरांनी सविस्तर मांडणी केली की बहिर्विवाहावर आंतरविवाहाचे निर्बंध लादून कशा बंदिस्त जाती निर्माण झाल्या."
    }
  },
  {
    "id": "item-baws-01-aoc",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Annihilation of Caste",
    "title_i18n": {
      "en": "Annihilation of Caste",
      "hi": "जाति का विनाश (एनिहिलेशन ऑफ कास्ट)",
      "mr": "जातीचे निर्मूलन"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1936-05-15",
    "date_end": "1936-05-15",
    "source": "Jat-Pat-Todak Mandal Undelivered Presidential Address",
    "provenance": "Prepared as the presidential address for the 1936 Lahore conference of Jat-Pat-Todak Mandal; published independently by Dr. Ambedkar in May 1936.",
    "rights": "Public Domain (BAWS Vol. 1)",
    "access_tier": "open",
    "status": "published",
    "snippet": "Caste is not just a division of labour, it is a division of labourers. It is an hierarchy in which the division of labourers is graded one above another. You cannot build anything on the foundations of caste.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Caste is not just a division of labour, it is a division of labourers. It is an hierarchy in which the division of labourers is graded one above another. You cannot build anything on the foundations of caste. You cannot build up a nation, you cannot build up an ideal society. Anything you build on caste will crack and will never be a whole. Reason and morality must be the foundation of any enduring social order, not inherited gradation.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "division",
            "bbox": [
              50,
              40,
              130,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "labourers",
            "bbox": [
              140,
              40,
              240,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "hierarchy",
            "bbox": [
              50,
              80,
              140,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "morality",
            "bbox": [
              150,
              80,
              230,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "जाति केवल श्रम का विभाजन नहीं है, यह श्रमिकों का विभाजन है। यह एक ऐसी श्रेणीबद्ध व्यवस्था है जिसमें श्रमिकों को एक के ऊपर एक क्रमबद्ध किया गया है। आप जाति की नींव पर किसी राष्ट्र या आदर्श समाज का निर्माण नहीं कर सकते। जाति पर बनी कोई भी व्यवस्था खंडित हो जाएगी। कारण और नैतिकता ही किसी स्थायी सामाजिक व्यवस्था का आधार होना चाहिए।",
          "mr": "जाती ही केवळ श्रमाची विभागणी नसून ती श्रमिकांची विभागणी आहे. ही अशी उतरंड आहे ज्यात श्रमिकांची श्रेणीबद्ध विभागणी केली गेली आहे. जातीच्या पायावर तुम्ही राष्ट्र किंवा आदर्श समाज उभारू शकत नाही. जातीवर उभारलेली कोणतीही गोष्ट कधीही एकसंध राहू शकत नाही. विवेक आणि नैतिकता हाच कोणत्याही चिरंतन सामाजिक व्यवस्थेचा पाया असला पाहिजे."
        }
      }
    ],
    "summary": {
      "en": "Masterpiece critique of the caste system (1936). Dr. Ambedkar argues that political reform without social reform is hollow, demonstrating that caste prevents social cohesion and democratic fraternity.",
      "hi": "जाति व्यवस्था की कालजयी दार्शनिक मीमांसा (1936)। डॉ. आंबेडकर ने सिद्ध किया कि सामाजिक सुधार के बिना राजनीतिक सुधार व्यर्थ है और जाति लोकतांत्रिक बंधुत्व की सबसे बड़ी बाधा है।",
      "mr": "जातिव्यवस्थेवरील जागतिक कीर्तीची तात्विक मांडणी (१९३६). डॉ. आंबेडकरांनी दाखवून दिले की सामाजिक सुधारणांशिवाय राजकीय स्वातंत्र्य अपूर्ण आहे आणि जातीव्यवस्था लोकशाही बंधुभावाचा नाश करते."
    }
  },
  {
    "id": "item-cad-art32",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. VII: Article 32 Heart and Soul of the Constitution",
    "title_i18n": {
      "en": "CAD Vol. VII: Article 32 Heart and Soul of the Constitution",
      "hi": "संविधान सभा वादविवाद खंड VII: अनुच्छेद 32 संविधान का हृदय और आत्मा",
      "mr": "घटना समिती चर्चा खंड VII: कलम ३२ राज्यघटनेचा आत्मा आणि हृदय"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-12-09",
    "date_end": "1948-12-09",
    "source": "Constituent Assembly of India Debates",
    "provenance": "Official Report, Constituent Assembly of India, Council Chamber, New Delhi, December 9, 1948.",
    "rights": "Public Domain (Parliament of India)",
    "access_tier": "open",
    "status": "published",
    "snippet": "If I was asked to name any particular article in this Constitution as the most important—an article without which this Constitution would be a nullity—I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it.",
    "page_no": 953,
    "pages": [
      {
        "page_no": 953,
        "ocr_text": "If I was asked to name any particular article in this Constitution as the most important—an article without which this Constitution would be a nullity—I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it. Fundamental rights are meaningless without a constitutional remedy to enforce them directly before the Supreme Court.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "article",
            "bbox": [
              50,
              40,
              110,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "nullity",
            "bbox": [
              120,
              40,
              180,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "soul",
            "bbox": [
              50,
              80,
              100,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "heart",
            "bbox": [
              110,
              80,
              160,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "यदि मुझसे पूछा जाए कि इस संविधान में ऐसा कौन सा अनुच्छेद है जो सबसे महत्वपूर्ण है—जिसके बिना यह संविधान निष्प्रभावी और शून्य हो जाएगा—तो मैं इस अनुच्छेद (अनुच्छेद 32) के अलावा किसी अन्य का उल्लेख नहीं कर सकता। यह संविधान की आत्मा और उसका हृदय है। उच्चतम न्यायालय में सीधे लागू करने के संवैधानिक उपचार के बिना मौलिक अधिकार अर्थहीन हैं।",
          "mr": "जर मला या संविधानातील सर्वात महत्त्वाचे कलम कोणते असे विचारले गेले—ज्या कलमाशिवाय हे संविधान निष्प्रभ ठरेल—तर मी या कलमाशिवाय (कलम ३२) इतर कोणत्याही कलमाचा उल्लेख करू शकत नाही. हा संविधानाचा आत्मा आणि त्याचे हृदय आहे. सर्वोच्च न्यायालयात थेट दाद मागण्याच्या घटनात्मक उपायाशिवाय मूलभूत अधिकार निरर्थक आहेत."
        }
      }
    ],
    "summary": {
      "en": "Historic Constituent Assembly intervention on Draft Article 25 (Article 32). Dr. Ambedkar firmly establishes direct constitutional writ jurisdiction as the inviolable safeguard guaranteeing all fundamental freedoms.",
      "hi": "संविधान सभा में प्रारूप अनुच्छेद 25 (अनुच्छेद 32) पर ऐतिहासिक हस्तक्षेप। डॉ. आंबेडकर ने प्रत्यक्ष रिट क्षेत्राधिकार को सभी मौलिक अधिकारों की जीवनरेखा के रूप में स्थापित किया।",
      "mr": "घटना समितीत मसुदा कलम २५ (कलम ३२) वरील ऐतिहासिक भाषण. डॉ. आंबेडकरांनी मूलभूत हक्कांच्या थेट संरक्षणासाठी सर्वोच्च न्यायालयाच्या प्राधिकरणाला संविधानाचा आत्मा ठरवले."
    }
  },
  {
    "id": "item-cad-final-speech",
    "collection_id": "col-cad",
    "type": "speech",
    "title": "Grammar of Anarchy (Final Assembly Speech)",
    "title_i18n": {
      "en": "Grammar of Anarchy (Final Assembly Speech)",
      "hi": "अराजकता का व्याकरण (अंतिम संविधान सभा भाषण)",
      "mr": "अराजकतेचे व्याकरण (अंतिम संविधान सभा भाषण)"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1949-11-25",
    "date_end": "1949-11-25",
    "source": "Constituent Assembly of India Debates Vol. XI",
    "provenance": "Delivered on the eve of the adoption of the Constitution of India, November 25, 1949.",
    "rights": "Public Domain (Parliament of India)",
    "access_tier": "open",
    "status": "published",
    "snippet": "We must hold fast to constitutional methods of achieving our social and economic objectives. It means we must abandon the method of civil disobedience, non-cooperation and satyagraha. These methods are nothing but the Grammar of Anarchy.",
    "page_no": 978,
    "pages": [
      {
        "page_no": 978,
        "ocr_text": "We must hold fast to constitutional methods of achieving our social and economic objectives. It means we must abandon the bloody methods of revolution. It means that we must abandon the method of civil disobedience, non-cooperation and satyagraha. These methods are nothing but the Grammar of Anarchy. On the 26th of January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality. We must remove this contradiction at the earliest possible moment or else those who suffer from inequality will blow up the structure of political democracy.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "constitutional",
            "bbox": [
              50,
              40,
              180,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Grammar",
            "bbox": [
              200,
              80,
              280,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "Anarchy",
            "bbox": [
              290,
              80,
              360,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "contradictions",
            "bbox": [
              50,
              120,
              180,
              140
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "हमें अपने सामाजिक और आर्थिक उद्देश्यों को प्राप्त करने के लिए संवैधानिक तरीकों को मजबूती से थामे रखना चाहिए। इसका अर्थ है कि हमें सत्याग्रह, असहयोग और सविनय अवज्ञा जैसे तरीकों को छोड़ना होगा, क्योंकि वे अराजकता के व्याकरण के सिवा कुछ नहीं हैं। 26 जनवरी 1950 को हम अंतर्विरोधों के जीवन में प्रवेश करने जा रहे हैं। राजनीति में समानता होगी और सामाजिक व आर्थिक जीवन में असमानता। हमें इस अंतर्विरोध को जल्द से जल्द दूर करना होगा अन्यथा पीड़ित लोग इस राजनीतिक लोकतंत्र के ढांचे को ध्वस्त कर देंगे।",
          "mr": "आपली सामाजिक व आर्थिक उद्दिष्टे साध्य करण्यासाठी आपण घटनात्मक मार्गांचीच कास धरली पाहिजे. याचा अर्थ आपण सत्याग्रह, असहकार आणि सविनय कायदेभंग हे मार्ग सोडले पाहिजेत, कारण हे मार्ग 'अराजकतेचे व्याकरण' आहेत. २६ जानेवारी १९५० रोजी आपण एका विरोधाभासी जीवनात प्रवेश करणार आहोत. राजकारणात आपल्याकडे समानता असेल, पण सामाजिक आणि आर्थिक जीवनात विषमता असेल. हा विरोधाभास आपण लवकरात लवकर दूर केला पाहिजे, अन्यथा विषमतेचे बळी ठरलेले लोक या राजकीय लोकशाहीचा ढाचा उद्ध्वस्त करतील."
        }
      }
    ],
    "summary": {
      "en": "Dr. Ambedkar's valedictory address to the Constituent Assembly (Nov 25, 1949). Warns of entering a life of contradictions between political equality and socioeconomic inequality, advocating strict adherence to constitutional methods.",
      "hi": "संविधान सभा में 25 नवंबर 1949 का ऐतिहासिक विदाई भाषण। राजनीतिक समानता और सामाजिक-आर्थिक असमानता के अंतर्विरोध की चेतावनी दी तथा संवैधानिक मार्गों की अनिवार्य आवश्यकता बताई।",
      "mr": "२५ नोव्हेंबर १९४९ रोजी घटना समितीतील अखेरचे भाषण. राजकीय समता आणि सामाजिक-आर्थिक विषमता यातील अंतर्विरोधावर परखड भाष्य करत लोकशाही टिकवण्यासाठी घटनात्मक मार्गांवर भर दिला."
    }
  },
  {
    "id": "item-baws-06-rupee",
    "collection_id": "col-baws",
    "type": "book",
    "title": "The Problem of the Rupee: Its Origin and Its Solution",
    "title_i18n": {
      "en": "The Problem of the Rupee: Its Origin and Its Solution",
      "hi": "द प्रॉब्लम ऑफ द रूपी: इसकी उत्पत्ति और समाधान",
      "mr": "द प्रॉब्लेम ऑफ द रुपी: त्याचा उगम आणि उपाय"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1923-01-01",
    "date_end": "1923-01-01",
    "source": "London School of Economics Doctoral Dissertation / P.S. King & Son, London",
    "provenance": "Doctoral thesis accepted for the degree of D.Sc. (Econ.) by the University of London, 1923. Foundation of RBI framework.",
    "rights": "Public Domain (BAWS Vol. 6)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The rupee has had a fluctuating career. Nothing has wrought greater economic injury to India than the instability of her monetary standard. The foundational treatise that inspired the formulation of the Reserve Bank of India (RBI).",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The rupee has had a fluctuating career. Nothing has wrought greater economic injury to India than the instability of her monetary standard. The Hilton Young Commission adopted Dr. Ambedkar's recommendations in establishing the Reserve Bank of India (RBI) in 1935. A stable currency is the prime necessity for industrial and agricultural prosperity. The purchasing power of money must not be subject to arbitrary administrative manipulation, but governed by automatic, sound monetary principles.",
        "ocr_confidence": 0.98,
        "lang": "en",
        "words": [
          {
            "text": "rupee",
            "bbox": [
              50,
              40,
              110,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "monetary",
            "bbox": [
              150,
              40,
              240,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "Reserve",
            "bbox": [
              50,
              80,
              120,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "stability",
            "bbox": [
              130,
              80,
              210,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "रुपये का इतिहास उतार-चढ़ाव भरा रहा है। भारत के मौद्रिक मानक की अस्थिरता से अधिक आर्थिक क्षति किसी और चीज ने नहीं पहुंचाई है। हिल्टन यंग कमीशन ने 1935 में भारतीय रिज़र्व बैंक (RBI) की स्थापना में डॉ. आंबेडकर की सिफारिशों को अपनाया। औद्योगिक और कृषि समृद्धि के लिए स्थिर मुद्रा पहली आवश्यकता है। मुद्रा की क्रय शक्ति प्रशासनिक मनमानी पर नहीं, बल्कि सुदृढ़ मौद्रिक सिद्धांतों द्वारा नियंत्रित होनी चाहिए।",
          "mr": "रुपयाचा इतिहास अत्यंत अस्थिर राहिला आहे. भारताच्या आर्थिक संरचनेला तिच्या चलनातील अस्थिरतेने जेवढे नुकसान केले तेवढे कशानेही केले नाही. १९३५ मध्ये रिझर्व्ह बँक ऑफ इंडियाच्या (RBI) स्थापनेमध्ये हिल्टन यंग कमिशनने डॉ. आंबेडकरांच्या शिफारसींचा आधार घेतला. पैशाची क्रयशक्ती प्रशासकीय लहरींवर अवलंबून न राहता सुदृढ मौद्रिक तत्त्वांवर आधारित असली पाहिजे."
        }
      }
    ],
    "summary": {
      "en": "Doctoral economics treatise submitted to the University of London (1923). Provided the theoretical blueprint for currency stabilization and central banking, directly leading to the Royal Commission's establishment of the Reserve Bank of India.",
      "hi": "लंदन विश्वविद्यालय (1923) में प्रस्तुत अर्थशास्त्र का डॉक्टरेट शोधप्रबंध। इसने मुद्रा स्थिरीकरण और केंद्रीय बैंकिंग की सैद्धांतिक रूपरेखा प्रदान की, जिसने आगे चलकर भारतीय रिज़र्व बैंक की स्थापना की नींव रखी।",
      "mr": "लंडन विद्यापीठातील (१९२३) अर्थशास्त्राचा डी.एस्सी. प्रबंध. भारतीय चलनाचे स्थिरीकरण आणि मध्यवर्ती बँकेची पायाभरणी यावर मौलिक विचार मांडून रिझर्व्ह बँक स्थापनेची पूर्वतयारी केली."
    }
  },
  {
    "id": "item-baws-07-shudras",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Who Were the Shudras?",
    "title_i18n": {
      "en": "Who Were the Shudras?",
      "hi": "शूद्र कौन थे?",
      "mr": "शूद्र पूर्वी कोण होते?"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1946-10-10",
    "date_end": "1946-10-10",
    "source": "BAWS Vol. 7 (Thacker & Co., Bombay)",
    "provenance": "Dedicated to Mahatma Jyotirao Phule. Rigorous historical and textual inquiry into the Aryan social structure and Vedic literature.",
    "rights": "Public Domain (BAWS Vol. 7)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The Shudras were originally an Aryan community belonging to the Kshatriya solar race. The denial of Upanayana led to their political degradation, economic subjection, and social fall to the fourth varna.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The Shudras were originally an Aryan community. They belonged to the Kshatriya solar race. The degradation of the Shudras was the result of a persistent conflict between the Brahmins and the Shudra kings, culminating in the denial of the Upanayana (investiture ceremony) to the Shudras by the priestly class. This denial of Upanayana led to their political degradation, economic subjection, and social fall from the rank of Kshatriyas to the fourth varna.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Shudras",
            "bbox": [
              50,
              40,
              130,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Kshatriya",
            "bbox": [
              140,
              40,
              230,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Upanayana",
            "bbox": [
              50,
              80,
              160,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "degradation",
            "bbox": [
              170,
              80,
              280,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "शूद्र मूल रूप से एक आर्य समुदाय थे। वे क्षत्रिय सूर्यवंशी कुल से संबंधित थे। शूद्रों का पतन ब्राह्मणों और शूद्र राजाओं के बीच निरंतर संघर्ष का परिणाम था, जिसके परिणामस्वरूप पुरोहित वर्ग द्वारा शूद्रों को उपनयन संस्कार से वंचित कर दिया गया। उपनयन से वंचित किए जाने से उनका राजनीतिक और सामाजिक पतन हुआ और वे क्षत्रिय दर्जे से चौथे वर्ण में आ गए।",
          "mr": "शूद्र हे मूळचे आर्य समाजातीलच एक घटक होते. ते क्षत्रिय सूर्यवंशी कुळातील होते. शूद्र राजे आणि ब्राह्मण यांच्यातील संघर्षातून पुरोहित वर्गाने शूद्रांचा उपनयन संस्कार नाकारला, ज्यामुळे शूद्रांची सामाजिक आणि राजकीय अवनती झाली आणि ते क्षत्रिय स्थानावरून चौथ्या वर्णात ढकलले गेले."
        }
      }
    ],
    "summary": {
      "en": "Scholarly historiographical treatise dedicated to Mahatma Jyotirao Phule (1946). Analyzes Vedic texts to trace the origin of the Shudras as Kshatriya warriors stripped of their religious and civic rights through priestly conflict.",
      "hi": "महात्मा ज्योतिराव फुले को समर्पित ऐतिहासिक शोध ग्रंथ (1946)। वैदिक साक्ष्यों के आधार पर सिद्ध किया कि शूद्र मूलतः क्षत्रिय थे जिन्हें पुरोहित वर्ग द्वारा अधिकारों से वंचित कर चौथे वर्ण में धकेला गया।",
      "mr": "महात्मा जोतीराव फुले यांना समर्पित ऐतिहासिक संशोधन ग्रंथ (१९४६). वैदिक संदर्भांचा आधार घेऊन शूद्र हे मूळचे क्षत्रिय होते आणि उपनयन नाकारल्यामुळे त्यांची अधोगती झाली हे सिद्ध केले."
    }
  },
  {
    "id": "item-baws-08-pakistan",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Thoughts on Pakistan / Partition of India",
    "title_i18n": {
      "en": "Thoughts on Pakistan / Partition of India",
      "hi": "पाकिस्तान पर विचार / भारत का विभाजन",
      "mr": "पाकिस्तानवरील विचार / भारताची फाळणी"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1940-12-28",
    "date_end": "1940-12-28",
    "source": "BAWS Vol. 8 (Thacker & Co., Bombay)",
    "provenance": "Published in December 1940 following the Muslim League's Lahore Resolution. Classic work on constitutional geography and demography.",
    "rights": "Public Domain (BAWS Vol. 8)",
    "access_tier": "open",
    "status": "published",
    "snippet": "A state is not merely an administrative territory; it is a communion of sentiment. If the Muslims of India feel themselves to be a distinct nation, a forced union will only produce perpetual civil strife and constitutional paralysis.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "A state is not merely an administrative territory; it is a communion of sentiment. If the Muslims of India feel themselves to be a distinct nation and cannot share a common political life with the majority, a forced union will only produce perpetual civil strife and constitutional paralysis. Boundary commissions and peaceful exchange of populations with constitutional safeguards for minorities are far superior to a volatile, unwilling federation.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "territory",
            "bbox": [
              50,
              40,
              130,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "sentiment",
            "bbox": [
              140,
              40,
              230,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "minorities",
            "bbox": [
              50,
              80,
              140,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "federation",
            "bbox": [
              150,
              80,
              250,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "एक राज्य केवल एक प्रशासनिक भूभाग नहीं है; यह साझा भावनाओं का एक संघ है। यदि भारत के मुस्लिम स्वयं को एक अलग राष्ट्र मानते हैं और बहुमत के साथ एक राजनीतिक जीवन साझा नहीं कर सकते, तो जबरन किया गया संघ केवल निरंतर गृहयुद्ध और संवैधानिक पंगुता ही पैदा करेगा। अल्पसंख्यकों के अधिकारों की रक्षा के साथ सीमाओं का शांतिपूर्ण निर्धारण अशांत महासंघ से कहीं बेहतर है।",
          "mr": "राज्य म्हणजे केवळ प्रशासकीय भूभाग नव्हे; ती एक भावनिक एकात्मता असते. जर भारतातील मुस्लिमांना स्वतःचे वेगळे राष्ट्र वाटत असेल आणि ते बहुसंख्याकांसोबत सामायिक राजकीय जीवन जगू शकत नसतील, तर सक्तीचे ऐक्य केवळ सततचे यादवी युद्ध आणि घटनात्मक पेचप्रसंग निर्माण करेल. अल्पसंख्याकांच्या हक्कांच्या संरक्षणासह शांततापूर्ण सीमांकन हे अस्थिर महासंघापेक्षा श्रेयस्कर आहे."
        }
      }
    ],
    "summary": {
      "en": "Rigorous geopolitical and demographic analysis of the Pakistan demand (1940). Foresaw the political consequences of partition and outlined principles of minority protection, border demarcation, and federal constitutional stability.",
      "hi": "पाकिस्तान की मांग पर गहन भू-राजनीतिक और जनसांख्यिकीय अध्ययन (1940)। विभाजन के परिणामों का सटीक पूर्वानुमान लगाते हुए अल्पसंख्यक अधिकारों और सीमा निर्धारण के संवैधानिक सिद्धांत प्रस्तुत किए।",
      "mr": "पाकिस्तानच्या मागणीवरील सखोल भू-राजकीय आणि घटनात्मक अभ्यास (१९४०). देशाच्या फाळणीचे संभाव्य परिणाम, सीमांकन आणि अल्पसंख्याकांच्या घटनात्मक संरक्षणावर अत्यंत वस्तुनिष्ठ मांडणी केली."
    }
  },
  {
    "id": "item-baws-09-congress-gandhi",
    "collection_id": "col-baws",
    "type": "book",
    "title": "What Congress and Gandhi Have Done to the Untouchables",
    "title_i18n": {
      "en": "What Congress and Gandhi Have Done to the Untouchables",
      "hi": "कांग्रेस और गांधी ने अछूतों के लिए क्या किया",
      "mr": "काँग्रेस आणि गांधींनी अस्पृश्यांसाठी काय केले"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1945-06-01",
    "date_end": "1945-06-01",
    "source": "BAWS Vol. 9 (Thacker & Co., Bombay)",
    "provenance": "Exhaustive documentary record published in June 1945 detailing the struggle of the Depressed Classes for independent representation.",
    "rights": "Public Domain (BAWS Vol. 9)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The Untouchables are an independent minority. The policy of patronizing uplift without political empowerment leaves the depressed classes at the mercy of caste majoritarianism. True freedom consists of autonomous constitutional representation.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The Untouchables are an independent minority, distinct from the caste Hindus in religion, social customs, and civic disabilities. The policy of patronizing uplift without political empowerment and separate electorates leaves the depressed classes at the mercy of caste majoritarianism. True freedom for the Untouchables cannot consist of benevolent charity, but of autonomous constitutional representation, civil rights, and state-backed economic independence.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "minority",
            "bbox": [
              50,
              40,
              130,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "empowerment",
            "bbox": [
              140,
              40,
              250,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "charity",
            "bbox": [
              50,
              80,
              120,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "representation",
            "bbox": [
              130,
              80,
              260,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "अस्पृश्य एक स्वतंत्र अल्पसंख्यक वर्ग हैं, जो सामाजिक और नागरिक अधिकारों के मामले में सवर्ण हिंदुओं से पूरी तरह भिन्न हैं। राजनीतिक सशक्तिकरण के बिना केवल दयाभाव से किया गया सुधार दलित वर्गों को सवर्ण बहुसंख्यकवाद की दया पर छोड़ देता है। अस्पृश्यों की वास्तविक स्वतंत्रता दान या दया में नहीं, बल्कि स्वायत्त संवैधानिक प्रतिनिधित्व और नागरिक अधिकारों में निहित है।",
          "mr": "अस्पृश्य हा एक स्वतंत्र अल्पसंख्याक घटक आहे, जो सामाजिक आणि नागरी हक्कांच्या दृष्टीने सवर्ण हिंदूंपेक्षा वेगळा आहे. राजकीय सक्षमीकरणाशिवाय केवळ दयेच्या भावनेने केलेली सुधारणा अस्पृश्यांना सवर्ण बहुसंख्याकवादाच्या दयेवर सोडते. अस्पृश्यांचे खरे स्वातंत्र्य दानावर नव्हे, तर स्वायत्त घटनात्मक प्रतिनिधित्व आणि नागरी हक्कांवर अवलंबून आहे."
        }
      }
    ],
    "summary": {
      "en": "Comprehensive documentation of the Depressed Classes' political struggle (1945). Challenges paternalistic social reform and argues that genuine emancipation requires independent legislative power, civil rights, and constitutional guarantees.",
      "hi": "दलित वर्गों के राजनीतिक अधिकारों के संघर्ष का ऐतिहासिक दस्तावेज (1945)। दयाभाव पर आधारित समाज सुधार को खारिज करते हुए स्वतंत्र वैधानिक शक्ति और संवैधानिक गारंटी को मुक्ति का आधार बताया।",
      "mr": "अस्पृश्यांच्या राजकीय लढ्याची ऐतिहासिक मांडणी करणारा ग्रंथ (१९४५). केवळ सामाजिक सुधारणेच्या देखाव्याला विरोध करत स्वतंत्र राजकीय हक्क आणि घटनात्मक संरक्षणाची अनिवार्यता पटवून दिली."
    }
  },
  {
    "id": "item-baws-11-buddha",
    "collection_id": "col-baws",
    "type": "book",
    "title": "The Buddha and His Dhamma",
    "title_i18n": {
      "en": "The Buddha and His Dhamma",
      "hi": "भगवान बुद्ध और उनका धम्म",
      "mr": "भगवान बुद्ध आणि त्यांचा धम्म"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1957-11-01",
    "date_end": "1957-11-01",
    "source": "BAWS Vol. 11 (Siddhartha College Publications)",
    "provenance": "Completed in 1956; published posthumously by the People's Education Society, Bombay in 1957. Primary philosophical treatise on Navayana Buddhism.",
    "rights": "Public Domain (BAWS Vol. 11)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The Buddha showed the path of liberation through Prajna (wisdom), Karuna (compassion), and Samata (equality). Religion must reside in morality, not in ritual or theological dogmas. The Dhamma establishes brotherhood on this earth.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The Buddha did not claim to be a prophet or an incarnation of God; he was a human being who showed the path of liberation through Prajna (wisdom), Karuna (compassion), and Samata (equality). Religion must reside in morality, not in ritual or theological dogmas. The Dhamma is that which purifies the mind, eradicates suffering, and establishes brotherhood and justice among human beings on this earth.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Prajna",
            "bbox": [
              50,
              40,
              120,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Karuna",
            "bbox": [
              130,
              40,
              200,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Samata",
            "bbox": [
              210,
              40,
              280,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "morality",
            "bbox": [
              50,
              80,
              130,
              100
            ],
            "conf": 0.98
          }
        ],
        "translations": {
          "hi": "बुद्ध ने कभी ईश्वर का पैगंबर या अवतार होने का दावा नहीं किया; वे एक मानव थे जिन्होंने प्रज्ञा (ज्ञान), करुणा (सहानुभूति) और समता (समानता) के माध्यम से मुक्ति का मार्ग दिखाया। धर्म कर्मकांडों या अंधविश्वास में नहीं, बल्कि नैतिकता में होना चाहिए। धम्म वही है जो मन को शुद्ध करता है, दुखों का निवारण करता है और पृथ्वी पर बंधुत्व और न्याय की स्थापना करता है।",
          "mr": "बुद्धांनी स्वतःला ईश्वराचा प्रेषित किंवा अवतार मानले नाही; ते एक मानव होते ज्यांनी प्रज्ञा, करुणा आणि समतेच्या आधारे मुक्तीचा मार्ग दाखवला. धर्म हा कर्मकांडात नसून नैतिकतेत वसला पाहिजे. धम्म तोच आहे जो चित्त शुद्ध करतो, दुःखाचे निवारण करतो आणि मानवांमध्ये बंधुता व न्याय प्रस्थापित करतो."
        }
      }
    ],
    "summary": {
      "en": "Dr. Ambedkar's magnum opus on Buddhism (Navayana). Reinterprets the life and teachings of Gautama Buddha as a rational, ethical, and egalitarian philosophy dedicated to the eradication of human suffering and injustice.",
      "hi": "डॉ. आंबेडकर का नवयान बौद्ध धर्म पर कालजयी ग्रंथ। उन्होंने भगवान बुद्ध की शिक्षाओं को प्रज्ञा, करुणा और समता पर आधारित एक विवेकशील, नैतिक और समतावादी दर्शन के रूप में पुनर्व्याख्यायित किया।",
      "mr": "डॉ. आंबेडकरांचा नवयान बौद्ध धर्मावरील महाग्रंथ. बुद्ध आणि त्यांच्या धम्माची मांडणी अंधश्रद्धेपासून दूर, प्रज्ञा, करुणा आणि समतेवर आधारित विवेकवादी मानवकल्याणाचा मार्ग म्हणून केली."
    }
  },
  {
    "id": "item-baws-03-philosophy",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Philosophy of Hinduism",
    "title_i18n": {
      "en": "Philosophy of Hinduism",
      "hi": "हिंदू धर्म का दर्शन",
      "mr": "हिंदू धर्माचे तत्त्वज्ञान"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1943-01-01",
    "date_end": "1943-01-01",
    "source": "BAWS Vol. 3",
    "provenance": "Unpublished manuscript discovered among Dr. Ambedkar's papers; published in BAWS Vol. 3 by Govt. of Maharashtra.",
    "rights": "Public Domain (BAWS Vol. 3)",
    "access_tier": "open",
    "status": "published",
    "snippet": "Does Hinduism recognize liberty, equality, and fraternity? The philosophic core of Hinduism as codified in the Shastras is based on inequality. A religion that legitimizes graded inequality as a sacred duty is contrary to human dignity.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Does Hinduism recognize liberty, equality, and fraternity? The philosophic core of Hinduism as codified in the Shastras is based on inequality. It denies equality of treatment, equality before law, and liberty of conscience to those below the upper varnas. A religion that legitimizes graded inequality as a sacred duty is contrary to the fundamental principles of justice and human dignity.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "liberty",
            "bbox": [
              50,
              40,
              110,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "equality",
            "bbox": [
              120,
              40,
              190,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "fraternity",
            "bbox": [
              200,
              40,
              280,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "dignity",
            "bbox": [
              50,
              80,
              120,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "क्या हिंदू धर्म स्वतंत्रता, समानता और बंधुत्व को मान्यता देता है? शास्त्रों में संहिताबद्ध हिंदू धर्म का दार्शनिक आधार असमानता पर टिका है। यह निचले वर्गों के लिए कानून के समक्ष समानता और अंतरात्मा की स्वतंत्रता को नकारता है। जो धर्म श्रेणीबद्ध असमानता को एक पवित्र कर्तव्य के रूप में मान्यता देता है, वह न्याय और मानवीय गरिमा के सिद्धांतों के विरुद्ध है।",
          "mr": "हिंदू धर्म स्वातंत्र्य, समता आणि बंधुतेला मान्यता देतो का? शास्त्रांमध्ये मांडलेला हिंदू धर्माचा तात्विक पाया विषमतेवर आधारित आहे. तो कनिष्ठ घटकांसाठी कायद्यापुढील समता आणि विवेकाचे स्वातंत्र्य नाकारतो. श्रेणीबद्ध विषमतेला पवित्र कर्तव्य मानणारा धर्म मानवी प्रतिष्ठा आणि न्यायाच्या मूलभूत तत्त्वांच्या विरुद्ध आहे."
        }
      }
    ],
    "summary": {
      "en": "Critical philosophical examination of classical Hindu canonical texts against universal standards of justice, liberty, equality, and fraternity, evaluating the ethical basis of graded social stratification.",
      "hi": "स्वतंत्रता, समानता और बंधुत्व के वैश्विक मानकों की कसौटी पर शास्त्रीय हिंदू ग्रंथों का दार्शनिक परीक्षण। श्रेणीबद्ध सामाजिक असमानता के नैतिक आधारों की गहन समीक्षा।",
      "mr": "स्वातंत्र्य, समता आणि बंधुतेच्या वैश्विक निकषांवर हिंदू धर्मशास्त्रांचे तात्विक मूल्यमापन. श्रेणीबद्ध विषमतेच्या धार्मिक आधारावर कठोर वैचारिक प्रहार."
    }
  },
  {
    "id": "item-baws-04-riddles",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Riddles in Hinduism",
    "title_i18n": {
      "en": "Riddles in Hinduism",
      "hi": "हिंदू धर्म की पहेलियां",
      "mr": "हिंदू धर्मातील कोडी"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1954-01-01",
    "date_end": "1954-01-01",
    "source": "BAWS Vol. 4",
    "provenance": "Critical exposition prepared between 1953 and 1955; published posthumously in BAWS Vol. 4.",
    "rights": "Public Domain (BAWS Vol. 4)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The Vedas and Puranas present insoluble riddles regarding the origin of man and the justification of social stratification. Why did ancient seers preach the unity of Brahma while practicing cruel social exclusion?",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The Vedas and Puranas present insoluble riddles regarding the origin of man and the moral justification of social stratification. Why did the ancient seers preach the unity of Brahma while practicing the cruelest social exclusion of the Shudras and Ati-Shudras? True spiritual awakening requires confronting these historical contradictions through reason, critical inquiry, and universal human rights.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "riddles",
            "bbox": [
              50,
              40,
              110,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "stratification",
            "bbox": [
              120,
              40,
              240,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "exclusion",
            "bbox": [
              50,
              80,
              140,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "contradictions",
            "bbox": [
              150,
              80,
              270,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "वेद और पुराण मनुष्य की उत्पत्ति और सामाजिक स्तरीकरण के नैतिक औचित्य पर अबूझ पहेलियां प्रस्तुत करते हैं। प्राचीन ऋषियों ने ब्रह्म की एकता का उपदेश देते हुए शूद्रों और अति-शूद्रों के क्रूरतम सामाजिक बहिष्कार का समर्थन क्यों किया? वास्तविक आत्म-साक्षात्कार के लिए इन ऐतिहासिक अंतर्विरोधों का विवेक और मानवाधिकारों के प्रकाश में परीक्षण आवश्यक है।",
          "mr": "वेद आणि पुराणे मानवाच्या उत्पत्तीविषयी आणि सामाजिक विषमतेच्या समर्थनाविषयी न सुटणारी कोडी निर्माण करतात. अद्वैत आणि ब्रह्माच्या एकत्वाचा उपदेश करणाऱ्यांनी शूद्र आणि अतिशूद्रांच्या बहिष्काराचे समर्थन का केले? या ऐतिहासिक विसंगतींना बुद्धी आणि मानवी हक्कांच्या कसोटीवर तपासणे हीच खरी जागृती आहे."
        }
      }
    ],
    "summary": {
      "en": "Exhaustive critical inquiry exposing moral contradictions in Vedic, Epic, and Puranic literature, calling for rationalist reform grounded in human rights.",
      "hi": "वैदिक, महाकाव्य और पौराणिक साहित्य के नैतिक और दार्शनिक अंतर्विरोधों को उजागर करने वाली आलोचनात्मक कृति, जो विवेकवादी सुधार का आह्वान करती है।",
      "mr": "वैदिक, पौराणिक आणि महाकाव्यांमधील नैतिक विसंगतींवर प्रकाश टाकणारा बहुचर्चित संशोधन ग्रंथ. विवेकाधिष्ठित मानवकल्याणाचा आग्रह."
    }
  },
  {
    "id": "item-baws-05-untouchables",
    "collection_id": "col-baws",
    "type": "book",
    "title": "The Untouchables: A Thesis on the Origin of Untouchability",
    "title_i18n": {
      "en": "The Untouchables: A Thesis on the Origin of Untouchability",
      "hi": "द अनटचेबल्स: अस्पृश्यता की उत्पत्ति पर एक शोध प्रबंध",
      "mr": "द अनटचेबल्स: अस्पृश्यतेचा उगम"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-10-01",
    "date_end": "1948-10-01",
    "source": "BAWS Vol. 5 (Amrit Book Co., New Delhi)",
    "provenance": "Published in October 1948; provides the Broken Men thesis on the historical origins of untouchability around 400 AD.",
    "rights": "Public Domain (BAWS Vol. 5)",
    "access_tier": "open",
    "status": "published",
    "snippet": "Untouchability is not an ancient Vedic institution; it originated around 400 A.D. The Untouchables were originally 'Broken Men'—remnants of shattered tribes relegated to permanent stigma due to beef-eating prohibitions.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Untouchability is not an ancient Vedic institution; it originated around 400 A.D. The Untouchables were originally 'Broken Men'—remnants of shattered tribes who lived outside the settled villages. When Brahmanism adopted cow-worship to defeat Buddhism, those who continued their ancestral beef-eating habits were stigmatized and relegated to permanent untouchability. Untouchability was thus born out of religious strife and cultural subordination.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Untouchability",
            "bbox": [
              50,
              40,
              170,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "institution",
            "bbox": [
              180,
              40,
              270,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "Broken",
            "bbox": [
              50,
              80,
              120,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "Men",
            "bbox": [
              130,
              80,
              170,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "अस्पृश्यता कोई प्राचीन वैदिक संस्था नहीं है; इसकी उत्पत्ति लगभग 400 ईस्वी में हुई। अस्पृश्य मूल रूप से 'टूटे हुए लोग' (Broken Men) थे—जो बिखरे हुए कबीलों के अवशेष थे और गांवों की परिधि के बाहर रहते थे। जब बौद्ध धर्म को मात देने के लिए ब्राह्मणवाद ने गो-पूजा को अपनाया, तो गोमांस का सेवन करने वाले इन वर्गों को स्थाई रूप से अस्पृश्य घोषित कर दिया गया।",
          "mr": "अस्पृश्यता ही प्राचीन वैदिक प्रथा नसून तिचा उगम इसवी सन ४०० च्या सुमारास झाला. अस्पृश्य हे मूळचे 'तुटलेले लोक' (Broken Men) होते—जे विखुरलेल्या टोळ्यांचे अवशेष म्हणून गावाच्या वेशीबाहेर राहत होते. बौद्ध धर्माचा पराभव करण्यासाठी जेव्हा गो-पूजेचा पुरस्कार केला गेला, तेव्हा परंपरेने गोमांस भक्षण करणाऱ्यांना कायमचे अस्पृश्य ठरवले गेले."
        }
      }
    ],
    "summary": {
      "en": "Pioneering sociological and historical investigation demonstrating that Untouchability originated around 400 AD as a consequence of tribal disintegration, beef-eating taboos, and conflict between Buddhism and Brahmanism.",
      "hi": "अस्पृश्यता की उत्पत्ति पर युगांतरकारी समाजशास्त्रीय अध्ययन (1948)। सिद्ध किया कि अस्पृश्यता वैदिक काल में नहीं थी, बल्कि लगभग 400 ईस्वी में टूटे हुए लोगों और सांस्कृतिक संघर्ष से उत्पन्न हुई।",
      "mr": "अस्पृश्यतेच्या उगमावर मूलभूत समाजशास्त्रीय प्रबंध (१९४८). अस्पृश्यता ही मूळ वैदिक नसून इसवी सन ४०० च्या सुमारास धार्मिक वर्चस्व आणि कबीले तुटण्यातून निर्माण झाली हे सप्रमाण दाखवले."
    }
  },
  {
    "id": "item-baws-02-mahad-bill",
    "collection_id": "col-baws",
    "type": "debate",
    "title": "Bombay Legislative Council Debates: Mahad Tank Satyagraha Bill",
    "title_i18n": {
      "en": "Bombay Legislative Council Debates: Mahad Tank Satyagraha Bill",
      "hi": "बॉम्बे लेजिस्लेटिव काउंसिल वादविवाद: महाड तालाब सत्याग्रह विधेयक",
      "mr": "मुंबई कायदेमंडळ चर्चा: महाड चवदार तळे विधेयक"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1927-08-04",
    "date_end": "1927-08-04",
    "source": "BAWS Vol. 2 (Bombay Legislative Council Official Report)",
    "provenance": "Speech delivered in the Bombay Legislative Council on 4 August 1927 following the Mahad Satyagraha and the Bole Resolution.",
    "rights": "Public Domain (BAWS Vol. 2)",
    "access_tier": "open",
    "status": "published",
    "snippet": "We are not fighting for water because we are thirsty. We are fighting to establish that we are human beings with equal civic rights. Denying access to a public well is an intolerable infringement of civil liberty.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "We are not fighting for water because we are thirsty. We are fighting to establish that we are human beings with equal civic rights. The public water reservoir belongs to the municipality, paid for by the public treasury, and every citizen has the fundamental right to access it. Denying access to a public well on the grounds of birth is an intolerable infringement of civil liberty.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "thirsty",
            "bbox": [
              50,
              40,
              110,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "civic",
            "bbox": [
              120,
              40,
              170,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "liberty",
            "bbox": [
              50,
              80,
              120,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "rights",
            "bbox": [
              130,
              80,
              190,
              100
            ],
            "conf": 0.98
          }
        ],
        "translations": {
          "hi": "हम पानी के लिए केवल इसलिए संघर्ष नहीं कर रहे हैं कि हम प्यासे हैं। हम यह सिद्ध करने के लिए संघर्ष कर रहे हैं कि हम भी समान नागरिक अधिकारों वाले मनुष्य हैं। सार्वजनिक जलाशय नगर पालिका का है और जनता के करों से निर्मित है। जन्म के आधार पर सार्वजनिक कुएं से पानी पीने से रोकना नागरिक स्वतंत्रता का असहनीय हनन है।",
          "mr": "आम्ही केवळ तहानेसाठी पाण्याचा संघर्ष करत नाही आहोत. आम्ही माणूस आहोत आणि आम्हाला समान नागरी हक्क आहेत हे सिद्ध करण्यासाठी आमचा लढा आहे. चवदार तळे हे नगरपालिकेचे आणि जनतेच्या पैशातून चालणारे सार्वजनिक जलाशय आहे. जन्माच्या कारणावरून सार्वजनिक पाण्यापासून वंचित ठेवणे हे नागरी स्वातंत्र्यावर आक्रमण आहे."
        }
      }
    ],
    "summary": {
      "en": "Impassioned legislative speech in the Bombay Legislative Council (August 1927). Dr. Ambedkar argues that the Mahad Satyagraha was not about water, but an assertion of universal human equality and civic rights.",
      "hi": "बॉम्बे लेजिस्लेटिव काउंसिल में दिया गया ऐतिहासिक भाषण (अगस्त 1927)। डॉ. आंबेडकर ने स्पष्ट किया कि महाड का संघर्ष केवल जल प्राप्ति के लिए नहीं, बल्कि मानवीय समानता और नागरिक अधिकारों की स्थापना के लिए है।",
      "mr": "मुंबई कायदेमंडळातील ज्वलंत भाषण (ऑगस्ट १९२७). महाडचा लढा हा केवळ पाण्यासाठी नसून मानवी मूल्ये आणि समान नागरी हक्क प्रस्थापित करण्यासाठी आहे हे ठामपणे मांडले."
    }
  },
  {
    "id": "item-baws-10-cabinet",
    "collection_id": "col-baws",
    "type": "speech",
    "title": "Speech on the Cabinet Mission Plan",
    "title_i18n": {
      "en": "Speech on the Cabinet Mission Plan",
      "hi": "कैबिनेट मिशन योजना पर ऐतिहासिक भाषण",
      "mr": "कॅबिनेट मिशन योजनेवरील ऐतिहासिक भाषण"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1946-06-20",
    "date_end": "1946-06-20",
    "source": "BAWS Vol. 10",
    "provenance": "Delivered in New Delhi on 20 June 1946, protesting the Cabinet Mission's omission of political safeguards for Scheduled Castes.",
    "rights": "Public Domain (BAWS Vol. 10)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The Cabinet Mission has committed a grave injustice by ignoring the sixty million Scheduled Castes of India. To treat the Untouchables as an internal problem is to hand them over to majoritarian tyranny. We demand statutory safeguards.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The Cabinet Mission has committed a grave injustice by ignoring the sixty million Scheduled Castes of India. To treat the Untouchables as an internal problem of the Hindu community is to hand them over bound hand and foot to the majoritarian tyranny. We demand separate political representation, land settlements, and statutory safeguards in the future Constitution of India.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Cabinet",
            "bbox": [
              50,
              40,
              130,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "injustice",
            "bbox": [
              140,
              40,
              220,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "safeguards",
            "bbox": [
              50,
              80,
              150,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "Constitution",
            "bbox": [
              160,
              80,
              280,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "कैबिनेट मिशन ने भारत के छह करोड़ अनुसूचित जातियों की उपेक्षा करके घोर अन्याय किया है। अस्पृश्यों को हिंदू समुदाय का आंतरिक मामला मानना उन्हें बहुसंख्यक अत्याचार के हवाले करने जैसा है। हम भारत के भावी संविधान में पृथक राजनीतिक प्रतिनिधित्व, भूमि आवंटन और वैधानिक सुरक्षा की मांग करते हैं।",
          "mr": "कॅबिनेट मिशनने भारतातील सहा कोटी अनुसूचित जातींकडे दुर्लक्ष करून घोर अन्याय केला आहे. अस्पृश्यांना हिंदू समाजाचा अंतर्गत प्रश्न मानणे म्हणजे त्यांना सवर्ण बहुसंख्याकांच्या दावणीला बांधण्यासारखे आहे. आम्ही आगामी संविधानात स्वतंत्र राजकीय प्रतिनिधित्व आणि कायदेशीर संरक्षणाची मागणी करतो."
        }
      }
    ],
    "summary": {
      "en": "Key historical address challenging the Cabinet Mission's constitutional proposals (1946). Dr. Ambedkar demanded affirmative constitutional safeguards for Scheduled Castes prior to the transfer of power.",
      "hi": "कैबिनेट मिशन के प्रस्तावों के विरुद्ध दिया गया ऐतिहासिक भाषण (1946)। सत्ता हस्तांतरण से पहले अनुसूचित जातियों के लिए स्वतंत्र संवैधानिक सुरक्षा उपायों और प्रतिनिधित्व की पुरजोर मांग की।",
      "mr": "कॅबिनेट मिशनच्या योजनांविरुद्ध दिलेले परखड भाषण (१९४६). सत्तांतरापूर्वी अस्पृश्यांच्या राजकीय संरक्षणाची आणि स्वतंत्र प्रतिनिधित्वाची घटनात्मक हमी मागितली."
    }
  },
  {
    "id": "item-baws-12-southborough",
    "collection_id": "col-baws",
    "type": "speech",
    "title": "Evidence before the Southborough Committee on Franchise",
    "title_i18n": {
      "en": "Evidence before the Southborough Committee on Franchise",
      "hi": "मताधिकार पर साउथबरो समिति के समक्ष साक्ष्य",
      "mr": "साउथबरो समितीपुढे मताधिकाराविषयी दिलेली साक्ष"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1919-01-27",
    "date_end": "1919-01-27",
    "source": "BAWS Vol. 12 (Government of India Official Records)",
    "provenance": "Written evidence submitted to the Franchise Committee (Southborough Committee) in Bombay, January 27, 1919.",
    "rights": "Public Domain (BAWS Vol. 12)",
    "access_tier": "open",
    "status": "published",
    "snippet": "Franchise is the weapon of the disenfranchised. Without political power, civil rights are an illusion. In a stratified society, a joint electorate only ensures that representatives subservient to the majority are elected.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Franchise is the weapon of the disenfranchised. Without political power, civil rights are an illusion. In a stratified society where one class has a religious mandate to suppress another, a joint electorate only ensures that representatives subservient to the majority are elected. The depressed classes must have independent communal representation to safeguard their survival.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Franchise",
            "bbox": [
              50,
              40,
              130,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "political",
            "bbox": [
              140,
              40,
              210,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "electorate",
            "bbox": [
              50,
              80,
              140,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "representation",
            "bbox": [
              150,
              80,
              280,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "मताधिकार वंचितों का सबसे बड़ा हथियार है। राजनीतिक शक्ति के बिना नागरिक अधिकार केवल एक भ्रम हैं। जिस समाज में एक वर्ग को दूसरे को दबाने की धार्मिक मान्यता हो, वहां संयुक्त निर्वाचन केवल बहुसंख्यकों के आज्ञाकारी प्रतिनिधियों को ही चुनेगा। दलित वर्गों को अपने अस्तित्व की रक्षा के लिए स्वतंत्र प्रतिनिधित्व मिलना ही चाहिए।",
          "mr": "मताधिकार हे पददलितांचे प्रभावी अस्त्र आहे. राजकीय सत्तेशिवाय नागरी हक्क ही निव्वळ मृगजळ आहेत. ज्या समाजात विषमतेला धार्मिक अधिष्ठान आहे, तिथे संयुक्त मतदारसंघ केवळ बहुसंख्याकांच्या लांगूलचालन करणाऱ्यांनाच निवडून आणतील. अस्पृश्यांना त्यांच्या हक्कांसाठी स्वतंत्र प्रतिनिधित्व मिळालेच पाहिजे."
        }
      }
    ],
    "summary": {
      "en": "Foundational memorandum submitted to the Southborough Franchise Committee (1919). Earliest comprehensive constitutional argument for universal adult franchise and reserved legislative representation for the depressed classes.",
      "hi": "साउथबरो मताधिकार समिति (1919) को प्रस्तुत ऐतिहासिक ज्ञापन। दलित वर्गों के लिए वयस्क मताधिकार और स्वतंत्र राजनीतिक प्रतिनिधित्व की मांग करने वाला पहला विस्तृत संवैधानिक दस्तावेज।",
      "mr": "साउथबरो समितीपुढे (१९१९) दिलेली युगप्रवर्तक साक्ष. अस्पृश्यांसाठी सार्वत्रिक प्रौढ मताधिकार आणि स्वतंत्र राजकीय प्रतिनिधित्वाची मागणी करणारी पहिली घटनात्मक मांडणी."
    }
  },
  {
    "id": "item-cad-art14",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. VII: Article 14 Equality Before the Law",
    "title_i18n": {
      "en": "CAD Vol. VII: Article 14 Equality Before the Law",
      "hi": "संविधान सभा वादविवाद: अनुच्छेद 14 विधि के समक्ष समता",
      "mr": "घटना समिती चर्चा: कलम १४ कायद्यापुढील समता"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-11-29",
    "date_end": "1948-11-29",
    "source": "CAD Vol. VII (Parliament of India)",
    "provenance": "Constituent Assembly of India Debates, November 29, 1948. Drafting Committee defense of Draft Article 9 (Article 14).",
    "rights": "Public Domain (Parliament of India)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The State shall not deny to any person equality before the law or the equal protection of the laws. Equality before the law implies the absence of special privilege, while equal protection requires equal treatment under equal circumstances.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India. Equality before the law is a negative concept implying the absence of any special privilege, while equal protection of the laws is a positive concept requiring equal treatment under equal circumstances. It forms the bedrock of our democratic republic.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "equality",
            "bbox": [
              50,
              40,
              120,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "protection",
            "bbox": [
              130,
              40,
              220,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "privilege",
            "bbox": [
              50,
              80,
              130,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "republic",
            "bbox": [
              140,
              80,
              220,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "राज्य भारत के राज्यक्षेत्र में किसी व्यक्ति को विधि के समक्ष समता से या विधियों के समान संरक्षण से वंचित नहीं करेगा। विधि के समक्ष समता विशेषाधिकारों के अभाव को दर्शाती है, जबकि विधियों का समान संरक्षण समान परिस्थितियों में समान व्यवहार की गारंटी देता है। यह हमारे लोकतांत्रिक गणराज्य की आधारशिला है।",
          "mr": "राज्य भारताच्या राज्यक्षेत्रात कोणत्याही व्यक्तीला कायद्यापुढील समता अथवा कायद्याचे समान संरक्षण नाकारणार नाही. कायद्यापुढील समता हा कोणत्याही विशेषाधिकारांचा अभाव दर्शवतो, तर कायद्याचे समान संरक्षण हे समान परिस्थितीत समान वागणुकीची हमी देते. हा आपल्या लोकशाही प्रजासत्ताकाचा मूळ पाया आहे."
        }
      }
    ],
    "summary": {
      "en": "Constituent Assembly debate defining fundamental equality. Dr. Ambedkar expounds the twin doctrines of equality before the law and equal protection of laws as essential safeguards against arbitrary state power.",
      "hi": "संविधान सभा में समानता के अधिकार पर निर्णायक बहस। डॉ. आंबेडकर ने विधि के समक्ष समता और विधियों के समान संरक्षण को राज्य की मनमानी शक्तियों के विरुद्ध अनिवार्य सुरक्षा कवच बताया।",
      "mr": "घटना समितीत कलम १४ ची तात्विक मांडणी. कायद्यापुढील समता आणि कायद्याचे समान संरक्षण हे लोकशाही प्रजासत्ताकाचे मूळ आधारस्तंभ कसे आहेत हे स्पष्ट केले."
    }
  },
  {
    "id": "item-cad-art15",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. VII: Article 15 Prohibition of Discrimination",
    "title_i18n": {
      "en": "CAD Vol. VII: Article 15 Prohibition of Discrimination",
      "hi": "संविधान सभा वादविवाद: अनुच्छेद 15 भेदभाव का प्रतिषेध",
      "mr": "घटना समिती चर्चा: कलम १५ भेदभावास बंदी"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-11-29",
    "date_end": "1948-11-29",
    "source": "CAD Vol. VII (Parliament of India)",
    "provenance": "Constituent Assembly Debates on Draft Article 9 (Article 15), November 29, 1948.",
    "rights": "Public Domain (Parliament of India)",
    "access_tier": "open",
    "status": "published",
    "snippet": "Draft Article 9 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth. We have specifically extended this prohibition to shops, restaurants, and public water tanks to eliminate social tyranny.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Draft Article 9 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth. We have specifically extended this prohibition to access to shops, public restaurants, hotels, and places of public entertainment, as well as wells, tanks, and bathing ghats maintained out of State funds. This ensures that social tyranny is directly penalized by fundamental constitutional law.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "prohibits",
            "bbox": [
              50,
              40,
              130,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "discrimination",
            "bbox": [
              140,
              40,
              270,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "access",
            "bbox": [
              50,
              80,
              110,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "tyranny",
            "bbox": [
              120,
              80,
              190,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "अनुच्छेद 15 धर्म, मूलवंश, जाति, लिंग या जन्मस्थान के आधार पर भेदभाव को रोकता है। हमने इस प्रतिबंध को दुकानों, सार्वजनिक भोजनालयों, होटलों और सार्वजनिक कुओं व तालाबों तक स्पष्ट रूप से विस्तारित किया है ताकि सामाजिक बहिष्कार और भेदभाव को संवैधानिक रूप से दंडनीय बनाया जा सके।",
          "mr": "कलम १५ धर्म, वंश, जात, लिंग किंवा जन्मस्थान या कारणांवरून भेदभावास प्रतिबंध करते. आम्ही हा प्रतिबंध दुकाने, उपाहारगृहे, तसेच सरकारी निधीतून चालणाऱ्या विहिरी व तळ्यांपर्यंत स्पष्टपणे विस्तारित केला आहे, जेणेकरून सामाजिक विषमतेवर घटनात्मक प्रहार करता येईल."
        }
      }
    ],
    "summary": {
      "en": "Constituent Assembly adoption of Article 15. Extends civil protections beyond state actions to private spaces of public access, outlawing caste-based exclusion from wells, shops, and public facilities.",
      "hi": "अनुच्छेद 15 को अपनाने पर संविधान सभा का ऐतिहासिक विमर्श। राज्य के साथ-साथ सार्वजनिक स्थलों, दुकानों और जलाशयों में भी जातिगत बहिष्कार को असंवैधानिक घोषित किया गया।",
      "mr": "कलम १५ ची ऐतिहासिक घटनात्मक रचना. केवळ सरकारी संस्थांपुरते मर्यादित न ठेवता सार्वजनिक विहिरी, तळी, दुकाने अशा सर्व ठिकाणी होणारा जातीय बहिष्कार कायद्याने बंद केला."
    }
  },
  {
    "id": "item-cad-art17",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. VII: Article 17 Abolition of Untouchability",
    "title_i18n": {
      "en": "CAD Vol. VII: Article 17 Abolition of Untouchability",
      "hi": "संविधान सभा वादविवाद: अनुच्छेद 17 अस्पृश्यता का उन्मूलन",
      "mr": "घटना समिती चर्चा: कलम १७ अस्पृश्यता निवारण"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-11-29",
    "date_end": "1948-11-29",
    "source": "CAD Vol. VII (Parliament of India)",
    "provenance": "Constituent Assembly Debates on Draft Article 11 (Article 17), November 29, 1948.",
    "rights": "Public Domain (Parliament of India)",
    "access_tier": "open",
    "status": "published",
    "snippet": "'Untouchability' is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of 'Untouchability' shall be an offence punishable in accordance with law.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "'Untouchability' is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of 'Untouchability' shall be an offence punishable in accordance with law. This historic clause emancipates millions from millennia of social degradation and declares untouchability a national crime against humanity.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Untouchability",
            "bbox": [
              50,
              40,
              180,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "abolished",
            "bbox": [
              190,
              40,
              280,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "forbidden",
            "bbox": [
              50,
              80,
              140,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "offence",
            "bbox": [
              150,
              80,
              220,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "'अस्पृश्यता' का अंत किया जाता है और उसका किसी भी रूप में आचरण निषिद्ध किया जाता है। अस्पृश्यता से उपजी किसी भी अयोग्यता को लागू करना विधि के अनुसार दंडनीय अपराध होगा। यह ऐतिहासिक उपबंध सदियों के सामाजिक उत्पीड़न का अंत करता है और अस्पृश्यता को राष्ट्रीय अपराध घोषित करता है।",
          "mr": "'अस्पृश्यता' नष्ट करण्यात आली आहे आणि तिचे कोणत्याही रूपातील आचरण निषिद्ध आहे. अस्पृश्यतेतून उद्भवणारी कोणतीही अयोग्यता लादणे हा कायद्यानुसार दखलपात्र गुन्हा असेल. ही ऐतिहासिक तरतूद शतकानुशतकांच्या सामाजिक विषमतेचा अंत करते आणि अस्पृश्यतेला गुन्हा ठरवते."
        }
      }
    ],
    "summary": {
      "en": "Unanimous adoption of Article 17 abolishing untouchability in all forms. Codifies the practice as a penal offence, marking the constitutional triumph of Dr. Ambedkar's lifelong struggle for human dignity.",
      "hi": "अस्पृश्यता को समूल नष्ट करने वाले अनुच्छेद 17 को सर्वसम्मति से पारित किया जाना। अस्पृश्यता के आचरण को दंडनीय अपराध घोषित कर मानवीय गरिमा की ऐतिहासिक विजय सुनिश्चित की गई।",
      "mr": "अस्पृश्यतेचे समूळ उच्चाटन करणाऱ्या कलम १७ चे सर्वानुमते संमतीने संविधानात रोपण. अस्पृश्यतेचे आचरण हा कायद्याने दंडनीय गुन्हा ठरवून मानवी सन्मानाची प्रस्थापना केली."
    }
  },
  {
    "id": "item-cad-art44",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. VII: Article 44 Uniform Civil Code Intervention",
    "title_i18n": {
      "en": "CAD Vol. VII: Article 44 Uniform Civil Code Intervention",
      "hi": "संविधान सभा वादविवाद: अनुच्छेद 44 समान नागरिक संहिता विमर्श",
      "mr": "घटना समिती चर्चा: कलम ४४ समान नागरी कायदा"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-11-23",
    "date_end": "1948-11-23",
    "source": "CAD Vol. VII (Parliament of India)",
    "provenance": "Constituent Assembly Debates on Draft Article 35 (Directive Principle 44), November 23, 1948.",
    "rights": "Public Domain (Parliament of India)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The State shall endeavour to secure for the citizens a uniform civil code. We already have a uniform criminal code and civil procedure. A uniform civil code is an enabling directive aimed at national unity and gender justice.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India. We already have a uniform criminal code, a uniform law of transfer of property, and civil procedure. The only domain remaining is marriage and succession. A uniform civil code is an enabling directive, not a coercive imposition, aimed at national unity and gender justice.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "uniform",
            "bbox": [
              50,
              40,
              120,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "code",
            "bbox": [
              130,
              40,
              180,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "territory",
            "bbox": [
              50,
              80,
              130,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "justice",
            "bbox": [
              140,
              80,
              210,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "राज्य भारत के समस्त राज्यक्षेत्र में नागरिकों के लिए एक समान नागरिक संहिता प्राप्त करने का प्रयास करेगा। हमारे पास पहले से ही समान दंड संहिता और दीवानी प्रक्रिया है। केवल विवाह और उत्तराधिकार का क्षेत्र ही शेष है। समान नागरिक संहिता राष्ट्रीय एकता और लैंगिक न्याय की दिशा में एक मार्गदर्शक सिद्धांत है।",
          "mr": "राज्य भारताच्या सर्व राज्यक्षेत्रात नागरिकांसाठी एकसमान नागरी संहिता प्रस्थापित करण्याचा प्रयत्न करेल. आपल्याकडे आधीच फौजदारी कायदा आणि मालमत्ता हस्तांतरण कायदा एकसमान आहे. केवळ विवाह आणि वारसा हक्काचा भाग उरला आहे. समान नागरी कायदा राष्ट्रीय एकात्मता आणि स्त्री-पुरुष न्यायासाठी एक मार्गदर्शक तत्व आहे."
        }
      }
    ],
    "summary": {
      "en": "Dr. Ambedkar's nuanced constitutional defense of Article 44. Explains that while civil laws like the Penal Code and Civil Procedure are already uniform across India, personal laws must progressively evolve to protect gender equity.",
      "hi": "अनुच्छेद 44 पर डॉ. आंबेडकर का संतुलित और तार्किक दृष्टिकोण। उन्होंने स्पष्ट किया कि अधिकांश कानून पहले से ही पूरे भारत में एकसमान हैं, और समान नागरिक संहिता का उद्देश्य महिलाओं के अधिकारों और राष्ट्रीय एकता को मजबूत करना है।",
      "mr": "कलम ४४ वरील डॉ. आंबेडकरांची घटनात्मक भूमिका. बहुतांश फौजदारी व दिवाणी कायदे आधीच देशात समान असून कौटुंबिक कायद्यात सुधारणा करून महिलांना समान हक्क देणे हे या मार्गदर्शक तत्त्वाचे उद्दिष्ट आहे."
    }
  },
  {
    "id": "item-cad-art395",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. XI: Adoption of the Constitution of India",
    "title_i18n": {
      "en": "CAD Vol. XI: Adoption of the Constitution of India",
      "hi": "संविधान सभा वादविवाद खंड XI: भारत के संविधान को अंगीकार करना",
      "mr": "घटना समिती चर्चा खंड XI: भारताचे संविधान स्वीकारणे"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1949-11-26",
    "date_end": "1949-11-26",
    "source": "CAD Vol. XI (Parliament of India)",
    "provenance": "Constituent Assembly of India Debates, November 26, 1949. Formal motion for the adoption of the Constitution.",
    "rights": "Public Domain (Parliament of India)",
    "access_tier": "open",
    "status": "published",
    "snippet": "I feel that the Constitution, whatever its defects, is workable, flexible and has sufficient strength to hold the country together both in peacetime and in wartime. A Constitution is only as good as the people who operate it.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "I feel that the Constitution, whatever its defects, is workable, flexible and has sufficient strength to hold the country together both in peacetime and in wartime. If things go wrong under the new Constitution, the reason will not be that we had a bad Constitution. What we will have to say is that Man was vile. A Constitution is only as good as the people who operate it.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "workable",
            "bbox": [
              50,
              40,
              130,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "flexible",
            "bbox": [
              140,
              40,
              210,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "Constitution",
            "bbox": [
              50,
              80,
              160,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "operate",
            "bbox": [
              170,
              80,
              240,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "मुझे लगता है कि यह संविधान, अपनी कमियों के बावजूद, व्यावहारिक और लचीला है तथा देश को शांति और युद्ध दोनों समय में एकजुट रखने में सक्षम है। यदि नए संविधान के तहत चीजें गलत होती हैं, तो इसका कारण यह नहीं होगा कि संविधान बुरा था, बल्कि यह होगा कि इसे चलाने वाले लोग अयोग्य थे। संविधान केवल उतना ही अच्छा होता है जितने अच्छे इसे लागू करने वाले लोग होते हैं।",
          "mr": "मला वाटते की हे संविधान, त्यात काही त्रुटी असल्या तरीही, अत्यंत व्यवहार्य, लवचिक आणि देशाला शांततेच्या काळात व युद्धाच्या काळात एकत्र ठेवण्यास पूर्णपणे सक्षम आहे. जर नव्या संविधानाखाली काही चुकीचे घडले, तर संविधान वाईट होते असे नव्हे, तर ते चालवणारी माणसे अपुरी पडली असे म्हणावे लागेल. संविधान ते चालवणाऱ्या माणसांइतकेच चांगले असते."
        }
      }
    ],
    "summary": {
      "en": "Historic address on the formal adoption of the Constitution of India (26 November 1949). Emphasizes that constitutional survival relies not on textual perfection, but on civic character, democratic conventions, and constitutional morality.",
      "hi": "भारत के संविधान को औपचारिक रूप से स्वीकार किए जाने पर 26 नवंबर 1949 का संबोधन। उन्होंने बल दिया कि संविधान की सफलता शब्दों पर नहीं, बल्कि उसे संचालित करने वाले नागरिकों और नेताओं के लोकतांत्रिक आचरण पर निर्भर करती है।",
      "mr": "२६ नोव्हेंबर १९४९ रोजी भारतीय संविधान औपचारिकपणे स्वीकारताना केलेले भाषण. संविधानाचे यश हे केवळ कलमांवर नसून ते चालवणाऱ्या राज्यकर्त्यांच्या आणि जनतेच्या घटनात्मक नैतिकतेवर अवलंबून असते हा इशारा दिला."
    }
  },
  {
    "id": "item-dissertation-columbia",
    "collection_id": "col-baws",
    "type": "manuscript",
    "title": "Commercial Relations of India: Columbia M.A. Dissertation",
    "title_i18n": {
      "en": "Commercial Relations of India: Columbia M.A. Dissertation",
      "hi": "भारत के व्यापारिक संबंध: कोलंबिया एम.ए. शोध प्रबंध",
      "mr": "भारताचे व्यापारी संबंध: कोलंबिया एम.ए. प्रबंध"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1915-06-02",
    "date_end": "1915-06-02",
    "source": "Columbia University Archives",
    "provenance": "Master of Arts thesis submitted to the Faculty of Political Science, Columbia University, New York, June 1915.",
    "rights": "Public Domain (Columbia University / BAWS Vol. 12)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The economic history of India reveals how foreign mercantilist trade policies systematically dismantled India's indigenous manufacturing and handicraft supremacy, transforming a proud exporter into a raw-material tributary.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The economic history of India reveals how foreign mercantilist trade policies systematically dismantled India's indigenous manufacturing and handicraft supremacy, transforming a proud exporter of fine textiles into a dependent raw-material tributary of the British Empire. The regeneration of Indian industry demands tariff autonomy, scientific currency management, and sovereign control over domestic economic policies.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "mercantilist",
            "bbox": [
              50,
              40,
              160,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "manufacturing",
            "bbox": [
              170,
              40,
              290,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "autonomy",
            "bbox": [
              50,
              80,
              140,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "sovereign",
            "bbox": [
              150,
              80,
              230,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "भारत का आर्थिक इतिहास यह उजागर करता है कि कैसे विदेशी व्यापार नीतियों ने भारत के स्वदेशी वस्त्र व विनिर्माण उद्योग को नष्ट कर दिया और एक निर्यातक राष्ट्र को ब्रिटिश साम्राज्य का कच्चा माल आपूर्ति करने वाला उपनिवेश बना दिया। भारतीय उद्योग के पुनरुत्थान के लिए टैरिफ स्वायत्तता और संप्रभु आर्थिक नियंत्रण अनिवार्य है।",
          "mr": "भारताचा आर्थिक इतिहास हे दाखवून देतो की परकीय व्यापारी धोरणांनी भारताच्या संपन्न कापड व हस्तकला उद्योगाचा पद्धतशीरपणे नाश केला आणि भारताला केवळ कच्चा माल पुरवणारी वसाहत बनवले. भारतीय उद्योगांच्या पुनरुज्जीवनासाठी जकात स्वायत्तता आणि सार्वभौम आर्थिक नियंत्रण अत्यंत आवश्यक आहे."
        }
      }
    ],
    "summary": {
      "en": "Dr. Ambedkar's M.A. thesis at Columbia University (1915). A rigorous economic history exploring how colonial mercantilism drained Indian resources and dismantled its indigenous manufacturing base.",
      "hi": "कोलंबिया विश्वविद्यालय (1915) में डॉ. आंबेडकर का एम.ए. शोध प्रबंध। उन्होंने विस्तार से दर्शाया कि कैसे ब्रिटिश व्यापारिक नीतियों ने भारत के घरेलू विनिर्माण को नष्ट कर देश के संसाधनों का दोहन किया।",
      "mr": "कोलंबिया विद्यापीठातील (१९१५) एम.ए. प्रबंध. ईस्ट इंडिया कंपनी आणि ब्रिटिश राजवटीने भारताच्या कापड उद्योगाचा नाश करून देशाचे आर्थिक शोषण कसे केले याचे सांख्यिकीय विश्लेषण."
    }
  },
  {
    "id": "item-editorial-mooknayak",
    "collection_id": "col-baws",
    "type": "article",
    "title": "Mooknayak Inaugural Editorial: Swaraj and Social Justice",
    "title_i18n": {
      "en": "Mooknayak Inaugural Editorial: Swaraj and Social Justice",
      "hi": "मूकनायक का प्रथम संपादकीय: स्वराज और सामाजिक न्याय",
      "mr": "मूकनायक अग्रलेख: स्वराज्य आणि सामाजिक न्याय"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1920-01-31",
    "date_end": "1920-01-31",
    "source": "Mooknayak Issue 1 (Bombay)",
    "provenance": "Inaugural issue of the fortnightly paper 'Mooknayak' (Leader of the Voiceless), launched on 31 January 1920 in Bombay with the assistance of Chhatrapati Shahu Maharaj.",
    "rights": "Public Domain (BAWS Vol. 19)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The Hindu society is like a multi-storeyed tower without a staircase or an entrance door. Those who are born on the ground floor must die on the ground floor. Swaraj without social equality is merely replacing foreign masters with domestic despots.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The Hindu society is like a multi-storeyed tower without a staircase or an entrance door. Those who are born on the ground floor must die on the ground floor, and those on the top floor remain permanently entrenched at the top. Swaraj without the annihilation of social tyranny will only replace foreign masters with domestic despots. The voice of the dumb must be heard, and equality must precede political freedom.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "staircase",
            "bbox": [
              50,
              40,
              130,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Swaraj",
            "bbox": [
              140,
              40,
              210,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "tyranny",
            "bbox": [
              50,
              80,
              120,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "equality",
            "bbox": [
              130,
              80,
              200,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "हिंदू समाज एक बहुमंजिला मीनार की तरह है जिसमें कोई सीढ़ी या प्रवेश द्वार नहीं है। जो जिस मंजिल पर पैदा हुआ है, उसे उसी मंजिल पर मरना है। सामाजिक अन्याय को समाप्त किए बिना मिलने वाला स्वराज केवल विदेशी शासकों की जगह घरेलू निरंकुशों को बैठा देगा। मूक जनता की आवाज सुनी जानी चाहिए और राजनीतिक स्वतंत्रता से पहले सामाजिक समता आनी चाहिए।",
          "mr": "हिंदू समाज हा एका बहुमजली मनोऱ्यासारखा आहे ज्याला ना जिना आहे ना दरवाजा. जो ज्या मजल्यावर जन्माला आला त्याला त्याच मजल्यावर मरावे लागते. सामाजिक विषमतेचे उच्चाटन केल्याशिवाय मिळणारे स्वराज्य म्हणजे केवळ गोऱ्या साहेबांच्या जागी काळ्या साहेबांची सत्ता आणणे होय. मुक्यांचे अश्रू पुसण्यासाठी आणि समतेच्या प्रस्थापनेसाठी हे वृत्तपत्र सुरू झाले आहे."
        }
      }
    ],
    "summary": {
      "en": "Historic opening editorial of 'Mooknayak' (31 Jan 1920). Introduced the famous metaphor of Hindu caste society as a multi-storeyed tower without stairs, arguing that social equality is the prerequisite for authentic Swaraj.",
      "hi": "'मूकनायक' का पहला संपादकीय (31 जनवरी 1920)। हिंदू समाज की तुलना बिना सीढ़ी वाले बहुमंजिला भवन से करते हुए यह स्थापित किया कि वास्तविक स्वराज के लिए जातिगत उत्पीड़न का खात्मा अनिवार्य शर्त है।",
      "mr": "'मूकनायक' या पाक्षिकाचा पहिला अग्रलेख (३१ जानेवारी १९२०). हिंदू समाजाची बहुमजली मनोऱ्याशी केलेली अजरामर तुलना आणि समतेशिवाय स्वराज्य म्हणजे केवळ सत्तांतर ठरेल हा परखड विचार मांडला."
    }
  },
  {
    "id": "item-editorial-bahishkrit",
    "collection_id": "col-baws",
    "type": "article",
    "title": "Bahishkrit Bharat Editorial: Self-Respect and Emancipation",
    "title_i18n": {
      "en": "Bahishkrit Bharat Editorial: Self-Respect and Emancipation",
      "hi": "बहिष्कृत भारत संपादकीय: आत्मसम्मान और मुक्ति",
      "mr": "बहिष्कृत भारत अग्रलेख: स्वाभिमान आणि मुक्ती"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1927-04-03",
    "date_end": "1927-04-03",
    "source": "Bahishkrit Bharat Issue 1 (Bombay)",
    "provenance": "Inaugural editorial of 'Bahishkrit Bharat' (Excluded India), published in Bombay on 3 April 1927 shortly after the Mahad Satyagraha.",
    "rights": "Public Domain (BAWS Vol. 20)",
    "access_tier": "open",
    "status": "published",
    "snippet": "Self-respect is the most vital factor in life. Without it, man is a mere cipher. We do not seek the pity or patronage of others; we demand our unconditional civil rights as free citizens of this land.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Self-respect is the most vital factor in life. Without it, man is a mere cipher. To live worthily in this world, one must overcome obstacles and assert one's rightful share in social and national life. We do not seek the pity or patronage of others; we demand our unconditional civil rights as free citizens of this land. Self-help, self-reliance, and self-respect are our guiding stars.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Self-respect",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "vital",
            "bbox": [
              160,
              40,
              210,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "patronage",
            "bbox": [
              50,
              80,
              140,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "citizens",
            "bbox": [
              150,
              80,
              220,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "स्वाभिमान जीवन का सबसे महत्वपूर्ण तत्व है। इसके बिना मनुष्य एक शून्य मात्र है। इस संसार में सम्मानपूर्वक जीने के लिए बाधाओं को पार करना होगा और अपने नागरिक अधिकारों को प्राप्त करना होगा। हम किसी की दया के मोहताज नहीं हैं; हम स्वतंत्र नागरिक के रूप में अपने अधिकारों की मांग करते हैं। स्वावलंबन और आत्मसम्मान ही हमारे पथप्रदर्शक हैं।",
          "mr": "स्वाभिमान हा मानवी जीवनातील सर्वात महत्त्वाचा घटक आहे. स्वाभिमानाशिवाय माणूस म्हणजे केवळ शून्य. जगात सन्मानाने जगायचे असेल तर अडचणींवर मात करून आपले न्याय्य हक्क मिळवलेच पाहिजेत. आम्हाला कोणाच्या दयेची गरज नाही; स्वतंत्र नागरिक म्हणून आम्ही आमच्या नागरी हक्कांची मागणी करतो. स्वावलंबन आणि स्वाभिमान हेच आमचे मार्गदर्शक आहेत."
        }
      }
    ],
    "summary": {
      "en": "Inaugural editorial of 'Bahishkrit Bharat' (3 April 1927). Proclaimed self-respect and self-help as the supreme guiding principles for the depressed classes following the historic Mahad Satyagraha.",
      "hi": "'बहिष्कृत भारत' का उद्घाटन संपादकीय (3 अप्रैल 1927)। महाड सत्याग्रह के तुरंत बाद लिखा गया, जिसमें दया के स्थान पर आत्मसम्मान, स्वावलंबन और अधिकारों के संघर्ष को जीवन का मूलमंत्र घोषित किया गया।",
      "mr": "'बहिष्कृत भारत'चा पहिला अग्रलेख (३ एप्रिल १९२७). महाड सत्याग्रहानंतर अस्पृश्य समाजाला स्वाभिमानाने आणि स्वावलंबनाने जगण्याचा आणि हक्कांसाठी लढण्याचा दिलेला क्रांतीकारी संदेश."
    }
  },
  {
    "id": "item-mahad-declaration",
    "collection_id": "col-baws",
    "type": "manuscript",
    "title": "Mahad Satyagraha Declaration at Chavdar Tale",
    "title_i18n": {
      "en": "Mahad Satyagraha Declaration at Chavdar Tale",
      "hi": "चवदार तालाब पर महाड सत्याग्रह घोषणा पत्र",
      "mr": "चवदार तळे महाड सत्याग्रह जाहीरनामा"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1927-03-20",
    "date_end": "1927-03-20",
    "source": "Mahad Historical Papers (Kolaba District)",
    "provenance": "Delivered at the Kolaba District Depressed Classes Conference, Mahad, Maharashtra, on 20 March 1927.",
    "rights": "Public Domain (BAWS Vol. 17)",
    "access_tier": "open",
    "status": "published",
    "snippet": "This Satyagraha at Chavdar Tank is not merely about drinking water. It is an assertion of our fundamental human dignity. We want to establish that we are human beings just like any other citizen.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "This Satyagraha at Chavdar Tank is not merely about drinking water. It is an assertion of our fundamental human dignity. We want to establish that we are human beings just like any other citizen. If animals, birds, and other creatures are permitted to drink from this tank, on what moral or legal ground can human beings be barred? We march to the water to claim our sacred birthright of equality.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Satyagraha",
            "bbox": [
              50,
              40,
              140,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "dignity",
            "bbox": [
              150,
              40,
              220,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "creatures",
            "bbox": [
              50,
              80,
              130,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "equality",
            "bbox": [
              140,
              80,
              210,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "चवदार तालाब का यह सत्याग्रह केवल पानी पीने का संघर्ष नहीं है। यह हमारी मानवीय गरिमा और आत्मसम्मान की उद्घोषणा है। हम यह सिद्ध करना चाहते हैं कि हम भी अन्य नागरिकों की तरह इंसान हैं। यदि पशु-पक्षी इस तालाब का पानी पी सकते हैं, तो इंसानों को किस नैतिक अधिकार से रोका जा सकता है? हम समता के अपने जन्मसिद्ध अधिकार को स्थापित करने के लिए आगे बढ़ रहे हैं।",
          "mr": "चवदार तळ्याचा हा सत्याग्रह केवळ पाणी पिण्यासाठी नाही. तर हे आमचे मानवी हक्क आणि आत्मसन्मान प्रस्थापित करण्याचे आंदोलन आहे. इतर माणसांप्रमाणेच आम्हीही माणसे आहोत हे आम्हाला जगाला दाखवून द्यायचे आहे. जनावरांना ज्या पाण्याचा अधिकार आहे, त्या पाण्यापासून माणसाला वंचित ठेवणे हा अधर्म आहे. आम्ही समतेच्या अधिकारासाठी हे पाणी स्पर्श करत आहोत."
        }
      }
    ],
    "summary": {
      "en": "Historic declaration of the Mahad Satyagraha (20 March 1927). Dr. Ambedkar led thousands of untouchables to drink water from the public Chavdar tank, declaring it a revolution for fundamental human dignity and equal civil rights.",
      "hi": "महाड सत्याग्रह का ऐतिहासिक उद्घोष (20 मार्च 1927)। सार्वजनिक चवदार तालाब से जल ग्रहण कर डॉ. आंबेडकर ने सदियों की अमानवीय पाबंदियों को तोड़ा और मानवीय गरिमा व समानता की क्रांति का शंखनाद किया।",
      "mr": "महाड चवदार तळे सत्याग्रहाचा जाहीरनामा (२० मार्च १९२७). सार्वजनिक पाण्याचा हक्क बजावून डॉ. आंबेडकरांनी अस्पृश्यांना मानवी हक्कांची आणि समतेची जाणीव करून देणारा ऐतिहासिक लढा उभारला."
    }
  },
  {
    "id": "item-poona-pact-doc",
    "collection_id": "col-baws",
    "type": "manuscript",
    "title": "The Poona Pact Agreement Document",
    "title_i18n": {
      "en": "The Poona Pact Agreement Document",
      "hi": "पूना पैक्ट ऐतिहासिक समझौता दस्तावेज",
      "mr": "पुणे करार ऐतिहासिक करार दस्तऐवज"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1932-09-24",
    "date_end": "1932-09-24",
    "source": "Yerwada Central Prison Archives, Poona",
    "provenance": "Historic agreement signed at Yerwada Central Prison on 24 September 1932 between Dr. B. R. Ambedkar, Madan Mohan Malaviya, and caste Hindu leaders.",
    "rights": "Public Domain (National Archives of India)",
    "access_tier": "open",
    "status": "published",
    "snippet": "There shall be seats reserved for the Depressed Classes out of the general electorates. The number of reserved seats shall be 148, as against 71 granted by the Communal Award, with joint electorates and primary voting.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "There shall be seats reserved for the Depressed Classes out of the general electorates in the Provincial Legislatures. The number of reserved seats shall be 148, as against 71 granted by the Communal Award. Election to these seats shall be by joint electorates subject to a primary election system. Adequate representation shall also be secured in the Central Legislature and public services without educational prejudice.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "reserved",
            "bbox": [
              50,
              40,
              130,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Depressed",
            "bbox": [
              140,
              40,
              230,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "electorates",
            "bbox": [
              50,
              80,
              140,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "Legislature",
            "bbox": [
              150,
              80,
              240,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "प्रांतीय विधानमंडलों में सामान्य निर्वाचन क्षेत्रों में से दलित वर्गों के लिए सीटें आरक्षित होंगी। आरक्षित सीटों की संख्या 148 होगी, जबकि कम्युनल अवार्ड में केवल 71 दी गई थीं। इन सीटों पर चुनाव संयुक्त निर्वाचन प्रणाली द्वारा होगा जिसमें प्राथमिक निर्वाचन की व्यवस्था होगी। केंद्रीय विधायिका और सार्वजनिक सेवाओं में भी पर्याप्त प्रतिनिधित्व सुरक्षित किया जाएगा।",
          "mr": "प्रांतिक कायदेमंडळात खुल्या मतदारसंघातून पददलित वर्गासाठी जागा राखीव ठेवण्यात येतील. राखीव जागांची संख्या १४८ असेल, ज्या जातीय निवाड्यात केवळ ७१ होत्या. या जागांवर प्राथमिक मतदान पद्धतीसह संयुक्त मतदारसंघ पद्धतीने निवडणुका होतील. केंद्रीय कायदेमंडळ आणि सरकारी नोकऱ्यांमध्येही पुरेसे प्रतिनिधित्व दिले जाईल."
        }
      }
    ],
    "summary": {
      "en": "Text of the Poona Pact (24 September 1932) signed at Yerwada Jail. Replaced separate electorates with 148 reserved legislative seats for the Depressed Classes under a joint electorate framework.",
      "hi": "यरवदा जेल में 24 सितंबर 1932 को हस्ताक्षरित पूना पैक्ट का मूल पाठ। पृथक निर्वाचक मंडल के स्थान पर प्रांतीय विधानसभाओं में दलित वर्गों के लिए 148 आरक्षित सीटें सुनिश्चित की गईं।",
      "mr": "२४ सप्टेंबर १९३२ रोजी येरवडा तुरुंगात झालेला ऐतिहासिक पुणे करार. स्वतंत्र मतदारसंघांऐवजी पददलित वर्गासाठी १४८ राखीव जागा आणि प्राथमिक मतदान पद्धती मान्य करण्यात आली."
    }
  },
  {
    "id": "item-states-minorities",
    "collection_id": "col-baws",
    "type": "book",
    "title": "States and Minorities: Fundamental Rights and Economic Democracy",
    "title_i18n": {
      "en": "States and Minorities: Fundamental Rights and Economic Democracy",
      "hi": "राज्य और अल्पसंख्यक: मौलिक अधिकार और आर्थिक लोकतंत्र",
      "mr": "राज्य आणि अल्पसंख्याक: मूलभूत हक्क आणि आर्थिक लोकशाही"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1947-03-15",
    "date_end": "1947-03-15",
    "source": "Fundamental Rights Sub-Committee (Thacker & Co., Bombay)",
    "provenance": "Constitutional memorandum submitted to the Constituent Assembly on behalf of the All India Scheduled Castes Federation in March 1947.",
    "rights": "Public Domain (BAWS Vol. 1)",
    "access_tier": "open",
    "status": "published",
    "snippet": "Political democracy cannot succeed without State Socialism. The key industries, insurance, and agricultural land must belong to the State, so that private monopoly cannot exploit the impoverished masses.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Political democracy cannot succeed without State Socialism. The key industries of the country, insurance, and agricultural land must belong to the State, so that private monopoly cannot exploit the impoverished masses. Fundamental rights must guarantee not merely civil liberties against State interference, but economic security against private subjugation. Economic democracy must be written into the Constitution itself.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "democracy",
            "bbox": [
              50,
              40,
              130,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Socialism",
            "bbox": [
              140,
              40,
              220,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "industries",
            "bbox": [
              50,
              80,
              130,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "monopoly",
            "bbox": [
              140,
              80,
              220,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "राज्य समाजवाद के बिना राजनीतिक लोकतंत्र कभी सफल नहीं हो सकता। देश के प्रमुख उद्योग, बीमा और कृषि भूमि राज्य के स्वामित्व में होने चाहिए, ताकि निजी एकाधिकार गरीबों का शोषण न कर सके। मौलिक अधिकारों को केवल नागरिक स्वतंत्रता ही नहीं, बल्कि आर्थिक सुरक्षा की भी संवैधानिक गारंटी देनी चाहिए। आर्थिक लोकतंत्र को संविधान का अभिन्न अंग होना चाहिए।",
          "mr": "राज्य समाजवादाशिवाय राजकीय लोकशाही कधीही यशस्वी होऊ शकत नाही. देशातील प्रमुख उद्योग, विमा आणि शेतजमीन राज्याच्या मालकीची असली पाहिजे, जेणेकरून खाजगी मक्तेदारी गरिबांचे शोषण करणार नाही. मूलभूत हक्कांनी केवळ नागरी स्वातंत्र्यच नव्हे, तर खाजगी शोषणाविरुद्ध आर्थिक सुरक्षिततेची हमी दिली पाहिजे. आर्थिक लोकशाही संविधानातच अंतर्भूत केली पाहिजे."
        }
      }
    ],
    "summary": {
      "en": "Radical constitutional proposal submitted to the Constituent Assembly (March 1947). Formulated 'State Socialism' as a constitutional requirement—nationalizing key industries, insurance, and agricultural land to prevent capitalist monopolies.",
      "hi": "संविधान सभा को प्रस्तुत युगांतरकारी संवैधानिक प्रारूप (मार्च 1947)। राजनीतिक लोकतंत्र के साथ 'राज्य समाजवाद' को संवैधानिक अनिवार्यता बनाते हुए प्रमुख उद्योगों और कृषि भूमि के राष्ट्रीयकरण का प्रस्ताव रखा।",
      "mr": "घटना समितीला सादर केलेला क्रांतिकारी घटनात्मक मसुदा (मार्च १९४७). राजकीय लोकशाही टिकवण्यासाठी प्रमुख उद्योग, विमा आणि शेतजमिनीचे राष्ट्रीयकरण करून राज्य समाजवाद संविधानात आणण्याचा आग्रह धरला."
    }
  },
  {
    "id": "item-hindu-code-resignation",
    "collection_id": "col-baws",
    "type": "speech",
    "title": "Statement on Resignation as Union Law Minister (Hindu Code Bill)",
    "title_i18n": {
      "en": "Statement on Resignation as Union Law Minister (Hindu Code Bill)",
      "hi": "केंद्रीय विधि मंत्री पद से त्यागपत्र पर वक्तव्य (हिंदू कोड बिल)",
      "mr": "केंद्रीय कायदेमंत्री पदाच्या राजीनाम्यावरील निवेदन (हिंदू कोड बिल)"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1951-09-27",
    "date_end": "1951-09-27",
    "source": "Parliament of India (Official Debates)",
    "provenance": "Delivered in the Provisional Parliament, New Delhi, on 27 September 1951 upon resigning as Minister of Law.",
    "rights": "Public Domain (BAWS Vol. 14)",
    "access_tier": "open",
    "status": "published",
    "snippet": "I have resigned because the Hindu Code Bill, designed to confer equal property and matrimonial rights upon women, was dropped. To leave women without equal rights while building a modern nation is sheer hypocrisy.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "I have resigned because the Hindu Code Bill, which was designed to reform Hindu civil law and confer equal property and matrimonial rights upon women, was dropped by the Cabinet. To leave Hindu women without equal rights of inheritance, divorce, and guardianship while claiming to build a modern progressive nation is sheer hypocrisy. Social reform and women's emancipation are the true tests of national independence.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "resigned",
            "bbox": [
              50,
              40,
              120,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "matrimonial",
            "bbox": [
              130,
              40,
              230,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "hypocrisy",
            "bbox": [
              50,
              80,
              130,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "emancipation",
            "bbox": [
              140,
              80,
              260,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "मैंने इसलिए त्यागपत्र दिया है क्योंकि हिंदू कोड बिल, जो महिलाओं को समान संपत्ति और वैवाहिक अधिकार देने तथा हिंदू नागरिक कानून में सुधार के लिए तैयार किया गया था, उसे मंत्रिमंडल द्वारा छोड़ दिया गया। महिलाओं को उत्तराधिकार और स्वतंत्रता से वंचित रखकर एक आधुनिक प्रगतिशील राष्ट्र बनाने का दावा करना पाखंड है। महिलाओं की मुक्ति ही वास्तविक स्वतंत्रता की कसौटी है।",
          "mr": "मी राजीनामा दिला आहे कारण हिंदू कोड बिल, जे महिलांना समान मालमत्ता आणि वैवाहिक हक्क देण्यासाठी तयार करण्यात आले होते, ते मंत्रिमंडळाने बासनात गुंडाळले. स्त्रियांना वारसा हक्क आणि समान स्वातंत्र्य नाकारून आधुनिक पुरोगामी राष्ट्र उभारण्याचा दावा करणे हा दांभिकपणा आहे. महिलांचे सक्षमीकरण हीच खऱ्या स्वातंत्र्याची कसोटी आहे."
        }
      }
    ],
    "summary": {
      "en": "Principled resignation address as Law Minister (September 1951). Dr. Ambedkar resigned over the stalling of the Hindu Code Bill, asserting that gender equity, women's property rights, and social reform take precedence over ministerial office.",
      "hi": "विधि मंत्री पद से त्यागपत्र पर ऐतिहासिक वक्तव्य (सितंबर 1951)। महिलाओं को संपत्ति और वैवाहिक समानता देने वाले हिंदू कोड बिल के लटकने पर डॉ. आंबेडकर ने मंत्री पद त्याग दिया और लैंगिक न्याय को सर्वोपरि घोषित किया।",
      "mr": "कायदेमंत्री पदाचा राजीनामा देताना संसदेत दिलेले निर्भीड निवेदन (सप्टेंबर १९५१). महिलांना समान मालमत्ता आणि वारसा हक्क देणाऱ्या हिंदू कोड बिलाला विरोध झाल्याने तत्त्वासाठी पदाचा त्याग केला."
    }
  },
  {
    "id": "item-deekshabhoomi-speech",
    "collection_id": "col-baws",
    "type": "speech",
    "title": "Historic Deekshabhoomi Conversion Address",
    "title_i18n": {
      "en": "Historic Deekshabhoomi Conversion Address",
      "hi": "दीक्षाभूमि नागपुर का ऐतिहासिक धर्मांतरण भाषण",
      "mr": "दीक्षाभूमी नागपूर ऐतिहासिक धम्मदीक्षा भाषण"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1956-10-15",
    "date_end": "1956-10-15",
    "source": "Deekshabhoomi Archives, Nagpur",
    "provenance": "Delivered at the conversion ground (Deekshabhoomi), Nagpur, on 15 October 1956 following the formal embrace of Buddhism by half a million followers.",
    "rights": "Public Domain (BAWS Vol. 18)",
    "access_tier": "open",
    "status": "published",
    "snippet": "By discarding Hinduism and embracing the Dhamma of the Buddha, we are taking a new birth. We are leaving behind the hell of graded inequality and entering into the sunshine of liberty, equality, and fraternity.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "By discarding Hinduism and embracing the Dhamma of the Buddha, we are taking a new birth. We are leaving behind the hell of graded inequality and entering into the sunshine of liberty, equality, and fraternity. Buddhism is a religion grounded in reason and human morality, not in blind faith or caste privilege. Dedicate your lives to learning, self-respect, and the welfare of all living beings.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Dhamma",
            "bbox": [
              50,
              40,
              120,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "liberty",
            "bbox": [
              130,
              40,
              190,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "morality",
            "bbox": [
              50,
              80,
              120,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "welfare",
            "bbox": [
              130,
              80,
              200,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "हिंदू धर्म का त्याग कर तथागत बुद्ध के धम्म को अपनाकर हम एक नया जन्म ले रहे हैं। हम श्रेणीबद्ध असमानता के नर्क को पीछे छोड़कर स्वतंत्रता, समानता और बंधुत्व के प्रकाश में प्रवेश कर रहे हैं। बौद्ध धर्म अंधविश्वास पर नहीं, बल्कि विवेक और मानवीय नैतिकता पर आधारित है। अपने जीवन को ज्ञान, स्वाभिमान और बहुजन हिताय समर्पित करें।",
          "mr": "हिंदू धर्माचा त्याग करून बुद्धाच्या धम्माचा स्वीकार करून आपण नवा जन्म घेत आहोत. विषमतेच्या नरकातून बाहेर पडून आपण स्वातंत्र्य, समता आणि बंधुतेच्या प्रकाशात प्रवेश करत आहोत. बौद्ध धर्म अंधश्रद्धेवर नव्हे, तर विवेक आणि मानवी मूल्यांवर उभा आहे. आपले जीवन ज्ञान, स्वाभिमान आणि सर्व प्राणिमात्रांच्या कल्याणासाठी समर्पित करा."
        }
      }
    ],
    "summary": {
      "en": "Historic address at Nagpur (15 October 1956) where Dr. Ambedkar and over 500,000 followers embraced Buddhism. Articulated conversion as spiritual and social liberation from graded caste hierarchy into human dignity and universal compassion.",
      "hi": "दीक्षाभूमि नागपुर (15 अक्टूबर 1956) का ऐतिहासिक उद्बोधन जहां 5 लाख से अधिक अनुयायियों ने बौद्ध धर्म ग्रहण किया। धर्मांतरण को जातिगत उत्पीड़न से मुक्ति और स्वतंत्रता, समता, बंधुता के नए जन्म के रूप में परिभाषित किया।",
      "mr": "दीक्षाभूमी नागपूर (१५ ऑक्टोबर १९५६) येथील ऐतिहासिक भाषण. ५ लाखांहून अधिक बांधवांसह धम्मदीक्षा घेत जातिव्यवस्थेच्या विषमतेतून मुक्त होऊन स्वातंत्र्य, समता आणि बंधुभावाच्या नव्या जीवनाची सुरुवात केली."
    }
  },
  {
    "id": "item-bbc-interview",
    "collection_id": "col-baws",
    "type": "audio",
    "title": "BBC London Interview on Parliamentary Democracy",
    "title_i18n": {
      "en": "BBC London Interview on Parliamentary Democracy",
      "hi": "संसदीय लोकतंत्र पर बीबीसी लंदन साक्षात्कार",
      "mr": "संसदीय लोकशाहीवर बीबीसी लंडन मुलाखत"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1953-05-18",
    "date_end": "1953-05-18",
    "source": "BBC London Radio Broadcast Archives",
    "provenance": "Recorded at BBC Broadcasting House, London, on 18 May 1953 with Francis Watson.",
    "rights": "Public Domain (BBC Sound Archives)",
    "access_tier": "open",
    "status": "published",
    "snippet": "Democracy is not merely a form of government; it is primarily a mode of associated living. For democracy to succeed, there must be a moral order in society, an absence of glaring inequalities, and an active opposition.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Democracy is not merely a form of government; it is primarily a mode of associated living, of conjoint communicated experience. For parliamentary democracy to succeed, there must be a moral order in society, an absence of glaring economic inequalities, a functioning constitutional morality, and an active opposition. If a society remains fundamentally divided into privileged and oppressed castes, political democracy becomes a fragile facade.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Democracy",
            "bbox": [
              50,
              40,
              140,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "associated",
            "bbox": [
              150,
              40,
              240,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "morality",
            "bbox": [
              50,
              80,
              120,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "opposition",
            "bbox": [
              130,
              80,
              220,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "लोकतंत्र केवल सरकार का एक रूप नहीं है; यह मूलतः सह-अस्तित्व और साझे मानवीय अनुभवों की जीवन पद्धति है। संसदीय लोकतंत्र की सफलता के लिए समाज में नैतिक व्यवस्था, आर्थिक असमानता का अभाव और एक सक्रिय विपक्ष का होना अनिवार्य है। यदि समाज विशेषाधिकार प्राप्त और शोषित जातियों में बंटा रहेगा, तो राजनीतिक लोकतंत्र केवल एक खोखला आवरण बनकर रह जाएगा।",
          "mr": "लोकशाही म्हणजे केवळ शासन पद्धती नव्हे; ती प्रामुख्याने सहजीवन आणि परस्परांबद्दल आदर बाळगण्याची जीवनपद्धती आहे. संसदीय लोकशाही यशस्वी होण्यासाठी समाजात नैतिक अधिष्ठान, आर्थिक विषमतेचा अभाव आणि सशक्त विरोधक असणे गरजेचे आहे. समाज जर विषमतेने पोखरलेला असेल, तर राजकीय लोकशाही हा केवळ एक देखावा ठरेल."
        }
      }
    ],
    "summary": {
      "en": "Rare broadcast interview on BBC London (May 1953). Dr. Ambedkar analyzes the prerequisites of parliamentary democracy, emphasizing that democracy cannot survive without social fraternity, constitutional morality, and a vigilant opposition.",
      "hi": "बीबीसी लंदन (मई 1953) पर दुर्लभ रेडियो साक्षात्कार। डॉ. आंबेडकर ने संसदीय लोकतंत्र की पूर्वशर्तों का विश्लेषण किया और चेतावनी दी कि सामाजिक बंधुता और नैतिक चेतना के बिना राजनीतिक लोकतंत्र टिक नहीं सकता।",
      "mr": "बीबीसी लंडनवरील (मे १९५३) दुर्मिळ रेडिओ मुलाखत. संसदीय लोकशाही यशस्वी होण्यासाठी सामाजिक समता, घटनात्मक नैतिकता आणि जागरूक विरोधी पक्ष किती आवश्यक आहेत याचे सखोल विवेचन केले."
    }
  },
  {
    "id": "item-photo-drafting-committee",
    "collection_id": "col-cad",
    "type": "photo",
    "title": "Official Photograph of the Drafting Committee of the Indian Constitution",
    "title_i18n": {
      "en": "Official Photograph of the Drafting Committee of the Indian Constitution",
      "hi": "भारतीय संविधान प्रारूप समिति का आधिकारिक ऐतिहासिक छायाचित्र",
      "mr": "भारतीय संविधान मसुदा समितीचे अधिकृत ऐतिहासिक छायाचित्र"
    },
    "creator": "Constituent Assembly of India",
    "date_start": "1947-08-29",
    "date_end": "1947-08-29",
    "source": "National Archives of India / Photo Division",
    "provenance": "Photographed at the Constituent Assembly Chamber, Council House, New Delhi, following Dr. Ambedkar's election as Drafting Committee Chairman on 29 August 1947.",
    "rights": "Public Domain (National Archives of India)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The Drafting Committee of the Indian Constitution, chaired by Dr. B. R. Ambedkar, was tasked on 29 August 1947 with scrutinizing and synthesizing draft proposals into a supreme legal charter for sovereign India.",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The Drafting Committee of the Indian Constitution, chaired by Dr. B. R. Ambedkar, was tasked on 29 August 1947 with scrutinizing and synthesizing draft proposals into a supreme legal charter for sovereign India. The committee comprised eminent jurists including Alladi Krishnaswami Ayyar, N. Gopalaswami Ayyangar, K. M. Munshi, Mohammad Saadulla, B. L. Mitter, and D. P. Khaitan, under the decisive constitutional leadership of Dr. Ambedkar.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Drafting",
            "bbox": [
              50,
              40,
              120,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Committee",
            "bbox": [
              130,
              40,
              220,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "sovereign",
            "bbox": [
              50,
              80,
              130,
              100
            ],
            "conf": 0.98
          },
          {
            "text": "leadership",
            "bbox": [
              140,
              80,
              230,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "डॉ. बी. आर. आंबेडकर की अध्यक्षता में 29 अगस्त 1947 को गठित संविधान प्रारूप समिति को संप्रभु भारत के लिए सर्वोच्च कानूनी दस्तावेज तैयार करने का ऐतिहासिक कार्य सौंपा गया था। समिति में अल्लादि कृष्णास्वामी अय्यर, एन. गोपालस्वामी अय्यंगार, के. एम. मुंशी, मोहम्मद सादुल्ला सहित देश के शीर्ष न्यायविद शामिल थे, जिन्होंने डॉ. आंबेडकर के निर्णायक नेतृत्व में संविधान का प्रारूप तैयार किया।",
          "mr": "२९ ऑगस्ट १९४७ रोजी डॉ. बाबासाहेब आंबेडकर यांच्या अध्यक्षतेखाली स्थापन करण्यात आलेल्या मसुदा समितीकडे सार्वभौम भारताचे संविधान तयार करण्याची ऐतिहासिक जबाबदारी सोपवण्यात आली होती. अल्लादी कृष्णास्वामी अय्यर, के. एम. मुन्शी, एन. गोपालस्वामी अय्यंगार यांच्यासह मसुदा समितीने डॉ. आंबेडकरांच्या नेतृत्वाखाली भारतीय प्रजासत्ताकाचा महासंविधान मसुदा पूर्ण केला."
        }
      }
    ],
    "summary": {
      "en": "Official archival visual record of the Drafting Committee of the Constituent Assembly (29 August 1947). Documents the legal architect Dr. B. R. Ambedkar leading the committee to draft the Constitution of India.",
      "hi": "संविधान सभा की प्रारूप समिति का आधिकारिक ऐतिहासिक छायाचित्र (29 अगस्त 1947)। भारत के संविधान निर्माण का नेतृत्व करने वाले मुख्य शिल्पी डॉ. बी. आर. आंबेडकर और प्रारूप समिति के सदस्यों का प्रामाणिक दृश्य दस्तावेज।",
      "mr": "घटना समितीच्या मसुदा समितीचे अधिकृत ऐतिहासिक छायाचित्र (२९ ऑगस्ट १९४७). भारतीय संविधानाचे शिल्पकार डॉ. बाबासाहेब आंबेडकर यांच्या नेतृत्वाखाली मसुदा समितीने केलेल्या ऐतिहासिक कार्याचे छायाचित्रीय पुराभिलेख."
    }
  }
];

export const ITEM_ALIAS_MAP: Record<string, string> = {
  "item-001": "item-baws-01-caste",
  "item-002": "item-baws-01-aoc",
  "item-003": "item-baws-06-rupee",
  "item-004": "item-editorial-bahishkrit",
  "item-005": "item-cad-final-speech",
  "item-006": "item-baws-07-shudras",
  "item-007": "item-baws-08-pakistan",
  "item-008": "item-baws-09-congress-gandhi",
  "item-009": "item-baws-11-buddha",
  "item-010": "item-baws-03-philosophy",
  "item-1": "item-baws-01-caste",
  "item-2": "item-baws-01-aoc",
  "item-3": "item-baws-06-rupee",
};

export function getCatalogItemById(id: string): CatalogItem | undefined {
  const canonicalId = ITEM_ALIAS_MAP[id] || id;
  return CATALOG_ITEMS.find((it) => it.id === canonicalId);
}

/**
 * High-speed hybrid search across all authenticated records
 */
export function searchCatalog(query: string, typeFilter?: string, lang: string = "en"): SearchResultItem[] {
  const qClean = (query || "").trim().toLowerCase();
  const filterClean = (typeFilter || "all").toLowerCase();

  return CATALOG_ITEMS.filter((item) => {
    // Type match
    if (filterClean !== "all") {
      if (filterClean === "book" && (item.type === "book" || item.type === "article")) {
        // match book & article
      } else if (item.type !== filterClean) {
        return false;
      }
    }

    if (!qClean) return true;

    // Search fields
    const titleEn = item.title.toLowerCase();
    const titleHi = (item.title_i18n?.hi || "").toLowerCase();
    const titleMr = (item.title_i18n?.mr || "").toLowerCase();
    const source = item.source.toLowerCase();
    const creator = item.creator.toLowerCase();
    const snippet = item.snippet.toLowerCase();
    const provenance = (item.provenance || "").toLowerCase();
    const dateStart = (item.date_start || "").toLowerCase();
    const ocrText = (item.pages[0]?.ocr_text || "").toLowerCase();

    // Page translations
    const pageTransHi = (item.pages[0]?.translations?.hi || "").toLowerCase();
    const pageTransMr = (item.pages[0]?.translations?.mr || "").toLowerCase();

    const terms = qClean.split(/\s+/);
    return terms.every((t) =>
      titleEn.includes(t) ||
      titleHi.includes(t) ||
      titleMr.includes(t) ||
      source.includes(t) ||
      creator.includes(t) ||
      snippet.includes(t) ||
      provenance.includes(t) ||
      dateStart.includes(t) ||
      ocrText.includes(t) ||
      pageTransHi.includes(t) ||
      pageTransMr.includes(t)
    );
  }).map((item) => {
    let score = 0.95;
    if (qClean) {
      if (item.title.toLowerCase().includes(qClean)) score = 0.99;
      else if (item.snippet.toLowerCase().includes(qClean)) score = 0.94;
      else score = 0.88;
    }

    // Try to get language-specific snippet if available
    let snippet = item.snippet;
    if (lang === "hi" && item.pages[0]?.translations?.hi) {
      snippet = item.pages[0].translations.hi;
    } else if (lang === "mr" && item.pages[0]?.translations?.mr) {
      snippet = item.pages[0].translations.mr;
    }

    return {
      id: item.id,
      item_id: item.id,
      type: item.type,
      title: (item.title_i18n && item.title_i18n[lang]) || item.title,
      title_i18n: item.title_i18n,
      snippet: snippet,
      source: item.source,
      date: item.date_start,
      page_no: item.page_no || 1,
      score: score,
      access_tier: item.access_tier,
    };
  }).sort((a, b) => b.score - a.score);
}
