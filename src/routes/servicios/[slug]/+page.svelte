<script lang="ts">
  import { isContactModalOpen } from '$lib/contactStore';
  import { fly } from 'svelte/transition';

  export let data: any;
  $: service = data.service;
  $: relatedProjects = data.relatedProjects || [];
</script>

<svelte:head>
  <title>{service.commercialTitle} | Foxbyte</title>
  <meta name="description" content={service.description} />
</svelte:head>

<article class="service-detail-page">
  <div class="glow-bg"></div>

  <div class="container">
    <a href="/servicios" class="back-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
      Volver a Servicios
    </a>

    <header class="service-header">
      <div class="service-icon">
        {#if service.icon_svg}
          {@html service.icon_svg}
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /><path d="M16 5.25l-8 4.5" /></svg>
        {/if}
      </div>
      <h1>{service.commercialTitle}</h1>
      <p class="lead-text">{service.description}</p>
      
      <div class="cta-actions">
        <button class="primary-btn" on:click={() => isContactModalOpen.set(true)}>
          Solicitar diagnóstico
        </button>
        <a href="/proyectos" class="secondary-btn">Ver proyectos</a>
      </div>
    </header>

    <div class="detail-grid">
      <!-- Left Column: Business value -->
      <div class="detail-col">
        <section class="info-section">
          <h2>¿Para quién está diseñado?</h2>
          <ul class="styled-list target-audience">
            {#each service.audience || [] as aud}
              <li>{aud}</li>
            {/each}
          </ul>
        </section>

        <section class="info-section problems-section">
          <h2>¿Qué problemas resolvemos?</h2>
          <ul class="styled-list problems-list">
            {#each service.problems || [] as prob}
              <li>
                <span class="warning-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>
                </span>
                {prob}
              </li>
            {/each}
          </ul>
        </section>
      </div>

      <!-- Right Column: Engineering & Process -->
      <div class="detail-col">
        <section class="info-section">
          <h2>Nuestras capacidades técnicas</h2>
          <ul class="styled-list capabilities-list">
            {#each service.capabilities || [] as cap}
              <li>{cap}</li>
            {/each}
          </ul>
        </section>

        <section class="info-section process-section">
          <h2>Nuestro proceso de trabajo</h2>
          <div class="timeline">
            {#each service.process || [] as step, index}
              <div class="timeline-step">
                <div class="step-num">0{index + 1}</div>
                <div class="step-desc">{step}</div>
              </div>
            {/each}
          </div>
        </section>
      </div>
    </div>

    <!-- Related Projects -->
    {#if relatedProjects.length > 0}
      <section class="related-projects-section">
        <h2>Casos de estudio relacionados</h2>
        <div class="projects-grid">
          {#each relatedProjects as proj}
            <a href="/proyectos/{proj.slug}" class="project-card">
              <div class="project-card-glow"></div>
              {#if proj.image}
                <div class="image-wrapper">
                  <img src={proj.image} alt={proj.title} />
                </div>
              {/if}
              <div class="project-info">
                <h3>{proj.title}</h3>
                <p>{proj.description ? proj.description.substring(0, 120) + '...' : ''}</p>
                <span class="read-more">
                  Ver caso de estudio
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
                </span>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</article>

<style>
  .service-detail-page {
    position: relative;
    background-color: var(--azul-petroleo, #0F172A);
    color: var(--marfil-claro, #F8FAFC);
    padding: 10rem 1.5rem 6rem;
    overflow: hidden;
    min-height: 100vh;
  }

  .glow-bg {
    position: absolute;
    top: -5%;
    right: 5%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 107, 0, 0.06) 0%, rgba(15, 23, 42, 0) 70%);
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
    color: rgba(248, 250, 252, 0.6);
    text-decoration: none;
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 3rem;
    transition: color 0.2s ease;
  }

  .back-link:hover {
    color: var(--terracota-suave, #FF6B00);
  }

  .service-header {
    margin-bottom: 5rem;
    max-width: 800px;
  }

  .service-icon {
    width: 64px;
    height: 64px;
    background: rgba(255, 107, 0, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--terracota-suave, #FF6B00);
    margin-bottom: 2rem;
  }

  h1 {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: white;
    margin-bottom: 1.5rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .lead-text {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    font-size: 1.2rem;
    line-height: 1.7;
    color: rgba(248, 250, 252, 0.75);
    margin-bottom: 2.5rem;
  }

  .cta-actions {
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;
  }

  .primary-btn {
    background-color: var(--terracota-suave, #FF6B00);
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    box-shadow: 0 10px 20px rgba(255, 107, 0, 0.2);
  }

  .primary-btn:hover {
    background-color: var(--ciruela-profunda, #E67E22);
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(255, 107, 0, 0.3);
  }

  .secondary-btn {
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: white;
    text-decoration: none;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.3s ease;
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .secondary-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 4rem;
    margin-bottom: 5rem;
  }

  @media (min-width: 992px) {
    .detail-grid {
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
    }
  }

  .info-section {
    margin-bottom: 3.5rem;
  }

  .info-section h2 {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1.75rem;
    border-left: 3px solid var(--terracota-suave, #FF6B00);
    padding-left: 1rem;
  }

  .styled-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .styled-list li {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    font-size: 1rem;
    color: rgba(248, 250, 252, 0.85);
    line-height: 1.6;
    position: relative;
    padding-left: 2rem;
  }

  /* Target list marker */
  .target-audience li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--terracota-suave, #FF6B00);
    font-weight: 700;
    font-size: 1.1rem;
    top: 0;
  }

  /* Capabilities list marker */
  .capabilities-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--terracota-suave, #FF6B00);
    font-weight: 700;
    font-size: 1.1rem;
    top: -1px;
  }

  /* Problems list layout */
  .problems-list li {
    padding-left: 2.25rem;
  }

  .warning-icon {
    position: absolute;
    left: 0;
    top: 2px;
    color: rgba(248, 113, 113, 0.8);
  }

  /* Timeline process styling */
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .timeline-step {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    background: rgba(255, 255, 255, 0.01);
    border: 1px solid rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    padding: 1.25rem;
    transition: all 0.3s ease;
  }

  .timeline-step:hover {
    border-color: rgba(255, 107, 0, 0.15);
    background: rgba(255, 255, 255, 0.02);
  }

  .step-num {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--terracota-suave, #FF6B00);
  }

  .step-desc {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    color: rgba(248, 250, 252, 0.9);
    line-height: 1.5;
    font-size: 0.98rem;
  }

  /* Related projects section */
  .related-projects-section {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 4rem;
  }

  .related-projects-section h2 {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    margin-bottom: 2.5rem;
    text-align: center;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .project-card {
    position: relative;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    overflow: hidden;
    text-decoration: none;
    color: white;
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;
  }

  .project-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 107, 0, 0.25);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .image-wrapper {
    height: 200px;
    width: 100%;
    overflow: hidden;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .project-card:hover .image-wrapper img {
    transform: scale(1.05);
  }

  .project-info {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .project-info h3 {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .project-info p {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    color: rgba(248, 250, 252, 0.7);
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }

  .read-more {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--terracota-suave, #FF6B00);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
  }

  .read-more svg {
    transition: transform 0.2s ease;
  }

  .project-card:hover .read-more svg {
    transform: translateX(4px);
  }
</style>
