<script lang="ts">
  import { isContactModalOpen } from '$lib/contactStore';
  import { servicesExtendedData } from '$lib/servicesData';

  type Service = {
    id: string;
    slug?: string;
    title?: string;
    commercialTitle?: string;
    description?: string;
    icon_svg?: string;
    sub_services?: string[];
    capabilities?: string[];
    [key: string]: any;
  };

  export let initialServices: Service[] | null = null;

  const fallbackServices: Service[] = Object.entries(servicesExtendedData).map(([slug, detail]) => ({
    ...detail,
    id: slug,
    slug,
    title: detail.commercialTitle,
    icon_svg: ''
  }));

  let services: Service[] = initialServices && initialServices.length > 0 ? initialServices : fallbackServices;
  let loading = false;

  // Reactividad para hidratación SSR instantánea
  $: if (initialServices && initialServices.length > 0) {
    services = initialServices;
  }

  // Metadata visual para enriquecer cada tarjeta del Bento Box
  const bentoMeta: Record<string, { badge: string; accent: string; defaultIcon: string }> = {
    'e-commerce': {
      badge: 'Comercio Digital',
      accent: '#FF6600',
      defaultIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>`
    },
    'aplicaciones-moviles': {
      badge: 'Mobile Engineering',
      accent: '#0EA5E9',
      defaultIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" /><path d="M11 4h2" /><path d="M12 17v.01" /></svg>`
    },
    'bases-de-datos': {
      badge: 'Cloud & High Scale',
      accent: '#10B981',
      defaultIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0" /><path d="M4 6v6a8 3 0 0 0 16 0v-6" /><path d="M4 12v6a8 3 0 0 0 16 0v-6" /></svg>`
    },
    'solucion-a-la-medida': {
      badge: 'Software a Medida',
      accent: '#6366F1',
      defaultIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" /></svg>`
    }
  };

  function getCardMeta(slug: string) {
    return bentoMeta[slug] || {
      badge: 'Solución Digital',
      accent: '#FF6600',
      defaultIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /></svg>`
    };
  }

  function getCardTags(service: Service): string[] {
    if (service.sub_services && service.sub_services.length > 0) {
      return service.sub_services.slice(0, 3);
    }
    if (service.capabilities && service.capabilities.length > 0) {
      return service.capabilities.slice(0, 3).map(c => {
        const clean = c.split('(')[0].trim();
        return clean.length > 28 ? clean.substring(0, 26) + '...' : clean;
      });
    }
    return ['Arquitectura Cloud', 'Alta Disponibilidad', 'SLA Garantizado'];
  }
</script>

<section id="servicios" class="fx-services-section" aria-labelledby="servicios-heading">
  <!-- Ambient background sutil y estático -->
  <div class="fx-ambient-bg" aria-hidden="true"></div>

  <div class="fx-container fx-split-layout">
    
    <!-- Columna Izquierda: Sticky Header de Autoridad -->
    <div class="fx-left-column">
      <header class="fx-section-header">
        <h2 id="servicios-heading" class="fx-title">
          Precisión en cada línea de código,<br />
          estrategia en cada decisión
        </h2>
        
        <p class="fx-subtitle">
          Diseñamos y desarrollamos soluciones tecnológicas de nivel empresarial que eliminan cuellos de botella operativos y escalan con tu volumen de negocio.
        </p>

        <!-- Propuestas de valor clave con checkmarks vectoriales -->
        <ul class="fx-value-props">
          <li class="fx-prop-item">
            <svg class="fx-check-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
            <span>Arquitectura moderna, modular y libre de deuda técnica</span>
          </li>
          <li class="fx-prop-item">
            <svg class="fx-check-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
            <span>Seguridad corporativa, encriptación y alta disponibilidad</span>
          </li>
          <li class="fx-prop-item">
            <svg class="fx-check-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
            <span>Entregas iterativas con código auditable y documentado</span>
          </li>
        </ul>
        
        <div class="fx-cta-wrapper">
          <button 
            type="button" 
            on:click={() => isContactModalOpen.set(true)} 
            class="fx-cta-btn"
            aria-label="Abrir modal para solicitar diagnóstico de proyecto"
          >
            <span>Solicitar diagnóstico técnico</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 7l-10 10" /><path d="M8 7l9 0l0 9" /></svg>
          </button>
        </div>
      </header>
    </div>

    <!-- Columna Derecha: Bento Box Grid 2x2 -->
    <div class="fx-right-column">
      {#if loading}
        <div class="fx-bento-grid" aria-busy="true" aria-label="Cargando servicios">
          {#each Array(4) as _}
            <div class="fx-bento-card fx-skeleton-card">
              <div class="fx-card-top">
                <div class="fx-skeleton-pulse fx-sk-badge"></div>
                <div class="fx-skeleton-pulse fx-sk-icon"></div>
              </div>
              <div class="fx-skeleton-pulse fx-sk-title"></div>
              <div class="fx-skeleton-pulse fx-sk-desc"></div>
              <div class="fx-skeleton-pulse fx-sk-desc" style="width: 75%;"></div>
              <div class="fx-sk-tags">
                <div class="fx-skeleton-pulse fx-sk-tag"></div>
                <div class="fx-skeleton-pulse fx-sk-tag"></div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="fx-bento-grid">
          {#each services as service (service.id || service.slug)}
            {@const meta = getCardMeta(service.slug || '')}
            {@const tags = getCardTags(service)}
            {@const displayTitle = service.title || service.commercialTitle || 'Servicio Digital'}

            <a 
              href="/servicios/{service.slug}" 
              class="fx-bento-card"
              style="--card-accent: {meta.accent};"
              aria-label="Conocer más sobre {displayTitle}"
            >
              <!-- Card Top Header: Badge de especialidad + Icono con relieve -->
              <div class="fx-card-top">
                <span class="fx-badge">
                  {meta.badge}
                </span>

                <div class="fx-icon-box" aria-hidden="true">
                  <div class="fx-icon-inner">
                    {#if service.icon_svg}
                      {@html service.icon_svg}
                    {:else}
                      {@html meta.defaultIcon}
                    {/if}
                  </div>
                </div>
              </div>

              <!-- Titular y Descripción de Alto Impacto -->
              <div class="fx-card-body">
                <h3 class="fx-card-title">{displayTitle}</h3>
                <p class="fx-card-desc">{service.description || ''}</p>
              </div>

              <!-- Tags / Capacidades Técnicas -->
              {#if tags.length > 0}
                <div class="fx-card-tags" aria-label="Tecnologías y capacidades">
                  {#each tags as tag}
                    <span class="fx-tag-pill">{tag}</span>
                  {/each}
                </div>
              {/if}

              <!-- Footer de la tarjeta: Acción interactiva con flecha animada -->
              <div class="fx-card-footer">
                <span class="fx-action-label">Explorar solución</span>
                <span class="fx-arrow-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
                </span>
              </div>

              <!-- Borde interactivo con gradiente en hover -->
              <div class="fx-bento-border" aria-hidden="true"></div>
            </a>
          {/each}
        </div>
      {/if}
    </div>

  </div>
</section>

<style>
  .fx-services-section {
    position: relative;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 6.5rem 1.5rem;
    background-color: var(--color-background, #F8FAFC);
    overflow: hidden;
    font-family: var(--font-body, system-ui, sans-serif);
    scroll-margin-top: 80px;
    border-top: 1px solid var(--color-border, #E2E8F0);
  }

  /* --- Ambient Static Vignette --- */
  .fx-ambient-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(circle at 90% 15%, rgba(255, 102, 0, 0.04) 0%, transparent 60%);
  }

  .fx-container {
    position: relative;
    max-width: 1240px;
    margin: 0 auto;
    z-index: 1;
  }

  /* --- Layout Split (Izquierda Sticky, Derecha Bento) --- */
  .fx-split-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3.5rem;
    align-items: start;
  }

  @media (min-width: 1024px) {
    .fx-services-section {
      padding: 7.5rem 2rem;
    }
    
    .fx-split-layout {
      grid-template-columns: 1fr 1.45fr;
      gap: 4.5rem;
    }
    
    .fx-left-column {
      position: sticky;
      top: 110px;
    }
  }

  /* --- Columna Izquierda: Encabezado y Proposiciones --- */
  .fx-section-header {
    text-align: left;
  }

  .fx-title {
    font-family: var(--font-display, inherit);
    font-size: clamp(2.3rem, 4.2vw, 3.4rem);
    color: var(--color-text-primary, #0F172A);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.035em;
    margin-bottom: 1.25rem;
  }

  .fx-title-accent {
    color: var(--color-primary, #FF6600);
    font-weight: 800;
  }

  .fx-subtitle {
    font-size: 1.05rem;
    color: var(--color-text-secondary, #475569);
    line-height: 1.65;
    margin-bottom: 2rem;
  }

  .fx-value-props {
    list-style: none;
    padding: 0;
    margin: 0 0 2.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .fx-prop-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;
    color: var(--color-text-secondary, #475569);
    font-weight: 500;
  }

  .fx-check-icon {
    flex-shrink: 0;
    color: var(--color-primary, #FF6600);
    background: var(--color-primary-subtle, rgba(255, 102, 0, 0.12));
    border-radius: 50%;
    padding: 2px;
  }

  .fx-cta-wrapper {
    display: flex;
  }

  .fx-cta-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.95rem 2rem;
    background-color: var(--color-primary, #FF6600);
    color: #ffffff;
    font-weight: 700;
    font-size: 0.98rem;
    font-family: var(--font-body, inherit);
    border-radius: var(--radius-full, 100px);
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(255, 102, 0, 0.35);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
  }

  .fx-cta-btn:hover {
    background-color: var(--color-primary-hover, #EA580C);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 102, 0, 0.5);
  }

  .fx-cta-btn:active {
    transform: scale(0.98);
  }

  .fx-cta-btn svg {
    transition: transform 0.25s ease;
  }

  .fx-cta-btn:hover svg {
    transform: translate(2px, -2px);
  }

  /* --- Bento Box Grid (Columna Derecha) --- */
  .fx-bento-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 640px) {
    .fx-bento-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* --- Bento Card White Elevated Container --- */
  .fx-bento-card {
    position: relative;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    background: var(--color-surface, #FFFFFF);
    border-radius: 20px;
    padding: 2rem 1.6rem;
    border: 1px solid var(--color-border, #E2E8F0);
    box-shadow: var(--shadow-sm);
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    z-index: 1;
  }

  .fx-bento-card:hover {
    transform: translateY(-5px);
    background: var(--color-surface);
    box-shadow: var(--shadow-lg), 0 0 24px var(--color-primary-subtle, rgba(255, 102, 0, 0.12));
    border-color: rgba(255, 102, 0, 0.35);
  }

  .fx-bento-card:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
  }

  .fx-bento-border {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    border: 1.5px solid transparent;
    pointer-events: none;
    transition: border-color 0.3s ease;
  }

  .fx-bento-card:hover .fx-bento-border {
    border-color: rgba(255, 102, 0, 0.35);
  }

  /* --- Card Header: Badge & Icon --- */
  .fx-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 1.4rem;
  }

  .fx-badge {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius-full, 100px);
    background: var(--color-background);
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
    transition: all 0.25s ease;
  }

  .fx-bento-card:hover .fx-badge {
    background: var(--color-primary-subtle, rgba(255, 102, 0, 0.12));
    color: var(--color-primary);
    border-color: rgba(255, 102, 0, 0.3);
  }

  .fx-icon-box {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #FFF7ED;
    border: 1px solid #FFEDD5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  :global([data-theme="dark"]) .fx-icon-box {
    background: var(--color-primary-subtle);
    border-color: rgba(255, 107, 26, 0.25);
  }

  .fx-bento-card:hover .fx-icon-box {
    background: var(--card-accent, #FF6600);
    color: #ffffff;
    border-color: transparent;
    transform: rotate(3deg) scale(1.06);
    box-shadow: 0 6px 16px rgba(255, 102, 0, 0.3);
  }

  .fx-icon-inner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fx-icon-inner :global(svg) {
    width: 22px;
    height: 22px;
    stroke: currentColor;
  }

  /* --- Card Body --- */
  .fx-card-body {
    flex-grow: 1;
    margin-bottom: 1.25rem;
  }

  .fx-card-title {
    font-family: var(--font-display, inherit);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary, #0F172A);
    line-height: 1.3;
    letter-spacing: -0.02em;
    margin-bottom: 0.65rem;
    transition: color 0.2s ease;
  }

  .fx-bento-card:hover .fx-card-title {
    color: var(--color-primary, #FF6600);
  }

  .fx-card-desc {
    font-size: 0.92rem;
    color: var(--color-text-secondary, #475569);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* --- Tags / Capabilities --- */
  .fx-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.5rem;
  }

  .fx-tag-pill {
    font-size: 0.73rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    background: var(--color-background);
    padding: 0.28rem 0.6rem;
    border-radius: 6px;
    border: 1px solid var(--color-border);
    transition: all 0.2s ease;
  }

  .fx-bento-card:hover .fx-tag-pill {
    background: var(--color-primary-subtle);
    color: var(--color-primary);
    border-color: rgba(255, 107, 26, 0.25);
  }

  /* --- Footer: Action Link with Arrow --- */
  .fx-card-footer {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--color-text-primary);
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
    margin-top: auto;
    transition: color 0.2s ease;
  }

  .fx-arrow-icon {
    display: inline-flex;
    align-items: center;
    color: var(--color-primary);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .fx-bento-card:hover .fx-card-footer {
    color: var(--color-primary);
  }

  .fx-bento-card:hover .fx-arrow-icon {
    transform: translateX(5px);
  }

  /* --- Skeleton Loading --- */
  .fx-skeleton-card {
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0.05);
    background: rgba(15, 23, 42, 0.6);
  }

  .fx-skeleton-pulse {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%);
    background-size: 200% 100%;
    animation: fx-pulse 1.5s infinite linear;
    border-radius: 6px;
  }

  @keyframes fx-pulse {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .fx-sk-badge {
    width: 80px;
    height: 22px;
    border-radius: 100px;
  }

  .fx-sk-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }

  .fx-sk-title {
    width: 70%;
    height: 24px;
    margin-bottom: 0.75rem;
  }

  .fx-sk-desc {
    width: 100%;
    height: 14px;
    margin-bottom: 0.5rem;
  }

  .fx-sk-tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .fx-sk-tag {
    width: 60px;
    height: 20px;
    border-radius: 6px;
  }
</style>