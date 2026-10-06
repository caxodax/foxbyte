<script lang="ts">
  import { isContactModalOpen } from '$lib/contactStore';
  import { fly } from 'svelte/transition';

  export let data: any;
  $: project = data.project;
</script>

<svelte:head>
  <title>{project.title} | Caso de Estudio Foxbyte</title>
  <meta name="description" content={project.description || 'Caso de éxito en desarrollo de software por Foxbyte.'} />
</svelte:head>

<article class="project-detail-page">
  <div class="glow-effect"></div>

  <div class="container">
    <a href="/#portafolio" class="back-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
      Volver a Proyectos
    </a>

    <header class="project-header">
      <span class="project-tag">{project.category || 'Caso de Estudio'}</span>
      <h1>{project.title}</h1>
      <p class="summary-desc">{project.description || 'E-commerce premium interactivo con academia digital autogestionable y descargas seguras.'}</p>
      {#if project.client}
        <div class="client-badge">Cliente: {project.client}</div>
      {/if}
    </header>

    {#if project.image}
      <div class="hero-image-wrapper">
        <img src={project.image} alt={project.title} />
      </div>
    {/if}

    <div class="content-grid">
      <!-- Challenge & Solution columns -->
      <div class="text-sections">
        <section class="story-section challenge">
          <h2>El Reto</h2>
          <p>{project.reto || project.description || 'Integrar en una sola plataforma la comercialización de cursos interactivos (infoproductos descargables) y productos físicos con un flujo de distribución robusto.'}</p>
        </section>

        <section class="story-section solution">
          <h2>La Solución</h2>
          <p>{project.solucion || 'Desarrollo de un E-commerce híbrido modular con procesamiento en el servidor, pasarelas de pago cifradas, y descarga automatizada de documentos en la zona privada del cliente.'}</p>
        </section>
      </div>

      <!-- Tech stack & metrics column -->
      <div class="sidebar-section">
        {#if project.kpis && project.kpis.length > 0}
          <div class="kpis-box">
            <h3>Impacto Generado</h3>
            <div class="kpi-grid">
              {#each project.kpis as kpi}
                {@const kpiStr = typeof kpi === 'string' ? kpi : (kpi ? `${kpi.value ?? kpi.val ?? ''} ${kpi.label ?? kpi.name ?? ''}`.trim() : '')}
                {@const kpiValue = kpiStr.includes(' ') ? kpiStr.split(' ')[0] : kpiStr}
                {@const kpiLabel = kpiStr.includes(' ') ? kpiStr.substring(kpiStr.indexOf(' ') + 1) : ''}
                <div class="kpi-card">
                  <span class="kpi-value">{kpiValue}</span>
                  <span class="kpi-label">{kpiLabel}</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        {#if project.stack && project.stack.length > 0}
          <div class="tech-box">
            <h3>Tecnologías Utilizadas</h3>
            <div class="stack-tags">
              {#each project.stack as tech}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>
          </div>
        {/if}

        <div class="action-box">
          <h3>¿Listo para forjar tu proyecto?</h3>
          <p>Hablemos sobre tus necesidades y encontremos la mejor solución tecnológica para tu negocio.</p>
          <button class="cta-btn" on:click={() => isContactModalOpen.set(true)}>
            Solicitar diagnóstico
          </button>
        </div>
      </div>
    </div>
  </div>
</article>

<style>
  .project-detail-page {
    position: relative;
    background-color: var(--color-background, #F8FAFC);
    color: var(--color-text-primary, #0F172A);
    padding: 10rem 1.5rem 6rem;
    overflow: hidden;
    min-height: 100vh;
  }

  .glow-effect {
    position: absolute;
    top: -5%;
    left: 10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 102, 0, 0.05) 0%, transparent 70%);
    z-index: 0;
    pointer-events: none;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text-secondary, #475569);
    text-decoration: none;
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 3rem;
    transition: color 0.2s ease;
  }

  .back-link:hover {
    color: var(--color-primary, #FF6600);
  }

  .project-header {
    margin-bottom: 3.5rem;
    max-width: 800px;
  }

  .project-tag {
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--color-primary, #FF6600);
    margin-bottom: 1rem;
    display: inline-block;
  }

  h1 {
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: var(--color-text-primary, #0F172A);
    margin-bottom: 1.5rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .summary-desc {
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: 1.25rem;
    line-height: 1.7;
    color: var(--color-text-secondary, #475569);
  }

  .hero-image-wrapper {
    width: 100%;
    height: 350px;
    border-radius: 24px;
    overflow: hidden;
    margin-bottom: 4rem;
    border: 1px solid var(--color-border, #E2E8F0);
    box-shadow: var(--shadow-sm);
  }

  @media (min-width: 768px) {
    .hero-image-wrapper {
      height: 500px;
    }
  }

  .hero-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  @media (min-width: 992px) {
    .content-grid {
      grid-template-columns: 1.6fr 1fr;
      gap: 5rem;
    }
  }

  .text-sections {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
  }

  .story-section h2 {
    font-family: var(--font-display, inherit);
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-text-primary, #0F172A);
    margin-bottom: 1.25rem;
    letter-spacing: -0.02em;
  }

  .story-section p {
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--color-text-secondary, #475569);
    margin: 0;
  }

  .sidebar-section {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .kpis-box, .tech-box, .action-box {
    background: #FFFFFF;
    border: 1px solid var(--color-border, #E2E8F0);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--shadow-sm);
  }

  .kpis-box h3, .tech-box h3, .action-box h3 {
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text-primary, #0F172A);
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 480px) {
    .kpi-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .kpi-card {
    background: #FFF7ED;
    border: 1px solid #FFEDD5;
    padding: 1.25rem;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .kpi-value {
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 2rem;
    font-weight: 900;
    color: var(--color-primary, #FF6600);
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .kpi-label {
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: 0.85rem;
    color: var(--color-text-secondary, #475569);
    line-height: 1.4;
  }

  .stack-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-tag {
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: 0.85rem;
    background: #F8FAFC;
    border: 1px solid var(--color-border, #E2E8F0);
    color: var(--color-text-secondary, #475569);
    padding: 0.35rem 0.85rem;
    border-radius: 50px;
    font-weight: 600;
  }

  .action-box p {
    font-family: var(--font-body, 'Inter', sans-serif);
    color: var(--color-text-secondary, #475569);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }

  .cta-btn {
    background-color: var(--color-primary, #FF6600);
    color: white;
    border: none;
    padding: 0.9rem 1.8rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--font-body, 'Inter', sans-serif);
    width: 100%;
    text-align: center;
    box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3);
  }

  .cta-btn:hover {
    background-color: var(--color-primary-hover, #EA580C);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 102, 0, 0.45);
  }
</style>
