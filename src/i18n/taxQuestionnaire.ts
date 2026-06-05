export type TaxLang = "en" | "es" | "pt";

type Opt = [value: string, label: string];

interface TaxT {
  heroTitle1: string;
  heroTitle2: string;
  heroSub: string;
  introA: string;
  introB: string;
  returningLabel: string;
  returningBody: string;
  submit: string;
  submitting: string;
  submitNote: string;
  submitContact: string;
  successTitle: string;
  successBody: string;
  s1: {
    title: string;
    email: string;
    name: string; namePh: string;
    taxid: string; taxidHint: string;
    dob: string;
    address: string; addressHint: string; addressPh: string;
    position: string; positionHint: string; positionPh: string;
    resident: string; residentOpts: Opt[]; residentOtherPh: string;
  };
  s2: {
    title: string;
    spouse: string; spouseHint: string; spousePh: string;
    spouseIncome: string; spouseIncomeOpts: Opt[];
    dependents: string; dependentsHint: string; dependentsPh: string;
    daycare: string; daycareHint: string; daycarePh: string;
  };
  s3: {
    title: string;
    income: string; incomeHint: string; incomeOpts: Opt[]; incomeOtherPh: string;
    rental: string; rentalHint: string; rentalPh: string;
    foreign: string; foreignHint: string; foreignOpts: Opt[];
    student: string; studentHint: string; studentOpts: Opt[];
    ira: string; iraHint: string; iraPh: string;
  };
  s4: {
    title: string;
    mortgage: string; mortgageHint: string; mortgageOpts: Opt[];
    health: string; healthHint: string; healthOpts: Opt[];
    notesPh: string;
  };
  s5: {
    title: string;
    events: string; eventsHint: string; eventsOpts: Opt[]; eventsOtherPh: string;
    banking: string; bankingHint: string; bankingPh: string;
  };
  s6: {
    title: string;
    notes: string; notesHint: string; notesPh: string;
    upload: string; uploadHint: string; uploadHintTail: string;
    uploadCta: string; uploadLimits: string; browse: string;
  };
}

export const taxQ: Record<TaxLang, TaxT> = {
  en: {
    heroTitle1: "Individual Income Tax Return",
    heroTitle2: "Preparation Questionnaire",
    heroSub: "Please complete all applicable fields before your appointment.",
    introA: "Thank you for considering",
    introB: "for your income tax preparation. Our fee will be communicated to you upon review of this completed questionnaire. There is no commitment required if you choose not to proceed with our services.",
    returningLabel: "Returning clients:",
    returningBody: "Please respond only to items that have changed since last year — for example, a new address, new dependent, IRA activity, or a new tax event. For all unchanged items, simply enter SAME, NO, or N/A. You may upload supporting documents at the end of this form. Questions? Don't hesitate to reach out!",
    submit: "Submit Questionnaire",
    submitting: "Submitting...",
    submitNote: "By submitting, you confirm that the information provided is accurate to the best of your knowledge.",
    submitContact: "Questions? Email us at",
    successTitle: "✓ Questionnaire Received!",
    successBody: "We'll review your information and be in touch shortly with your preparation fee and next steps.",
    s1: {
      title: "Client Information",
      email: "Email Address",
      name: "Full Legal Name", namePh: "As it appears on your tax documents",
      taxid: "Tax ID (SSN or ITIN)", taxidHint: "Only if not clearly legible on your submitted tax forms.",
      dob: "Date of Birth",
      address: "Current Mailing Address",
      addressHint: "If different from the address shown on your W-2, 1099, or K-1.",
      addressPh: "Street address, City, State, ZIP",
      position: "Occupation / Line of Work",
      positionHint: "e.g., cleaning, engineering, customer service, pilot, healthcare, etc.",
      positionPh: "Your occupation",
      resident: "Full-year Florida resident? (more than 183 days)",
      residentOpts: [
        ["yes", "Yes — full-year Florida resident"],
        ["no", "No"],
        ["other", "Other / Part-year (please explain below)"],
      ],
      residentOtherPh: "If 'Other', please explain…",
    },
    s2: {
      title: "Filing Status & Dependents",
      spouse: "Marital Status & Spouse Information",
      spouseHint: "If married, please provide your spouse's full legal name, date of birth, and Tax ID (SSN or ITIN). Enter N/A if not applicable.",
      spousePh: "Full name, Date of birth, SSN/ITIN — or N/A",
      spouseIncome: "Did your spouse have income? (Filing jointly only)",
      spouseIncomeOpts: [
        ["none", "Spouse had no income"],
        ["yes", "Spouse had income — tax forms will be attached"],
        ["separate", "Filing separately / Not applicable"],
      ],
      dependents: "Do you have any dependents?",
      dependentsHint: "If yes, for each dependent please provide: relationship, full name, date of birth, and Tax ID (SSN or ITIN).",
      dependentsPh: "e.g., Child — Maria Silva — 06/10/2018 — XXX-XX-XXXX\nEnter N/A if none.",
      daycare: "Childcare expenses for a dependent child under age 13?",
      daycareHint: "If yes, please provide the total amount paid and the provider's Tax ID (EIN or SSN — individual and/or business).",
      daycarePh: "Provider name, amount paid, provider Tax ID — or N/A",
    },
    s3: {
      title: "Income",
      income: "What type(s) of income did you receive? Select all that apply.",
      incomeHint: "If self-employed, please attach your Income & Expenses spreadsheet at the end of this form.",
      incomeOpts: [
        ["w2", "W-2 (wages / salary)"],
        ["1099nec", "1099-NEC (self-employment / freelance)"],
        ["k1", "K-1 (partnership / S-corp / trust)"],
        ["cash", "Cash income"],
        ["ss", "Social Security benefits"],
        ["pension", "Pension / retirement distributions"],
        ["unemployment", "Unemployment / reemployment assistance"],
        ["other", "Other (describe below)"],
      ],
      incomeOtherPh: "If 'Other', please describe…",
      rental: "Rental income, capital gains/losses, or other miscellaneous income?",
      rentalHint: "Examples: rental property income, stock or investment sales, legal settlements, etc.",
      rentalPh: "Please describe any applicable income, or enter N/A…",
      foreign: "Foreign financial accounts during the tax year?",
      foreignHint: "Includes checking, savings, brokerage, or other financial accounts held outside the United States.",
      foreignOpts: [
        ["none", "No foreign accounts"],
        ["under10k", "Yes — combined value $10,000 or less"],
        ["over10k", "Yes — combined value exceeds $10,000"],
        ["unsure", "Not sure"],
      ],
      student: "Student tax forms — 1098-T / 1098-E?",
      studentHint: "If you were enrolled as a student, did you receive Form 1098-T (Tuition Statement) and/or Form 1098-E (Student Loan Interest Statement)?",
      studentOpts: [
        ["na", "Not a student / N/A"],
        ["1098t", "Yes — received Form 1098-T (will attach)"],
        ["1098e", "Yes — received Form 1098-E (will attach)"],
        ["both", "Yes — received both forms (will attach)"],
      ],
      ira: "IRA contributions or distributions during the tax year?",
      iraHint: "If yes, please indicate: type of IRA (Traditional or Roth), date(s), and amount(s).",
      iraPh: "e.g., Roth IRA contribution of $6,000 on 03/15 — or N/A",
    },
    s4: {
      title: "Deductions & Credits",
      mortgage: "Did you pay a mortgage on your primary residence during the tax year?",
      mortgageHint: "If yes, please attach Form 1098 (Mortgage Interest Statement) at the end of this form.",
      mortgageOpts: [
        ["yes", "Yes — I will attach Form 1098"],
        ["no", "No"],
        ["na", "N/A"],
      ],
      health: "Health insurance coverage during the tax year?",
      healthHint: "If you had Marketplace (ACA) coverage, please attach Form 1095-A. Forms 1095-B and 1095-C do not need to be submitted.",
      healthOpts: [
        ["none", "No health insurance"],
        ["employer", "Yes — employer or private coverage (no 1095-A)"],
        ["marketplace", "Yes — Marketplace (ACA) coverage — I will attach Form 1095-A"],
        ["unsure", "Not sure"],
      ],
      notesPh: "Additional notes (optional)…",
    },
    s5: {
      title: "Other Tax Events & Banking",
      events: "Did any of the following occur during the tax year? Select all that apply.",
      eventsHint: "Note: child support payments are not a taxable event.",
      eventsOpts: [
        ["newborn", "Birth of a child / new dependent"],
        ["marriage", "Marriage"],
        ["divorce", "Divorce"],
        ["alimony", "Alimony paid or received"],
        ["home", "Purchase of a primary home (new mortgage)"],
        ["solar", "Solar panel installation (home or business)"],
        ["crypto", "Cryptocurrency transactions"],
        ["stocks", "Stock / securities transactions"],
        ["realestate", "Real estate sale or purchase"],
        ["ev", "Electric vehicle acquisition"],
        ["none", "None of the above"],
        ["other", "Other (describe below)"],
      ],
      eventsOtherPh: "If 'Other', please describe…",
      banking: "Bank information for direct deposit (refund) or direct debit (balance due)",
      bankingHint: "Optional but strongly recommended — faster, safer, and at no additional cost. Please indicate whether the account is checking or savings.",
      bankingPh: "Bank name, Routing #, Account #, Account type (Checking or Savings) — or 'Prefer not to provide'",
    },
    s6: {
      title: "Document Upload & Notes",
      notes: "Additional Notes",
      notesHint: "Anything else you'd like us to know, or any questions you have for us.",
      notesPh: "Optional — any other information, questions, or context…",
      upload: "Upload Supporting Documents",
      uploadHint: "Please attach all relevant tax forms: W-2, 1099, 1095-A, 1098, K-1, etc. Maximum 10 files. If you need to combine documents into a single PDF, use",
      uploadHintTail: "free, no account required.",
      uploadCta: "Click to select files, or drag & drop here",
      uploadLimits: "PDF, JPG, PNG — max 10 files · max 25 MB each",
      browse: "Browse Files",
    },
  },

  es: {
    heroTitle1: "Declaración de Impuestos Personales",
    heroTitle2: "Cuestionario de Preparación",
    heroSub: "Por favor complete todos los campos aplicables antes de su cita.",
    introA: "Gracias por considerar a",
    introB: "para la preparación de su declaración de impuestos. Nuestro honorario le será comunicado tras la revisión de este cuestionario completado. No hay compromiso si decide no continuar con nuestros servicios.",
    returningLabel: "Clientes recurrentes:",
    returningBody: "Por favor responda solo a los puntos que hayan cambiado desde el año pasado — por ejemplo, nueva dirección, nuevo dependiente, actividad en IRA o un nuevo evento fiscal. Para todo lo que no haya cambiado, simplemente escriba IGUAL, NO o N/A. Puede adjuntar documentos al final del formulario. ¿Preguntas? ¡No dude en contactarnos!",
    submit: "Enviar Cuestionario",
    submitting: "Enviando...",
    submitNote: "Al enviar, confirma que la información proporcionada es precisa según su mejor conocimiento.",
    submitContact: "¿Preguntas? Escríbanos a",
    successTitle: "✓ ¡Cuestionario Recibido!",
    successBody: "Revisaremos su información y nos pondremos en contacto pronto con el honorario y los próximos pasos.",
    s1: {
      title: "Información del Cliente",
      email: "Correo Electrónico",
      name: "Nombre Legal Completo", namePh: "Tal como aparece en sus documentos fiscales",
      taxid: "Número de Identificación Fiscal (SSN o ITIN)", taxidHint: "Solo si no es claramente legible en los formularios que enviará.",
      dob: "Fecha de Nacimiento",
      address: "Dirección Postal Actual",
      addressHint: "Si es distinta de la dirección que aparece en su W-2, 1099 o K-1.",
      addressPh: "Calle, ciudad, estado, código postal",
      position: "Ocupación / Profesión",
      positionHint: "ej., limpieza, ingeniería, atención al cliente, piloto, salud, etc.",
      positionPh: "Su ocupación",
      resident: "¿Residente de Florida todo el año? (más de 183 días)",
      residentOpts: [
        ["yes", "Sí — residente de Florida todo el año"],
        ["no", "No"],
        ["other", "Otro / Parte del año (explique abajo)"],
      ],
      residentOtherPh: "Si seleccionó 'Otro', explique…",
    },
    s2: {
      title: "Estado Civil y Dependientes",
      spouse: "Estado Civil e Información del Cónyuge",
      spouseHint: "Si está casado/a, por favor indique el nombre legal completo del cónyuge, fecha de nacimiento y número fiscal (SSN o ITIN). Escriba N/A si no aplica.",
      spousePh: "Nombre completo, Fecha de nacimiento, SSN/ITIN — o N/A",
      spouseIncome: "¿Su cónyuge tuvo ingresos? (Solo si declaran en conjunto)",
      spouseIncomeOpts: [
        ["none", "El cónyuge no tuvo ingresos"],
        ["yes", "El cónyuge tuvo ingresos — adjuntará formularios"],
        ["separate", "Declaración por separado / No aplica"],
      ],
      dependents: "¿Tiene algún dependiente?",
      dependentsHint: "En caso afirmativo, indique por cada dependiente: parentesco, nombre completo, fecha de nacimiento y número fiscal (SSN o ITIN).",
      dependentsPh: "ej., Hijo/a — Maria Silva — 10/06/2018 — XXX-XX-XXXX\nEscriba N/A si no aplica.",
      daycare: "¿Gastos de cuidado infantil para un dependiente menor de 13 años?",
      daycareHint: "En caso afirmativo, indique el monto total pagado y el número fiscal del proveedor (EIN o SSN — individual y/o empresa).",
      daycarePh: "Nombre del proveedor, monto pagado, número fiscal — o N/A",
    },
    s3: {
      title: "Ingresos",
      income: "¿Qué tipo(s) de ingreso recibió? Seleccione todos los que apliquen.",
      incomeHint: "Si trabaja por cuenta propia, adjunte su hoja de Ingresos y Gastos al final del formulario.",
      incomeOpts: [
        ["w2", "W-2 (salario)"],
        ["1099nec", "1099-NEC (independiente / freelance)"],
        ["k1", "K-1 (sociedad / S-corp / fideicomiso)"],
        ["cash", "Ingresos en efectivo"],
        ["ss", "Beneficios del Seguro Social"],
        ["pension", "Pensión / distribuciones de jubilación"],
        ["unemployment", "Desempleo / asistencia de reempleo"],
        ["other", "Otro (describa abajo)"],
      ],
      incomeOtherPh: "Si seleccionó 'Otro', describa…",
      rental: "¿Ingresos por alquiler, ganancias/pérdidas de capital u otros ingresos misceláneos?",
      rentalHint: "Ejemplos: ingreso de propiedad en alquiler, venta de acciones o inversiones, acuerdos legales, etc.",
      rentalPh: "Describa cualquier ingreso aplicable, o escriba N/A…",
      foreign: "¿Cuentas financieras en el extranjero durante el año fiscal?",
      foreignHint: "Incluye cuentas corrientes, de ahorros, de inversión u otras fuera de los Estados Unidos.",
      foreignOpts: [
        ["none", "No tiene cuentas en el extranjero"],
        ["under10k", "Sí — valor combinado de $10,000 o menos"],
        ["over10k", "Sí — valor combinado superior a $10,000"],
        ["unsure", "No estoy seguro/a"],
      ],
      student: "Formularios estudiantiles — ¿1098-T / 1098-E?",
      studentHint: "Si estuvo inscrito como estudiante, ¿recibió Formulario 1098-T (Matrícula) o 1098-E (Interés de Préstamo Estudiantil)?",
      studentOpts: [
        ["na", "No fue estudiante / N/A"],
        ["1098t", "Sí — recibió 1098-T (adjuntará)"],
        ["1098e", "Sí — recibió 1098-E (adjuntará)"],
        ["both", "Sí — recibió ambos formularios (adjuntará)"],
      ],
      ira: "¿Contribuciones o distribuciones de IRA durante el año fiscal?",
      iraHint: "Si aplica, indique: tipo de IRA (Tradicional o Roth), fecha(s) y monto(s).",
      iraPh: "ej., Contribución Roth IRA de $6,000 el 15/03 — o N/A",
    },
    s4: {
      title: "Deducciones y Créditos",
      mortgage: "¿Pagó hipoteca de su residencia principal durante el año fiscal?",
      mortgageHint: "En caso afirmativo, adjunte el Formulario 1098 (Interés Hipotecario) al final del formulario.",
      mortgageOpts: [
        ["yes", "Sí — adjuntaré el Formulario 1098"],
        ["no", "No"],
        ["na", "N/A"],
      ],
      health: "¿Cobertura de seguro médico durante el año fiscal?",
      healthHint: "Si tuvo cobertura del Marketplace (ACA), adjunte el Formulario 1095-A. Los formularios 1095-B y 1095-C no necesitan ser enviados.",
      healthOpts: [
        ["none", "Sin seguro médico"],
        ["employer", "Sí — cobertura del empleador o privada (sin 1095-A)"],
        ["marketplace", "Sí — Marketplace (ACA) — adjuntaré Formulario 1095-A"],
        ["unsure", "No estoy seguro/a"],
      ],
      notesPh: "Notas adicionales (opcional)…",
    },
    s5: {
      title: "Otros Eventos Fiscales y Banca",
      events: "¿Ocurrió alguno de los siguientes durante el año fiscal? Seleccione todos los que apliquen.",
      eventsHint: "Nota: la manutención infantil no es un evento fiscal.",
      eventsOpts: [
        ["newborn", "Nacimiento de un hijo/a / nuevo dependiente"],
        ["marriage", "Matrimonio"],
        ["divorce", "Divorcio"],
        ["alimony", "Pensión alimenticia pagada o recibida"],
        ["home", "Compra de residencia principal (nueva hipoteca)"],
        ["solar", "Instalación de paneles solares (casa o negocio)"],
        ["crypto", "Transacciones de criptomonedas"],
        ["stocks", "Transacciones de acciones / valores"],
        ["realestate", "Venta o compra de bienes raíces"],
        ["ev", "Adquisición de vehículo eléctrico"],
        ["none", "Ninguno de los anteriores"],
        ["other", "Otro (describa abajo)"],
      ],
      eventsOtherPh: "Si seleccionó 'Otro', describa…",
      banking: "Información bancaria para depósito directo (reembolso) o débito directo (saldo a pagar)",
      bankingHint: "Opcional pero muy recomendado — más rápido, seguro y sin costo adicional. Indique si la cuenta es corriente o de ahorros.",
      bankingPh: "Banco, número de ruta, número de cuenta, tipo de cuenta (Corriente o Ahorros) — o 'Prefiero no proporcionar'",
    },
    s6: {
      title: "Carga de Documentos y Notas",
      notes: "Notas Adicionales",
      notesHint: "Cualquier cosa que desee que sepamos, o preguntas que tenga para nosotros.",
      notesPh: "Opcional — cualquier otra información, preguntas o contexto…",
      upload: "Cargar Documentos de Respaldo",
      uploadHint: "Adjunte todos los formularios relevantes: W-2, 1099, 1095-A, 1098, K-1, etc. Máximo 10 archivos. Si necesita combinar documentos en un único PDF, use",
      uploadHintTail: "gratis, sin cuenta requerida.",
      uploadCta: "Haga clic para seleccionar archivos, o arrástrelos aquí",
      uploadLimits: "PDF, JPG, PNG — máx. 10 archivos · máx. 25 MB cada uno",
      browse: "Buscar Archivos",
    },
  },

  pt: {
    heroTitle1: "Declaração de Imposto de Renda Pessoa Física",
    heroTitle2: "Questionário de Preparação",
    heroSub: "Por favor preencha todos os campos aplicáveis antes do seu atendimento.",
    introA: "Obrigado por considerar a",
    introB: "para a preparação da sua declaração. Nosso honorário será informado após a análise deste questionário. Não há compromisso caso decida não prosseguir com nossos serviços.",
    returningLabel: "Clientes recorrentes:",
    returningBody: "Responda apenas aos itens que mudaram desde o ano passado — por exemplo, novo endereço, novo dependente, atividade em IRA ou novo evento fiscal. Para os itens inalterados, basta escrever IGUAL, NÃO ou N/A. Você poderá anexar documentos ao final do formulário. Dúvidas? Fale com a gente!",
    submit: "Enviar Questionário",
    submitting: "Enviando...",
    submitNote: "Ao enviar, você confirma que as informações são precisas conforme seu conhecimento.",
    submitContact: "Dúvidas? Escreva para",
    successTitle: "✓ Questionário Recebido!",
    successBody: "Vamos revisar suas informações e em breve entraremos em contato com o honorário e os próximos passos.",
    s1: {
      title: "Informações do Cliente",
      email: "E-mail",
      name: "Nome Legal Completo", namePh: "Como aparece nos seus documentos fiscais",
      taxid: "Número Fiscal (SSN ou ITIN)", taxidHint: "Apenas se não estiver claramente legível nos formulários enviados.",
      dob: "Data de Nascimento",
      address: "Endereço Postal Atual",
      addressHint: "Se diferente do endereço no seu W-2, 1099 ou K-1.",
      addressPh: "Endereço, cidade, estado, CEP",
      position: "Ocupação / Profissão",
      positionHint: "ex., limpeza, engenharia, atendimento, piloto, saúde, etc.",
      positionPh: "Sua ocupação",
      resident: "Residente da Flórida o ano inteiro? (mais de 183 dias)",
      residentOpts: [
        ["yes", "Sim — residente da Flórida o ano todo"],
        ["no", "Não"],
        ["other", "Outro / Parcial (explique abaixo)"],
      ],
      residentOtherPh: "Se selecionou 'Outro', explique…",
    },
    s2: {
      title: "Estado Civil e Dependentes",
      spouse: "Estado Civil e Informações do Cônjuge",
      spouseHint: "Se casado(a), informe o nome legal completo do cônjuge, data de nascimento e número fiscal (SSN ou ITIN). Escreva N/A se não se aplica.",
      spousePh: "Nome completo, Data de nascimento, SSN/ITIN — ou N/A",
      spouseIncome: "Seu cônjuge teve renda? (Apenas declaração conjunta)",
      spouseIncomeOpts: [
        ["none", "O cônjuge não teve renda"],
        ["yes", "O cônjuge teve renda — formulários serão anexados"],
        ["separate", "Declaração separada / Não se aplica"],
      ],
      dependents: "Você tem dependentes?",
      dependentsHint: "Se sim, para cada dependente informe: parentesco, nome completo, data de nascimento e número fiscal (SSN ou ITIN).",
      dependentsPh: "ex., Filho(a) — Maria Silva — 10/06/2018 — XXX-XX-XXXX\nEscreva N/A se nenhum.",
      daycare: "Gastos com creche para dependente menor de 13 anos?",
      daycareHint: "Se sim, informe o valor total pago e o número fiscal do prestador (EIN ou SSN — pessoa e/ou empresa).",
      daycarePh: "Nome do prestador, valor pago, número fiscal — ou N/A",
    },
    s3: {
      title: "Renda",
      income: "Que tipo(s) de renda você recebeu? Selecione todos que se aplicam.",
      incomeHint: "Se autônomo, anexe sua planilha de Receitas & Despesas no final do formulário.",
      incomeOpts: [
        ["w2", "W-2 (salário)"],
        ["1099nec", "1099-NEC (autônomo / freelance)"],
        ["k1", "K-1 (sociedade / S-corp / trust)"],
        ["cash", "Renda em espécie"],
        ["ss", "Benefícios do Social Security"],
        ["pension", "Pensão / distribuições de aposentadoria"],
        ["unemployment", "Seguro-desemprego / assistência"],
        ["other", "Outro (descreva abaixo)"],
      ],
      incomeOtherPh: "Se selecionou 'Outro', descreva…",
      rental: "Renda de aluguel, ganhos/perdas de capital ou outras rendas?",
      rentalHint: "Exemplos: renda de imóvel alugado, venda de ações ou investimentos, acordos legais, etc.",
      rentalPh: "Descreva qualquer renda aplicável, ou escreva N/A…",
      foreign: "Contas financeiras no exterior durante o ano fiscal?",
      foreignHint: "Inclui conta corrente, poupança, corretagem ou outras fora dos Estados Unidos.",
      foreignOpts: [
        ["none", "Sem contas no exterior"],
        ["under10k", "Sim — valor combinado de US$ 10.000 ou menos"],
        ["over10k", "Sim — valor combinado acima de US$ 10.000"],
        ["unsure", "Não tenho certeza"],
      ],
      student: "Formulários estudantis — 1098-T / 1098-E?",
      studentHint: "Se foi estudante matriculado, recebeu Formulário 1098-T (Matrícula) ou 1098-E (Juros de Empréstimo Estudantil)?",
      studentOpts: [
        ["na", "Não foi estudante / N/A"],
        ["1098t", "Sim — recebi 1098-T (vou anexar)"],
        ["1098e", "Sim — recebi 1098-E (vou anexar)"],
        ["both", "Sim — recebi os dois formulários (vou anexar)"],
      ],
      ira: "Contribuições ou distribuições de IRA durante o ano fiscal?",
      iraHint: "Se aplicável, indique: tipo de IRA (Tradicional ou Roth), data(s) e valor(es).",
      iraPh: "ex., Contribuição Roth IRA de US$ 6.000 em 15/03 — ou N/A",
    },
    s4: {
      title: "Deduções e Créditos",
      mortgage: "Pagou financiamento da residência principal durante o ano fiscal?",
      mortgageHint: "Se sim, anexe o Formulário 1098 (Juros do Financiamento) ao final do formulário.",
      mortgageOpts: [
        ["yes", "Sim — vou anexar o Formulário 1098"],
        ["no", "Não"],
        ["na", "N/A"],
      ],
      health: "Cobertura de plano de saúde durante o ano fiscal?",
      healthHint: "Se teve cobertura do Marketplace (ACA), anexe o Formulário 1095-A. Os formulários 1095-B e 1095-C não precisam ser enviados.",
      healthOpts: [
        ["none", "Sem plano de saúde"],
        ["employer", "Sim — cobertura do empregador ou privada (sem 1095-A)"],
        ["marketplace", "Sim — Marketplace (ACA) — vou anexar Formulário 1095-A"],
        ["unsure", "Não tenho certeza"],
      ],
      notesPh: "Observações adicionais (opcional)…",
    },
    s5: {
      title: "Outros Eventos Fiscais e Bancário",
      events: "Algum dos eventos a seguir ocorreu no ano fiscal? Selecione todos que se aplicam.",
      eventsHint: "Obs.: pensão alimentícia infantil não é evento fiscal.",
      eventsOpts: [
        ["newborn", "Nascimento de filho(a) / novo dependente"],
        ["marriage", "Casamento"],
        ["divorce", "Divórcio"],
        ["alimony", "Pensão paga ou recebida"],
        ["home", "Compra da residência principal (novo financiamento)"],
        ["solar", "Instalação de painéis solares (casa ou empresa)"],
        ["crypto", "Transações com criptomoedas"],
        ["stocks", "Operações com ações / títulos"],
        ["realestate", "Venda ou compra de imóvel"],
        ["ev", "Aquisição de veículo elétrico"],
        ["none", "Nenhuma das opções acima"],
        ["other", "Outro (descreva abaixo)"],
      ],
      eventsOtherPh: "Se selecionou 'Outro', descreva…",
      banking: "Dados bancários para depósito direto (reembolso) ou débito direto (saldo a pagar)",
      bankingHint: "Opcional mas muito recomendado — mais rápido, seguro e sem custo extra. Indique se a conta é corrente ou poupança.",
      bankingPh: "Banco, Routing #, Número da conta, Tipo (Corrente ou Poupança) — ou 'Prefiro não informar'",
    },
    s6: {
      title: "Envio de Documentos e Observações",
      notes: "Observações Adicionais",
      notesHint: "Algo mais que deseja nos informar ou perguntas que tenha para nós.",
      notesPh: "Opcional — qualquer outra informação, dúvidas ou contexto…",
      upload: "Enviar Documentos de Suporte",
      uploadHint: "Anexe todos os formulários relevantes: W-2, 1099, 1095-A, 1098, K-1, etc. Máximo 10 arquivos. Para combinar documentos em um único PDF, use",
      uploadHintTail: "gratuito, sem cadastro.",
      uploadCta: "Clique para selecionar arquivos, ou arraste aqui",
      uploadLimits: "PDF, JPG, PNG — máx. 10 arquivos · máx. 25 MB cada",
      browse: "Selecionar Arquivos",
    },
  },
};
