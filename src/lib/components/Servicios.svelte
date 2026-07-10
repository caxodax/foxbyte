<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { db } from '$lib/firebase';
  import { collection, getDocs } from 'firebase/firestore';

  type Service = {
    id: string;
    title?: string;
    description?: string;
    icon_svg?: string;
    sub_services?: string[];
    [key: string]: any;
  };
  let services: Service[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      services = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error cargando servicios:", error);
    } finally {
      loading = false;
    }
  });
</script>

<section id="servicios" class="fx-services-section">
  <!-- Mesh Gradient Background -->
  <div class="fx-mesh-bg" aria-hidden="true">
    <div class="fx-blob fx-blob-1"></div>
    <div class="fx-blob fx-blob-2"></div>
  </div>

  <div class="fx-container fx-split-layout">
    
    <!-- Columna Izquierda: Sticky Header -->
    <div class="fx-left-column">
      <header class="fx-section-header">
        <h2 class="fx-title">Precisión en cada línea de código,<br/> estrategia en cada decisión.</h2>
        <!-- Una pequeña línea descriptiva para complementar el diseño asimétrico sin recargarlo -->
        <p class="fx-subtitle">Transformamos ideas complejas en productos digitales escalables y de alto rendimiento.</p>
        
        <div class="fx-cta-wrapper">
          <a href="#contacto" class="fx-cta-btn">
            Inicia tu evolución digital
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 7l-10 10" /><path d="M8 7l9 0l0 9" /></svg>
          </a>
        </div>
      </header>
    </div>

    <!-- Columna Derecha: El "Widget" de Servicios -->
    <div class="fx-right-column">
      {#if loading}
        <div class="fx-services-grid">
          {#each Array(4) as _}
            <article class="fx-service-card fx-skeleton-card">
              <div class="fx-card-inner">
                <div class="fx-card-header-inline">
                  <div class="fx-icon-container fx-skeleton-pulse"></div>
                  <div class="fx-skeleton-text fx-skeleton-title fx-skeleton-pulse"></div>
                </div>
                <div class="fx-skeleton-text fx-skeleton-desc fx-skeleton-pulse" style="width: 100%"></div>
                <div class="fx-skeleton-text fx-skeleton-desc fx-skeleton-pulse" style="width: 85%"></div>
                <div class="fx-skeleton-text fx-skeleton-desc fx-skeleton-pulse" style="width: 60%"></div>
              </div>
            </article>
          {/each}
        </div>
      {:else if services.length === 0}
        <div class="fx-loading-state">
          <p>No hay servicios disponibles en este momento.</p>
        </div>
      {:else}
        <div class="fx-services-grid">
          {#each services as service, index (service.id)}
            <article class="fx-service-card" in:fly={{ y: 40, duration: 800, delay: 100 + (index * 150) }}>
              <div class="fx-card-inner">
                
                <!-- Cabecera de la tarjeta con icono y título en la misma línea -->
                <div class="fx-card-header-inline">
                  <div class="fx-icon-container">
                    <div class="fx-icon-gradient-bg"></div>
                    <div class="fx-icon-svg">
                      {#if service.icon_svg}
                        {@html service.icon_svg}
                      {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 4h-4v16h4" /><path d="M17 4h4v16h-4" /><path d="M8 16h.01" /><path d="M12 16h.01" /><path d="M16 16h.01" /></svg>
                      {/if}
                    </div>
                  </div>
                  <h3 class="fx-card-title">{service.title}</h3>
                </div>
                
                <p class="fx-card-desc">{service.description}</p>
                
                {#if service.sub_services && service.sub_services.length > 0}
                  <div class="fx-tags">
                    {#each service.sub_services as subService}
                      <span class="fx-tag">{subService}</span>
                    {/each}
                  </div>
                {/if}
              </div>
              <div class="fx-card-border"></div>
            </article>
          {/each}
        </div>
      {/if}
    </div>

  </div>
</section>

<style>
  .fx-services-section {
    position: relative;
    padding: 6rem 1.5rem;
    background-color: #fafbfc;
    overflow: hidden;
    font-family: var(--font-secundaria);
  }

  /* --- Premium Mesh/Blob Background --- */
  .fx-mesh-bg {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
  }
  .fx-blob {
    position: absolute;
    filter: blur(80px);
    opacity: 0.4;
    border-radius: 50%;
    animation: float 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
  }
  .fx-blob-1 {
    width: 40vw; height: 40vw;
    background: radial-gradient(circle, rgba(230,126,34,0.15) 0%, rgba(230,126,34,0) 70%);
    top: -10%; left: -10%;
  }
  .fx-blob-2 {
    width: 35vw; height: 35vw;
    background: radial-gradient(circle, rgba(142,68,173,0.08) 0%, rgba(142,68,173,0) 70%);
    bottom: 10%; right: -5%;
    animation-delay: -10s;
  }
  @keyframes float {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(5%, 10%) scale(1.1); }
  }

  .fx-container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
  }

  /* --- Split Layout (2 Columnas) --- */
  .fx-split-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: start;
  }

  .fx-section-header {
    text-align: left; /* Alineado a la izquierda para el diseño dividido */
  }

  @media (min-width: 1024px) {
    .fx-services-section { padding: 8rem 2rem; }
    
    .fx-split-layout {
      grid-template-columns: 1fr 1.4fr; /* Izquierda toma menos espacio, derecha más */
      gap: 5rem;
    }
    
    .fx-left-column {
      position: sticky;
      top: 140px; /* Se queda fijo mientras el scroll baja por la derecha */
    }
  }

  /* --- Header --- */

  .fx-title {
    font-family: var(--font-principal);
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    color: var(--azul-petroleo);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
  }
  
  .fx-subtitle {
    font-size: 1.1rem;
    color: var(--gris-grafito);
    line-height: 1.6;
    opacity: 0.85;
  }

  /* --- CTA Button Premium --- */
  .fx-cta-wrapper {
    margin-top: 3.5rem;
    display: flex;
    justify-content: center; /* Centrar el botón */
  }
  
  .fx-cta-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 1rem 2.2rem;
    background: linear-gradient(135deg, var(--ciruela-profunda), var(--terracota-suave));
    color: white;
    font-weight: 800;
    font-size: 1.05rem;
    border-radius: 100px;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 25px -5px rgba(230, 126, 34, 0.4);
    overflow: hidden;
    z-index: 1;
  }

  /* Efecto de brillo de destello al pasar el ratón */
  .fx-cta-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    transition: all 0.6s ease;
    z-index: -1;
  }
  
  .fx-cta-btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 35px -5px rgba(142, 68, 173, 0.5);
  }

  .fx-cta-btn:hover::before {
    left: 100%;
  }
  
  .fx-cta-btn :global(svg) {
    transition: transform 0.3s ease;
  }
  
  .fx-cta-btn:hover :global(svg) {
    transform: translate(2px, -2px);
  }

  /* --- Grid Derechos (Widget) --- */
  .fx-services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .fx-services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* --- Cards Ultra Premium (Widget Style) --- */
  .fx-service-card {
    position: relative;
    border-radius: 20px;
    padding: 1px;
    background: transparent;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1;
  }

  .fx-service-card:hover {
    transform: translateY(-4px);
    z-index: 2;
  }

  .fx-card-inner {
    position: relative;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 19px;
    padding: 2rem 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.02), 
      0 10px 15px -3px rgba(0, 0, 0, 0.03),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.04);
    transition: all 0.4s ease;
  }

  .fx-service-card:hover .fx-card-inner {
    background: #ffffff;
    box-shadow: 
      0 15px 35px -10px rgba(44, 62, 80, 0.08),
      0 10px 20px -5px rgba(230, 126, 34, 0.04),
      inset 0 0 0 1px rgba(255, 255, 255, 1);
  }

  .fx-card-border {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(230, 126, 34, 0.6), rgba(142, 68, 173, 0.4));
    opacity: 0;
    z-index: -1;
    transition: opacity 0.4s ease;
  }
  .fx-service-card:hover .fx-card-border { opacity: 1; }

  /* Nuevo Layout: Icono y Titulo en la misma linea */
  .fx-card-header-inline {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .fx-icon-container {
    position: relative;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fx-icon-gradient-bg {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--marfil-claro), #ffffff);
    box-shadow: -2px -2px 5px rgba(255,255,255,1), 2px 2px 5px rgba(0,0,0,0.03), inset 1px 1px 1px rgba(255,255,255,0.8);
    border: 1px solid rgba(0,0,0,0.02);
    transition: all 0.4s ease;
    transform: rotate(-5deg);
  }

  .fx-service-card:hover .fx-icon-gradient-bg {
    transform: rotate(0deg) scale(1.05);
    background: linear-gradient(135deg, var(--terracota-suave), #f39c12);
    box-shadow: 0 4px 12px rgba(230, 126, 34, 0.25);
  }

  .fx-icon-svg {
    position: relative;
    z-index: 1;
    color: var(--terracota-suave);
    transition: all 0.4s ease;
  }

  .fx-icon-svg :global(svg) {
    width: 24px;
    height: 24px;
    stroke: currentColor;
    stroke-width: 1.5;
  }

  .fx-service-card:hover .fx-icon-svg {
    color: #ffffff;
  }

  .fx-card-title {
    font-family: var(--font-principal);
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--azul-petroleo);
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .fx-card-desc {
    font-size: 0.9rem;
    color: var(--gris-grafito);
    line-height: 1.5;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }

  .fx-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    width: 100%;
  }

  .fx-tag {
    font-size: 0.7rem;
    font-weight: 600;
    color: #5c6c7d;
    background: rgba(0, 0, 0, 0.03);
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .fx-service-card:hover .fx-tag {
    background: rgba(230, 126, 34, 0.06);
    color: var(--terracota-suave);
  }

  /* --- Skeleton Loading --- */
  .fx-skeleton-card { pointer-events: none; border-color: transparent !important; }
  .fx-skeleton-pulse {
    background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
    background-size: 200% 100%;
    animation: fx-pulse 1.5s infinite linear;
    border-radius: 8px;
  }
  @keyframes fx-pulse {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .fx-icon-container.fx-skeleton-pulse { border-radius: 12px; background-color: #f1f5f9; box-shadow: none; border: none; }
  .fx-skeleton-title { height: 24px; width: 60%; margin-left: 0; }
  .fx-skeleton-desc { height: 14px; margin-bottom: 12px; }

</style>