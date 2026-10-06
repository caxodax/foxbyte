<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { isContactModalOpen } from '$lib/contactStore';
  import { slugify } from '$lib/firestoreRest';

  export let initialPortfolioItems: any[] | null = null;

  type Project = {
    id: string;
    slug?: string;
    title?: string;
    category?: string;
    description?: string;
    image?: string;
    image_url?: string;
    stack?: string[];
    kpis?: any[];
    isPrivate?: boolean;
    is_private?: boolean;
    confidential?: boolean;
    [key: string]: any;
  };

  let portfolioItems: Project[] = initialPortfolioItems ? normalizeProjects(initialPortfolioItems) : [];
  let loading = false;
  let selectedCategory = 'all';

  // Modal ejecutivo de proyectos bajo NDA
  let selectedNdaProject: Project | null = null;

  function normalizeProjects(items: any[]): Project[] {
    return items.map(item => {
      const slug = item.slug || slugify(item.title || item.id || '');
      const isPrivate = Boolean(
        item.isPrivate ||
        item.is_private ||
        item.confidential ||
        item.category?.toLowerCase().includes('nda') ||
        item.category?.toLowerCase().includes('confidencial')
      );
      return {
        ...item,
        slug,
        isPrivate
      };
    });
  }

  // Reactividad instantánea para SSR e hidratación
  $: if (initialPortfolioItems && initialPortfolioItems.length > 0) {
    portfolioItems = normalizeProjects(initialPortfolioItems);
    loading = false;
  }

  // Lista de categorías únicas para los chips de filtro
  $: categories = [
    'all',
    ...Array.from(new Set(portfolioItems.map(p => p.category).filter(Boolean))) as string[]
  ];

  // Proyectos filtrados reactivamente
  $: filteredProjects = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(p => p.category === selectedCategory);

  function openNdaModal(project: Project) {
    selectedNdaProject = project;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  function closeNdaModal() {
    selectedNdaProject = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && selectedNdaProject) {
      closeNdaModal();
    }
  }

  function requestNdaAccess(project: Project) {
    closeNdaModal();
    isContactModalOpen.set(true);
  }

  function parseKpiText(kpi: any): { val: string; lbl: string } {
    if (!kpi) return { val: '', lbl: '' };
    if (typeof kpi === 'string') {
      const parts = kpi.split(' ');
      return {
        val: parts[0] || '',
        lbl: parts.slice(1).join(' ') || ''
      };
    }
    return {
      val: kpi.value || kpi.val || '',
      lbl: kpi.label || kpi.name || ''
    };
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<section id="portafolio" class="fx-portfolio-section" aria-labelledby="portfolio-title">
  <!-- Ambient background sutil y estático -->
  <div class="fx-ambient-mesh" aria-hidden="true"></div>

  <div class="fx-container">
    <!-- Encabezado de la sección -->
    <header class="fx-portfolio-header">
      <h2 id="portfolio-title" class="fx-title">
        Ingeniería aplicada que convierte visión en tracción comercial
      </h2>

      <p class="fx-subtitle">
        Diseñamos plataformas web de alto rendimiento, tiendas e-commerce escalables y software empresarial a la medida. Conoce cómo resolvemos desafíos reales de negocio.
      </p>

      <!-- Chips de Filtrado por Categoría -->
      {#if categories.length > 2}
        <div class="fx-filter-chips" role="tablist" aria-label="Filtrar proyectos por categoría">
          {#each categories as category}
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              class="fx-chip"
              class:active={selectedCategory === category}
              on:click={() => selectedCategory = category}
            >
              {#if category === 'all'}
                Todos los proyectos
              {:else}
                {category}
              {/if}
            </button>
          {/each}
        </div>
      {/if}
    </header>

    <!-- Estado de Carga -->
    {#if loading}
      <div class="fx-showcase-grid" aria-busy="true" aria-label="Cargando proyectos">
        {#each Array(3) as _}
          <div class="fx-project-card fx-skeleton-card">
            <div class="fx-skeleton-media fx-skeleton-pulse"></div>
            <div class="fx-card-content">
              <div class="fx-skeleton-badge fx-skeleton-pulse"></div>
              <div class="fx-skeleton-title fx-skeleton-pulse"></div>
              <div class="fx-skeleton-desc fx-skeleton-pulse"></div>
              <div class="fx-skeleton-tags fx-skeleton-pulse"></div>
            </div>
          </div>
        {/each}
      </div>
    {:else if filteredProjects.length === 0}
      <div class="fx-empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /></svg>
        <p>No se encontraron proyectos en esta categoría.</p>
        <button type="button" class="fx-reset-filter-btn" on:click={() => selectedCategory = 'all'}>
          Ver todos los proyectos
        </button>
      </div>
    {:else}
      <!-- Showcase Grid Modular -->
      <div class="fx-showcase-grid">
        {#each filteredProjects as project (project.id || project.slug)}
          {@const imgSource = project.image || project.image_url}
          {@const kpiData = project.kpis && project.kpis.length > 0 ? parseKpiText(project.kpis[0]) : null}

          <article class="fx-project-card" class:is-private={project.isPrivate}>
            <!-- Cabecera Visual: Imagen con relación de aspecto 16:10 -->
            <div class="fx-media-wrapper">
              {#if imgSource}
                <img
                  src={imgSource}
                  alt={project.title || 'Proyecto Foxbyte'}
                  loading="lazy"
                  decoding="async"
                  class="fx-project-image"
                />
              {:else}
                <div class="fx-fallback-image">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /><path d="M16 5.25l-8 4.5" /></svg>
                  <span>Foxbyte Engineering</span>
                </div>
              {/if}

              <!-- Badges Superpuestos -->
              <div class="fx-badges-overlay">
                <span class="fx-category-badge">{project.category || 'Ingeniería de Software'}</span>
                {#if project.isPrivate}
                  <span class="fx-nda-badge" title="Proyecto protegido bajo acuerdo de confidencialidad">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
                    Bajo NDA
                  </span>
                {/if}
              </div>
            </div>

            <!-- Cuerpo de la Tarjeta -->
            <div class="fx-card-content">
              <h3 class="fx-card-title">{project.title}</h3>
              <p class="fx-card-desc">
                {project.description ? project.description.substring(0, 140) + '...' : 'Plataforma digital escalable y arquitectura modular de alto rendimiento.'}
              </p>

              <!-- Métrica KPI Destacada si existe -->
              {#if kpiData && kpiData.val}
                <div class="fx-kpi-highlight">
                  <span class="fx-kpi-icon">⚡</span>
                  <strong class="fx-kpi-val">{kpiData.val}</strong>
                  <span class="fx-kpi-lbl">{kpiData.lbl}</span>
                </div>
              {/if}

              <!-- Tech Stack Tags -->
              {#if project.stack && project.stack.length > 0}
                <div class="fx-tech-tags" aria-label="Tecnologías utilizadas">
                  {#each project.stack.slice(0, 4) as tech}
                    <span class="fx-tech-chip">{tech}</span>
                  {/each}
                </div>
              {/if}

              <!-- Footer de Acción: Público vs Privado -->
              <div class="fx-card-footer">
                {#if project.isPrivate}
                  <button
                    type="button"
                    class="fx-action-btn fx-btn-nda"
                    on:click={() => openNdaModal(project)}
                    aria-label="Solicitar acceso privado para {project.title}"
                  >
                    <span>Solicitar acceso NDA</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
                  </button>
                {:else}
                  <a
                    href="/proyectos/{project.slug}"
                    class="fx-action-btn fx-btn-public"
                    aria-label="Ver caso de estudio de {project.title}"
                  >
                    <span>Ver caso de estudio</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
                  </a>
                {/if}
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/if}

    <!-- Footer Global de la Sección de Portafolio -->
    <div class="fx-section-bottom">
      <a href="/proyectos" class="fx-explore-all-btn">
        <span>Explorar todos los proyectos y casos de éxito</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
      </a>
    </div>
  </div>
</section>

<!-- MODAL EJECUTIVO PARA PROYECTOS PRIVADOS (BAJO NDA) -->
{#if selectedNdaProject}
  <div 
    class="fx-nda-backdrop" 
    transition:fade={{ duration: 200 }} 
    on:click={closeNdaModal}
    role="presentation"
  >
    <div 
      class="fx-nda-modal" 
      transition:fly={{ y: 30, duration: 300 }} 
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-labelledby="nda-modal-title"
    >
      <button 
        type="button" 
        class="fx-modal-close" 
        on:click={closeNdaModal} 
        aria-label="Cerrar modal de proyecto confidencial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
      </button>

      <div class="fx-nda-badge-header">
        <span class="fx-lock-icon">🔒</span>
        <span>PROYECTO PROTEGIDO POR ACUERDO DE CONFIDENCIALIDAD (NDA)</span>
      </div>

      <h3 id="nda-modal-title" class="fx-nda-title">{selectedNdaProject.title}</h3>
      <span class="fx-nda-category">{selectedNdaProject.category || 'Desarrollo Especializado'}</span>

      <div class="fx-nda-body">
        <p class="fx-nda-desc">
          {selectedNdaProject.description || 'Solución tecnológica empresarial diseñada para optimizar procesos críticos de negocio con alta seguridad y escalabilidad.'}
        </p>

        {#if selectedNdaProject.stack && selectedNdaProject.stack.length > 0}
          <div class="fx-nda-tech-block">
            <h4>Arquitectura y Stack Tecnológico:</h4>
            <div class="fx-tech-tags">
              {#each selectedNdaProject.stack as tech}
                <span class="fx-tech-chip">{tech}</span>
              {/each}
            </div>
          </div>
        {/if}

        <div class="fx-nda-notice-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9v4" /><path d="M12 16v.01" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
          <p>
            Por políticas de privacidad del cliente, el código fuente y las métricas internas no son públicos. Podemos presentar la arquitectura y casos análogos en una sesión técnica confidencial.
          </p>
        </div>
      </div>

      <div class="fx-nda-actions">
        <button 
          type="button" 
          class="fx-cta-btn-primary" 
          on:click={() => requestNdaAccess(selectedNdaProject)}
        >
          <span>Solicitar demostración confidencial</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
        </button>
        <button type="button" class="fx-cta-btn-ghost" on:click={closeNdaModal}>
          Volver al portafolio
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .fx-portfolio-section {
    position: relative;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 6.5rem 1.5rem;
    background-color: #070B14;
    overflow: hidden;
    font-family: var(--font-body, system-ui, sans-serif);
    scroll-margin-top: 80px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .fx-ambient-mesh {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
    background: radial-gradient(circle at 10% 20%, rgba(255, 90, 0, 0.035) 0%, transparent 60%);
  }

  .fx-container {
    position: relative;
    max-width: 1240px;
    margin: 0 auto;
    z-index: 1;
  }

  /* --- Encabezado --- */
  .fx-portfolio-header {
    text-align: center;
    max-width: 780px;
    margin: 0 auto 3.5rem;
  }

  .fx-title {
    font-family: var(--font-display, inherit);
    font-size: clamp(2.3rem, 4.2vw, 3.4rem);
    color: #FFFFFF;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.035em;
    margin-bottom: 1.25rem;
  }

  .fx-title-accent {
    color: var(--color-primary, #FF5A00);
    font-weight: 800;
  }

  .fx-subtitle {
    font-size: 1.05rem;
    color: #94A3B8;
    line-height: 1.65;
    margin-bottom: 2.2rem;
  }

  /* --- Chips de Filtro --- */
  .fx-filter-chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem;
    margin-top: 1.5rem;
  }

  .fx-chip {
    padding: 0.55rem 1.2rem;
    border-radius: var(--radius-full, 100px);
    font-size: 0.86rem;
    font-weight: 600;
    color: #94A3B8;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.09);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .fx-chip:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .fx-chip.active {
    background-color: var(--color-primary, #FF5A00);
    color: #ffffff;
    border-color: var(--color-primary, #FF5A00);
    box-shadow: 0 4px 16px rgba(255, 90, 0, 0.4);
  }

  /* --- Showcase Grid Modular --- */
  .fx-showcase-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 640px) {
    .fx-showcase-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .fx-showcase-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* --- Project Card Dark Glassmorphism Container --- */
  .fx-project-card {
    position: relative;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(10, 16, 30, 0.95) 100%);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .fx-project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.7), 0 0 24px rgba(255, 90, 0, 0.15);
    border-color: rgba(255, 90, 0, 0.35);
  }

  /* --- Media (16:10 aspect ratio) --- */
  .fx-media-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: #090e1a;
    overflow: hidden;
  }

  .fx-project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .fx-project-card:hover .fx-project-image {
    transform: scale(1.06);
  }

  .fx-fallback-image {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.85rem;
    font-weight: 600;
    background: linear-gradient(135deg, #090e1a 0%, #111a2e 100%);
  }

  .fx-badges-overlay {
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
    z-index: 2;
  }

  .fx-category-badge {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius-full, 100px);
    background: rgba(7, 11, 20, 0.85);
    color: #F8FAFC;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .fx-nda-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius-full, 100px);
    background: rgba(225, 29, 72, 0.9);
    color: #ffffff;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 2px 8px rgba(225, 29, 72, 0.4);
  }

  /* --- Card Content --- */
  .fx-card-content {
    padding: 1.8rem 1.6rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .fx-card-title {
    font-family: var(--font-display, inherit);
    font-size: 1.3rem;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.3;
    letter-spacing: -0.02em;
    margin-bottom: 0.65rem;
    transition: color 0.2s ease;
  }

  .fx-project-card:hover .fx-card-title {
    color: #FF7A1A;
  }

  .fx-card-desc {
    font-size: 0.92rem;
    color: #94A3B8;
    line-height: 1.55;
    margin-bottom: 1.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* --- KPI Highlight --- */
  .fx-kpi-highlight {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 90, 0, 0.1);
    border: 1px solid rgba(255, 90, 0, 0.25);
    border-radius: 8px;
    padding: 0.4rem 0.8rem;
    font-size: 0.82rem;
    margin-bottom: 1.25rem;
    color: #F8FAFC;
  }

  .fx-kpi-val {
    color: #FF7A1A;
    font-weight: 800;
    font-size: 0.92rem;
  }

  .fx-kpi-lbl {
    color: #CBD5E1;
    font-weight: 500;
  }

  /* --- Tech Tags --- */
  .fx-tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.5rem;
  }

  .fx-tech-chip {
    font-size: 0.73rem;
    font-weight: 600;
    color: #CBD5E1;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.28rem 0.6rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* --- Card Footer & Action Buttons --- */
  .fx-card-footer {
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    margin-top: auto;
  }

  .fx-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 0.9rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
    transition: color 0.2s ease;
  }

  .fx-btn-public {
    color: #E2E8F0;
  }

  .fx-btn-public svg {
    color: var(--color-primary, #FF5A00);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .fx-project-card:hover .fx-btn-public {
    color: var(--color-primary, #FF5A00);
  }

  .fx-project-card:hover .fx-btn-public svg {
    transform: translateX(5px);
  }

  .fx-btn-nda {
    color: #fb7185;
  }

  .fx-btn-nda:hover {
    color: #fda4af;
  }

  /* --- Section Bottom CTA --- */
  .fx-section-bottom {
    margin-top: 4rem;
    display: flex;
    justify-content: center;
  }

  .fx-explore-all-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2.4rem;
    background: rgba(255, 255, 255, 0.04);
    color: #F8FAFC;
    font-weight: 700;
    font-size: 0.98rem;
    text-decoration: none;
    border-radius: var(--radius-full, 100px);
    border: 1.5px solid rgba(255, 255, 255, 0.14);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .fx-explore-all-btn svg {
    color: var(--color-primary, #FF5A00);
    transition: transform 0.25s ease;
  }

  .fx-explore-all-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--color-primary, #FF5A00);
    color: #FF7A1A;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 90, 0, 0.25);
  }

  .fx-explore-all-btn:hover svg {
    transform: translateX(4px);
  }

  /* --- Empty State --- */
  .fx-empty-state {
    text-align: center;
    padding: 4rem 1rem;
    color: #94a3b8;
  }

  .fx-empty-state svg {
    margin-bottom: 1rem;
    opacity: 0.6;
  }

  .fx-reset-filter-btn {
    margin-top: 1rem;
    padding: 0.6rem 1.4rem;
    border-radius: var(--radius-full, 100px);
    background: var(--color-primary, #FF5A00);
    color: #ffffff;
    font-weight: 600;
    border: none;
    cursor: pointer;
  }

  /* --- Skeletons --- */
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

  .fx-skeleton-media { width: 100%; aspect-ratio: 16 / 10; }
  .fx-skeleton-badge { width: 90px; height: 20px; border-radius: 100px; margin-bottom: 1rem; }
  .fx-skeleton-title { width: 70%; height: 24px; border-radius: 6px; margin-bottom: 0.75rem; }
  .fx-skeleton-desc { width: 100%; height: 16px; border-radius: 6px; margin-bottom: 1rem; }
  .fx-skeleton-tags { width: 50%; height: 20px; border-radius: 6px; }

  /* --- MODAL EJECUTIVO NDA --- */
  .fx-nda-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .fx-nda-modal {
    position: relative;
    background: linear-gradient(180deg, #0F172A 0%, #0B1120 100%);
    border-radius: 24px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 2.5rem;
    box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .fx-modal-close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #CBD5E1;
    transition: all 0.2s ease;
  }

  .fx-modal-close:hover {
    background: rgba(255, 255, 255, 0.14);
    color: #FFFFFF;
  }

  .fx-nda-badge-header {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 800;
    color: #fb7185;
    background: rgba(225, 29, 72, 0.15);
    border: 1px solid rgba(225, 29, 72, 0.35);
    padding: 0.4rem 0.8rem;
    border-radius: var(--radius-full, 100px);
    margin-bottom: 1.25rem;
  }

  .fx-nda-title {
    font-family: var(--font-display, inherit);
    font-size: 1.75rem;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.2;
    margin-bottom: 0.4rem;
  }

  .fx-nda-category {
    display: block;
    font-size: 0.88rem;
    font-weight: 600;
    color: #94A3B8;
    margin-bottom: 1.5rem;
  }

  .fx-nda-desc {
    font-size: 1rem;
    color: #CBD5E1;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .fx-nda-tech-block {
    margin-bottom: 1.5rem;
  }

  .fx-nda-tech-block h4 {
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94A3B8;
    margin-bottom: 0.75rem;
  }

  .fx-nda-notice-box {
    display: flex;
    gap: 0.85rem;
    align-items: flex-start;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 2rem;
    font-size: 0.88rem;
    color: #94A3B8;
    line-height: 1.5;
  }

  .fx-nda-notice-box svg {
    flex-shrink: 0;
    color: var(--color-primary, #FF5A00);
    margin-top: 2px;
  }

  .fx-nda-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  @media (min-width: 640px) {
    .fx-nda-actions {
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  .fx-cta-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.9rem 1.8rem;
    background-color: var(--color-primary, #FF5A00);
    color: #ffffff;
    font-weight: 700;
    font-size: 0.95rem;
    border-radius: var(--radius-full, 100px);
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(255, 90, 0, 0.35);
    transition: all 0.2s ease;
  }

  .fx-cta-btn-primary:hover {
    background-color: var(--color-primary-hover, #E04E00);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 90, 0, 0.45);
  }

  .fx-cta-btn-ghost {
    padding: 0.9rem 1.5rem;
    background: transparent;
    color: #94A3B8;
    font-weight: 600;
    font-size: 0.95rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-full, 100px);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .fx-cta-btn-ghost:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.25);
  }
</style>
