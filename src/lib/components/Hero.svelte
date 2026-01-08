<script lang="ts">
  //Hero.svelte
  import { fade, fly } from 'svelte/transition';
  import HeroBackground from './HeroBackground.svelte';
</script>

<section class="hero-section">
  <HeroBackground />
  
  <div class="hero-content">
    <h1 in:fly={{ y: 20, duration: 800, delay: 300 }}>
      Transformamos negocios con precisión técnica e instinto innovador
    </h1>
    <p in:fly={{ y: 20, duration: 800, delay: 500 }}>
      Construido con precisión. Impulsado por instinto.
    </p>
    <div class="cta-group" in:fade={{ duration: 800, delay: 700 }}>
      <a href="#contacto" class="hero-button primary">Hablemos de tu Proyecto</a>
      <a href="#servicios" class="hero-button secondary">Ver Nuestros Servicios</a>
    </div>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    /* SOLUCIÓN 1: Añadimos padding en la parte superior para dejar espacio al Navbar en TODAS las pantallas */
    /* Este valor (aprox. 100px) debe ser un poco mayor que la altura de tu Navbar */
    padding: 100px 1.5rem 2rem 1.5rem; 
    background-color: var(--marfil-claro);
    overflow: hidden;
    box-sizing: border-box; /* Asegura que el padding se incluya en la altura total */
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
  }

  /* SOLUCIÓN 2: Hacemos el título un poco más pequeño en móvil para mejor ajuste */
  h1 {
    font-size: 2.5rem; 
    line-height: 1.2;
    margin-bottom: 1rem;
    color: var(--azul-petroleo);
  }

  p {
    font-size: 1.1rem;
    color: var(--gris-grafito);
    margin-bottom: 2.5rem;
  }

  .cta-group {
    display: flex;
    flex-direction: column; /* Apilamos los botones por defecto (Mobile-First) */
    align-items: center;
    gap: 1rem;
  }

  .hero-button {
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 700;
    font-family: var(--font-principal);
    border: 2px solid transparent;
    transition: all 0.3s ease;
    width: 100%; /* Hacemos que los botones ocupen el ancho disponible */
    max-width: 350px; /* Pero con un máximo para que no se vean enormes */
  }

  .hero-button.primary {
    background-color: var(--terracota-suave);
    color: white;
    box-shadow: 0 5px 15px rgba(230, 126, 34, 0.3);
  }

  .hero-button.primary:hover {
    background-color: var(--ciruela-profunda);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(142, 68, 173, 0.3);
  }
  
  .hero-button.secondary {
    background-color: transparent;
    color: var(--azul-petroleo);
    border-color: var(--azul-petroleo);
  }

  .hero-button.secondary:hover {
    background-color: var(--azul-petroleo);
    color: var(--marfil-claro);
    transform: translateY(-3px);
  }

  /* --- MEDIA QUERY PARA ESCRITORIOS --- */
  /* Ajustes para pantallas más grandes que las de un móvil típico */
  @media (min-width: 768px) {
    .hero-section {
        padding: 0 2rem; /* Eliminamos el padding superior e inferior extra */
    }

    h1 {
      font-size: 3.5rem; /* Devolvemos el tamaño grande al título */
    }

    p {
      font-size: 1.25rem; /* Devolvemos el tamaño grande al párrafo */
    }
    
    .cta-group {
      flex-direction: row; /* Ponemos los botones en fila */
      justify-content: center;
    }

    .hero-button {
      width: auto; /* Dejamos que el ancho se ajuste al contenido */
    }
  }
</style>