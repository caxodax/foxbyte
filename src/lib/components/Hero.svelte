<script>
  import { fade, fly } from 'svelte/transition';
</script>

<section class="hero-section">
  <div class="hero-container">
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
    min-height: 100vh; /* Ocupa al menos toda la altura de la pantalla */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 2rem; /* Espaciado lateral para móviles */
    background-color: var(--marfil-claro);
  }

  .hero-container {
    max-width: 800px; /* Limita el ancho del texto para mejor legibilidad */
  }

  h1 {
    font-size: 3.5rem; /* Tamaño grande e impactante */
    line-height: 1.2;
    margin-bottom: 1rem;
    color: var(--azul-petroleo);
  }

  p {
    font-size: 1.25rem;
    color: var(--gris-grafito); /* Usamos gris para el subtítulo, creando jerarquía */
    margin-bottom: 2.5rem;
  }

  .cta-group {
    display: flex;
    justify-content: center;
    gap: 1rem; /* Espacio entre los botones */
  }

  .hero-button {
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 700;
    font-family: var(--font-principal);
    border: 2px solid transparent; /* Borde base para evitar saltos en hover */
    transition: all 0.3s ease;
  }

  .hero-button.primary {
    background-color: var(--terracota-suave);
    color: white;
  }

  .hero-button.primary:hover {
    background-color: var(--ciruela-profunda);
    transform: translateY(-3px);
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

  /* --- Media Query para Responsividad --- */
  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.1rem;
    }
    .cta-group {
      flex-direction: column; /* Apila los botones en pantallas pequeñas */
      align-items: center;
    }
    .hero-button {
      width: 100%;
      max-width: 300px;
    }
  }
</style>