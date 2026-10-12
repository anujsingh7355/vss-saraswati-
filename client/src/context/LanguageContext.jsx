import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // School Title
    schoolName: "VSS Saraswati Vidya Mandir Inter College",
    schoolSubtitle: "Arkha, Raebareli, Uttar Pradesh",
    tagline: "Learn • Grow • Succeed",
    sanskritMotto: "सा विद्या या विमुक्तये",
    mottoMeaning: "Knowledge is that which liberates",
    affiliation: "Affiliated to UP Madhyamik Shiksha Parishad (UP Board), Prayagraj",

    // Nav
    navHome: "Home",
    navAbout: "About Us",
    navAcademics: "Academics",
    navAdmissions: "Admissions",
    navFaculty: "Faculty",
    navFacilities: "Facilities",
    navGallery: "Gallery",
    navNotices: "Notices",
    navEvents: "Events",
    navResults: "Results",
    navDownloads: "Downloads",
    navContact: "Contact Us",
    navAdminLogin: "Admin Login",
    btnAdmissionEnquiry: "Admission Enquiry",

    // Actions & Badges
    viewAllNotices: "View All Notices",
    viewAllEvents: "View All Events",
    applyForAdmission: "Apply for Admission",
    contactSchool: "Contact School",
    checkResult: "Check Online Result",
    downloadProspectus: "Download Prospectus",
    readMore: "Read More",
    quickLinks: "Quick Links",
    importantAnnouncements: "Important Announcements",
    upcomingEvents: "Upcoming Events",
    achievements: "Our Achievements",
    campusTour: "Campus Tour",
    principalDesk: "From the Principal's Desk",

    // Contact
    contactInformation: "Contact Information",
    addressTitle: "Campus Address",
    phoneTitle: "Phone / Helpline",
    emailTitle: "Official Email",
    officeHoursTitle: "Office Hours",
    sendUsMessage: "Send Us a Message",

    // Forms
    studentName: "Student Full Name",
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    dob: "Date of Birth",
    classApplyingFor: "Class Applying For",
    mobileNumber: "Mobile Number",
    emailAddress: "Email Address",
    residentialAddress: "Residential Address",
    previousSchool: "Previous School Attended",
    additionalMessage: "Message / Specific Query",
    submitEnquiry: "Submit Admission Enquiry",
    rollNumber: "Board / College Roll Number",
    searchResult: "Search Result",
    printMarksheet: "Print Marksheet"
  },
  hi: {
    // School Title
    schoolName: "वि.सं.स्मा. सरस्वती विद्या मन्दिर इण्टर कॉलेज",
    schoolSubtitle: "अरखा, रायबरेली, उत्तर प्रदेश",
    tagline: "विद्या • संस्कार • सफलता",
    sanskritMotto: "सा विद्या या विमुक्तये",
    mottoMeaning: "विद्या वही है जो बंधनों से मुक्त करे",
    affiliation: "उत्तर प्रदेश माध्यमिक शिक्षा परिषद (यूपी बोर्ड), प्रयागराज से मान्यता प्राप्त",

    // Nav
    navHome: "मुखपृष्ठ",
    navAbout: "हमारे बारे में",
    navAcademics: "शैक्षणिक",
    navAdmissions: "प्रवेश",
    navFaculty: "शिक्षक वृन्द",
    navFacilities: "सुविधाएं",
    navGallery: "चित्र वीथिका",
    navNotices: "सूचना पट्ट",
    navEvents: "कार्यक्रम",
    navResults: "परीक्षा परिणाम",
    navDownloads: "डाउनलोड्स",
    navContact: "संपर्क करें",
    navAdminLogin: "व्यवस्थापक लॉगिन",
    btnAdmissionEnquiry: "प्रवेश पूछताछ",

    // Actions & Badges
    viewAllNotices: "सभी सूचनाएं देखें",
    viewAllEvents: "सभी कार्यक्रम देखें",
    applyForAdmission: "प्रवेश हेतु आवेदन करें",
    contactSchool: "विद्यालय से संपर्क करें",
    checkResult: "ऑनलाइन परिणाम देखें",
    downloadProspectus: "विवरणिका डाउनलोड करें",
    readMore: "विस्तार से पढ़ें",
    quickLinks: "त्वरित लिंक्स",
    importantAnnouncements: "महत्वपूर्ण सूचनाएं",
    upcomingEvents: "आगामी कार्यक्रम",
    achievements: "हमारी उपलब्धियां",
    campusTour: "परिसर दर्शन",
    principalDesk: "प्रधानाचार्य का संदेश",

    // Contact
    contactInformation: "संपर्क विवरण",
    addressTitle: "विद्यालय का पता",
    phoneTitle: "हेल्पलाइन / फोन नंबर",
    emailTitle: "आधिकारिक ईमेल",
    officeHoursTitle: "कार्यालय समय",
    sendUsMessage: "हमें संदेश भेजें",

    // Forms
    studentName: "छात्र / छात्रा का नाम",
    fatherName: "पिता का नाम",
    motherName: "माता का नाम",
    dob: "जन्म तिथि",
    classApplyingFor: "प्रवेश हेतु इच्छित कक्षा",
    mobileNumber: "मोबाइल नंबर",
    emailAddress: "ईमेल पता",
    residentialAddress: "निवास का स्थायी पता",
    previousSchool: "पूर्व विद्यालय का नाम",
    additionalMessage: "संदेश / अन्य विवरण",
    submitEnquiry: "प्रवेश पूछताछ प्रेषित करें",
    rollNumber: "अनुक्रमांक (Roll Number)",
    searchResult: "परिणाम खोजें",
    printMarksheet: "अंकतालिका प्रिंट करें"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('vss_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('vss_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
