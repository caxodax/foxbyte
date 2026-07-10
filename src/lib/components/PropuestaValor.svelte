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

<section class="fx-vp" aria-labelledby="vp-title">
  <div class="fx-vp__wrap">
    <div class="fx-vp__grid">
      <!-- Imagen -->
      <figure class="fx-vp__media">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1587&auto=format&fit=crop"
          alt="Equipo y tecnología de Foxbyte"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <!-- Contenido -->
      <div class="fx-vp__content">
        <span class="fx-vp__subtitle">Nuestra propuesta de valor</span>
        <h2 id="vp-title" class="fx-vp__title">
          Transformamos complejidad en ventaja competitiva
        </h2>

        <ul class="fx-vp__bullets">
          <li>
            <div class="icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" /><path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
            </div>
            <div>
              <strong>Diseño Premium UI/UX.</strong> Interfaces que proyectan autoridad y enamoran a tus usuarios.
            </div>
          </li>
          <li>
            <div class="icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /><path d="M12 9l0 3" /><path d="M12 15l.01 0" /></svg>
            </div>
            <div>
              <strong>Arquitectura Escalable.</strong> Código robusto y seguro preparado para alto tráfico.
            </div>
          </li>
          <li>
            <div class="icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3v18h18" /><path d="M20 18v3" /><path d="M16 16v5" /><path d="M12 13v8" /><path d="M8 16v5" /><path d="M3 11c6 0 5 -5 9 -5s3 5 9 5" /></svg>
            </div>
            <div>
              <strong>Impacto en el Negocio.</strong> Soluciones tecnológicas diseñadas para aumentar tus KPIs.
            </div>
          </li>
        </ul>

        <!-- KPIs -->
        <div class="fx-vp__kpi-row">
          <div class="fx-vp__kpi" data-index="0">
            <span class="fx-vp__kpi-num">{fmt(kpiValues[0], kpis[0])}</span>
            <span class="fx-vp__kpi-sub">menos tiempo<br/>administrativo</span>
          </div>
          <div class="fx-vp__kpi" data-index="1">
            <span class="fx-vp__kpi-num">{fmt(kpiValues[1], kpis[1])}</span>
            <span class="fx-vp__kpi-sub">más conversión</span>
          </div>
          <div class="fx-vp__kpi" data-index="2">
            <span class="fx-vp__kpi-num">{fmt(kpiValues[2], kpis[2])}</span>
            <span class="fx-vp__kpi-sub">NPS promedio</span>
          </div>
        </div>

        <!-- Proof pills -->
        <div class="fx-vp__pills">
          <span class="pill">+5 años de exp.</span>
          <span class="pill">+30 proyectos</span>
          <span class="pill">SLA 99.9%</span>
        </div>

        <!-- CTAs -->
        <div class="fx-vp__ctas">
          <a href="#contacto" class="btn btn--primary">Agenda diagnóstico</a>
          <a href="#portafolio" class="btn btn--ghost">Ver casos</a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Namespace para cero colisiones */
  .fx-vp { padding: 3.5rem 1.25rem; background: #fff; }
  .fx-vp__wrap { max-width: 1200px; margin: 0 auto; }
  .fx-vp__grid { display: grid; gap: 1.75rem; }

  /* Imagen izquierda, borde redondeado y sombra suave */
  .fx-vp__media img {
    width: 100%; height: auto; display: block;
    border-radius: 18px;
    box-shadow: 0 24px 50px rgba(0,0,0,.08);
  }

  /* Tipografía estilo captura */
  .fx-vp__subtitle{
    display:inline-block; margin-bottom:.25rem;
    font-weight: 800; text-transform: uppercase; letter-spacing: .08em;
    color: var(--terracota-suave, #E67E22);
  }
  .fx-vp__title{
    margin: .35rem 0 1.25rem;
    color: var(--azul-petroleo, #2C3E50);
    font-size: clamp(2rem, 4.5vw, 3.3rem);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.01em;
    position: relative;
  }
  /* Subrayado suave estilo “spotlight” */
  .fx-vp__title::after{
    content:""; position:absolute; left:.25ch; bottom:.2ch; right:60%;
    height:.6em; background: rgba(230,126,34,.14);
    border-radius: .25rem; z-index:-1;
  }

  /* Bullets de alto valor */
  .fx-vp__bullets{ list-style:none; padding:0; margin:0 0 1.5rem; display:grid; gap:.8rem; }
  .fx-vp__bullets li{ display:flex; align-items:flex-start; gap:1rem; color:#2d3748; line-height: 1.5; font-size: 0.95rem; }
  .fx-vp__bullets .icon-wrap{ 
    display:flex; align-items:center; justify-content:center; flex-shrink: 0;
    width: 32px; height: 32px; border-radius: 8px; 
    background: rgba(44,62,80,0.05); color: var(--azul-petroleo, #2C3E50); 
  }
  .fx-vp__bullets strong{ color: var(--azul-petroleo, #2C3E50); display: block; margin-bottom: 0.1rem; }

  /* KPI cards como en la imagen */
  .fx-vp__kpi-row{
    display:grid; grid-template-columns: 1fr; gap:1rem;
    margin: 1.5rem 0 0;
  }
  @media (min-width: 480px) {
    .fx-vp__kpi-row{ grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 640px) {
    .fx-vp__kpi-row{ grid-template-columns: repeat(3, 1fr); }
  }
  .fx-vp__kpi{
    background:#fbfcfd; border:1px solid #eef1f3; border-radius:18px;
    padding:1.2rem; text-align:center;
    box-shadow: 0 4px 12px rgba(0,0,0,.02);
  }
  .fx-vp__kpi-num{
    display:block; font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight:900; color: var(--terracota-suave, #E67E22);
  }
  .fx-vp__kpi-sub{ display:block; color:#586174; margin-top:.35rem; font-size: 0.85rem; font-weight: 500; }

  .fx-vp__pills{ display:flex; flex-wrap:wrap; gap:.5rem; margin:.9rem 0 0; }
  .fx-vp .pill{
    background:#fff7f0; color:#7a3e15; border:1px solid #ffd9b5;
    padding:.35rem .6rem; border-radius:999px; font-weight:800; font-size:.85rem;
  }

  /* CTAs */
  .fx-vp__ctas{ display:flex; gap:.7rem; margin-top:1rem; }
  .btn{ text-decoration:none; border-radius:14px; font-weight:900; padding:.8rem 1.2rem; display:inline-flex; align-items:center; justify-content:center; }
  .btn--primary{ background: var(--azul-petroleo, #2C3E50); color:#fff; box-shadow:0 10px 20px rgba(44,62,80,.18); }
  .btn--ghost{ color: var(--azul-petroleo, #2C3E50); border:2px solid var(--azul-petroleo, #2C3E50); background:transparent; }

  /* Layout responsive: imagen izquierda / copy derecha */
  @media (min-width: 992px){
    .fx-vp{ padding: 5rem 2rem; }
    .fx-vp__grid{ grid-template-columns: 1.15fr 1fr; align-items:center; gap:2rem; }
  }
</style>
