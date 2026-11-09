/* ==========================================================================
   DATOS DEL PORTAFOLIO
   --------------------------------------------------------------------------
   Para agregar un proyecto nuevo: copia uno de los objetos de PROJECTS,
   cambia el `slug` (sin espacios ni tildes) y rellena los textos en
   español (es) y en inglés (en). Las imágenes van en /img/<slug>/ con
   dos tamaños: nombre-sm.webp (≈800 px) y nombre-lg.webp (≈1600 px).
   Categorías válidas: "desarrollo", "diseno", "fullstack".
   ========================================================================== */

window.SITE = {
  name: "Camilo Hernández Rincón",
  email: "camhernandezri@gmail.com",
  linkedin: "https://www.linkedin.com/in/camhernandezri/",
  github: "https://github.com/camhernandezri",
  cv: "cv/camilo-hernandez-rincon-cv.pdf",
  /* [PENDIENTE] Crea un formulario gratis en https://formspree.io y pega aquí
     su URL (p. ej. "https://formspree.io/f/abcdwxyz"). Mientras esté vacío,
     el formulario prepara el mensaje para enviarlo desde tu correo. */
  formEndpoint: ""
};

/* ---------- Proyectos ---------- */
window.PROJECTS = [
  /* ------------------------------------------------------------------ */
  {
    slug: "invicar-inventarios",
    client: "Autobuses Invicar, Duitama",
    badge: { es: "En producción", en: "In production" },
    year: "2026",
    categories: ["fullstack", "desarrollo"],
    tone: "inventario",
    url: "invicar-inventario",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind 4", "SQLite (node:sqlite)", "PowerShell"],
    cover: { src: "img/invicar-inventarios/panel", phone: "img/invicar-inventarios/m-panel" },
    title: { es: "Invicar · Control de inventarios", en: "Invicar · Inventory control" },
    type: { es: "Sistema web en red local", en: "Local-network web system" },
    value: {
      es: "Reemplacé hojas de Excel por sección y chasis por un sistema que descuenta kits completos con un clic y sabe cuánto material y dinero lleva cada bus.",
      en: "I replaced per-section, per-chassis Excel sheets with a system that deducts full kits in one click and knows how much material and money goes into each bus."
    },
    role: { es: "Diseño, desarrollo, instalación y soporte", en: "Design, development, installation and support" },
    status: { es: "En uso en la empresa · v1.6", en: "In daily use · v1.6" },
    links: [],
    context: {
      es: "<p><strong>Autobuses Invicar</strong> es una carrocera de buses en Duitama, Colombia. Cada bus pasa por secciones como estructura, forrado, silletería, pintura y vidriería, y cada sección consume una lista de materiales distinta según el chasis.</p><p>El sistema funciona <strong>en red local, sin nube</strong>: se instala en un portátil de la empresa y se usa desde cualquier navegador conectado a la red de la oficina.</p>",
      en: "<p><strong>Autobuses Invicar</strong> is a bus body manufacturer in Duitama, Colombia. Every bus goes through sections such as structure, lining, seating, paint and glazing, and each section uses a different bill of materials depending on the chassis.</p><p>The system runs <strong>on the local network, with no cloud</strong>: it is installed on a company laptop and used from any browser on the office network.</p>"
    },
    problem: {
      es: "<p>El material vivía en hojas de Excel separadas por sección y por chasis. No había forma de saber en tiempo real qué quedaba en bodega, cuánto material gastaba cada bus ni cuánto costaba. Tampoco había un historial confiable de quién sacó qué.</p>",
      en: "<p>Materials lived in Excel sheets split by section and by chassis. There was no way to know in real time what was left in the warehouse, how much material each bus used or what it cost. There was no reliable record of who took what, either.</p>"
    },
    roleText: {
      es: "<p>Lo hice de punta a punta: levantamiento con el cliente, modelo de datos, diseño de la interfaz, desarrollo, pruebas, instalador para Windows, puesta en marcha en la oficina y soporte posterior.</p>",
      en: "<p>I did it end to end: requirements with the client, data model, interface design, development, testing, a Windows installer, on-site rollout and ongoing support.</p>"
    },
    process: [
      { k: { es: "Modelo", en: "Model" }, t: { es: "Kits por sección × chasis", en: "Kits by section × chassis" },
        d: { es: "La unidad de trabajo real no es el material suelto sino el kit, por ejemplo «Estructura · Volkswagen». Un chasis nuevo se crea copiando los materiales de otro.", en: "The real unit of work isn't a single material but a kit, e.g. “Structure · Volkswagen”. A new chassis is created by copying another one's materials." } },
      { k: { es: "Regla de negocio", en: "Business rule" }, t: { es: "Descuento transaccional", en: "Transactional deduction" },
        d: { es: "Todo o nada: si falta un solo material, no se descuenta nada. Cada descuento queda en la carpeta del bus y avisa si el mismo kit se intenta descontar dos veces.", en: "All or nothing: if a single material is short, nothing is deducted. Each deduction is filed under the bus and the system warns if the same kit is deducted twice." } },
      { k: { es: "Datos", en: "Data" }, t: { es: "SQLite sin servidor", en: "Serverless SQLite" },
        d: { es: "Usé <code>node:sqlite</code>, incluido en Node: no hay servidor de base de datos que instalar. Modo WAL y migraciones versionadas con <code>PRAGMA user_version</code>, probadas desde versiones anteriores.", en: "I used <code>node:sqlite</code>, built into Node, so there is no database server to install. WAL mode and versioned migrations with <code>PRAGMA user_version</code>, tested from older versions." } },
      { k: { es: "Seguridad", en: "Security" }, t: { es: "Dos roles, aplicados en el servidor", en: "Two roles, enforced server-side" },
        d: { es: "El encargado edita y ve costos; la secretaria solo consulta y no ve ningún precio, ni en pantalla ni en las exportaciones a CSV. Autenticación propia con hash, sesiones y bloqueo por intentos fallidos.", en: "The manager edits and sees costs; the secretary only reads and never sees a price, on screen or in CSV exports. Custom auth with hashed passwords, sessions and lockout after failed attempts." } },
      { k: { es: "Migración", en: "Migration" }, t: { es: "De 13 Excel a un catálogo único", en: "From 13 spreadsheets to one catalog" },
        d: { es: "Una herramienta de importación con simulación previa y copia de seguridad unificó nombres distintos del mismo material y cantidades como «20 CM» o «2 X 5 TIRAS».", en: "An import tool with a dry run and automatic backup merged different names for the same material and quantities written like “20 CM” or “2 X 5 STRIPS”." } },
      { k: { es: "Diseño", en: "Design" }, t: { es: "Desde el logo de la empresa", en: "Built from the company logo" },
        d: { es: "Paleta dorado y grafito, panel con alertas de stock bajo y crítico, e interfaz adaptable a celular.", en: "Gold and graphite palette, a dashboard with low and critical stock alerts, and a mobile-friendly interface." } }
    ],
    diagram: "kit",
    gallery: [
      { src: "img/invicar-inventarios/panel", cap: { es: "<b>Panel general.</b> Valor del inventario, alertas de stock y movimientos recientes.", en: "<b>Dashboard.</b> Inventory value, stock alerts and recent movements." } },
      { src: "img/invicar-inventarios/registrar-salida", cap: { es: "<b>Registrar salida.</b> Se elige el kit y se descuenta completo en una sola operación.", en: "<b>Register output.</b> Pick a kit and deduct it entirely in a single operation." } },
      { src: "img/invicar-inventarios/kits-chasis", cap: { es: "<b>Selección de chasis.</b> Cada sección tiene su kit por marca de chasis.", en: "<b>Chassis selection.</b> Each section has its kit per chassis brand." } },
      { src: "img/invicar-inventarios/historial-buses", cap: { es: "<b>Carpeta del bus.</b> Todo lo que se le sacó a un bus, con su costo.", en: "<b>Bus folder.</b> Everything taken for one bus, with its cost." } },
      { src: "img/invicar-inventarios/historial-kit", cap: { es: "<b>Kárdex.</b> Un kit aparece como una sola línea que se abre para ver cada material.", en: "<b>Ledger.</b> A kit shows as one line that expands to each material." } },
      { src: "img/invicar-inventarios/alertas", cap: { es: "<b>Alertas.</b> Materiales bajo el mínimo y en estado crítico.", en: "<b>Alerts.</b> Materials below minimum and in critical state." } },
      { src: "img/invicar-inventarios/materiales", cap: { es: "<b>Materiales.</b> Existencias, mínimo, unidad y costo unitario.", en: "<b>Materials.</b> Stock, minimum, unit and unit cost." } },
      { src: "img/invicar-inventarios/solo-lectura", cap: { es: "<b>Vista de solo lectura.</b> El mismo listado sin ningún precio.", en: "<b>Read-only view.</b> The same list without a single price." } },
      { src: "img/invicar-inventarios/login", cap: { es: "<b>Inicio de sesión</b> con la identidad de la empresa.", en: "<b>Sign-in</b> with the company's identity." } }
    ],
    phones: [
      { src: "img/invicar-inventarios/m-panel", cap: { es: "Panel en celular", en: "Dashboard on mobile" } },
      { src: "img/invicar-inventarios/m-materiales", cap: { es: "Materiales en celular", en: "Materials on mobile" } }
    ],
    galleryNote: { es: "Todas las capturas usan datos ficticios.", en: "All screenshots use fictional data." },
    metrics: [
      { v: "40", l: { es: "kits importados desde 13 listados en Excel", en: "kits imported from 13 Excel lists" } },
      { v: "503", l: { es: "materiales en un catálogo sin duplicados", en: "materials in a duplicate-free catalog" } },
      { v: "27", l: { es: "pruebas automáticas de la lógica crítica", en: "automated tests on critical logic" } },
      { v: "2×", l: { es: "copias de seguridad automáticas al día", en: "automatic backups per day" } }
    ],
    results: [
      { es: "En uso diario en la empresa, en la versión 1.6.", en: "In daily use at the company, on version 1.6." },
      { es: "Instalador de Windows (<code>instalar.ps1</code>) que copia la aplicación, crea los usuarios, abre el puerto solo para la red local y programa el arranque automático del servidor.", en: "Windows installer (<code>instalar.ps1</code>) that copies the app, creates users, opens the port for the local network only and schedules the server to start automatically." },
      { es: "Copias de seguridad dos veces al día, con copia adicional opcional en un disco o carpeta de red, y script de restauración.", en: "Backups twice a day, with an optional extra copy to a drive or network folder, and a restore script." },
      { es: "Guía paso a paso para el cliente y soporte por videollamada durante la instalación.", en: "Step-by-step guide for the client and video-call support during installation." }
    ],
    learnings: [
      { es: "El portátil se iba a casa y perdía el acceso. Lo resolví con IP fija solo en la red de Windows de la oficina, así sigue funcionando en cualquier otro wifi. La infraestructura también es parte del producto.", en: "The laptop went home and lost access. I solved it with a static IP bound only to the office's Windows network, so it keeps working on any other Wi-Fi. Infrastructure is part of the product too." },
      { es: "Esconder un precio en pantalla no es seguridad: los permisos se aplican en el servidor y en cada exportación.", en: "Hiding a price on screen isn't security: permissions are enforced on the server and in every export." },
      { es: "Cargar cientos de materiales sin stock disparaba falsas alertas. Ajusté la lógica para que solo alerte lo que de verdad necesita atención.", en: "Loading hundreds of materials with no stock fired false alerts. I adjusted the logic so it only flags what actually needs attention." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "soccer-play",
    client: "Soccer Play, Duitama",
    badge: { es: "Publicado", en: "Live" },
    year: "2026",
    categories: ["fullstack", "diseno"],
    tone: "soccer",
    url: "soccer-play",
    stack: ["HTML", "CSS", "JavaScript", "Firebase Auth", "Firestore", "Firebase Hosting"],
    cover: { src: "img/soccer-play/inicio", phone: "img/soccer-play/m-horas" },
    title: { es: "Soccer Play · Reservas de canchas", en: "Soccer Play · Pitch booking" },
    type: { es: "Sistema de reservas en tiempo real", en: "Real-time booking system" },
    value: {
      es: "Pasé las reservas de WhatsApp y Excel a un sistema donde el cliente reserva solo y es imposible reservar dos veces la misma cancha.",
      en: "I moved bookings from WhatsApp and Excel to a system where customers book on their own and double-booking a pitch is impossible."
    },
    role: { es: "Diseño de producto y desarrollo full-stack", en: "Product design and full-stack development" },
    status: { es: "Publicado · piloto propuesto de 1 mes", en: "Live · 1-month pilot proposed" },
    links: [],
    context: {
      es: "<p><strong>Soccer Play</strong> es un complejo deportivo con dos sedes en Duitama, Boyacá: canchas de fútbol 5, fútbol 8 y pádel. Las reservas llegaban por WhatsApp y llamadas, y se anotaban a mano en un Excel.</p>",
      en: "<p><strong>Soccer Play</strong> is a sports complex with two locations in Duitama, Boyacá: 5-a-side, 8-a-side and padel courts. Bookings came in through WhatsApp and phone calls and were written by hand into a spreadsheet.</p>"
    },
    problem: {
      es: "<p>Cada cancha de fútbol 8 se divide en tres de fútbol 5. Si alguien reserva la F8, se bloquean las tres F5; si reservan una F5, la F8 deja de estar disponible. En un Excel eso genera dobles reservas con facilidad, sobre todo cuando dos personas escriben casi al mismo tiempo.</p>",
      en: "<p>Each 8-a-side pitch splits into three 5-a-side pitches. Booking the 8-a-side blocks all three 5-a-side ones; booking a 5-a-side makes the 8-a-side unavailable. In a spreadsheet that easily leads to double bookings, especially when two people write in at almost the same time.</p>"
    },
    roleText: {
      es: "<p>Diseñé la experiencia del cliente y del administrador, la identidad visual, el modelo de datos y las reglas de seguridad, y desarrollé y publiqué el sistema completo.</p>",
      en: "<p>I designed the customer and admin experience, the visual identity, the data model and the security rules, and I built and deployed the whole system.</p>"
    },
    process: [
      { k: { es: "Modelo", en: "Model" }, t: { es: "La cancha F8 como tres tercios", en: "The 8-a-side pitch as three thirds" },
        d: { es: "Cada reserva ocupa los tercios que le corresponden en una sola operación. Si alguno ya está tomado, la operación completa falla, aunque dos personas lo intenten en el mismo segundo.", en: "Each booking takes the thirds it needs in a single operation. If any is taken, the whole operation fails, even if two people try in the same second." } },
      { k: { es: "Cliente", en: "Customer" }, t: { es: "Reservar sin llamar", en: "Book without calling" },
        d: { es: "Elige sede, día, tipo de cancha y hora; el sistema asigna una cancha libre. Para jugar más, toca varias horas seguidas. Ve el precio exacto por franja, día y festivo.", en: "Pick a location, day, pitch type and time; the system assigns a free pitch. To play longer, tap consecutive hours. The exact price is calculated by time slot, weekday and holiday." } },
      { k: { es: "Administración", en: "Admin" }, t: { es: "Un panel por sede", en: "One panel per location" },
        d: { es: "Calendario de todas las canchas con reservas del día, valor por cobrar y ocupación. Crear, mover, cancelar y bloquear horarios, reservas fijas semanales y búsqueda por nombre o celular.", en: "Calendar of every pitch with today's bookings, amount to collect and occupancy. Create, move, cancel and block slots, weekly recurring bookings and search by name or phone." } },
      { k: { es: "Seguridad", en: "Security" }, t: { es: "Reglas de Firestore", en: "Firestore rules" },
        d: { es: "Los clientes solo pueden crear reservas y ver qué horas están ocupadas. El nombre y el celular los ven solo los administradores de esa sede; el dueño ve ambas.", en: "Customers can only create bookings and see which hours are taken. Names and phone numbers are visible only to that location's admins; the owner sees both." } },
      { k: { es: "Diseño", en: "Design" }, t: { es: "Una cancha como sistema visual", en: "A pitch as a visual system" },
        d: { es: "Franjas de césped como las del corte real, líneas de tiza y el azul del escudo del complejo. Pensado primero para el celular y con modo oscuro.", en: "Grass stripes like a real mowed pitch, chalk lines and the blue of the club's crest. Mobile-first, with dark mode." } },
      { k: { es: "Operación", en: "Operations" }, t: { es: "Tarifas editables", en: "Editable pricing" },
        d: { es: "El dueño cambia tarifas y festivos desde el panel, sin volver a publicar la página.", en: "The owner updates prices and holidays from the panel, without redeploying the site." } }
    ],
    diagram: "thirds",
    themeToggle: true,
    gallery: [
      { src: "img/soccer-play/inicio", dark: "img/soccer-play/inicio-dark", cap: { es: "<b>Reservar.</b> Sede, día, tipo de cancha y hora en una sola pantalla.", en: "<b>Book.</b> Location, day, pitch type and time on one screen." } },
      { src: "img/soccer-play/horas", dark: "img/soccer-play/horas-dark", cap: { es: "<b>Horas seguidas.</b> Se tocan varias horas para jugar más tiempo.", en: "<b>Consecutive hours.</b> Tap several hours to play longer." } },
      { src: "img/soccer-play/confirmar", dark: "img/soccer-play/confirmar-dark", cap: { es: "<b>Confirmar.</b> Precio exacto según franja y día.", en: "<b>Confirm.</b> Exact price by time slot and day." } },
      { src: "img/soccer-play/confirmada", dark: "img/soccer-play/confirmada-dark", cap: { es: "<b>Reserva confirmada</b> con mensaje para WhatsApp y botón «Cómo llegar».", en: "<b>Booking confirmed</b> with a WhatsApp-ready message and a directions button." } },
      { src: "img/soccer-play/admin-calendario", dark: "img/soccer-play/admin-calendario-dark", cap: { es: "<b>Calendario del administrador</b> con reservas, valor por cobrar y ocupación.", en: "<b>Admin calendar</b> with bookings, amount to collect and occupancy." } },
      { src: "img/soccer-play/admin-detalle", dark: "img/soccer-play/admin-detalle-dark", cap: { es: "<b>Detalle de reserva.</b> Mover, cancelar o bloquear.", en: "<b>Booking detail.</b> Move, cancel or block." } },
      { src: "img/soccer-play/admin-reservas", dark: "img/soccer-play/admin-reservas-dark", cap: { es: "<b>Próximos 7 días</b> y búsqueda por nombre o celular.", en: "<b>Next 7 days</b> and search by name or phone." } },
      { src: "img/soccer-play/admin-fijas", dark: "img/soccer-play/admin-fijas-dark", cap: { es: "<b>Reservas fijas</b> para equipos que juegan cada semana.", en: "<b>Recurring bookings</b> for teams that play every week." } },
      { src: "img/soccer-play/admin-tarifas", cap: { es: "<b>Tarifas y festivos</b> editables por el dueño.", en: "<b>Prices and holidays</b> editable by the owner." } }
    ],
    phones: [
      { src: "img/soccer-play/m-inicio", dark: "img/soccer-play/m-inicio-dark", cap: { es: "Inicio", en: "Home" } },
      { src: "img/soccer-play/m-horas", dark: "img/soccer-play/m-horas-dark", cap: { es: "Elegir horas", en: "Pick hours" } },
      { src: "img/soccer-play/m-confirmada", dark: "img/soccer-play/m-confirmada-dark", cap: { es: "Confirmación", en: "Confirmation" } },
      { src: "img/soccer-play/m-mis-reservas", dark: "img/soccer-play/m-mis-reservas-dark", cap: { es: "Mis reservas", en: "My bookings" } }
    ],
    galleryNote: { es: "Versión de demostración con datos de ejemplo, sin información real de clientes.", en: "Demo version with sample data, no real customer information." },
    metrics: [
      { v: "2", l: { es: "sedes con acceso separado", en: "locations with separate access" } },
      { v: "3", l: { es: "tipos de cancha: F5, F8 y pádel", en: "pitch types: 5-a-side, 8-a-side, padel" } },
      { v: "0", l: { es: "dobles reservas posibles por diseño", en: "double bookings possible by design" } },
      { v: "1 mes", l: { es: "de piloto propuesto en una sede", en: "pilot proposed at one location" } }
    ],
    results: [
      { es: "Sistema publicado en Firebase Hosting y probado en computador y celular.", en: "System deployed on Firebase Hosting and tested on desktop and mobile." },
      { es: "Propuesta al complejo: piloto de un mes en una sede.", en: "Proposal to the complex: a one-month pilot at one location." },
      { es: "Versión de demostración separada, con datos de ejemplo, para mostrar sin exponer clientes reales.", en: "A separate demo version with sample data, to show it without exposing real customers." }
    ],
    learnings: [
      { es: "Modelar bien el dominio (los tercios) eliminó una clase entera de errores antes de escribir la interfaz.", en: "Modeling the domain properly (the thirds) removed a whole class of bugs before writing any UI." },
      { es: "Las reglas de seguridad son parte del diseño: definen qué ve cada persona, no solo qué puede hacer.", en: "Security rules are part of the design: they define what each person sees, not just what they can do." },
      { es: "Dejar las tarifas en manos del dueño evita que cada cambio de precio dependa del desarrollador.", en: "Putting prices in the owner's hands means a price change no longer depends on the developer." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "invicar-landing",
    client: "Autobuses INVICAR, Duitama",
    badge: { es: "Entregado", en: "Delivered" },
    year: "2026",
    categories: ["diseno", "desarrollo"],
    tone: "invicar",
    url: "autobusesinvicar",
    stack: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Nodemailer"],
    cover: { src: "img/invicar-landing/inicio", phone: "img/invicar-landing/m-inicio" },
    title: { es: "Autobuses INVICAR · Sitio corporativo", en: "Autobuses INVICAR · Corporate site" },
    type: { es: "Landing page corporativa", en: "Corporate landing page" },
    value: {
      es: "Rediseñé la web de una carrocera con más de 30 años de historia para que se sienta premium, con sus buses como protagonistas y un camino directo a cotizar.",
      en: "I redesigned the website of a bus body maker with over 30 years of history so it feels premium, puts its buses front and center and leads straight to a quote."
    },
    role: { es: "Diseño de interfaz, front-end y backend del formulario", en: "UI design, front-end and contact-form backend" },
    status: { es: "Entregado al cliente", en: "Delivered to the client" },
    links: [],
    context: {
      es: "<p><strong>Autobuses INVICAR</strong> diseña, fabrica y ensambla carrocerías para buses, busetones y busetas en Duitama (Boyacá) desde 1992. El sitio es de una sola página y debe presentar sus tres líneas de producto con fotografías reales y convertir visitas en solicitudes de cotización.</p>",
      en: "<p><strong>Autobuses INVICAR</strong> has designed, built and assembled bus bodies for large, mid-size and small buses in Duitama (Boyacá) since 1992. The one-page site has to present its three product lines with real photos and turn visits into quote requests.</p>"
    },
    problem: {
      es: "<p>La página original era plana y se sentía armada con partes que no combinaban. El cliente quería una imagen premium usando solo sus colores corporativos (azul oscuro, dorado y blanco translúcido), sin fondos blancos y con las fotos de sus buses como protagonistas.</p>",
      en: "<p>The original page was flat and felt assembled from parts that didn't match. The client wanted a premium image using only its brand colors (dark blue, gold and translucent white), no white backgrounds, and its bus photos as the main characters.</p>"
    },
    roleText: {
      es: "<p>Diseño de interfaz y desarrollo front-end completo, más el backend del formulario de contacto.</p>",
      en: "<p>UI design and the complete front-end build, plus the contact-form backend.</p>"
    },
    process: [
      { k: { es: "Sistema", en: "System" }, t: { es: "Un DESIGN.md como base", en: "A DESIGN.md as the base" },
        d: { es: "Partí de la estructura de un DESIGN.md del catálogo gratuito de DesignMD: grilla de 8 px, esquinas rectas, botones tipo píldora y líneas de 1 px.", en: "I started from the structure of a DESIGN.md from DesignMD's free catalog: 8 px grid, square corners, pill buttons and 1 px lines." } },
      { k: { es: "Color", en: "Color" }, t: { es: "100 % colores de la marca", en: "100% brand colors" },
        d: { es: "Cada sección tiene una foto de fondo con paneles de vidrio translúcido encima. Tipografía Inter Tight para títulos e Inter para el texto.", en: "Each section has a background photo with translucent glass panels on top. Inter Tight for headings and Inter for body text." } },
      { k: { es: "Producto", en: "Product" }, t: { es: "Tres líneas, una estructura", en: "Three lines, one structure" },
        d: { es: "Buses, busetas y midibuses: descripción, cuatro destacados con iconos, carrusel con miniaturas y galería 3D.", en: "Large, small and midi buses: description, four icon highlights, a thumbnail carousel and a 3D gallery." } },
      { k: { es: "Interacción", en: "Interaction" }, t: { es: "Galería 3D tipo coverflow", en: "3D coverflow gallery" },
        d: { es: "Al ampliar una foto se abre un carrusel en CSS 3D con perspectiva, laterales en escala de grises y reflejo. Funciona con teclado y gestos táctiles.", en: "Enlarging a photo opens a CSS 3D carousel with perspective, grayscale sides and a reflection. Works with keyboard and touch gestures." } },
      { k: { es: "Movimiento", en: "Motion" }, t: { es: "Efectos que se apagan solos", en: "Effects that switch themselves off" },
        d: { es: "Ken Burns en el hero, parallax y revelado con <code>animation-timeline</code>, y un resplandor que sigue el cursor. Todo se desactiva con <code>prefers-reduced-motion</code>.", en: "Ken Burns on the hero, parallax and reveal with <code>animation-timeline</code>, and a glow that follows the cursor. All disabled under <code>prefers-reduced-motion</code>." } },
      { k: { es: "Conversión", en: "Conversion" }, t: { es: "Del formulario a WhatsApp", en: "From form to WhatsApp" },
        d: { es: "El formulario envía un correo con Nodemailer (Gmail) que trae un botón para responder al cliente por WhatsApp. Botón flotante de WhatsApp y datos de contacto centralizados en un solo archivo.", en: "The form sends an email via Nodemailer (Gmail) with a button to reply to the customer on WhatsApp. Floating WhatsApp button and contact data kept in a single file." } }
    ],
    diagram: "tokens",
    gallery: [
      { src: "img/invicar-landing/inicio", cap: { es: "<b>Hero.</b> Encabezado translúcido, efecto Ken Burns y acceso a las tres líneas.", en: "<b>Hero.</b> Translucent header, Ken Burns effect and access to the three lines." } },
      { src: "img/invicar-landing/linea-buses", cap: { es: "<b>Línea Buses.</b> Destacados con iconos y carrusel con miniaturas.", en: "<b>Bus line.</b> Icon highlights and thumbnail carousel." } },
      { src: "img/invicar-landing/galeria-3d", cap: { es: "<b>Galería 3D.</b> Coverflow con perspectiva, laterales en gris y reflejo.", en: "<b>3D gallery.</b> Coverflow with perspective, grey sides and reflection." } },
      { src: "img/invicar-landing/linea-midibuses", cap: { es: "<b>Línea Midibuses</b> sobre paneles de vidrio translúcido.", en: "<b>Midibus line</b> on translucent glass panels." } },
      { src: "img/invicar-landing/nosotros", cap: { es: "<b>Nosotros.</b> Cifras animadas, misión, visión y servicios.", en: "<b>About.</b> Animated figures, mission, vision and services." } },
      { src: "img/invicar-landing/historia", cap: { es: "<b>Historia</b> en cuatro capítulos, de 1992 al modelo ISIS de 2006.", en: "<b>History</b> in four chapters, from 1992 to the 2006 ISIS model." } },
      { src: "img/invicar-landing/contacto", cap: { es: "<b>Contacto.</b> Formulario con envío por correo y respuesta por WhatsApp.", en: "<b>Contact.</b> Form sent by email with a WhatsApp reply button." } }
    ],
    phones: [
      { src: "img/invicar-landing/m-inicio", cap: { es: "Hero en celular", en: "Hero on mobile" } },
      { src: "img/invicar-landing/m-galeria-3d", cap: { es: "Galería 3D táctil", en: "Touch 3D gallery" } },
      { src: "img/invicar-landing/m-menu", cap: { es: "Menú móvil", en: "Mobile menu" } }
    ],
    galleryNote: null,
    metrics: [
      { v: "0", l: { es: "errores de consola", en: "console errors" } },
      { v: "0 px", l: { es: "de desbordamiento horizontal a 1440 y 390 px", en: "horizontal overflow at 1440 and 390 px" } },
      { v: "3", l: { es: "líneas de producto con galería 3D", en: "product lines with a 3D gallery" } },
      { v: "1", l: { es: "archivo con todos los datos de contacto", en: "file holding all contact data" } }
    ],
    results: [
      { es: "Sin errores de consola y sin desbordamiento horizontal en escritorio (1440 px) ni en móvil (390 px). Totalmente responsive.", en: "No console errors and no horizontal overflow on desktop (1440 px) or mobile (390 px). Fully responsive." },
      { es: "Datos estructurados JSON-LD de tipo <code>LocalBusiness</code> para SEO local.", en: "<code>LocalBusiness</code> JSON-LD structured data for local SEO." },
      { es: "Encabezado fijo con enlace activo según la sección y barra de progreso de scroll.", en: "Sticky header with section-aware active link and a scroll progress bar." }
    ],
    learnings: [
      { es: "Una restricción fuerte de marca (sin fondos blancos, solo tres colores) obliga a resolver la jerarquía con foto, vidrio y tipografía, y el resultado es más coherente.", en: "A strict brand constraint (no white backgrounds, only three colors) forces you to solve hierarchy with photography, glass and type, and the result is more coherent." },
      { es: "Partir de un sistema documentado (DESIGN.md) acelera las decisiones y evita que la página vuelva a sentirse armada por partes.", en: "Starting from a documented system (DESIGN.md) speeds up decisions and keeps the page from feeling pieced together again." },
      { es: "Cada efecto de movimiento necesita su versión quieta: <code>prefers-reduced-motion</code> se diseña desde el principio.", en: "Every motion effect needs its still version: <code>prefers-reduced-motion</code> is designed in from the start." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "chatbot-trans-andes",
    client: "Transportadora de los Andes, Paipa",
    badge: { es: "Práctica", en: "Internship" },
    year: "2026",
    categories: ["fullstack", "desarrollo"],
    tone: "chatbot",
    noImages: true,
    stack: ["Full-Stack", "WhatsApp API", "Telegram API", "Google Maps SDK", "Render", "Vercel"],
    title: { es: "Chatbot Trans Andes · Despacho automatizado", en: "Trans Andes Chatbot · Automated dispatch" },
    type: { es: "Práctica profesional", en: "Professional internship" },
    value: {
      es: "Construí un ecosistema de despacho que atiende a los usuarios por WhatsApp y Telegram y ubica direcciones con Google Maps.",
      en: "I built a dispatch ecosystem that serves users over WhatsApp and Telegram and locates addresses with Google Maps."
    },
    role: { es: "Practicante de Ingeniería de Sistemas / Desarrollador", en: "Systems Engineering intern / Developer" },
    status: { es: "Entregado a la empresa · feb.–may. 2026", en: "Handed over · Feb–May 2026" },
    links: [],
    context: {
      es: "<p>Durante mi práctica en <strong>Transportadora de los Andes</strong> (Paipa, Boyacá) desarrollé un ecosistema de despacho automatizado con arquitectura full-stack.</p>",
      en: "<p>During my internship at <strong>Transportadora de los Andes</strong> (Paipa, Boyacá) I built an automated dispatch ecosystem with a full-stack architecture.</p>"
    },
    problem: {
      es: "<p>La empresa necesitaba automatizar la interacción con sus usuarios en los canales que ya usaban y mejorar la logística del despacho con ubicaciones precisas.</p>",
      en: "<p>The company needed to automate interaction with its users on the channels they already used and improve dispatch logistics with accurate locations.</p>"
    },
    roleText: {
      es: "<p>Desarrollo full-stack, integraciones, despliegue y mantenimiento, documentación técnica, manuales de usuario y reportes finales de gestión.</p>",
      en: "<p>Full-stack development, integrations, deployment and maintenance, technical documentation, user manuals and final management reports.</p>"
    },
    process: [
      { k: { es: "Canales", en: "Channels" }, t: { es: "WhatsApp y Telegram", en: "WhatsApp and Telegram" },
        d: { es: "Integré las APIs de mensajería para automatizar la conversación con los usuarios.", en: "I integrated the messaging APIs to automate conversations with users." } },
      { k: { es: "Logística", en: "Logistics" }, t: { es: "Geocodificación", en: "Geocoding" },
        d: { es: "Implementé servicios de geocodificación con Google Maps SDK para optimizar el despacho.", en: "I implemented geocoding services with the Google Maps SDK to optimize dispatch." } },
      { k: { es: "Operación", en: "Operations" }, t: { es: "Despliegue en la nube", en: "Cloud deployment" },
        d: { es: "Gestioné el despliegue y el mantenimiento en Render y Vercel.", en: "I managed deployment and maintenance on Render and Vercel." } },
      { k: { es: "Entrega", en: "Handover" }, t: { es: "Documentación", en: "Documentation" },
        d: { es: "Documentación técnica, manuales de usuario y reportes finales de gestión.", en: "Technical documentation, user manuals and final management reports." } }
    ],
    diagram: "arch",
    gallery: [],
    phones: [],
    galleryNote: {
      es: "No muestro capturas ni código: todo el material se entregó a la empresa y le pertenece.",
      en: "I don't show screenshots or code: all material was handed over to the company and belongs to it."
    },
    metrics: [
      { v: "2", l: { es: "canales de mensajería integrados", en: "messaging channels integrated" } },
      { v: "4", l: { es: "meses de práctica", en: "months of internship" } },
      { v: "2", l: { es: "plataformas de despliegue", en: "deployment platforms" } }
    ],
    results: [
      { es: "Ecosistema de despacho entregado a la empresa con su documentación técnica y manuales de usuario.", en: "Dispatch ecosystem handed over to the company with technical documentation and user manuals." },
      { es: "Aplicaciones desplegadas y mantenidas en Render y Vercel durante la práctica.", en: "Apps deployed and maintained on Render and Vercel during the internship." }
    ],
    learnings: [
      { es: "Integrar canales que la gente ya usa baja la barrera de adopción más que cualquier app nueva.", en: "Integrating channels people already use lowers the adoption barrier more than any new app." },
      { es: "Documentar para quien se queda con el sistema es parte de terminar el trabajo.", en: "Documenting for whoever keeps the system is part of finishing the job." }
    ]
  }
];

/* ---------- Textos de la interfaz (ES / EN) ---------- */
window.I18N = {
  es: {
    "meta.title": "Camilo Hernández Rincón · Desarrollador Full-Stack y diseño de producto",
    "meta.desc": "Ingeniero que diseña: de los requisitos a la interfaz, y de la interfaz a producción. Sistemas web para empresas reales en Boyacá, Colombia.",
    "skip": "Saltar al contenido",
    "nav.projects": "Proyectos", "nav.about": "Sobre mí", "nav.skills": "Habilidades", "nav.process": "Proceso", "nav.experience": "Experiencia", "nav.contact": "Contacto",
    "nav.cv": "Descargar CV", "nav.menu": "Abrir menú", "nav.menuClose": "Cerrar menú",
    "theme.toDark": "Activar modo oscuro", "theme.toLight": "Activar modo claro",
    "lang.switch": "Switch to English",
    "brand.role": "Full-Stack · Diseño",
    "hero.status": "Disponible para remoto, presencial o freelance",
    "hero.title_html": "Ingeniero que diseña: de los requisitos a la interfaz, y de la interfaz a producción.",
    "hero.role": "Desarrollador Full-Stack en Tunja, Boyacá. Disponible para trabajo remoto, presencial o freelance.",
    "hero.lead": "Convierto procesos que hoy viven en Excel y WhatsApp en software que la gente usa todos los días.",
    "hero.cta1": "Ver proyectos", "hero.cta2": "Hablemos",
    "hero.f1": "proyectos para empresas de Boyacá", "hero.f2": "puesto, Hackathon USTA 2025-2", "hero.f3": "inventario en uso diario",
    "hero.annot1": "fig. 1 — inventario en producción", "hero.annot2": "reservas en tiempo real",
    "hero.alt1": "Panel del sistema de inventarios de Invicar", "hero.alt2": "Pantalla de reservas de Soccer Play", "hero.alt3": "Landing de Autobuses INVICAR en celular",
    "projects.eyebrow": "Trabajo seleccionado",
    "projects.title": "Proyectos",
    "projects.lead": "Problemas reales de empresas de Boyacá, resueltos de punta a punta: del levantamiento de requisitos a la instalación y el soporte.",
    "filter.all": "Todos", "filter.desarrollo": "Desarrollo", "filter.diseno": "Diseño", "filter.fullstack": "Full-stack",
    "filter.label": "Filtrar proyectos por categoría",
    "card.cta": "Ver caso de estudio",
    "card.noimg": "Sin capturas: el material pertenece a la empresa",
    "chat.b1": "Hola, necesito un despacho", "chat.b2": "¿Cuál es la dirección de recogida?", "chat.b3": "Ubicación confirmada", "chat.b4": "Despacho asignado. Te avisamos al llegar.",
    "about.eyebrow": "Sobre mí",
    "about.title": "Ingeniería para entender el problema, diseño para que la gente lo use.",
    "about.lead": "Empecé por el lado de los requisitos: escuchar cómo trabaja una empresa, documentarlo y dibujar los primeros mockups.",
    "about.p1": "Ahí aprendí que un sistema puede ser técnicamente correcto y aun así no servir si nadie lo entiende. Por eso diseño la interfaz con el mismo cuidado con el que modelo los datos: una cancha de fútbol 8 dividida en tercios para que no existan dobles reservas, o un kit de materiales que se descuenta completo o no se descuenta.",
    "about.p2": "Estudio Ingeniería de Sistemas en la Universidad Santo Tomás (Tunja) y termino materias en noviembre de 2026. Mientras tanto he llevado sistemas a producción para empresas de Boyacá y hoy les doy soporte. Me interesa trabajar con equipos que valoren el detalle, de forma remota, presencial o como freelance.",
    "about.k1": "Base", "about.v1": "Tunja, Boyacá · Colombia (UTC-5)",
    "about.k2": "Modalidad", "about.v2": "Remoto, presencial o freelance",
    "about.k3": "Idiomas", "about.v3": "Español nativo · Inglés avanzado",
    "about.k4": "Ahora", "about.v4": "Terminando Ingeniería de Sistemas, USTA",
    "about.alt": "Retrato de Camilo Hernández Rincón",
    "about.cap1": "Camilo Hernández Rincón", "about.cap2": "Tunja, 2026",
    "skills.eyebrow": "Habilidades",
    "skills.title": "Con qué trabajo",
    "skills.lead": "Agrupado por lo que resuelve. Todo lo listado lo he usado en un proyecto real.",
    "sk.design": "Diseño", "sk.design.p": "Interfaces claras, sistemas visuales a partir de la marca y prototipos para validar antes de construir.",
    "sk.front": "Frontend", "sk.front.p": "Interfaces responsive, accesibles y rápidas, con componentes reutilizables.",
    "sk.back": "Backend", "sk.back.p": "Reglas de negocio, autenticación, roles y permisos aplicados en el servidor.",
    "sk.data": "Datos e infraestructura", "sk.data.p": "Bases de datos, despliegue en la nube o en red local, copias de seguridad.",
    "sk.tools": "Herramientas y método", "sk.tools.p": "Cómo organizo el trabajo y cómo lo entrego.",
    "process.eyebrow": "Proceso",
    "process.title": "Cómo abordo un proyecto",
    "process.lead": "Cinco pasos que se repiten en todos mis proyectos, con un ejemplo real de cada uno.",
    "p1.t": "Entender", "p1.d": "Me siento con quien hace el trabajo hoy y veo cómo lo hace: sus hojas de Excel, sus chats, sus atajos.", "p1.e": "Invicar: 13 listados de material en Excel por sección y chasis.",
    "p2.t": "Modelar", "p2.d": "Traduzco el negocio a datos y reglas antes de dibujar pantallas. Aquí se evitan los errores caros.", "p2.e": "Soccer Play: la cancha F8 como tres tercios.",
    "p3.t": "Diseñar", "p3.d": "Sistema visual desde la marca, móvil primero y con estados claros para cada acción.", "p3.e": "Landing INVICAR: solo azul, dorado y vidrio.",
    "p4.t": "Construir", "p4.d": "Código tipado, pruebas sobre la lógica crítica y permisos en el servidor, no solo en pantalla.", "p4.e": "Inventarios: 27 pruebas automáticas.",
    "p5.t": "Entregar y acompañar", "p5.d": "Instalación, guía para el cliente, copias de seguridad y soporte después del lanzamiento.", "p5.e": "Instalador de Windows y soporte por videollamada.",
    "exp.eyebrow": "Trayectoria",
    "exp.title": "Experiencia y formación",
    "exp.kind.work": "Proyectos", "exp.kind.intern": "Práctica", "exp.kind.academic": "Académico", "exp.kind.edu": "Formación",
    "exp.free.date": "2026 — hoy", "exp.free.t": "Desarrollador full-stack independiente", "exp.free.o": "Autobuses INVICAR · Soccer Play — Duitama, Boyacá",
    "exp.free.l1": "Sistema de control de inventarios en red local, en uso diario (v1.6), con instalación y soporte.",
    "exp.free.l2": "Sitio corporativo de Autobuses INVICAR: diseño, front-end y backend del formulario.",
    "exp.free.l3": "Sistema de reservas de canchas en tiempo real para un complejo con dos sedes.",
    "exp.ta.date": "feb. 2026 — may. 2026", "exp.ta.t": "Practicante de Ingeniería de Sistemas / Desarrollador", "exp.ta.o": "Transportadora de los Andes — Paipa, Boyacá",
    "exp.ta.l1": "Ecosistema de despacho automatizado (Chatbot Trans Andes) con arquitectura full-stack.",
    "exp.ta.l2": "Integración de APIs de WhatsApp y Telegram, y geocodificación con Google Maps SDK.",
    "exp.ta.l3": "Despliegue y mantenimiento en Render y Vercel; documentación técnica y manuales de usuario.",
    "exp.usta.date": "ago. 2025 — oct. 2025", "exp.usta.t": "Analista de requisitos", "exp.usta.o": "Universidad Santo Tomás — proyecto Cuartel de Bombermans",
    "exp.usta.l1": "Levantamiento y análisis de requisitos funcionales y no funcionales.",
    "exp.usta.l2": "Documentación técnica y funcional, y mockups de la interfaz del sistema.",
    "exp.usta.l3": "Apoyo en la definición del alcance y la organización del proyecto.",
    "exp.edu.date": "2022 — 2026", "exp.edu.t": "Ingeniería de Sistemas", "exp.edu.o": "Universidad Santo Tomás, seccional Tunja · fin de materias en noviembre de 2026",
    "exp.award.n": "1.º", "exp.award.t": "Primer puesto · Hackathon USTA 2025-2",
    "exp.cert.title": "Certificaciones",
    "exp.cert.1": "Scrum Fundamentals Certified", "exp.cert.2": "AWS Compute Services Overview", "exp.cert.3": "Seminario Cloud Computing — Azure for Students",
    "exp.cert.4": "Workshop de Inteligencia Artificial y Machine Learning", "exp.cert.5": "I Congreso Internacional de Investigación en Ingeniería de Sistemas",
    "exp.lang.title": "Idiomas", "exp.lang.es": "Español", "exp.lang.es.v": "Nativo", "exp.lang.en": "Inglés", "exp.lang.en.v": "Avanzado",
    "contact.eyebrow": "Contacto",
    "contact.title": "¿Tienes un proceso que se está quedando corto en Excel?",
    "contact.lead": "Cuéntame qué necesitas y te respondo en español o en inglés.",
    "contact.copy": "Copiar correo", "contact.copied": "Correo copiado",
    "form.name": "Nombre", "form.email": "Correo", "form.type": "Tipo de proyecto", "form.optional": "(opcional)",
    "form.type.0": "Selecciona una opción", "form.type.1": "Sistema a la medida", "form.type.2": "Sitio web o landing", "form.type.3": "Oferta de empleo", "form.type.4": "Otro",
    "form.msg": "Mensaje", "form.msg.ph": "Qué quieres construir, para cuándo y cualquier detalle útil.",
    "form.send": "Enviar mensaje", "form.sending": "Enviando…",
    "form.note": "Solo uso tus datos para responderte.",
    "form.err.name": "Escribe tu nombre.", "form.err.email": "Escribe un correo válido, por ejemplo nombre@empresa.com.", "form.err.msg": "Cuéntame un poco más: al menos 20 caracteres.",
    "form.ok": "Mensaje enviado. Te respondo pronto.",
    "form.fail": "No se pudo enviar. Escríbeme directamente a camhernandezri@gmail.com.",
    "form.draft": "Tu mensaje está listo. Ábrelo en tu correo o cópialo y envíalo a camhernandezri@gmail.com.",
    "form.openMail": "Abrir en mi correo", "form.copyMsg": "Copiar mensaje", "form.copiedMsg": "Mensaje copiado",
    "footer.cta_html": "¿Construimos algo útil?",
    "footer.made": "Diseñado y construido a mano en Tunja.",
    "footer.top": "Volver arriba",
    "case.back": "Proyectos", "case.prev": "Proyecto anterior", "case.next": "Proyecto siguiente", "case.close": "Cerrar caso de estudio",
    "case.year": "Año", "case.role": "Rol", "case.client": "Cliente", "case.status": "Estado", "case.type": "Tipo",
    "case.s.context": "Contexto", "case.s.problem": "Problema", "case.s.role": "Mi rol", "case.s.process": "Proceso", "case.s.solution": "Solución",
    "case.s.results": "Resultados", "case.s.stack": "Stack", "case.s.learnings": "Aprendizajes",
    "case.toc": "En este caso",
    "case.desktop": "Escritorio", "case.mobile": "Celular",
    "case.mode": "Ver capturas en", "case.light": "Claro", "case.dark": "Oscuro",
    "case.nextLabel": "Siguiente proyecto",
    "case.zoom": "Ampliar captura",
    "lb.close": "Cerrar", "lb.prev": "Anterior", "lb.next": "Siguiente",
    "dg.thirds.title": "Cómo se evitan las dobles reservas",
    "dg.thirds.a": "Reserva F5 · cancha 2", "dg.thirds.a2": "ocupa el tercio T2",
    "dg.thirds.b": "Reserva F8", "dg.thirds.b2": "ocupa T1 + T2 + T3",
    "dg.thirds.c": "Otra persona pide la F8 a la misma hora", "dg.thirds.c2": "T2 ya está tomado → falla toda la operación",
    "dg.kit.title": "Descuento de kit: todo o nada",
    "dg.kit.name": "Estructura · Volkswagen", "dg.kit.bus": "Bus 780",
    "dg.kit.fail": "Falta 1 material → no se descuenta nada y el stock queda igual.",
    "dg.kit.pass": "Hay de todo → se descuenta el kit completo y queda en la carpeta del bus 780 con su costo.",
    "dg.kit.m1": "Tubo cuadrado 1\"", "dg.kit.m2": "Lámina CR cal. 20", "dg.kit.m3": "Soldadura 6013", "dg.kit.m4": "Disco de corte 7\"",
    "dg.kit.note": "Ejemplo ilustrativo con datos ficticios.",
    "dg.tokens.title": "Sistema visual de la marca",
    "dg.tokens.navy": "Azul INVICAR", "dg.tokens.gold": "Dorado", "dg.tokens.glass": "Vidrio translúcido",
    "dg.tokens.grid": "Grilla", "dg.tokens.type": "Tipografía",
    "dg.arch.title": "Flujo general del sistema",
    "dg.arch.n1": "Usuario", "dg.arch.n1s": "WhatsApp · Telegram",
    "dg.arch.n2": "Chatbot", "dg.arch.n2s": "lógica de despacho",
    "dg.arch.n3": "Geocodificación", "dg.arch.n3s": "Google Maps SDK",
    "dg.arch.n4": "Despacho", "dg.arch.n4s": "Render · Vercel",
    "notfound": "No encontré ese proyecto."
  },
  en: {
    "meta.title": "Camilo Hernández Rincón · Full-Stack Developer & Product Design",
    "meta.desc": "An engineer who designs: from requirements to interface, and from interface to production. Web systems for real businesses in Boyacá, Colombia.",
    "skip": "Skip to content",
    "nav.projects": "Projects", "nav.about": "About", "nav.skills": "Skills", "nav.process": "Process", "nav.experience": "Experience", "nav.contact": "Contact",
    "nav.cv": "Download CV", "nav.menu": "Open menu", "nav.menuClose": "Close menu",
    "theme.toDark": "Switch to dark mode", "theme.toLight": "Switch to light mode",
    "lang.switch": "Cambiar a español",
    "brand.role": "Full-Stack · Design",
    "hero.status": "Available for remote, on-site or freelance work",
    "hero.title_html": "An engineer who designs: from requirements to interface, and from interface to production.",
    "hero.role": "Full-Stack Developer based in Tunja, Colombia. Open to remote, on-site or freelance work.",
    "hero.lead": "I turn processes that live in Excel and WhatsApp into software people use every day.",
    "hero.cta1": "See projects", "hero.cta2": "Let's talk",
    "hero.f1": "projects for businesses in Boyacá", "hero.f2": "place, USTA Hackathon 2025-2", "hero.f3": "inventory system in daily use",
    "hero.annot1": "fig. 1 — inventory in production", "hero.annot2": "real-time bookings",
    "hero.alt1": "Invicar inventory system dashboard", "hero.alt2": "Soccer Play booking screen", "hero.alt3": "Autobuses INVICAR landing page on mobile",
    "projects.eyebrow": "Selected work",
    "projects.title": "Projects",
    "projects.lead": "Real problems from businesses in Boyacá, Colombia, solved end to end: from requirements to installation and support.",
    "filter.all": "All", "filter.desarrollo": "Development", "filter.diseno": "Design", "filter.fullstack": "Full-stack",
    "filter.label": "Filter projects by category",
    "card.cta": "Read case study",
    "card.noimg": "No screenshots: the material belongs to the company",
    "chat.b1": "Hi, I need a dispatch", "chat.b2": "What's the pickup address?", "chat.b3": "Location confirmed", "chat.b4": "Dispatch assigned. We'll let you know on arrival.",
    "about.eyebrow": "About",
    "about.title": "Engineering to understand the problem, design so people actually use it.",
    "about.lead": "I started on the requirements side: listening to how a company works, documenting it and sketching the first mockups.",
    "about.p1": "That's where I learned a system can be technically correct and still be useless if nobody understands it. So I design the interface with the same care I put into the data model: an 8-a-side pitch split into thirds so double bookings can't exist, or a materials kit that is deducted in full or not at all.",
    "about.p2": "I study Systems Engineering at Universidad Santo Tomás (Tunja) and finish my coursework in November 2026. Meanwhile I've shipped systems to production for businesses in Boyacá and support them today. I want to work with teams that care about detail, remotely, on-site or freelance.",
    "about.k1": "Based in", "about.v1": "Tunja, Boyacá · Colombia (UTC-5)",
    "about.k2": "Work mode", "about.v2": "Remote, on-site or freelance",
    "about.k3": "Languages", "about.v3": "Native Spanish · Advanced English",
    "about.k4": "Now", "about.v4": "Finishing Systems Engineering, USTA",
    "about.alt": "Portrait of Camilo Hernández Rincón",
    "about.cap1": "Camilo Hernández Rincón", "about.cap2": "Tunja, 2026",
    "skills.eyebrow": "Skills",
    "skills.title": "What I work with",
    "skills.lead": "Grouped by what it solves. Everything listed here I've used on a real project.",
    "sk.design": "Design", "sk.design.p": "Clear interfaces, visual systems built from the brand, and prototypes to validate before building.",
    "sk.front": "Frontend", "sk.front.p": "Responsive, accessible, fast interfaces with reusable components.",
    "sk.back": "Backend", "sk.back.p": "Business rules, authentication, roles and permissions enforced on the server.",
    "sk.data": "Data & infrastructure", "sk.data.p": "Databases, cloud or local-network deployment, backups.",
    "sk.tools": "Tools & method", "sk.tools.p": "How I organize the work and how I deliver it.",
    "process.eyebrow": "Process",
    "process.title": "How I approach a project",
    "process.lead": "Five steps that repeat across all my projects, each with a real example.",
    "p1.t": "Understand", "p1.d": "I sit with whoever does the work today and watch how they do it: their spreadsheets, their chats, their shortcuts.", "p1.e": "Invicar: 13 material lists in Excel by section and chassis.",
    "p2.t": "Model", "p2.d": "I translate the business into data and rules before drawing screens. This is where expensive bugs are avoided.", "p2.e": "Soccer Play: the 8-a-side pitch as three thirds.",
    "p3.t": "Design", "p3.d": "A visual system from the brand, mobile-first, with clear states for every action.", "p3.e": "INVICAR landing: only blue, gold and glass.",
    "p4.t": "Build", "p4.d": "Typed code, tests on the critical logic and permissions on the server, not just on screen.", "p4.e": "Inventory: 27 automated tests.",
    "p5.t": "Deliver & support", "p5.d": "Installation, a client guide, backups and support after launch.", "p5.e": "Windows installer and video-call support.",
    "exp.eyebrow": "Track record",
    "exp.title": "Experience & education",
    "exp.kind.work": "Projects", "exp.kind.intern": "Internship", "exp.kind.academic": "Academic", "exp.kind.edu": "Education",
    "exp.free.date": "2026 — now", "exp.free.t": "Independent full-stack developer", "exp.free.o": "Autobuses INVICAR · Soccer Play — Duitama, Boyacá",
    "exp.free.l1": "Local-network inventory control system in daily use (v1.6), with installation and support.",
    "exp.free.l2": "Autobuses INVICAR corporate site: design, front-end and contact-form backend.",
    "exp.free.l3": "Real-time pitch booking system for a sports complex with two locations.",
    "exp.ta.date": "Feb 2026 — May 2026", "exp.ta.t": "Systems Engineering intern / Developer", "exp.ta.o": "Transportadora de los Andes — Paipa, Boyacá",
    "exp.ta.l1": "Automated dispatch ecosystem (Trans Andes Chatbot) with a full-stack architecture.",
    "exp.ta.l2": "WhatsApp and Telegram API integration, and geocoding with the Google Maps SDK.",
    "exp.ta.l3": "Deployment and maintenance on Render and Vercel; technical docs and user manuals.",
    "exp.usta.date": "Aug 2025 — Oct 2025", "exp.usta.t": "Requirements analyst", "exp.usta.o": "Universidad Santo Tomás — Cuartel de Bombermans project",
    "exp.usta.l1": "Gathering and analysis of functional and non-functional requirements.",
    "exp.usta.l2": "Technical and functional documentation, and mockups of the system interface.",
    "exp.usta.l3": "Support in defining the project's scope and organization.",
    "exp.edu.date": "2022 — 2026", "exp.edu.t": "Systems Engineering", "exp.edu.o": "Universidad Santo Tomás, Tunja · coursework ends November 2026",
    "exp.award.n": "1st", "exp.award.t": "First place · USTA Hackathon 2025-2",
    "exp.cert.title": "Certifications",
    "exp.cert.1": "Scrum Fundamentals Certified", "exp.cert.2": "AWS Compute Services Overview", "exp.cert.3": "Cloud Computing Seminar — Azure for Students",
    "exp.cert.4": "Artificial Intelligence and Machine Learning Workshop", "exp.cert.5": "1st International Congress on Systems Engineering Research",
    "exp.lang.title": "Languages", "exp.lang.es": "Spanish", "exp.lang.es.v": "Native", "exp.lang.en": "English", "exp.lang.en.v": "Advanced",
    "contact.eyebrow": "Contact",
    "contact.title": "Got a process that's outgrowing its spreadsheet?",
    "contact.lead": "Tell me what you need and I'll reply in English or Spanish.",
    "contact.copy": "Copy email", "contact.copied": "Email copied",
    "form.name": "Name", "form.email": "Email", "form.type": "Project type", "form.optional": "(optional)",
    "form.type.0": "Choose an option", "form.type.1": "Custom system", "form.type.2": "Website or landing page", "form.type.3": "Job opportunity", "form.type.4": "Other",
    "form.msg": "Message", "form.msg.ph": "What you want to build, by when, and any useful detail.",
    "form.send": "Send message", "form.sending": "Sending…",
    "form.note": "I only use your details to reply to you.",
    "form.err.name": "Enter your name.", "form.err.email": "Enter a valid email, e.g. name@company.com.", "form.err.msg": "Tell me a bit more: at least 20 characters.",
    "form.ok": "Message sent. I'll get back to you soon.",
    "form.fail": "It couldn't be sent. Email me directly at camhernandezri@gmail.com.",
    "form.draft": "Your message is ready. Open it in your email app, or copy it and send it to camhernandezri@gmail.com.",
    "form.openMail": "Open in my email", "form.copyMsg": "Copy message", "form.copiedMsg": "Message copied",
    "footer.cta_html": "Shall we build something useful?",
    "footer.made": "Designed and hand-built in Tunja, Colombia.",
    "footer.top": "Back to top",
    "case.back": "Projects", "case.prev": "Previous project", "case.next": "Next project", "case.close": "Close case study",
    "case.year": "Year", "case.role": "Role", "case.client": "Client", "case.status": "Status", "case.type": "Type",
    "case.s.context": "Context", "case.s.problem": "Problem", "case.s.role": "My role", "case.s.process": "Process", "case.s.solution": "Solution",
    "case.s.results": "Results", "case.s.stack": "Stack", "case.s.learnings": "Learnings",
    "case.toc": "In this case",
    "case.desktop": "Desktop", "case.mobile": "Mobile",
    "case.mode": "Show screenshots in", "case.light": "Light", "case.dark": "Dark",
    "case.nextLabel": "Next project",
    "case.zoom": "Enlarge screenshot",
    "lb.close": "Close", "lb.prev": "Previous", "lb.next": "Next",
    "dg.thirds.title": "How double bookings are prevented",
    "dg.thirds.a": "5-a-side booking · pitch 2", "dg.thirds.a2": "takes third T2",
    "dg.thirds.b": "8-a-side booking", "dg.thirds.b2": "takes T1 + T2 + T3",
    "dg.thirds.c": "Someone else requests the 8-a-side at the same time", "dg.thirds.c2": "T2 is taken → the whole operation fails",
    "dg.kit.title": "Kit deduction: all or nothing",
    "dg.kit.name": "Structure · Volkswagen", "dg.kit.bus": "Bus 780",
    "dg.kit.fail": "1 material short → nothing is deducted and stock stays the same.",
    "dg.kit.pass": "Everything in stock → the full kit is deducted and filed in bus 780's folder with its cost.",
    "dg.kit.m1": "Square tube 1\"", "dg.kit.m2": "CR sheet 20 ga.", "dg.kit.m3": "6013 welding rod", "dg.kit.m4": "Cutting disc 7\"",
    "dg.kit.note": "Illustrative example with fictional data.",
    "dg.tokens.title": "Brand visual system",
    "dg.tokens.navy": "INVICAR blue", "dg.tokens.gold": "Gold", "dg.tokens.glass": "Translucent glass",
    "dg.tokens.grid": "Grid", "dg.tokens.type": "Typography",
    "dg.arch.title": "System overview",
    "dg.arch.n1": "User", "dg.arch.n1s": "WhatsApp · Telegram",
    "dg.arch.n2": "Chatbot", "dg.arch.n2s": "dispatch logic",
    "dg.arch.n3": "Geocoding", "dg.arch.n3s": "Google Maps SDK",
    "dg.arch.n4": "Dispatch", "dg.arch.n4s": "Render · Vercel",
    "notfound": "I couldn't find that project."
  }
};

/* ---------- Habilidades (sin porcentajes) ---------- */
window.SKILLS = [
  { key: "sk.design", items: ["Mockups y prototipado|Mockups & prototyping", "Sistemas de diseño (tokens, DESIGN.md)|Design systems (tokens, DESIGN.md)", "Mobile-first", "Accesibilidad WCAG|WCAG accessibility", "Modo oscuro|Dark mode", "Análisis de requisitos|Requirements analysis"] },
  { key: "sk.front", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui"] },
  { key: "sk.back", items: ["Node.js", "Next.js API", "Nodemailer", "Firebase Auth", "Reglas de Firestore|Firestore rules", "APIs WhatsApp / Telegram|WhatsApp / Telegram APIs", "Google Maps SDK", "Auth, sesiones y roles|Auth, sessions & roles"] },
  { key: "sk.data", items: ["SQLite (WAL, migraciones)|SQLite (WAL, migrations)", "Firestore", "MongoDB", "Power BI", "Vercel", "Render", "Firebase Hosting", "Windows · PowerShell"] },
  { key: "sk.tools", items: ["Git / GitHub", "pnpm", "Claude Code", "Scrum", "Pruebas automáticas|Automated testing", "Documentación técnica|Technical documentation"] }
];
