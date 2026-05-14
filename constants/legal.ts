export interface LegalSection {
  id: string;
  heading: string;
  content: string[];
}

export interface LegalData {
  slug: string;
  title: string;
  pageLabel?: string;
  lastUpdated: string;
  lastUpdatedLabel?: string;
  tableOfContentsLabel?: string;
  intro: string;
  sections: LegalSection[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
}

export const LEGAL_PAGE_CONTENT = {
  pageLabel: "Legal Documents",
  lastUpdatedLabel: "Last Updated",
  tableOfContentsLabel: "Table of Contents",
};

export const LEGAL_DATA: LegalData[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    lastUpdated: "January 1, 2026",
    intro: "At Ebook Visionary Publishing, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website and services. Your privacy is of paramount importance to us, and we handle your data with the highest level of care and compliance with international standards.",
    sections: [
      {
        id: "information-we-collect",
        heading: "1. Information We Collect",
        content: [
          "We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.",
          "The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following: names; phone numbers; email addresses; mailing addresses; billing addresses; debit/credit card numbers; and other similar information.",
          "All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information."
        ]
      },
      {
        id: "how-we-use-your-info",
        heading: "2. How We Use Your Information",
        content: [
          "We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.",
          "Specific uses include: facilitating account creation and the logon process, sending administrative information to you, fulfilling and managing your orders, protecting our Services from harm, and delivering targeted advertising to you."
        ]
      },
      {
        id: "sharing-info",
        heading: "3. Sharing Your Information",
        content: [
          "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, or Legal Obligations.",
          "We do not sell your personal data to third parties. Any third-party service providers we use are contractually bound to protect your data to the same degree that we do."
        ]
      },
      {
        id: "cookies",
        heading: "4. Cookies and Tracking Technologies",
        content: [
          "We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.",
          "Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our website."
        ]
      },
      {
        id: "data-retention",
        heading: "5. Data Retention",
        content: [
          "We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).",
          "When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible, then we will securely store your personal information and isolate it from any further processing until deletion is possible."
        ]
      },
      {
        id: "contact-us",
        heading: "6. Contact Us",
        content: [
          "If you have questions or comments about this notice, you may email us at privacy@ebookvisionary.com or by post to our registered office address.",
          "We aim to respond to all privacy-related inquiries within 48 hours."
        ]
      }
    ]
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    lastUpdated: "January 1, 2026",
    intro: "Welcome to Ebook Visionary Publishing. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our services if you do not agree to take all of the terms and conditions stated on this page.",
    sections: [
      {
        id: "intellectual-property",
        heading: "1. Intellectual Property Rights",
        content: [
          "Other than the content you own (such as your submitted manuscripts), under these Terms, Ebook Visionary Publishing and/or its licensors own all the intellectual property rights and materials contained in this Website.",
          "You are granted a limited license only for purposes of viewing the material contained on this Website. You may not duplicate, copy, or reuse any portion of the HTML/CSS, Javascript, or visual design elements without express written permission from us."
        ]
      },
      {
        id: "user-content",
        heading: "2. Your Content",
        content: [
          "In these Website Standard Terms and Conditions, 'Your Content' shall mean any audio, video text, images, manuscripts, or other material you choose to display on or submit to this Website. You retain 100% of the copyright and intellectual property rights to your own work.",
          "By submitting Your Content to our publishing services, you grant us the temporary right to edit, format, and distribute it strictly in accordance with the service agreements you sign with us."
        ]
      },
      {
        id: "restrictions",
        heading: "3. Restrictions",
        content: [
          "You are specifically restricted from all of the following: publishing any Website material in any other media without prior permission; selling, sublicensing, and/or otherwise commercializing any Website material; publicly performing and/or showing any Website material; using this Website in any way that is or may be damaging to this Website; using this Website in any way that impacts user access to this Website.",
          "Certain areas of this Website are restricted from being accessed by you, and Ebook Visionary Publishing may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well."
        ]
      },
      {
        id: "warranties",
        heading: "4. No Warranties",
        content: [
          "This Website is provided 'as is,' with all faults, and Ebook Visionary Publishing expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.",
          "While we strive for excellence in our publishing services, we do not guarantee specific sales numbers, bestseller status, or public reception of your published work, as these depend on market forces beyond our control."
        ]
      },
      {
        id: "limitation-of-liability",
        heading: "5. Limitation of Liability",
        content: [
          "In no event shall Ebook Visionary Publishing, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Ebook Visionary Publishing, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website."
        ]
      },
      {
        id: "governing-law",
        heading: "6. Governing Law & Jurisdiction",
        content: [
          "These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which our company is registered, and you submit to the non-exclusive jurisdiction of the state and federal courts located in that jurisdiction for the resolution of any disputes."
        ]
      }
    ]
  }
];
