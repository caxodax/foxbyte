export interface ExtendedService {
  slug: string;
  title: string;
  commercialTitle: string;
  shortDescription: string;
  description: string;
  audience: string[];
  problems: string[];
  capabilities: string[];
  process: string[];
  relatedProjectSlugs: string[];
}

export const servicesExtendedData: Record<string, Omit<ExtendedService, 'slug' | 'title' | 'shortDescription'>> = {
  'e-commerce': {
    commercialTitle: 'Desarrollo de Plataformas E-commerce',
    description: 'Diseñamos e implementamos tiendas en línea robustas, seguras y altamente escalables que convierten visitantes en clientes recurrentes. Integramos pasarelas de pago y automatizamos flujos de entrega.',
    audience: [
      'Empresas medianas que desean digitalizar su canal de ventas físico.',
      'Marcas consolidadas que buscan independencia de plataformas SaaS rígidas (como Shopify o WooCommerce genéricos).',
      'Negocios con venta híbrida de productos físicos y descargas digitales automatizadas.'
    ],
    problems: [
      'Caídas constantes en momentos de alta demanda (Hot Sale, Black Friday).',
      'Procesamiento de pagos inestable o con altas tasas de rechazo de transacciones.',
      'Gestión de stock e inventario descentralizada que genera retrasos operativos.',
      'Proceso de compra (Checkout) confuso que provoca abandono de carritos.'
    ],
    capabilities: [
      'Arquitectura de catálogo dual (productos físicos y descargas de infoproductos).',
      'Integración nativa con pasarelas de pago locales e internacionales (Mercado Pago, PayPal, Stripe).',
      'Checkout optimizado en un solo paso y diseño UI/UX de alta conversión.',
      'Paneles de administración autogestionables y automatización de facturación.',
      'Sincronización en tiempo real con inventarios físicos (ERPs).'
    ],
    process: [
      'Auditoría y definición de pasarelas de pago.',
      'Diseño de interfaces e interacción (Figma interactivo).',
      'Desarrollo frontend, backend e integraciones de seguridad.',
      'Fase de pruebas con transacciones reales y lanzamiento oficial.'
    ],
    relatedProjectSlugs: ['azucar-cacao-e-commerce-academia-digital']
  },
  'aplicaciones-moviles': {
    commercialTitle: 'Desarrollo de Aplicaciones Móviles',
    description: 'Construimos aplicaciones móviles nativas e híbridas para iOS y Android con un enfoque centrado en el rendimiento, la facilidad de uso y la retención del usuario final.',
    audience: [
      'Empresas de logística y operaciones en campo que necesitan digitalizar flujos de trabajo.',
      'Startups de base tecnológica que requieren un MVP móvil escalable.',
      'Negocios que buscan un canal móvil dedicado para interactuar de forma directa con su audiencia.'
    ],
    problems: [
      'Sistemas web no adaptados adecuadamente para un uso intensivo en pantallas pequeñas.',
      'Necesidad de acceso offline para operarios que trabajan en áreas con baja conectividad.',
      'Falta de retención de clientes por no contar con recordatorios y notificaciones móviles oportunas.'
    ],
    capabilities: [
      'Desarrollo híbrido de alto rendimiento (Flutter y React Native).',
      'Sincronización local y almacenamiento offline seguro.',
      'Notificaciones push hiper-personalizadas y programadas.',
      'Integraciones avanzadas con hardware (GPS, cámara, Bluetooth).',
      'Publicación en App Store (Apple) y Google Play (Android).'
    ],
    process: [
      'Definición de historias de usuario y flujos de pantallas.',
      'Prototipado interactivo y testeo de usabilidad.',
      'Desarrollo ágil móvil y conexión con APIs.',
      'Pruebas Beta (TestFlight) y publicación en tiendas oficiales.'
    ],
    relatedProjectSlugs: []
  },
  'bases-de-datos': {
    commercialTitle: 'Ingeniería y Optimización de Bases de Datos',
    description: 'Diseñamos bases de datos preparadas para millones de registros. Aseguramos el rendimiento mediante consultas optimizadas, indexación avanzada, replicación y alta disponibilidad.',
    audience: [
      'Compañías con sistemas legados que sufren bloqueos operacionales debido a la lentitud en reportes.',
      'Empresas con alto volumen transaccional que requieren consistencia absoluta de información.',
      'Negocios que carecen de políticas de copias de seguridad robustas y almacenamiento seguro.'
    ],
    problems: [
      'Reportes diarios que tardan minutos (u horas) en procesarse, paralizando al equipo.',
      'Pérdidas esporádicas de información por bloqueos concurrentes o fallas de red.',
      'Consultas lentas que degradan la experiencia de los clientes en las plataformas públicas.'
    ],
    capabilities: [
      'Modelado de bases de datos relacionales y no relacionales (PostgreSQL, MySQL, MongoDB).',
      'Auditoría y optimización de índices y planes de ejecución de consultas.',
      'Estrategias de escalado horizontal, replicación maestro-esclavo y alta disponibilidad.',
      'Automatización de backups remotos e integraciones en la nube (AWS, Firebase, Cloudflare).',
      'Seguridad y encriptación de datos sensibles a nivel de base de datos.'
    ],
    process: [
      'Análisis de cuellos de botella e indexaciones lentas.',
      'Propuesta de arquitectura y normalización de esquemas.',
      'Refactorización de consultas y migración de datos sin cortes.',
      'Implementación de alertas en tiempo real y monitoreo de salud del servidor.'
    ],
    relatedProjectSlugs: []
  },
  'solucion-a-la-medida': {
    commercialTitle: 'Desarrollo de Software y Soluciones a la Medida',
    description: 'Forjamos soluciones de software personalizadas que se adaptan exactamente a las particularidades operativas de tu empresa, eliminando cuellos de botella de forma definitiva.',
    audience: [
      'Empresas que ejecutan tareas repetitivas y manuales en múltiples hojas de cálculo.',
      'Compañías que no encuentran en el mercado una solución de software genérica que encaje con sus procesos.',
      'Negocios que necesitan centralizar e integrar múltiples herramientas en una única plataforma unificada.'
    ],
    problems: [
      'Error humano recurrente por la duplicación manual de datos entre plataformas.',
      'Falta de visibilidad de indicadores y KPIs de negocio consolidados en tiempo real.',
      'Sistemas desconectados que dificultan la comunicación e intercambio de información entre departamentos.'
    ],
    capabilities: [
      'Arquitectura de microservicios y sistemas modulares ampliables.',
      'Desarrollo de sistemas ERP, CRM y paneles operativos (Dashboards) a medida.',
      'Integración y creación de APIs robustas.',
      'Automatización de procesos robóticos básicos (RPA) y scripts de automatización.',
      'Seguridad corporativa y control de accesos basados en roles (RBAC).'
    ],
    process: [
      'Reuniones de levantamiento de procesos manuales y dolores operativos.',
      'Diseño conceptual del software y definición de historias de usuario.',
      'Desarrollo iterativo y demostraciones semanales de funcionalidad.',
      'Capacitación al personal, migración asistida y soporte post-lanzamiento.'
    ],
    relatedProjectSlugs: ['azucar-cacao-e-commerce-academia-digital']
  }
};
