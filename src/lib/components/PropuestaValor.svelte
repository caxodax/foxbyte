<script lang="ts">
  import { isContactModalOpen } from "$lib/contactStore";

  const comparison = [
    {
      topic: "Interlocución y Equipo",
      traditional: "Comerciales y gestores de cuenta sin experiencia técnica que triangulan cada duda.",
      foxbyte: "Trato directo con ingenieros senior que diseñan y escriben tu código desde el primer día."
    },
    {
      topic: "Propiedad del Código",
      traditional: "Bloqueo de proveedor (vendor lock-in), plataformas rígidas o licencias restrictivas.",
      foxbyte: "100% código propietario transferido a tu organización, documentado y listo para auditar."
    },
    {
      topic: "Tiempo a Producción",
      traditional: "Semanas de burocracia para una cotización y meses antes de ver una pantalla operativa.",
      foxbyte: "Prototipo funcional en días y despliegues iterativos con demostraciones continuas."
    },
    {
      topic: "Arquitectura y Calidad",
      traditional: "Plantillas genéricas sobrecargadas que acumulan deuda técnica y colapsan con el volumen.",
      foxbyte: "Arquitectura moderna en la nube, escalable, optimizada para alta concurrencia y seguridad."
    }
  ];
</script>

<section id="propuesta-valor" class="fx-comparison-section" aria-labelledby="vp-title">
  <div class="container">
    <header class="section-header">
      <div class="badge-pill">
        <span>Modelo de Trabajo</span>
      </div>
      <h2 id="vp-title" class="section-title">
        El estándar Foxbyte frente al desarrollo tradicional
      </h2>
      <p class="section-subtitle">
        Diseñamos software e inteligencia artificial con rigor de ingeniería, sin intermediarios ni jerarquías artificiales que retrasen tu negocio.
      </p>
    </header>

    <!-- Comparison Matrix -->
    <div class="comparison-container">
      <div class="matrix-header">
        <div class="col-topic">Dimensión</div>
        <div class="col-traditional">Agencias y Fábricas Tradicionales</div>
        <div class="col-foxbyte">
          <span>Foxbyte Engineering Boutique</span>
          <span class="foxbyte-badge">Recomendado</span>
        </div>
      </div>

      <div class="matrix-body">
        {#each comparison as item}
          <div class="matrix-row">
            <div class="col-topic">
              <span class="topic-label">{item.topic}</span>
            </div>
            
            <div class="col-traditional">
              <div class="mobile-col-tag">Desarrollo Tradicional</div>
              <div class="point-content">
                <svg class="icon-cross" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <p>{item.traditional}</p>
              </div>
            </div>

            <div class="col-foxbyte">
              <div class="mobile-col-tag foxbyte">Foxbyte Boutique</div>
              <div class="point-content">
                <svg class="icon-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <p>{item.foxbyte}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Guarantees & Call to Action -->
    <div class="footer-block">
      <div class="guarantees-list">
        <div class="guarantee-item">
          <span class="guarantee-icon">🔒</span>
          <span>Acuerdo de Confidencialidad (NDA) antes de cualquier intercambio técnico</span>
        </div>
        <div class="guarantee-item">
          <span class="guarantee-icon">⚡</span>
          <span>Arquitectura en la nube sin costo oculto de infraestructura</span>
        </div>
        <div class="guarantee-item">
          <span class="guarantee-icon">📦</span>
          <span>Repositorio Git entregado con documentación completa</span>
        </div>
      </div>

      <div class="cta-actions">
        <button 
          type="button" 
          on:click={() => isContactModalOpen.set(true)} 
          class="btn-primary"
        >
          <span>Solicitar diagnóstico técnico</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <a href="/#portafolio" class="btn-secondary">
          <span>Explorar proyectos</span>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .fx-comparison-section {
    position: relative;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 7rem 1.5rem;
    background-color: #070B14;
    color: #F8FAFC;
    overflow: hidden;
    scroll-margin-top: 80px;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }

  .container {
    max-width: 1140px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  /* Header */
  .section-header {
    text-align: center;
    max-width: 760px;
    margin: 0 auto 4rem auto;
  }

  .badge-pill {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.95rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 1.25rem;
  }

  .section-title {
    font-size: clamp(2.1rem, 4.2vw, 3.25rem);
    font-weight: 800;
    line-height: 1.15;
    color: #FFFFFF;
    margin: 0 0 1.25rem 0;
    letter-spacing: -0.035em;
    text-wrap: balance;
  }

  .section-subtitle {
    font-size: 1.05rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    font-weight: 400;
    text-wrap: pretty;
  }

  /* Matrix Layout */
  .comparison-container {
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    overflow: hidden;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
    margin-bottom: 3.5rem;
  }

  .matrix-header {
    display: grid;
    grid-template-columns: 220px 1fr 1fr;
    background: rgba(255, 255, 255, 0.03);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.88rem;
    font-weight: 700;
  }

  .matrix-header > div {
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .col-topic {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
    font-size: 0.82rem;
  }

  .col-traditional {
    color: rgba(255, 255, 255, 0.65);
    border-right: 1px solid rgba(255, 255, 255, 0.06);
  }

  .col-foxbyte {
    background: rgba(255, 90, 0, 0.06);
    color: #FFFFFF;
  }

  .foxbyte-badge {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.2rem 0.55rem;
    background: var(--color-primary, #FF5A00);
    color: #FFFFFF;
    border-radius: 9999px;
  }

  /* Matrix Body */
  .matrix-row {
    display: grid;
    grid-template-columns: 220px 1fr 1fr;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.2s ease;
  }

  .matrix-row:last-child {
    border-bottom: none;
  }

  .matrix-row:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .matrix-row > div {
    padding: 1.5rem;
  }

  .topic-label {
    font-weight: 700;
    color: #FFFFFF;
    font-size: 0.95rem;
    letter-spacing: -0.01em;
  }

  .point-content {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
  }

  .point-content p {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.55;
  }

  .col-traditional .point-content p {
    color: rgba(255, 255, 255, 0.6);
  }

  .col-foxbyte .point-content p {
    color: rgba(255, 255, 255, 0.92);
    font-weight: 450;
  }

  .col-traditional {
    border-right: 1px solid rgba(255, 255, 255, 0.06);
  }

  .col-foxbyte {
    background: rgba(255, 90, 0, 0.03);
  }

  .icon-cross {
    color: rgba(239, 68, 68, 0.7);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .icon-check {
    color: var(--color-primary, #FF5A00);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .mobile-col-tag {
    display: none;
  }

  /* Footer & Guarantees */
  .footer-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
  }

  .guarantees-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    width: 100%;
  }

  .guarantee-item {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.75);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    padding: 0.5rem 1rem;
    border-radius: 9999px;
  }

  .guarantee-icon {
    font-size: 0.95rem;
  }

  /* CTAs */
  .cta-actions {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    padding: 0.95rem 2.2rem;
    border-radius: 9999px;
    background-color: var(--color-primary, #FF5A00);
    color: #FFFFFF;
    font-weight: 600;
    font-size: 0.95rem;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(255, 90, 0, 0.35);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: inherit;
  }

  .btn-primary:hover {
    background-color: var(--color-primary-hover, #E04E00);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255, 90, 0, 0.5);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.95rem 2.2rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #FFFFFF;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    transition: all 0.25s ease;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  /* Mobile Responsive */
  @media (max-width: 860px) {
    .matrix-header {
      display: none;
    }

    .matrix-row {
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      gap: 1.25rem;
    }

    .matrix-row > div {
      padding: 0;
      border: none;
    }

    .col-topic {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 0.75rem !important;
    }

    .mobile-col-tag {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.45);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.4rem;
    }

    .mobile-col-tag.foxbyte {
      color: var(--color-primary, #FF5A00);
    }

    .col-foxbyte {
      background: rgba(255, 90, 0, 0.04);
      padding: 1rem !important;
      border-radius: 12px;
      border: 1px solid rgba(255, 90, 0, 0.15);
    }

    .guarantees-list {
      flex-direction: column;
      align-items: flex-start;
    }

    .guarantee-item {
      width: 100%;
      box-sizing: border-box;
      border-radius: 12px;
    }

    .cta-actions {
      flex-direction: column;
      width: 100%;
    }

    .btn-primary, .btn-secondary {
      width: 100%;
    }
  }
</style>
