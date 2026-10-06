# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Empresas en crecimiento, fundadores y líderes de operaciones que enfrentan fricción operativa, procesos manuales repetitivos o cuellos de botella tecnológicos, y que requieren plataformas confiables, sistemas internos o productos digitales para escalar con estabilidad.

## Product Purpose

Servir como el canal comercial, catálogo técnico y punto de entrada de Foxbyte: una boutique de ingeniería de software y automatización. El producto convierte visitantes cualificados en clientes potenciales ofreciéndoles un diagnóstico técnico claro y honesto antes de iniciar cualquier desarrollo.

## Positioning

Boutique de ingeniería de software y automatización de alta exigencia: a diferencia de las agencias de marketing o fábricas de software genéricas que ofrecen plantillas desechables o desarrollo sin rigor, Foxbyte diseña y construye sistemas robustos, arquitecturas escalables y soluciones a medida que resuelven procesos operativos complejos con soporte bajo acuerdos de confidencialidad (NDA).

## Operating Context

- Clientes que interactúan desde dispositivos móviles (prioritariamente vía WhatsApp o formularios rápidos) y desde escritorio para evaluar credenciales técnicas, stack de producción y casos de estudio.
- Flujo de adquisición: Visita → Comprensión del valor → Exploración de servicios/portafolio → Solicitud de diagnóstico técnico o contacto instantáneo por WhatsApp → Propuesta con ruta clara en < 24h.

## Capabilities and Constraints

- **Capacidades:**
  - Landing comercial de alta conversión con navegación fluida y jerarquía mobile-first.
  - Catálogo de servicios especializados en formato Bento Box (Soluciones a medida, Mobile, Cloud/Bases de datos, E-commerce).
  - Showcase interactivo de portafolio con filtros por categoría y modal ejecutivo para proyectos protegidos bajo NDA.
  - Sistema unificado de contacto (`ContactForm`) conectado a Firestore REST API con validación y confirmación en tiempo real.
  - Panel administrativo protegido en `/admin` para gestión interna de contenido.
- **Restricciones Técnicas:**
  - Arquitectura basada en SvelteKit 2, Svelte 5, TypeScript y Vite.
  - Cero dependencias pesadas en el bundle cliente público (aislamiento de Firebase en rutas administrativas).
  - Estricto rendimiento de carga (LCP rápido, WebP optimizado, sin bloqueos multimedia).

## Brand Commitments

- **Nombre:** Foxbyte.
- **Tono y Voz:** Directo, profesional, riguroso, técnico y transparente. Sin clichés de agencia tradicional ni tecnicismos vacíos.
- **Identidad Visual:** Dark Tech Boutique (Obsidian `#070B14`, Midnight Slate, micro-bordes translúcidos, blanco puro para titulares y acentos vibrantes naranja Foxbyte `#FF5A00`).
- **Compromisos:** Protección bajo NDA, respuesta en menos de 24 horas y diagnóstico técnico sin costo ni compromiso.

## Evidence on Hand

- Ecosistema tecnológico de producción (TypeScript, SvelteKit, AWS, Docker, PostgreSQL, Firebase).
- Casos de estudio y proyectos en catálogo con métricas de impacto comercial y arquitectura técnica.
- Canales directos oficiales operativos (WhatsApp corporativo y correo `luismontesg145@gmail.com`).

## Product Principles

1. **Claridad sobre adorno:** Cada elemento de la interfaz debe comunicar competencia técnica real o facilitar la conversión del usuario.
2. **Ingeniería responsable (YAGNI):** Cero dependencias innecesarias, código mínimo y rendimiento nativo óptimo.
3. **Conversión sin fricción:** Ofrecer siempre una ruta directa y rápida hacia el diagnóstico (formulario unificado o WhatsApp con 1 clic).
4. **Respeto a la confidencialidad:** Tratar proyectos empresariales con el estándar corporativo adecuado (soporte explícito para NDA).

## Accessibility & Inclusion

- Estándar WCAG AA/AAA en todos los pares de color (titulares en blanco puro `#FFFFFF` y textos secundarios `#94A3B8` sobre fondos obsidian).
- Componentes accesibles con etiquetas semánticas (`aria-label`, inputs asociados a `<label>`, foco por teclado y `prefers-reduced-motion`).
