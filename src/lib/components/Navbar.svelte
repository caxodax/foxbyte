<script lang="ts">
  //Navbar.svelte
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { isContactModalOpen } from '$lib/contactStore';
  
  const dispatch = createEventDispatcher();

  let scrolled = false;
  let isMenuOpen = false;

  const toggleMenu = () => { isMenuOpen = !isMenuOpen; };
  const handleScroll = () => { scrolled = window.scrollY > 50; };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  });
</script>

<nav class="navbar" class:scrolled>
  <div class="navbar-container">
    <a href="/" class="logo"><img src="/fox-logo-sf.png" alt="Logo de Foxbyte" /><span>Foxbyte</span></a>
    
    <div class="desktop-nav">
      <div class="nav-links">
        <a href="/#servicios">Servicios</a>
        <a href="/#portafolio">Proyectos</a>
        <a href="/#propuesta-valor">Propuesta de Valor</a>
      </div>
      <button class="cta-button" on:click={() => isContactModalOpen.set(true)}>
        Solicitar diagnóstico
      </button>
    </div>
    
    <button class="hamburger-button" on:click={toggleMenu} aria-label="Abrir menú">
      <div class="bar" class:open={isMenuOpen}></div><div class="bar" class:open={isMenuOpen}></div><div class="bar" class:open={isMenuOpen}></div>
    </button>
  </div>
</nav>
 
{#if isMenuOpen}
  <div class="mobile-menu" transition:fade={{ duration: 300 }}>
    <div class="mobile-menu-content">
      <nav class="mobile-nav-links">
        <a href="/#servicios" on:click={toggleMenu} in:fly={{ y: 20, duration: 400, delay: 100 }}>
          Servicios
        </a>
        <a href="/#portafolio" on:click={toggleMenu} in:fly={{ y: 20, duration: 400, delay: 150 }}>
          Proyectos
        </a>
        <a href="/#propuesta-valor" on:click={toggleMenu} in:fly={{ y: 20, duration: 400, delay: 200 }}>
          Propuesta de Valor
        </a>
      </nav>
      <div class="mobile-menu-footer" in:fly={{ y: 20, duration: 400, delay: 300 }}>
        <button class="mobile-cta-button" on:click={() => { toggleMenu(); isContactModalOpen.set(true); }}>
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
  .navbar { position: fixed; top: 0; left: 0; width: 100%; padding: 0.75rem 1.5rem; z-index: 1000; transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out; }
  .navbar.scrolled { background-color: var(--marfil-claro); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
  .navbar-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  
  /* Text and Icon Colors - Default (Over video) */
  .logo { display: flex; align-items: center; text-decoration: none; color: white; transition: color 0.3s ease; }
  .logo img { height: 50px; transition: transform 0.3s ease; } /* Se eliminó el filtro para mantener su color original (naranja) */
  .logo img:hover { transform: scale(1.05); }
  .logo span { display: none; }

  /* Scrolled State */
  .navbar.scrolled .logo { color: var(--azul-petroleo); }

  .desktop-nav { display: none; }
  
  /* Botón Hamburguesa Premium */
  .hamburger-button { 
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    width: 32px; 
    height: 20px; 
    background: transparent; 
    border: none; 
    cursor: pointer; 
    padding: 0; 
    z-index: 10; 
    transition: transform 0.3s ease;
  }
  
  .hamburger-button:hover { transform: scale(1.05); }

  .bar { 
    width: 100%; 
    height: 2.5px; 
    background: white; 
    border-radius: 4px; 
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Animación elástica y fluida */
    position: relative; 
    transform-origin: left center; 
  }
  .navbar.scrolled .bar { background: var(--azul-petroleo); }
  
  .bar.open:nth-child(1) { transform: rotate(45deg); width: 110%; } 
  .bar.open:nth-child(2) { width: 0; opacity: 0; } 
  .bar.open:nth-child(3) { transform: rotate(-45deg); width: 110%; }

  /* Menú Móvil Mejorado - Premium & Dark */
  .mobile-menu { 
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100vh; 
    background: rgba(13, 27, 42, 0.96); /* Azul oscuro corporativo casi opaco */
    backdrop-filter: blur(25px); /* Efecto cristal fuerte */
    -webkit-backdrop-filter: blur(25px);
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; /* Alineado a la izquierda para más elegancia */
    justify-content: flex-start; 
    z-index: 5; 
    padding: 2rem;
    box-sizing: border-box;
  }
  
  .mobile-menu-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding-top: 6rem; /* Espacio para el header/logo/hamburguesa */
  }

  .mobile-nav-links {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .mobile-menu a { 
    font-size: 2.5rem; /* Letra más grande y protagonista */
    font-family: var(--font-principal); 
    color: white; 
    text-decoration: none; 
    font-weight: 700;
    transition: color 0.3s ease, transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .mobile-menu a:hover {
    color: var(--terracota-suave);
    transform: translateX(10px);
  }
  
  .mobile-menu-footer {
    margin-top: auto;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }

  .mobile-cta-button { 
    font-size: 1.2rem; 
    font-family: var(--font-principal); 
    background-color: var(--terracota-suave); 
    border: none; 
    color: white; 
    cursor: pointer; 
    font-weight: 700;
    padding: 1.2rem;
    border-radius: 50px;
    transition: transform 0.3s ease, background-color 0.3s ease;
    width: 100%;
    text-align: center;
  }
  
  .mobile-cta-button:hover { 
    background-color: #E67E22;
    transform: translateY(-3px); 
  }

  .mobile-contact-info {
    text-align: center;
  }

  .mobile-contact-info a {
    font-size: 1.1rem;
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
    .navbar { padding: 0.75rem 2rem; }
    .logo img { height: 55px; }
    .logo span { display: inline; font-family: var(--font-principal); font-size: 1.5rem; font-weight: 700; margin-left: 10px; }
    .hamburger-button { display: none; }
    .desktop-nav { display: flex; align-items: center; gap: 1rem; }
    .nav-links { display: flex; gap: 1rem; }
    
    .nav-links a { margin: 0 1rem; text-decoration: none; color: white; font-weight: 600; position: relative; padding-bottom: 5px; transition: color 0.3s ease; }
    .navbar.scrolled .nav-links a { color: var(--azul-petroleo); }
    
    .nav-links a:hover { color: var(--terracota-suave); }
    .nav-links a::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: var(--terracota-suave); transition: width 0.3s ease; }
    .nav-links a:hover::after { width: 100%; }
    
    .cta-button { background-color: var(--terracota-suave); color: white; padding: 0.75rem 1.5rem; border-radius: 50px; text-decoration: none; font-weight: 700; transition: background-color 0.3s ease, transform 0.2s ease; border: none; cursor: pointer; font-size: 1rem; font-family: var(--font-secundaria); }
    .cta-button:hover { background-color: var(--ciruela-profunda); transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
  }
</style>