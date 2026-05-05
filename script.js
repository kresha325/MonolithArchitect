const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const languageSelect = document.querySelector("#languageSelect");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");
const bodyPage = document.body.dataset.page;
const languageStorageKey = "monolith-language";
let languageDropdownTrigger = null;
let languageDropdownMenu = null;
let languageDropdownRoot = null;
let languageDropdownHideTimer = null;

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
    footer: {
      tagline: "We create exceptional spaces that feel calm, bold, and enduring.",
      menu: "Menu",
      contact: "Contact",
      location: "Tirana, Albania",
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
      studioAddress: "Rr. e Kavajes, Tirana, Albania",
      submit: "Submit Inquiry",
      defaultNote: "Submit and your inquiry will be sent directly to our inbox.",
      sending: "Sending...",
      success: "Thank you. Your inquiry was sent successfully.",
      failure:
        "Submission failed. Please try again or email monolitharchitects6@gmail.com.",
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
      heroEyebrow: "Tirana Based Architecture Studio",
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
    footer: {
      tagline: "Krijojme hapesira te vecanta, me qetesi, karakter dhe elegance qe zgjat.",
      menu: "Menu",
      contact: "Kontakt",
      location: "Tirane, Shqiperi",
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
      studioAddress: "Rr. e Kavajes, Tirane, Shqiperi",
      submit: "Dergo kerkesen",
      defaultNote: "Dergoni kerkesen tuaj dhe ajo do te vije direkt ne inbox-in tone.",
      sending: "Duke derguar...",
      success: "Faleminderit. Kerkesa juaj u dergua me sukses.",
      failure: "Dergimi nuk u realizua. Ju lutem provoni serish ose na shkruani ne monolitharchitects6@gmail.com.",
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
      heroEyebrow: "Studio Arkitekture me Baze ne Tirane",
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
    footer: {
      tagline:
        "Nous créons des espaces d'exception, calmes, audacieux et durables.",
      menu: "Menu",
      contact: "Contact",
      location: "Tirana, Albanie",
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
      studioAddress: "Rr. e Kavajes, Tirana, Albanie",
      submit: "Envoyer la demande",
      defaultNote: "Envoyez votre demande et elle arrivera directement dans notre boîte mail.",
      sending: "Envoi en cours...",
      success: "Merci. Votre demande a bien été envoyée.",
      failure:
        "Échec de l'envoi. Veuillez réessayer ou écrire à monolitharchitects6@gmail.com.",
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
      heroEyebrow: "Studio d'architecture basé à Tirana",
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
    footer: {
      tagline:
        "Wir schaffen außergewöhnliche Räume, die ruhig, markant und dauerhaft wirken.",
      menu: "Menü",
      contact: "Kontakt",
      location: "Tirana, Albanien",
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
      studioAddress: "Rr. e Kavajes, Tirana, Albanien",
      submit: "Anfrage senden",
      defaultNote: "Senden Sie Ihre Anfrage, und sie wird direkt an unser Postfach übermittelt.",
      sending: "Wird gesendet...",
      success: "Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.",
      failure:
        "Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie an monolitharchitects6@gmail.com.",
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
      heroEyebrow: "Architekturstudio aus Tirana",
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
    footer: {
      tagline:
        "Мы создаём исключительные пространства, спокойные, выразительные и долговечные.",
      menu: "Меню",
      contact: "Контакты",
      location: "Тирана, Албания",
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
      studioAddress: "Rr. e Kavajes, Тирана, Албания",
      submit: "Отправить запрос",
      defaultNote: "Отправьте запрос, и он будет доставлен прямо в наш почтовый ящик.",
      sending: "Отправка...",
      success: "Спасибо. Ваш запрос успешно отправлен.",
      failure:
        "Не удалось отправить. Попробуйте ещё раз или напишите на monolitharchitects6@gmail.com.",
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
      heroEyebrow: "Архитектурная студия в Тиране",
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
    footer: {
      tagline: "نصمم مساحات استثنائية تبدو هادئة وجريئة وخالدة.",
      menu: "القائمة",
      contact: "اتصال",
      location: "تيرانا، ألبانيا",
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
      studioAddress: "Rr. e Kavajes، تيرانا، ألبانيا",
      submit: "إرسال الطلب",
      defaultNote: "أرسل طلبك وسيصل مباشرة إلى بريدنا الإلكتروني.",
      sending: "جارٍ الإرسال...",
      success: "شكرًا لك. تم إرسال طلبك بنجاح.",
      failure:
        "فشل الإرسال. يرجى المحاولة مرة أخرى أو مراسلتنا على monolitharchitects6@gmail.com.",
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
      heroEyebrow: "استوديو عمارة مقره تيرانا",
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
    footer: {
      tagline: "我们打造平静、大胆且经久耐看的卓越空间。",
      menu: "菜单",
      contact: "联系",
      location: "地拉那，阿尔巴尼亚",
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
      studioAddress: "Rr. e Kavajes，地拉那，阿尔巴尼亚",
      submit: "提交咨询",
      defaultNote: "提交后，您的咨询将直接发送到我们的邮箱。",
      sending: "发送中...",
      success: "谢谢，您的咨询已成功发送。",
      failure: "提交失败。请重试，或发送邮件至 monolitharchitects6@gmail.com。",
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
      heroEyebrow: "地拉那建筑设计工作室",
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

let currentLanguage = "en";

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
    const project = projects[index];

    if (!project) {
      return;
    }

    setText(card.querySelector("h3"), project.title);
    setText(card.querySelector(".project-copy p"), project.category);
    setAttr(card.querySelector("img"), "alt", project.alt);
  });
}

function applyServiceCards(services) {
  document.querySelectorAll(".service-card").forEach((card, index) => {
    const service = services[index];

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

  applyProjectCards(copy.projects);

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

  applyServiceCards(copy.home.services);

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

  applyProjectCards(copy.projects);
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
  }
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
window.localStorage.setItem(languageStorageKey, initialLanguage);
applyTranslations(initialLanguage);

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