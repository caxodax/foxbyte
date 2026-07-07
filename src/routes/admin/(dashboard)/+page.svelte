<script>
  // admin/(dashboard)/+page.svelte
</script>

<svelte:head>
  <title>Dashboard - Foxbyte Admin</title>
</svelte:head>

<div class="dashboard-header">
  <div>
    <h1>Resumen del Sistema</h1>
    <p class="subtitle">Bienvenido al panel de administración de Foxbyte.</p>
  </div>
</div>

<div class="dashboard-grid">
  <!-- Card: Accesos Rápidos -->
  <div class="dashboard-card">
    <div class="card-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" /></svg>
    </div>
    <h2>Accesos Rápidos</h2>
    <p>Gestiona el contenido principal de tu landing page.</p>
    <div class="quick-links">
      <a href="/admin/servicios" class="quick-link">
        <span>Gestionar Servicios</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
      </a>
      <a href="/admin/portafolio" class="quick-link">
        <span>Gestionar Portafolio</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
      </a>
    </div>
  </div>

  <!-- Card: Info del Sistema -->
  <div class="dashboard-card">
    <div class="card-icon blue">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
    </div>
    <h2>Información</h2>
    <p>Este panel está conectado en tiempo real a tu base de datos de Firebase. Cualquier cambio que guardes se reflejará instantáneamente en el sitio web público.</p>
    <ul class="info-list">
      <li><strong>Base de Datos:</strong> Firestore</li>
      <li><strong>Autenticación:</strong> Firebase Auth</li>
      <li><strong>Framework:</strong> SvelteKit</li>
    </ul>
  </div>
</div>

<style>
  .dashboard-header {
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 1.8rem;
    color: var(--azul-petroleo, #2C3E50);
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: var(--gris-grafito, #4A4A4A);
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .dashboard-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid #e2e8f0;
  }

  .card-icon {
    width: 48px;
    height: 48px;
    background-color: rgba(230, 126, 34, 0.1);
    color: var(--terracota-suave, #E67E22);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .card-icon.blue {
    background-color: rgba(44, 62, 80, 0.1);
    color: var(--azul-petroleo, #2C3E50);
  }

  .dashboard-card h2 {
    font-size: 1.25rem;
    color: var(--azul-petroleo, #2C3E50);
    margin-bottom: 0.75rem;
  }

  .dashboard-card p {
    color: var(--gris-grafito, #4A4A4A);
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .quick-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .quick-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    text-decoration: none;
    color: var(--azul-petroleo, #2C3E50);
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .quick-link:hover {
    background-color: white;
    border-color: var(--terracota-suave, #E67E22);
    box-shadow: 0 4px 6px -1px rgba(230, 126, 34, 0.1);
    transform: translateY(-2px);
  }
  
  .info-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .info-list li {
    font-size: 0.95rem;
    color: var(--gris-grafito, #4A4A4A);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #f1f5f9;
  }
  
  .info-list li:last-child {
    border-bottom: none;
  }
</style>
