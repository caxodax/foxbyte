<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { db } from '$lib/firebase';
  import { collection, getDocs } from 'firebase/firestore';

  // Refs DOM
  let scroller: HTMLDivElement | null = null;
  let prevBtn: HTMLButtonElement | null = null;
  let nextBtn: HTMLButtonElement | null = null;
  let dotsWrap: HTMLDivElement | null = null;

  // Estado interno
  let portfolioItems = [];
  let loading = true;
  let cards: HTMLElement[] = [];
  let dots: HTMLSpanElement[] = [];
  let io: IntersectionObserver | null = null;
  let raf = 0;
  let reduce = false;
  let viewIO: IntersectionObserver | null = null;

  // Autoplay & progreso
  let autoplayMs = 4500;
  let autoplayId: number | null = null;
  let progressEl: HTMLSpanElement | null = null;
  let progress = 0; // 0..1
  let inView = false;
  let userHolding = false;

  // Cleanup listeners arrays
  let cleanupFns = [];

  // Modal de detalles
  let selectedProject = null;
  let lightboxImage = null;

  function openModal(item) {
    selectedProject = item;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    selectedProject = null;
    document.body.style.overflow = '';
  }

  function handleModalKeydown(e) {
    if (e.key === 'Escape') {
      if (lightboxImage) lightboxImage = null;
      else if (selectedProject) closeModal();
    }
  }

  onMount(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'portfolio'));
      portfolioItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error cargando portafolio:", error);
    } finally {
      loading = false;
      await tick(); // Wait for DOM to update with the loaded items
      if (portfolioItems.length > 0) {
        initCarousel();
      }
    }
  });

  function initCarousel() {
    if (!scroller || !dotsWrap) return;

    // Congelar refs no-nulas (evita type 'never')
    const el: HTMLDivElement = scroller;
    const dotsEl: HTMLDivElement = dotsWrap;
    const prev: HTMLButtonElement | null = prevBtn;
    const next: HTMLButtonElement | null = nextBtn;

    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cards
    cards = Array.from(el.querySelectorAll<HTMLElement>('.fx-portfolio__card'));

    // IO para visibilidad de la sección (autoplay on/off)
    const section = el.closest('.fx-portfolio') as HTMLElement | null;
    viewIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        inView = en.isIntersecting;
        if (inView) startAutoplay(el);
        else { stopAutoplay(); resetProgress(); }
      });
    }, { threshold: 0.3 });
    if (section) viewIO.observe(section);

    // IO para entrada suave de cards
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('in-view');
      });
    }, { threshold: 0.2 });
    cards.forEach((c) => io!.observe(c));

    // Dots dinámicos
    dotsEl.innerHTML = '';
    dots = cards.map(() => {
      const d = document.createElement('span');
      d.className = 'dot';
      dotsEl.appendChild(d);
      return d as HTMLSpanElement;
    });
    updateDots(el);
    updateDepthAndParallax(el);

    // Listeners
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        updateDots(el);
        updateDepthAndParallax(el);
      });
    };
    const onResize = () => {
      updateDots(el);
      updateDepthAndParallax(el);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    cleanupFns.push(() => el.removeEventListener('scroll', onScroll as EventListener));
    cleanupFns.push(() => window.removeEventListener('resize', onResize as EventListener));

    // Pausas de autoplay según interacción del usuario
    const hold = () => { userHolding = true; stopAutoplay(); };
    const release = () => { userHolding = false; resetProgress(); startAutoplay(el); };
    
    el.addEventListener('pointerdown', hold);
    el.addEventListener('pointerup', release);
    el.addEventListener('mouseenter', hold);
    el.addEventListener('mouseleave', release);
    el.addEventListener('focusin', hold);
    el.addEventListener('focusout', release);
    
    cleanupFns.push(() => el.removeEventListener('pointerdown', hold as EventListener));
    cleanupFns.push(() => el.removeEventListener('pointerup', release as EventListener));
    cleanupFns.push(() => el.removeEventListener('mouseenter', hold as EventListener));
    cleanupFns.push(() => el.removeEventListener('mouseleave', release as EventListener));
    cleanupFns.push(() => el.removeEventListener('focusin', hold as EventListener));
    cleanupFns.push(() => el.removeEventListener('focusout', release as EventListener));

    const onVisChange = () => {
      if (document.hidden) stopAutoplay();
      else { resetProgress(); startAutoplay(el); }
    };
    document.addEventListener('visibilitychange', onVisChange);
    cleanupFns.push(() => document.removeEventListener('visibilitychange', onVisChange));

    // Teclado
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); snapTo(nearestIndex(el) + 1, el); resetProgress(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); snapTo(nearestIndex(el) - 1, el); resetProgress(); }
    };
    el.addEventListener('keydown', onKey);
    cleanupFns.push(() => el.removeEventListener('keydown', onKey as EventListener));

    // Botones
    const onPrev = () => { snapTo(nearestIndex(el) - 1, el); resetProgress(); };
    const onNext = () => { snapTo(nearestIndex(el) + 1, el); resetProgress(); };
    prev?.addEventListener('click', onPrev);
    next?.addEventListener('click', onNext);
    cleanupFns.push(() => prev?.removeEventListener('click', onPrev as EventListener));
    cleanupFns.push(() => next?.removeEventListener('click', onNext as EventListener));

    // Tilt 3D suave
    if (!reduce) {
      const onMove = (e: PointerEvent) => {
        const card = e.currentTarget as HTMLElement;
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -4;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 4;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      };
      const onLeave = (e: PointerEvent) => { (e.currentTarget as HTMLElement).style.transform = ''; };
      cards.forEach((c) => { c.addEventListener('pointermove', onMove); c.addEventListener('pointerleave', onLeave); });
      cleanupFns.push(() => { cards.forEach((c) => { c.removeEventListener('pointermove', onMove); c.removeEventListener('pointerleave', onLeave); }); });
    }

    // Autoplay
    startAutoplay(el);
  }

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      io?.disconnect(); 
      viewIO?.disconnect(); 
      stopAutoplay();
      cleanupFns.forEach(fn => fn());
      if (typeof cancelAnimationFrame !== 'undefined') {
        cancelAnimationFrame(raf);
      }
    }
  });

  // Helpers
  function startAutoplay(container: HTMLDivElement) {
    if (autoplayId || !inView || userHolding) return;
    const step = 1000 / 60; // ~60fps
    let acc = 0;
    autoplayId = window.setInterval(() => {
      if (!progressEl) progressEl = document.querySelector('.fx-portfolio__progress-bar') as HTMLSpanElement | null;
      progress += step / autoplayMs;
      if (progressEl) progressEl.style.width = Math.min(progress * 100, 100).toFixed(2) + '%';
      acc += step;
      if (acc >= autoplayMs) {
        progress = 0; acc = 0;
        snapTo(nearestIndex(container) + 1, container);
      }
    }, step) as unknown as number;
  }
  function stopAutoplay() { if (autoplayId) { clearInterval(autoplayId); autoplayId = null; } }
  function resetProgress() { progress = 0; if (progressEl) progressEl.style.width = '0%'; }

  function getCardFullWidth(container: HTMLDivElement): number {
    if (cards.length === 0) return 0;
    const style = getComputedStyle(container);
    const gap = parseFloat((style as any).columnGap || (style as any).gap || '0');
    const first = cards[0];
    return first.getBoundingClientRect().width + gap;
  }
  function nearestIndex(container: HTMLDivElement): number {
    const itemW = getCardFullWidth(container);
    if (itemW === 0) return 0;
    const idx = Math.round(container.scrollLeft / itemW);
    return Math.max(0, Math.min(idx, cards.length - 1));
  }
  function snapTo(index: number, container: HTMLDivElement): void {
    const itemW = getCardFullWidth(container);
    container.scrollTo({ left: index * itemW, behavior: 'smooth' });
  }
  function updateDots(container: HTMLDivElement): void {
    const idx = nearestIndex(container);
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
  }
  function updateDepthAndParallax(container: HTMLDivElement) {
    const rect = container.getBoundingClientRect();
    const viewportCenter = rect.left + rect.width / 2;
    cards.forEach((card) => {
      const cRect = card.getBoundingClientRect();
      const center = cRect.left + cRect.width / 2;
      const dist = Math.min(1, Math.abs(center - viewportCenter) / (rect.width / 2));
      const scale = 1 - dist * 0.06;      // 1 -> 0.94
      const opacity = 1 - dist * 0.2;     // 1 -> 0.8
      const parallax = (center - viewportCenter) * -0.04; // px
      card.style.setProperty('--fx-scale', scale.toString());
      card.style.setProperty('--fx-opacity', opacity.toString());
      const img = card.querySelector<HTMLImageElement>('.fx-portfolio__media img');
      if (img) img.style.setProperty('--fx-parallax', parallax.toFixed(1) + 'px');
    });
  }
</script>

<section id="portafolio" class="fx-portfolio" aria-labelledby="portfolio-title">
  <div class="fx-portfolio__container">
    <header class="fx-portfolio__header">
      <span class="fx-portfolio__subtitle">Nuestro Trabajo</span>
      <h2 id="portfolio-title" class="fx-portfolio__title">Proyectos que impulsan el crecimiento y la eficiencia.</h2>
      <p class="fx-portfolio__kicker">Desliza para explorar casos reales. KPIs y stack a primera vista.</p>
    </header>

    {#if loading}
      <div class="fx-portfolio__loading">
        <p>Cargando portafolio...</p>
      </div>
    {:else if portfolioItems.length === 0}
      <div class="fx-portfolio__loading">
        <p>No hay proyectos en el portafolio actualmente.</p>
      </div>
    {:else}
      <div class="fx-portfolio__carousel">
        <button class="fx-portfolio__nav fx-portfolio__nav--prev" bind:this={prevBtn} type="button" aria-label="Anterior">‹</button>

        <div class="fx-portfolio__scroller" bind:this={scroller} role="region" aria-label="Proyectos destacables" tabindex="0">
          
          {#each portfolioItems as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <article class="fx-portfolio__card fx-card-minimal" aria-label={item.title} on:click={() => openModal(item)} role="button" tabindex="0">
              <figure class="fx-portfolio__media">
                <img loading="lazy" decoding="async" src={item.image_url || 'https://placehold.co/960x640'} alt={item.title} />
              </figure>
              <div class="fx-portfolio__content">
                <span class="fx-portfolio__category">{item.category}</span>
                <h3 class="fx-portfolio__h3">{item.title}</h3>
                
                <div class="fx-portfolio__minimal-cta">
                  <span class="minimal-link">Ver proyecto <span class="arrow">→</span></span>
                </div>
              </div>
            </article>
          {/each}

        </div>

        <button class="fx-portfolio__nav fx-portfolio__nav--next" bind:this={nextBtn} type="button" aria-label="Siguiente">›</button>

        <div class="fx-portfolio__progress" aria-hidden="true">
          <span class="fx-portfolio__progress-bar"></span>
        </div>
        <div class="fx-portfolio__dots" bind:this={dotsWrap} aria-hidden="true"></div>
      </div>
    {/if}
  </div>
</section>

<!-- MODAL PREMIUM -->
{#if selectedProject}
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="fx-modal-backdrop" transition:fade={{duration: 200}} on:click={closeModal} on:keydown={handleModalKeydown} tabindex="0">
    <div class="fx-modal-content" transition:fly={{y: 50, duration: 300}} on:click|stopPropagation>
      <button class="fx-modal-close" on:click={closeModal} aria-label="Cerrar modal">×</button>
      
      <div class="fx-modal-grid">
        <div class="fx-modal-image" role="button" tabindex="0" on:click={() => lightboxImage = selectedProject.image_url} on:keydown={(e) => e.key === 'Enter' && (lightboxImage = selectedProject.image_url)} aria-label="Ampliar imagen">
          <img src={selectedProject.image_url || 'https://placehold.co/960x640'} alt={selectedProject.title} />
          <div class="fx-modal-image-overlay">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 4l4 0l0 4" /><path d="M14 10l6 -6" /><path d="M8 20l-4 0l0 -4" /><path d="M4 20l6 -6" /><path d="M16 20l4 0l0 -4" /><path d="M14 14l6 6" /><path d="M8 4l-4 0l0 4" /><path d="M4 4l6 6" /></svg>
          </div>
        </div>
        
        <div class="fx-modal-body">
          <span class="fx-portfolio__category">{selectedProject.category}</span>
          <h2>{selectedProject.title}</h2>
          
          <div class="fx-modal-desc">
            <p>{selectedProject.description}</p>
          </div>
          
          {#if selectedProject.kpis && selectedProject.kpis.length > 0}
            <div class="fx-modal-kpis">
              {#each selectedProject.kpis as kpi}
                <div class="modal-kpi-item">
                  <span class="val">{kpi.value}</span>
                  <span class="lbl">{kpi.label}</span>
                </div>
              {/each}
            </div>
          {/if}
          
          {#if selectedProject.stack && selectedProject.stack.length > 0}
            <div class="fx-modal-stack">
              <strong>Stack Tecnológico:</strong>
              <div class="tags">
                {#each selectedProject.stack as stackItem}
                  <span class="tag">{stackItem}</span>
                {/each}
              </div>
            </div>
          {/if}
          
          <div class="fx-modal-actions">
            <button class="cta-primary" aria-label={`Cotizar ${selectedProject.title}`}>Cotizar Proyecto</button>
            <button class="cta-back" on:click={closeModal} aria-label="Volver">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
              <span>Volver a los proyectos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- LIGHTBOX PARA IMÁGENES -->
{#if lightboxImage}
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="fx-lightbox" transition:fade={{duration: 200}} on:click={() => lightboxImage = null} on:keydown={handleModalKeydown} tabindex="0">
    <button class="fx-lightbox-close" aria-label="Cerrar imagen" title="Cerrar (Esc)">×</button>
    <img src={lightboxImage} alt="Vista ampliada" transition:fly={{y: 20, duration: 300}} on:click|stopPropagation />
  </div>
{/if}

<style>
  /* NAMESPACE: .fx-portfolio para evitar colisiones globales */
  .fx-portfolio{ padding: 3.5rem 1rem; background: var(--marfil-claro, #F8F6F3); }
  .fx-portfolio__container{ max-width: 1200px; margin: 0 auto; }
  .fx-portfolio__header{ text-align: center; margin-bottom: 1.75rem; }
  .fx-portfolio__subtitle{ display:inline-block; margin-bottom:.5rem; color: var(--terracota-suave, #E67E22); font-weight:700; text-transform:uppercase; letter-spacing:.08em; font-size:.8rem; }
  .fx-portfolio__title{ font-size: 1.6rem; color: var(--azul-petroleo, #2C3E50); line-height: 1.2; margin: 0 auto .5rem; max-width: 28ch; }
  .fx-portfolio__kicker{ color: var(--gris-grafito, #4A4A4A); font-size:.95rem; opacity:.9; }

  .fx-portfolio__loading { text-align: center; padding: 3rem; color: var(--gris-grafito); }

  /* Slider */
  .fx-portfolio__carousel{ position: relative; }
  .fx-portfolio__scroller{
    position: relative; display: grid; gap: 1rem;
    grid-auto-flow: column; grid-auto-columns: 88%;
    overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth;
    padding: .25rem 2.5rem 2.4rem; -webkit-overflow-scrolling: touch;
  }
  /* Rediseño Minimalista Tarjeta */
  .fx-portfolio__card.fx-card-minimal {
    position: relative; scroll-snap-align: center; background: transparent; border: none; box-shadow: none; border-radius: 0;
    cursor: pointer; padding-bottom: 1.5rem; text-align: left;
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .fx-portfolio__card.fx-card-minimal:hover { transform: translateY(-10px); }
  
  .fx-portfolio__card.fx-card-minimal .fx-portfolio__media {
    position: relative; border-radius: 20px; aspect-ratio: 4/3; box-shadow: 0 12px 30px rgba(0,0,0,0.06); overflow: hidden; margin-bottom: 1.5rem; transition: box-shadow 0.5s ease;
  }
  .fx-portfolio__card.fx-card-minimal:hover .fx-portfolio__media { box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
  .fx-portfolio__card.fx-card-minimal .fx-portfolio__media img { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(1.05) contrast(1.05); transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
  .fx-portfolio__card.fx-card-minimal:hover .fx-portfolio__media img { transform: scale(1.06); }

  .fx-portfolio__card.fx-card-minimal .fx-portfolio__content { padding: 0 0.5rem; display: flex; flex-direction: column; }
  
  .fx-portfolio__card.fx-card-minimal .fx-portfolio__category {
    font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; color: var(--terracota-suave, #E67E22); margin-bottom: 0.6rem; text-transform: uppercase;
  }
  .fx-portfolio__card.fx-card-minimal .fx-portfolio__h3 {
    font-size: 1.4rem; font-weight: 800; color: var(--azul-petroleo, #2C3E50); margin-bottom: 0; line-height: 1.25; letter-spacing: -0.02em;
  }
  
  .fx-portfolio__minimal-cta { margin-top: 1.2rem; }
  .fx-portfolio__minimal-cta .minimal-link {
    font-size: 0.95rem; font-weight: 800; color: var(--ciruela-profunda, #5E3A6B); display: inline-flex; align-items: center; gap: 0.5rem; transition: color 0.3s;
  }
  .fx-portfolio__card.fx-card-minimal:hover .minimal-link { color: var(--terracota-suave, #E67E22); }
  .fx-portfolio__minimal-cta .arrow { transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
  .fx-portfolio__card.fx-card-minimal:hover .arrow { transform: translateX(8px); }

  /* Estilos para los botones del modal */
  .fx-portfolio .cta-primary{ appearance:none; border:0; border-radius:10px; padding:.7rem 1.2rem; font-weight:800; font-size: 0.95rem; letter-spacing: 0.03em; background: var(--azul-petroleo, #2C3E50); color:#fff; box-shadow:0 4px 14px rgba(44,62,80,.2); cursor:pointer; transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
  .fx-portfolio .cta-primary:hover { transform: translateY(-3px); box-shadow:0 8px 20px rgba(44,62,80,.3); background: #1a2530; }

  .fx-portfolio__nav{
    position:absolute; top:50%; transform:translateY(-50%); width:42px; height:42px; border-radius:50%; border:0; cursor:pointer;
    background: rgba(255,255,255,.9); box-shadow:0 6px 16px rgba(0,0,0,.15); display:grid; place-items:center; font-size:26px; line-height:1; font-weight:800; color: var(--azul-petroleo, #2C3E50); z-index:2;
  }
  .fx-portfolio__nav--prev{ left:.25rem; }
  .fx-portfolio__nav--next{ right:.25rem; }

  .fx-portfolio__progress{ position: relative; height: 4px; background: rgba(0,0,0,.08); border-radius: 999px; margin: .6rem auto 0; width: 160px; overflow: hidden; }
  .fx-portfolio__progress-bar{ position: absolute; inset: 0 auto 0 0; width: 0%; background: var(--terracota-suave, #E67E22); border-radius: 999px; transition: width .12s linear; }

  .fx-portfolio__dots{ position:relative; display:flex; justify-content:center; gap:.45rem; margin-top:.5rem; }
  .fx-portfolio__dots .dot{ width:8px; height:8px; border-radius:999px; background: rgba(0,0,0,.18); }
  .fx-portfolio__dots .dot.is-active{ background: var(--terracota-suave, #E67E22); transform: scale(1.2); }

  /* Breakpoints */
  @media (min-width: 640px){ .fx-portfolio__scroller{ grid-auto-columns: 70%; } }
  @media (min-width: 920px){ .fx-portfolio__scroller{ grid-auto-columns: 48%; } }
  @media (min-width: 1200px){ .fx-portfolio__scroller{ grid-auto-columns: 32%; } }

  @media (prefers-reduced-motion: reduce){
    .fx-portfolio__card, .fx-portfolio__media img, .fx-portfolio__accent{ transition:none !important; }
    .fx-portfolio__nav{ transition:none !important; }
  }
  .fx-portfolio__scroller:focus-visible{ outline:3px solid var(--ambar, #F1C40F); outline-offset:4px; border-radius:12px; }
  .fx-portfolio__card:focus-within{ outline:2px solid var(--terracota-suave, #E67E22); outline-offset:2px; }

  /* MODAL */
  .fx-modal-backdrop {
    position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;
  }
  .fx-modal-content {
    background: #fff; border-radius: 20px; width: 100%; max-width: 900px; max-height: 90vh;
    overflow-y: auto; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    display: flex; flex-direction: column; cursor: default;
  }
  .fx-modal-close {
    position: absolute; top: 1rem; right: 1rem; width: 36px; height: 36px; border-radius: 50%;
    border: none; background: #f1f5f9; color: #475569; font-size: 1.5rem; display: grid;
    place-items: center; cursor: pointer; z-index: 10; transition: all 0.2s; line-height: 1; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .fx-modal-close:hover { background: var(--terracota-suave, #E67E22); color: #fff; transform: scale(1.05); }
  
  .fx-modal-grid { display: grid; grid-template-columns: 1fr; }
  @media (min-width: 768px) { .fx-modal-grid { grid-template-columns: 1.1fr 1.4fr; } }
  
  .fx-modal-image { background: #f8fafc; position: relative; cursor: zoom-in; overflow: hidden; }
  .fx-modal-image img { width: 100%; height: 100%; object-fit: cover; max-height: 300px; display: block; transition: transform 0.4s ease; }
  .fx-modal-image:hover img { transform: scale(1.04); }
  .fx-modal-image-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: white; opacity: 0; transition: opacity 0.3s; pointer-events: none; }
  .fx-modal-image:hover .fx-modal-image-overlay { opacity: 1; }
  @media (min-width: 768px) { .fx-modal-image img { max-height: none; min-height: 100%; } }
  
  .fx-modal-body { padding: 2rem 2.5rem; display: flex; flex-direction: column; }
  .fx-modal-body h2 { font-size: 1.7rem; color: var(--azul-petroleo, #2C3E50); margin: 0 0 1.2rem; line-height: 1.2; font-weight: 800; }
  .fx-modal-desc { margin-bottom: 2rem; }
  .fx-modal-desc p { color: var(--gris-grafito, #4A4A4A); line-height: 1.7; font-size: 1rem; white-space: pre-wrap; margin: 0; }
  
  .fx-modal-kpis { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2rem; padding: 1.2rem; background: #f8fafc; border-radius: 14px; border: 1px solid #e2e8f0; }
  .modal-kpi-item { display: flex; flex-direction: column; }
  .modal-kpi-item .val { font-size: 1.4rem; font-weight: 800; color: var(--terracota-suave, #E67E22); }
  .modal-kpi-item .lbl { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
  
  .fx-modal-stack strong { display: block; font-size: 0.85rem; font-weight: 800; color: var(--azul-petroleo, #2C3E50); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
  .fx-modal-stack .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .fx-modal-stack .tag { background: #eef1f3; color: var(--azul-petroleo, #2C3E50); padding: 0.35rem 0.8rem; border-radius: 999px; font-size: 0.8rem; font-weight: 700; }
  
  .fx-modal-actions { margin-top: 2.5rem; display: flex; align-items: center; gap: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; }
  
  /* BOTÓN VOLVER */
  .cta-back { display: inline-flex; align-items: center; gap: 0.6rem; background: transparent; border: none; color: var(--azul-petroleo, #2C3E50); font-weight: 800; font-size: 1.05rem; cursor: pointer; padding: 0.5rem 0; transition: color 0.2s, transform 0.2s; }
  .cta-back:hover { color: var(--terracota-suave, #E67E22); transform: translateX(-6px); }

  /* LIGHTBOX */
  .fx-lightbox { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.92); backdrop-filter: blur(8px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 2rem; cursor: zoom-out; }
  .fx-lightbox img { max-width: 100%; max-height: 100%; object-fit: contain; box-shadow: 0 0 40px rgba(0,0,0,0.5); border-radius: 8px; cursor: default; }
  .fx-lightbox-close { position: absolute; top: 1.5rem; right: 1.5rem; width: 44px; height: 44px; background: rgba(255,255,255,0.1); border: none; border-radius: 50%; color: white; font-size: 2rem; display: grid; place-items: center; cursor: pointer; transition: background 0.2s; }
  .fx-lightbox-close:hover { background: rgba(255,255,255,0.25); }
</style>
