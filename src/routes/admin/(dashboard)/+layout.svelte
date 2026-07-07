<script>
  import { auth } from '$lib/firebase';
  import { signOut } from 'firebase/auth';
  import { page } from '$app/stores';

  let isSidebarOpen = false;

  async function handleLogout() {
    try {
      await signOut(auth);
      // La redirección será manejada por el Auth Guard en /admin/+layout.svelte
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
</script>

<div class="admin-layout">
  <!-- Sidebar -->
  <aside class="sidebar" class:open={isSidebarOpen}>
    <div class="sidebar-header">
      <div class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-brand-firefox"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 3a9 9 0 0 1 9 9" /><path d="M12 21a9 9 0 0 1 -9 -9" /></svg>
      </div>
      <span class="brand">Foxbyte Admin</span>
      <button class="close-sidebar" on:click={toggleSidebar}>✕</button>
    </div>

    <nav class="sidebar-nav">
      <a href="/admin" class:active={$page.url.pathname === '/admin'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
        Dashboard
      </a>
      <a href="/admin/servicios" class:active={$page.url.pathname.includes('/admin/servicios')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 4h-4v16h4" /><path d="M17 4h4v16h-4" /><path d="M8 16h.01" /><path d="M12 16h.01" /><path d="M16 16h.01" /></svg>
        Servicios
      </a>
      <a href="/admin/portafolio" class:active={$page.url.pathname.includes('/admin/portafolio')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
        Portafolio
      </a>
    </nav>
    
    <div class="sidebar-footer">
      <a href="/" target="_blank" class="view-site">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>
        Ver Sitio
      </a>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="main-content">
    <header class="topbar">
      <button class="menu-btn" on:click={toggleSidebar}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
      </button>
      <div class="topbar-right">
        <span class="user-email">{auth.currentUser?.email}</span>
        <button class="logout-btn" on:click={handleLogout}>Cerrar Sesión</button>
      </div>
    </header>

    <main class="content-wrapper">
      <slot />
    </main>
  </div>
  
  <!-- Overlay for mobile sidebar -->
  {#if isSidebarOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="sidebar-overlay" on:click={toggleSidebar}></div>
  {/if}
</div>

<style>
  .admin-layout {
    display: flex;
    min-height: 100vh;
    background-color: #f1f5f9;
    font-family: var(--font-principal, 'Montserrat', sans-serif);
  }

  /* Sidebar Styles */
  .sidebar {
    width: 260px;
    background-color: white;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    z-index: 50;
    transition: transform 0.3s ease;
  }

  .sidebar-header {
    height: 70px;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
    background: linear-gradient(to right, var(--azul-petroleo, #2C3E50), var(--ciruela-profunda, #5E3A6B));
    color: white;
  }

  .logo {
    color: var(--terracota-suave, #E67E22);
    display: flex;
    align-items: center;
    margin-right: 0.75rem;
  }

  .brand {
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
  }

  .close-sidebar {
    display: none;
    margin-left: auto;
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .sidebar-nav {
    padding: 1.5rem 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .sidebar-nav a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: var(--gris-grafito, #4A4A4A);
    text-decoration: none;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .sidebar-nav a:hover {
    background-color: #f8fafc;
    color: var(--azul-petroleo, #2C3E50);
  }

  .sidebar-nav a.active {
    background-color: rgba(230, 126, 34, 0.1);
    color: var(--terracota-suave, #E67E22);
  }
  
  .sidebar-footer {
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }
  
  .view-site {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background-color: #f1f5f9;
    color: var(--azul-petroleo, #2C3E50);
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }
  
  .view-site:hover {
    background-color: #e2e8f0;
  }

  /* Main Content Styles */
  .main-content {
    flex-grow: 1;
    margin-left: 260px;
    display: flex;
    flex-direction: column;
    min-width: 0; /* Prevent overflow */
  }

  .topbar {
    height: 70px;
    background-color: white;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    position: sticky;
    top: 0;
    z-index: 40;
  }

  .menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--azul-petroleo, #2C3E50);
    cursor: pointer;
    padding: 0.5rem;
  }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-left: auto;
  }

  .user-email {
    font-size: 0.9rem;
    color: var(--gris-grafito, #4A4A4A);
    font-weight: 600;
  }

  .logout-btn {
    background: none;
    border: 1px solid #e2e8f0;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    color: var(--azul-petroleo, #2C3E50);
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .logout-btn:hover {
    background-color: #fef2f2;
    color: #ef4444;
    border-color: #fecaca;
  }

  .content-wrapper {
    padding: 2rem;
    flex-grow: 1;
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 45;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .sidebar {
      transform: translateX(-100%);
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .main-content {
      margin-left: 0;
    }

    .menu-btn {
      display: block;
    }

    .close-sidebar {
      display: block;
    }

    .sidebar-overlay {
      display: block;
    }

    .user-email {
      display: none; /* Hide email on small screens to save space */
    }
    
    .content-wrapper {
      padding: 1.5rem 1rem;
    }
  }
</style>
