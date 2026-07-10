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

<section class="fx-vp-premium" aria-labelledby="vp-title">
  <div class="fx-vp-premium__wrap">
    <div class="fx-vp-premium__header">
      <span class="fx-vp-premium__subtitle">Nuestra propuesta de valor</span>
      <h2 id="vp-title" class="fx-vp-premium__title">
        Transformamos complejidad en <br/><span class="text-highlight">ventaja competitiva</span>
      </h2>
    </div>

    <!-- 3 Pillars Grid -->
    <div class="fx-vp-premium__grid">
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
    <div class="fx-vp-premium__footer">
      <div class="fx-vp-premium__pills">
        <span class="pill">+5 años de exp.</span>
        <span class="pill">+30 proyectos exitosos</span>
        <span class="pill">SLA 99.9% garantizado</span>
      </div>
      <div class="fx-vp-premium__ctas">
        <a href="#contacto" class="btn btn--primary">Agendar diagnóstico</a>
        <a href="#portafolio" class="btn btn--ghost">Ver casos reales</a>
      </div>
    </div>
  </div>
</section>

  /* Estilos ultra-limpios y corporativos (Minimalismo Premium) */
  .fx-vp-premium { 
    position: relative; padding: 6rem 1.25rem; background: #f8fafc; color: #1e293b;
  }
  .fx-vp-premium__wrap { 
    max-width: 1200px; margin: 0 auto; 
  }

  /* Encabezado centrado */
  .fx-vp-premium__header { text-align: center; max-width: 800px; margin: 0 auto 4rem; }
  .fx-vp-premium__subtitle {
    display: inline-block; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; color: #64748b; margin-bottom: 1.2rem;
  }
  .fx-vp-premium__title {
    font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 900; line-height: 1.15;
    color: #0f172a; margin: 0; letter-spacing: -0.02em;
  }
  .text-highlight {
    color: var(--terracota-suave, #E67E22); /* Solo el color de marca, sin gradientes extravagantes */
  }

  /* Grid limpio */
  .fx-vp-premium__grid {
    display: grid; grid-template-columns: 1fr; gap: 2rem;
  }
  @media (min-width: 768px) {
    .fx-vp-premium__grid { grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
  }

  /* Tarjetas minimalistas */
  .fx-vp-card {
    background: #ffffff; border-radius: 16px; padding: 2.5rem 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03);
    border: 1px solid #e2e8f0;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex; flex-direction: column;
  }
  
  .fx-vp-card:hover {
    transform: translateY(-6px); 
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
  }

  /* Contenido interno de la tarjeta */
  .fx-vp-card__icon {
    width: 56px; height: 56px; border-radius: 12px; background: #f1f5f9;
    display: flex; align-items: center; justify-content: center;
    color: #334155; margin-bottom: 1.5rem; transition: background 0.3s ease, color 0.3s ease;
  }
  .fx-vp-card:hover .fx-vp-card__icon { 
    background: var(--terracota-suave, #E67E22); color: #fff; 
  }
  
  .fx-vp-card__h3 { font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 1rem; line-height: 1.3; }
  .fx-vp-card__p { font-size: 0.95rem; color: #475569; line-height: 1.6; margin: 0 0 2rem; flex-grow: 1; }

  /* Integración limpia del KPI */
  .fx-vp-card__kpi {
    padding-top: 1.5rem; border-top: 1px solid #e2e8f0;
  }
  .kpi-num { display: block; font-size: 2.5rem; font-weight: 900; color: #0f172a; line-height: 1; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
  .kpi-label { display: block; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }

  /* Footer: CTAs y Pills */
  .fx-vp-premium__footer {
    display: flex; flex-direction: column; align-items: center; gap: 2.5rem; margin-top: 4rem;
  }
  .fx-vp-premium__pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
  .fx-vp-premium__pills .pill {
    background: #ffffff; border: 1px solid #cbd5e1; color: #475569;
    padding: 0.4rem 1rem; border-radius: 999px; font-weight: 600; font-size: 0.85rem;
  }

  .fx-vp-premium__ctas { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
  .btn { text-decoration: none; border-radius: 8px; font-weight: 700; padding: 0.8rem 1.8rem; font-size: 1rem; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s ease; }
  .btn--primary { background: #0f172a; color: #fff; }
  .btn--primary:hover { background: #1e293b; transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
  .btn--ghost { color: #0f172a; background: transparent; border: 1px solid #cbd5e1; }
  .btn--ghost:hover { border-color: #94a3b8; background: #f8fafc; transform: translateY(-2px); }
</style>
