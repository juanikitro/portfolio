import type { Dictionary } from "./types";

export const es: Dictionary = {
  meta: {
    title: "Juan Ignacio Portilla Kitroser - Backend engineer",
    description:
      "Backend engineer de Argentina. Technical Lead de SISOC, una plataforma de gobierno que sale a producción cada semana. Abierto a roles remotos de ingeniería backend, full-stack o de producto.",
    sisocTitle: "Caso SISOC - Juan Ignacio Portilla Kitroser",
    sisocDescription:
      "Cómo construí el sistema de ingeniería detrás de SISOC, una plataforma de gobierno con ~750 usuarios activos que sale a producción cada semana mientras sus requerimientos cambian.",
    shineTitle: "Caso ShineApp - Juan Ignacio Portilla Kitroser",
    shineDescription:
      "ShineApp: un SaaS multi-tenant para negocios del rubro automotor que construí solo, del cuaderno de un amigo a producción, con una turnera pública para cada negocio.",
  },
  nav: {
    experience: "Experiencia",
    contact: "Contacto",
    theme: { toLight: "Cambiar a tema claro", toDark: "Cambiar a tema oscuro" },
    lang: "EN",
    langLabel: "View in English",
    skip: "Ir al contenido",
    home: "Inicio",
    cv: "CV",
  },
  hero: {
    lines: ["El sistema crece.", "Los requerimientos cambian cada semana.", "Yo lo hago funcionar."],
    lede: "Soy Juani, backend engineer de Argentina.\nAbierto a roles remotos de ingeniería backend, full-stack o de producto.",
    sub: "Desde noviembre de 2024 lidero el equipo detrás de SISOC, que usan ~750 personas del Estado.",
    places: { sisoc: "Plataforma de gobierno - la lidero", shine: "Mi propio SaaS - hecho solo" },
    mapLabel: "Proyectos en este mapa",
    facts: ["5 años", "Python / Javascript", "Remoto desde Argentina"],
  },
  work: {
    label: "Trabajo seleccionado",
    title: "Dos lugares donde construyo",
    readCase: "Leer el caso",
    sisoc: {
      chips: ["en producción", "+3 apps de campo", "~750 usuarios activos", "1.750+ PRs mergeados"],
      body: "Back office de una secretaría nacional de políticas sociales, más tres apps de campo construidas sobre su API. Armé el sistema de ingeniería en el que trabaja el equipo, y reviso y apruebo cada PR y cada deploy.",
      apps: ["Espacios Com.", "DataCalle", "Gestionar"],
    },
    shine: {
      chips: ["en producción", "1 negocio", "desarrollo pausado"],
      body: "SaaS multi-tenant para negocios del rubro automotor, construido solo de punta a punta. The King Shine opera su día a día con él en lugar de papel y Excel, y sus clientes piden turnos desde su turnera pública.",
      stops: ["presupuesto", "reserva", "orden", "caja cerrada"],
    },
  },
  experience: {
    label: "Experiencia",
    title: "Desde 2021, construyendo sistemas que tienen que seguir funcionando",
    intro:
      "Sector público, logística y startups, en Argentina y Europa. APIs, integraciones de datos, infraestructura y las prácticas de entrega que las rodean. El hilo común: sistemas que tienen que performar en producción.",
    sisocCta: "Leer el caso SISOC",
    stackLabel: "Tecnologías",
    items: [
      {
        period: "2024 - hoy",
        org: "Ministerio de Capital Humano (Argentina)",
        role: "Technical Lead, antes Full-Stack Developer",
        bullets: [
          "Lidero un equipo de 4 desarrolladores: defino la arquitectura y los estándares de ingeniería, y reviso cada PR y cada deploy.",
          "Lidero la migración progresiva del monolito a microservicios, definiendo límites de dominio.",
          "Diseño APIs REST, permisos granulares e integraciones con sistemas externos de datos sociales y de identidad.",
        ],
        stack: ["Python", "Django", "DRF", "MySQL", "React", "TypeScript", "Docker", "GitHub Actions"],
      },
      {
        period: "2024",
        org: "StockViz (Bélgica, remoto)",
        role: "Full-Stack Developer",
        bullets: [
          "Lógica backend, endpoints y modelos de datos con Django.",
          "Flujos ETL con Apache NiFi para integrar y transformar datos para análisis e informes.",
          "Interfaces responsive con JavaScript, HTML y CSS.",
        ],
        stack: ["Python", "Django", "Apache NiFi", "JavaScript"],
      },
      {
        period: "2023 - 2024",
        org: "RapiHogar",
        role: "DevOps Developer, luego consultor",
        bullets: [
          "Contenericé las aplicaciones web con Docker y participé en la migración a Kubernetes en GKE.",
          "Administré los entornos de desarrollo, staging y producción en GCP, e implementé Sentry para investigar incidentes.",
          "Como consultor freelance, di soporte a lo que había implementado.",
        ],
        stack: ["Docker", "Kubernetes", "GKE", "GCP", "Sentry"],
      },
      {
        period: "2023",
        org: "Municipalidad de San Miguel",
        role: "Backend Developer (freelance)",
        bullets: [
          "Diseñé y desarrollé una API que conecta dos sistemas externos de servicios sociales.",
          "Busca, procesa y cruza información de personas entre ambos sistemas.",
        ],
        stack: ["Python", "FastAPI"],
      },
      {
        period: "2022 - 2023",
        org: "MailAmericas",
        role: "Developer Analyst, luego DevOps",
        bullets: [
          "Backend del portal de proveedores con Node.js y Express.",
          "Automaticé tareas administrativas repetitivas con TypeScript y Selenium.",
          "Migré seis bases de datos a un esquema serverless en Azure y automaticé el CI/CD y los tests con GitLab.",
        ],
        stack: ["Node.js", "Express", "TypeScript", "Selenium", "Azure", "GitLab CI"],
      },
      {
        period: "2021",
        org: "Arrayan",
        role: "Frontend Developer (freelance)",
        bullets: ["Frontend de una aplicación de recursos humanos con React, integrado con su API."],
        stack: ["React", "JavaScript"],
      },
      {
        period: "2021 - 2022",
        org: "Gobierno de la Ciudad de Buenos Aires",
        role: "Analista de procesos, luego Backend Developer",
        bullets: [
          "Relevé y documenté procesos operativos para mejorarlos.",
          "Planifiqué y desarrollé el Sistema de Organizaciones de Acción Comunitaria (SOAC) con Django.",
          "Mantuve sistemas internos.",
        ],
        stack: ["Python", "Django"],
      },
    ],
  },
  contact: {
    label: "Contacto",
    title: "Hablemos",
    body: "Software engineer enfocado en backend: Python, Django y DRF, con React y Next.js en el frontend. Construyo y mantengo sistemas en producción con reglas de negocio complejas y muchas integraciones, y uso herramientas de IA todos los días sin bajar la vara.",
    termsLabel: "Condiciones",
    terms: ["Disponible ya - contractor o full-time", "Inglés fluido", "Superposición completa con el horario de la costa este de EE.UU. (GMT-3)"],
    email: "jpkitro@gmail.com",
    copied: "Copiado",
    cv: "Descargar CV",
  },
  footer: { built: "Hecho con Next.js. Diagramas dibujados a mano a partir de los sistemas reales." },
  og: { role: "Backend engineer", open: "Abierto a roles remotos" },
  caseUi: {
    facts: "De un vistazo",
    back: "Volver al inicio",
    next: "Siguiente caso",
    decisionWhy: "Por qué",
    decisionTradeoff: "Costo",
    decisionsLabel: "Decisiones técnicas",
    solutionLabel: "Solución",
    resultLabel: "Resultado",
    storyLabel: "Historia",
  },
  sisoc: {
    eyebrow: "Caso - SISOC",
    title: "Un sistema de ingeniería para una plataforma que nunca deja de cambiar",
    decisionsTitle: "Las decisiones que lo sostienen",
    systemTitle: "El sistema en el que trabaja el equipo hoy",
    systemBody: "No hay números de antes y después. Lo que sí se puede mostrar es el sistema: qué cambió y qué tiene que pasar cada cambio.",
    intro:
      "SISOC es el back office de una secretaría nacional de políticas sociales en Argentina. Lidero el equipo que lo construye, y construí el sistema que permite que cinco personas salgan a producción cada semana, cuando los requerimientos cambian cada semana.",
    facts: [
      { label: "Rol", value: "Technical Lead desde nov. 2024 (desarrollador desde jul. 2024)" },
      { label: "Equipo", value: "4 desarrolladores + yo, también como desarrollador y devops" },
      { label: "Stack", value: "Python, Django, DRF, MySQL, React, TypeScript, Docker, GitHub Actions" },
      { label: "Usuarios", value: "~750 personas del Estado, activas" },
      { label: "Pull requests", value: "1.750+ mergeados desde nov. 2024, ~670 míos" },
      { label: "Estado", value: "En producción - migración en curso" },
    ],
    sections: [
      {
        id: "problem",
        label: "Problema",
        title: "Cambios grandes, rápidos y baratos, cada semana",
        body: [
          "SISOC cubre comedores comunitarios, relevamientos de campo, admisiones, centros de infancia, programas alimentarios y de formación laboral, y una vista 360° de cada ciudadano. Lo usan equipos de distintas provincias y áreas: técnicos, coordinadores, legales, contables, auditores.",
          "El organismo público detrás pide cambios grandes, rápidos y baratos. Barato acá significa tiempo: nos piden acortar los plazos dedicando menos a estudiar, validar y ser cautelosos con las decisiones. Los compromisos suelen tomarse antes de que ingeniería los dimensione.",
          "Y el terreno se mueve todo el tiempo. Los requerimientos cambian de una semana a la otra: lo que se acordó esta semana puede ser distinto la siguiente, muchas veces con el trabajo ya empezado.",
        ],
      },
      {
        id: "context",
        label: "Contexto",
        title: "De dónde partí",
        body: [
          "SISOC nació de un sistema de gestión de ciudadanos existente. No estaba hecho para escalar: apenas cumplía su función y no era estable. No tenía tests, ni linters, ni entornos bajos, ni cultura de pull requests, ni deploys controlados, ni documentación. Las tareas vivían en un grupo de WhatsApp.",
          "La infraestructura es limitada y en parte pertenece a otro equipo del Estado. SISOC además consume sistemas externos que no controla, como el registro nacional de identidad. Y otros sistemas consumen de SISOC: una ticketera, un sistema de comunicaciones y tres aplicaciones de campo.",
        ],
      },
      {
        id: "responsibility",
        label: "Mi responsabilidad",
        title: "Qué hago yo y qué hace el equipo",
        body: [
          "Coordino prioridades con quienes hablan con los stakeholders y reparto el trabajo entre cuatro desarrolladores y yo. Construí los estándares y las automatizaciones que los sostienen. Reviso y apruebo cada pull request y cada deploy a producción, y mantengo la infraestructura. Lidero las decisiones de arquitectura y las dejo escritas como ADRs.",
          "El equipo construye funcionalidades en todos los módulos. Hizo las tres apps de campo.",
        ],
      },
    ],
    decisions: [
      {
        title: "Calidad automática, no negociable",
        why: "Bajo presión constante, todo lo opcional se saltea. Por eso el estándar vive en el CI: cada pull request pasa linters, tests con un gate de cobertura del 75%, chequeos de arquitectura y escaneo de secretos antes de que yo lo revise.",
        tradeoff: "Los pull requests tardan más en mergearse. Lo aceptamos a cambio de no discutir calidad en cada cambio.",
      },
      {
        title: "Un tren de releases semanal",
        why: "Los stakeholders necesitan un ritmo acelerado. Cada jueves una release congelada y etiquetada pasa de QA a staging y a producción, con mi aprobación manual al final.",
        tradeoff: "Los cambios urgentes esperan al tren y todos respetan el proceso diseñado, salvo que justifiquen un hotfix.",
      },
      {
        title: "Monolito modular antes que servicios",
        why: "No podíamos frenar la entrega para reescribir. Primero hicimos modular el monolito: un ratchet de import-linter con línea base y muchos ADRs chicos que cortan una dependencia cada uno.",
        tradeoff: "Más lento que una separación de golpe, pero el sistema siguió saliendo cada semana.",
      },
      {
        title: "Backends por dominio en un monorepo",
        why: "Un kernel compartido y un backend por dominio, cada uno con su propia imagen construida desde el SHA del commit. El core de Django hace de proxy, y los deploys y rollbacks son por dominio.",
        tradeoff: "El aislamiento todavía es por proceso, no por base de datos. El proxy es un punto único de falla. Ambos están escritos como deuda aceptada.",
      },
      {
        title: "Frontends React con tipos desde la API",
        why: "Las pantallas nuevas son React y TypeScript, con tipos generados desde el esquema OpenAPI, para que frontend y backend no se desalineen en silencio.",
        tradeoff: "Dos stacks de UI conviven durante la migración. Se está migrando el frontend mientras se siguen usando los templates de Django.",
        status: "En curso",
      },
      {
        title: "Documentación como fuente de verdad, para personas y agentes",
        why: "Primero van las specs y los ADRs; los docs de cada PR y el changelog se generan solos. Los agentes de IA trabajan dentro de los mismos límites que las personas, y los ADRs registran qué decisiones fueron mías y cuáles una recomendación de un agente.",
        tradeoff: "Escribir primero lleva tiempo en cada cambio. Es lo que hace posible el trabajo asincrónico y revisable lo que produce un agente, y hace que ahorrarnos tiempo de programación no nos robe el control.",
      },
    ],
    map: {
      title: "SISOC como mapa de subte",
      description: "Recorrido del usuario: Browser → Nginx → core de Django (kernel, identidad y proxy). El core se conecta con Ciudadanos, Comedores, VPSL, PAS, VAT, Celiaquía, CDI, CDF, Dispositivos y más programas. Integraciones externas: RENAPER (registro nacional de identidad), un sistema de gestión de campo, una ticketera, Web push, SMTP y Sentry. Apps de campo del equipo: Espacios Comunitarios, DataCalle y Gestionar.",
      more: "y más programas",
      legend: {
        u: "U - Recorrido del usuario",
        d: "D - SISOC: core y programas",
        i: "I - Integraciones externas",
        f: "F - Apps de campo del equipo",
      },
    },
    compare: {
      before: "Cuando llegué",
      now: "Hoy",
      rows: [
        ["Tareas en un grupo de WhatsApp", "Tablero kanban, Discord, weekly"],
        ["Sin tests", "Tests unitarios y e2e, gate de cobertura del 75% en CI"],
        ["Sin linters ni estándares", "Linters, estándares escritos, límites entre módulos verificados en CI"],
        ["Deploys directo a producción", "QA → staging → producción, release cada jueves"],
        ["Sin documentación", "Specs y ADRs como fuente de verdad"],
      ],
    },
    pipeline: {
      title: "Todo cambio en SISOC pasa por esto",
      release: "release: cada jueves",
      checks: "CI",
      delivery: "Entrega",
      stages: [
        { name: "lint", note: "black, pylint, djlint, encoding" },
        { name: "tests", note: "smoke + pytest, gate de cobertura 75%" },
        { name: "migrations", note: "chequeo de migraciones" },
        { name: "mysql compat", note: "tests contra MySQL real" },
        { name: "architecture", note: "límites entre módulos (import-linter)" },
        { name: "frontend", note: "fronts React: tipos, tests" },
        { name: "secrets", note: "escaneo de secretos (gitleaks)" },
        { name: "release sanity", note: "chequeos de deploy, esquema, estáticos" },
        { name: "pr docs", note: "docs del PR y changelog generados" },
        { name: "review", note: "reviso y apruebo cada PR", gate: true },
      ],
      deliveryStages: [
        { name: "freeze + tag", note: "release candidate etiquetada" },
        { name: "QA", note: "entorno de pruebas" },
        { name: "staging", note: "preproducción" },
        { name: "producción", note: "aprobación manual, mía", gate: true },
      ],
    },
    incident: {
      label: "Reporte de campo - incidente en producción",
      title: "Miércoles, 2\u00a0a.m. Una migración falla a la mitad.",
      stamp: "RESUELTO",
      happened: ["Qué pasó", "Una migración de Django que había pasado en los entornos bajos falló con los datos reales de producción. El esquema quedó migrado a medias e incompatible con el código anterior."],
      did: ["Qué hice", "No tenía acceso a los backups y no había nadie de infraestructura de guardia. Volví el código atrás y reconstruí los datos afectados desde un export local que había hecho días antes para pruebas. Algunos registros faltaron hasta que infraestructura se conectó y pude restaurarlos."],
      changed: ["Qué cambió", "Me dieron acceso completo a los backups. Agregamos un chequeo de migraciones al CI. El nuevo deploy salió preparado para ese error exacto."],
    },
    learnings: {
      title: "Qué me llevé",
      items: [
        "Los entornos bajos mienten. Los datos reales son distintos, así que las migraciones se chequean antes de llegar a ellos.",
        "Quien despliega tiene que poder recuperar. El acceso a los backups es parte del deploy, no un favor.",
        "Si un estándar no está automatizado, la presión lo borra.",
        "Descomponer sin frenar, y dejar escrita la deuda que se acepta.",
      ],
    },
  },
  shine: {
    eyebrow: "Caso - ShineApp",
    title: "Del cuaderno de un amigo a un SaaS multi-tenant",
    decisionsTitle: "Decisiones con presupuesto cero",
    intro:
      "Mi mejor amigo tiene un car detailing, The King Shine. Las reservas, la caja y los materiales vivían en papel y en Excel. Construí ShineApp solo, del modelo de datos a la interfaz, y hoy opera su día a día.",
    facts: [
      { label: "Rol", value: "Todo: producto, backend, frontend, infraestructura" },
      { label: "Stack", value: "Django, DRF, Next.js, React, TypeScript, PostgreSQL" },
      { label: "Infra", value: "Vercel + Supabase, presupuesto cero" },
      { label: "Usuarios", value: "1 negocio en producción: The King Shine" },
      { label: "Estado", value: "Desarrollo activo pausado" },
      { label: "Código", value: "juanikitro/ShineApp en GitHub", href: "https://github.com/juanikitro/ShineApp" },
    ],
    sections: [
      {
        id: "problem",
        label: "Problema",
        title: "Un negocio real funcionando en papel",
        body: [
          "Un detailing maneja reservas, vehículos, servicios que consumen materiales, cobros, deudas y una caja que tiene que cerrar todos los días. The King Shine hacía todo eso en papel y en Excel.",
        ],
      },
      {
        id: "context",
        label: "Contexto",
        title: "Un usuario, construido como producto",
        body: [
          "Tenía un usuario real y cero presupuesto. Aun así diseñé ShineApp como un producto para muchos negocios: vi mercado en el rubro, y el objetivo es hacerlo comercial.",
        ],
      },
      {
        id: "responsibility",
        label: "Mi responsabilidad",
        title: "Todo",
        body: [
          "Decisiones de producto, modelo de datos, API, interfaz, infraestructura, tests y documentación. Trabajé con agentes de IA (Claude y Codex) dentro de specs y ADRs escritos.",
        ],
      },
    ],
    decisions: [
      {
        title: "Multi-tenant desde el día uno",
        why: "Cada registro pertenece a una cuenta de negocio, y el backend hace cumplir ese límite en una capa compartida. Hay tests dedicados que verifican que ningún negocio pueda leer datos de otro.",
        tradeoff: "Más trabajo al principio para un producto con un solo cliente. Es lo que hace posible el segundo.",
      },
      {
        title: "Serverless con presupuesto cero",
        why: "Web y API corren como funciones de Vercel; datos y archivos viven en Supabase. Sin workers, un cron de GitHub Actions llama a un endpoint de mantenimiento cada 15 minutos, y las migraciones nunca corren en un cold start.",
        tradeoff: "Cold starts y una base más lenta. Diseñé la interfaz alrededor de eso. El objetivo es contratar mejor infraestructura cuando ShineApp salga a venderse.",
      },
      {
        title: "UX para infraestructura lenta",
        why: "Deduplicación de requests, requests cancelables, skeletons y stale-while-revalidate en el frontend; índices compuestos y prefetch en el backend.",
        tradeoff: "Más piezas en el cliente, a cambio de una interfaz que se siente rápida sobre infraestructura barata.",
      },
      {
        title: "Una turnera pública para cada negocio",
        why: "Cada negocio tiene su propia página pública donde los clientes piden un turno o una cotización, con su vehículo y el día y horario que prefieren. Los pedidos llegan como pendientes y el dueño los convierte en una reserva o un presupuesto en un paso, y elige qué servicios muestra la página.",
        tradeoff: "Es una entrada pública y sin login a un sistema multi-tenant: cada pedido queda atado a su negocio y nada llega a la agenda hasta que el dueño lo acepta.",
      },
      {
        title: "Roles que esconden el dinero",
        why: "Dueños y empleados comparten la agenda y las órdenes de trabajo; los empleados nunca ven datos financieros.",
        tradeoff: "Chequeos de permisos en cada endpoint y pantalla financiera.",
      },
    ],
    flow: {
      title: "El recorrido de un trabajo en ShineApp",
      stops: [
        { name: "Pedido", note: "Los clientes piden un turno o una cotización desde la turnera pública" },
        { name: "Presupuesto", note: "Presupuestos grupales de hasta 25 autos, en PDF" },
        { name: "Reserva", note: "Agenda diaria, semanal y mensual con control de capacidad" },
        { name: "Orden de trabajo", note: "Materiales consumidos por receta, por servicio" },
        { name: "Cobro", note: "Cobro al entregar; deudas registradas" },
        { name: "Caja cerrada", note: "Caja diaria con conciliación" },
      ],
    },
    features: {
      title: "Qué está en producción",
      items: [
        "Agenda con drag-and-drop, control de capacidad por sector y superposiciones",
        "Presupuestos grupales y PDFs",
        "Caja con cierre diario y conciliación",
        "Deudas y gastos fijos",
        "Materiales con recetas y unidades abiertas",
        "Precios por tipo de vehículo",
        "Turnera pública por negocio, con los servicios que el dueño elige mostrar",
        "Dashboard, búsqueda global, papelera y registro de auditoría",
        "Automatización de WhatsApp y stock (construidos, The King Shine todavía no los usa)",
      ],
    },
    quote: {
      title: "Desde The King Shine",
      text: "Aceptar la ayuda de Juani construyendo ShineApp fue un antes y un después para The King Shine. Controlar la economía, los tiempos y todo el negocio en un solo lugar agilizó increíblemente la forma en la que trabajo. Recomiendo tanto ShineApp para otros colegas del rubro como a Juani como programador, ya que supo entender mi problema y resolverlo de manera profesional y eficiente.",
      author: "Andrés Piñero",
      role: "Dueño de The King Shine",
      note: "",
    },
    status: {
      title: "Dónde está hoy",
      body: [
        "En producción con The King Shine, que usa todos los módulos excepto stock y WhatsApp. El desarrollo activo está pausado por falta de tiempo. Los próximos pasos del roadmap son facturación, invitaciones de equipo y entornos separados de staging y producción.",
      ],
    },
    learnings: {
      title: "Qué me llevé",
      items: [
        "Sentarse al lado de quien usa la herramienta vale más que cualquier spec.",
        "Un plan gratuito es una restricción de diseño. Hay que planificar para eso desde el principio.",
        "Aislar tenants es barato el día uno y caro después.",
      ],
    },
  },
};
