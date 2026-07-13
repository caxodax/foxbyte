<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { isContactModalOpen } from '$lib/contactStore';

  let videoEl: HTMLVideoElement;

  onMount(() => {
    if (videoEl) {
      // Forzar explícitamente el mute y play para Safari (iOS)
      videoEl.muted = true;
      videoEl.play().catch((err) => console.log("Autoplay evitado por el navegador:", err));
    }
  });
</script>

<section class="hero-section">
  <!-- Text Column -->
  <div class="hero-text-column">
    <div class="text-wrapper">
      <span class="hero-tagline" in:fly={{ y: 20, duration: 800, delay: 100 }}>
        Software · Automatización · Productos digitales
      </span>

      <h1 in:fly={{ y: 30, duration: 800, delay: 300 }}>
        Construimos tecnología que convierte procesos complejos en crecimiento.
      </h1>
      
      <p class="hero-description" in:fade={{ duration: 800, delay: 600 }}>
        Diseñamos plataformas web, sistemas internos y automatizaciones para empresas que buscan reducir tareas manuales, mejorar su operación y escalar con una base tecnológica sólida.
      </p>

      <div class="cta-group" in:fade={{ duration: 800, delay: 800 }}>
        <a href="#contacto" on:click|preventDefault={() => isContactModalOpen.set(true)} class="hero-button primary">Solicitar diagnóstico</a>
        <a href="/#portafolio" class="hero-button secondary">Ver proyectos</a>
      </div>

      <p class="hero-trust-text" in:fade={{ duration: 800, delay: 1000 }}>
        Analizamos tu necesidad y te mostramos una ruta clara antes de comenzar.
      </p>
    </div>
  </div>

  <!-- Video Column -->
  <div class="hero-video-column">
    <video 
      bind:this={videoEl}
      src="/hero.mp4" 
      autoplay 
      loop 
      muted 
      playsinline 
      preload="auto"
      class="hero-video">
    </video>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column-reverse; /* Móvil: Video arriba, Texto abajo */
    background-color: var(--azul-petroleo, #0d1b2a); /* Fallback */
    overflow: hidden;
    font-family: var(--font-principal, system-ui, sans-serif);
  }

  .hero-text-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 5% 4rem 5%;
    z-index: 2;
    position: relative;
    background-image: url('/hero-text-bg.png');
    background-size: cover;
    background-position: center;
  }

  /* Capa superpuesta para oscurecer el fondo y asegurar legibilidad */
  .hero-text-column::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(13, 27, 42, 0.7); /* Azul oscuro semitransparente */
    z-index: -1; /* Para que quede detrás del texto */
  }

  .text-wrapper {
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
  }

  .hero-video-column {
    position: relative;
    width: 100%;
    min-height: 45vh; /* Altura del video en móvil */
    z-index: 1;
  }

  .hero-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .hero-tagline {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--terracota-suave, #FF6B00);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.2rem;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.15;
    color: white;
    font-weight: 800;
    margin: 0 0 1.5rem 0;
  }

  .hero-description {
    font-size: clamp(1rem, 2vw, 1.15rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 2.2rem;
    font-weight: 400;
  }

  .cta-group {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .hero-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1rem;
    width: 100%; /* Botones ancho completo en móvil */
  }

  .hero-button.primary {
    background-color: var(--terracota-suave, #F39C12);
    color: white;
  }

  .hero-button.primary:hover {
    background-color: #E67E22;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(243, 156, 18, 0.3);
  }

  .hero-button.secondary {
    background-color: transparent;
    color: white;
    border: 2px solid white;
  }
  
  .hero-button.secondary:hover {
    background-color: white;
    color: black;
    transform: translateY(-2px);
  }

  .hero-trust-text {
    display: block;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 1.2rem;
    font-weight: 400;
    line-height: 1.4;
  }

  /* Desktop Layout */
  @media (min-width: 1024px) {
    .hero-section {
      flex-direction: row; /* Lado a lado en PC */
    }

    .hero-text-column {
      flex: 0 0 50%;
      padding: 0 5% 0 8%;
      /* Offset visual for navbar */
      padding-top: 80px; 
    }

    .text-wrapper {
      margin: 0 0 0 auto;
      max-width: 650px;
    }

    .hero-video-column {
      flex: 0 0 50%;
      min-height: 100vh;
    }

    .hero-button {
      width: auto; /* Restaurar ancho automático en PC */
      padding: 1rem 2.5rem;
    }
  }
</style>