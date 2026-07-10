<script lang="ts">
  import { fade, fly } from 'svelte/transition';
</script>

<section class="hero-section">
  <!-- Text Column -->
  <div class="hero-text-column">
    <div class="text-wrapper">
      <h1 in:fly={{ y: 30, duration: 800, delay: 300 }}>
        Transformamos<br/>negocios con<br/>Precisión
      </h1>
      
      <p class="hero-description" in:fade={{ duration: 800, delay: 600 }}>
        "Construido con precisión. Impulsado por instinto. Creemos en llevar tu negocio al futuro, diseñando experiencias únicas que combinan tecnología avanzada y creatividad. No hay nada más emocionante que materializar tu visión en el universo digital."
      </p>

      <div class="cta-group" in:fade={{ duration: 800, delay: 800 }}>
        <a href="#contacto" class="hero-button primary">Comenzar</a>
        <a href="#servicios" class="hero-button secondary">
          Explorar servicios 
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </a>
      </div>
    </div>
  </div>

  <!-- Video Column -->
  <div class="hero-video-column">
    <video src="/hero.mp4" autoplay loop muted playsinline class="hero-video"></video>
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

  h1 {
    font-size: 2.8rem;
    line-height: 1.1;
    color: white;
    font-weight: 800;
    margin: 0 0 1.5rem 0;
  }

  .hero-description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 2.5rem;
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
      max-width: 550px;
    }

    .hero-video-column {
      flex: 0 0 50%;
      min-height: 100vh;
    }

    h1 {
      font-size: 4.5rem;
    }

    .hero-description {
      font-size: 1.2rem;
    }

    .hero-button {
      width: auto; /* Restaurar ancho automático en PC */
      padding: 1rem 2.5rem;
    }
  }
</style>