<script lang="ts">
  //Servicios.svelte
  import { fly } from 'svelte/transition';
</script>

<section id="servicios" class="services-section">
  <div class="services-container">
    <div class="section-header">
      <span class="subtitle">Nuestras Soluciones</span>
      <h2>Precisión en cada línea de código, estrategia en cada decisión.</h2>
    </div>

    <div class="services-grid">
      <!-- Tarjeta de Servicio 1: Desarrollo de Software -->
      <div class="service-card" in:fly={{ y: 50, duration: 600, delay: 200 }}>
        <div class="card-content">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brackets-contain" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 4h-4v16h4" /><path d="M17 4h4v16h-4" /><path d="M8 16h.01" /><path d="M12 16h.01" /><path d="M16 16h.01" /></svg>
          </div>
          <h3>Desarrollo a la Medida</h3>
          <p>Creamos aplicaciones y sistemas robustos y escalables, diseñados exclusivamente para las necesidades de tu negocio.</p>
          <ul class="sub-services-list">
            <li>Sistemas ERP y CRM</li>
            <li>Aplicaciones Empresariales</li>
            <li>Gestión de Nómina e Inventario</li>
          </ul>
        </div>
      </div>

      <!-- Tarjeta de Servicio 2: Infraestructura Tecnológica -->
      <div class="service-card" in:fly={{ y: 50, duration: 600, delay: 400 }}>
        <div class="card-content">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-server-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" /><path d="M3 12m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" /><path d="M7 8l0 .01" /><path d="M7 16l0 .01" /><path d="M11 8h6" /><path d="M11 16h6" /></svg>
          </div>
          <h3>Infraestructura Tecnológica</h3>
          <p>Diseñamos e implementamos redes empresariales seguras, sistemas de monitoreo y ofrecemos mantenimiento integral para tus equipos.</p>
          <ul class="sub-services-list">
            <li>Instalación de Redes</li>
            <li>Cámaras y Monitoreo</li>
            <li>Mantenimiento de Equipos</li>
          </ul>
        </div>
      </div>

      <!-- Tarjeta de Servicio 3: Análisis de Datos -->
      <div class="service-card" in:fly={{ y: 50, duration: 600, delay: 600 }}>
        <div class="card-content">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-report-analytics" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 17v-5" /><path d="M12 17v-1" /><path d="M15 17v-3" /></svg>
          </div>
          <h3>Análisis de Datos</h3>
          <p>Transformamos tus datos en decisiones inteligentes a través de dashboards de BI personalizados y automatización de reportes.</p>
          <ul class="sub-services-list">
            <li>Inteligencia de Negocios (BI)</li>
            <li>Dashboards Personalizados</li>
            <li>Automatización de Reportes</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .services-section {
    padding: 5rem 1.5rem;
    background-color: white;
  }
  .services-container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  .section-header { margin-bottom: 3rem; }
  .subtitle { display: inline-block; margin-bottom: 0.5rem; color: var(--terracota-suave); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
  .section-header h2 { font-size: 2rem; color: var(--azul-petroleo); max-width: 600px; margin: 0 auto; }
  
  .services-grid {
    display: grid;
    gap: 2rem;
  }

  .service-card {
    position: relative;
    /* SOLUCIÓN 1: El contenedor padre ahora tiene el color de fondo */
    background-color: var(--marfil-claro);
    padding: 2px;
    border-radius: 16px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .service-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    /* SOLUCIÓN 2: Hemos añadido un color terracota extra al gradiente para hacerlo más rico */
    background: linear-gradient(135deg, var(--ciruela-profunda), var(--terracota-suave), var(--ambar-luminoso));
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
    z-index: 1;
  }
  .service-card:hover::before {
    opacity: 1;
  }
  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(44, 62, 80, 0.1);
  }

  .card-content {
    position: relative;
    /* SOLUCIÓN 3: El contenido interior es ahora transparente */
    background-color: transparent;
    padding: 2.5rem 2rem;
    border-radius: 14px;
    z-index: 2;
  }
  
  .icon-wrapper {
    width: 70px;
    height: 70px;
    background-color: var(--terracota-suave);
    border-radius: 50%;
    margin: 0 auto 1.5rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(230, 126, 34, 0.25);
  }
  .icon-wrapper svg { width: 36px; height: 36px; stroke: white; stroke-width: 1.5; }

  .service-card h3 { font-size: 1.5rem; margin-bottom: 1rem; color: var(--azul-petroleo); }
  .service-card p { color: var(--gris-grafito); line-height: 1.7; margin-bottom: 2rem; }

  .sub-services-list {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .sub-services-list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--gris-grafito);
    font-weight: 600;
  }
  .sub-services-list li::before {
    content: '✔';
    color: var(--terracota-suave);
    font-weight: 900;
  }

  @media (min-width: 768px) {
    .services-section { padding: 6rem 2rem; }
    .section-header h2 { font-size: 2.5rem; }
    .services-grid { grid-template-columns: repeat(3, 1fr); }
    .service-card { text-align: left; }
    .icon-wrapper { margin: 0 0 1.5rem 0; }
  }
</style>