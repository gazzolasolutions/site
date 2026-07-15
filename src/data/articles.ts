import type { Lang } from "@/i18n/translations";

type Localized = Record<Lang, string>;

export interface ArticleSection {
  heading: Localized;
  body: Localized;
}

export interface Article {
  slug: string;
  date: string;
  readMinutes: number;
  title: Localized;
  excerpt: Localized;
  sections: ArticleSection[];
}

export const ARTICLES: Article[] = [
  {
    slug: "itin-vs-ein",
    date: "2026-07-14",
    readMinutes: 4,
    title: {
      en: "ITIN vs EIN: What's the Difference and Which One Do You Need?",
      es: "ITIN vs EIN: ¿Cuál es la Diferencia y Cuál Necesita?",
      pt: "ITIN vs EIN: Qual é a Diferença e Qual Você Precisa?",
    },
    excerpt: {
      en: "Two IRS numbers, two very different purposes. Learn which one your US business actually needs — and which one you might not need at all.",
      es: "Dos números del IRS, dos propósitos muy diferentes. Descubra cuál necesita realmente su negocio en EE.UU.",
      pt: "Dois números do IRS, dois propósitos bem diferentes. Descubra qual deles seu negócio nos EUA realmente precisa.",
    },
    sections: [
      {
        heading: { en: "What is an EIN?", es: "¿Qué es un EIN?", pt: "O que é um EIN?" },
        body: {
          en: "An EIN (Employer Identification Number) is the tax ID of your company. Think of it as the social security number of your business: banks ask for it to open a business account, payment processors require it, and the IRS uses it to identify your company. Almost every US business needs one — and you can get it without a Social Security Number (SSN).",
          es: "El EIN (Employer Identification Number) es la identificación fiscal de su compañía. Es como el número de seguro social de su negocio: los bancos lo piden para abrir una cuenta comercial, los procesadores de pago lo requieren y el IRS lo usa para identificar su empresa. Casi todo negocio en EE.UU. necesita uno — y puede obtenerlo sin Número de Seguro Social (SSN).",
          pt: "O EIN (Employer Identification Number) é a identificação fiscal da sua empresa. Pense nele como o CPF do seu negócio: bancos pedem para abrir conta empresarial, processadores de pagamento exigem, e o IRS o usa para identificar sua empresa. Quase todo negócio nos EUA precisa de um — e você pode obtê-lo sem Número de Seguro Social (SSN).",
        },
      },
      {
        heading: { en: "What is an ITIN?", es: "¿Qué es un ITIN?", pt: "O que é um ITIN?" },
        body: {
          en: "An ITIN (Individual Taxpayer Identification Number) identifies you as a person, not your company. The IRS issues it to individuals who need to file US taxes but don't qualify for a Social Security Number. Non-resident business owners typically need an ITIN when they have to report US income personally.",
          es: "El ITIN (Individual Taxpayer Identification Number) lo identifica a usted como persona, no a su compañía. El IRS lo emite para personas que deben declarar impuestos en EE.UU. pero no califican para un número de Seguro Social. Los dueños de negocios no residentes generalmente necesitan un ITIN cuando deben reportar ingresos de EE.UU. personalmente.",
          pt: "O ITIN (Individual Taxpayer Identification Number) identifica você como pessoa física, não sua empresa. O IRS o emite para quem precisa declarar impostos nos EUA mas não se qualifica para um Social Security Number. Donos de negócios não residentes geralmente precisam de um ITIN quando têm que declarar renda dos EUA pessoalmente.",
        },
      },
      {
        heading: { en: "Which one do you need?", es: "¿Cuál necesita?", pt: "Qual você precisa?" },
        body: {
          en: "Most non-residents starting a Florida company need an EIN first — it's what lets the business operate. The ITIN comes later, usually at tax time. Not every business owner needs an ITIN, and applying for one you don't need wastes time and money. A quick review of your situation tells you exactly which numbers apply.",
          es: "La mayoría de los no residentes que abren una compañía en Florida necesitan primero un EIN — es lo que permite operar el negocio. El ITIN viene después, normalmente en la temporada de impuestos. No todo dueño de negocio necesita un ITIN, y solicitar uno innecesario desperdicia tiempo y dinero. Una revisión rápida de su situación le dice exactamente qué números aplican.",
          pt: "A maioria dos não residentes que abrem empresa na Flórida precisa primeiro de um EIN — é ele que permite o negócio operar. O ITIN vem depois, normalmente na época de impostos. Nem todo dono de negócio precisa de ITIN, e solicitar um sem necessidade desperdiça tempo e dinheiro. Uma análise rápida da sua situação mostra exatamente quais números se aplicam.",
        },
      },
      {
        heading: { en: "The passport problem — solved", es: "El problema del pasaporte — resuelto", pt: "O problema do passaporte — resolvido" },
        body: {
          en: "Applying for an ITIN directly with the IRS normally means mailing your original passport to the United States and living without it for weeks or months. As a Certified Acceptance Agent (CAA), we verify your identity documents ourselves — your passport never leaves your hands, and processing typically takes 8–12 weeks after submission.",
          es: "Solicitar un ITIN directamente con el IRS normalmente significa enviar su pasaporte original a Estados Unidos y vivir sin él durante semanas o meses. Como Agente de Aceptación Certificado (CAA), verificamos sus documentos de identidad nosotros mismos — su pasaporte nunca sale de sus manos, y el procesamiento generalmente toma 8–12 semanas después de la presentación.",
          pt: "Solicitar um ITIN diretamente com o IRS normalmente significa enviar seu passaporte original para os Estados Unidos e ficar sem ele por semanas ou meses. Como Agente de Aceitação Certificado (CAA), nós mesmos verificamos seus documentos de identidade — seu passaporte nunca sai das suas mãos, e o processamento geralmente leva 8–12 semanas após o envio.",
        },
      },
    ],
  },
  {
    slug: "open-florida-llc-non-resident",
    date: "2026-07-14",
    readMinutes: 5,
    title: {
      en: "How to Open a Florida LLC as a Non-Resident (Step by Step)",
      es: "Cómo Abrir una LLC en Florida Siendo No Residente (Paso a Paso)",
      pt: "Como Abrir uma LLC na Flórida Sendo Não Residente (Passo a Passo)",
    },
    excerpt: {
      en: "You don't need to live in the US — or even visit — to own a Florida company. Here's the complete process, from name search to bank account.",
      es: "No necesita vivir en EE.UU. — ni siquiera visitarlo — para tener una compañía en Florida. Este es el proceso completo.",
      pt: "Você não precisa morar nos EUA — nem visitá-los — para ter uma empresa na Flórida. Este é o processo completo.",
    },
    sections: [
      {
        heading: { en: "Why Florida?", es: "¿Por qué Florida?", pt: "Por que a Flórida?" },
        body: {
          en: "Florida has no state income tax, straightforward annual requirements, and a business-friendly registration process that welcomes foreign owners. Combined with its strong ties to Latin America, it's one of the most popular states for non-resident entrepreneurs.",
          es: "Florida no tiene impuesto estatal sobre la renta, tiene requisitos anuales sencillos y un proceso de registro amigable que acepta dueños extranjeros. Sumado a sus fuertes lazos con América Latina, es uno de los estados más populares para emprendedores no residentes.",
          pt: "A Flórida não tem imposto de renda estadual, tem exigências anuais simples e um processo de registro amigável que aceita donos estrangeiros. Somado aos fortes laços com a América Latina, é um dos estados mais populares para empreendedores não residentes.",
        },
      },
      {
        heading: { en: "Step 1: Form the LLC", es: "Paso 1: Formar la LLC", pt: "Passo 1: Formar a LLC" },
        body: {
          en: "Choose an available company name, appoint a registered agent with a Florida address, and file the Articles of Organization with the state. If the LLC has more than one owner, an Operating Agreement defining each member's rights is typically required. Formation usually takes 1–2 weeks.",
          es: "Elija un nombre disponible, designe un agente registrado con dirección en Florida y presente los Artículos de Organización ante el estado. Si la LLC tiene más de un dueño, generalmente se requiere un Acuerdo Operativo que defina los derechos de cada miembro. La formación suele tomar 1–2 semanas.",
          pt: "Escolha um nome disponível, indique um agente registrado com endereço na Flórida e protocole os Articles of Organization no estado. Se a LLC tiver mais de um sócio, geralmente é necessário um Acordo Operacional definindo os direitos de cada membro. A formação costuma levar 1–2 semanas.",
        },
      },
      {
        heading: { en: "Step 2: Get the EIN", es: "Paso 2: Obtener el EIN", pt: "Passo 2: Obter o EIN" },
        body: {
          en: "With the LLC approved, the next step is the EIN — your company's federal tax ID. Non-residents without a Social Security Number (SSN) can't use the IRS online application, but the number can still be obtained through the correct filing process. No SSN is required.",
          es: "Con la LLC aprobada, el siguiente paso es el EIN — la identificación fiscal federal de su compañía. Los no residentes sin Número de Seguro Social (SSN) no pueden usar la solicitud en línea del IRS, pero el número se puede obtener mediante el proceso de presentación correcto. No se requiere SSN.",
          pt: "Com a LLC aprovada, o próximo passo é o EIN — a identificação fiscal federal da sua empresa. Não residentes sem Número de Seguro Social (SSN) não podem usar a solicitação online do IRS, mas o número pode ser obtido pelo processo de protocolo correto. Nenhum SSN é necessário.",
        },
      },
      {
        heading: { en: "Step 3: Open the bank account", es: "Paso 3: Abrir la cuenta bancaria", pt: "Passo 3: Abrir a conta bancária" },
        body: {
          en: "With your formation documents and EIN in hand, you can open a US business bank account. Each bank has its own document checklist and some accept remote opening while others require an in-person visit — preparing the right paperwork in advance avoids rejections.",
          es: "Con sus documentos de formación y el EIN en mano, puede abrir una cuenta bancaria comercial en EE.UU. Cada banco tiene su propia lista de documentos y algunos aceptan apertura remota mientras otros requieren visita presencial — preparar la documentación correcta con anticipación evita rechazos.",
          pt: "Com os documentos de formação e o EIN em mãos, você pode abrir uma conta bancária empresarial nos EUA. Cada banco tem sua própria lista de documentos e alguns aceitam abertura remota enquanto outros exigem visita presencial — preparar a documentação certa com antecedência evita recusas.",
        },
      },
      {
        heading: { en: "Step 4: Stay compliant", es: "Paso 4: Mantenerse en regla", pt: "Passo 4: Manter tudo em dia" },
        body: {
          en: "Florida LLCs must file an Annual Report every year to remain in good standing — missing the deadline brings hefty penalties and eventually administrative dissolution. Add bookkeeping and annual tax filings, and your company stays healthy year after year.",
          es: "Las LLC de Florida deben presentar un Informe Anual cada año para mantenerse en regla — perder la fecha límite trae multas considerables y eventualmente la disolución administrativa. Sume contabilidad y declaraciones anuales de impuestos, y su compañía se mantiene saludable año tras año.",
          pt: "LLCs da Flórida devem entregar um Relatório Anual todo ano para permanecer em situação regular — perder o prazo traz multas pesadas e eventualmente a dissolução administrativa. Some contabilidade e declarações anuais de impostos, e sua empresa se mantém saudável ano após ano.",
        },
      },
    ],
  },
  {
    slug: "ssn-us-business",
    date: "2026-07-14",
    readMinutes: 3,
    title: {
      en: "Do You Need a Social Security Number to Start a US Business? (No — Here's Why)",
      es: "¿Necesita un Número de Seguro Social para Abrir un Negocio en EE.UU.? (No — Aquí le Explicamos)",
      pt: "Você Precisa de Número de Seguro Social para Abrir um Negócio nos EUA? (Não — Entenda o Porquê)",
    },
    excerpt: {
      en: "The most common myth stopping non-residents from starting a US company. The truth: no Social Security Number is required at any step.",
      es: "El mito más común que detiene a los no residentes. La verdad: no se requiere número de Seguro Social en ningún paso.",
      pt: "O mito mais comum que impede não residentes de começar. A verdade: nenhum Social Security Number é exigido em etapa alguma.",
    },
    sections: [
      {
        heading: { en: "The myth", es: "El mito", pt: "O mito" },
        body: {
          en: "Many entrepreneurs abroad believe they need a Social Security Number — and therefore US residency or a visa — to own an American company. This stops thousands of viable businesses before they start. It's simply not true.",
          es: "Muchos emprendedores en el extranjero creen que necesitan un número de Seguro Social — y por lo tanto residencia o visa de EE.UU. — para tener una compañía americana. Esto detiene miles de negocios viables antes de empezar. Simplemente no es cierto.",
          pt: "Muitos empreendedores no exterior acreditam que precisam de um Social Security Number — e portanto de residência ou visto americano — para ter uma empresa nos EUA. Isso trava milhares de negócios viáveis antes de começarem. Simplesmente não é verdade.",
        },
      },
      {
        heading: { en: "The reality", es: "La realidad", pt: "A realidade" },
        body: {
          en: "Foreign nationals can own 100% of a US LLC with no SSN, no green card, and no visa. Company formation, the EIN, and even the ITIN (if you end up needing one) all have application paths designed for people without an SSN. You don't even need to set foot in the United States.",
          es: "Los extranjeros pueden ser dueños del 100% de una LLC americana sin SSN, sin green card y sin visa. La formación de la compañía, el EIN e incluso el ITIN (si llega a necesitarlo) tienen rutas de solicitud diseñadas para personas sin SSN. Ni siquiera necesita pisar Estados Unidos.",
          pt: "Estrangeiros podem ser donos de 100% de uma LLC americana sem SSN, sem green card e sem visto. A formação da empresa, o EIN e até o ITIN (se você vier a precisar) têm caminhos de solicitação desenhados para pessoas sem SSN. Você nem precisa pisar nos Estados Unidos.",
        },
      },
      {
        heading: { en: "What you actually need", es: "Lo que realmente necesita", pt: "O que você realmente precisa" },
        body: {
          en: "A valid passport, a business idea, and the right guidance. The paperwork differs from what US citizens file (for example, non-residents can't use the IRS online EIN application), which is where most do-it-yourself attempts go wrong — but every step has a well-established process.",
          es: "Un pasaporte válido, una idea de negocio y la orientación correcta. Los trámites difieren de los que presentan los ciudadanos americanos (por ejemplo, los no residentes no pueden usar la solicitud de EIN en línea del IRS), que es donde fallan la mayoría de los intentos por cuenta propia — pero cada paso tiene un proceso bien establecido.",
          pt: "Um passaporte válido, uma ideia de negócio e a orientação certa. A papelada difere da que cidadãos americanos protocolam (por exemplo, não residentes não podem usar a solicitação de EIN online do IRS), e é aí que a maioria das tentativas por conta própria dá errado — mas cada etapa tem um processo bem estabelecido.",
        },
      },
      {
        heading: { en: "Start the right way", es: "Empiece de la forma correcta", pt: "Comece do jeito certo" },
        body: {
          en: "Mistakes on IRS forms mean weeks or months of delays. Working with a team that files these applications every week — in your language — turns an intimidating process into three simple steps.",
          es: "Los errores en los formularios del IRS significan semanas o meses de retrasos. Trabajar con un equipo que presenta estas solicitudes cada semana — en su idioma — convierte un proceso intimidante en tres simples pasos.",
          pt: "Erros nos formulários do IRS significam semanas ou meses de atraso. Trabalhar com uma equipe que protocola essas solicitações toda semana — no seu idioma — transforma um processo intimidador em três passos simples.",
        },
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
