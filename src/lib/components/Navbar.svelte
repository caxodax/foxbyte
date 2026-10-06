<script lang="ts">
  // Navbar.svelte - Foxbyte Studio UI/UX Pro Max Optimized
  import { fade, fly } from 'svelte/transition';
  import { page } from '$app/stores';
  import { isContactModalOpen } from '$lib/contactStore';

  let y = 0;
  let isMenuOpen = false;

  $: scrolled = y > 25;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  function handleAnchorClick(e: MouseEvent, targetId: string) {
    if ($page.url.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', `/#${targetId}`);
      }
    }
  }

  // Bloquear el scroll del body cuando el menú móvil está abierto
  $: if (typeof document !== 'undefined') {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMenuOpen) {
      isMenuOpen = false;
    }
  };
</script>

<svelte:window bind:scrollY={y} on:keydown={handleKeydown} />

<nav class="navbar" class:scrolled aria-label="Navegación principal">
  <div class="navbar-container">
    <a href="/" class="logo" aria-label="Ir a la página de inicio de Foxbyte">
      <img src="/fox-logo-sf.png" alt="Logo de Foxbyte" />
      <span>Foxbyte</span>
    </a>
    
    <div class="desktop-nav">
      <div class="nav-links">
        <a href="/#servicios" on:click={(e) => handleAnchorClick(e, 'servicios')}>Servicios</a>
        <a href="/#portafolio" on:click={(e) => handleAnchorClick(e, 'portafolio')}>Proyectos</a>
        <a href="/#propuesta-valor" on:click={(e) => handleAnchorClick(e, 'propuesta-valor')}>Propuesta de Valor</a>
      </div>
      <button 
        type="button" 
        class="cta-button" 
        on:click={() => isContactModalOpen.set(true)}
      >
        Solicitar diagnóstico
      </button>
    </div>
    
    <button 
      type="button"
      class="hamburger-button" 
      on:click={toggleMenu} 
      aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
      aria-expanded={isMenuOpen}
    >
      <div class="bar" class:open={isMenuOpen}></div>
      <div class="bar" class:open={isMenuOpen}></div>
      <div class="bar" class:open={isMenuOpen}></div>
    </button>
  </div>
</nav>
 
{#if isMenuOpen}
  <div class="mobile-menu" transition:fade|local={{ duration: 250 }}>
    <div class="mobile-menu-content">
      <nav class="mobile-nav-links" aria-label="Enlaces de navegación móvil">
        <a href="/#servicios" on:click={(e) => { toggleMenu(); handleAnchorClick(e, 'servicios'); }} in:fly|local={{ y: 20, duration: 350, delay: 50 }}>
          Servicios
        </a>
        <a href="/#portafolio" on:click={(e) => { toggleMenu(); handleAnchorClick(e, 'portafolio'); }} in:fly|local={{ y: 20, duration: 350, delay: 100 }}>
          Proyectos
        </a>
        <a href="/#propuesta-valor" on:click={(e) => { toggleMenu(); handleAnchorClick(e, 'propuesta-valor'); }} in:fly|local={{ y: 20, duration: 350, delay: 150 }}>
          Propuesta de Valor
        </a>
      </nav>
      <div class="mobile-menu-footer" in:fly|local={{ y: 20, duration: 350, delay: 200 }}>
        <button 
          type="button"
          class="mobile-cta-button" 
          on:click={() => { toggleMenu(); isContactModalOpen.set(true); }}
        >
          Solicitar diagnóstico
        </button>
        <div class="mobile-contact-info">
          <a href="mailto:luismontesg145@gmail.com">luismontesg145@gmail.com</a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .navbar { 
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    max-width: 100%;
    box-sizing: border-box;
    padding: 0.85rem 1.5rem; 
    z-index: 1000; 
    transition: background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                backdrop-filter 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1); 
    border-bottom: 1px solid transparent;
  }
  
  .navbar.scrolled { 
    background-color: rgba(7, 11, 20, 0.92); 
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5); 
    border-bottom-color: rgba(255, 255, 255, 0.08);
  }
  
  .navbar-container { 
    max-width: 1200px; 
    margin: 0 auto; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
  }
  
  /* Text and Icon Colors - Default */
  .logo { 
    display: flex; 
    align-items: center; 
    text-decoration: none; 
    color: white; 
    transition: transform 0.25s ease, opacity 0.2s ease; 
  }
  .logo:active {
    transform: scale(0.97);
  }
  .logo img { 
    height: 48px; 
    transition: transform 0.25s ease; 
  }
  .logo:hover img { 
    transform: scale(1.05); 
  }
  .logo span { 
    display: none; 
  }

  /* Scrolled State */
  .navbar.scrolled .logo { 
    color: #FFFFFF; 
  }

  .desktop-nav { 
    display: none; 
  }
  
  /* Botón Hamburguesa Accesible */
  .hamburger-button { 
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    width: 32px; 
    height: 22px; 
    background: transparent; 
    border: none; 
    cursor: pointer; 
    padding: 2px; 
    z-index: 1001; 
    transition: transform 0.2s ease;
    border-radius: var(--radius-sm);
  }
  
  .hamburger-button:hover { 
    transform: scale(1.05); 
  }
  .hamburger-button:active {
    transform: scale(0.95);
  }

  .bar { 
    width: 100%; 
    height: 2.5px; 
    background: white; 
    border-radius: 4px; 
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); 
    position: relative; 
    transform-origin: left center; 
  }
  .navbar.scrolled .bar { 
    background: white; 
  }
  
  .bar.open:nth-child(1) { 
    transform: rotate(45deg); 
    width: 110%; 
    background: white !important;
  } 
  .bar.open:nth-child(2) { 
    width: 0; 
    opacity: 0; 
  } 
  .bar.open:nth-child(3) { 
    transform: rotate(-45deg); 
    width: 110%; 
    background: white !important;
  }

  /* Menú Móvil - Estilo Glassmorphism Premium */
  .mobile-menu { 
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100vh; 
    background: rgba(11, 15, 23, 0.96); 
    backdrop-filter: blur(25px); 
    -webkit-backdrop-filter: blur(25px);
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    justify-content: flex-start; 
    z-index: 999; 
    padding: 2rem;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  .mobile-menu-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding-top: 6rem;
  }

  .mobile-nav-links {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .mobile-menu a { 
    font-size: 2.2rem; 
    font-family: var(--font-display); 
    color: white; 
    text-decoration: none; 
    font-weight: 700;
    transition: color 0.25s ease, transform 0.25s ease;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    letter-spacing: -0.02em;
  }
  
  .mobile-menu a:hover {
    color: var(--color-primary);
    transform: translateX(8px);
  }
  .mobile-menu a:active {
    transform: translateX(4px) scale(0.98);
  }
  
  .mobile-menu-footer {
    margin-top: auto;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  .mobile-cta-button { 
    font-size: 1.1rem; 
    font-family: var(--font-display); 
    background-color: var(--color-primary); 
    border: none; 
    color: white; 
    cursor: pointer; 
    font-weight: 700;
    padding: 1.1rem;
    border-radius: var(--radius-full);
    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
    width: 100%;
    text-align: center;
    box-shadow: 0 4px 14px rgba(255, 90, 0, 0.35);
  }
  
  .mobile-cta-button:hover { 
    background-color: var(--color-primary-hover);
    transform: translateY(-2px); 
    box-shadow: 0 6px 20px rgba(255, 90, 0, 0.45);
  }
  .mobile-cta-button:active {
    transform: scale(0.98);
  }

  .mobile-contact-info {
    text-align: center;
  }

  .mobile-contact-info a {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: underline;
    display: inline-block;
    margin: 0;
  }
  .mobile-contact-info a:hover {
    color: white;
    transform: none;
  }

  @media (min-width: 768px) {
    .navbar { padding: 0.85rem 2rem; }
    .logo img { height: 52px; }
    .logo span { 
      display: inline; 
      font-family: var(--font-display); 
      font-size: 1.45rem; 
      font-weight: 800; 
      margin-left: 10px; 
      letter-spacing: -0.03em;
    }
    .hamburger-button { display: none; }
    .desktop-nav { display: flex; align-items: center; gap: 1.5rem; }
    .nav-links { display: flex; gap: 0.5rem; }
    
    .nav-links a { 
      margin: 0 0.85rem; 
      text-decoration: none; 
      color: rgba(255, 255, 255, 0.9); 
      font-weight: 600; 
      font-size: 0.95rem;
      position: relative; 
      padding-bottom: 6px; 
      transition: color 0.25s ease; 
    }
    .navbar.scrolled .nav-links a { 
      color: var(--color-text-primary); 
    }
    
    .nav-links a:hover { 
      color: var(--color-primary); 
    }
    .nav-links a::after { 
      content: ''; 
      position: absolute; 
      bottom: 0; 
      left: 0; 
      width: 100%; 
      height: 2.5px; 
      background-color: var(--color-primary); 
      border-radius: 2px;
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1); 
    }
    .nav-links a:hover::after { 
      transform: scaleX(1); 
    }
    
    .cta-button { 
      background-color: var(--color-primary); 
      color: white; 
      padding: 0.65rem 1.6rem; 
      border-radius: var(--radius-full); 
      text-decoration: none; 
      font-weight: 700; 
      font-size: 0.95rem; 
      font-family: var(--font-body); 
      border: none; 
      cursor: pointer; 
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); 
      box-shadow: 0 2px 10px rgba(255, 90, 0, 0.3);
    }
    .cta-button:hover { 
      background-color: var(--color-primary-hover); 
      transform: translateY(-2px); 
      box-shadow: 0 6px 18px rgba(255, 90, 0, 0.4); 
    }
    .cta-button:active {
      transform: scale(0.97);
    }
  }
</style>