<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Refs DOM
  let scroller: HTMLDivElement | null = null;
  let prevBtn: HTMLButtonElement | null = null;
  let nextBtn: HTMLButtonElement | null = null;
  let dotsWrap: HTMLDivElement | null = null;

  // Estado interno
  let cards: HTMLElement[] = [];
  let dots: HTMLSpanElement[] = [];
  let io: IntersectionObserver | null = null;
  let raf = 0;
  let reduce = false;

  // Autoplay & progreso
  let autoplayMs = 4500;
  let autoplayId: number | null = null;
  let progressEl: HTMLSpanElement | null = null;
  let progress = 0; // 0..1
  let inView = false;
  let userHolding = false;

  onMount(() => {
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
    const viewIO = new IntersectionObserver((entries) => {
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

    // Pausas de autoplay según interacción del usuario
    const hold = () => { userHolding = true; stopAutoplay(); };
    const release = () => { userHolding = false; resetProgress(); startAutoplay(el); };
    el.addEventListener('pointerdown', hold);
    el.addEventListener('pointerup', release);
    el.addEventListener('mouseenter', hold);
    el.addEventListener('mouseleave', release);
    el.addEventListener('focusin', hold);
    el.addEventListener('focusout', release);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay();
      else { resetProgress(); startAutoplay(el); }
    });

    // Teclado
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); snapTo(nearestIndex(el) + 1, el); resetProgress(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); snapTo(nearestIndex(el) - 1, el); resetProgress(); }
    };
    el.addEventListener('keydown', onKey);

    // Botones
    const onPrev = () => { snapTo(nearestIndex(el) - 1, el); resetProgress(); };
    const onNext = () => { snapTo(nearestIndex(el) + 1, el); resetProgress(); };
    prev?.addEventListener('click', onPrev);
    next?.addEventListener('click', onNext);

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
      onDestroy(() => { cards.forEach((c) => { c.removeEventListener('pointermove', onMove); c.removeEventListener('pointerleave', onLeave); }); });
    }

    // Autoplay
    startAutoplay(el);

    // Cleanup
    onDestroy(() => {
      io?.disconnect(); viewIO.disconnect(); stopAutoplay();
      el.removeEventListener('scroll', onScroll as EventListener);
      el.removeEventListener('keydown', onKey as EventListener);
      window.removeEventListener('resize', onResize as EventListener);
      el.removeEventListener('pointerdown', hold as EventListener);
      el.removeEventListener('pointerup', release as EventListener);
      el.removeEventListener('mouseenter', hold as EventListener);
      el.removeEventListener('mouseleave', release as EventListener);
      el.removeEventListener('focusin', hold as EventListener);
      el.removeEventListener('focusout', release as EventListener);
      prev?.removeEventListener('click', onPrev as EventListener);
      next?.removeEventListener('click', onNext as EventListener);
      cancelAnimationFrame(raf);
    });
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

    <div class="fx-portfolio__carousel">
      <button class="fx-portfolio__nav fx-portfolio__nav--prev" bind:this={prevBtn} type="button" aria-label="Anterior">‹</button>

      <div class="fx-portfolio__scroller" bind:this={scroller} role="region" aria-label="Proyectos destacables" tabindex="0">
        <!-- CARD 1 -->
        <article class="fx-portfolio__card" aria-label="Proyecto CRM para logística">
          <div class="fx-portfolio__accent" aria-hidden="true"></div>
          <figure class="fx-portfolio__media">
            <img loading="lazy" decoding="async" src="https://placehold.co/960x640/2C3E50/F8F6F3?text=Proyecto+CRM" alt="Mockup del CRM a medida para logística" />
            <figcaption class="fx-portfolio__kpis">
              <span class="kpi">-40% <small>tiempo admin</small></span>
              <span class="kpi">+28% <small>retención</small></span>
            </figcaption>
          </figure>
          <div class="fx-portfolio__content">
            <span class="fx-portfolio__category">Sistema de Gestión (CRM)</span>
            <h3 class="fx-portfolio__h3">Optimización de Procesos para Empresa de Logística</h3>
            <p>CRM a medida para automatizar clientes, rutas y facturación.</p>
            <div class="fx-portfolio__stack" aria-label="Tecnologías usadas">
              <span>SvelteKit</span><span>Node.js</span><span>Firebase</span>
            </div>
            <div class="fx-portfolio__cta">
              <a class="cta-ghost" href="#" aria-label="Ver caso de estudio CRM">Ver caso</a>
              <button class="cta-primary" type="button" aria-label="Abrir contacto para proyecto CRM">Cotizar</button>
            </div>
          </div>
        </article>

        <!-- CARD 2 -->
        <article class="fx-portfolio__card" aria-label="Dashboard de Inteligencia de Negocios">
          <div class="fx-portfolio__accent" aria-hidden="true"></div>
          <figure class="fx-portfolio__media">
            <img loading="lazy" decoding="async" src="https://placehold.co/960x640/5E3A6B/F8F6F3?text=Proyecto+BI" alt="Dashboard interactivo de BI con métricas en tiempo real" />
            <figcaption class="fx-portfolio__kpis">
              <span class="kpi">TTR -35% <small>reportes</small></span>
              <span class="kpi">NPS 72 <small>stakeholders</small></span>
            </figcaption>
          </figure>
          <div class="fx-portfolio__content">
            <span class="fx-portfolio__category">Análisis de Datos</span>
            <h3 class="fx-portfolio__h3">Dashboard de Inteligencia de Negocios</h3>
            <p>Centraliza ventas y marketing, con alertas por umbrales.</p>
            <div class="fx-portfolio__stack" aria-label="Tecnologías usadas">
              <span>Power BI</span><span>SQL Server</span><span>Python</span>
            </div>
            <div class="fx-portfolio__cta">
              <a class="cta-ghost" href="#" aria-label="Ver caso de estudio BI">Ver caso</a>
              <button class="cta-primary" type="button" aria-label="Abrir contacto para proyecto BI">Cotizar</button>
            </div>
          </div>
        </article>

        <!-- CARD 3 -->
        <article class="fx-portfolio__card" aria-label="Ecommerce Omnicanal">
          <div class="fx-portfolio__accent" aria-hidden="true"></div>
          <figure class="fx-portfolio__media">
            <img loading="lazy" decoding="async" src="https://placehold.co/960x640/8E44AD/F8F6F3?text=Ecommerce" alt="Ecommerce omnicanal" />
            <figcaption class="fx-portfolio__kpis">
              <span class="kpi">+18% <small>conversión</small></span>
            </figcaption>
          </figure>
          <div class="fx-portfolio__content">
            <span class="fx-portfolio__category">Comercio</span>
            <h3 class="fx-portfolio__h3">Ecommerce Omnicanal</h3>
            <p>Headless commerce con catálogo sincronizado y fulfillment.</p>
            <div class="fx-portfolio__stack" aria-label="Tecnologías usadas">
              <span>SvelteKit</span><span>Stripe</span><span>Supabase</span>
            </div>
            <div class="fx-portfolio__cta">
              <a class="cta-ghost" href="#" aria-label="Ver caso de estudio Ecommerce">Ver caso</a>
              <button class="cta-primary" type="button" aria-label="Abrir contacto para proyecto Ecommerce">Cotizar</button>
            </div>
          </div>
        </article>
      </div>

      <button class="fx-portfolio__nav fx-portfolio__nav--next" bind:this={nextBtn} type="button" aria-label="Siguiente">›</button>

      <div class="fx-portfolio__progress" aria-hidden="true">
        <span class="fx-portfolio__progress-bar"></span>
      </div>
      <div class="fx-portfolio__dots" bind:this={dotsWrap} aria-hidden="true"></div>
    </div>
  </div>
</section>

<style>
  /* NAMESPACE: .fx-portfolio para evitar colisiones globales */
  .fx-portfolio{ padding: 3.5rem 1rem; background: var(--marfil-claro, #F8F6F3); }
  .fx-portfolio__container{ max-width: 1200px; margin: 0 auto; }
  .fx-portfolio__header{ text-align: center; margin-bottom: 1.75rem; }
  .fx-portfolio__subtitle{ display:inline-block; margin-bottom:.5rem; color: var(--terracota-suave, #E67E22); font-weight:700; text-transform:uppercase; letter-spacing:.08em; font-size:.8rem; }
  .fx-portfolio__title{ font-size: 1.6rem; color: var(--azul-petroleo, #2C3E50); line-height: 1.2; margin: 0 auto .5rem; max-width: 28ch; }
  .fx-portfolio__kicker{ color: var(--gris-grafito, #4A4A4A); font-size:.95rem; opacity:.9; }

  /* Slider */
  .fx-portfolio__carousel{ position: relative; }
  .fx-portfolio__scroller{
    position: relative; display: grid; gap: 1rem;
    grid-auto-flow: column; grid-auto-columns: 88%;
    overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth;
    padding: .25rem 2.5rem 2.4rem; -webkit-overflow-scrolling: touch;
  }
  .fx-portfolio__card{
    position: relative; scroll-snap-align: center; background:#fff; border-radius:16px; overflow: clip;
    box-shadow: 0 6px 18px rgba(0,0,0,.06); transform: translateY(6px) scale(var(--fx-scale,1));
    transition: transform .5s ease, box-shadow .5s ease, opacity .4s ease; opacity: var(--fx-opacity,1);
  }
  .fx-portfolio__card.in-view{ transform: translateY(0) scale(var(--fx-scale,1)); box-shadow: 0 12px 28px rgba(0,0,0,.08); }
  .fx-portfolio__accent{
    position:absolute; inset:-1px; border-radius:20px; padding:1px;
    background:conic-gradient(from 180deg at 50% 50%, #ffd166, #06d6a0, #118ab2, #ef476f, #ffd166);
    -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events:none; opacity:.0; transition:opacity .6s ease;
  }
  .fx-portfolio__card.in-view .fx-portfolio__accent{ opacity:.35; }

  .fx-portfolio__media{ position: relative; background: #e9edf2; aspect-ratio: 3 / 2; overflow: hidden; }
  .fx-portfolio__media img{ width:100%; height:120%; object-fit:cover; display:block; filter:saturate(1.02) contrast(1.02); transform: translateY(var(--fx-parallax,0)) scale(1.05); transition: transform .6s ease; will-change: transform; }

  .fx-portfolio__kpis{ position:absolute; inset:auto .75rem .75rem auto; display:flex; gap:.5rem; }
  .fx-portfolio__kpis .kpi{ background: rgba(255,255,255,.9); backdrop-filter: blur(6px); border:1px solid rgba(0,0,0,.06); border-radius:999px; padding:.35rem .6rem; font-weight:800; font-size:.9rem; color: var(--azul-petroleo, #2C3E50); box-shadow:0 4px 12px rgba(0,0,0,.08); }
  .fx-portfolio__kpis .kpi small{ font-weight:600; opacity:.7; margin-left:.25rem; }

  .fx-portfolio__content{ padding: 1.1rem .9rem 1.2rem; }
  .fx-portfolio__category{ display:block; font-size:.78rem; font-weight:700; color: var(--ciruela-profunda, #5E3A6B); text-transform:uppercase; letter-spacing:.06em; margin-bottom:.35rem; }
  .fx-portfolio__h3{ font-size:1.15rem; line-height:1.25; margin:0 0 .6rem; color: var(--azul-petroleo, #2C3E50); }
  .fx-portfolio__content p{ color: var(--gris-grafito, #4A4A4A); margin:0 0 .9rem; }
  .fx-portfolio__stack{ display:flex; flex-wrap:wrap; gap:.4rem; margin-bottom:.9rem; }
  .fx-portfolio__stack span{ background:#eef1f3; color: var(--azul-petroleo, #2C3E50); padding:.25rem .6rem; border-radius:999px; font-size:.78rem; font-weight:700; }

  .fx-portfolio__cta{ display:flex; gap:.6rem; }
  .fx-portfolio .cta-primary{ appearance:none; border:0; border-radius:12px; padding:.6rem .9rem; font-weight:800; background: var(--azul-petroleo, #2C3E50); color:#fff; box-shadow:0 6px 12px rgba(44,62,80,.2); cursor:pointer; }
  .fx-portfolio .cta-ghost{ display:inline-flex; align-items:center; border:1px solid var(--azul-petroleo, #2C3E50); border-radius:12px; padding:.53rem .85rem; font-weight:800; color: var(--azul-petroleo, #2C3E50); text-decoration:none; }

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
</style>
