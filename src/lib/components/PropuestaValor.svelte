<script>
  import { fly } from 'svelte/transition';
</script>

<section id="nosotros" class="about-section">
  <div class="about-container">
    <div class="about-grid">
      <div class="about-image">
        <!-- REEMPLAZA ESTA IMAGEN POR UNA QUE REPRESENTE TU MARCA -->
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1587&auto=format&fit=crop" 
          alt="Equipo y tecnología de Foxbyte" 
        />
      </div>
      <div class="about-content" in:fly={{ x: 50, duration: 800, delay: 300 }}>
        <span class="subtitle">Nuestra Filosofía</span>
        <h2>Somos tu aliado estratégico, no solo un proveedor.</h2>
        <p>
          En Foxbyte, no solo construimos software; creamos soluciones. Nuestro enfoque único combina una <strong>precisión técnica rigurosa</strong> con un <strong>instinto innovador</strong> para anticipar las necesidades del mañana.
        </p>
        <p>
          Entendemos que cada negocio es diferente. Por eso, nos sumergimos en tus procesos para actuar como un verdadero socio tecnológico, transformando tus desafíos en ventajas competitivas a través de software a medida, infraestructura robusta y análisis inteligente.
        </p>
        <a href="#contacto" class="cta-button">Conoce cómo podemos ayudarte</a>
      </div>
    </div>
  </div>
</section>

<style>
  /* --- ESTILOS BASE (MOBILE-FIRST) --- */
  .about-section {
    padding: 5rem 1.5rem;
    background-color: white; /* Volvemos al blanco para crear contraste */
  }

  .about-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .about-grid {
    display: grid;
    gap: 3rem;
  }

  .about-image {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(44, 62, 80, 0.1);
  }

  .about-image img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Asegura que la imagen cubra todo el contenedor sin deformarse */
  }

  .subtitle {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--terracota-suave);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .about-content h2 {
    font-size: 2rem;
    color: var(--azul-petroleo);
    margin-bottom: 1.5rem;
  }

  .about-content p {
    color: var(--gris-grafito);
    line-height: 1.8; /* Un poco más de espacio entre líneas para mejor legibilidad */
    margin-bottom: 1.5rem;
  }

  .about-content p strong {
    color: var(--azul-petroleo); /* Resaltamos las palabras clave */
  }
  
  .cta-button {
    display: inline-block; /* Permite aplicar padding y margin */
    margin-top: 1rem;
    background-color: transparent;
    color: var(--terracota-suave);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 700;
    border: 2px solid var(--terracota-suave);
    transition: all 0.3s ease;
  }

  .cta-button:hover {
    background-color: var(--terracota-suave);
    color: white;
    transform: translateY(-3px);
  }

  /* --- MEDIA QUERY PARA TABLETS Y ESCRITORIOS --- */
  @media (min-width: 992px) {
    .about-section {
      padding: 7rem 2rem;
    }

    .about-grid {
      /* Creamos el grid de dos columnas */
      grid-template-columns: repeat(2, 1fr);
      align-items: center; /* Centra verticalmente el contenido de ambas columnas */
      gap: 5rem;
    }

    .about-content h2 {
      font-size: 2.5rem;
    }
  }
</style>