import type { Locale } from './i18n'

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
    "nav.select.language": "Select Language",
    "nav.extraInfo": "Use arrow keys to navigate, Enter to select, Escape to close",
    "nav.mobile.menu.close": "Close menu",
    "nav.mobile.menu.open": "Open menu",
    "nav.mobile.menu": "Mobile navigation",
    "nav.mobile.close": "Close navigation menu",

    // Hero Section
    "hero.greeting": "Hello, I am",
    "hero.title.main": "Frontend Developer",
    "hero.title.sub": "& Accessibility Engineer",
    "hero.description":
      "I create inclusive digital experiences that work beautifully for everyone. Specializing in accessible frontend development and WCAG compliance.",
    "hero.cta.experience": "View My Experience",
    "hero.cta.blog": "Read my Blog",
    "hero.mission": "Made with care for everyone",

    // About Section
    "about.title": "About Me",
    "about.description":
      "I'm a passionate frontend developer and accessibility engineer who believes that great design and inclusive code go hand in hand. With 6+ years of experience, I love turning complex problems into simple, beautiful solutions that work for everyone.",
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
    "stats.title": "Why Accessibility matters",
    "stats.description":
      "Creating inclusive experiences isn't just the right thing to do. It's essential for reaching all users.",
    "stats.disabilities": "People with disabilities worldwide",
    "stats.visual": "People with visual impairments",
    "stats.keyboard": "Of users rely on keyboard navigation",
    "stats.hearing": "People with hearing difficulties",
    "stats.message": "Every user deserves an accessible experience",

    // Services Section
    "services.title": "Services",
    "services.description":
      "Expert accessibility solutions across the full development lifecycle—from coding to testing—ensuring your digital products work for everyone.",
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
    "blog.description": "Insights, tutorials, and best practices for building accessible web experiences. Learn from real-world examples and stay updated with the latest in web accessibility.",
    "blog.back": "View all Posts",
    "blog.all": "View All Posts",
    "blog.shareLabel": "Copy the URL and share the post",
    "blog.share": "Share",
    "blog.view": "view",
    "blog.views": "views",
    "blog.read.more": "Read more",
    "blog.about": "about",
    "blog.read.time": "min read",

    // Contact Section
    "contact.title": "Get in Touch",
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
    "contact.form.placeholder.email": "your@email.com",
    "contact.form.subject": "Subject",
    "contact.form.placeholder.subject": "What's this about?",
    "contact.form.message": "Message",
    "contact.form.placeholder.message": "Tell me about your project, timeline, and how I can help...",
    "contact.form.send": "Send Message",
    "contact.form.loading": "Sending...",
    "contact.form.success": "Message sent successfully!",
    "contact.form.fail": "Something went wrong. Try again later.",
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
    "booking.expect.title": "What to expect",
    "booking.expect.1": "Personalized discussion about your accessibility goals",
    "booking.expect.2": "Expert recommendations tailored to your project",
    "booking.expect.3": "Clear next steps and timeline for implementation",
    "booking.expect.4": "No obligation - just valuable insights for your project",

    // Consultation Types
    "consultation.audit.time": "30 minutes",
    "consultation.audit.title": "Accessibility Audit Consultation",
    "consultation.audit.desc": "Discuss your project's accessibility needs and get a custom audit plan.",
    "consultation.training.time": "60 minutes",
    "consultation.training.title": "Team Training Session",
    "consultation.training.desc": "Plan accessibility training for your development and design teams.",
    "consultation.discovery.time": "45 minutes",
    "consultation.discovery.title": "Project Discovery Call",
    "consultation.discovery.desc": "Explore how we can work together on your frontend development needs.",

    // Experience
    "experience.back.home": "Back to home",
    "experience.title": "Experience",
    "experience.description": "Senior Frontend and Accessibility Engineer with 6+ years of experience building inclusive, scalable, and high-performance web applications. Specialized in React, Next.js, TypeScript, and accessibility (WCAG, ARIA). Contributed to major platforms across finance, e-commerce, streaming, and agriculture, working with global teams across 28+ countries.",
    "experience.download.cv": "Download CV",
    "experience.work": "Work Experience",
    "experience.tech.used": "Technologies used",
    "experience.achievements": "Projects & Achievements",
    "experience.key": "Key achievements",
    "experience.skills.hard": "Hard Skills",
    "experience.skills.soft": "Soft Skills",
    "experience.skills": "Technical skills",
    "experience.language": "Languages",
    "experience.english": "English",
    "experience.spanish": "Spanish",
    "experience.italian": "Italian",
    "experience.level": "Level:",
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
    "footer.made.with": "Made with care for everyone",
    "footer.github": "Go to my Github's profile",
    "footer.linkedin": "Go to my Linkedin's profile",
    "footer.email": "Send me an email",
    "footer.member": "Proud member of the A11y Webring",
    "footer.previous": "← Previous Website",
    "footer.random": "Random Website",
    "footer.next": "Next Website →",

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
    "nav.select.language": "Selecciona idioma",
    "nav.extraInfo": "Usa las teclas de flecha para navegar, Enter para seleccionar y Escape para cerrar.",
    "nav.mobile.menu.close": "Cerrar el menu",
    "nav.mobile.menu.open": "Abrir el menu",
    "nav.mobile.menu": "Navegación mobile",
    "nav.mobile.close": "Cerrar navegación mobile",

    // Hero Section
    "hero.greeting": "Hola, soy",
    "hero.title.main": "Desarrollador Frontend",
    "hero.title.sub": "e Ingeniera de Accesibilidad",
    "hero.description":
      "Creo experiencias digitales inclusivas que funcionan perfectamente para todos. Especializado en desarrollo frontend accesible y cumplimiento de WCAG.",
    "hero.cta.experience": "Conocé mi experiencia",
    "hero.cta.blog": "Leé mi Blog",
    "hero.mission": "Hecho con dedicación para todos",

    // About Section
    "about.title": "Acerca de Mí",
    "about.description":
      "Soy una desarrolladora frontend apasionada y una ingeniera de accesibilidad que cree que el gran diseño y el código inclusivo van de la mano. Con más de 6 años de experiencia, me encanta convertir problemas complejos en soluciones simples y hermosas que funcionan para todos y todos.",
    "about.mission.title": "Mi Misión",
    "about.mission.p1":
      "Creo que la web debe ser accesible para todos, independientemente de sus habilidades. Como desarrolladora frontend e ingeniera de accesibilidad, construyo el puente entre el diseño estético y la funcionalidad inclusiva.",
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
    "stats.message": "Cada persona usuaria merece una experiencia accesible",

    // Services Section
    "services.title": "Servicios",
    "services.description":
      "Soluciones profesionales en accesibilidad durante todo el ciclo de desarrollo, desde el desarrollo hasta las pruebas, asegurando que tus productos digitales funcionen para todos.",
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
    "blog.description": "Ideas, tutoriales y buenas prácticas para construir experiencias web accesibles. Aprende de ejemplos del mundo real y mantenete actualizado con lo último en accesibilidad web.",
    "blog.back": "Ver todas las Publicaciones",
    "blog.all": "Ver Todas las Publicaciones",
    "blog.shareLabel": "Copia el URL y compartí el posteo",
    "blog.share": "Comparte",
    "blog.view": "vista",
    "blog.views": "vistas",
    "blog.read.more": "Leer más",
    "blog.about": "sobre",
    "blog.read.time": "min de lectura",

    // Contact Section
    "contact.title": "Ponete en contacto",
    "contact.subtitle": "Trabajemos juntos",
    "contact.description":
      "¿Listo para hacer tus productos digitales más accesibles? Creemos experiencias inclusivas que funcionen para todos.",
    "contact.connect": "Hablemos",
    "contact.connect.desc":
      "Ya sea que necesites una auditoría de accesibilidad, desarrollo frontend o capacitación de equipo, estoy aquí para ayudar. Elegí la mejor manera de contactarme:",
    "contact.email": "Mail",
    "contact.phone": "Teléfono",
    "contact.location": "Ubicación",
    "contact.form.title": "Enviar un mensaje",
    "contact.form.desc": "Completa el formulario a continuación y te responderé en 24 horas.",
    "contact.form.name": "Nombre",
    "contact.form.placeholder.name": "Tu nombre",
    "contact.form.email": "Mail",
    "contact.form.placeholder.email": "tu@email.com",
    "contact.form.subject": "Asunto",
    "contact.form.placeholder.subject": "¿De qué se trata tu consulta?",
    "contact.form.message": "Mensaje",
    "contact.form.placeholder.message": "Contame sobre tu proyecto, los plazos y cómo puedo ayudarte...",
    "contact.form.send": "Enviar Mensaje",
    "contact.form.loading": "Enviando...",
    "contact.form.success": "Mensaje enviado satisfactoriamente",
    "contact.form.fail": "Algo salió mal. Inténtalo de nuevo más tarde.",
    "contact.schedule": "¿Prefieres programar una llamada?",
    "contact.schedule.desc": "Reserva una consulta gratuita a tu conveniencia",
    "contact.schedule.cta": "Agendá una consulta gratuita",
    "contact.response.time": "Tiempo de respuesta",
    "contact.message": "Normalmente respondo a todas las consultas dentro de las 24 horas durante los días hábiles. Para asuntos urgentes relacionados con accesibilidad, por favor incluí 'URGENTE' en el asunto del mensaje.",

    // Booking Section
    "booking.title": "Agenda una reunión",
    "booking.description":
      "¿Listo para hacer tus productos digitales más accesibles? Hablemos sobre tu proyecto y exploremos cómo puedo ayudarte a crear experiencias inclusivas.",
    "booking.schedule.title": "Programa tu reunión gratuita",
    "booking.schedule.desc":
      "Elige un horario que funcione mejor para ti. Todas las consultas se realizan por videollamada.",
    "booking.expect.title": "Qué esperar",
    "booking.expect.1": "Discusión personalizada sobre tus objetivos de accesibilidad",
    "booking.expect.2": "Recomendaciones expertas adaptadas a tu proyecto",
    "booking.expect.3": "Próximos pasos claros y cronograma de implementación",
    "booking.expect.4": "Sin obligación - solo perspectivas valiosas para tu proyecto",

    // Consultation Types
    "consultation.audit.time": "30 minutos",
    "consultation.audit.title": "Consulta de auditoría de Accesibilidad",
    "consultation.audit.desc":
      "Discute las necesidades de accesibilidad de tu proyecto y obtén un plan de auditoría personalizado.",
    "consultation.training.time": "60 minutos",
    "consultation.training.title": "Sesión de capacitación de equipo",
    "consultation.training.desc": "Planifica capacitación en accesibilidad para tus equipos de desarrollo y diseño.",
    "consultation.discovery.time": "45 minutos",
    "consultation.discovery.title": "Llamada de descubrimiento de proyecto",
    "consultation.discovery.desc": "Explora cómo podemos trabajar juntos en tus necesidades de desarrollo frontend.",

    // Experience
    "experience.back.home": "Volver al inicio",
    "experience.title": "Experiencia profesional",
    "experience.description": "Ingeniera Frontend Senior e Ingeniera de Accesibilidad con más de 6 años de experiencia desarrollando aplicaciones web inclusivas, escalables y de alto rendimiento. Especializada en React, Next.js, TypeScript y accesibilidad (WCAG, ARIA). Ha contribuido en grandes plataformas de los sectores financiero, comercio electrónico, streaming y agricultura, colaborando con equipos globales en más de 28 países.",
    "experience.work": "Experiencia laboral",
    "experience.skills": "Habilidades técnicas",
    "experience.skills.hard": "Habilidades duras",
    "experience.skills.soft": "Habilidades blandas",
    "experience.tech.used": "Tecnologías utilizadas",
    "experience.achievements": "Proyectos y logros",
    "experience.key": "Logros claves",
    "experience.download.cv": "Descargar CV",
    "experience.language": "Idiomas",
    "experience.english": "Inglés",
    "experience.spanish": "Español",
    "experience.italian": "Italiano",
    "experience.level": "Nivel:",
    "experience.level.native": "Nativo",
    "experience.level.fluent": "Fluido (C2)",
    "experience.level.intermediate": "Intermedio (B1)",
    "experience.information": "Con experiencia trabajando de forma remota con equipos distribuidos y multiculturales en mercados globales. Disponible para oportunidades remotas en todo el mundo.",
    "experience.get.in.touch": "Ponte en contacto",
    "experience.call": "Agendar una llamada",

    // Footer
    "footer.description":
      "Desarrolladora frontend e Ingeniera de accesibilidad apasionada por construir experiencias digitales hermosas, funcionales e inclusivas.",
    "footer.navigation": "Navegación",
    "footer.services": "Servicios",
    "footer.services.audits": "Auditorías de Accesibilidad",
    "footer.services.development": "Desarrollo Frontend",
    "footer.services.consulting": "Consultoría WCAG",
    "footer.services.training": "Capacitación de equipos",
    "footer.made.with": "Hecho con dedicación para todos",
    "footer.github": "Ir a mi cuenta de Github",
    "footer.linkedin": "Ir a mi cuenta de Linkedin",
    "footer.email": "Envíame un email",
    "footer.member": "Orgullosa miembro del A11y Webring",
    "footer.previous": "← Sitio web anterior",
    "footer.random": "Sitio web aleatorio",
    "footer.next": "Siguiente sitio web →",

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
    "nav.select.language": "Seleziona lingua",
    "nav.extraInfo": "Usa i tasti freccia per navigare, Invio per selezionare ed Esc per chiudere.",
    "nav.mobile.menu.close": "Chiudi il menu",
    "nav.mobile.menu.open": "Apri il menu",
    "nav.mobile.menu": "Navegazione mobile",
    "nav.mobile.close": "Chiudi navegazione mobile",

    // Hero Section
    "hero.greeting": "Ciao, io sono",
    "hero.title.main": "Sviluppatrice Frontend",
    "hero.title.sub": "e Ingegnere di Accessibilità",
    "hero.description":
      "Creo esperienze digitali inclusive che funzionano perfettamente per tutti. Specializzato nello sviluppo frontend accessibile e nella conformità WCAG.",
    "hero.cta.experience": "Vedi la mia esperienza",
    "hero.cta.blog": "Leggi il mio blog",
    "hero.mission": "Realizzato con cura e dedizione per tutti",

    // About Section
    "about.title": "Chi Sono",
    "about.description":
      "Sono una Sviluppatrice Frontend appassionato e Ingegnere di accessibilità che crede che il grande design e il codice inclusivo vadano di pari passo. Con oltre 6 anni di esperienza, amo trasformare problemi complessi in soluzioni semplici e belle che funzionano per tutti.",
    "about.mission.title": "La Mia Missione",
    "about.mission.p1":
      "Credo che il web dovrebbe essere accessibile a tutti, indipendentemente dalle loro capacità. Come Sviluppatrice Frontend e Ingegnere di Accessibilità, colmo il divario tra design bello e funzionalità inclusiva.",
    "about.mission.p2":
      "La mia esperienza comprende la conformità WCAG, l'ottimizzazione per screen reader, la navigazione da tastiera e la creazione di esperienze utente deliziose che funzionano per utenti con esigenze diverse e tecnologie assistive.",
    "about.mission": "L'accessibilità non è una funzione, è alla base di tutto",

    // Skills
    "skills.frontend.title": "Sviluppatrice Frontend",
    "skills.frontend.desc": "React, Next.js, TypeScript, CSS Moderno",
    "skills.accessibility.title": "Ingegnere di Accessibilità",
    "skills.accessibility.desc": "WCAG 2.1/2.2, ARIA, Screen reader, Audit",
    "skills.design.title": "Design Inclusivo",
    "skills.design.desc": "Contrasto colori, Gestione focus, Navigazione tastiera",
    "skills.performance.title": "Performance",
    "skills.performance.desc": "Core Web Vitals, Lighthouse, Ottimizzazione",

    // Stats Section
    "stats.title": "Perché l'Accessibilità è importante",
    "stats.description":
      "Creare esperienze inclusive non è solo la cosa giusta da fare. È essenziale per raggiungere tutti gli utenti.",
    "stats.disabilities": "Persone con disabilità nel mondo",
    "stats.visual": "Persone con disabilità visive",
    "stats.keyboard": "Degli utenti dipendono dalla navigazione da tastiera",
    "stats.hearing": "Persone con difficoltà uditive",
    "stats.message": "Ogni utente merita un'esperienza accessibile",

    // Services Section
    "services.title": "Servizi",
    "services.description":
      "Soluzioni esperte di accessibilità durante l'intero ciclo di sviluppo, dalla codifica ai test, garantendo che i tuoi prodotti digitali funzionino per tutti.",
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
    "blog.description": "Approfondimenti, tutorial e best practice per costruire esperienze web accessibili. Impara da esempi del mondo reale e rimani aggiornato con le ultime novità sull'accessibilità web.",
    "blog.back": "Vedi tutti i Post",
    "blog.all": "Vedi Tutti i Post",
    "blog.shareLabel": "Copia l'URL e condividi il post",
    "blog.share": "Convidi",
    "blog.view": "vista",
    "blog.views": "viste",
    "blog.read.more": "Scopri di più",
    "blog.about": "su",
    "blog.read.time": "min di lettura",

    // Contact Section
    "contact.title": "Mettiamoci in contatto",
    "contact.subtitle": "Lavoriamo insieme",
    "contact.description":
      "Pronto a rendere i tuoi prodotti digitali più accessibili? Creiamo esperienze inclusive che funzionano per tutti.",
    "contact.connect": "Connettiamoci",
    "contact.connect.desc":
      "Che tu abbia bisogno di un audit di accessibilità, sviluppo frontend o formazione del team, sono qui per aiutare. Scegli il modo migliore per contattarmi:",
    "contact.email": "Email",
    "contact.phone": "Telefono",
    "contact.location": "Posizione",
    "contact.form.title": "Invia un messaggio",
    "contact.form.desc": "Compila il modulo qui sotto e ti risponderò entro 24 ore.",
    "contact.form.name": "Nome",
    "contact.form.placeholder.name": "Il tuo nome",
    "contact.form.email": "Email",
    "contact.form.placeholder.email": "tuo@email.com",
    "contact.form.subject": "Oggetto",
    "contact.form.placeholder.subject": "Di cosa tratta la tua richiesta?",
    "contact.form.message": "Messaggio",
    "contact.form.placeholder.message": "Parlami del tuo progetto, delle tempistiche e di come posso aiutarti...",
    "contact.form.send": "Invia Messaggio",
    "contact.form.loading": "Inviando...",
    "contact.form.success": "Messaggio inviato con successo!",
    "contact.form.fail": "Si è verificato un errore. Riprova più tardi.",
    "contact.schedule": "Preferisci programmare una chiamata?",
    "contact.schedule.desc": "Prenota una consulenza gratuita quando ti è comodo",
    "contact.schedule.cta": "Programma una consulenza gratuita",
    "contact.response.time": "Tempo di risposta",
    "contact.message": "In genere rispondo a tutte le richieste entro 24 ore nei giorni lavorativi. Per problemi urgenti relativi all'accessibilità, si prega di indicare 'URGENTE' nell'oggetto del messaggio.",

    // Booking Section
    "booking.title": "Prenota una consulenza",
    "booking.description":
      "Pronto a rendere i tuoi prodotti digitali più accessibili? Parliamo del tuo progetto ed esploriamo come posso aiutarti a creare esperienze inclusive.",
    "booking.schedule.title": "Programma la tua consulenza gratuita",
    "booking.schedule.desc":
      "Scegli un orario che funziona meglio per te. Tutte le consulenze si svolgono tramite videochiamata.",
    "booking.expect.title": "Cosa aspettarsi",
    "booking.expect.1": "Discussione personalizzata sui tuoi obiettivi di accessibilità",
    "booking.expect.2": "Raccomandazioni esperte su misura per il tuo progetto",
    "booking.expect.3": "Prossimi passi chiari e cronologia di implementazione",
    "booking.expect.4": "Nessun obbligo - solo approfondimenti preziosi per il tuo progetto",

    // Consultation Types
    "consultation.audit.time": "30 minuti",
    "consultation.audit.title": "Consulenza audit di Accessibilità",
    "consultation.audit.desc":
      "Discuti le esigenze di accessibilità del tuo progetto e ottieni un piano di audit personalizzato.",
    "consultation.training.time": "60 minuti",
    "consultation.training.title": "Sessione di formazione del team",
    "consultation.training.desc": "Pianifica la formazione sull'accessibilità per i tuoi team di sviluppo e design.",
    "consultation.discovery.time": "45 minuti",
    "consultation.discovery.title": "Chiamata di soperta del progetto",
    "consultation.discovery.desc": "Esplora come possiamo lavorare insieme sulle tue esigenze di sviluppo frontend.",

    // Experience
    "experience.back.home": "Torna alla home",
    "experience.title": "Esperienza Professionale",
    "experience.description": "Senior Frontend Engineer con oltre 6 anni di esperienza nello sviluppo di applicazioni web inclusive, scalabili e ad alte prestazioni. Specializzata in React, Next.js, TypeScript e accessibilità (WCAG, ARIA). Ha contribuito a importanti piattaforme nei settori finanziario, e-commerce, streaming e agricoltura, collaborando con team globali in oltre 28 paesi.",
    "experience.skills": "Competenze tecniche",
    "experience.skills.hard": "Competenze tecniche specifiche",
    "experience.skills.soft": "Competenze trasversali",
    "experience.work": "Esperienza lavorativa",
    "experience.download.cv": "Scarica il CV",
    "experience.tech.used": "Tecnologie utilizzate",
    "experience.achievements": "Progetti e risultati",
    "experience.key": "Risultati principali",
    "experience.language": "Lingue",
    "experience.english": "Inglese",
    "experience.spanish": "Spagnolo",
    "experience.italian": "Italiano",
    "experience.level": "Livello:",
    "experience.level.native": "Nativo",
    "experience.level.fluent": "Fluente (C2)",
    "experience.level.intermediate": "Intermedio (B1)",
    "experience.information": "Esperienza nel lavoro da remoto con team distribuiti e multiculturali nei mercati globali. Disponibile per opportunità da remoto a livello mondiale.",
    "experience.get.in.touch": "Programmare una chiamata",
    "experience.call": "Mettiti in contatto",

    // Footer
    "footer.description":
      "Sviluppatrice Frontend e Ingegnere di Accessibilità appassionata nella costruzione di esperienze digitali belle, funzionali e inclusive.",
    "footer.navigation": "Navigazione",
    "footer.services": "Servizi",
    "footer.services.audits": "Audit di Accessibilità",
    "footer.services.development": "Sviluppo frontend",
    "footer.services.consulting": "Consulenza WCAG",
    "footer.services.training": "Formazione team",
    "footer.made.with": "Realizzato con cura e dedizione per tutti",
    "footer.github": "Vai al mio profilo GitHub",
    "footer.linkedin": "Vai al mio profilo LinkedIn",
    "footer.email": "Inviami un'email",
    "footer.member": "Orgogliosa membro di A11y Webring",
    "footer.previous": "← Sito Web Precedente",
    "footer.random": "Sito Web Casuale",
    "footer.next": "Prossimo Sito Web →",

    // Common
    "common.minutes": "minuti",
    "common.min.read": "min di lettura",
    "common.required": "richiesto",

    // Rich text
    "rich.copy": "Copia codice",
    "rich.copied": "Codice copiato"
  },
} as const

export type TranslationKey = keyof typeof translations['en']

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key
}