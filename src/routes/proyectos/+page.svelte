<script lang="ts">
  import { isContactModalOpen } from '$lib/contactStore';
  import { fly } from 'svelte/transition';

  export let data: any;
  $: projects = data.projects;
</script>

<svelte:head>
  <title>Proyectos y Casos de Estudio | Foxbyte</title>
  <meta name="description" content="Descubre los proyectos desarrollados por Foxbyte. Soluciones premium de software, pasarelas de pago y automatización." />
</svelte:head>

<section class="projects-list-page">
  <div class="glow-layer"></div>

  <div class="container">
    <header class="page-header">
      <h1>Proyectos y <br/><span class="text-highlight">Casos de Éxito</span></h1>
      <p class="intro-text">
        Ingeniería robusta aplicada a necesidades comerciales. Conoce cómo ayudamos a las empresas a simplificar procesos, automatizar tareas y optimizar sus ingresos mediante productos de software premium.
      </p>
      <button class="primary-cta" on:click={() => isContactModalOpen.set(true)}>
        Solicitar diagnóstico
      </button>
    </header>

    {#if projects === null}
      <div class="status-msg error">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>
        <p>Hubo un problema al cargar los proyectos. Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    {:else if projects.length === 0}
      <div class="status-msg empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /></svg>
        <p>No se encontraron proyectos disponibles en este momento.</p>
      </div>
    {:else}
      <div class="projects-grid">
        {#each projects as project, index}
          <article class="project-card" in:fly={{ y: 30, duration: 600, delay: index * 100 }}>
            <div class="card-glow"></div>
            {#if project.image}
              <div class="image-container">
                <img src={project.image} alt={project.title} />
              </div>
            {/if}

            <div class="card-content">
              <span class="project-category">{project.category || 'Desarrollo de Software'}</span>
              <h2>{project.title}</h2>
              <p class="project-description">
                {project.description ? project.description.substring(0, 160) + '...' : 'E-commerce híbrido y plataforma interactiva autogestionable.'}
              </p>

              {#if project.stack && project.stack.length > 0}
                <div class="tech-stack">
                  {#each project.stack as tech}
                    <span class="tech-tag">{tech}</span>
                  {/each}
                </div>
              {/if}

              {#if project.kpis && project.kpis.length > 0}
                <div class="project-kpis">
                  {#each project.kpis as kpi}
                    <div class="kpi-item">
                      <span class="kpi-val">{kpi}</span>
                    </div>
                  {/each}
                </div>
              {/if}

              <div class="card-actions">
                <a href="/proyectos/{project.slug}" class="view-project-link">
                  Ver caso de estudio
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
                </a>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .projects-list-page {
    position: relative;
    background-color: var(--color-background, #F8FAFC);
    color: var(--color-text-primary, #0F172A);
    padding: 10rem 1.5rem 6rem;
    overflow: hidden;
    min-height: 100vh;
  }

  .glow-layer {
    position: absolute;
    top: -15%;
    left: 20%;
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

  .page-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: clamp(2.4rem, 5.2vw, 4rem);
    font-weight: 900;
    line-height: 1.12;
    color: var(--color-text-primary, #0F172A);
    margin-bottom: 1.5rem;
    letter-spacing: -0.035em;
  }

  .text-highlight {
    color: var(--color-primary, #FF6600);
  }

  .intro-text {
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: 1.15rem;
    line-height: 1.7;
    color: var(--color-text-secondary, #475569);
    margin-bottom: 2.5rem;
  }

  .primary-cta {
    background-color: var(--color-primary, #FF6600);
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.05rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--font-body, 'Inter', sans-serif);
    box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3);
  }

  .primary-cta:hover {
    background-color: var(--color-primary-hover, #EA580C);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 102, 0, 0.45);
  }

  .status-msg {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--color-surface, #FFFFFF);
    border: 1px dashed var(--color-border, #CBD5E1);
    border-radius: 20px;
    max-width: 600px;
    margin: 0 auto;
    color: var(--color-text-muted, #64748B);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    box-shadow: var(--shadow-sm);
  }

  .status-msg svg {
    color: var(--color-primary, #FF6600);
  }

  .status-msg.error svg {
    color: rgba(239, 68, 68, 0.8);
  }

  .status-msg p {
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: 1.05rem;
    margin: 0;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (min-width: 768px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .project-card {
    position: relative;
    background: var(--color-surface, #FFFFFF);
    border: 1px solid var(--color-border, #E2E8F0);
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    height: 100%;
    box-shadow: var(--shadow-sm);
  }

  .project-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 102, 0, 0.35);
    background: var(--color-surface, #FFFFFF);
    box-shadow: var(--shadow-lg), 0 0 24px rgba(255, 102, 0, 0.1);
  }

  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(255, 102, 0, 0.05) 0%, transparent 50%);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .project-card:hover .card-glow {
    opacity: 1;
  }

  .image-container {
    height: 250px;
    width: 100%;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid var(--color-border, #E2E8F0);
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .project-card:hover .image-container img {
    transform: scale(1.05);
  }

  .card-content {
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    z-index: 1;
  }

  .project-category {
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-primary, #FF6600);
    margin-bottom: 0.75rem;
  }

  h2 {
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-text-primary, #0F172A);
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  .project-description {
    font-family: var(--font-body, 'Inter', sans-serif);
    color: var(--color-text-secondary, #475569);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
    flex-grow: 1;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .tech-tag {
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: 0.8rem;
    background: var(--color-background, #F8FAFC);
    border: 1px solid var(--color-border, #E2E8F0);
    color: var(--color-text-secondary, #475569);
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-weight: 600;
  }

  .project-kpis {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2rem;
    border-top: 1px solid var(--color-border, #E2E8F0);
    padding-top: 1.25rem;
  }

  .kpi-item {
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 0.85rem;
    font-weight: 700;
    background: #FFF7ED;
    border: 1px solid #FFEDD5;
    color: var(--color-primary, #FF6600);
    padding: 0.4rem 1rem;
    border-radius: 8px;
  }

  .view-project-link {
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text-primary, #0F172A);
    text-decoration: none;
    font-weight: 700;
    font-size: 0.95rem;
    transition: color 0.2s ease;
    margin-top: auto;
  }

  .view-project-link svg {
    color: var(--color-primary, #FF6600);
    transition: transform 0.2s ease;
  }

  .view-project-link:hover {
    color: var(--color-primary, #FF6600);
  }

  .view-project-link:hover svg {
    transform: translateX(5px);
  }
</style>
