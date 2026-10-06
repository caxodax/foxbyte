<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { isContactModalOpen } from '$lib/contactStore';

  let videoEl: HTMLVideoElement;
  let isVideoPlaying = true;

  onMount(() => {
    if (videoEl) {
      // Respetar preferencia de reducción de movimiento del usuario
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        videoEl.pause();
        isVideoPlaying = false;
      } else {
        videoEl.muted = true;
        videoEl.play()
          .then(() => {
            isVideoPlaying = true;
          })
          .catch((err) => {
            console.log("Autoplay evitado por el navegador:", err);
            isVideoPlaying = false;
          });
      }
    }
  });

  function toggleVideo() {
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play();
      isVideoPlaying = true;
    } else {
      videoEl.pause();
      isVideoPlaying = false;
    }
  }
</script>

<section class="hero-section" aria-label="Introducción a Foxbyte">
  <!-- Living Background Video with Gradient Vignette (Inspirado en foxbyte.nz) -->
  <div class="hero-media-wrapper" aria-hidden="true">
    <video
      bind:this={videoEl}
      src="/hero.mp4"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
      poster="/hero-text-bg.webp"
      class="hero-video"
    >
    </video>
    <div class="hero-overlay"></div>
  </div>

  <!-- Foreground Content -->
  <div class="hero-content-wrapper">
    <div class="hero-container">
      <!-- Status pill: Equipo senior directo sin jerarquía artificial -->
      <div class="hero-status-pill" in:fade={{ duration: 600, delay: 100 }}>
        <span class="status-indicator"></span>
        <span class="status-text">Ingeniería directa · Disponibilidad proyectos Q2/Q3</span>
      </div>

      <!-- Main Headline: Titular autoritario y concreto -->
      <h1 in:fly={{ y: 24, duration: 800, delay: 200 }}>
        Software a medida, automatización e IA construidos para empresas
      </h1>

      <!-- Value Proposition: Propuesta clara y técnica -->
      <p class="hero-description" in:fade={{ duration: 800, delay: 400 }}>
        Diseñamos plataformas digitales, sistemas internos y soluciones de inteligencia artificial aplicada que eliminan la fricción operativa y multiplican la escala de tu negocio.
      </p>

      <!-- High-craft CTA pill group -->
      <div class="cta-group" in:fade={{ duration: 800, delay: 600 }}>
        <button
          type="button"
          on:click={() => isContactModalOpen.set(true)}
          class="hero-button primary"
        >
          <span>Solicitar diagnóstico</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>

        <a href="/#portafolio" class="hero-button secondary">
          <span>Ver proyectos</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
      </div>

      <!-- Engineering Pillars / Micro-proof sin métricas artificiales -->
      <div class="hero-pillars" in:fade={{ duration: 800, delay: 800 }}>
        <div class="pillar-item">
          <span class="pillar-dot"></span>
          <span>Trato directo con ingenieros</span>
        </div>
        <div class="pillar-item">
          <span class="pillar-dot"></span>
          <span>Código 100% propietario y auditable</span>
        </div>
        <div class="pillar-item">
          <span class="pillar-dot"></span>
          <span>Arquitectura escalable en la nube</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Video Control Accesible -->
  <button
    type="button"
    class="video-control"
    on:click={toggleVideo}
    aria-label={isVideoPlaying ? "Pausar video de fondo" : "Reproducir video de fondo"}
    title={isVideoPlaying ? "Pausar video" : "Reproducir video"}
  >
    {#if isVideoPlaying}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
      </svg>
      <span>Pausar</span>
    {:else}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
      <span>Reproducir</span>
    {/if}
  </button>
</section>

<style>
  .hero-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #070B14;
    overflow: hidden;
    font-family: var(--font-principal, system-ui, sans-serif);
  }

  /* Living Background Video */
  .hero-media-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
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
    filter: brightness(0.48) contrast(1.15) saturate(1.1);
    transform: scale(1.02);
  }

  /* Obsidian Gradient Vignette - Conecta fluidamente con el fondo de Clientes (#0F172A) */
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 50% 30%, rgba(7, 11, 20, 0.45) 0%, rgba(7, 11, 20, 0.85) 65%, #070B14 100%),
      linear-gradient(to bottom, rgba(7, 11, 20, 0.5) 0%, rgba(7, 11, 20, 0.65) 45%, rgba(15, 23, 42, 0.95) 85%, #0F172A 100%);
    pointer-events: none;
  }

  /* Foreground Content */
  .hero-content-wrapper {
    position: relative;
    z-index: 3;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 7.5rem 1.5rem 4.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .hero-container {
    max-width: 900px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Status Pill */
  .hero-status-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.45rem 1.15rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--color-primary, #FF5A00);
    box-shadow: 0 0 10px var(--color-primary, #FF5A00);
    animation: status-pulse 2s infinite ease-in-out;
  }

  @keyframes status-pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.4;
      transform: scale(0.85);
    }
  }

  .status-text {
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
  }

  /* Headline */
  h1 {
    font-size: clamp(2.35rem, 5.5vw, 4.25rem);
    line-height: 1.08;
    color: #FFFFFF;
    font-weight: 800;
    margin: 0 0 1.5rem 0;
    letter-spacing: -0.035em;
    max-width: 24ch;
    text-wrap: balance;
  }

  /* Description */
  .hero-description {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.78);
    margin-bottom: 2.5rem;
    font-weight: 400;
    max-width: 65ch;
    text-wrap: pretty;
  }

  /* CTA Buttons */
  .cta-group {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 3.5rem;
    width: 100%;
  }

  .hero-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    padding: 0.95rem 2.3rem;
    border-radius: 9999px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    font-size: 1rem;
    cursor: pointer;
    border: none;
    font-family: inherit;
  }

  .hero-button:active {
    transform: scale(0.97);
  }

  .hero-button.primary {
    background-color: var(--color-primary, #FF5A00);
    color: #FFFFFF;
    box-shadow: 0 4px 20px rgba(255, 90, 0, 0.35);
  }

  .hero-button.primary:hover {
    background-color: var(--color-primary-hover, #E04E00);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255, 90, 0, 0.5);
  }

  .hero-button.secondary {
    background-color: rgba(255, 255, 255, 0.06);
    color: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .hero-button.secondary:hover {
    background-color: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  /* Engineering Pillars */
  .hero-pillars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    width: 100%;
    max-width: 820px;
  }

  .pillar-item {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.65);
    font-weight: 400;
  }

  .pillar-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
  }

  /* Video Control */
  .video-control {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 10;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.85rem;
    border-radius: 9999px;
    background: rgba(7, 11, 20, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .video-control:hover {
    background: rgba(7, 11, 20, 0.95);
    color: #FFFFFF;
    border-color: rgba(255, 255, 255, 0.35);
  }

  /* Mobile Layout */
  @media (max-width: 640px) {
    .hero-content-wrapper {
      padding: 6.5rem 1.25rem 3.5rem 1.25rem;
    }

    h1 {
      max-width: 100%;
      text-wrap: pretty;
    }

    .cta-group {
      flex-direction: column;
      gap: 0.85rem;
      margin-bottom: 2.5rem;
    }

    .hero-button {
      width: 100%;
    }

    .hero-pillars {
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-start;
      text-align: left;
      padding-left: 0.5rem;
    }

    .video-control {
      bottom: 1rem;
      right: 1rem;
      padding: 0.35rem 0.7rem;
      font-size: 0.7rem;
    }
  }
</style>