<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  // --- Estado ---
  type KPI = { target: number; suffix?: string; decimals?: number };
  const kpis: KPI[] = [
    { target: 40, suffix: "%", decimals: 0 },   // -40% tiempo admin
    { target: 25, suffix: "%", decimals: 0 },   // +25% conversión
    { target: 72, suffix: "", decimals: 0 },    // NPS 72
  ];
  let kpiValues = [0, 0, 0];
  let kpiStarted = [false, false, false];

  const fmt = (n: number, spec: KPI) =>
    `${n.toFixed(spec.decimals ?? 0)}${spec.suffix ?? ""}`;

  function animateKPI(index: number) {
    if (kpiStarted[index]) return;
    kpiStarted[index] = true;
    const spec = kpis[index];
    const from = 0, to = spec.target, dur = 1000;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      kpiValues[index] = from + (to - from) * ease(t);
      kpiValues = [...kpiValues];
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const idx = Number((en.target as HTMLElement).dataset.index || 0);
          animateKPI(idx);
          io.unobserve(en.target);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll<HTMLElement>(".fx-vp__kpi").forEach((el) => io.observe(el));
    onDestroy(() => io.disconnect());
  });
</script>

<section class="fx-vp-wow" aria-labelledby="vp-title">
          <!-- Fondo animado sutil -->
  <div class="fx-vp-wow__bg-glow fx-glow-1"></div>
  <div class="fx-vp-wow__bg-glow fx-glow-2"></div>
  <!-- Nuevo Grid 3D de fondo -->
  <div class="fx-vp-wow__bg-grid"></div>

  <div class="fx-vp-wow__wrap">
    <div class="fx-vp-wow__header">
      <span class="fx-vp-wow__subtitle">Nuestra propuesta de valor</span>
      <h2 id="vp-title" class="fx-vp-wow__title">
        Transformamos complejidad en <br/><span class="text-gradient">ventaja competitiva</span>
      </h2>
    </div>

    <!-- 3 Pillars Grid -->
    <div class="fx-vp-wow__grid">
      <!-- Tarjeta 1: Diseño -->
      <article class="fx-vp-card" data-index="0">
        <div class="fx-vp-card__content">
          <div class="fx-vp-card__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" /><path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
          </div>
          <h3 class="fx-vp-card__h3">Diseño Premium UI/UX</h3>
          <p class="fx-vp-card__p">Interfaces que proyectan absoluta autoridad y enamoran a tus usuarios, diseñadas para destacar en un mercado saturado.</p>
          <div class="fx-vp-card__kpi fx-vp__kpi" data-index="0">
            <span class="kpi-num">{fmt(kpiValues[0], kpis[0])}</span>
            <span class="kpi-label">Menos tiempo admin.</span>
          </div>
        </div>
      </article>
      
      <!-- Tarjeta 2: Arquitectura -->
      <article class="fx-vp-card" data-index="1">
        <div class="fx-vp-card__content">
          <div class="fx-vp-card__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /><path d="M12 9l0 3" /><path d="M12 15l.01 0" /></svg>
          </div>
          <h3 class="fx-vp-card__h3">Arquitectura Escalable</h3>
          <p class="fx-vp-card__p">Código robusto, seguro y diseñado a medida. Infraestructura preparada para soportar el crecimiento y alto tráfico sin fricción.</p>
          <div class="fx-vp-card__kpi fx-vp__kpi" data-index="1">
            <span class="kpi-num">+{fmt(kpiValues[1], kpis[1])}</span>
            <span class="kpi-label">Conversión generada</span>
          </div>
        </div>
      </article>

      <!-- Tarjeta 3: Impacto Negocio -->
      <article class="fx-vp-card" data-index="2">
        <div class="fx-vp-card__content">
          <div class="fx-vp-card__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3v18h18" /><path d="M20 18v3" /><path d="M16 16v5" /><path d="M12 13v8" /><path d="M8 16v5" /><path d="M3 11c6 0 5 -5 9 -5s3 5 9 5" /></svg>
          </div>
          <h3 class="fx-vp-card__h3">Impacto en el Negocio</h3>
          <p class="fx-vp-card__p">No solo escribimos software, construimos soluciones tecnológicas enfocadas en dominar tus métricas clave de éxito.</p>
          <div class="fx-vp-card__kpi fx-vp__kpi" data-index="2">
            <span class="kpi-num">{fmt(kpiValues[2], kpis[2])}</span>
            <span class="kpi-label">NPS Promedio</span>
          </div>
        </div>
      </article>
    </div>

    <!-- CTA & Pills Footer -->
    <div class="fx-vp-wow__footer">
      <div class="fx-vp-wow__pills">
        <span class="pill">+5 años de exp.</span>
        <span class="pill">+30 proyectos exitosos</span>
        <span class="pill">SLA 99.9% garantizado</span>
      </div>
      <div class="fx-vp-wow__ctas">
        <a href="#contacto" class="btn btn--primary">Agendar diagnóstico</a>
        <a href="#portafolio" class="btn btn--ghost">Ver casos reales</a>
      </div>
    </div>
  </div>
</section>

<style>
  /* Base de la sección con posicionamiento relativo para brillos de fondo */
  .fx-vp-wow { 
    position: relative; padding: 6rem 1.25rem; overflow: hidden; background: #fafcff; 
  }
  .fx-vp-wow__wrap { 
    max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; 
  }

  /* Grid 3D de fondo arquitectónico */
  .fx-vp-wow__bg-grid {
    position: absolute; inset: 0; z-index: 0;
    background-image: 
      linear-gradient(rgba(44, 62, 80, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(44, 62, 80, 0.04) 1px, transparent 1px);
    background-size: 50px 50px;
    background-position: center top;
    transform: perspective(1000px) rotateX(60deg) scale(2) translateY(-10%);
    transform-origin: top center;
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
    mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
    pointer-events: none;
  }

  /* Brillos de fondo animados (WOW effect) */
  .fx-vp-wow__bg-glow {
    position: absolute; width: 60vw; height: 60vw; border-radius: 50%;
    filter: blur(100px); opacity: 0.15; z-index: 0; animation: float 15s ease-in-out infinite alternate;
  }
  .fx-glow-1 {
    top: -20%; left: -10%; background: var(--terracota-suave, #E67E22);
  }
  .fx-glow-2 {
    bottom: -20%; right: -10%; background: var(--ciruela-profunda, #5E3A6B); animation-delay: -5s;
  }
  @keyframes float {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(10%, 15%) scale(1.1); }
  }

  /* Encabezado centrado */
  .fx-vp-wow__header { text-align: center; max-width: 800px; margin: 0 auto 4rem; }
  .fx-vp-wow__subtitle {
    display: inline-block; font-size: 0.85rem; font-weight: 800; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--terracota-suave, #E67E22); margin-bottom: 1rem;
    background: rgba(230, 126, 34, 0.1); padding: 0.4rem 1rem; border-radius: 999px;
  }
  .fx-vp-wow__title {
    font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 900; line-height: 1.1;
    color: var(--azul-petroleo, #2C3E50); margin: 0; letter-spacing: -0.02em;
  }
  .text-gradient {
    background: linear-gradient(135deg, var(--terracota-suave, #E67E22), var(--ciruela-profunda, #5E3A6B));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent;
  }

  /* Grid simétrico (Bento Box) */
  .fx-vp-wow__grid {
    display: grid; grid-template-columns: 1fr; gap: 2rem;
  }
  @media (min-width: 768px) {
    .fx-vp-wow__grid { grid-template-columns: repeat(3, 1fr); }
  }

  /* Tarjetas "Glassmorphism" Premium */
  .fx-vp-card {
    position: relative; background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    border-radius: 24px; padding: 2.5rem 2rem;
    box-shadow: 0 10px 40px rgba(44, 62, 80, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.8);
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease;
    display: flex; flex-direction: column; overflow: hidden;
  }
  /* Borde de gradiente dinámico en hover */
  .fx-vp-card::before {
    content: ""; position: absolute; inset: 0; z-index: -1; border-radius: 24px; padding: 2px;
    background: linear-gradient(135deg, var(--terracota-suave, #E67E22), transparent, var(--ciruela-profunda, #5E3A6B));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    opacity: 0; transition: opacity 0.5s ease;
  }
  
  .fx-vp-card:hover {
    transform: translateY(-10px); box-shadow: 0 20px 50px rgba(44, 62, 80, 0.1), inset 0 0 0 1px rgba(255,255,255,1);
  }
  .fx-vp-card:hover::before { opacity: 1; }

  /* Contenido interno de la tarjeta */
  .fx-vp-card__icon {
    width: 64px; height: 64px; border-radius: 18px; background: #fff;
    box-shadow: 0 8px 24px rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center;
    color: var(--azul-petroleo, #2C3E50); margin-bottom: 1.5rem; transition: transform 0.5s ease;
  }
  .fx-vp-card:hover .fx-vp-card__icon { transform: scale(1.1) rotate(-5deg); color: var(--terracota-suave, #E67E22); }
  
  .fx-vp-card__h3 { font-size: 1.35rem; font-weight: 900; color: var(--azul-petroleo, #2C3E50); margin: 0 0 1rem; line-height: 1.2; }
  .fx-vp-card__p { font-size: 0.95rem; color: #586174; line-height: 1.6; margin: 0 0 2rem; flex-grow: 1; }

  /* Integración fluida del KPI */
  .fx-vp-card__kpi {
    padding-top: 1.5rem; border-top: 1px solid rgba(0,0,0,0.06);
  }
  .kpi-num { display: block; font-size: 2.8rem; font-weight: 900; color: var(--azul-petroleo, #2C3E50); line-height: 1; margin-bottom: 0.5rem; letter-spacing: -0.03em; }
  .kpi-label { display: block; font-size: 0.85rem; font-weight: 700; color: #7a849c; text-transform: uppercase; letter-spacing: 0.05em; }

  /* Footer: CTAs y Pills */
  .fx-vp-wow__footer {
    display: flex; flex-direction: column; align-items: center; gap: 2.5rem; margin-top: 4rem;
  }
  .fx-vp-wow__pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
  .fx-vp-wow__pills .pill {
    background: #fff; border: 1px solid rgba(44, 62, 80, 0.08); color: var(--azul-petroleo, #2C3E50);
    padding: 0.5rem 1rem; border-radius: 999px; font-weight: 800; font-size: 0.85rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  }

  .fx-vp-wow__ctas { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
  .btn { text-decoration: none; border-radius: 999px; font-weight: 800; padding: 0.9rem 1.8rem; font-size: 1.05rem; display: inline-flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
  .btn--primary { background: var(--azul-petroleo, #2C3E50); color: #fff; box-shadow: 0 10px 24px rgba(44,62,80,0.25); }
  .btn--primary:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(44,62,80,0.35); background: #1a2530; }
  .btn--ghost { color: var(--azul-petroleo, #2C3E50); background: #fff; box-shadow: 0 4px 14px rgba(0,0,0,0.05); }
  .btn--ghost:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); color: var(--terracota-suave, #E67E22); }
</style>
