<script>
  import { onMount, createEventDispatcher } from 'svelte';
  // SOLUCIÓN: Importar la transición 'fade'
  import { fade } from 'svelte/transition';
  
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
        <a href="#servicios">Servicios</a>
        <a href="#portafolio">Proyectos</a>
        <a href="#nosotros">Nosotros</a>
      </div>
      <button class="cta-button" on:click={() => dispatch('openContact')}>
        Hablemos
      </button>
    </div>
    
    <button class="hamburger-button" on:click={toggleMenu} aria-label="Abrir menú">
      <div class="bar" class:open={isMenuOpen}></div><div class="bar" class:open={isMenuOpen}></div><div class="bar" class:open={isMenuOpen}></div>
    </button>
  </div>
</nav>

{#if isMenuOpen}
  <div class="mobile-menu" transition:fade={{ duration: 300 }}>
    <a href="#servicios" on:click={toggleMenu}>Servicios</a>
    <a href="#portafolio" on:click={toggleMenu}>Proyectos</a>
    <a href="#nosotros" on:click={toggleMenu}>Nosotros</a>
    <button class="mobile-cta-button" on:click={() => { toggleMenu(); dispatch('openContact'); }}>
      Hablemos
    </button>
  </div>
{/if}

<style>
  .navbar { position: fixed; top: 0; left: 0; width: 100%; padding: 0.75rem 1.5rem; z-index: 1000; transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out; }
  .navbar.scrolled { background-color: var(--marfil-claro); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
  .navbar-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  .logo { display: flex; align-items: center; text-decoration: none; color: var(--azul-petroleo); }
  .logo img { height: 50px; }
  .logo span { display: none; }

  .desktop-nav { display: none; }
  .hamburger-button { display: flex; flex-direction: column; justify-content: space-around; width: 2rem; height: 2rem; background: transparent; border: none; cursor: pointer; padding: 0; z-index: 10; }
  .bar { width: 2rem; height: 0.25rem; background: var(--azul-petroleo); border-radius: 10px; transition: all 0.3s linear; position: relative; transform-origin: 1px; }
  .bar.open:nth-child(1) { transform: rotate(45deg); } .bar.open:nth-child(2) { opacity: 0; transform: translateX(20px); } .bar.open:nth-child(3) { transform: rotate(-45deg); }

  .mobile-menu { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: var(--marfil-claro); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 5; }
  .mobile-menu a { font-size: 2rem; font-family: var(--font-principal); color: var(--azul-petroleo); text-decoration: none; margin: 1.5rem 0; }
  
  .mobile-cta-button { font-size: 2rem; font-family: var(--font-principal); background-color: transparent; border: none; color: var(--terracota-suave); cursor: pointer; }

  @media (min-width: 768px) {
    .navbar { padding: 0.75rem 2rem; }
    .logo img { height: 55px; }
    .logo span { display: inline; font-family: var(--font-principal); font-size: 1.5rem; font-weight: 700; margin-left: 10px; }
    .hamburger-button { display: none; }
    .desktop-nav { display: flex; align-items: center; gap: 1rem; }
    .nav-links { display: flex; gap: 1rem; }
    .nav-links a { margin: 0 1rem; text-decoration: none; color: var(--azul-petroleo); font-weight: 600; position: relative; padding-bottom: 5px; transition: color 0.3s ease; }
    .nav-links a:hover { color: var(--terracota-suave); }
    .nav-links a::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: var(--terracota-suave); transition: width 0.3s ease; }
    .nav-links a:hover::after { width: 100%; }
    .cta-button { background-color: var(--terracota-suave); color: white; padding: 0.75rem 1.5rem; border-radius: 50px; text-decoration: none; font-weight: 700; transition: background-color 0.3s ease, transform 0.2s ease; border: none; cursor: pointer; font-size: 1rem; font-family: var(--font-secundaria); }
    .cta-button:hover { background-color: var(--ciruela-profunda); transform: translateY(-2px); }
  }
</style>