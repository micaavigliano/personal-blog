export type TranslationKey = keyof typeof translations["en"]

export const translations = {
  en: {
    // Navigation
    "nav.skip": "Skip to main content",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.book": "Book a Call",
    "nav.home": "Home",
    "nav.extraInfo": "Use arrow keys to navigate, Enter to select, Escape to close",
    "nav.mobile.menu.close": "Close menu",
    "nav.mobile.menu.open": "Open menu",
    "nav.mobile.menu": "Mobile navigation",
    "nav.mobile.close": "Close navigation menu",

    // Hero Section
    "hero.greeting": "Hello, I am",
    "hero.title.main": "Frontend Developer",
    "hero.title.sub": "& Accessibility Analyst",
    "hero.description":
      "I create inclusive digital experiences that work beautifully for everyone. Specializing in accessible frontend development and WCAG compliance. ♿✨",
    "hero.cta.work": "View My Work",
    "hero.cta.blog": "Read My Blog",
    "hero.mission": "Made with care for everyone",

    // About Section
    "about.title": "About Me",
    "about.description":
      "I'm a passionate frontend developer and accessibility analyst who believes that great design and inclusive code go hand in hand. With 6+ years of experience, I love turning complex problems into simple, beautiful solutions that work for everyone.",
    "about.mission.title": "My Mission",
    "about.mission.p1":
      "I believe the web should be accessible to everyone, regardless of their abilities. As a frontend developer and accessibility analyst, I bridge the gap between beautiful design and inclusive functionality.",
    "about.mission.p2":
      "My expertise spans WCAG compliance, screen reader optimization, keyboard navigation, and creating delightful user experiences that work for users with diverse needs and assistive technologies.",
    "about.mission": "Accessibility is not a feature, it's a foundation",

    // Skills
    "skills.frontend.title": "Frontend Development",
    "skills.frontend.desc": "React, Next.js, TypeScript, Modern CSS",
    "skills.accessibility.title": "Accessibility Analysis",
    "skills.accessibility.desc": "WCAG 2.1/2.2, ARIA, Screen readers, Auditing",
    "skills.design.title": "Inclusive Design",
    "skills.design.desc": "Color contrast, Focus management, Keyboard nav",
    "skills.performance.title": "Performance",
    "skills.performance.desc": "Core Web Vitals, Lighthouse, Optimization",

    // Stats Section
    "stats.title": "Why Accessibility Matters",
    "stats.description":
      "Creating inclusive experiences isn't just the right thing to do—it's essential for reaching all users.",
    "stats.disabilities": "People with disabilities worldwide",
    "stats.visual": "People with visual impairments",
    "stats.keyboard": "Of users rely on keyboard navigation",
    "stats.hearing": "People with hearing difficulties",
    "stats.message": "Every user deserves an accessible experience ✨",

    // Services Section
    "services.title": "Services I Offer",
    "services.description":
      "Helping organizations create more inclusive digital experiences through expert accessibility analysis and frontend development.",
    "services.audit.title": "Accessibility Audits",
    "services.audit.desc":
      "Comprehensive WCAG 2.1/2.2 compliance assessments with detailed reports and remediation guidance.",
    "services.development.title": "Frontend Development",
    "services.development.desc":
      "Building accessible, performant web applications with modern frameworks and best practices.",
    "services.training.title": "Accessibility Training",
    "services.training.desc": "Empowering teams with knowledge and skills to create inclusive digital experiences.",
    "services.learn.more": "Learn More",
    "services.together": "Let's build something accessible together!",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.description":
      "Here are some of my favorite projects that showcase accessible development and inclusive design principles.",
    "projects.code": "Code",
    "projects.demo": "Live Demo",

    // Blog Section
    "blog.title": "Blog",
    "blog.description": "I love sharing my knowledge about accessibility and frontend development. Here are my latest insights, tutorials, and thoughts on creating inclusive digital experiences.",
    "blog.back": "Back to Home",
    "blog.all": "View All Posts",
    "blog.shareLabel": "Copy the URL and share the post",
    "blog.share": "Share",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's Work Together",
    "contact.description":
      "Ready to make your digital products more accessible? Let's create inclusive experiences that work for everyone.",
    "contact.connect": "Let's Connect",
    "contact.connect.desc":
      "Whether you need an accessibility audit, frontend development, or team training, I'm here to help. Choose the best way to reach out:",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.form.title": "Send a Message",
    "contact.form.desc": "Fill out the form below and I'll get back to you within 24 hours.",
    "contact.form.name": "Name",
    "contact.form.placeholder.name": "Your name",
    "contact.form.email": "Email",
    "contact.form.placeholder.email": "your",
    "contact.form.subject": "Subject",
    "contact.form.placeholder.subject": "What's this about?",
    "contact.form.message": "Message",
    "contact.form.placeholder.message": "Tell me about your project, timeline, and how I can help...",
    "contact.form.send": "Send Message",
    "contact.schedule": "Prefer to schedule a call?",
    "contact.schedule.desc": "Book a free consultation at your convenience",
    "contact.schedule.cta": "Schedule a Free Consultation",
    "contact.response.time": "Response Time",
    "contact.message": "I typically respond to all inquiries within 24 hours during business days. For urgent accessibility issues, please mention 'URGENT' in your subject line.",

    // Booking Section
    "booking.title": "Book a Consultation",
    "booking.description":
      "Ready to make your digital products more accessible? Let's discuss your project and explore how I can help you create inclusive experiences.",
    "booking.schedule.title": "Schedule Your Free Consultation",
    "booking.schedule.desc": "Choose a time that works best for you. All consultations are conducted via video call.",
    "booking.expect.title": "What to Expect",
    "booking.expect.1": "Personalized discussion about your accessibility goals",
    "booking.expect.2": "Expert recommendations tailored to your project",
    "booking.expect.3": "Clear next steps and timeline for implementation",
    "booking.expect.4": "No obligation - just valuable insights for your project",

    // Consultation Types
    "consultation.audit.title": "Accessibility Audit Consultation",
    "consultation.audit.desc": "Discuss your project's accessibility needs and get a custom audit plan.",
    "consultation.training.title": "Team Training Session",
    "consultation.training.desc": "Plan accessibility training for your development and design teams.",
    "consultation.discovery.title": "Project Discovery Call",
    "consultation.discovery.desc": "Explore how we can work together on your frontend development needs.",

    // Experience
    "experience.back.home": "Back to home",
    "experience.title": "Professional Experience",
    "experience.description": "Senior Frontend Engineer with 6+ years of experience building inclusive, scalable, and high-performance web applications. Specialized in React, Next.js, TypeScript, and accessibility (WCAG, ARIA). Contributed to major platforms across finance, e-commerce, streaming, and agriculture, working with global teams across 28+ countries.",
    "experience.work": "Work Experience",
    "experience.tech.used": "Technologies used",
    "experience.achievements": "Projects & Achievements",
    "experience.key": "Key achievements",
    "experience.skills": "Technical skills",
    "experience.language": "Languages",
    "experience.english": "English",
    "experience.spanish": "Spanish",
    "experience.italian": "Italian",
    "experience.level.native": "Native",
    "experience.level.fluent": "Fluent (C2)",
    "experience.level.intermediate": "Intermediate (B1)",
    "experience.information": "Experienced in working remotely with distributed, multicultural teams across global markets. Available for remote opportunities worldwide.",
    "experience.get.in.touch": "Get In Touch",
    "experience.call": "Schedule a Call",

    // Footer
    "footer.description": "Frontend developer and accessibility analyst passionate about building beautiful, functional, and inclusive digital experiences.",
    "footer.navigation": "Navigation",
    "footer.services": "Services",
    "footer.services.audits": "Accessibility Audits",
    "footer.services.development": "Frontend Development",
    "footer.services.consulting": "WCAG Consulting",
    "footer.services.training": "Team Training",
    "footer.made.with": "Made with love by Mica Avigliano © 2024",
    "footer.github": "Go to my Github's profile",
    "footer.linkedin": "Go to my Linkedin's profile",
    "footer.email": "Send me an email",

    // Common
    "common.minutes": "minutes",
    "common.min.read": "min read",
    "common.required": "required",

    // Rich text
    "rich.copy": "Copy the code",
    "rich.copied": "Code copied"
  },
  es: {
    // Navigation
    "nav.skip": "Ir al contenido principal",
    "nav.about": "Acerca de",
    "nav.experience": "Experiencia",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.book": "Reservar Llamada",
    "nav.home": "Inicio",
    "nav.extraInfo": "Usa las teclas de flecha para navegar, Enter para seleccionar y Escape para cerrar.",
    "nav.mobile.menu.close": "Cerrar el menu",
    "nav.mobile.menu.open": "Abrir el menu",
    "nav.mobile.menu": "Navegación mobile",
    "nav.mobile.close": "Cerrar navegación mobile",

    // Hero Section
    "hero.greeting": "Hola, soy",
    "hero.title.main": "Desarrollador Frontend",
    "hero.title.sub": "y Analista de Accesibilidad",
    "hero.description":
      "Creo experiencias digitales inclusivas que funcionan perfectamente para todos. Especializado en desarrollo frontend accesible y cumplimiento de WCAG. ♿✨",
    "hero.cta.work": "Ver Mi Trabajo",
    "hero.cta.blog": "Leer Mi Blog",
    "hero.mission": "Hecho con dedicación para todos",

    // About Section
    "about.title": "Acerca de Mí",
    "about.description":
      "Soy un desarrollador frontend apasionado y analista de accesibilidad que cree que el gran diseño y el código inclusivo van de la mano. Con más de 6 años de experiencia, me encanta convertir problemas complejos en soluciones simples y hermosas que funcionan para todos.",
    "about.mission.title": "Mi Misión",
    "about.mission.p1":
      "Creo que la web debe ser accesible para todos, independientemente de sus habilidades. Como desarrollador frontend y analista de accesibilidad, construyo el puente entre el diseño hermoso y la funcionalidad inclusiva.",
    "about.mission.p2":
      "Mi experiencia abarca el cumplimiento de WCAG, optimización de lectores de pantalla, navegación por teclado y la creación de experiencias de usuario deliciosas que funcionan para usuarios con diversas necesidades y tecnologías de asistencia.",
    "about.mission": "La accesibilidad no es una función, es la base de todo",

    // Skills
    "skills.frontend.title": "Desarrollo Frontend",
    "skills.frontend.desc": "React, Next.js, TypeScript, CSS Moderno",
    "skills.accessibility.title": "Análisis de Accesibilidad",
    "skills.accessibility.desc": "WCAG 2.1/2.2, ARIA, Lectores de pantalla, Auditoría",
    "skills.design.title": "Diseño Inclusivo",
    "skills.design.desc": "Contraste de color, Gestión de foco, Navegación por teclado",
    "skills.performance.title": "Rendimiento",
    "skills.performance.desc": "Core Web Vitals, Lighthouse, Optimización",

    // Stats Section
    "stats.title": "¿Por qué importa la Accesibilidad?",
    "stats.description":
      "Crear experiencias inclusivas no es solo lo correcto, es esencial para llegar a todos los usuarios.",
    "stats.disabilities": "Personas con discapacidades en todo el mundo",
    "stats.visual": "Personas con discapacidades visuales",
    "stats.keyboard": "De usuarios dependen de la navegación por teclado",
    "stats.hearing": "Personas con dificultades auditivas",
    "stats.message": "Cada persona usuaria merece una experiencia accesible ✨",

    // Services Section
    "services.title": "Servicios que Ofrezco",
    "services.description":
      "Ayudo a las organizaciones a crear experiencias digitales más inclusivas a través de análisis experto de accesibilidad y desarrollo frontend.",
    "services.audit.title": "Auditorías de Accesibilidad",
    "services.audit.desc":
      "Evaluaciones integrales de cumplimiento WCAG 2.1/2.2 con informes detallados y guías de remediación.",
    "services.development.title": "Desarrollo Frontend",
    "services.development.desc":
      "Construcción de aplicaciones web accesibles y eficientes con frameworks modernos y mejores prácticas.",
    "services.training.title": "Capacitación en Accesibilidad",
    "services.training.desc":
      "Empoderando equipos con conocimiento y habilidades para crear experiencias digitales inclusivas.",
    "services.learn.more": "Saber Más",
    "services.together": "Construyamos algo accesible juntos!",

    // Projects Section
    "projects.title": "Proyectos Destacados",
    "projects.description":
      "Aquí están algunos de mis proyectos favoritos que muestran desarrollo accesible y principios de diseño inclusivo.",
    "projects.code": "Código",
    "projects.demo": "Demo en Vivo",

    // Blog Section
    "blog.title": "Blog",
    "blog.description":
      "Me encanta compartir mi conocimiento sobre accesibilidad y desarrollo frontend. Aquí están mis últimas perspectivas, tutoriales y pensamientos sobre crear experiencias digitales inclusivas.",
    "blog.back": "Volver al Inicio",
    "blog.all": "Ver Todas las Publicaciones",
    "blog.shareLabel": "Copia el URL y compartí el posteo",
    "blog.share": "Comparte",

    // Contact Section
    "contact.title": "Ponte en Contacto",
    "contact.subtitle": "Trabajemos Juntos",
    "contact.description":
      "¿Listo para hacer tus productos digitales más accesibles? Creemos experiencias inclusivas que funcionen para todos.",
    "contact.connect": "Conectemos",
    "contact.connect.desc":
      "Ya sea que necesites una auditoría de accesibilidad, desarrollo frontend o capacitación de equipo, estoy aquí para ayudar. Elige la mejor manera de contactarme:",
    "contact.email": "Correo",
    "contact.phone": "Teléfono",
    "contact.location": "Ubicación",
    "contact.form.title": "Enviar un Mensaje",
    "contact.form.desc": "Completa el formulario a continuación y te responderé en 24 horas.",
    "contact.form.name": "Nombre",
    "contact.form.placeholder.name": "Tu nombre",
    "contact.form.email": "Correo",
    "contact.form.placeholder.email": "tu",
    "contact.form.subject": "Asunto",
    "contact.form.placeholder.subject": "¿De qué se trata tu consulta?",
    "contact.form.message": "Mensaje",
    "contact.form.placeholder.message": "Contame sobre tu proyecto, los plazos y cómo puedo ayudarte...",
    "contact.form.send": "Enviar Mensaje",
    "contact.schedule": "¿Prefieres programar una llamada?",
    "contact.schedule.desc": "Reserva una consulta gratuita a tu conveniencia",
    "contact.schedule.cta": "Programar una Consulta Gratuita",
    "contact.response.time": "Tiempo de respuesta",
    "contact.message": "Normalmente respondo a todas las consultas dentro de las 24 horas durante los días hábiles. Para asuntos urgentes relacionados con accesibilidad, por favor incluí 'URGENTE' en el asunto del mensaje.",

    // Booking Section
    "booking.title": "Reservar una Consulta",
    "booking.description":
      "¿Listo para hacer tus productos digitales más accesibles? Hablemos sobre tu proyecto y exploremos cómo puedo ayudarte a crear experiencias inclusivas.",
    "booking.schedule.title": "Programa tu Consulta Gratuita",
    "booking.schedule.desc":
      "Elige un horario que funcione mejor para ti. Todas las consultas se realizan por videollamada.",
    "booking.expect.title": "Qué Esperar",
    "booking.expect.1": "Discusión personalizada sobre tus objetivos de accesibilidad",
    "booking.expect.2": "Recomendaciones expertas adaptadas a tu proyecto",
    "booking.expect.3": "Próximos pasos claros y cronograma de implementación",
    "booking.expect.4": "Sin obligación - solo perspectivas valiosas para tu proyecto",

    // Consultation Types
    "consultation.audit.title": "Consulta de Auditoría de Accesibilidad",
    "consultation.audit.desc":
      "Discute las necesidades de accesibilidad de tu proyecto y obtén un plan de auditoría personalizado.",
    "consultation.training.title": "Sesión de Capacitación de Equipo",
    "consultation.training.desc": "Planifica capacitación en accesibilidad para tus equipos de desarrollo y diseño.",
    "consultation.discovery.title": "Llamada de Descubrimiento de Proyecto",
    "consultation.discovery.desc": "Explora cómo podemos trabajar juntos en tus necesidades de desarrollo frontend.",

    // Experience
    "experience.back.home": "Volver al inicio",
    "experience.title": "Experiencia profesional",
    "experience.description": "Ingeniera Frontend Senior con más de 6 años de experiencia desarrollando aplicaciones web inclusivas, escalables y de alto rendimiento. Especializada en React, Next.js, TypeScript y accesibilidad (WCAG, ARIA). Ha contribuido en grandes plataformas de los sectores financiero, comercio electrónico, streaming y agricultura, colaborando con equipos globales en más de 28 países.",
    "experience.work": "Experiencia laboral",
    "experience.skills": "Habilidades técnicas",
    "experience.tech.used": "Tecnologías utilizadas",
    "experience.achievements": "Proyectos y logros",
    "experience.key": "Logros claves",
    "experience.language": "Idiomas",
    "experience.english": "Inglés",
    "experience.spanish": "Español",
    "experience.italian": "Italiano",
    "experience.level.native": "Nativo",
    "experience.level.fluent": "Fluido (C2)",
    "experience.level.intermediate": "Intermedio (B1)",
    "experience.information": "Con experiencia trabajando de forma remota con equipos distribuidos y multiculturales en mercados globales. Disponible para oportunidades remotas en todo el mundo.",
    "experience.get.in.touch": "Ponte en contacto",
    "experience.call": "Agendar una llamada",

    // Footer
    "footer.description":
      "Desarrollador frontend y analista de accesibilidad apasionado por construir experiencias digitales hermosas, funcionales e inclusivas.",
    "footer.navigation": "Navegación",
    "footer.services": "Servicios",
    "footer.services.audits": "Auditorías de Accesibilidad",
    "footer.services.development": "Desarrollo Frontend",
    "footer.services.consulting": "Consultoría WCAG",
    "footer.services.training": "Capacitación de Equipos",
    "footer.made.with": "Hecho con amor por Mica Avigliano © 2024",
    "footer.github": "Ir a mi cuenta de Github",
    "footer.linkedin": "Ir a mi cuenta de Linkedin",
    "footer.email": "Envíame un email",

    // Common
    "common.minutes": "minutos",
    "common.min.read": "min de lectura",
    "common.required": "requerido",

    // Rich text
    "rich.copy": "Copia el código",
    "rich.copied": "Código copiado"
  },
  it: {
    // Navigation
    "nav.skip": "Salta al contenuto principale",
    "nav.about": "Chi Sono",
    "nav.experience": "Esperienza",
    "nav.services": "Servizi",
    "nav.projects": "Progetti",
    "nav.blog": "Blog",
    "nav.contact": "Contatti",
    "nav.book": "Prenota una Chiamata",
    "nav.home": "Home",
    "nav.extraInfo": "Usa i tasti freccia per navigare, Invio per selezionare ed Esc per chiudere.",
    "nav.mobile.menu.close": "Chiudi il menu",
    "nav.mobile.menu.open": "Apri il menu",
    "nav.mobile.menu": "Navegazione mobile",
    "nav.mobile.close": "Chiudi navegazione mobile",

    // Hero Section
    "hero.greeting": "Ciao, io sono",
    "hero.title.main": "Sviluppatore Frontend",
    "hero.title.sub": "e Analista di Accessibilità",
    "hero.description":
      "Creo esperienze digitali inclusive che funzionano perfettamente per tutti. Specializzato nello sviluppo frontend accessibile e nella conformità WCAG. ♿✨",
    "hero.cta.work": "Vedi il Mio Lavoro",
    "hero.cta.blog": "Leggi il Mio Blog",
    "hero.mission": "Realizzato con cura e dedizione per tutti",

    // About Section
    "about.title": "Chi Sono",
    "about.description":
      "Sono uno sviluppatore frontend appassionato e analista di accessibilità che crede che il grande design e il codice inclusivo vadano di pari passo. Con oltre 6 anni di esperienza, amo trasformare problemi complessi in soluzioni semplici e belle che funzionano per tutti.",
    "about.mission.title": "La Mia Missione",
    "about.mission.p1":
      "Credo che il web dovrebbe essere accessibile a tutti, indipendentemente dalle loro capacità. Come sviluppatore frontend e analista di accessibilità, colmo il divario tra design bello e funzionalità inclusiva.",
    "about.mission.p2":
      "La mia esperienza comprende la conformità WCAG, l'ottimizzazione per screen reader, la navigazione da tastiera e la creazione di esperienze utente deliziose che funzionano per utenti con esigenze diverse e tecnologie assistive.",
    "about.mission": "L'accessibilità non è una funzione, è alla base di tutto",

    // Skills
    "skills.frontend.title": "Sviluppo Frontend",
    "skills.frontend.desc": "React, Next.js, TypeScript, CSS Moderno",
    "skills.accessibility.title": "Analisi di Accessibilità",
    "skills.accessibility.desc": "WCAG 2.1/2.2, ARIA, Screen reader, Audit",
    "skills.design.title": "Design Inclusivo",
    "skills.design.desc": "Contrasto colori, Gestione focus, Navigazione tastiera",
    "skills.performance.title": "Performance",
    "skills.performance.desc": "Core Web Vitals, Lighthouse, Ottimizzazione",

    // Stats Section
    "stats.title": "Perché l'Accessibilità è Importante",
    "stats.description":
      "Creare esperienze inclusive non è solo la cosa giusta da fare—è essenziale per raggiungere tutti gli utenti.",
    "stats.disabilities": "Persone con disabilità nel mondo",
    "stats.visual": "Persone con disabilità visive",
    "stats.keyboard": "Degli utenti dipendono dalla navigazione da tastiera",
    "stats.hearing": "Persone con difficoltà uditive",
    "stats.message": "Ogni utente merita un'esperienza accessibile ✨",

    // Services Section
    "services.title": "Servizi che Offro",
    "services.description":
      "Aiuto le organizzazioni a creare esperienze digitali più inclusive attraverso analisi esperte di accessibilità e sviluppo frontend.",
    "services.audit.title": "Audit di Accessibilità",
    "services.audit.desc":
      "Valutazioni complete della conformità WCAG 2.1/2.2 con report dettagliati e guide per la risoluzione.",
    "services.development.title": "Sviluppo Frontend",
    "services.development.desc":
      "Costruzione di applicazioni web accessibili e performanti con framework moderni e best practice.",
    "services.training.title": "Formazione sull'Accessibilità",
    "services.training.desc": "Potenziare i team con conoscenze e competenze per creare esperienze digitali inclusive.",
    "services.learn.more": "Scopri di Più",
    "services.together": "Costruiamo qualcosa di accessibile insieme!",

    // Projects Section
    "projects.title": "Progetti in Evidenza",
    "projects.description":
      "Ecco alcuni dei miei progetti preferiti che mostrano sviluppo accessibile e principi di design inclusivo.",
    "projects.code": "Codice",
    "projects.demo": "Demo Live",

    // Blog Section
    "blog.title": "Blog",
    "blog.description": "Amo condividere le mie conoscenze su accessibilità e sviluppo frontend. Ecco i miei ultimi approfondimenti, tutorial e pensieri sulla creazione di esperienze digitali inclusive.",
    "blog.back": "Torna alla Home",
    "blog.all": "Vedi Tutti i Post",
    "blog.shareLabel": "Copia l'URL e condividi il post",
    "blog.share": "Convidi",

    // Contact Section
    "contact.title": "Mettiamoci in Contatto",
    "contact.subtitle": "Lavoriamo Insieme",
    "contact.description":
      "Pronto a rendere i tuoi prodotti digitali più accessibili? Creiamo esperienze inclusive che funzionano per tutti.",
    "contact.connect": "Connettiamoci",
    "contact.connect.desc":
      "Che tu abbia bisogno di un audit di accessibilità, sviluppo frontend o formazione del team, sono qui per aiutare. Scegli il modo migliore per contattarmi:",
    "contact.email": "Email",
    "contact.phone": "Telefono",
    "contact.location": "Posizione",
    "contact.form.title": "Invia un Messaggio",
    "contact.form.desc": "Compila il modulo qui sotto e ti risponderò entro 24 ore.",
    "contact.form.name": "Nome",
    "contact.form.placeholder.name": "Il tuo nome",
    "contact.form.email": "Email",
    "contact.form.placeholder.email": "tuo",
    "contact.form.subject": "Oggetto",
    "contact.form.placeholder.subject": "Di cosa tratta la tua richiesta?",
    "contact.form.message": "Messaggio",
    "contact.form.placeholder.message": "Parlami del tuo progetto, delle tempistiche e di come posso aiutarti...",
    "contact.form.send": "Invia Messaggio",
    "contact.schedule": "Preferisci programmare una chiamata?",
    "contact.schedule.desc": "Prenota una consulenza gratuita quando ti è comodo",
    "contact.schedule.cta": "Programma una Consulenza Gratuita",
    "contact.response.time": "Tempo di risposta",
    "contact.message": "In genere rispondo a tutte le richieste entro 24 ore nei giorni lavorativi. Per problemi urgenti relativi all'accessibilità, si prega di indicare 'URGENTE' nell'oggetto del messaggio.",

    // Booking Section
    "booking.title": "Prenota una Consulenza",
    "booking.description":
      "Pronto a rendere i tuoi prodotti digitali più accessibili? Parliamo del tuo progetto ed esploriamo come posso aiutarti a creare esperienze inclusive.",
    "booking.schedule.title": "Programma la Tua Consulenza Gratuita",
    "booking.schedule.desc":
      "Scegli un orario che funziona meglio per te. Tutte le consulenze si svolgono tramite videochiamata.",
    "booking.expect.title": "Cosa Aspettarsi",
    "booking.expect.1": "Discussione personalizzata sui tuoi obiettivi di accessibilità",
    "booking.expect.2": "Raccomandazioni esperte su misura per il tuo progetto",
    "booking.expect.3": "Prossimi passi chiari e cronologia di implementazione",
    "booking.expect.4": "Nessun obbligo - solo approfondimenti preziosi per il tuo progetto",

    // Consultation Types
    "consultation.audit.title": "Consulenza Audit di Accessibilità",
    "consultation.audit.desc":
      "Discuti le esigenze di accessibilità del tuo progetto e ottieni un piano di audit personalizzato.",
    "consultation.training.title": "Sessione di Formazione del Team",
    "consultation.training.desc": "Pianifica la formazione sull'accessibilità per i tuoi team di sviluppo e design.",
    "consultation.discovery.title": "Chiamata di Scoperta del Progetto",
    "consultation.discovery.desc": "Esplora come possiamo lavorare insieme sulle tue esigenze di sviluppo frontend.",

    // Experience
    "experience.back.home": "Torna alla home",
    "experience.title": "Esperienza Professionale",
    "experience.description": "Senior Frontend Engineer con oltre 6 anni di esperienza nello sviluppo di applicazioni web inclusive, scalabili e ad alte prestazioni. Specializzata in React, Next.js, TypeScript e accessibilità (WCAG, ARIA). Ha contribuito a importanti piattaforme nei settori finanziario, e-commerce, streaming e agricoltura, collaborando con team globali in oltre 28 paesi.",
    "experience.skills": "Competenze tecniche",
    "experience.work": "Esperienza lavorativa",
    "experience.tech.used": "Tecnologie utilizzate",
    "experience.achievements": "Progetti e risultati",
    "experience.key": "Risultati principali",
    "experience.language": "Lingue",
    "experience.english": "Inglese",
    "experience.spanish": "Spagnolo",
    "experience.italian": "Italiano",
    "experience.level.native": "Nativo",
    "experience.level.fluent": "Fluente (C2)",
    "experience.level.intermediate": "Intermedio (B1)",
    "experience.information": "Esperienza nel lavoro da remoto con team distribuiti e multiculturali nei mercati globali. Disponibile per opportunità da remoto a livello mondiale.",
    "experience.get.in.touch": "Programmare una chiamata",
    "experience.call": "Mettiti in contatto",

    // Footer
    "footer.description":
      "Sviluppatore frontend e analista di accessibilità appassionato nella costruzione di esperienze digitali belle, funzionali e inclusive.",
    "footer.navigation": "Navigazione",
    "footer.services": "Servizi",
    "footer.services.audits": "Audit di Accessibilità",
    "footer.services.development": "Sviluppo Frontend",
    "footer.services.consulting": "Consulenza WCAG",
    "footer.services.training": "Formazione Team",
    "footer.made.with": "Fatto con amore da Mica Avigliano © 2024",
    "footer.github": "Vai al mio profilo GitHub",
    "footer.linkedin": "Vai al mio profilo LinkedIn",
    "footer.email": "Inviami un'email",

    // Common
    "common.minutes": "minuti",
    "common.min.read": "min di lettura",
    "common.required": "richiesto",

    // Rich text
    "rich.copy": "Copia codice",
    "rich.copied": "Codice copiato"
  },
}

export type Locale = "en" | "es" | "it"

export const locales: Locale[] = ["en", "es", "it"]

export function getTranslation(locale: string, key: TranslationKey): string {
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en"
  return translations[validLocale][key] || translations.en[key] || key
}
