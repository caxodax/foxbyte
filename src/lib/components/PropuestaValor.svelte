<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  // --- Estado ---
  let activeMode: "problema" | "solucion" = "solucion";

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

        <!-- Tabs -->
        <div class="fx-vp__tabs" role="tablist" aria-label="Mensaje">
          <button
            class="fx-vp__tab"
            aria-selected={activeMode === "problema"}
            on:click={() => (activeMode = "problema")}
          >
            Problema
          </button>
          <button
            class="fx-vp__tab"
            aria-selected={activeMode === "solucion"}
            on:click={() => (activeMode = "solucion")}
          >
            Solución
          </button>
        </div>

        {#if activeMode === "problema"}
          <ul class="fx-vp__bullets">
            <li><span class="dot"></span> Procesos manuales y desalineación entre equipos.</li>
            <li><span class="dot"></span> Datos dispersos, reportes tardíos y decisiones a ciegas.</li>
            <li><span class="dot"></span> Integraciones frágiles que frenan el crecimiento.</li>
          </ul>
        {:else}
          <ul class="fx-vp__bullets">
            <li><span class="dot"></span> <strong>Software a medida</strong> alineado a KPIs de operaciones y ventas.</li>
            <li><span class="dot"></span> <strong>Infraestructura segura</strong> y mantenible con SLOs claros.</li>
            <li><span class="dot"></span> <strong>BI accionable</strong>: métricas en tiempo real y alertas por umbrales.</li>
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
            <span class="pill">+5 años</span>
            <span class="pill">30+ proyectos</span>
            <span class="pill">SLA 99.9%</span>
          </div>
        {/if}

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

  /* Tabs tipo píldora con sombra */
  .fx-vp__tabs{
    display:inline-flex; gap:.4rem; padding:.3rem; border-radius:999px;
    background:#f2f4f6; box-shadow: inset 0 1px 0 rgba(0,0,0,.03);
    margin: .4rem 0 1rem;
  }
  .fx-vp__tab{
    appearance:none; border:0; cursor:pointer;
    padding:.55rem 1rem; border-radius:999px; font-weight:800;
    color: var(--azul-petroleo, #2C3E50); background: transparent;
    box-shadow: 0 0 0 rgba(0,0,0,0);
  }
  .fx-vp__tab[aria-selected="true"]{
    background:#fff; box-shadow: 0 4px 12px rgba(0,0,0,.08);
  }

  /* Bullets con dot sutil */
  .fx-vp__bullets{ list-style:none; padding:0; margin:0 0 1rem; display:grid; gap:.6rem; }
  .fx-vp__bullets li{ display:flex; align-items:flex-start; gap:.6rem; color:#2d3748; }
  .fx-vp .dot{ width:12px; height:12px; border-radius:50%; background:#e9edf2; position:relative; top:.45rem; }
  .fx-vp__bullets strong{ color: var(--azul-petroleo, #2C3E50); }

  /* KPI cards como en la imagen */
  .fx-vp__kpi-row{
    display:grid; grid-template-columns: repeat(3,1fr); gap:1rem;
    margin: .8rem 0 0;
  }
  .fx-vp__kpi{
    background:#fbfcfd; border:1px solid #eef1f3; border-radius:18px;
    padding:1.2rem; text-align:center;
    box-shadow: 0 6px 18px rgba(0,0,0,.04);
  }
  .fx-vp__kpi-num{
    display:block; font-size: clamp(1.4rem, 2.2vw, 2rem);
    font-weight:900; color: var(--azul-petroleo, #2C3E50);
  }
  .fx-vp__kpi-sub{ display:block; color:#586174; margin-top:.35rem; }

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
