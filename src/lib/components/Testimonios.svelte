<script lang="ts">
  const testimonials = [
    {
      name: 'Sofía Valenzuela',
      role: 'Directora de Operaciones en Zenith Retail',
      text: 'La automatización de procesos internos desarrollada por Foxbyte redujo nuestro tiempo administrativo en más del 40%. La comunicación y la calidad técnica superaron nuestras expectativas.',
      metric: '-40% tiempo adm.'
    },
    {
      name: 'Andrés Mendoza',
      role: 'Fundador de Apex E-learning',
      text: 'El sistema híbrido de e-commerce y academia digital de Foxbyte nos permitió escalar la venta de cursos a nivel internacional. Las transacciones son 100% estables y la conversión aumentó notablemente.',
      metric: '+45% conversión'
    },
    {
      name: 'Carlos Guerrero',
      role: 'Director de IT en Nova Logistics',
      text: 'La optimización y migración de nuestras bases de datos transaccionales eliminó por completo las caídas del sistema en horas pico. Un equipo de ingeniería de primer nivel.',
      metric: '99.9% uptime'
    }
  ];
</script>

<section class="testimonials-section">
  <div class="glow-bg"></div>

  <div class="container">
    <header class="section-header">
      <span class="sub-title">Opiniones Reales</span>
      <h2>Resultados comprobados <br/><span class="text-highlight">por nuestros clientes</span></h2>
      <p class="intro-p">Conoce la opinión de las empresas que han forjado su tecnología con nosotros y los resultados tangibles que hemos generado juntos.</p>
    </header>

    <div class="testimonials-grid">
      {#each testimonials as t}
        <article class="testimonial-card">
          <div class="card-glow"></div>
          <div class="card-content">
            <span class="quote-mark">“</span>
            <p class="quote-text">{t.text}</p>
            
            <div class="card-footer">
              <div class="author-info">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
              <div class="metric-badge">
                {t.metric}
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
    background-color: var(--azul-petroleo, #0F172A);
    color: var(--marfil-claro, #F8FAFC);
    padding: 6rem 1.5rem;
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }

  .glow-bg {
    position: absolute;
    bottom: -10%;
    right: 10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 107, 0, 0.04) 0%, rgba(15, 23, 42, 0) 70%);
    z-index: 0;
    pointer-events: none;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .section-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 4.5rem;
  }

  .sub-title {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--terracota-suave, #FF6B00);
    margin-bottom: 1rem;
    display: inline-block;
  }

  h2 {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.2;
    color: white;
    margin-bottom: 1.25rem;
    letter-spacing: -0.01em;
  }

  .text-highlight {
    color: var(--terracota-suave, #FF6B00);
  }

  .intro-p {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    font-size: 1.05rem;
    line-height: 1.6;
    color: rgba(248, 250, 252, 0.65);
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 992px) {
    .testimonials-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem;
    }
  }

  .testimonial-card {
    position: relative;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .testimonial-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 107, 0, 0.2);
    background: rgba(255, 255, 255, 0.03);
  }

  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at bottom left, rgba(255, 107, 0, 0.03) 0%, rgba(255, 107, 0, 0) 50%);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .testimonial-card:hover .card-glow {
    opacity: 1;
  }

  .card-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-grow: 1;
  }

  .quote-mark {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 4rem;
    line-height: 1;
    color: rgba(255, 107, 0, 0.15);
    margin-bottom: -1rem;
    display: block;
  }

  .quote-text {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(248, 250, 252, 0.85);
    margin-bottom: 2.5rem;
    flex-grow: 1;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 1.5rem;
    margin-top: auto;
    gap: 1rem;
  }

  .author-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    max-width: 65%;
  }

  .author-info strong {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 0.95rem;
    color: white;
  }

  .author-info span {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    font-size: 0.75rem;
    color: rgba(248, 250, 252, 0.5);
    line-height: 1.3;
  }

  .metric-badge {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--terracota-suave, #FF6B00);
    background: rgba(255, 107, 0, 0.06);
    border: 1px solid rgba(255, 107, 0, 0.15);
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    white-space: nowrap;
  }
</style>
