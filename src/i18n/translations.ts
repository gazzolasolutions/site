export type Lang = "en" | "es" | "pt";

export const translations = {
  // Header
  nav: {
    services: { en: "Services", es: "Servicios", pt: "Serviços" },
    itin: { en: "ITIN", es: "ITIN", pt: "ITIN" },
    faq: { en: "FAQ", es: "Preguntas", pt: "Perguntas" },
    contact: { en: "Contact", es: "Contacto", pt: "Contato" },
    callNow: { en: "Call Now", es: "Llamar", pt: "Ligar" },
    whatsapp: { en: "WhatsApp", es: "WhatsApp", pt: "WhatsApp" },
    getStarted: { en: "Get Started", es: "Comenzar", pt: "Começar" },
  },

  // Hero
  hero: {
    title: {
      en: "Start and Manage Your Florida Company in 3 Simple Steps",
      es: "Inicie y Administre Su Empresa en Florida en 3 Simples Pasos",
      pt: "Abra e Gerencie Sua Empresa na Flórida em 3 Passos Simples",
    },
    subtitle: {
      en: "Whether you're just starting or already operating, we have a solution for you.",
      es: "Ya sea que esté comenzando o ya operando, tenemos una solución para usted.",
      pt: "Seja você iniciante ou já em operação, temos uma solução para você.",
    },
    bullets: {
      en: ["No SSN required", "ITIN without mailing your passport", "Multilingual support", "Step by step guidance"],
      es: ["Sin necesidad de SSN", "ITIN sin enviar su pasaporte", "Soporte multilingüe", "Orientación paso a paso"],
      pt: ["Sem necessidade de SSN", "ITIN sem enviar seu passaporte", "Suporte multilíngue", "Orientação passo a passo"],
    },
    cta: { en: "Get Started Now", es: "Comenzar Ahora", pt: "Começar Agora" },
    consultation: { en: "Book a Free Consultation", es: "Agendar una Consulta Gratuita", pt: "Agendar uma Consulta Gratuita" },
    imgAlt: {
      en: "Start your US business easily",
      es: "Inicie su negocio en EE.UU. fácilmente",
      pt: "Abra seu negócio nos EUA facilmente",
    },
  },

  // How It Works
  howItWorks: {
    title: {
      en: "How It Works in 3 Simple Steps",
      es: "Cómo Funciona en 3 Simples Pasos",
      pt: "Como Funciona em 3 Passos Simples",
    },
    step: { en: "Step", es: "Paso", pt: "Passo" },
    steps: {
      en: [
        { title: "Tell Us About Your Business", desc: "Share your goals and we'll map the best path forward." },
        { title: "We Handle the Paperwork", desc: "Our team takes care of filing, registration, and approvals." },
        { title: "Your US Business Is Ready", desc: "Start operating your US company with full confidence." },
      ],
      es: [
        { title: "Cuéntenos Sobre Su Negocio", desc: "Comparta sus metas y le trazaremos el mejor camino." },
        { title: "Nosotros Hacemos el Papeleo", desc: "Nuestro equipo se encarga de registros, trámites y aprobaciones." },
        { title: "Su Empresa en EE.UU. Está Lista", desc: "Comience a operar su empresa con total confianza." },
      ],
      pt: [
        { title: "Conte-nos Sobre Seu Negócio", desc: "Compartilhe seus objetivos e traçaremos o melhor caminho." },
        { title: "Nós Cuidamos da Burocracia", desc: "Nossa equipe cuida de registros, documentação e aprovações." },
        { title: "Sua Empresa nos EUA Está Pronta", desc: "Comece a operar sua empresa com total confiança." },
      ],
    },
    cta: { en: "Start Your Application", es: "Iniciar Su Solicitud", pt: "Iniciar Sua Solicitação" },
  },

  // Services
  services: {
    title: {
      en: "Everything You Need to Start Your Florida Business",
      es: "Todo Lo Que Necesita Para Iniciar Su Empresa en Florida",
      pt: "Tudo Que Você Precisa Para Abrir Sua Empresa na Flórida",
    },
    subtitle: {
      en: "From formation to tax preparation. Florida-focused services for non-residents.",
      es: "Desde la formación hasta la preparación de impuestos. Servicios enfocados en Florida para no residentes.",
      pt: "Da formação à preparação de impostos. Serviços focados na Flórida para não residentes.",
    },
    cards: {
      en: [
        {
          title: "Open Your Florida Company the Right Way",
          bullets: ["Florida company formation", "State registration", "Operating Agreement"],
          note: "Operating Agreements are typically required for multi-member LLCs and optional for single-member LLCs.",
          cta: "Start My Company",
        },
        {
          title: "Get Your EIN Without the Headache",
          bullets: ["Every business typically needs an EIN", "EIN is separate from ITIN", "No SSN required", "IRS filing handled for you"],
          cta: "Apply for EIN",
        },
        {
          title: "Apply for Your ITIN",
          subtitle: "Certified Acceptance Agent Service",
          bullets: ["Keep your passport, no mailing required", "Avoid long delays", "Secure in-person or remote verification", "Full support in your language"],
          note: "Not every business owner needs an ITIN. We help determine if this applies to your situation.",
          cta: "Get My ITIN Safely",
        },
        {
          title: "Monthly Bookkeeping That Keeps You Organized",
          bullets: ["Monthly review", "Financial reports", "Clean records"],
          cta: "Let's Talk Numbers",
        },
        {
          title: "Professional Tax Preparation",
          bullets: ["Individual & business returns", "Expert review", "Serving Florida business owners"],
          cta: "Request Tax Help",
        },
        {
          title: "Annual Report Filing",
          bullets: ["Required yearly for Florida companies", "Timely filing to avoid penalties", "Hassle-free submission"],
          cta: "File My Annual Report",
        },
        {
          title: "Company Dissolution",
          bullets: ["Proper legal closure", "State filing handled", "Avoid ongoing obligations"],
          cta: "Dissolve My Company",
        },
        {
          title: "Company Reinstatement",
          bullets: ["Revive your inactive company", "Back in good standing", "Full state restoration"],
          cta: "Reinstate My Company",
        },
        {
          title: "Business Bank Account Guidance",
          bullets: ["Document checklist", "Bank preparation guidance", "Requirements explained clearly", "Built for Florida business owners"],
          cta: "Get Bank Account Guidance",
        },
      ],
      es: [
        {
          title: "Abra Su Compañía de Florida Correctamente",
          bullets: ["Formación de compañía en Florida", "Registro estatal", "Acuerdo Operativo"],
          note: "Los Acuerdos Operativos generalmente son requeridos para LLCs con múltiples miembros y opcionales para un solo miembro.",
          cta: "Iniciar Mi Compañía",
        },
        {
          title: "Obtenga Su EIN Sin Complicaciones",
          bullets: ["Todo negocio generalmente necesita un EIN", "El EIN es diferente del ITIN", "Sin necesidad de SSN", "Trámite ante el IRS incluido"],
          cta: "Solicitar EIN",
        },
        {
          title: "Solicite Su ITIN",
          subtitle: "Servicio de Agente de Aceptación Certificado",
          bullets: ["Conserve su pasaporte, sin enviarlo", "Evite largas demoras", "Verificación presencial o remota segura", "Soporte completo en su idioma"],
          note: "No todos los dueños de negocio necesitan un ITIN. Le ayudamos a determinar si aplica en su caso.",
          cta: "Obtener Mi ITIN",
        },
        {
          title: "Contabilidad Mensual Para Mantenerse Organizado",
          bullets: ["Revisión mensual", "Informes financieros", "Registros limpios"],
          cta: "Hablemos de Números",
        },
        {
          title: "Preparación Profesional de Impuestos",
          bullets: ["Declaraciones individuales y empresariales", "Revisión experta", "Sirviendo empresarios en Florida"],
          cta: "Solicitar Ayuda Fiscal",
        },
        {
          title: "Presentación de Informe Anual",
          bullets: ["Requerido anualmente para compañías en Florida", "Presentación puntual para evitar multas", "Trámite sin complicaciones"],
          cta: "Presentar Mi Informe Anual",
        },
        {
          title: "Disolución de Empresa",
          bullets: ["Cierre legal adecuado", "Trámite estatal incluido", "Evite obligaciones continuas"],
          cta: "Disolver Mi Empresa",
        },
        {
          title: "Reinstalación de Empresa",
          bullets: ["Reactive su compañía inactiva", "Regrese a buen estado", "Restauración estatal completa"],
          cta: "Reinstalar Mi Empresa",
        },
        {
          title: "Orientación Para Cuenta Bancaria Comercial",
          bullets: ["Lista de documentos", "Guía de preparación bancaria", "Requisitos explicados claramente", "Diseñado para empresarios en Florida"],
          cta: "Obtener Orientación Bancaria",
        },
      ],
      pt: [
        {
          title: "Abra Sua Empresa da Flórida da Forma Certa",
          bullets: ["Formação de empresa na Flórida", "Registro estadual", "Acordo Operacional"],
          note: "Acordos Operacionais geralmente são exigidos para LLCs com múltiplos membros e opcionais para membro único.",
          cta: "Iniciar Minha Empresa",
        },
        {
          title: "Obtenha Seu EIN Sem Dor de Cabeça",
          bullets: ["Todo negócio geralmente precisa de um EIN", "O EIN é diferente do ITIN", "Sem necessidade de SSN", "Processo junto ao IRS incluído"],
          cta: "Solicitar EIN",
        },
        {
          title: "Solicite Seu ITIN",
          subtitle: "Serviço de Agente de Aceitação Certificado",
          bullets: ["Mantenha seu passaporte, sem envio", "Evite longas demoras", "Verificação presencial ou remota segura", "Suporte completo no seu idioma"],
          note: "Nem todo dono de negócio precisa de um ITIN. Ajudamos a determinar se isso se aplica à sua situação.",
          cta: "Obter Meu ITIN",
        },
        {
          title: "Contabilidade Mensal Para Manter Tudo Organizado",
          bullets: ["Revisão mensal", "Relatórios financeiros", "Registros organizados"],
          cta: "Vamos Falar de Números",
        },
        {
          title: "Preparação Profissional de Impostos",
          bullets: ["Declarações individuais e empresariais", "Revisão especializada", "Atendendo empresários na Flórida"],
          cta: "Solicitar Ajuda Fiscal",
        },
        {
          title: "Declaração de Relatório Anual",
          bullets: ["Obrigatório anualmente para empresas na Flórida", "Entrega pontual para evitar multas", "Processo sem complicações"],
          cta: "Entregar Meu Relatório Anual",
        },
        {
          title: "Dissolução de Empresa",
          bullets: ["Encerramento legal adequado", "Processo estadual incluído", "Evite obrigações contínuas"],
          cta: "Dissolver Minha Empresa",
        },
        {
          title: "Reativação de Empresa",
          bullets: ["Reative sua empresa inativa", "Volte a ficar em dia", "Restauração estadual completa"],
          cta: "Reativar Minha Empresa",
        },
        {
          title: "Orientação Para Conta Bancária Comercial",
          bullets: ["Lista de documentos", "Guia de preparação bancária", "Requisitos explicados com clareza", "Feito para empresários na Flórida"],
          cta: "Obter Orientação Bancária",
        },
      ],
    },
  },

  // Trust Section
  trust: {
    title: {
      en: "Trusted by Entrepreneurs Worldwide",
      es: "Confianza de Emprendedores en Todo el Mundo",
      pt: "Confiança de Empreendedores no Mundo Todo",
    },
    badges: {
      en: ["Certified Acceptance Agent", "Multilingual Support", "Florida Business Focused"],
      es: ["Agente de Aceptación Certificado", "Soporte Multilingüe", "Enfoque en Negocios en Florida"],
      pt: ["Agente de Aceitação Certificado", "Suporte Multilíngue", "Foco em Negócios na Flórida"],
    },
    testimonials: {
      en: [
        { text: "They made the entire ITIN process painless. I kept my passport and got everything done in weeks!", name: "Maria S.", role: "E-commerce Founder" },
        { text: "Professional, fast, and they speak my language. Best decision I made for my US business.", name: "Carlos R.", role: "Tech Entrepreneur" },
      ],
      es: [
        { text: "¡Hicieron todo el proceso del ITIN sin complicaciones! Mantuve mi pasaporte y todo se resolvió en semanas.", name: "Maria S.", role: "Fundadora de E-commerce" },
        { text: "Profesionales, rápidos y hablan mi idioma. La mejor decisión que tomé para mi negocio en EE.UU.", name: "Carlos R.", role: "Emprendedor Tech" },
      ],
      pt: [
        { text: "Fizeram todo o processo do ITIN sem complicação! Mantive meu passaporte e tudo foi resolvido em semanas.", name: "Maria S.", role: "Fundadora de E-commerce" },
        { text: "Profissionais, rápidos e falam meu idioma. Melhor decisão que tomei para meu negócio nos EUA.", name: "Carlos R.", role: "Empreendedor Tech" },
      ],
    },
  },

  // FAQ
  faq: {
    title: {
      en: "Frequently Asked Questions",
      es: "Preguntas Frecuentes",
      pt: "Perguntas Frequentes",
    },
    items: {
      en: [
        { q: "Do I need an ITIN to open a company?", a: "Not necessarily. Many business owners only need an EIN to get started. We help you determine whether an ITIN applies to your situation." },
        { q: "Do I need to send my passport to the IRS?", a: "No. As a Certified Acceptance Agent, we verify your documents, so your passport never leaves your hands." },
        { q: "Do you only work with Florida companies?", a: "Yes, we are currently focused on Florida business formations to provide the best possible service and expertise." },
        { q: "Do I need to live in Florida?", a: "No. Non-residents can open a Florida company from anywhere in the world." },
        { q: "How long does it take?", a: "Florida company formation takes 1–2 weeks. ITIN processing is typically 8–12 weeks after submission to the IRS." },
        { q: "Do I need an SSN?", a: "No. We help non-residents who don't have an SSN get their EIN and, if needed, their ITIN." },
        { q: "What languages do you support?", a: "We offer full support in English, Portuguese, and Spanish to ensure clear communication throughout the process." },
      ],
      es: [
        { q: "¿Necesito un ITIN para abrir una compañía?", a: "No necesariamente. Muchos empresarios solo necesitan un EIN para comenzar. Le ayudamos a determinar si un ITIN aplica en su caso." },
        { q: "¿Necesito enviar mi pasaporte al IRS?", a: "No. Como Agente de Aceptación Certificado, verificamos sus documentos, para que su pasaporte nunca salga de sus manos." },
        { q: "¿Solo trabajan con empresas de Florida?", a: "Sí, actualmente estamos enfocados en formaciones de empresas en Florida para brindar el mejor servicio y experiencia posible." },
        { q: "¿Necesito vivir en Florida?", a: "No. Los no residentes pueden abrir una compañía en Florida desde cualquier parte del mundo." },
        { q: "¿Cuánto tiempo tarda?", a: "La formación de una compañía en Florida toma 1–2 semanas. El procesamiento del ITIN generalmente toma 8–12 semanas después de la presentación al IRS." },
        { q: "¿Necesito un SSN?", a: "No. Ayudamos a no residentes que no tienen SSN a obtener su EIN y, si es necesario, su ITIN." },
        { q: "¿Qué idiomas soportan?", a: "Ofrecemos soporte completo en inglés, portugués y español para asegurar una comunicación clara durante todo el proceso." },
      ],
      pt: [
        { q: "Preciso de um ITIN para abrir uma empresa?", a: "Não necessariamente. Muitos empresários só precisam de um EIN para começar. Ajudamos você a determinar se um ITIN se aplica à sua situação." },
        { q: "Preciso enviar meu passaporte para o IRS?", a: "Não. Como Agente de Aceitação Certificado, verificamos seus documentos, para que seu passaporte nunca saia das suas mãos." },
        { q: "Vocês só trabalham com empresas da Flórida?", a: "Sim, atualmente estamos focados em formações de empresas na Flórida para oferecer o melhor serviço e expertise possível." },
        { q: "Preciso morar na Flórida?", a: "Não. Não residentes podem abrir uma empresa na Flórida de qualquer lugar do mundo." },
        { q: "Quanto tempo demora?", a: "A formação de uma empresa na Flórida leva 1–2 semanas. O processamento do ITIN geralmente leva 8–12 semanas após a submissão ao IRS." },
        { q: "Preciso de um SSN?", a: "Não. Ajudamos não residentes que não têm SSN a obter seu EIN e, se necessário, seu ITIN." },
        { q: "Quais idiomas vocês oferecem suporte?", a: "Oferecemos suporte completo em inglês, português e espanhol para garantir uma comunicação clara durante todo o processo." },
      ],
    },
  },

  // Final CTA
  finalCTA: {
    title: {
      en: "Ready to Start Your Florida Business the Right Way?",
      es: "¿Listo Para Iniciar Su Empresa en Florida de la Forma Correcta?",
      pt: "Pronto Para Abrir Sua Empresa na Flórida da Forma Certa?",
    },
    subtitle: {
      en: "Join hundreds of entrepreneurs who trusted us to launch their US businesses.",
      es: "Únase a cientos de emprendedores que confiaron en nosotros para lanzar sus empresas en EE.UU.",
      pt: "Junte-se a centenas de empreendedores que confiaram em nós para abrir suas empresas nos EUA.",
    },
    cta: { en: "Start Now", es: "Comenzar Ahora", pt: "Começar Agora" },
    consultation: { en: "Book a Free Consultation", es: "Agendar una Consulta Gratuita", pt: "Agendar uma Consulta Gratuita" },
  },

  // Footer
  footer: {
    tagline: {
      en: "Helping non-residents and immigrants start their US businesses with confidence.",
      es: "Ayudando a no residentes e inmigrantes a iniciar sus negocios en EE.UU. con confianza.",
      pt: "Ajudando não residentes e imigrantes a abrir seus negócios nos EUA com confiança.",
    },
    quickLinks: { en: "Quick Links", es: "Enlaces Rápidos", pt: "Links Rápidos" },
    contactTitle: { en: "Contact", es: "Contacto", pt: "Contato" },
    copyright: {
      en: "Gazzola Solutions. All rights reserved. This is not legal or tax advice.",
      es: "Gazzola Solutions. Todos los derechos reservados. Esto no es asesoría legal o fiscal.",
      pt: "Gazzola Solutions. Todos os direitos reservados. Isto não é assessoria legal ou fiscal.",
    },
  },

  // Sticky Mobile CTA
  mobile: {
    call: { en: "Call", es: "Llamar", pt: "Ligar" },
    sms: { en: "SMS", es: "SMS", pt: "SMS" },
  },

  // Qualification Form
  form: {
    introTitle: {
      en: "Tell Us About Your Business Goals",
      es: "Cuéntanos Sobre los Objetivos de tu Negocio",
      pt: "Conte-nos Sobre os Objetivos do seu Negócio",
    },
    introSubtitle: {
      en: "This takes less than 60 seconds.",
      es: "Esto toma menos de 60 segundos.",
      pt: "Isso leva menos de 60 segundos.",
    },
    start: { en: "Start", es: "Comenzar", pt: "Começar" },
    continue: { en: "Continue", es: "Continuar", pt: "Continuar" },
    submit: { en: "Submit", es: "Enviar", pt: "Enviar" },
    submitting: { en: "Submitting...", es: "Enviando...", pt: "Enviando..." },
    back: { en: "Back", es: "Atrás", pt: "Voltar" },
    close: { en: "✕ Close", es: "✕ Cerrar", pt: "✕ Fechar" },
    step: { en: "Step", es: "Paso", pt: "Passo" },
    of: { en: "of", es: "de", pt: "de" },
    enterToContinue: { en: "Press", es: "Presione", pt: "Pressione" },
    enterLabel: { en: "to continue", es: "para continuar", pt: "para continuar" },

    step1Title: { en: "What do you need help with?", es: "¿Con qué necesita ayuda?", pt: "Com o que você precisa de ajuda?" },
    step1Subtitle: { en: "Select all that apply.", es: "Seleccione todo lo que aplique.", pt: "Selecione tudo que se aplica." },
    serviceOptions: {
      en: ["Florida LLC Formation", "EIN Application", "ITIN Application", "Bookkeeping", "Taxes", "Annual Report Filing", "Company Dissolution", "Company Reinstatement", "Not sure yet"],
      es: ["Formación de LLC en Florida", "Solicitud de EIN", "Solicitud de ITIN", "Contabilidad", "Impuestos", "Informe Anual", "Disolución de Empresa", "Reinstalación de Empresa", "No estoy seguro aún"],
      pt: ["Formação de LLC na Flórida", "Solicitação de EIN", "Solicitação de ITIN", "Contabilidade", "Impostos", "Relatório Anual", "Dissolução de Empresa", "Reativação de Empresa", "Ainda não tenho certeza"],
    },

    step2Title: { en: "How many owners will the company have?", es: "¿Cuántos dueños tendrá la empresa?", pt: "Quantos sócios a empresa terá?" },
    step2Subtitle: { en: "This helps us prepare the right documents.", es: "Esto nos ayuda a preparar los documentos correctos.", pt: "Isso nos ajuda a preparar os documentos certos." },
    ownerOptions: {
      en: ["Just me (Single Member)", "2 or more owners (Multi Member)", "Not sure yet"],
      es: ["Solo yo (Miembro Único)", "2 o más dueños (Múltiples Miembros)", "No estoy seguro aún"],
      pt: ["Apenas eu (Membro Único)", "2 ou mais sócios (Múltiplos Membros)", "Ainda não tenho certeza"],
    },

    step3Title: { en: "What is your full name?", es: "¿Cuál es su nombre completo?", pt: "Qual é o seu nome completo?" },
    step3Subtitle: { en: "So we know who we're helping.", es: "Para saber a quién estamos ayudando.", pt: "Para sabermos quem estamos ajudando." },
    step3Placeholder: { en: "e.g. Maria Garcia", es: "ej. Maria Garcia", pt: "ex. Maria Garcia" },

    step4Title: { en: "What is your phone number?", es: "¿Cuál es su número de teléfono?", pt: "Qual é o seu número de telefone?" },
    step4Subtitle: { en: "In case we need to reach you quickly.", es: "En caso de que necesitemos contactarle rápidamente.", pt: "Caso precisemos entrar em contato rapidamente." },

    step5Title: { en: "What is your email address?", es: "¿Cuál es su correo electrónico?", pt: "Qual é o seu e-mail?" },
    step5Subtitle: { en: "We'll send important updates here.", es: "Enviaremos actualizaciones importantes aquí.", pt: "Enviaremos atualizações importantes aqui." },

    finalTitle: { en: "You're All Set.", es: "¡Todo Listo!", pt: "Tudo Pronto!" },
    finalSubtitle: {
      en: "Our team will review your information and help you move forward with your Florida business.",
      es: "Nuestro equipo revisará su información y le ayudará a avanzar con su empresa en Florida.",
      pt: "Nossa equipe analisará suas informações e ajudará você a avançar com sua empresa na Flórida.",
    },
    scheduleCall: { en: "Schedule Your Free Call", es: "Agendar Su Llamada Gratuita", pt: "Agendar Sua Ligação Gratuita" },
    preferTalk: { en: "Prefer to talk now? Call or message us anytime.", es: "¿Prefiere hablar ahora? Llame o escríbanos en cualquier momento.", pt: "Prefere falar agora? Ligue ou mande mensagem a qualquer momento." },

    errors: {
      selectOne: { en: "Please select at least one option", es: "Por favor seleccione al menos una opción", pt: "Por favor selecione pelo menos uma opção" },
      selectOption: { en: "Please select an option", es: "Por favor seleccione una opción", pt: "Por favor selecione uma opção" },
      enterName: { en: "Please enter your name", es: "Por favor ingrese su nombre", pt: "Por favor insira seu nome" },
      enterPhone: { en: "Please enter your phone number", es: "Por favor ingrese su teléfono", pt: "Por favor insira seu telefone" },
      validEmail: { en: "Please enter a valid email", es: "Por favor ingrese un email válido", pt: "Por favor insira um e-mail válido" },
    },
  },
} as const;
