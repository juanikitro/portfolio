import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "Juan Ignacio Portilla Kitroser - Backend engineer",
    description:
      "Backend engineer from Argentina. Technical Lead of SISOC, a government platform that ships every week. Open to remote backend, full-stack or product engineering roles.",
    sisocTitle: "SISOC case study - Juan Ignacio Portilla Kitroser",
    sisocDescription:
      "How I built the engineering system behind SISOC, a government platform with ~750 active users that releases every week while its requirements keep changing.",
    shineTitle: "ShineApp case study - Juan Ignacio Portilla Kitroser",
    shineDescription:
      "ShineApp: a multi-tenant SaaS for automotive service businesses that I built alone, from a friend's paper notebook to production, with a public booking page for each business.",
  },
  nav: {
    experience: "Experience",
    contact: "Contact",
    theme: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
    lang: "ES",
    langLabel: "Ver en español",
    skip: "Skip to content",
    home: "Home",
  },
  hero: {
    lines: ["The system grows.", "Requirements change.", "I make it work."],
    lede: "I'm Juani, a backend engineer from Argentina.\nOpen to remote backend, full-stack or product engineering roles.",
    sub: "Since November 2024 I've led the team behind SISOC, used by ~750 government staff.",
    places: { sisoc: "Government platform - I lead it", shine: "My own SaaS - built alone" },
    mapLabel: "Projects on this map",
  },
  work: {
    label: "Selected work",
    title: "Two places I build in",
    readCase: "Read the case",
    sisoc: {
      chips: ["in production", "+3 field apps", "~750 active users"],
      body: "Back office for a national social-policy secretariat, plus three field apps built on its API. I set up the engineering system the team works in, and I review and approve every PR and every deploy.",
      apps: ["Espacios Com.", "DataCalle", "Gestionar"],
    },
    shine: {
      chips: ["in production", "1 business", "development paused"],
      body: "Multi-tenant SaaS for automotive service businesses, built alone end to end. The King Shine runs its daily operation on it instead of paper and Excel, and its customers book through its public booking page.",
      stops: ["quote", "booking", "work order", "cash closed"],
    },
  },
  experience: {
    label: "Experience",
    title: "Since 2021, building systems that have to keep running",
    intro:
      "Public sector, logistics and startups, in Argentina and Europe. APIs, data integrations, infrastructure and the delivery practices around them. The common thread: systems that have to perform in production.",
    sisocCta: "Read the SISOC case",
    items: [
      { period: "2024 - now", org: "Ministerio de Capital Humano (Argentina)", role: "Technical Lead, before that Full-Stack Developer" },
      { period: "2024", org: "StockViz (Belgium, remote)", role: "Full-Stack Developer", note: "Django backend and data models; ETL workflows with Apache NiFi." },
      { period: "2023 - 2024", org: "RapiHogar", role: "DevOps Developer, then consultant", note: "Containerized apps with Docker and helped migrate to Kubernetes on GKE. Ran environments on GCP; set up Sentry." },
      { period: "2023", org: "Municipalidad de San Miguel", role: "Backend Developer (freelance)", note: "An API connecting two social-services systems to search and match people across both." },
      { period: "2022 - 2023", org: "MailAmericas", role: "Developer Analyst, then DevOps", note: "Supplier-portal backend in Node.js. Moved six databases to a serverless setup on Azure; CI/CD with GitLab." },
      { period: "2021 - 2022", org: "Gobierno de la Ciudad de Buenos Aires", role: "Process Analyst, then Backend Developer", note: "Planned and built the Community Action Organizations System (SOAC) with Django." },
    ],
  },
  contact: {
    label: "Contact",
    title: "Let's talk",
    body: "I'm a software engineer focused on backend: Python, Django and DRF, with React and Next.js on the frontend. I design, build and maintain production systems with complex business rules, many integrations and real demands on security and traceability, and I turn business needs into software that can keep evolving. I use AI tools every day to work faster without lowering the bar. I'm looking for remote backend, full-stack or product engineering roles, working from Argentina (GMT-3).",
    email: "jpkitro@gmail.com",
    copied: "Copied",
    cv: "Download CV",
  },
  footer: { built: "Built with Next.js. Diagrams drawn by hand from the real systems." },
  caseUi: {
    facts: "At a glance",
    back: "Back to home",
    next: "Next case",
    decisionWhy: "Why",
    decisionTradeoff: "Trade-off",
    decisionsLabel: "Technical decisions",
    solutionLabel: "Solution",
    resultLabel: "Result",
    storyLabel: "Story",
  },
  sisoc: {
    eyebrow: "Case study - SISOC",
    title: "An engineering system for a platform that never stops changing",
    decisionsTitle: "The decisions that hold it together",
    systemTitle: "The system the team works in today",
    systemBody: "No before-and-after numbers exist. What can be shown is the system itself: what changed, and what every change has to pass.",
    intro:
      "SISOC is the back office of a national social-policy secretariat in Argentina. I lead the team that builds it, and I built the system that lets five people ship to it every week, while its requirements change every week.",
    facts: [
      { label: "Role", value: "Technical Lead since Nov 2024 (developer since Jul 2024)" },
      { label: "Team", value: "4 developers + me, also as a developer and DevOps" },
      { label: "Stack", value: "Python, Django, DRF, MySQL, React, TypeScript, Docker, GitHub Actions" },
      { label: "Users", value: "~750 active government staff" },
      { label: "Status", value: "In production - migration in progress" },
    ],
    sections: [
      {
        id: "problem",
        label: "Problem",
        title: "Large changes, fast and cheap, every week",
        body: [
          "SISOC covers community kitchens, field surveys, admissions, childcare centers, food-assistance and job-training programs, and a 360° view of each citizen record. It is used by staff across provinces and areas: technicians, coordinators, legal, accounting, auditors.",
          "The public agency behind it asks for large changes, delivered fast and cheap. Cheap here means time: we are asked to shorten delivery by spending less of it studying, validating and being careful with decisions. Commitments are often made before engineering has scoped them.",
          "And the ground keeps moving. Requirements change from one week to the next: what was agreed this week can be different the next, often after the work has already started.",
        ],
      },
      {
        id: "context",
        label: "Context",
        title: "What I started from",
        body: [
          "SISOC grew out of an existing citizen-management system. It was not built to scale: it barely did its job, and it was not stable. It had no tests, no linters, no lower environments, no pull-request culture, no controlled deploys and no documentation. Tasks lived in a WhatsApp group.",
          "The infrastructure is limited and partly owned by another government team. SISOC also consumes external systems it does not control, like the national identity registry. And other systems consume SISOC: a ticketing system, a communications system and three field apps.",
        ],
      },
      {
        id: "responsibility",
        label: "My responsibility",
        title: "What I do, and what the team does",
        body: [
          "I coordinate priorities with the people who talk to stakeholders, and split the work across four developers and myself. I built the standards and the automations that keep them in place. I review and approve every pull request and every production deploy, and I maintain the infrastructure. I lead architecture decisions and write them down as ADRs.",
          "The team builds features across all modules. They built the three field apps.",
        ],
      },
    ],
    decisions: [
      {
        title: "Make quality automatic, not negotiable",
        why: "Under constant pressure, anything optional gets skipped. So the standard lives in CI: every pull request runs linters, tests with a 75% coverage gate, architecture checks and secret scanning before I review it.",
        tradeoff: "Pull requests take longer to merge. We accept that in exchange for not discussing quality on every change.",
      },
      {
        title: "A weekly release train",
        why: "Stakeholders need a fast pace. Every Thursday a frozen, tagged release goes from QA to staging to production, with my manual approval at the end.",
        tradeoff: "Urgent changes wait for the train, and everyone respects the process we designed, unless a change justifies a hotfix.",
      },
      {
        title: "Modular monolith before services",
        why: "We could not stop delivery for a rewrite. First we made the monolith modular: an import-linter ratchet with a baseline, and many small ADRs that each cut one dependency.",
        tradeoff: "Slower than a big-bang split, but the system kept shipping every week.",
      },
      {
        title: "Per-domain backends in one monorepo",
        why: "A shared kernel plus one backend per domain, each built as its own image from the commit SHA. The Django core proxies to them, and deploys and rollbacks happen per domain.",
        tradeoff: "Isolation is per process, not per database yet. The proxy is a single point of failure. Both are written down as accepted debt.",
      },
      {
        title: "React frontends with types from the API",
        why: "New screens are React and TypeScript, with types generated from the OpenAPI schema, so frontend and backend can't drift silently.",
        tradeoff: "Two UI stacks coexist: the frontend is being migrated while the Django templates stay in use.",
        status: "In progress",
      },
      {
        title: "Docs as the source of truth, for people and agents",
        why: "Specs and ADRs come first, and PR docs and the changelog are generated. AI coding agents work inside the same guardrails as people, and the ADRs record which decisions were mine and which were an agent's recommendation.",
        tradeoff: "Writing first takes time on every change. It is what makes async work possible and agent output reviewable, so saving coding time never costs us control.",
      },
    ],
    map: {
      title: "SISOC as a transit map",
      more: "and more programs",
      legend: {
        u: "U - User path",
        d: "D - SISOC: core and programs",
        i: "I - External integrations",
        f: "F - Team-built field apps",
      },
    },
    compare: {
      before: "When I joined",
      now: "Now",
      rows: [
        ["Tasks in a WhatsApp group", "Kanban board, Discord, weekly sync"],
        ["No tests", "Unit and e2e tests, 75% coverage gate in CI"],
        ["No linters or standards", "Linters, written standards, module boundaries checked in CI"],
        ["Deploys straight to production", "QA → staging → production, release every Thursday"],
        ["No documentation", "Specs and ADRs as the source of truth"],
      ],
    },
    pipeline: {
      title: "Every change to SISOC goes through this",
      release: "release: every Thursday",
      checks: "CI",
      delivery: "Delivery",
      scrollHint: "Swipe to follow the change to production →",
      stages: [
        { name: "lint", note: "black, pylint, djlint, encoding" },
        { name: "tests", note: "smoke + pytest, 75% coverage gate" },
        { name: "migrations", note: "migration check" },
        { name: "mysql compat", note: "tests against real MySQL" },
        { name: "architecture", note: "module boundaries (import-linter)" },
        { name: "frontend", note: "React fronts: types, tests" },
        { name: "secrets", note: "secret scanning (gitleaks)" },
        { name: "release sanity", note: "deploy checks, schema, static files" },
        { name: "pr docs", note: "PR docs and changelog generated" },
        { name: "review", note: "I review and approve every PR", gate: true },
      ],
      deliveryStages: [
        { name: "freeze + tag", note: "release candidate tagged" },
        { name: "QA", note: "test environment" },
        { name: "staging", note: "pre-production" },
        { name: "production", note: "manual approval, by me", gate: true },
      ],
    },
    incident: {
      label: "Field report - production incident",
      title: "Wednesday, 2\u00a0a.m. A migration fails halfway.",
      stamp: "RESOLVED",
      happened: ["What happened", "A Django migration that passed in lower environments failed on real production data. The schema was left half migrated and no longer compatible with the previous code."],
      did: ["What I did", "I had no backup access, and nobody from the infrastructure team was on call. I rolled the code back and rebuilt the affected data from a local export I had taken days before for testing. A few records stayed missing until the infrastructure team came online and I could restore them."],
      changed: ["What changed", "I got full access to backups. We added a migration check to CI. The re-deploy shipped prepared for that exact failure."],
    },
    learnings: {
      title: "What I took from it",
      items: [
        "Lower environments lie. Real data is different, so migrations get checked before they reach it.",
        "Whoever deploys needs to be able to recover. Access to backups is part of the deploy, not a favor.",
        "If a standard isn't automated, pressure erases it.",
        "Decompose without stopping, and write down the debt you accept.",
      ],
    },
  },
  shine: {
    eyebrow: "Case study - ShineApp",
    title: "From a friend's paper notebook to a multi-tenant SaaS",
    decisionsTitle: "Decisions on a zero budget",
    intro:
      "My best friend runs a car-detailing business, The King Shine. Bookings, cash and materials lived on paper and in Excel. I built ShineApp alone, from the data model to the interface, and it now runs his daily operation.",
    facts: [
      { label: "Role", value: "Everything: product, backend, frontend, infrastructure" },
      { label: "Stack", value: "Django, DRF, Next.js, React, TypeScript, PostgreSQL" },
      { label: "Infra", value: "Vercel + Supabase, zero budget" },
      { label: "Users", value: "1 business in production: The King Shine" },
      { label: "Status", value: "Active development paused" },
    ],
    sections: [
      {
        id: "problem",
        label: "Problem",
        title: "A real business running on paper",
        body: [
          "A detailing shop juggles bookings, vehicles, services that consume materials, payments, debts and a cash register that has to close every day. The King Shine did all of it on paper and in Excel.",
        ],
      },
      {
        id: "context",
        label: "Context",
        title: "One user, built as a product",
        body: [
          "I had one real user and no budget. I still designed ShineApp as a product for many businesses: I saw a market in car-service shops, and the goal is to make it commercial.",
        ],
      },
      {
        id: "responsibility",
        label: "My responsibility",
        title: "All of it",
        body: [
          "Product decisions, data model, API, interface, infrastructure, tests and documentation. I worked with AI coding agents (Claude and Codex) inside written specs and ADRs.",
        ],
      },
    ],
    decisions: [
      {
        title: "Multi-tenant from day one",
        why: "Every record belongs to a business account, and the backend enforces that boundary in one shared layer. Dedicated tests check that no tenant can read another's data.",
        tradeoff: "More work up front for a product with one customer. It is what makes a second customer possible.",
      },
      {
        title: "Serverless on a zero budget",
        why: "Web and API run as Vercel functions, data and files live in Supabase. With no background workers, a GitHub Actions cron calls a maintenance endpoint every 15 minutes, and migrations never run on a cold start.",
        tradeoff: "Cold starts and a slower database. I designed the interface around it. The plan is to move to better infrastructure once ShineApp goes to market.",
      },
      {
        title: "UX for slow infrastructure",
        why: "Request deduplication, cancellable requests, skeletons and stale-while-revalidate on the frontend; composite indexes and prefetching on the backend.",
        tradeoff: "More moving parts in the client, in exchange for a UI that feels fast on cheap infrastructure.",
      },
      {
        title: "A public booking page for every business",
        why: "Each business gets its own public page where customers ask for a booking or a quote, with their vehicle and preferred day and time. Requests arrive as pending items that the owner turns into a reservation or a quote in one step, and the owner chooses which services the page shows.",
        tradeoff: "It is a public, unauthenticated way into a multi-tenant system: every request is scoped to its business, and nothing reaches the agenda until the owner accepts it.",
      },
      {
        title: "Roles that hide money",
        why: "Owners and employees share the agenda and work orders; employees never see financial data.",
        tradeoff: "Permission checks on every financial endpoint and screen.",
      },
    ],
    flow: {
      title: "The path of one job through ShineApp",
      stops: [
        { name: "Request", note: "Customers ask for a booking or a quote on the public booking page" },
        { name: "Quote", note: "Group quotes for up to 25 cars, as PDF" },
        { name: "Booking", note: "Day, week and month agenda with capacity checks" },
        { name: "Work order", note: "Materials consumed by recipe, per service" },
        { name: "Payment", note: "Charged on delivery; debts tracked" },
        { name: "Cash closed", note: "Daily register with reconciliation" },
      ],
    },
    features: {
      title: "What is in production",
      items: [
        "Drag-and-drop agenda with sector capacity and overlap checks",
        "Group quotes and PDFs",
        "Cash register with daily close and reconciliation",
        "Debts and fixed expenses",
        "Materials with recipes and open units",
        "Pricing by vehicle type",
        "Public booking page per business, with the services the owner chooses to show",
        "Dashboard, global search, trash and audit log",
        "WhatsApp automation and stock (built, not used by The King Shine yet)",
      ],
    },
    quote: {
      title: "From The King Shine",
      text: "Accepting Juani's help to build ShineApp was a before and after for The King Shine. Having the money, the schedule and the whole business in one place made the way I work incredibly faster. I highly recommend ShineApp to other people in the trade, and Juani as a developer, who understood my problem and solved it professionally and efficiently.",
      author: "Andrés Piñero",
      role: "Owner, The King Shine",
      note: "Translated from Spanish.",
    },
    status: {
      title: "Where it stands",
      body: [
        "In production with The King Shine, which uses every module except stock and WhatsApp. Active development is paused for lack of time. The next steps on the roadmap are billing, team invitations and separate staging and production environments.",
      ],
    },
    learnings: {
      title: "What I took from it",
      items: [
        "Sitting next to the person who uses the tool beats any spec.",
        "A free tier is a design constraint. Plan for it from the start.",
        "Tenant isolation is cheap on day one and expensive later.",
      ],
    },
  },
};
