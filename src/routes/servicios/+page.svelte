<script lang="ts">
  import { isContactModalOpen } from '$lib/contactStore';
  import { fade, fly } from 'svelte/transition';

  export let data: any;
  $: services = data.services || [];
</script>

<svelte:head>
  <title>Servicios de Ingeniería de Software | Foxbyte</title>
  <meta name="description" content="Explora los servicios de desarrollo a la medida, e-commerce, aplicaciones móviles y optimización de bases de datos de Foxbyte." />
</svelte:head>

<section class="services-list-page">
  <div class="background-glow"></div>
  
  <div class="container">
    <header class="page-header">
      <span class="sub-title">Nuestras Soluciones</span>
      <h1>Servicios de Ingeniería y <br/><span class="text-highlight">Desarrollo Tecnológico</span></h1>
      <p class="intro-p">
        Diseñamos y forjamos ecosistemas digitales a la medida. Resolvemos cuellos de botella operativos y habilitamos el crecimiento comercial de tu empresa con bases técnicas sólidas.
      </p>
      <button class="primary-cta" on:click={() => isContactModalOpen.set(true)}>
        Solicitar diagnóstico
      </button>
    </header>

    <div class="services-grid">
      {#each services as service, index}
        <article class="service-card" in:fly={{ y: 30, duration: 600, delay: index * 100 }}>
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="service-icon">
              {#if service.icon_svg}
                {@html service.icon_svg}
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /><path d="M16 5.25l-8 4.5" /></svg>
              {/if}
            </div>
            
            <h2>{service.commercialTitle || service.title}</h2>
            <p class="service-desc">{service.description}</p>
            
            <div class="capabilities-summary">
              <h3>Capacidades Clave:</h3>
              <ul>
                {#each (service.capabilities || []).slice(0, 3) as cap}
                  <li>{cap}</li>
                {/each}
              </ul>
            </div>

            <div class="card-actions">
              <a href="/servicios/{service.slug}" class="secondary-cta">
                Ver servicio
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
              </a>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .services-list-page {
    position: relative;
    background-color: var(--azul-petroleo, #0F172A);
    color: var(--marfil-claro, #F8FAFC);
    padding: 10rem 1.5rem 6rem;
    overflow: hidden;
    min-height: 100vh;
  }

  .background-glow {
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 107, 0, 0.08) 0%, rgba(15, 23, 42, 0) 70%);
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

  .sub-title {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--terracota-suave, #FF6B00);
    margin-bottom: 1.25rem;
  }

  h1 {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 900;
    line-height: 1.15;
    color: white;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }

  .text-highlight {
    color: var(--terracota-suave, #FF6B00);
  }

  .intro-p {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    font-size: 1.15rem;
    line-height: 1.7;
    color: rgba(248, 250, 252, 0.7);
    margin-bottom: 2.5rem;
  }

  .primary-cta {
    background-color: var(--terracota-suave, #FF6B00);
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.05rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    box-shadow: 0 10px 20px rgba(255, 107, 0, 0.2);
  }

  .primary-cta:hover {
    background-color: var(--ciruela-profunda, #E67E22);
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(255, 107, 0, 0.3);
  }

  .services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  @media (min-width: 768px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .service-card {
    position: relative;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 3rem 2rem;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .service-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 107, 0, 0.3);
    background: rgba(255, 255, 255, 0.04);
  }

  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top left, rgba(255, 107, 0, 0.05) 0%, rgba(255, 107, 0, 0) 50%);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .service-card:hover .card-glow {
    opacity: 1;
  }

  .card-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .service-icon {
    width: 60px;
    height: 60px;
    background: rgba(255, 107, 0, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--terracota-suave, #FF6B00);
    margin-bottom: 2rem;
  }

  .service-card:hover .service-icon {
    background: var(--terracota-suave, #FF6B00);
    color: white;
    transform: scale(1.05);
    transition: all 0.3s ease;
  }

  h2 {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 1.6rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  .service-desc {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    color: rgba(248, 250, 252, 0.7);
    line-height: 1.6;
    margin-bottom: 2rem;
    flex-grow: 1;
    font-size: 0.98rem;
  }

  .capabilities-summary {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .capabilities-summary h3 {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(248, 250, 252, 0.5);
    margin-bottom: 1rem;
  }

  .capabilities-summary ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .capabilities-summary li {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    font-size: 0.95rem;
    color: rgba(248, 250, 252, 0.9);
    position: relative;
    padding-left: 1.5rem;
  }

  .capabilities-summary li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--terracota-suave, #FF6B00);
  }

  .secondary-cta {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.95rem;
    transition: color 0.2s ease, transform 0.2s ease;
  }

  .secondary-cta svg {
    transition: transform 0.2s ease;
  }

  .secondary-cta:hover {
    color: var(--terracota-suave, #FF6B00);
  }

  .secondary-cta:hover svg {
    transform: translateX(5px);
  }
</style>
