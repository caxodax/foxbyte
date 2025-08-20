<section id="portafolio" class="portfolio-section">
  <div class="portfolio-container">
    <div class="section-header">
      <span class="subtitle">Nuestro Trabajo</span>
      <h2>Proyectos que impulsan el crecimiento y la eficiencia.</h2>
    </div>

    <div class="portfolio-grid">
      <!-- Proyecto 1 -->
      <div class="project-card">
        <div class="project-media">
          <!-- CORRECCIÓN: Reemplazado video por una imagen de placeholder para evitar errores -->
          <img src="https://placehold.co/600x400/2C3E50/F8F6F3?text=Proyecto+CRM" alt="Proyecto CRM" />
        </div>
        <div class="project-content">
          <span class="project-category">Sistema de Gestión (CRM)</span>
          <h3>Optimización de Procesos para Empresa de Logística</h3>
          <p>Desarrollo de un CRM a medida para automatizar la gestión de clientes, rutas y facturación, reduciendo el tiempo administrativo en un 40%.</p>
          <div class="tech-stack">
            <span>SvelteKit</span>
            <span>Node.js</span>
            <span>Firebase</span>
          </div>
        </div>
      </div>

      <!-- Proyecto 2 -->
      <div class="project-card">
        <div class="project-media">
          <!-- CORRECCIÓN: Reemplazado video por una imagen de placeholder para evitar errores -->
          <img src="https://placehold.co/600x400/5E3A6B/F8F6F3?text=Proyecto+BI" alt="Proyecto BI" />
        </div>
        <div class="project-content">
          <span class="project-category">Análisis de Datos</span>
          <h3>Dashboard de Inteligencia de Negocios</h3>
          <p>Creación de un dashboard interactivo que centraliza métricas de ventas y marketing, permitiendo tomar decisiones basadas en datos en tiempo real.</p>
          <div class="tech-stack">
            <span>Power BI</span>
            <span>SQL Server</span>
            <span>Python</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

<style>
  .portfolio-section { padding: 5rem 1.5rem; background-color: var(--marfil-claro); }
  .portfolio-container { max-width: 1200px; margin: 0 auto; text-align: center; }
  .section-header { margin-bottom: 3rem; }
  .subtitle { display: inline-block; margin-bottom: 0.5rem; color: var(--terracota-suave); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
  .section-header h2 { font-size: 2rem; color: var(--azul-petroleo); max-width: 600px; margin: 0 auto; }

  .portfolio-grid { display: grid; gap: 2rem; text-align: left; }
  .project-card { background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(44, 62, 80, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .project-card:hover { transform: translateY(-10px); box-shadow: 0 15px 35px rgba(44, 62, 80, 0.1); }
  
  .project-media { overflow: hidden; background-color: #e0e0e0; }
  .project-media img { /* Cambiado de video a img */
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.4s ease-out;
  }
  .project-card:hover .project-media img { transform: scale(1.05); }

  .project-content { padding: 2rem; }
  .project-category { display: block; font-size: 0.8rem; font-weight: 600; color: var(--ciruela-profunda); margin-bottom: 0.5rem; text-transform: uppercase; }
  .project-content h3 { font-size: 1.5rem; margin-bottom: 1rem; }
  .project-content p { color: var(--gris-grafito); margin-bottom: 1.5rem; }
  .tech-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .tech-stack span { background-color: #eef1f3; color: var(--azul-petroleo); padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600; }

  @media (min-width: 768px) {
    .portfolio-section { padding: 6rem 2rem; }
    .section-header h2 { font-size: 2.5rem; }
    .portfolio-grid { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
  }
</style>