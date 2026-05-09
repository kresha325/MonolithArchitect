const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const languageSelect = document.querySelector("#languageSelect");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");
const bodyPage = document.body.dataset.page;
const languageStorageKey = "monolith-language";
const projectStorageKey = "monolith-projects";
let languageDropdownTrigger = null;
let languageDropdownMenu = null;
let languageDropdownRoot = null;
let languageDropdownHideTimer = null;
let projectCatalogCache = [];
let projectsDataLoaded = false;
let projectModalRoot = null;
let activeProjectModalState = null;

const localizedLanguageNames = {
  en: {
    en: "English",
    sq: "Albanian",
    fr: "French",
    de: "German",
    ru: "Russian",
    ar: "Arabic",
    zh: "Chinese",
  },
  sq: {
    en: "Anglisht",
    sq: "Shqip",
    fr: "Frengjisht",
    de: "Gjermanisht",
    ru: "Rusisht",
    ar: "Arabisht",
    zh: "Kinezisht",
  },
  fr: {
    en: "Anglais",
    sq: "Albanais",
    fr: "Français",
    de: "Allemand",
    ru: "Russe",
    ar: "Arabe",
    zh: "Chinois",
  },
  de: {
    en: "Englisch",
    sq: "Albanisch",
    fr: "Französisch",
    de: "Deutsch",
    ru: "Russisch",
    ar: "Arabisch",
    zh: "Chinesisch",
  },
  ru: {
    en: "Английский",
    sq: "Албанский",
    fr: "Французский",
    de: "Немецкий",
    ru: "Русский",
    ar: "Арабский",
    zh: "Китайский",
  },
  ar: {
    en: "الإنجليزية",
    sq: "الألبانية",
    fr: "الفرنسية",
    de: "الألمانية",
    ru: "الروسية",
    ar: "العربية",
    zh: "الصينية",
  },
  zh: {
    en: "英语",
    sq: "阿尔巴尼亚语",
    fr: "法语",
    de: "德语",
    ru: "俄语",
    ar: "阿拉伯语",
    zh: "中文",
  },
};

const translations = {
  en: {
    languageLabel: "Select language",
    openMenu: "Open menu",
    homeAria: "Monolith Architects home",
    nav: ["Home", "Projects", "About", "Services", "Contact"],
    adminLink: "Admin",
    footer: {
      tagline: "We create exceptional spaces that feel calm, bold, and enduring.",
      menu: "Menu",
      contact: "Contact",
      location: "Prizren, Kosovo",
      featuredResidenceAlt: "Monolith Architects featured residence",
    },
    form: {
      kicker: "Inquiry Form",
      heading: "Tell us about your project",
      labels: ["Name", "Email", "Project Type", "Timeline", "Message"],
      placeholders: {
        name: "Your full name",
        email: "your@email.com",
        project: "Residential, commercial, interior...",
        timeline: "Desired start date or timeline",
        message: "Tell us about your vision, budget and timeline",
      },
      detailLabels: {
        email: "Email",
        phone: "Phone",
        studio: "Studio",
      },
      studioAddress: "Prizren, Kosovo",
      submit: "Submit Inquiry",
      defaultNote: "Submit and your inquiry will be sent directly to our inbox.",
      sending: "Sending...",
      success: "Thank you. Your inquiry was sent successfully.",
      failure:
        "Submission failed. Please try again or email monolitharchitects8@gmail.com.",
      subject: "New Monolith Architects inquiry",
    },
    projects: [
      {
        title: "Modern Retreat",
        category: "Residential",
        alt: "Luxury residential villa exterior",
      },
      {
        title: "City Apartment",
        category: "Interior",
        alt: "Minimal living room with warm tones",
      },
      {
        title: "Minimal House",
        category: "Residential",
        alt: "Minimal architectural entrance",
      },
      {
        title: "Office Building",
        category: "Commercial",
        alt: "Glass office building facade",
      },
      {
        title: "Modern Kitchen",
        category: "Interior",
        alt: "Contemporary kitchen interior",
      },
      {
        title: "Hillside Villa",
        category: "Residential",
        alt: "Warm bedroom interior with soft natural light",
      },
    ],
    home: {
      title: "Monolith Architects",
      description:
        "Monolith Architects is a premium architecture studio crafting refined residential and commercial spaces.",
      heroEyebrow: "Prizren Based Architecture Studio",
      heroTitle: "<span>We design</span><span>spaces that</span><span><em>inspire</em>.</span>",
      heroText:
        "Monolith Architects delivers elevated residential, hospitality, and commercial interiors with a focus on atmosphere, proportion, and material clarity.",
      heroLink: "View Our Projects",
      selectedProjects: "Selected Projects",
      projectsHeading:
        "<span>A collection of</span><span>our latest work.</span>",
      discussProject: "Discuss your project",
      aboutEyebrow: "About Us",
      aboutHeading: "Architecture is about <em>creating experiences</em>.",
      aboutParagraphs: [
        "We are a multidisciplinary studio shaping bold, livable environments through contemporary architecture, interior design, and strategic planning.",
        "Every project balances drama and restraint, combining high-end material palettes with a clear sense of function.",
      ],
      aboutButton: "More About Us",
      yearsOfPractice: "Years of Practice",
      aboutImageAlt: "Refined architectural courtyard",
      servicesEyebrow: "Our Services",
      servicesHeading: "Precision across every phase.",
      services: [
        {
          title: "Architecture",
          description:
            "From concept to completion, we create structures that combine beauty and performance.",
        },
        {
          title: "Interior Design",
          description:
            "We shape interiors with tactile warmth, strong composition, and everyday comfort.",
        },
        {
          title: "Planning",
          description:
            "Thoughtful planning for efficient, sustainable, and future-ready spaces.",
        },
        {
          title: "Project Management",
          description:
            "We manage scope, coordination, and delivery with clarity from first sketch to final handover.",
        },
      ],
      contactEyebrow: "Contact",
      contactHeading: "Let's shape your next space.",
      contactText:
        "Share your project goals and preferred timeline. We will get back to you to arrange an initial consultation.",
    },
    projectsPage: {
      title: "Projects | Monolith Architects",
      description:
        "Selected residential, commercial, and interior projects by Monolith Architects.",
      heroEyebrow: "Selected Projects",
      heroHeading: "Spaces crafted with precision and atmosphere.",
      heroText:
        "A curated collection of residential, commercial, and interior work shaped by clarity, proportion, and material depth.",
      portfolioEyebrow: "Portfolio",
      portfolioHeading:
        "<span>Our latest architecture</span><span>and interior projects.</span>",
      portfolioLink: "Start your project",
    },
    aboutPage: {
      title: "About | Monolith Architects",
      description:
        "Learn more about Monolith Architects, a Tirana-based architecture and interior design studio.",
      heroEyebrow: "About Us",
      heroHeading: "Architecture is about creating experiences.",
      heroText:
        "We are a multidisciplinary practice based in Tirana, shaping calm, bold, and highly livable spaces.",
      sectionEyebrow: "Studio Profile",
      sectionHeading: "Contemporary design with precision and restraint.",
      paragraphs: [
        "Monolith Architects works across private homes, interiors, hospitality, and commercial environments, always balancing atmosphere with function.",
        "Our approach is grounded in material honesty, spatial clarity, and careful coordination through every project phase.",
      ],
      socialLabel: "For more",
      socialLinks: {
        instagram: "Instagram",
        facebook: "Facebook",
      },
      yearsOfPractice: "Years of Practice",
      imageAlt: "Monolith Architects courtyard project",
    },
    servicesPage: {
      title: "Services | Monolith Architects",
      description:
        "Architecture, interior design, planning, and project management by Monolith Architects.",
      heroEyebrow: "Services",
      heroHeading: "Integrated support from concept to completion.",
      heroText:
        "We deliver architecture, interiors, planning, and project oversight with a consistent design standard throughout.",
      services: [
        {
          title: "Architecture",
          description:
            "Concept design, schematic planning, technical development, and design direction for premium private and commercial projects.",
        },
        {
          title: "Interior Design",
          description:
            "Spatial planning, material palettes, bespoke detailing, and furnishing concepts that elevate daily living.",
        },
        {
          title: "Planning",
          description:
            "Site strategy, program organization, circulation logic, and future-ready planning decisions from the outset.",
        },
        {
          title: "Project Management",
          description:
            "Coordination, consultant communication, timeline control, and design supervision through implementation.",
        },
      ],
    },
    contactPage: {
      title: "Contact | Monolith Architects",
      description:
        "Contact Monolith Architects for residential, commercial, and interior design inquiries.",
      heroEyebrow: "Contact",
      heroHeading:
        "<span>Let's discuss</span><span>your next</span><span>space.</span>",
      heroText:
        "Share your vision, timeline, and project type. We will respond to arrange an initial consultation.",
      sectionEyebrow: "Studio Contact",
      sectionHeading:
        "We work across residential, interior, and commercial commissions.",
      sectionText:
        "For new inquiries, collaborations, or consultations, use the form or contact us directly.",
    },
  },
  sq: {
    languageLabel: "Zgjidh gjuhen",
    openMenu: "Hap menune",
    homeAria: "Ballina e Monolith Architects",
    nav: ["Kreu", "Projektet", "Rreth Nesh", "Sherbimet", "Kontakt"],
    adminLink: "Admin",
    footer: {
      tagline: "Krijojme hapesira te vecanta, me qetesi, karakter dhe elegance qe zgjat.",
      menu: "Menu",
      contact: "Kontakt",
      location: "Prizren, Kosovë",
      featuredResidenceAlt: "Rezidence e perzgjedhur nga Monolith Architects",
    },
    form: {
      kicker: "Formular Kerkese",
      heading: "Na tregoni per projektin tuaj",
      labels: ["Emri", "Email", "Lloji i Projektit", "Afati", "Mesazhi"],
      placeholders: {
        name: "Emri juaj i plote",
        email: "emaili@juaj.com",
        project: "Rezidencial, komercial, interier...",
        timeline: "Afati ose data e preferuar",
        message: "Na tregoni per vizionin, buxhetin dhe afatin e projektit",
      },
      detailLabels: {
        email: "Email",
        phone: "Telefoni",
        studio: "Studio",
      },
      studioAddress: "Prizren, Kosovë",
      submit: "Dergo kerkesen",
      defaultNote: "Dergoni kerkesen tuaj dhe ajo do te vije direkt ne inbox-in tone.",
      sending: "Duke derguar...",
      success: "Faleminderit. Kerkesa juaj u dergua me sukses.",
      failure: "Dergimi nuk u realizua. Ju lutem provoni serish ose na shkruani ne monolitharchitects8@gmail.com.",
      subject: "Kerkese e re per Monolith Architects",
    },
    projects: [
      {
        title: "Strehe Moderne",
        category: "Rezidencial",
        alt: "Pamje e jashtme e nje vile bashkekohore",
      },
      {
        title: "Apartament Urban",
        category: "Interier",
        alt: "Dhome ndenjeje minimaliste me tone te ngrohta",
      },
      {
        title: "Shtepi Minimaliste",
        category: "Rezidencial",
        alt: "Hyrje arkitekturore minimaliste",
      },
      {
        title: "Ndertese Zyrash",
        category: "Komercial",
        alt: "Fasade xhami e nje godine zyrash",
      },
      {
        title: "Kuzhine Moderne",
        category: "Interier",
        alt: "Interier kuzhine bashkekohore",
      },
      {
        title: "Vile ne Kodrine",
        category: "Rezidencial",
        alt: "Dhome gjumi e ngrohte me drite natyrale",
      },
    ],
    home: {
      title: "Monolith Architects",
      description:
        "Monolith Architects eshte nje studio arkitekture qe krijon hapesira rezidenciale dhe komerciale me identitet te rafinuar.",
      heroEyebrow: "Studio Arkitekture me Baze ne Prizren",
      heroTitle: "<span>Ne projektojme</span><span>hapesira qe</span><span><em>inspirojne</em>.</span>",
      heroText:
        "Monolith Architects sjell projekte rezidenciale, hospitality dhe komerciale me fokus te atmosfera, proporcioni dhe qartesia materiale.",
      heroLink: "Shih projektet tona",
      selectedProjects: "Projektet e Zgjedhura",
      projectsHeading:
        "<span>Nje perzgjedhje nga</span><span>projektet tona me te fundit.</span>",
      discussProject: "Diskuto projektin tuaj",
      aboutEyebrow: "Rreth Nesh",
      aboutHeading: "Arkitektura ka te beje me <em>krijimin e eksperiencave</em>.",
      aboutParagraphs: [
        "Jemi nje studio multidisiplinare qe formeson ambiente te guximshme dhe te jetueshme permes arkitektures bashkekohore, dizajnit te interierit dhe planifikimit strategjik.",
        "Cdo projekt balancon ekspresivitetin me permbajtjen, duke bashkuar materiale te zgjedhura me nje funksion te qarte.",
      ],
      aboutButton: "Me shume per ne",
      yearsOfPractice: "Vite eksperience",
      aboutImageAlt: "Oborr arkitekturor i rafinuar",
      servicesEyebrow: "Sherbimet Tona",
      servicesHeading: "Precision ne cdo faze.",
      services: [
        {
          title: "Arkitekture",
          description:
            "Nga koncepti deri ne realizim, krijojme struktura qe bashkojne estetiken me performancen.",
        },
        {
          title: "Dizajn Interieri",
          description:
            "Formesojme interiere me ngrohtesi materiale, kompozim te qarte dhe rehati te perditshem.",
        },
        {
          title: "Planifikim",
          description:
            "Planifikim i kujdesshem per hapesira efikase, te qendrueshme dhe te pergatitura per te ardhmen.",
        },
        {
          title: "Menaxhim Projekti",
          description:
            "Menaxhojme koordinimin dhe realizimin me qartesi, nga skica e pare deri te dorezimi final.",
        },
      ],
      contactEyebrow: "Kontakt",
      contactHeading: "Le te formesojme hapesiren tuaj te ardhshme.",
      contactText:
        "Ndani qellimet e projektit dhe afatin e preferuar. Ne do t'ju kontaktojme per te organizuar nje konsultim fillestar.",
    },
    projectsPage: {
      title: "Projektet | Monolith Architects",
      description:
        "Projekte te perzgjedhura rezidenciale, komerciale dhe interieri nga Monolith Architects.",
      heroEyebrow: "Projektet e Zgjedhura",
      heroHeading: "Hapesira te krijuara me precision dhe atmosfere.",
      heroText:
        "Nje perzgjedhje e kuruar e projekteve rezidenciale, komerciale dhe te interierit, te formesuara nga qartesia, proporcioni dhe thellesia materiale.",
      portfolioEyebrow: "Portofol",
      portfolioHeading:
        "<span>Projektet tona me te fundit</span><span>ne arkitekture dhe interier.</span>",
      portfolioLink: "Nisni projektin tuaj",
    },
    aboutPage: {
      title: "Rreth Nesh | Monolith Architects",
      description:
        "Mesoni me shume per Monolith Architects, studio arkitekture dhe dizajni interieri me baze ne Tirane.",
      heroEyebrow: "Rreth Nesh",
      heroHeading: "Arkitektura ka te beje me krijimin e eksperiencave.",
      heroText:
        "Jemi nje studio multidisiplinare me baze ne Tirane, qe formeson hapesira te qeta, te guximshme dhe teper te jetueshme.",
      sectionEyebrow: "Profili i Studios",
      sectionHeading: "Dizajn bashkekohor me precision dhe permbajtje.",
      paragraphs: [
        "Monolith Architects punon ne shtepi private, interiere, projekte hospitality dhe mjedise komerciale, duke balancuar gjithmone atmosferen me funksionin.",
        "Qasja jone mbeshtetet ne ndershmerine e materialeve, qartesine hapesinore dhe koordinimin e kujdesshem ne cdo faze te projektit.",
      ],
      socialLabel: "Na gjeni edhe ne",
      socialLinks: {
        instagram: "Instagram",
        facebook: "Facebook",
      },
      yearsOfPractice: "Vite eksperience",
      imageAlt: "Projekt oborri nga Monolith Architects",
    },
    servicesPage: {
      title: "Sherbimet | Monolith Architects",
      description:
        "Arkitekture, dizajn interieri, planifikim dhe menaxhim projektesh nga Monolith Architects.",
      heroEyebrow: "Sherbimet",
      heroHeading: "Mbeshtetje e integruar nga koncepti deri ne perfundim.",
      heroText:
        "Ofrojme arkitekture, interiere, planifikim dhe mbikeqyrje projekti me nje standard te qendrueshem dizajni ne cdo hap.",
      services: [
        {
          title: "Arkitekture",
          description:
            "Projektim konceptual, skema planifikimi, zhvillim teknik dhe drejtim dizajni per projekte private dhe komerciale te nivelit te larte.",
        },
        {
          title: "Dizajn Interieri",
          description:
            "Planifikim hapesinor, paleta materialesh, detaje te personalizuara dhe koncepte mobilimi qe e lartesojne perditshmerine.",
        },
        {
          title: "Planifikim",
          description:
            "Strategji site-i, organizim programi, logjike qarkullimi dhe vendime planifikimi te orientuara nga e ardhmja qe ne fillim.",
        },
        {
          title: "Menaxhim Projekti",
          description:
            "Koordinim, komunikim me konsulentet, kontroll afatesh dhe mbikeqyrje dizajni gjate zbatimit.",
        },
      ],
    },
    contactPage: {
      title: "Kontakt | Monolith Architects",
      description:
        "Kontaktoni Monolith Architects per kerkesa rezidenciale, komerciale dhe te dizajnit te interierit.",
      heroEyebrow: "Kontakt",
      heroHeading: "<span>Le te flasim per</span><span>hapesiren tuaj</span><span>te radhes.</span>",
      heroText:
        "Ndani vizionin, afatin dhe llojin e projektit. Ne do t'ju pergjigjemi per te organizuar nje konsultim fillestar.",
      sectionEyebrow: "Kontakti i Studios",
      sectionHeading: "Punojme ne projekte rezidenciale, interieri dhe komerciale.",
      sectionText:
        "Per kerkesa te reja, bashkepunime ose konsulence, perdorni formularin ose na kontaktoni direkt.",
    },
  },
  fr: {
    languageLabel: "Choisir la langue",
    openMenu: "Ouvrir le menu",
    homeAria: "Accueil Monolith Architects",
    nav: ["Accueil", "Projets", "À propos", "Services", "Contact"],
    adminLink: "Admin",
    footer: {
      tagline:
        "Nous créons des espaces d'exception, calmes, audacieux et durables.",
      menu: "Menu",
      contact: "Contact",
      location: "Prizren, Kosovo",
      featuredResidenceAlt: "Résidence emblématique de Monolith Architects",
    },
    form: {
      kicker: "Formulaire de demande",
      heading: "Parlez-nous de votre projet",
      labels: ["Nom", "E-mail", "Type de projet", "Calendrier", "Message"],
      placeholders: {
        name: "Votre nom complet",
        email: "votre@email.com",
        project: "Résidentiel, commercial, intérieur...",
        timeline: "Date de début ou calendrier souhaité",
        message: "Parlez-nous de votre vision, budget et calendrier",
      },
      detailLabels: {
        email: "E-mail",
        phone: "Téléphone",
        studio: "Studio",
      },
      studioAddress: "Prizren, Kosovo",
      submit: "Envoyer la demande",
      defaultNote: "Envoyez votre demande et elle arrivera directement dans notre boîte mail.",
      sending: "Envoi en cours...",
      success: "Merci. Votre demande a bien été envoyée.",
      failure:
        "Échec de l'envoi. Veuillez réessayer ou écrire à monolitharchitects8@gmail.com.",
      subject: "Nouvelle demande Monolith Architects",
    },
    projects: [
      {
        title: "Retraite Moderne",
        category: "Résidentiel",
        alt: "Extérieur d'une villa résidentielle de luxe",
      },
      {
        title: "Appartement Urbain",
        category: "Intérieur",
        alt: "Salon minimaliste aux tons chaleureux",
      },
      {
        title: "Maison Minimaliste",
        category: "Résidentiel",
        alt: "Entrée architecturale minimaliste",
      },
      {
        title: "Immeuble de Bureaux",
        category: "Commercial",
        alt: "Façade vitrée d'un immeuble de bureaux",
      },
      {
        title: "Cuisine Moderne",
        category: "Intérieur",
        alt: "Cuisine contemporaine",
      },
      {
        title: "Villa sur la Colline",
        category: "Résidentiel",
        alt: "Chambre chaleureuse baignée de lumière naturelle",
      },
    ],
    home: {
      title: "Monolith Architects",
      description:
        "Monolith Architects est un studio d'architecture haut de gamme qui conçoit des espaces résidentiels et commerciaux raffinés.",
      heroEyebrow: "Studio d'architecture basé à Prizren",
      heroTitle: "<span>Nous concevons</span><span>des espaces qui</span><span><em>inspirent</em>.</span>",
      heroText:
        "Monolith Architects réalise des intérieurs résidentiels, hôteliers et commerciaux raffinés, avec une attention portée à l'atmosphère, aux proportions et à la matière.",
      heroLink: "Voir nos projets",
      selectedProjects: "Projets sélectionnés",
      projectsHeading:
        "<span>Une collection de</span><span>nos dernières réalisations.</span>",
      discussProject: "Discuter de votre projet",
      aboutEyebrow: "À propos",
      aboutHeading: "L'architecture consiste à <em>créer des expériences</em>.",
      aboutParagraphs: [
        "Nous sommes un studio pluridisciplinaire qui façonne des environnements audacieux et habitables grâce à l'architecture contemporaine, au design intérieur et à la planification stratégique.",
        "Chaque projet équilibre intensité et retenue, en combinant des matériaux haut de gamme avec un sens clair de la fonction.",
      ],
      aboutButton: "En savoir plus",
      yearsOfPractice: "Années d'expérience",
      aboutImageAlt: "Cour architecturale raffinée",
      servicesEyebrow: "Nos services",
      servicesHeading: "Une précision à chaque étape.",
      services: [
        {
          title: "Architecture",
          description:
            "Du concept à la livraison, nous créons des structures qui allient beauté et performance.",
        },
        {
          title: "Design intérieur",
          description:
            "Nous façonnons des intérieurs chaleureux, équilibrés et confortables au quotidien.",
        },
        {
          title: "Planification",
          description:
            "Une planification réfléchie pour des espaces efficaces, durables et prêts pour l'avenir.",
        },
        {
          title: "Gestion de projet",
          description:
            "Nous gérons le périmètre, la coordination et la livraison avec clarté, du premier croquis à la remise finale.",
        },
      ],
      contactEyebrow: "Contact",
      contactHeading: "Donnons forme à votre prochain espace.",
      contactText:
        "Partagez vos objectifs et votre calendrier souhaité. Nous vous recontacterons pour organiser une première consultation.",
    },
    projectsPage: {
      title: "Projets | Monolith Architects",
      description:
        "Projets résidentiels, commerciaux et intérieurs sélectionnés par Monolith Architects.",
      heroEyebrow: "Projets sélectionnés",
      heroHeading: "Des espaces conçus avec précision et atmosphère.",
      heroText:
        "Une sélection de projets résidentiels, commerciaux et intérieurs façonnés par la clarté, la proportion et la profondeur des matériaux.",
      portfolioEyebrow: "Portfolio",
      portfolioHeading:
        "<span>Nos derniers projets</span><span>d'architecture et d'intérieur.</span>",
      portfolioLink: "Lancer votre projet",
    },
    aboutPage: {
      title: "À propos | Monolith Architects",
      description:
        "Découvrez Monolith Architects, studio d'architecture et de design intérieur basé à Tirana.",
      heroEyebrow: "À propos",
      heroHeading: "L'architecture consiste à créer des expériences.",
      heroText:
        "Nous sommes une agence pluridisciplinaire basée à Tirana, créant des espaces calmes, audacieux et très agréables à vivre.",
      sectionEyebrow: "Profil du studio",
      sectionHeading: "Un design contemporain avec précision et retenue.",
      paragraphs: [
        "Monolith Architects intervient sur des maisons privées, des intérieurs, des projets hôteliers et des environnements commerciaux, en équilibrant toujours atmosphère et fonction.",
        "Notre approche repose sur l'honnêteté des matériaux, la clarté spatiale et une coordination attentive à chaque phase du projet.",
      ],
      socialLabel: "Pour en voir plus",
      socialLinks: {
        instagram: "Instagram",
        facebook: "Facebook",
      },
      yearsOfPractice: "Années d'expérience",
      imageAlt: "Projet de cour Monolith Architects",
    },
    servicesPage: {
      title: "Services | Monolith Architects",
      description:
        "Architecture, design intérieur, planification et gestion de projet par Monolith Architects.",
      heroEyebrow: "Services",
      heroHeading: "Un accompagnement intégré du concept à la réalisation.",
      heroText:
        "Nous livrons architecture, intérieurs, planification et suivi de projet avec une exigence de design cohérente du début à la fin.",
      services: [
        {
          title: "Architecture",
          description:
            "Conception, schémas, développement technique et direction design pour des projets privés et commerciaux haut de gamme.",
        },
        {
          title: "Design intérieur",
          description:
            "Planification spatiale, palettes de matériaux, détails sur mesure et concepts d'ameublement qui élèvent le quotidien.",
        },
        {
          title: "Planification",
          description:
            "Stratégie de site, organisation du programme, logique de circulation et décisions tournées vers l'avenir dès le départ.",
        },
        {
          title: "Gestion de projet",
          description:
            "Coordination, communication avec les consultants, contrôle du calendrier et supervision du design pendant l'exécution.",
        },
      ],
    },
    contactPage: {
      title: "Contact | Monolith Architects",
      description:
        "Contactez Monolith Architects pour vos projets résidentiels, commerciaux et de design intérieur.",
      heroEyebrow: "Contact",
      heroHeading:
        "<span>Parlons de</span><span>votre prochain</span><span>espace.</span>",
      heroText:
        "Partagez votre vision, votre calendrier et le type de projet. Nous vous répondrons pour organiser une première consultation.",
      sectionEyebrow: "Contact studio",
      sectionHeading:
        "Nous travaillons sur des projets résidentiels, intérieurs et commerciaux.",
      sectionText:
        "Pour toute nouvelle demande, collaboration ou consultation, utilisez le formulaire ou contactez-nous directement.",
    },
  },
  de: {
    languageLabel: "Sprache wählen",
    openMenu: "Menü öffnen",
    homeAria: "Monolith Architects Startseite",
    nav: ["Start", "Projekte", "Über uns", "Leistungen", "Kontakt"],
    adminLink: "Admin",
    footer: {
      tagline:
        "Wir schaffen außergewöhnliche Räume, die ruhig, markant und dauerhaft wirken.",
      menu: "Menü",
      contact: "Kontakt",
      location: "Prizren, Kosovo",
      featuredResidenceAlt: "Ausgewähltes Wohnprojekt von Monolith Architects",
    },
    form: {
      kicker: "Anfrageformular",
      heading: "Erzählen Sie uns von Ihrem Projekt",
      labels: ["Name", "E-Mail", "Projekttyp", "Zeitplan", "Nachricht"],
      placeholders: {
        name: "Ihr vollständiger Name",
        email: "ihre@email.com",
        project: "Wohnen, Gewerbe, Interior...",
        timeline: "Gewünschter Starttermin oder Zeitplan",
        message: "Erzählen Sie uns von Ihrer Vision, Ihrem Budget und Zeitplan",
      },
      detailLabels: {
        email: "E-Mail",
        phone: "Telefon",
        studio: "Studio",
      },
      studioAddress: "Prizren, Kosovo",
      submit: "Anfrage senden",
      defaultNote: "Senden Sie Ihre Anfrage, und sie wird direkt an unser Postfach übermittelt.",
      sending: "Wird gesendet...",
      success: "Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.",
      failure:
        "Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie an monolitharchitects8@gmail.com.",
      subject: "Neue Anfrage an Monolith Architects",
    },
    projects: [
      {
        title: "Moderner Rückzugsort",
        category: "Wohnen",
        alt: "Außenansicht einer luxuriösen Wohnvilla",
      },
      {
        title: "Stadtwohnung",
        category: "Interior",
        alt: "Minimalistisches Wohnzimmer in warmen Tönen",
      },
      {
        title: "Minimalistisches Haus",
        category: "Wohnen",
        alt: "Minimalistischer architektonischer Eingang",
      },
      {
        title: "Bürogebäude",
        category: "Gewerbe",
        alt: "Glasfassade eines Bürogebäudes",
      },
      {
        title: "Moderne Küche",
        category: "Interior",
        alt: "Zeitgenössische Küchenarchitektur",
      },
      {
        title: "Hangvilla",
        category: "Wohnen",
        alt: "Warmes Schlafzimmer mit weichem Tageslicht",
      },
    ],
    home: {
      title: "Monolith Architects",
      description:
        "Monolith Architects ist ein Premium-Architekturstudio für raffinierte Wohn- und Gewerberäume.",
      heroEyebrow: "Architekturstudio aus Prizren",
      heroTitle: "<span>Wir entwerfen</span><span>Räume, die</span><span><em>inspirieren</em>.</span>",
      heroText:
        "Monolith Architects realisiert hochwertige Wohn-, Hospitality- und Gewerbeinterieurs mit Fokus auf Atmosphäre, Proportion und Materialklarheit.",
      heroLink: "Unsere Projekte ansehen",
      selectedProjects: "Ausgewählte Projekte",
      projectsHeading:
        "<span>Eine Auswahl unserer</span><span>neuesten Arbeiten.</span>",
      discussProject: "Projekt besprechen",
      aboutEyebrow: "Über uns",
      aboutHeading: "Architektur bedeutet, <em>Erlebnisse zu schaffen</em>.",
      aboutParagraphs: [
        "Wir sind ein interdisziplinäres Studio, das mutige und lebenswerte Umgebungen durch zeitgenössische Architektur, Interior Design und strategische Planung gestaltet.",
        "Jedes Projekt balanciert Dramatik und Zurückhaltung und verbindet hochwertige Materialien mit einer klaren Funktion.",
      ],
      aboutButton: "Mehr über uns",
      yearsOfPractice: "Jahre Erfahrung",
      aboutImageAlt: "Raffinierter architektonischer Innenhof",
      servicesEyebrow: "Unsere Leistungen",
      servicesHeading: "Präzision in jeder Phase.",
      services: [
        {
          title: "Architektur",
          description:
            "Von der Idee bis zur Fertigstellung schaffen wir Strukturen, die Schönheit und Leistung vereinen.",
        },
        {
          title: "Interior Design",
          description:
            "Wir gestalten Innenräume mit taktiler Wärme, starker Komposition und Alltagskomfort.",
        },
        {
          title: "Planung",
          description:
            "Durchdachte Planung für effiziente, nachhaltige und zukunftsfähige Räume.",
        },
        {
          title: "Projektmanagement",
          description:
            "Wir steuern Umfang, Koordination und Umsetzung mit Klarheit vom ersten Entwurf bis zur Übergabe.",
        },
      ],
      contactEyebrow: "Kontakt",
      contactHeading: "Lassen Sie uns Ihren nächsten Raum gestalten.",
      contactText:
        "Teilen Sie Ihre Projektziele und den gewünschten Zeitrahmen. Wir melden uns, um ein Erstgespräch zu vereinbaren.",
    },
    projectsPage: {
      title: "Projekte | Monolith Architects",
      description:
        "Ausgewählte Wohn-, Gewerbe- und Interior-Projekte von Monolith Architects.",
      heroEyebrow: "Ausgewählte Projekte",
      heroHeading: "Räume mit Präzision und Atmosphäre gestaltet.",
      heroText:
        "Eine kuratierte Auswahl an Wohn-, Gewerbe- und Interior-Projekten, geprägt von Klarheit, Proportion und Materialtiefe.",
      portfolioEyebrow: "Portfolio",
      portfolioHeading:
        "<span>Unsere neuesten Architektur-</span><span>und Interior-Projekte.</span>",
      portfolioLink: "Projekt starten",
    },
    aboutPage: {
      title: "Über uns | Monolith Architects",
      description:
        "Erfahren Sie mehr über Monolith Architects, ein Architektur- und Interior-Design-Studio aus Tirana.",
      heroEyebrow: "Über uns",
      heroHeading: "Architektur bedeutet, Erlebnisse zu schaffen.",
      heroText:
        "Wir sind ein interdisziplinäres Büro in Tirana und gestalten ruhige, markante und sehr lebenswerte Räume.",
      sectionEyebrow: "Studio-Profil",
      sectionHeading: "Zeitgenössisches Design mit Präzision und Zurückhaltung.",
      paragraphs: [
        "Monolith Architects arbeitet an privaten Häusern, Innenräumen, Hospitality-Projekten und gewerblichen Umgebungen und balanciert dabei stets Atmosphäre und Funktion.",
        "Unser Ansatz basiert auf Materialehrlichkeit, räumlicher Klarheit und sorgfältiger Koordination in jeder Projektphase.",
      ],
      socialLabel: "Mehr entdecken",
      socialLinks: {
        instagram: "Instagram",
        facebook: "Facebook",
      },
      yearsOfPractice: "Jahre Erfahrung",
      imageAlt: "Innenhofprojekt von Monolith Architects",
    },
    servicesPage: {
      title: "Leistungen | Monolith Architects",
      description:
        "Architektur, Interior Design, Planung und Projektmanagement von Monolith Architects.",
      heroEyebrow: "Leistungen",
      heroHeading: "Integrierte Begleitung vom Konzept bis zur Fertigstellung.",
      heroText:
        "Wir liefern Architektur, Innenräume, Planung und Projektbegleitung mit einem durchgängig hohen Designstandard.",
      services: [
        {
          title: "Architektur",
          description:
            "Konzeptentwurf, Vorplanung, technische Entwicklung und gestalterische Leitung für hochwertige private und gewerbliche Projekte.",
        },
        {
          title: "Interior Design",
          description:
            "Raumplanung, Materialpaletten, maßgeschneiderte Details und Einrichtungskonzepte für gehobenes Wohnen.",
        },
        {
          title: "Planung",
          description:
            "Standortstrategie, Programmorganisation, Zirkulationslogik und zukunftssichere Entscheidungen von Anfang an.",
        },
        {
          title: "Projektmanagement",
          description:
            "Koordination, Kommunikation mit Fachplanern, Zeitkontrolle und Designüberwachung während der Umsetzung.",
        },
      ],
    },
    contactPage: {
      title: "Kontakt | Monolith Architects",
      description:
        "Kontaktieren Sie Monolith Architects für Wohn-, Gewerbe- und Interior-Design-Anfragen.",
      heroEyebrow: "Kontakt",
      heroHeading:
        "<span>Lassen Sie uns</span><span>Ihren nächsten</span><span>Raum besprechen.</span>",
      heroText:
        "Teilen Sie Ihre Vision, Ihren Zeitplan und den Projekttyp. Wir antworten Ihnen, um ein Erstgespräch zu vereinbaren.",
      sectionEyebrow: "Studio-Kontakt",
      sectionHeading:
        "Wir arbeiten an Wohn-, Interior- und Gewerbeprojekten.",
      sectionText:
        "Für neue Anfragen, Kooperationen oder Beratungen nutzen Sie bitte das Formular oder kontaktieren Sie uns direkt.",
    },
  },
  ru: {
    languageLabel: "Выбрать язык",
    openMenu: "Открыть меню",
    homeAria: "Главная Monolith Architects",
    nav: ["Главная", "Проекты", "О нас", "Услуги", "Контакты"],
    adminLink: "Админ",
    footer: {
      tagline:
        "Мы создаём исключительные пространства, спокойные, выразительные и долговечные.",
      menu: "Меню",
      contact: "Контакты",
      location: "Prizren, Kosovo",
      featuredResidenceAlt: "Избранный жилой проект Monolith Architects",
    },
    form: {
      kicker: "Форма запроса",
      heading: "Расскажите о вашем проекте",
      labels: ["Имя", "Эл. почта", "Тип проекта", "Сроки", "Сообщение"],
      placeholders: {
        name: "Ваше полное имя",
        email: "your@email.com",
        project: "Жилой, коммерческий, интерьер...",
        timeline: "Желаемая дата начала или сроки",
        message: "Расскажите о вашей идее, бюджете и сроках",
      },
      detailLabels: {
        email: "Эл. почта",
        phone: "Телефон",
        studio: "Студия",
      },
      studioAddress: "Prizren, Kosovo",
      submit: "Отправить запрос",
      defaultNote: "Отправьте запрос, и он будет доставлен прямо в наш почтовый ящик.",
      sending: "Отправка...",
      success: "Спасибо. Ваш запрос успешно отправлен.",
      failure:
        "Не удалось отправить. Попробуйте ещё раз или напишите на monolitharchitects8@gmail.com.",
      subject: "Новый запрос Monolith Architects",
    },
    projects: [
      {
        title: "Современное убежище",
        category: "Жилой",
        alt: "Экстерьер роскошной жилой виллы",
      },
      {
        title: "Городская квартира",
        category: "Интерьер",
        alt: "Минималистичная гостиная в тёплых тонах",
      },
      {
        title: "Минималистичный дом",
        category: "Жилой",
        alt: "Минималистичный архитектурный вход",
      },
      {
        title: "Офисное здание",
        category: "Коммерческий",
        alt: "Стеклянный фасад офисного здания",
      },
      {
        title: "Современная кухня",
        category: "Интерьер",
        alt: "Современный интерьер кухни",
      },
      {
        title: "Вилла на склоне",
        category: "Жилой",
        alt: "Тёплая спальня с мягким естественным светом",
      },
    ],
    home: {
      title: "Monolith Architects",
      description:
        "Monolith Architects — архитектурная студия премиум-класса, создающая изысканные жилые и коммерческие пространства.",
      heroEyebrow: "Архитектурная студия в Призрене",
      heroTitle: "<span>Мы создаём</span><span>пространства, которые</span><span><em>вдохновляют</em>.</span>",
      heroText:
        "Monolith Architects создаёт выразительные жилые, гостиничные и коммерческие интерьеры с акцентом на атмосферу, пропорции и материальность.",
      heroLink: "Смотреть проекты",
      selectedProjects: "Избранные проекты",
      projectsHeading:
        "<span>Коллекция наших</span><span>последних работ.</span>",
      discussProject: "Обсудить проект",
      aboutEyebrow: "О нас",
      aboutHeading: "Архитектура — это <em>создание впечатлений</em>.",
      aboutParagraphs: [
        "Мы многопрофильная студия, формирующая смелые и удобные для жизни пространства с помощью современной архитектуры, дизайна интерьера и стратегического планирования.",
        "Каждый проект сочетает драматичность и сдержанность, объединяя премиальные материалы с ясной функциональностью.",
      ],
      aboutButton: "Подробнее о нас",
      yearsOfPractice: "Лет практики",
      aboutImageAlt: "Изысканный архитектурный внутренний двор",
      servicesEyebrow: "Наши услуги",
      servicesHeading: "Точность на каждом этапе.",
      services: [
        {
          title: "Архитектура",
          description:
            "От идеи до реализации мы создаём здания, сочетающие красоту и эффективность.",
        },
        {
          title: "Дизайн интерьера",
          description:
            "Мы формируем интерьеры с тактильным теплом, сильной композицией и повседневным комфортом.",
        },
        {
          title: "Планирование",
          description:
            "Продуманное планирование для эффективных, устойчивых и готовых к будущему пространств.",
        },
        {
          title: "Управление проектом",
          description:
            "Мы ведём объём, координацию и реализацию с ясностью от первого эскиза до финальной сдачи.",
        },
      ],
      contactEyebrow: "Контакт",
      contactHeading: "Давайте сформируем ваше следующее пространство.",
      contactText:
        "Поделитесь целями проекта и желаемыми сроками. Мы свяжемся с вами, чтобы назначить первичную консультацию.",
    },
    projectsPage: {
      title: "Проекты | Monolith Architects",
      description:
        "Избранные жилые, коммерческие и интерьерные проекты Monolith Architects.",
      heroEyebrow: "Избранные проекты",
      heroHeading: "Пространства, созданные с точностью и атмосферой.",
      heroText:
        "Тщательно отобранная коллекция жилых, коммерческих и интерьерных проектов, основанных на ясности, пропорции и глубине материалов.",
      portfolioEyebrow: "Портфолио",
      portfolioHeading:
        "<span>Наши последние проекты</span><span>в архитектуре и интерьере.</span>",
      portfolioLink: "Начать проект",
    },
    aboutPage: {
      title: "О нас | Monolith Architects",
      description:
        "Узнайте больше о Monolith Architects, студии архитектуры и дизайна интерьера из Тираны.",
      heroEyebrow: "О нас",
      heroHeading: "Архитектура — это создание впечатлений.",
      heroText:
        "Мы многопрофильная практика в Тиране, создающая спокойные, смелые и очень комфортные для жизни пространства.",
      sectionEyebrow: "Профиль студии",
      sectionHeading: "Современный дизайн с точностью и сдержанностью.",
      paragraphs: [
        "Monolith Architects работает с частными домами, интерьерами, гостиничными и коммерческими пространствами, всегда уравновешивая атмосферу и функцию.",
        "Наш подход основан на честности материалов, пространственной ясности и тщательной координации на каждом этапе проекта.",
      ],
      socialLabel: "Больше в соцсетях",
      socialLinks: {
        instagram: "Instagram",
        facebook: "Facebook",
      },
      yearsOfPractice: "Лет практики",
      imageAlt: "Проект внутреннего двора Monolith Architects",
    },
    servicesPage: {
      title: "Услуги | Monolith Architects",
      description:
        "Архитектура, дизайн интерьера, планирование и управление проектами от Monolith Architects.",
      heroEyebrow: "Услуги",
      heroHeading: "Комплексная поддержка от концепции до завершения.",
      heroText:
        "Мы предоставляем архитектуру, интерьеры, планирование и сопровождение проекта с единым стандартом дизайна на всём пути.",
      services: [
        {
          title: "Архитектура",
          description:
            "Концепция, эскизное проектирование, техническая разработка и дизайн-руководство для премиальных частных и коммерческих объектов.",
        },
        {
          title: "Дизайн интерьера",
          description:
            "Пространственное планирование, палитры материалов, индивидуальные детали и мебельные концепции, улучшающие повседневную жизнь.",
        },
        {
          title: "Планирование",
          description:
            "Стратегия участка, организация программы, логика циркуляции и решения, ориентированные на будущее, с самого начала.",
        },
        {
          title: "Управление проектом",
          description:
            "Координация, коммуникация с консультантами, контроль сроков и надзор за дизайном в ходе реализации.",
        },
      ],
    },
    contactPage: {
      title: "Контакты | Monolith Architects",
      description:
        "Свяжитесь с Monolith Architects по вопросам жилых, коммерческих и интерьерных проектов.",
      heroEyebrow: "Контакты",
      heroHeading:
        "<span>Давайте обсудим</span><span>ваше следующее</span><span>пространство.</span>",
      heroText:
        "Поделитесь своим видением, сроками и типом проекта. Мы ответим вам, чтобы организовать первую консультацию.",
      sectionEyebrow: "Контакты студии",
      sectionHeading:
        "Мы работаем с жилыми, интерьерными и коммерческими проектами.",
      sectionText:
        "Для новых запросов, сотрудничества или консультаций используйте форму или свяжитесь с нами напрямую.",
    },
  },
  ar: {
    languageLabel: "اختر اللغة",
    openMenu: "افتح القائمة",
    homeAria: "الصفحة الرئيسية لمونوليث أركيتكتس",
    nav: ["الرئيسية", "المشاريع", "من نحن", "الخدمات", "اتصل بنا"],
    adminLink: "الإدارة",
    footer: {
      tagline: "نصمم مساحات استثنائية تبدو هادئة وجريئة وخالدة.",
      menu: "القائمة",
      contact: "اتصال",
      location: "Prizren, Kosovo",
      featuredResidenceAlt: "مشروع سكني مميز من مونوليث أركيتكتس",
    },
    form: {
      kicker: "نموذج الاستفسار",
      heading: "أخبرنا عن مشروعك",
      labels: ["الاسم", "البريد الإلكتروني", "نوع المشروع", "الجدول الزمني", "الرسالة"],
      placeholders: {
        name: "اسمك الكامل",
        email: "your@email.com",
        project: "سكني، تجاري، داخلي...",
        timeline: "تاريخ البدء أو الجدول الزمني المطلوب",
        message: "أخبرنا عن رؤيتك وميزانيتك والجدول الزمني",
      },
      detailLabels: {
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        studio: "الاستوديو",
      },
      studioAddress: "Prizren, Kosovo",
      submit: "إرسال الطلب",
      defaultNote: "أرسل طلبك وسيصل مباشرة إلى بريدنا الإلكتروني.",
      sending: "جارٍ الإرسال...",
      success: "شكرًا لك. تم إرسال طلبك بنجاح.",
      failure:
        "فشل الإرسال. يرجى المحاولة مرة أخرى أو مراسلتنا على monolitharchitects8@gmail.com.",
      subject: "استفسار جديد إلى Monolith Architects",
    },
    projects: [
      {
        title: "ملاذ عصري",
        category: "سكني",
        alt: "واجهة خارجية لفيلا سكنية فاخرة",
      },
      {
        title: "شقة المدينة",
        category: "داخلي",
        alt: "غرفة معيشة بسيطة بألوان دافئة",
      },
      {
        title: "منزل بسيط",
        category: "سكني",
        alt: "مدخل معماري بسيط",
      },
      {
        title: "مبنى مكاتب",
        category: "تجاري",
        alt: "واجهة زجاجية لمبنى مكاتب",
      },
      {
        title: "مطبخ عصري",
        category: "داخلي",
        alt: "مطبخ معاصر",
      },
      {
        title: "فيلا التل",
        category: "سكني",
        alt: "غرفة نوم دافئة بإضاءة طبيعية ناعمة",
      },
    ],
    home: {
      title: "Monolith Architects",
      description:
        "Monolith Architects استوديو معماري فاخر يصمم مساحات سكنية وتجارية راقية.",
      heroEyebrow: "استوديو عمارة مقره بريزرن",
      heroTitle: "<span>نصمم</span><span>مساحات</span><span><em>ملهمة</em>.</span>",
      heroText:
        "تقدم Monolith Architects تصاميم داخلية سكنية وفندقية وتجارية راقية مع تركيز على الأجواء والنسب ووضوح المواد.",
      heroLink: "شاهد مشاريعنا",
      selectedProjects: "مشاريع مختارة",
      projectsHeading:
        "<span>مجموعة من</span><span>أحدث أعمالنا.</span>",
      discussProject: "ناقش مشروعك",
      aboutEyebrow: "من نحن",
      aboutHeading: "العمارة هي <em>صناعة التجارب</em>.",
      aboutParagraphs: [
        "نحن استوديو متعدد التخصصات نصوغ بيئات جريئة وقابلة للحياة من خلال العمارة المعاصرة والتصميم الداخلي والتخطيط الاستراتيجي.",
        "كل مشروع يوازن بين الدراما والرصانة، جامعًا بين خامات عالية المستوى ووظيفة واضحة.",
      ],
      aboutButton: "المزيد عنا",
      yearsOfPractice: "سنوات الخبرة",
      aboutImageAlt: "فناء معماري راقٍ",
      servicesEyebrow: "خدماتنا",
      servicesHeading: "دقة في كل مرحلة.",
      services: [
        {
          title: "العمارة",
          description:
            "من الفكرة إلى التنفيذ، نصمم مباني تجمع بين الجمال والأداء.",
        },
        {
          title: "التصميم الداخلي",
          description:
            "نصوغ مساحات داخلية بدفء حسي وتكوين قوي وراحة يومية.",
        },
        {
          title: "التخطيط",
          description:
            "تخطيط مدروس لمساحات فعالة ومستدامة وجاهزة للمستقبل.",
        },
        {
          title: "إدارة المشروع",
          description:
            "ندير النطاق والتنسيق والتنفيذ بوضوح من أول مخطط حتى التسليم النهائي.",
        },
      ],
      contactEyebrow: "اتصل بنا",
      contactHeading: "لنشكل مساحتك القادمة.",
      contactText:
        "شاركنا أهداف مشروعك والجدول الزمني المفضل لديك. سنتواصل معك لترتيب استشارة أولية.",
    },
    projectsPage: {
      title: "المشاريع | Monolith Architects",
      description:
        "مجموعة مختارة من المشاريع السكنية والتجارية والداخلية من Monolith Architects.",
      heroEyebrow: "مشاريع مختارة",
      heroHeading: "مساحات صيغت بدقة وأجواء مدروسة.",
      heroText:
        "مجموعة منتقاة من الأعمال السكنية والتجارية والداخلية التي تشكلت من خلال الوضوح والنسب وعمق المواد.",
      portfolioEyebrow: "معرض الأعمال",
      portfolioHeading:
        "<span>أحدث مشاريعنا في</span><span>العمارة والتصميم الداخلي.</span>",
      portfolioLink: "ابدأ مشروعك",
    },
    aboutPage: {
      title: "من نحن | Monolith Architects",
      description:
        "تعرّف على Monolith Architects، استوديو عمارة وتصميم داخلي مقره تيرانا.",
      heroEyebrow: "من نحن",
      heroHeading: "العمارة هي صناعة التجارب.",
      heroText:
        "نحن ممارسة متعددة التخصصات مقرها تيرانا، نصوغ مساحات هادئة وجريئة وقابلة للعيش بشكل عالٍ.",
      sectionEyebrow: "ملف الاستوديو",
      sectionHeading: "تصميم معاصر بدقة وانضباط.",
      paragraphs: [
        "تعمل Monolith Architects في المنازل الخاصة والديكورات الداخلية والضيافة والبيئات التجارية، مع موازنة دائمة بين الأجواء والوظيفة.",
        "يعتمد نهجنا على صدق المواد ووضوح الفضاء والتنسيق الدقيق في كل مرحلة من مراحل المشروع.",
      ],
      socialLabel: "للمزيد",
      socialLinks: {
        instagram: "Instagram",
        facebook: "Facebook",
      },
      yearsOfPractice: "سنوات الخبرة",
      imageAlt: "مشروع فناء من Monolith Architects",
    },
    servicesPage: {
      title: "الخدمات | Monolith Architects",
      description:
        "العمارة والتصميم الداخلي والتخطيط وإدارة المشاريع من Monolith Architects.",
      heroEyebrow: "الخدمات",
      heroHeading: "دعم متكامل من الفكرة حتى الإنجاز.",
      heroText:
        "نقدم العمارة والتصميمات الداخلية والتخطيط والإشراف على المشروع بمعيار تصميم متسق في جميع المراحل.",
      services: [
        {
          title: "العمارة",
          description:
            "التصميم المفاهيمي والتخطيط المبدئي والتطوير التقني والتوجيه التصميمي للمشاريع الخاصة والتجارية الراقية.",
        },
        {
          title: "التصميم الداخلي",
          description:
            "تخطيط المساحات ولوحات المواد والتفاصيل المصممة خصيصًا ومفاهيم التأثيث التي ترتقي بالحياة اليومية.",
        },
        {
          title: "التخطيط",
          description:
            "استراتيجية الموقع وتنظيم البرنامج ومنطق الحركة وقرارات جاهزة للمستقبل منذ البداية.",
        },
        {
          title: "إدارة المشروع",
          description:
            "التنسيق والتواصل مع الاستشاريين والتحكم بالجدول الزمني والإشراف التصميمي أثناء التنفيذ.",
        },
      ],
    },
    contactPage: {
      title: "اتصل بنا | Monolith Architects",
      description:
        "تواصل مع Monolith Architects بشأن المشاريع السكنية والتجارية والتصميم الداخلي.",
      heroEyebrow: "اتصل بنا",
      heroHeading:
        "<span>دعنا نناقش</span><span>مساحتك</span><span>القادمة.</span>",
      heroText:
        "شاركنا رؤيتك وجدولك الزمني ونوع المشروع. سنرد عليك لترتيب استشارة أولية.",
      sectionEyebrow: "تواصل مع الاستوديو",
      sectionHeading: "نعمل على مشاريع سكنية وداخلية وتجارية.",
      sectionText:
        "للاستفسارات الجديدة أو التعاون أو الاستشارات، استخدم النموذج أو تواصل معنا مباشرة.",
    },
  },
  zh: {
    languageLabel: "选择语言",
    openMenu: "打开菜单",
    homeAria: "Monolith Architects 首页",
    nav: ["首页", "项目", "关于", "服务", "联系"],
    adminLink: "管理",
    footer: {
      tagline: "我们打造平静、大胆且经久耐看的卓越空间。",
      menu: "菜单",
      contact: "联系",
      location: "Prizren, Kosovo",
      featuredResidenceAlt: "Monolith Architects 精选住宅项目",
    },
    form: {
      kicker: "咨询表单",
      heading: "向我们介绍您的项目",
      labels: ["姓名", "邮箱", "项目类型", "时间计划", "留言"],
      placeholders: {
        name: "您的全名",
        email: "your@email.com",
        project: "住宅、商业、室内……",
        timeline: "期望开始时间或进度安排",
        message: "请告诉我们您的愿景、预算和时间安排",
      },
      detailLabels: {
        email: "邮箱",
        phone: "电话",
        studio: "工作室",
      },
      studioAddress: "Prizren, Kosovo",
      submit: "提交咨询",
      defaultNote: "提交后，您的咨询将直接发送到我们的邮箱。",
      sending: "发送中...",
      success: "谢谢，您的咨询已成功发送。",
      failure: "提交失败。请重试，或发送邮件至 monolitharchitects8@gmail.com。",
      subject: "新的 Monolith Architects 咨询",
    },
    projects: [
      {
        title: "现代静居",
        category: "住宅",
        alt: "高端住宅别墅外观",
      },
      {
        title: "城市公寓",
        category: "室内",
        alt: "暖色调极简客厅",
      },
      {
        title: "极简住宅",
        category: "住宅",
        alt: "极简建筑入口",
      },
      {
        title: "办公大楼",
        category: "商业",
        alt: "玻璃办公楼立面",
      },
      {
        title: "现代厨房",
        category: "室内",
        alt: "现代厨房室内空间",
      },
      {
        title: "山坡别墅",
        category: "住宅",
        alt: "柔和自然光下的温暖卧室",
      },
    ],
    home: {
      title: "Monolith Architects",
      description: "Monolith Architects 是一家高端建筑事务所，打造精致的住宅与商业空间。",
      heroEyebrow: "普里兹伦建筑设计工作室",
      heroTitle: "<span>我们设计</span><span>能够带来</span><span><em>灵感</em>的空间。</span>",
      heroText:
        "Monolith Architects 打造高品质住宅、酒店和商业室内空间，专注于氛围、比例与材料表达。",
      heroLink: "查看我们的项目",
      selectedProjects: "精选项目",
      projectsHeading: "<span>我们近期作品的</span><span>精选集合。</span>",
      discussProject: "讨论您的项目",
      aboutEyebrow: "关于我们",
      aboutHeading: "建筑的意义在于<em>创造体验</em>。",
      aboutParagraphs: [
        "我们是一家多学科工作室，通过当代建筑、室内设计和策略规划塑造大胆且宜居的环境。",
        "每个项目都在戏剧性与克制之间取得平衡，将高端材料与清晰功能结合起来。",
      ],
      aboutButton: "更多关于我们",
      yearsOfPractice: "从业年限",
      aboutImageAlt: "精致建筑庭院",
      servicesEyebrow: "我们的服务",
      servicesHeading: "每个阶段都保持精准。",
      services: [
        {
          title: "建筑设计",
          description: "从概念到落成，我们打造兼具美感与性能的建筑。",
        },
        {
          title: "室内设计",
          description: "我们塑造触感温润、构图有力且舒适日常的室内空间。",
        },
        {
          title: "规划设计",
          description: "为高效、可持续且面向未来的空间提供周密规划。",
        },
        {
          title: "项目管理",
          description: "从第一张草图到最终交付，我们清晰管理范围、协调与落地。",
        },
      ],
      contactEyebrow: "联系",
      contactHeading: "一起塑造您的下一个空间。",
      contactText: "分享您的项目目标和期望时间，我们会联系您安排初步咨询。",
    },
    projectsPage: {
      title: "项目 | Monolith Architects",
      description: "Monolith Architects 精选住宅、商业和室内项目。",
      heroEyebrow: "精选项目",
      heroHeading: "以精准与氛围塑造的空间。",
      heroText: "一组经过精选的住宅、商业和室内作品，以清晰、比例和材料层次为核心。",
      portfolioEyebrow: "作品集",
      portfolioHeading: "<span>我们最新的建筑</span><span>与室内项目。</span>",
      portfolioLink: "开始您的项目",
    },
    aboutPage: {
      title: "关于 | Monolith Architects",
      description: "了解 Monolith Architects，这是一家位于地拉那的建筑与室内设计工作室。",
      heroEyebrow: "关于我们",
      heroHeading: "建筑在于创造体验。",
      heroText: "我们是一家位于地拉那的多学科事务所，塑造平静、大胆且高度宜居的空间。",
      sectionEyebrow: "工作室简介",
      sectionHeading: "以精准与克制呈现当代设计。",
      paragraphs: [
        "Monolith Architects 涵盖私人住宅、室内、酒店和商业环境设计，始终在氛围与功能之间取得平衡。",
        "我们的方式建立在材料真实、空间清晰以及项目各阶段的细致协作之上。",
      ],
      socialLabel: "了解更多",
      socialLinks: {
        instagram: "Instagram",
        facebook: "Facebook",
      },
      yearsOfPractice: "从业年限",
      imageAlt: "Monolith Architects 庭院项目",
    },
    servicesPage: {
      title: "服务 | Monolith Architects",
      description: "Monolith Architects 提供建筑、室内设计、规划与项目管理服务。",
      heroEyebrow: "服务",
      heroHeading: "从概念到完成的一体化支持。",
      heroText: "我们提供建筑、室内、规划和项目统筹服务，并在全过程保持一致的设计标准。",
      services: [
        {
          title: "建筑设计",
          description: "为高端住宅和商业项目提供概念设计、方案规划、技术深化与设计指导。",
        },
        {
          title: "室内设计",
          description: "空间规划、材料搭配、定制细节与家具概念，共同提升日常生活品质。",
        },
        {
          title: "规划设计",
          description: "从一开始就进行场地策略、功能组织、流线逻辑和面向未来的规划决策。",
        },
        {
          title: "项目管理",
          description: "在实施阶段统筹协调、顾问沟通、进度控制与设计监督。",
        },
      ],
    },
    contactPage: {
      title: "联系 | Monolith Architects",
      description: "联系 Monolith Architects，咨询住宅、商业与室内设计项目。",
      heroEyebrow: "联系",
      heroHeading: "<span>让我们聊聊</span><span>您的下一个</span><span>空间。</span>",
      heroText: "分享您的愿景、时间计划和项目类型，我们会回复并安排首次咨询。",
      sectionEyebrow: "工作室联系",
      sectionHeading: "我们承接住宅、室内和商业项目。",
      sectionText: "如有新项目咨询、合作或顾问需求，请使用表单或直接联系我们。",
    },
  },
};

const categoryPageTranslations = {
  en: {
    openCategoryPage: "Open category page",
    categories: {
      exterior: {
        title: "Exterior | Monolith Architects",
        description:
          "Exterior architecture category page featuring related projects and services by Monolith Architects.",
        heroEyebrow: "Category",
        heroTitle: "Exterior",
        heroText:
          "Facades, envelopes, and first impressions shaped with proportion, clarity, and atmospheric detail.",
        overviewEyebrow: "Overview",
        overviewHeading:
          "<span>Exterior concepts</span><span>with clear visual identity.</span>",
        overviewText:
          "This category focuses on architectural presence, facade rhythm, material expression, and the way a project is experienced from the outside.",
        cta: "Start your project",
        serviceTitle: "Exterior",
        serviceDescription:
          "Facade studies, massing, material palettes, and exterior design development for residential and commercial projects.",
        relatedEyebrow: "Related Projects",
        relatedHeading:
          "<span>Projects inside the</span><span>Exterior category.</span>",
        allProjects: "All projects",
      },
      interior: {
        title: "Interior | Monolith Architects",
        description:
          "Interior category page featuring related projects and services by Monolith Architects.",
        heroEyebrow: "Category",
        heroTitle: "Interior",
        heroText:
          "Refined living environments shaped through spatial warmth, balanced composition, and material sensitivity.",
        overviewEyebrow: "Overview",
        overviewHeading:
          "<span>Interior spaces</span><span>with atmosphere and clarity.</span>",
        overviewText:
          "This category presents interior-led work focused on daily comfort, material coherence, and a calm but expressive spatial language.",
        cta: "Start your project",
        serviceTitle: "Interior",
        serviceDescription:
          "Interior concepts, moodboards, space planning, and finish selection tailored to the character of each space.",
        relatedEyebrow: "Related Projects",
        relatedHeading:
          "<span>Projects inside the</span><span>Interior category.</span>",
        allProjects: "All projects",
      },
      "3d-rendering": {
        title: "3D Rendering | Monolith Architects",
        description:
          "3D Rendering category page featuring related projects and services by Monolith Architects.",
        heroEyebrow: "Category",
        heroTitle: "3D Rendering",
        heroText:
          "Still imagery that brings architecture to life with lighting, texture, depth, and a precise visual atmosphere.",
        overviewEyebrow: "Overview",
        overviewHeading:
          "<span>Rendered imagery</span><span>that clarifies the vision.</span>",
        overviewText:
          "This category is dedicated to high-detail still rendering for concept approval, presentations, and pre-construction storytelling.",
        cta: "Start your project",
        serviceTitle: "3D Rendering",
        serviceDescription:
          "High-detail still visualizations that present lighting, materials, and atmosphere clearly before execution.",
        relatedEyebrow: "Related Projects",
        relatedHeading:
          "<span>Projects inside the</span><span>3D Rendering category.</span>",
        allProjects: "All projects",
      },
      "3d-animation": {
        title: "3D Animation | Monolith Architects",
        description:
          "3D Animation category page featuring related projects and services by Monolith Architects.",
        heroEyebrow: "Category",
        heroTitle: "3D Animation",
        heroText:
          "Motion-driven storytelling that shows sequence, scale, and the lived experience of architecture before it is built.",
        overviewEyebrow: "Overview",
        overviewHeading:
          "<span>Animated walkthroughs</span><span>that make space readable.</span>",
        overviewText:
          "This category highlights animation-led presentation, helping teams and clients understand movement, atmosphere, and visual sequence.",
        cta: "Start your project",
        serviceTitle: "3D Animation",
        serviceDescription:
          "Cinematic walkthroughs and animated sequences that communicate scale, movement, and spatial experience.",
        relatedEyebrow: "Related Projects",
        relatedHeading:
          "<span>Projects inside the</span><span>3D Animation category.</span>",
        allProjects: "All projects",
      },
    },
  },
  sq: {
    openCategoryPage: "Hap faqen e kategorise",
    categories: {
      exterior: {
        title: "Exterior | Monolith Architects",
        description:
          "Faqja e kategorise Exterior me projektet dhe sherbimet perkatese nga Monolith Architects.",
        heroEyebrow: "Kategoria",
        heroTitle: "Exterior",
        heroText:
          "Fasadat, pamja e jashtme dhe pershtypja e pare te formesuara me proporcion, qartesi dhe atmosfere.",
        overviewEyebrow: "Permbledhje",
        overviewHeading:
          "<span>Koncepte Exterior</span><span>me identitet vizual te qarte.</span>",
        overviewText:
          "Kjo kategori fokusohet te prania arkitekturore, ritmi i fasades, shprehja materiale dhe menyra si perjetohet projekti nga jashte.",
        cta: "Nisni projektin tuaj",
        serviceTitle: "Exterior",
        serviceDescription:
          "Studime fasade, volumetri, paleta materialesh dhe zhvillim i dizajnit te jashtem per projekte rezidenciale dhe komerciale.",
        relatedEyebrow: "Projektet perkatese",
        relatedHeading:
          "<span>Projektet brenda</span><span>kategorise Exterior.</span>",
        allProjects: "Te gjitha projektet",
      },
      interior: {
        title: "Interior | Monolith Architects",
        description:
          "Faqja e kategorise Interior me projektet dhe sherbimet perkatese nga Monolith Architects.",
        heroEyebrow: "Kategoria",
        heroTitle: "Interior",
        heroText:
          "Ambiente te rafinuara te formesuara me ngrohtesi hapesinore, kompozim te balancuar dhe ndjeshmeri materiale.",
        overviewEyebrow: "Permbledhje",
        overviewHeading:
          "<span>Hapesira Interior</span><span>me atmosfere dhe qartesi.</span>",
        overviewText:
          "Kjo kategori paraqet pune te orientuara nga interieri me fokus te komoditeti i perditshem, koherenca materiale dhe nje gjuhe hapesinore e qete por ekspresive.",
        cta: "Nisni projektin tuaj",
        serviceTitle: "Interior",
        serviceDescription:
          "Koncepte interieri, moodboard-e, planifikim hapesinor dhe perzgjedhje finisazhesh sipas karakterit te cdo ambienti.",
        relatedEyebrow: "Projektet perkatese",
        relatedHeading:
          "<span>Projektet brenda</span><span>kategorise Interior.</span>",
        allProjects: "Te gjitha projektet",
      },
      "3d-rendering": {
        title: "3D Rendering | Monolith Architects",
        description:
          "Faqja e kategorise 3D Rendering me projektet dhe sherbimet perkatese nga Monolith Architects.",
        heroEyebrow: "Kategoria",
        heroTitle: "3D Rendering",
        heroText:
          "Imazhe statike qe e sjellin arkitekturen ne jete me drite, teksture, thellesi dhe atmosfere te sakte vizuale.",
        overviewEyebrow: "Permbledhje",
        overviewHeading:
          "<span>Imazhe te renderuara</span><span>qe qartesojne vizionin.</span>",
        overviewText:
          "Kjo kategori i dedikohet renderimeve statike me nivel te larte detaji per prezantim koncepti, aprovim dhe komunikim para zbatimit.",
        cta: "Nisni projektin tuaj",
        serviceTitle: "3D Rendering",
        serviceDescription:
          "Vizualizime statike me detaj te larte qe paraqesin qarte ndricimin, materialet dhe atmosferen perpara realizimit.",
        relatedEyebrow: "Projektet perkatese",
        relatedHeading:
          "<span>Projektet brenda</span><span>kategorise 3D Rendering.</span>",
        allProjects: "Te gjitha projektet",
      },
      "3d-animation": {
        title: "3D Animation | Monolith Architects",
        description:
          "Faqja e kategorise 3D Animation me projektet dhe sherbimet perkatese nga Monolith Architects.",
        heroEyebrow: "Kategoria",
        heroTitle: "3D Animation",
        heroText:
          "Storytelling ne levizje qe tregon sekuencen, shkallen dhe perjetimin real te arkitektures perpara se te ndertohet.",
        overviewEyebrow: "Permbledhje",
        overviewHeading:
          "<span>Walkthrough-e te animuara</span><span>qe e bejne hapesiren te lexueshme.</span>",
        overviewText:
          "Kjo kategori ve ne pah prezantimin permes animacionit, duke ndihmuar ekipet dhe klientet te kuptojne levizjen, atmosferen dhe sekuencen vizuale.",
        cta: "Nisni projektin tuaj",
        serviceTitle: "3D Animation",
        serviceDescription:
          "Walkthrough-e kinematike dhe sekuenca te animuara qe komunikojne shkallen, levizjen dhe perjetimin e hapesires.",
        relatedEyebrow: "Projektet perkatese",
        relatedHeading:
          "<span>Projektet brenda</span><span>kategorise 3D Animation.</span>",
        allProjects: "Te gjitha projektet",
      },
    },
  },
};

const adminPageTranslations = {
  en: {
    title: "Admin | Monolith Architects",
    description: "Local admin panel for managing projects.",
    eyebrow: "Project Admin",
    heading: "Add and edit projects.",
    note:
      "Changes are applied directly to this site in your current browser via localStorage, without a backend.",
    formTitle: "Project form",
    listTitle: "Current projects",
    labels: {
      title: "Project titles",
      category: "Category",
      images: "Project images",
      alt: "Image alt texts",
      number: "Project number",
    },
    localizedFields: {
      title: "Add the project title for each language.",
      alt: "Add the image alt text for each language.",
    },
    placeholders: {
      title: "Modern Retreat",
      alt: "Luxury residential villa exterior",
      number: "01",
    },
    gallery: {
      dropTitle: "Drag and drop multiple images here",
      dropHint: "or choose images from your device",
      choose: "Choose images",
      help: "The first image is used as the project cover. Keep files optimized because browser storage is limited.",
      empty: "No images selected yet.",
      cover: "Cover",
      remove: "Remove",
      required: "Add at least one image for this project.",
      invalid: "Only image files are supported.",
      storageLimit: "The browser storage is full. Use fewer or smaller images.",
    },
    buttons: {
      create: "Save project",
      update: "Update project",
      cancel: "Cancel edit",
      edit: "Edit",
    },
    empty: "No projects saved yet.",
  },
  sq: {
    title: "Admin | Monolith Architects",
    description: "Panel lokal admin per menaxhimin e projekteve.",
    eyebrow: "Admin i Projekteve",
    heading: "Shto dhe ndrysho projekte.",
    note:
      "Ndryshimet aplikohen direkt ne kete projekt ne browser-in aktual me localStorage, pa backend.",
    formTitle: "Formulari i projektit",
    listTitle: "Projektet aktuale",
    labels: {
      title: "Titujt e projektit",
      category: "Kategoria",
      images: "Fotot e projektit",
      alt: "Tekstet alt te fotos",
      number: "Numri i projektit",
    },
    localizedFields: {
      title: "Shto titullin e projektit per secilen gjuhe.",
      alt: "Shto tekstin alt te fotos per secilen gjuhe.",
    },
    placeholders: {
      title: "Modern Retreat",
      alt: "Pamje e jashtme e nje vile luksoze",
      number: "01",
    },
    gallery: {
      dropTitle: "Terhiq dhe lesho disa foto ketu",
      dropHint: "ose zgjidh foto nga pajisja jote",
      choose: "Zgjidh foto",
      help: "Fotoja e pare perdoret si cover i projektit. Mbaji skedaret te optimizuar sepse memoria e browser-it eshte e kufizuar.",
      empty: "Nuk ka ende foto te zgjedhura.",
      cover: "Cover",
      remove: "Hiqe",
      required: "Shto te pakten nje foto per kete projekt.",
      invalid: "Lejohen vetem skedare imazhesh.",
      storageLimit: "Memoria e browser-it eshte plotesuar. Përdor me pak ose foto me te vogla.",
    },
    buttons: {
      create: "Ruaj projektin",
      update: "Perditeso projektin",
      cancel: "Anulo ndryshimin",
      edit: "Ndrysho",
    },
    empty: "Nuk ka ende projekte te ruajtura.",
  },
};

const categoryOrder = ["exterior", "interior", "3d-rendering", "3d-animation"];
const projectTranslationLanguages = ["en", "sq", "fr", "de", "ru", "ar", "zh"];

const defaultProjectCatalog = [
  {
    id: "modern-retreat",
    title: "Modern Retreat",
    categorySlug: "exterior",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
    alt: "Luxury residential villa exterior",
    number: "01",
  },
  {
    id: "city-apartment",
    title: "City Apartment",
    categorySlug: "interior",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    alt: "Minimal living room with warm tones",
    number: "02",
  },
  {
    id: "minimal-house",
    title: "Minimal House",
    categorySlug: "3d-rendering",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    alt: "Minimal architectural entrance",
    number: "03",
  },
  {
    id: "office-building",
    title: "Office Building",
    categorySlug: "exterior",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
    alt: "Glass office building facade",
    number: "04",
  },
  {
    id: "modern-kitchen",
    title: "Modern Kitchen",
    categorySlug: "interior",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    alt: "Contemporary kitchen interior",
    number: "05",
  },
  {
    id: "hillside-villa",
    title: "Hillside Villa",
    categorySlug: "3d-animation",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    alt: "Warm bedroom interior with soft natural light",
    number: "06",
  },
];

projectCatalogCache = defaultProjectCatalog.map((project, index) => normalizeProject(project, index));

let currentLanguage = "en";
let currentAdminImages = [];

function getLanguageDisplayLabel(language) {
  const labels = localizedLanguageNames[currentLanguage] || localizedLanguageNames.en;
  return labels[language] || language.toUpperCase();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function slugifyProjectId(value) {
  const slug = String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `project-${Date.now()}`;
}

function normalizeProjectImages(images, image, fallbackImage) {
  const sourceImages = Array.isArray(images) && images.length
    ? images
    : [image || fallbackImage];

  return sourceImages.map((item) => String(item ?? "").trim()).filter(Boolean);
}

function readImageFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read image"));
    reader.readAsDataURL(file);
  });
}

function normalizeLocalizedField(value, fallbackValue = "") {
  const fallback = String(fallbackValue ?? "").trim();

  if (typeof value === "string") {
    const normalizedValue = value.trim() || fallback;
    return Object.fromEntries(projectTranslationLanguages.map((language) => [language, normalizedValue]));
  }

  if (value && typeof value === "object") {
    const firstAvailable = projectTranslationLanguages
      .map((language) => String(value[language] ?? "").trim())
      .find(Boolean) || fallback;

    return Object.fromEntries(
      projectTranslationLanguages.map((language) => [language, String(value[language] ?? "").trim() || firstAvailable]),
    );
  }

  return Object.fromEntries(projectTranslationLanguages.map((language) => [language, fallback]));
}

function normalizeProjectVideoUrl(videoUrl) {
  if (typeof videoUrl !== "string") {
    return "";
  }

  const normalizedValue = videoUrl.trim();

  if (!normalizedValue) {
    return "";
  }

  const iframeSourceMatch = normalizedValue.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (iframeSourceMatch?.[1]) {
    return iframeSourceMatch[1].trim();
  }

  return normalizedValue;
}

function normalizeProjectVideos(videos, fallbackVideoUrl = "") {
  const normalizedVideos = Array.isArray(videos)
    ? videos
      .map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }

        if (item && typeof item === "object") {
          return String(item.video ?? "").trim();
        }

        return "";
      })
      .filter(Boolean)
    : [];

  const normalizedFallbackVideo = normalizeProjectVideoUrl(fallbackVideoUrl);

  if (normalizedFallbackVideo && !normalizedVideos.includes(normalizedFallbackVideo)) {
    normalizedVideos.unshift(normalizedFallbackVideo);
  }

  return normalizedVideos;
}

function getYouTubeEmbedUrl(videoUrl) {
  const sourceUrl = normalizeProjectVideoUrl(videoUrl);

  if (!sourceUrl) {
    return "";
  }

  try {
    const parsedUrl = new URL(sourceUrl);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.split("/").filter(Boolean)[0] || "";
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        const videoId = parsedUrl.searchParams.get("v") || "";
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        const videoId = parsedUrl.pathname.split("/embed/")[1]?.split("/")[0] || "";
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        const videoId = parsedUrl.pathname.split("/shorts/")[1]?.split("/")[0] || "";
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }
    }

    if (hostname === "youtube-nocookie.com") {
      if (parsedUrl.pathname.startsWith("/embed/")) {
        const videoId = parsedUrl.pathname.split("/embed/")[1]?.split("/")[0] || "";
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

function getProjectMediaItems(project, options = {}) {
  const mediaItems = project.images.map((imageSource, index) => ({
    type: "image",
    src: imageSource,
    alt: `${getLocalizedProjectValue(project.alt)} ${index > 0 ? index + 1 : ""}`.trim(),
  }));

  if (options.includeVideos === false) {
    return mediaItems;
  }

  const videoItems = (project.videos || [])
    .map((videoUrl) => getYouTubeEmbedUrl(videoUrl))
    .filter(Boolean)
    .map((embedUrl) => ({
      type: "video",
      src: embedUrl,
      title: `${getLocalizedProjectValue(project.title)} video`,
    }));

  return [...mediaItems, ...videoItems];
}

function getLocalizedProjectValue(value, language = currentLanguage) {
  const normalizedValue = normalizeLocalizedField(value);
  return normalizedValue[language] || normalizedValue.en || Object.values(normalizedValue).find(Boolean) || "";
}

function normalizeProject(project, index) {
  const fallback = defaultProjectCatalog[index] || defaultProjectCatalog[0];
  const categorySlug = categoryOrder.includes(project?.categorySlug)
    ? project.categorySlug
    : fallback.categorySlug;
  const images = normalizeProjectImages(project?.images, project?.image, fallback.image);
  const title = normalizeLocalizedField(project?.title, fallback.title);
  const alt = normalizeLocalizedField(project?.alt, fallback.alt);
  const videos = normalizeProjectVideos(project?.videos, project?.videoUrl);

  return {
    id: slugifyProjectId(project?.id || getLocalizedProjectValue(title, "en") || fallback.title),
    title,
    categorySlug,
    image: images[0],
    images,
    alt,
    videos,
    videoUrl: videos[0] || "",
    number: String(project?.number || fallback.number),
  };
}

function getStoredProjects() {
  return projectCatalogCache;
}

function saveStoredProjects(projects) {
  try {
    window.localStorage.setItem(projectStorageKey, JSON.stringify(projects));
    return true;
  } catch {
    return false;
  }
}

function getCategoryLabel(categorySlug) {
  const localizedCategory = categoryPageTranslations[currentLanguage]?.categories?.[categorySlug];
  const defaultCategory = categoryPageTranslations.en.categories[categorySlug];
  return localizedCategory?.heroTitle || defaultCategory?.heroTitle || categorySlug;
}

function getCategoryServiceCards(language = currentLanguage) {
  const languageCopy = categoryPageTranslations[language] || categoryPageTranslations.en;

  return categoryOrder.map((categorySlug) => {
    const categoryCopy = languageCopy.categories?.[categorySlug]
      || categoryPageTranslations.en.categories?.[categorySlug]
      || {};

    return {
      title: categoryCopy.serviceTitle || categoryCopy.heroTitle || categorySlug,
      description: categoryCopy.serviceDescription || categoryCopy.heroText || "",
    };
  });
}

async function loadProjectsFromRepository() {
  if (projectsDataLoaded) {
    return projectCatalogCache;
  }

  try {
    const response = await fetch(getProjectsDataHref(), { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Failed to load projects data");
    }

    const payload = await response.json();
    const projects = Array.isArray(payload?.projects) ? payload.projects : [];

    if (!projects.length) {
      throw new Error("Projects data is empty");
    }

    projectCatalogCache = projects.map((project, index) => normalizeProject(project, index));
  } catch {
    projectCatalogCache = defaultProjectCatalog.map((project, index) => normalizeProject(project, index));
  }

  projectsDataLoaded = true;
  return projectCatalogCache;
}

function getCategoryPageHref(categorySlug) {
  const relativePrefixes = {
    home: "./",
    projects: "../",
    services: "../",
    category: "../../",
    admin: "../",
  };

  const prefix = relativePrefixes[bodyPage] || "./";
  return `${prefix}${categorySlug}/`;
}

function getProjectsDataHref() {
  const relativePaths = {
    home: "./data/projects.json",
    projects: "../data/projects.json",
    about: "../data/projects.json",
    services: "../data/projects.json",
    contact: "../data/projects.json",
    category: "../../data/projects.json",
    admin: "../data/projects.json",
  };

  return relativePaths[bodyPage] || "./data/projects.json";
}

function getCategorySlugFromButton(button, index) {
  if (!(button instanceof HTMLElement)) {
    return "";
  }

  const explicitSlug = String(button.dataset.categorySlug || "").trim();

  if (categoryOrder.includes(explicitSlug)) {
    return explicitSlug;
  }

  return categoryOrder[index] || "";
}

function isCurrentCategorySlug(categorySlug) {
  return bodyPage === "category" && document.body.dataset.category === categorySlug;
}

function createCategoryPillButton(categorySlug) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "category-pill";
  button.dataset.categorySlug = categorySlug;
  return button;
}

function syncCategoryPillGroup(filterGroup) {
  const buttons = Array.from(filterGroup.querySelectorAll(".category-pill"));

  buttons.forEach((button, index) => {
    const categorySlug = getCategorySlugFromButton(button, index);

    if (!categorySlug) {
      return;
    }

    const isCurrent = isCurrentCategorySlug(categorySlug);

    button.dataset.categorySlug = categorySlug;
    button.dataset.category = getCategoryLabel(categorySlug);
    button.textContent = getCategoryLabel(categorySlug);
    button.setAttribute("aria-pressed", "false");
    button.classList.toggle("is-current", isCurrent);

    if (isCurrent) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function ensureMobileCategoryNavbar() {
  if (bodyPage === "admin") {
    return;
  }

  let mobileNavbar = document.querySelector(".mobile-category-navbar");

  if (!mobileNavbar) {
    mobileNavbar = document.createElement("nav");
    mobileNavbar.className = "mobile-category-navbar";
    mobileNavbar.setAttribute("aria-label", "Category navigation");

    const pills = document.createElement("div");
    pills.className = "category-pills";
    pills.setAttribute("aria-label", "Category navigation");

    categoryOrder.forEach((categorySlug) => {
      pills.append(createCategoryPillButton(categorySlug));
    });

    mobileNavbar.append(pills);
    document.body.append(mobileNavbar);
  }

  const pillsGroup = mobileNavbar.querySelector(".category-pills");

  if (pillsGroup) {
    syncCategoryPillGroup(pillsGroup);
  }
}

function getProjectEmptyStateText() {
  return currentLanguage === "sq" ? "Nuk ka projekte ende." : "No projects yet.";
}

function getProjectViewerCopy() {
  if (currentLanguage === "sq") {
    return {
      openGallery: "Hap galerine",
      galleryHint: "Kliko per ta pare projektin ne ekran te madh",
      moreMedia: "Ka media te tjera",
      mediaCount: "media",
      slideCount: "pamje",
      previous: "Media e meparshme",
      next: "Media tjeter",
      close: "Mbyll galerine",
      imageLabel: "Imazh",
      videoLabel: "Video",
      of: "nga",
    };
  }

  return {
    openGallery: "Open gallery",
    galleryHint: "Click to view this project in a larger slider",
    moreMedia: "More media inside",
    mediaCount: "media",
    slideCount: "slides",
    previous: "Previous media",
    next: "Next media",
    close: "Close gallery",
    imageLabel: "Image",
    videoLabel: "Video",
    of: "of",
  };
}

function syncProjectModalIndicators(activeIndex) {
  if (!activeProjectModalState || !(projectModalRoot instanceof HTMLElement)) {
    return;
  }

  const dots = Array.from(projectModalRoot.querySelectorAll(".project-modal-dot"));
  const count = projectModalRoot.querySelector("#projectModalCount");
  const copy = getProjectViewerCopy();

  Array.from(projectModalRoot.querySelectorAll(".project-modal-media")).forEach((slide, index) => {
    const isActive = index === activeIndex;
    slide.classList.toggle("is-active", isActive);
    slide.hidden = !isActive;
  });

  dots.forEach((dot, index) => {
    const isActive = index === activeIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });

  if (count instanceof HTMLElement) {
    count.textContent = `${activeIndex + 1} ${copy.of} ${activeProjectModalState.mediaItems.length}`;
  }
}

function showProjectModalControls() {
  if (!(projectModalRoot instanceof HTMLElement)) {
    return;
  }

  projectModalRoot.classList.remove("project-modal-controls-visible");
  void projectModalRoot.offsetWidth;
  projectModalRoot.classList.add("project-modal-controls-visible");
}

function clearProjectModalControls() {
  if (projectModalRoot instanceof HTMLElement) {
    projectModalRoot.classList.remove("project-modal-controls-visible");
  }
}

function navigateProjectModal(direction) {
  if (!activeProjectModalState || !activeProjectModalState.mediaItems.length) {
    return;
  }

  const nextIndex = (activeProjectModalState.activeIndex + direction + activeProjectModalState.mediaItems.length)
    % activeProjectModalState.mediaItems.length;
  setProjectModalActiveMedia(nextIndex);
}

function ensureProjectModal() {
  if (projectModalRoot instanceof HTMLElement) {
    return projectModalRoot;
  }

  projectModalRoot = document.createElement("div");
  projectModalRoot.className = "project-modal";
  projectModalRoot.hidden = true;
  projectModalRoot.setAttribute("aria-hidden", "true");
  projectModalRoot.innerHTML = `
    <div class="project-modal-backdrop" data-modal-dismiss="true"></div>
    <div class="project-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle">
      <button type="button" class="project-modal-close" data-modal-dismiss="true" aria-label="Close gallery">
        <span aria-hidden="true">+</span>
      </button>
      <div class="project-modal-meta">
        <p class="project-modal-kicker" id="projectModalCategory"></p>
        <div class="project-modal-heading-row">
          <h3 id="projectModalTitle"></h3>
          <p class="project-modal-count" id="projectModalCount"></p>
        </div>
      </div>
      <div class="project-modal-stage">
        <button type="button" class="project-modal-arrow project-modal-arrow-prev" data-modal-nav="prev" aria-label="Previous media">
          <span aria-hidden="true">&larr;</span>
        </button>
        <div class="project-modal-media-track" id="projectModalMediaTrack"></div>
        <button type="button" class="project-modal-arrow project-modal-arrow-next" data-modal-nav="next" aria-label="Next media">
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
      <div class="project-modal-footer">
        <p class="project-modal-hint" id="projectModalHint"></p>
        <div class="project-modal-dots" id="projectModalDots"></div>
      </div>
    </div>
  `;

  document.body.append(projectModalRoot);
  const stage = projectModalRoot.querySelector(".project-modal-stage");

  projectModalRoot.addEventListener("animationend", (event) => {
    if (event.animationName === "projectModalArrowReveal") {
      clearProjectModalControls();
    }
  });

  projectModalRoot.addEventListener("click", (event) => {
    const dismissTrigger = event.target instanceof Element
      ? event.target.closest("[data-modal-dismiss='true']")
      : null;

    if (dismissTrigger) {
      event.stopPropagation();
      closeProjectModal();
      return;
    }

    const modalDot = event.target instanceof Element
      ? event.target.closest(".project-modal-dot[data-modal-dot]")
      : null;

    if (modalDot instanceof HTMLButtonElement) {
      event.stopPropagation();
      const nextIndex = Number.parseInt(modalDot.dataset.modalDot || "0", 10);
      setProjectModalActiveMedia(Number.isNaN(nextIndex) ? 0 : nextIndex);
      showProjectModalControls();
      return;
    }

    const navButton = event.target instanceof Element
      ? event.target.closest(".project-modal-arrow[data-modal-nav]")
      : null;

    if (navButton instanceof HTMLButtonElement) {
      event.stopPropagation();
      navigateProjectModal(navButton.dataset.modalNav === "prev" ? -1 : 1);
      showProjectModalControls();
    }
  });

  ["pointermove", "pointerdown", "touchstart", "touchmove"].forEach((eventName) => {
    stage?.addEventListener(eventName, () => {
      if (activeProjectModalState) {
        showProjectModalControls();
      }
    }, { passive: true });
  });

  const track = projectModalRoot.querySelector("#projectModalMediaTrack");
  if (track instanceof HTMLElement) {
    track.addEventListener("scroll", () => {
      if (!activeProjectModalState || !window.matchMedia("(max-width: 720px)").matches) {
        return;
      }

      const trackWidth = track.clientWidth || 1;
      const nextIndex = Math.round(track.scrollLeft / trackWidth);

      if (nextIndex === activeProjectModalState.activeIndex) {
        return;
      }

      activeProjectModalState.activeIndex = nextIndex;
      syncProjectModalIndicators(nextIndex);
    }, { passive: true });
  }

  return projectModalRoot;
}

function setProjectModalActiveMedia(nextIndex, behavior = "smooth") {
  if (!activeProjectModalState || !(projectModalRoot instanceof HTMLElement)) {
    return;
  }

  const { mediaItems } = activeProjectModalState;
  const normalizedIndex = Math.max(0, Math.min(nextIndex, mediaItems.length - 1));
  activeProjectModalState.activeIndex = normalizedIndex;

  const slides = Array.from(projectModalRoot.querySelectorAll(".project-modal-media"));

  slides.forEach((slide, index) => {
    const isActive = index === normalizedIndex;
    slide.classList.toggle("is-active", isActive);
    slide.hidden = !isActive;
  });

  syncProjectModalIndicators(normalizedIndex);
}

function closeProjectModal() {
  if (!(projectModalRoot instanceof HTMLElement)) {
    return;
  }

  clearProjectModalControls();
  projectModalRoot.hidden = true;
  projectModalRoot.setAttribute("aria-hidden", "true");
  document.body.classList.remove("project-modal-open");
  activeProjectModalState = null;
}

function openProjectModal(projectId, startIndex = 0) {
  const modal = ensureProjectModal();
  const project = getStoredProjects().find((item) => item.id === projectId);

  if (!project) {
    return;
  }

  const mediaItems = getProjectMediaItems(project);
  if (!mediaItems.length) {
    return;
  }

  const title = getLocalizedProjectValue(project.title);
  const category = getCategoryLabel(project.categorySlug);
  const copy = getProjectViewerCopy();
  const titleNode = modal.querySelector("#projectModalTitle");
  const categoryNode = modal.querySelector("#projectModalCategory");
  const track = modal.querySelector("#projectModalMediaTrack");
  const dots = modal.querySelector("#projectModalDots");
  const hint = modal.querySelector("#projectModalHint");
  const closeButton = modal.querySelector(".project-modal-close");
  const prevButton = modal.querySelector(".project-modal-arrow-prev");
  const nextButton = modal.querySelector(".project-modal-arrow-next");

  if (titleNode instanceof HTMLElement) titleNode.textContent = title;
  if (categoryNode instanceof HTMLElement) categoryNode.textContent = category;
  if (hint instanceof HTMLElement) {
    hint.textContent = mediaItems.length > 1 ? copy.moreMedia : copy.galleryHint;
  }
  if (closeButton instanceof HTMLButtonElement) closeButton.setAttribute("aria-label", copy.close);
  if (prevButton instanceof HTMLButtonElement) {
    prevButton.setAttribute("aria-label", copy.previous);
    prevButton.hidden = mediaItems.length < 2;
  }
  if (nextButton instanceof HTMLButtonElement) {
    nextButton.setAttribute("aria-label", copy.next);
    nextButton.hidden = mediaItems.length < 2;
  }

  if (track instanceof HTMLElement) {
    track.innerHTML = mediaItems.map((item, index) => {
      const isActive = index === 0;

      if (item.type === "video") {
        return `
          <div class="project-modal-media${isActive ? " is-active" : ""}" data-modal-media-index="${index}" ${isActive ? "" : "hidden"}>
            <div class="project-modal-video-wrapper">
              <iframe
                src="${escapeHtml(item.src)}"
                title="${escapeHtml(item.title || `${title} video`)}"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        `;
      }

      return `
        <div class="project-modal-media${isActive ? " is-active" : ""}" data-modal-media-index="${index}" ${isActive ? "" : "hidden"}>
          <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || title)}" />
        </div>
      `;
    }).join("");
  }

  if (dots instanceof HTMLElement) {
    dots.innerHTML = mediaItems.map((item, index) => `
      <button
        type="button"
        class="project-modal-dot${index === 0 ? " is-active" : ""}"
        data-modal-dot="${index}"
        aria-label="${escapeHtml(`${item.type === "video" ? copy.videoLabel : copy.imageLabel} ${index + 1}`)}"
        aria-pressed="${index === 0 ? "true" : "false"}"
      ></button>
    `).join("");
  }

  activeProjectModalState = { projectId, mediaItems, activeIndex: 0 };
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("project-modal-open");
  showProjectModalControls();
  setProjectModalActiveMedia(startIndex, "auto");
}

function buildProjectCardMarkup(project, options = {}) {
  const categoryLabel = escapeHtml(getCategoryLabel(project.categorySlug));
  const projectTitle = escapeHtml(getLocalizedProjectValue(project.title));
  const projectAlt = escapeHtml(getLocalizedProjectValue(project.alt));
  const mediaItems = getProjectMediaItems(project, { includeVideos: !options.clickable });
  const viewerCopy = getProjectViewerCopy();
  const hasVideo = mediaItems.some((item) => item.type === "video");
  const cardAttributes = [
    `class="project-card${options.clickable ? " project-card-clickable" : ""}"`,
    `data-project-id="${escapeHtml(project.id)}"`,
    `data-filter-category="${escapeHtml(categoryLabel)}"`,
    `data-category-label="${escapeHtml(categoryLabel)}"`,
  ];

  if (options.clickable) {
    cardAttributes.push(`data-category-href="${escapeHtml(getCategoryPageHref(project.categorySlug))}"`);
  } else {
    cardAttributes.push('data-project-modal="true"');
    cardAttributes.push('tabindex="0"');
    cardAttributes.push('role="button"');
    cardAttributes.push(`aria-label="${escapeHtml(`${viewerCopy.openGallery}: ${getLocalizedProjectValue(project.title)}`)}"`);
  }

  if (mediaItems.length > 1) {
    cardAttributes.push('data-active-media-index="0"');
  }

  const mediaMarkup = mediaItems.length
    ? mediaItems
      .map((item, index) => {
        const isActive = index === 0;

        if (item.type === "video") {
          return `
            <div class="project-media project-media-slide${isActive ? " is-active" : ""}" data-media-index="${index}" ${isActive ? "" : "hidden"}>
              <div class="project-video-wrapper">
                <iframe
                  src="${escapeHtml(item.src)}"
                  title="${escapeHtml(item.title || `${projectTitle} video`)}"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          `;
        }

        return `
          <div class="project-media project-media-slide${isActive ? " is-active" : ""}" data-media-index="${index}" ${isActive ? "" : "hidden"}>
            <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || projectAlt)}" />
          </div>
        `;
      })
      .join("")
    : `<div class="project-media project-media-slide is-active" data-media-index="0"><img src="${escapeHtml(project.image)}" alt="${projectAlt}" /></div>`;

  const mediaControlsMarkup = mediaItems.length > 1
    ? `
        <div class="project-media-controls">
          <div class="project-media-dots" aria-label="${projectTitle} media gallery">
            ${mediaItems
              .map(
                (_, index) => `
                  <button
                    type="button"
                    class="project-media-dot${index === 0 ? " is-active" : ""}"
                    data-media-target="${index}"
                    aria-label="Show media ${index + 1}"
                    aria-pressed="${index === 0 ? "true" : "false"}"
                  ></button>
                `,
              )
              .join("")}
          </div>
        </div>
      `
    : "";

  const viewerCueMarkup = !options.clickable
    ? `
        <div class="project-card-viewer-cue">
          <span>${escapeHtml(viewerCopy.openGallery)}</span>
          <strong>${escapeHtml(`${mediaItems.length} ${hasVideo ? viewerCopy.mediaCount : viewerCopy.slideCount}`)}</strong>
        </div>
      `
    : "";

  return `
    <article ${cardAttributes.join(" ")}>
      <div class="project-media-stack">
        ${mediaMarkup}
        ${mediaControlsMarkup}
        ${viewerCueMarkup}
      </div>
      <div class="project-copy">
        <div>
          <h3>${projectTitle}</h3>
          <p>${categoryLabel}</p>
        </div>
        <span>${escapeHtml(project.number)}</span>
      </div>
    </article>
  `;
}

function renderHomeProjects() {
  const homeGrid = document.querySelector(".projects .project-grid");

  if (!homeGrid) {
    return;
  }

  const projects = getStoredProjects();
  homeGrid.innerHTML = projects.length
    ? projects.map((project) => buildProjectCardMarkup(project, { clickable: true })).join("")
    : `<p class="empty-state">${escapeHtml(getProjectEmptyStateText())}</p>`;
}

function renderProjectsPageContent() {
  const groupsContainer = document.querySelector(".project-groups");

  if (!groupsContainer) {
    return;
  }

  const projects = getStoredProjects();
  const categoryLinkText =
    (categoryPageTranslations[currentLanguage] || categoryPageTranslations.en).openCategoryPage;
  const groupedMarkup = categoryOrder
    .map((categorySlug) => {
      const categoryProjects = projects.filter((project) => project.categorySlug === categorySlug);

      if (!categoryProjects.length) {
        return "";
      }

      const categoryLabel = escapeHtml(getCategoryLabel(categorySlug));

      return `
        <section class="project-group" data-filter-category="${categoryLabel}">
          <div class="project-group-heading">
            <h3>${categoryLabel}</h3>
            <a class="inline-link category-heading-link" href="${escapeHtml(getCategoryPageHref(categorySlug))}">
              ${escapeHtml(categoryLinkText)}
            </a>
          </div>
          <div class="project-grid project-grid-group project-grid-expanded">
            ${categoryProjects.map((project) => buildProjectCardMarkup(project)).join("")}
          </div>
        </section>
      `;
    })
    .join("");

  groupsContainer.innerHTML = groupedMarkup || `<p class="empty-state">${escapeHtml(getProjectEmptyStateText())}</p>`;
}

function renderCategoryProjects() {
  const relatedGrid = document.querySelector("main .section:nth-of-type(2) .project-grid");
  const categoryKey = document.body.dataset.category;

  if (!relatedGrid || !categoryKey) {
    return;
  }

  const projects = getStoredProjects().filter((project) => project.categorySlug === categoryKey);
  relatedGrid.innerHTML = projects.length
    ? projects.map((project) => buildProjectCardMarkup(project)).join("")
    : `<p class="empty-state">${escapeHtml(getProjectEmptyStateText())}</p>`;
}

function getAdminPageCopy() {
  return adminPageTranslations[currentLanguage] || adminPageTranslations.en;
}

function setAdminUploadMessage(message = "", state = "") {
  const uploadNote = document.querySelector("#adminUploadNote");

  if (!(uploadNote instanceof HTMLElement)) {
    return;
  }

  if (!message) {
    uploadNote.hidden = true;
    uploadNote.textContent = "";
    delete uploadNote.dataset.state;
    return;
  }

  uploadNote.hidden = false;
  uploadNote.dataset.state = state;
  uploadNote.textContent = message;
}

function renderAdminImagePreview() {
  const previewRoot = document.querySelector("#adminImagePreview");

  if (!(previewRoot instanceof HTMLElement)) {
    return;
  }

  const adminCopy = getAdminPageCopy();

  previewRoot.innerHTML = currentAdminImages.length
    ? currentAdminImages
      .map((imageSource, index) => `
        <figure class="admin-image-item">
          <img src="${escapeHtml(imageSource)}" alt="${escapeHtml(`${adminCopy.labels.images} ${index + 1}`)}" />
          <figcaption>
            <span class="admin-image-chip">${escapeHtml(index === 0 ? adminCopy.gallery.cover : `${index + 1}`)}</span>
            <button type="button" class="admin-image-remove" data-image-index="${index}">
              ${escapeHtml(adminCopy.gallery.remove)}
            </button>
          </figcaption>
        </figure>
      `)
      .join("")
    : `<p class="empty-state">${escapeHtml(adminCopy.gallery.empty)}</p>`;
}

async function appendAdminImages(fileList) {
  const adminCopy = getAdminPageCopy();
  const nextFiles = Array.from(fileList || []).filter((file) => file.type.startsWith("image/"));

  if (!nextFiles.length) {
    setAdminUploadMessage(adminCopy.gallery.invalid, "error");
    return;
  }

  const imageSources = await Promise.all(nextFiles.map((file) => readImageFileAsDataUrl(file)));
  currentAdminImages = [...currentAdminImages, ...imageSources];
  renderAdminImagePreview();
  setAdminUploadMessage("", "");
}

function renderAdminProjectList() {
  const projectList = document.querySelector("#adminProjectList");

  if (!projectList) {
    return;
  }

  const adminCopy = getAdminPageCopy();
  const projects = getStoredProjects();

  if (!projects.length) {
    projectList.innerHTML = `<p class="empty-state">${escapeHtml(adminCopy.empty)}</p>`;
    return;
  }

  projectList.innerHTML = projects
    .map((project) => {
      const categoryLabel = escapeHtml(getCategoryLabel(project.categorySlug));
      const projectTitle = escapeHtml(getLocalizedProjectValue(project.title));
      return `
        <article class="admin-project-item">
          <div>
            <strong>${projectTitle}</strong>
            <p>${categoryLabel} · ${escapeHtml(project.number)}</p>
          </div>
          <div class="admin-project-actions">
            <button type="button" class="button button-dark admin-action" data-action="edit" data-project-id="${escapeHtml(project.id)}">
              ${escapeHtml(adminCopy.buttons.edit)}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderLocalizedAdminFields(fieldName, containerSelector, groupLabel, description, placeholder) {
  const container = document.querySelector(containerSelector);

  if (!(container instanceof HTMLElement)) {
    return;
  }

  container.innerHTML = `
    <div class="admin-localized-group-heading">
      <span class="admin-field-label">${escapeHtml(groupLabel)}</span>
      <p class="admin-localized-note">${escapeHtml(description)}</p>
    </div>
    <div class="admin-localized-grid">
      ${projectTranslationLanguages
        .map(
          (language) => `
            <label class="admin-localized-item">
              <span class="admin-localized-language">${escapeHtml(getLanguageDisplayLabel(language))}</span>
              <input
                type="text"
                name="${fieldName}.${language}"
                placeholder="${escapeHtml(placeholder)}"
                ${language === "en" ? "required" : ""}
              />
            </label>
          `,
        )
        .join("")}
    </div>
  `;
}

function getLocalizedFormValues(adminForm, fieldName) {
  return Object.fromEntries(
    projectTranslationLanguages.map((language) => {
      const input = adminForm.querySelector(`[name="${fieldName}.${language}"]`);
      return [language, input instanceof HTMLInputElement ? input.value.trim() : ""];
    }),
  );
}

function setLocalizedFormValues(adminForm, fieldName, values) {
  const normalizedValues = normalizeLocalizedField(values);

  projectTranslationLanguages.forEach((language) => {
    const input = adminForm.querySelector(`[name="${fieldName}.${language}"]`);
    if (input instanceof HTMLInputElement) {
      input.value = normalizedValues[language] || "";
    }
  });
}

function resetAdminProjectForm() {
  const adminForm = document.querySelector("#adminProjectForm");
  if (!(adminForm instanceof HTMLFormElement)) {
    return;
  }

  adminForm.reset();
  const projectIdInput = adminForm.querySelector('input[name="projectId"]');
  if (projectIdInput instanceof HTMLInputElement) {
    projectIdInput.value = "";
  }

  setLocalizedFormValues(adminForm, "title", "");
  setLocalizedFormValues(adminForm, "alt", "");

  currentAdminImages = [];
  renderAdminImagePreview();
  setAdminUploadMessage("", "");

  const submitButton = adminForm.querySelector('button[type="submit"]');
  const adminCopy = getAdminPageCopy();
  setText(submitButton, adminCopy.buttons.create);
}

function fillAdminProjectForm(projectId) {
  const adminForm = document.querySelector("#adminProjectForm");
  if (!(adminForm instanceof HTMLFormElement)) {
    return;
  }

  const project = getStoredProjects().find((item) => item.id === projectId);
  if (!project) {
    return;
  }

  const projectIdInput = adminForm.querySelector('input[name="projectId"]');
  const categoryInput = adminForm.querySelector('select[name="categorySlug"]');
  const numberInput = adminForm.querySelector('input[name="number"]');
  const submitButton = adminForm.querySelector('button[type="submit"]');
  const adminCopy = getAdminPageCopy();

  if (projectIdInput instanceof HTMLInputElement) projectIdInput.value = project.id;
  setLocalizedFormValues(adminForm, "title", project.title);
  if (categoryInput instanceof HTMLSelectElement) categoryInput.value = project.categorySlug;
  setLocalizedFormValues(adminForm, "alt", project.alt);
  if (numberInput instanceof HTMLInputElement) numberInput.value = project.number;
  currentAdminImages = [...(project.images || [project.image])];
  renderAdminImagePreview();
  setAdminUploadMessage("", "");
  setText(submitButton, adminCopy.buttons.update);
}

function initializeAdminPanel() {
  if (bodyPage !== "admin") {
    return;
  }

  const adminForm = document.querySelector("#adminProjectForm");
  const adminList = document.querySelector("#adminProjectList");
  const cancelButton = document.querySelector("#adminCancelEdit");
  const imageInput = document.querySelector("#adminImageInput");
  const dropzone = document.querySelector("#adminDropzone");
  const imagePreview = document.querySelector("#adminImagePreview");
  const chooseImagesButton = document.querySelector(".admin-dropzone-button");

  if (!(adminForm instanceof HTMLFormElement) || !(adminList instanceof HTMLElement)) {
    return;
  }

  if (dropzone instanceof HTMLElement && imageInput instanceof HTMLInputElement && dropzone.dataset.bound !== "true") {
    dropzone.dataset.bound = "true";

    const chooseImages = async (files) => {
      try {
        await appendAdminImages(files);
      } catch {
        setAdminUploadMessage(getAdminPageCopy().gallery.invalid, "error");
      }
    };

    if (chooseImagesButton instanceof HTMLButtonElement) {
      chooseImagesButton.addEventListener("click", (event) => {
        event.preventDefault();
        imageInput.click();
      });
    }

    dropzone.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropzone.classList.add("is-dragover");
    });

    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("is-dragover");
    });

    dropzone.addEventListener("drop", async (event) => {
      event.preventDefault();
      dropzone.classList.remove("is-dragover");
      await chooseImages(event.dataTransfer?.files);
    });

    imageInput.addEventListener("change", async () => {
      await chooseImages(imageInput.files);
      imageInput.value = "";
    });
  }

  if (imagePreview instanceof HTMLElement && imagePreview.dataset.bound !== "true") {
    imagePreview.dataset.bound = "true";
    imagePreview.addEventListener("click", (event) => {
      const removeButton = event.target instanceof Element
        ? event.target.closest("[data-image-index]")
        : null;

      if (!(removeButton instanceof HTMLButtonElement)) {
        return;
      }

      const imageIndex = Number.parseInt(removeButton.dataset.imageIndex || "", 10);
      if (Number.isNaN(imageIndex)) {
        return;
      }

      currentAdminImages = currentAdminImages.filter((_, index) => index !== imageIndex);
      renderAdminImagePreview();
    });
  }

  if (adminForm.dataset.bound !== "true") {
    adminForm.dataset.bound = "true";

    adminForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(adminForm);
      const existingId = String(formData.get("projectId") || "").trim();
      const title = getLocalizedFormValues(adminForm, "title");
      const categorySlug = String(formData.get("categorySlug") || "exterior").trim();
      const alt = getLocalizedFormValues(adminForm, "alt");
      const number = String(formData.get("number") || "").trim();

      if (!currentAdminImages.length) {
        setAdminUploadMessage(getAdminPageCopy().gallery.required, "error");
        return;
      }

      const nextProject = normalizeProject(
        {
          id: existingId || getLocalizedProjectValue(title, "en"),
          title,
          categorySlug,
          images: currentAdminImages,
          alt,
          number,
        },
        0,
      );

      const projects = getStoredProjects();
      const updatedProjects = existingId
        ? projects.map((project) => (project.id === existingId ? nextProject : project))
        : [...projects, nextProject];

      if (!saveStoredProjects(updatedProjects)) {
        setAdminUploadMessage(getAdminPageCopy().gallery.storageLimit, "error");
        return;
      }

      resetAdminProjectForm();
      renderAdminProjectList();
    });
  }

  if (adminList.dataset.bound !== "true") {
    adminList.dataset.bound = "true";

    adminList.addEventListener("click", (event) => {
      const actionButton =
        event.target instanceof Element
          ? event.target.closest("[data-action][data-project-id]")
          : null;

      if (!(actionButton instanceof HTMLButtonElement)) {
        return;
      }

      const projectId = actionButton.dataset.projectId;
      const action = actionButton.dataset.action;

      if (!projectId || !action) {
        return;
      }

      if (action === "edit") {
        fillAdminProjectForm(projectId);
      }
    });
  }

  if (cancelButton instanceof HTMLButtonElement && cancelButton.dataset.bound !== "true") {
    cancelButton.dataset.bound = "true";
    cancelButton.addEventListener("click", resetAdminProjectForm);
  }
}

function getUrlLanguage() {
  const urlLanguage = new URL(window.location.href).searchParams.get("lang");
  return urlLanguage && translations[urlLanguage] ? urlLanguage : null;
}

function getPreferredLanguage() {
  return getUrlLanguage() || getSavedLanguage();
}

function buildLocalizedHref(href, language) {
  if (
    !href
    || href.startsWith("mailto:")
    || href.startsWith("tel:")
    || href.startsWith("#")
    || /^(?:[a-z]+:)?\/\//i.test(href)
  ) {
    return href;
  }

  const [pathAndQuery, hash = ""] = href.split("#");
  const [basePath, rawQuery = ""] = pathAndQuery.split("?");
  const params = new URLSearchParams(rawQuery);

  if (language === "en") {
    params.delete("lang");
  } else {
    params.set("lang", language);
  }

  const query = params.toString();
  return `${basePath}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}

function syncLanguageInUrl(language) {
  const currentUrl = new URL(window.location.href);

  if (language === "en") {
    currentUrl.searchParams.delete("lang");
  } else {
    currentUrl.searchParams.set("lang", language);
  }

  window.history.replaceState({}, "", currentUrl);
}

function updateLanguageAwareLinks(language) {
  document.querySelectorAll('a[href]').forEach((link) => {
    const originalHref = link.dataset.baseHref || link.getAttribute("href");

    if (!link.dataset.baseHref) {
      link.dataset.baseHref = originalHref;
    }

    link.setAttribute("href", buildLocalizedHref(originalHref, language));
  });
}

function setText(element, value) {
  if (element && value !== undefined) {
    element.textContent = value;
  }
}

function setHtml(element, value) {
  if (element && value !== undefined) {
    element.innerHTML = value;
  }
}

function setAttr(element, attribute, value) {
  if (element && value !== undefined) {
    element.setAttribute(attribute, value);
  }
}

function setNodeTextList(nodeList, values) {
  nodeList.forEach((node, index) => {
    if (values[index] !== undefined) {
      node.textContent = values[index];
    }
  });
}

function getCategoryPageCopy() {
  const categoryKey = document.body.dataset.category;
  const languageCopy = categoryPageTranslations[currentLanguage] || categoryPageTranslations.en;
  return languageCopy.categories[categoryKey] || categoryPageTranslations.en.categories[categoryKey];
}

function applyCategoryLinkText() {
  const languageCopy = categoryPageTranslations[currentLanguage] || categoryPageTranslations.en;

  document.querySelectorAll(".card-link, .category-heading-link").forEach((link) => {
    setText(link, languageCopy.openCategoryPage);
  });
}

function applyLanguageOptionLabels(language) {
  if (!(languageSelect instanceof HTMLSelectElement)) {
    return;
  }

  const labels = localizedLanguageNames[language] || localizedLanguageNames.en;

  Array.from(languageSelect.options).forEach((option) => {
    if (labels[option.value]) {
      option.textContent = labels[option.value];
    }
  });

  renderLanguageDropdown();
}

function closeLanguageDropdown() {
  if (languageDropdownTrigger && languageDropdownMenu) {
    languageDropdownTrigger.setAttribute("aria-expanded", "false");
    languageDropdownMenu.classList.remove("is-open");

    window.clearTimeout(languageDropdownHideTimer);
    languageDropdownHideTimer = window.setTimeout(() => {
      if (languageDropdownTrigger?.getAttribute("aria-expanded") !== "true") {
        languageDropdownMenu.hidden = true;
      }
    }, 180);
  }
}

function getLanguageDropdownOptions() {
  if (!(languageDropdownMenu instanceof HTMLDivElement)) {
    return [];
  }

  return Array.from(languageDropdownMenu.querySelectorAll(".language-dropdown-option"));
}

function focusLanguageOption(index) {
  const options = getLanguageDropdownOptions();
  const nextOption = options[index];

  if (nextOption instanceof HTMLButtonElement) {
    nextOption.focus();
  }
}

function openLanguageDropdown() {
  if (languageDropdownTrigger && languageDropdownMenu) {
    window.clearTimeout(languageDropdownHideTimer);
    languageDropdownTrigger.setAttribute("aria-expanded", "true");
    languageDropdownMenu.hidden = false;
    languageDropdownMenu.classList.add("is-open");

    const selectedIndex = getLanguageDropdownOptions().findIndex((option) =>
      option.classList.contains("is-selected"),
    );

    window.requestAnimationFrame(() => {
      focusLanguageOption(selectedIndex >= 0 ? selectedIndex : 0);
    });
  }
}

function toggleLanguageDropdown() {
  if (!(languageDropdownTrigger && languageDropdownMenu)) {
    return;
  }

  const isOpen = languageDropdownTrigger.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeLanguageDropdown();
  } else {
    openLanguageDropdown();
  }
}

function renderLanguageDropdown() {
  if (
    !(languageSelect instanceof HTMLSelectElement) ||
    !(languageDropdownTrigger instanceof HTMLButtonElement) ||
    !(languageDropdownMenu instanceof HTMLDivElement)
  ) {
    return;
  }

  const activeOption = Array.from(languageSelect.options).find(
    (option) => option.value === languageSelect.value,
  );

  languageDropdownTrigger.querySelector("span").textContent =
    activeOption?.textContent || "";

  languageDropdownMenu.innerHTML = "";

  Array.from(languageSelect.options).forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "language-dropdown-option";
    optionButton.setAttribute("role", "option");
    optionButton.dataset.value = option.value;
    optionButton.textContent = option.textContent;
    optionButton.tabIndex = -1;

    if (option.value === languageSelect.value) {
      optionButton.classList.add("is-selected");
      optionButton.setAttribute("aria-selected", "true");
    } else {
      optionButton.setAttribute("aria-selected", "false");
    }

    optionButton.addEventListener("click", () => {
      languageSelect.value = option.value;
      languageSelect.dispatchEvent(new Event("change", { bubbles: true }));
      closeLanguageDropdown();
    });

    languageDropdownMenu.append(optionButton);
  });
}

function initializeLanguageDropdown() {
  if (!(languageSelect instanceof HTMLSelectElement)) {
    return;
  }

  if (languageSelect.dataset.enhanced === "true") {
    renderLanguageDropdown();
    return;
  }

  languageSelect.dataset.enhanced = "true";
  languageSelect.classList.add("language-select-native");

  const dropdown = document.createElement("div");
  dropdown.className = "language-dropdown";
  languageDropdownRoot = dropdown;

  languageDropdownTrigger = document.createElement("button");
  languageDropdownTrigger.type = "button";
  languageDropdownTrigger.className = "language-dropdown-trigger";
  languageDropdownTrigger.setAttribute("aria-haspopup", "listbox");
  languageDropdownTrigger.setAttribute("aria-expanded", "false");
  languageDropdownTrigger.setAttribute("aria-controls", "languageDropdownMenu");
  languageDropdownTrigger.innerHTML = '<span></span><i aria-hidden="true"></i>';

  languageDropdownMenu = document.createElement("div");
  languageDropdownMenu.id = "languageDropdownMenu";
  languageDropdownMenu.className = "language-dropdown-menu";
  languageDropdownMenu.setAttribute("role", "listbox");
  languageDropdownMenu.hidden = true;

  languageDropdownTrigger.addEventListener("click", toggleLanguageDropdown);

  languageDropdownTrigger.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "ArrowDown" ||
      event.key === "ArrowUp"
    ) {
      event.preventDefault();
      openLanguageDropdown();

      if (event.key === "ArrowUp") {
        const options = getLanguageDropdownOptions();
        focusLanguageOption(Math.max(options.length - 1, 0));
      }
    }
  });

  languageDropdownMenu.addEventListener("keydown", (event) => {
    const options = getLanguageDropdownOptions();
    const currentIndex = options.findIndex((option) => option === document.activeElement);

    if (event.key === "Escape") {
      event.preventDefault();
      closeLanguageDropdown();
      languageDropdownTrigger.focus();
      return;
    }

    if (event.key === "Tab") {
      closeLanguageDropdown();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusLanguageOption((currentIndex + 1 + options.length) % options.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusLanguageOption((currentIndex - 1 + options.length) % options.length);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusLanguageOption(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusLanguageOption(options.length - 1);
    }
  });

  document.addEventListener("click", (event) => {
    if (languageDropdownRoot && !languageDropdownRoot.contains(event.target)) {
      closeLanguageDropdown();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLanguageDropdown();
    }
  });

  dropdown.append(languageDropdownTrigger, languageDropdownMenu);
  languageSelect.insertAdjacentElement("afterend", dropdown);
  renderLanguageDropdown();
}

function applyProjectCards(projects) {
  document.querySelectorAll(".project-card").forEach((card, index) => {
    const projectIndex = Number.parseInt(card.dataset.projectIndex ?? `${index}`, 10);
    const project = projects[Number.isNaN(projectIndex) ? index : projectIndex];

    if (!project) {
      return;
    }

    setText(card.querySelector("h3"), project.title);
    setText(card.querySelector(".project-copy p"), card.dataset.categoryLabel || project.category);
    setAttr(card.querySelector("img"), "alt", project.alt);
  });
}

function applyServiceCards(services) {
  document.querySelectorAll(".service-card").forEach((card, index) => {
    if (card.dataset.staticContent === "true") {
      return;
    }

    const serviceIndex = Number.parseInt(card.dataset.serviceIndex ?? `${index}`, 10);
    const service = services[Number.isNaN(serviceIndex) ? index : serviceIndex];

    if (!service) {
      return;
    }

    setText(card.querySelector("h3"), service.title);
    setText(card.querySelector("p"), service.description);
  });
}

function applyFooter(copy) {
  setText(document.querySelector(".footer-grid > div:first-child > p"), copy.footer.tagline);

  const footerTitles = document.querySelectorAll(".footer-title");
  setNodeTextList(footerTitles, [copy.footer.menu, copy.footer.contact]);

  const footerMenuLinks = document.querySelectorAll(".footer-grid > div:nth-child(2) a");
  setNodeTextList(footerMenuLinks, copy.nav);

  setText(document.querySelector(".footer-grid > div:nth-child(3) p:last-child"), copy.footer.location);
  setAttr(document.querySelector(".footer-preview img"), "alt", copy.footer.featuredResidenceAlt);
}

function applyFormTranslations(copy) {
  if (!(contactForm instanceof HTMLFormElement)) {
    return;
  }

  setText(contactForm.querySelector(".contact-form-kicker"), copy.form.kicker);
  setText(contactForm.querySelector(".contact-form-heading strong"), copy.form.heading);

  const labelTexts = contactForm.querySelectorAll("label > span");
  setNodeTextList(labelTexts, copy.form.labels);

  const nameInput = contactForm.querySelector('input[name="name"]');
  const emailInput = contactForm.querySelector('input[name="email"]');
  const projectInput = contactForm.querySelector('input[name="project"]');
  const timelineInput = contactForm.querySelector('input[name="timeline"]');
  const messageInput = contactForm.querySelector('textarea[name="message"]');
  const subjectInput = contactForm.querySelector('input[name="_subject"]');
  const submitButton = contactForm.querySelector('button[type="submit"]');

  setAttr(nameInput, "placeholder", copy.form.placeholders.name);
  setAttr(emailInput, "placeholder", copy.form.placeholders.email);
  setAttr(projectInput, "placeholder", copy.form.placeholders.project);
  setAttr(timelineInput, "placeholder", copy.form.placeholders.timeline);
  setAttr(messageInput, "placeholder", copy.form.placeholders.message);

  if (subjectInput instanceof HTMLInputElement) {
    subjectInput.value = copy.form.subject;
  }

  if (submitButton instanceof HTMLButtonElement && !submitButton.disabled) {
    submitButton.textContent = copy.form.submit;
  }

  if (formNote && formNote.dataset.state !== "success" && formNote.dataset.state !== "error") {
    formNote.textContent = copy.form.defaultNote;
  }

  const contactEmail = document.querySelector(".contact-detail-email");
  const contactPhone = document.querySelector(".contact-detail-phone");
  const contactStudio = document.querySelector(".contact-detail-studio");

  [
    [contactEmail, copy.form.detailLabels.email],
    [contactPhone, copy.form.detailLabels.phone],
    [contactStudio, copy.form.detailLabels.studio],
  ].forEach(([card, value]) => {
    if (card) {
      const spans = card.querySelectorAll("span");
      if (spans[1]) {
        spans[1].textContent = value;
      }
    }
  });

  setText(contactStudio?.querySelector("p"), copy.form.studioAddress);
}

function applyCommon(copy) {
  initializeLanguageDropdown();
  document.documentElement.lang = copy === translations.zh ? "zh-Hans" : currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  syncLanguageInUrl(currentLanguage);
  updateLanguageAwareLinks(currentLanguage);

  document.querySelectorAll(".brand").forEach((brandLink) => {
    setAttr(brandLink, "aria-label", copy.homeAria);
  });

  if (navToggle) {
    setAttr(navToggle, "aria-label", copy.openMenu);
  }

  const languageLabel = document.querySelector(".sr-only");
  setText(languageLabel, copy.languageLabel);
  setAttr(languageSelect, "aria-label", copy.languageLabel);

  if (languageSelect instanceof HTMLSelectElement) {
    languageSelect.value = currentLanguage;
  }

  applyLanguageOptionLabels(currentLanguage);

  setNodeTextList(document.querySelectorAll(".nav-links a"), copy.nav);
  applyFooter(copy);
  applyFormTranslations(copy);
  applyCategoryLinkText();
}

function applyHomePage(copy) {
  document.title = copy.home.title;
  setAttr(document.querySelector('meta[name="description"]'), "content", copy.home.description);

  setText(document.querySelector(".hero-eyebrow"), copy.home.heroEyebrow);
  setHtml(document.querySelector(".hero h1"), copy.home.heroTitle);
  setText(document.querySelector(".hero-text"), copy.home.heroText);
  setText(document.querySelector(".hero-link"), copy.home.heroLink);

  const sectionHeading = document.querySelector(".projects .section-heading");
  if (sectionHeading) {
    setText(sectionHeading.querySelector(".eyebrow"), copy.home.selectedProjects);
    setHtml(sectionHeading.querySelector("h2"), copy.home.projectsHeading);
    setText(sectionHeading.querySelector(".inline-link"), copy.home.discussProject);
  }

  renderHomeProjects();
  initializeHomeProjectCategoryNavigation();

  const aboutSection = document.querySelector(".about-copy");
  if (aboutSection) {
    setText(aboutSection.querySelector(".eyebrow"), copy.home.aboutEyebrow);
    setHtml(aboutSection.querySelector("h2"), copy.home.aboutHeading);
    const aboutParagraphs = aboutSection.querySelectorAll(':scope > p:not(.eyebrow)');
    setNodeTextList(aboutParagraphs, copy.home.aboutParagraphs);
    setText(aboutSection.querySelector(".button"), copy.home.aboutButton);
  }

  setText(document.querySelector(".glass-card p"), copy.home.yearsOfPractice);
  setAttr(document.querySelector(".about-visual img"), "alt", copy.home.aboutImageAlt);

  const servicesHeading = document.querySelector(".services .section-heading");
  if (servicesHeading) {
    setText(servicesHeading.querySelector(".eyebrow"), copy.home.servicesEyebrow);
    setText(servicesHeading.querySelector("h2"), copy.home.servicesHeading);
  }

  applyServiceCards(getCategoryServiceCards());

  const contactCopy = document.querySelector(".contact-copy");
  if (contactCopy) {
    setText(contactCopy.querySelector(".eyebrow"), copy.home.contactEyebrow);
    setText(contactCopy.querySelector("h2"), copy.home.contactHeading);
    const textNode = contactCopy.querySelector(':scope > p:not(.eyebrow)');
    setText(textNode, copy.home.contactText);
  }
}

function applyProjectsPage(copy) {
  document.title = copy.projectsPage.title;
  setAttr(document.querySelector('meta[name="description"]'), "content", copy.projectsPage.description);

  setText(document.querySelector(".page-hero .eyebrow"), copy.projectsPage.heroEyebrow);
  setText(document.querySelector(".page-hero h1"), copy.projectsPage.heroHeading);
  setText(document.querySelector(".page-hero .hero-text"), copy.projectsPage.heroText);

  const sectionHeading = document.querySelector("main .section-heading");
  if (sectionHeading) {
    setText(sectionHeading.querySelector(".eyebrow"), copy.projectsPage.portfolioEyebrow);
    setHtml(sectionHeading.querySelector("h2"), copy.projectsPage.portfolioHeading);
    setText(sectionHeading.querySelector(".inline-link"), copy.projectsPage.portfolioLink);
  }

  renderProjectsPageContent();
}

function applyAboutPage(copy) {
  document.title = copy.aboutPage.title;
  setAttr(document.querySelector('meta[name="description"]'), "content", copy.aboutPage.description);

  const heroContent = document.querySelector(".page-hero-content");
  if (heroContent) {
    setText(heroContent.querySelector(".eyebrow"), copy.aboutPage.heroEyebrow);
    setText(heroContent.querySelector("h1"), copy.aboutPage.heroHeading);
    setText(heroContent.querySelector(".hero-text"), copy.aboutPage.heroText);
  }

  const aboutCopy = document.querySelector(".about-copy");
  if (aboutCopy) {
    setText(aboutCopy.querySelector(".eyebrow"), copy.aboutPage.sectionEyebrow);
    setText(aboutCopy.querySelector("h2"), copy.aboutPage.sectionHeading);
    const paragraphs = aboutCopy.querySelectorAll(':scope > p:not(.eyebrow)');
    setNodeTextList(paragraphs, copy.aboutPage.paragraphs);
    setText(aboutCopy.querySelector(".about-socials-title"), copy.aboutPage.socialLabel);
    aboutCopy.querySelectorAll(".social-link").forEach((link) => {
      const socialKey = link.dataset.social;
      if (socialKey && copy.aboutPage.socialLinks?.[socialKey]) {
        link.textContent = copy.aboutPage.socialLinks[socialKey];
      }
    });
  }

  setText(document.querySelector(".glass-card p"), copy.aboutPage.yearsOfPractice);
  setAttr(document.querySelector(".about-visual img"), "alt", copy.aboutPage.imageAlt);
}

function applyServicesPage(copy) {
  document.title = copy.servicesPage.title;
  setAttr(document.querySelector('meta[name="description"]'), "content", copy.servicesPage.description);

  const heroContent = document.querySelector(".page-hero-content");
  if (heroContent) {
    setText(heroContent.querySelector(".eyebrow"), copy.servicesPage.heroEyebrow);
    setText(heroContent.querySelector("h1"), copy.servicesPage.heroHeading);
    setText(heroContent.querySelector(".hero-text"), copy.servicesPage.heroText);
  }

  applyServiceCards(copy.servicesPage.services);
}

function applyContactPage(copy) {
  document.title = copy.contactPage.title;
  setAttr(document.querySelector('meta[name="description"]'), "content", copy.contactPage.description);

  const heroContent = document.querySelector(".page-hero-content");
  if (heroContent) {
    setText(heroContent.querySelector(".eyebrow"), copy.contactPage.heroEyebrow);
    setHtml(heroContent.querySelector("h1"), copy.contactPage.heroHeading);
    setText(heroContent.querySelector(".hero-text"), copy.contactPage.heroText);
  }

  const contactCopy = document.querySelector(".contact-copy");
  if (contactCopy) {
    setText(contactCopy.querySelector(".eyebrow"), copy.contactPage.sectionEyebrow);
    setText(contactCopy.querySelector("h2"), copy.contactPage.sectionHeading);
    const textNode = contactCopy.querySelector(':scope > p:not(.eyebrow)');
    setText(textNode, copy.contactPage.sectionText);
  }
}

function applyCategoryPage() {
  const categoryCopy = getCategoryPageCopy();

  if (!categoryCopy) {
    return;
  }

  document.title = categoryCopy.title;
  setAttr(document.querySelector('meta[name="description"]'), "content", categoryCopy.description);

  const heroContent = document.querySelector(".page-hero-content");
  if (heroContent) {
    setText(heroContent.querySelector(".eyebrow"), categoryCopy.heroEyebrow);
    setText(heroContent.querySelector("h1"), categoryCopy.heroTitle);
    setText(heroContent.querySelector(".hero-text"), categoryCopy.heroText);
  }

  const categoryCopyBlock = document.querySelector(".category-copy");
  if (categoryCopyBlock) {
    setText(categoryCopyBlock.querySelector(".eyebrow"), categoryCopy.overviewEyebrow);
    setHtml(categoryCopyBlock.querySelector("h2"), categoryCopy.overviewHeading);
    setText(categoryCopyBlock.querySelector(':scope > p:not(.eyebrow)'), categoryCopy.overviewText);
    setText(categoryCopyBlock.querySelector(".inline-link"), categoryCopy.cta);
  }

  const serviceCard = document.querySelector(".category-service-card");
  if (serviceCard) {
    setText(serviceCard.querySelector("h3"), categoryCopy.serviceTitle);
    setText(serviceCard.querySelector("p"), categoryCopy.serviceDescription);
  }

  const relatedHeading = document.querySelector("main .section:nth-of-type(2) .section-heading");
  if (relatedHeading) {
    setText(relatedHeading.querySelector(".eyebrow"), categoryCopy.relatedEyebrow);
    setHtml(relatedHeading.querySelector("h2"), categoryCopy.relatedHeading);
    setText(relatedHeading.querySelector(".inline-link"), categoryCopy.allProjects);
  }

  renderCategoryProjects();
}

function applyAdminPage() {
  const adminCopy = getAdminPageCopy();
  document.title = adminCopy.title;
  setAttr(document.querySelector('meta[name="description"]'), "content", adminCopy.description);

  setText(document.querySelector(".admin-eyebrow"), adminCopy.eyebrow);
  setText(document.querySelector(".admin-heading"), adminCopy.heading);
  setText(document.querySelector(".admin-note"), adminCopy.note);
  setText(document.querySelector(".admin-form-title"), adminCopy.formTitle);
  setText(document.querySelector(".admin-list-title"), adminCopy.listTitle);

  const categoryInput = document.querySelector('select[name="categorySlug"]');
  const numberInput = document.querySelector('input[name="number"]');
  const staticLabels = document.querySelectorAll(".admin-field-label-static");

  setNodeTextList(staticLabels, [
    adminCopy.labels.category,
    adminCopy.labels.images,
    adminCopy.labels.number,
  ]);

  renderLocalizedAdminFields(
    "title",
    "#adminTitleTranslations",
    adminCopy.labels.title,
    adminCopy.localizedFields.title,
    adminCopy.placeholders.title,
  );
  renderLocalizedAdminFields(
    "alt",
    "#adminAltTranslations",
    adminCopy.labels.alt,
    adminCopy.localizedFields.alt,
    adminCopy.placeholders.alt,
  );

  setAttr(numberInput, "placeholder", adminCopy.placeholders.number);

  setText(document.querySelector(".admin-dropzone-title"), adminCopy.gallery.dropTitle);
  setText(document.querySelector(".admin-dropzone-hint"), adminCopy.gallery.dropHint);
  setText(document.querySelector(".admin-dropzone-button"), adminCopy.gallery.choose);
  setText(document.querySelector(".admin-gallery-note"), adminCopy.gallery.help);

  if (categoryInput instanceof HTMLSelectElement) {
    categoryInput.innerHTML = categoryOrder
      .map((slug) => `<option value="${escapeHtml(slug)}">${escapeHtml(getCategoryLabel(slug))}</option>`)
      .join("");
  }

  setText(document.querySelector("#adminCancelEdit"), adminCopy.buttons.cancel);
  if (!document.querySelector('input[name="projectId"]')?.value) {
    setText(document.querySelector('#adminProjectForm button[type="submit"]'), adminCopy.buttons.create);
  }

  renderAdminImagePreview();
  renderAdminProjectList();
  initializeAdminPanel();
}

function applyTranslations(language) {
  currentLanguage = translations[language] ? language : "en";
  const copy = translations[currentLanguage];

  applyCommon(copy);

  if (bodyPage === "home") {
    applyHomePage(copy);
  } else if (bodyPage === "projects") {
    applyProjectsPage(copy);
  } else if (bodyPage === "about") {
    applyAboutPage(copy);
  } else if (bodyPage === "services") {
    applyServicesPage(copy);
  } else if (bodyPage === "contact") {
    applyContactPage(copy);
  } else if (bodyPage === "category") {
    applyCategoryPage();
  } else if (bodyPage === "admin") {
    applyAdminPage();
  }
}

function initializeCategoryFilters() {
  if (document.body.dataset.categoryNavigationBound !== "true") {
    document.body.dataset.categoryNavigationBound = "true";

    document.addEventListener("click", (event) => {
      const button = event.target instanceof Element
        ? event.target.closest(".category-pill[data-category-slug]")
        : null;

      if (!(button instanceof HTMLButtonElement)) {
        return;
      }

      const categorySlug = String(button.dataset.categorySlug || "").trim();

      if (!categorySlug) {
        return;
      }

      window.location.href = buildLocalizedHref(getCategoryPageHref(categorySlug), currentLanguage);
    });
  }

  document.querySelectorAll(".category-pills").forEach((filterGroup) => {
    syncCategoryPillGroup(filterGroup);
  });

  ensureMobileCategoryNavbar();
}

function initializeHomeProjectCategoryNavigation() {
  if (bodyPage !== "home") {
    return;
  }

  document.querySelectorAll(".projects .project-card[data-category-href]").forEach((card) => {
    if (card.dataset.navigationBound === "true") {
      return;
    }

    card.dataset.navigationBound = "true";
    card.classList.add("project-card-clickable");
    card.tabIndex = 0;
    card.setAttribute("role", "link");

    const navigateToCategory = () => {
      const targetHref = card.dataset.categoryHref;

      if (!targetHref) {
        return;
      }

      window.location.href = buildLocalizedHref(targetHref, currentLanguage);
    };

    card.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a, button")) {
        return;
      }

      navigateToCategory();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      navigateToCategory();
    });
  });
}

function setProjectCardActiveMedia(card, nextIndex) {
  const slides = Array.from(card.querySelectorAll(".project-media-slide"));
  const dots = Array.from(card.querySelectorAll(".project-media-dot"));

  if (!slides.length) {
    return;
  }

  const normalizedIndex = Math.max(0, Math.min(nextIndex, slides.length - 1));
  card.dataset.activeMediaIndex = String(normalizedIndex);

  slides.forEach((slide, index) => {
    const isActive = index === normalizedIndex;
    slide.classList.toggle("is-active", isActive);
    slide.hidden = !isActive;
  });

  dots.forEach((dot, index) => {
    const isActive = index === normalizedIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });
}

function initializeProjectMediaControls() {
  if (document.body.dataset.projectMediaBound === "true") {
    return;
  }

  document.body.dataset.projectMediaBound = "true";

  document.addEventListener("click", (event) => {
    const trigger = event.target instanceof Element
      ? event.target.closest(".project-media-dot[data-media-target]")
      : null;

    if (!(trigger instanceof HTMLButtonElement)) {
      return;
    }

    const card = trigger.closest(".project-card");

    if (!(card instanceof HTMLElement)) {
      return;
    }

    const nextIndex = Number.parseInt(trigger.dataset.mediaTarget || "0", 10);
    setProjectCardActiveMedia(card, Number.isNaN(nextIndex) ? 0 : nextIndex);
  });
}

function initializeProjectModal() {
  if (document.body.dataset.projectModalBound === "true") {
    return;
  }

  document.body.dataset.projectModalBound = "true";
  ensureProjectModal();

  document.addEventListener("click", (event) => {
    const card = event.target instanceof Element
      ? event.target.closest(".project-card[data-project-modal='true']")
      : null;

    if (!(card instanceof HTMLElement)) {
      return;
    }

    if (event.target instanceof Element && event.target.closest("button, a, iframe")) {
      return;
    }

    const activeIndex = Number.parseInt(card.dataset.activeMediaIndex || "0", 10);
    openProjectModal(card.dataset.projectId || "", Number.isNaN(activeIndex) ? 0 : activeIndex);
  });

  document.addEventListener("keydown", (event) => {
    const card = event.target instanceof Element
      ? event.target.closest(".project-card[data-project-modal='true']")
      : null;

    if (card instanceof HTMLElement && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      const activeIndex = Number.parseInt(card.dataset.activeMediaIndex || "0", 10);
      openProjectModal(card.dataset.projectId || "", Number.isNaN(activeIndex) ? 0 : activeIndex);
      return;
    }

    if (!activeProjectModalState) {
      return;
    }

    if (event.key === "Escape") {
      closeProjectModal();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      navigateProjectModal(1);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigateProjectModal(-1);
    }
  });
}

function initializeProjectMediaSwipe() {
  if (document.body.dataset.projectMediaSwipeBound === "true") {
    return;
  }

  document.body.dataset.projectMediaSwipeBound = "true";

  const setTouchStart = (surface, touch) => {
    surface.dataset.touchStartX = String(touch.clientX);
    surface.dataset.touchStartY = String(touch.clientY);
  };

  const clearTouchStart = (surface) => {
    delete surface.dataset.touchStartX;
    delete surface.dataset.touchStartY;
  };

  document.addEventListener("touchstart", (event) => {
    const surface = event.target instanceof Element
      ? event.target.closest(".project-media-stack, .project-modal-stage")
      : null;

    if (!(surface instanceof HTMLElement) || event.touches.length !== 1) {
      return;
    }

    setTouchStart(surface, event.touches[0]);
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    const surface = event.target instanceof Element
      ? event.target.closest(".project-media-stack, .project-modal-stage")
      : null;

    if (!(surface instanceof HTMLElement) || event.changedTouches.length !== 1) {
      return;
    }

    const startX = Number.parseFloat(surface.dataset.touchStartX || "NaN");
    const startY = Number.parseFloat(surface.dataset.touchStartY || "NaN");
    clearTouchStart(surface);

    if (Number.isNaN(startX) || Number.isNaN(startY)) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
      return;
    }

    if (surface.classList.contains("project-modal-stage")) {
      if (!activeProjectModalState || activeProjectModalState.mediaItems.length < 2) {
        return;
      }

      const direction = deltaX < 0 ? 1 : -1;
      const nextIndex = (activeProjectModalState.activeIndex + direction + activeProjectModalState.mediaItems.length)
        % activeProjectModalState.mediaItems.length;
      setProjectModalActiveMedia(nextIndex);
      return;
    }

    const card = surface.closest(".project-card");
    if (!(card instanceof HTMLElement)) {
      return;
    }

    const slides = card.querySelectorAll(".project-media-slide");
    if (slides.length < 2) {
      return;
    }

    const activeIndex = Number.parseInt(card.dataset.activeMediaIndex || "0", 10);
    const direction = deltaX < 0 ? 1 : -1;
    const nextIndex = (activeIndex + direction + slides.length) % slides.length;
    setProjectCardActiveMedia(card, nextIndex);
  }, { passive: true });
}

function getSavedLanguage() {
  const savedLanguage = window.localStorage.getItem(languageStorageKey);
  return savedLanguage && translations[savedLanguage] ? savedLanguage : "en";
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (languageSelect instanceof HTMLSelectElement) {
  languageSelect.addEventListener("change", (event) => {
    const nextLanguage = event.target.value;
    window.localStorage.setItem(languageStorageKey, nextLanguage);
    applyTranslations(nextLanguage);
  });
}

if (contactForm instanceof HTMLFormElement && formNote) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const copy = translations[currentLanguage] || translations.en;
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = copy.form.sending;
    }

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      contactForm.reset();
      formNote.dataset.state = "success";
      formNote.textContent = copy.form.success;
    } catch {
      formNote.dataset.state = "error";
      formNote.textContent = copy.form.failure;
    } finally {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = copy.form.submit;
      }
    }
  });
}

const initialLanguage = getPreferredLanguage();
currentLanguage = initialLanguage;
window.localStorage.setItem(languageStorageKey, initialLanguage);
applyTranslations(initialLanguage);
initializeCategoryFilters();
initializeHomeProjectCategoryNavigation();
initializeProjectMediaControls();
initializeProjectModal();
initializeProjectMediaSwipe();
initializeAdminPanel();
loadProjectsFromRepository().then(() => {
  applyTranslations(currentLanguage);
  initializeHomeProjectCategoryNavigation();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.16,
  },
);

document
  .querySelectorAll(
    ".project-card, .service-card, .about-copy, .about-visual, .contact-copy, .contact-form",
  )
  .forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });