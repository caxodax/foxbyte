<script lang="ts">
  const feedbackItems = [
    {
      category: 'Plataformas Transaccionales',
      text: 'El sistema unificado y la pasarela de pagos eliminaron la fricción de compra. Las transacciones se procesan con absoluta estabilidad incluso durante picos de alto volumen.',
      author: 'Líder de Operaciones',
      context: 'Comercio Digital & Educación',
      tag: 'Estabilidad en producción'
    },
    {
      category: 'Automatización e Integraciones',
      text: 'Logramos centralizar flujos que antes requerían horas manuales entre múltiples herramientas. Hoy el equipo opera sobre una base sólida y automatizada.',
      author: 'Director General',
      context: 'Operaciones y Servicios B2B',
      tag: 'Eficiencia operativa'
    },
    {
      category: 'Arquitectura & Datos',
      text: 'La optimización y migración de nuestra base de datos eliminó por completo la lentitud en reportes críticos. Rigor técnico e ingeniería de primer nivel.',
      author: 'Responsable de Tecnología',
      context: 'Logística y Distribución',
      tag: 'Alta concurrencia'
    }
  ];
</script>

<section class="testimonials-section" aria-labelledby="feedback-title">
  <div class="ambient-glow" aria-hidden="true"></div>

  <div class="container">
    <header class="section-header">
      <div class="badge-pill">
        <span>Confianza Empresarial</span>
      </div>
      <h2 id="feedback-title">
        Compromiso de entrega y resultados en producción
      </h2>
      <p class="intro-p">
        Cómo respaldamos a cada empresa: acuerdos técnicos rigurosos, comunicación directa con ingenieros y software diseñado para durar.
      </p>
    </header>

    <div class="testimonials-grid">
      {#each feedbackItems as item}
        <article class="testimonial-card">
          <div class="card-content">
            <div class="card-header-badge">
              <span class="category-name">{item.category}</span>
              <span class="metric-badge">{item.tag}</span>
            </div>

            <p class="quote-text">“{item.text}”</p>
            
            <div class="card-footer">
              <div class="author-info">
                <strong>{item.author}</strong>
                <span>{item.context}</span>
              </div>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .testimonials-section {
    position: relative;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    background-color: var(--color-background, #090D16);
    color: var(--color-text-primary, #F8FAFC);
    padding: 6.5rem 1.5rem;
    overflow: hidden;
    border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
    border-top: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
  }

  .ambient-glow {
    position: absolute;
    bottom: -15%;
    right: 5%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 102, 0, 0.04) 0%, transparent 70%);
    z-index: 0;
    pointer-events: none;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    width: 100%;
    box-sizing: border-box;
  }

  .section-header {
    text-align: center;
    max-width: 740px;
    margin: 0 auto 4rem;
  }

  .badge-pill {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.95rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 1.25rem;
  }

  h2 {
    font-family: var(--font-principal, system-ui, sans-serif);
    font-size: clamp(2.1rem, 4.2vw, 3.25rem);
    font-weight: 800;
    line-height: 1.15;
    color: #FFFFFF;
    margin: 0 0 1.25rem 0;
    letter-spacing: -0.035em;
    text-wrap: balance;
  }

  .intro-p {
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--color-text-secondary, #CBD5E1);
    margin: 0;
    font-weight: 400;
    text-wrap: pretty;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 992px) {
    .testimonials-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  .testimonial-card {
    position: relative;
    background: var(--color-surface, rgba(17, 24, 39, 0.65));
    border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
    border-radius: 20px;
    padding: 2.25rem 2rem;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .testimonial-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 102, 0, 0.35);
    background: var(--color-surface-elevated, rgba(23, 32, 51, 0.82));
    box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.6), 0 0 20px var(--color-primary-subtle, rgba(255, 102, 0, 0.12));
  }

  .card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-grow: 1;
  }

  .card-header-badge {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .category-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-text-muted, #94A3B8);
  }

  .metric-badge {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--color-primary, #FF6600);
    background: var(--color-primary-subtle, rgba(255, 102, 0, 0.12));
    border: 1px solid rgba(255, 102, 0, 0.25);
    padding: 0.25rem 0.65rem;
    border-radius: 9999px;
    white-space: nowrap;
  }

  .quote-text {
    font-size: 0.98rem;
    line-height: 1.65;
    color: var(--color-text-primary, #F8FAFC);
    margin: 0 0 2rem 0;
    flex-grow: 1;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 1.25rem;
    margin-top: auto;
  }

  .author-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .author-info strong {
    font-size: 0.92rem;
    color: #FFFFFF;
    font-weight: 600;
  }

  .author-info span {
    font-size: 0.78rem;
    color: var(--color-text-muted, #94A3B8);
    line-height: 1.3;
  }

  @media (max-width: 640px) {
    .testimonials-section {
      padding: 4.5rem 1.25rem;
    }

    .testimonial-card {
      padding: 1.75rem 1.5rem;
    }
  }
</style>
