<script lang="ts">
  import { isContactModalOpen } from '$lib/contactStore';
</script>

<footer class="footer">
  <div class="footer-container">
    <div class="footer-brand">
      <a href="/" class="footer-logo">
        <img src="/fox-logo-sf.png" alt="Logo de Foxbyte" />
        <span>Foxbyte</span>
      </a>
      <p class="footer-tagline">
        Ingeniería de software de alta calidad. Diseñamos e implementamos soluciones tecnológicas premium para forjar el crecimiento de tu negocio.
      </p>
      <button class="footer-cta-btn" on:click={() => isContactModalOpen.set(true)}>
        Solicitar diagnóstico
      </button>
    </div>

    <div class="footer-links-grid">
      <div class="footer-nav-col">
        <h4>Navegación</h4>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/#servicios">Servicios</a></li>
          <li><a href="/#portafolio">Proyectos</a></li>
          <li><a href="/#propuesta-valor">Propuesta de Valor</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </div>

      <div class="footer-nav-col">
        <h4>Servicios</h4>
        <ul>
          <li><a href="/servicios/e-commerce">E-commerce</a></li>
          <li><a href="/servicios/aplicaciones-moviles">Aplicaciones Móviles</a></li>
          <li><a href="/servicios/bases-de-datos">Bases de Datos</a></li>
          <li><a href="/servicios/solucion-a-la-medida">Desarrollo a la Medida</a></li>
        </ul>
      </div>

      <div class="footer-nav-col">
        <h4>Contacto</h4>
        <p class="contact-item">
          <strong>Email:</strong><br />
          <a href="mailto:luismontesg145@gmail.com">luismontesg145@gmail.com</a>
        </p>
        <p class="contact-item">
          <strong>Teléfono / WhatsApp:</strong><br />
          <a href="https://wa.me/584128505629" target="_blank" rel="noopener noreferrer">+58 412 850 5629</a>
        </p>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="footer-bottom-container">
      <p class="copyright">&copy; {new Date().getFullYear()} Foxbyte. Todos los derechos reservados.</p>
      <div class="legal-links">
        <a href="#contacto" on:click|preventDefault={() => isContactModalOpen.set(true)}>Taller de Ideas</a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--azul-petroleo, #0F172A);
    color: var(--marfil-claro, #F8FAFC);
    padding: 5rem 1.5rem 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    padding-bottom: 3rem;
  }

  @media (min-width: 992px) {
    .footer-container {
      grid-template-columns: 1.5fr 2.5fr;
      gap: 5rem;
    }
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .footer-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-weight: 700;
    font-size: 1.5rem;
  }

  .footer-logo img {
    height: 50px;
    margin-right: 0.75rem;
  }

  .footer-tagline {
    color: rgba(248, 250, 252, 0.7);
    line-height: 1.6;
    max-width: 400px;
    font-size: 0.95rem;
  }

  .footer-cta-btn {
    background-color: var(--terracota-suave, #FF6B00);
    color: white;
    border: none;
    padding: 0.8rem 1.8rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
  }

  .footer-cta-btn:hover {
    background-color: var(--ciruela-profunda, #E67E22);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
  }

  .footer-links-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 576px) {
    .footer-links-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .footer-nav-col h4 {
    color: white;
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .footer-nav-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .footer-nav-col ul a {
    color: rgba(248, 250, 252, 0.7);
    text-decoration: none;
    transition: color 0.2s ease;
    font-size: 0.95rem;
  }

  .footer-nav-col ul a:hover {
    color: var(--terracota-suave, #FF6B00);
    padding-left: 2px;
  }

  .contact-item {
    color: rgba(248, 250, 252, 0.7);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  .contact-item a {
    color: var(--marfil-claro, #F8FAFC);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .contact-item a:hover {
    color: var(--terracota-suave, #FF6B00);
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 2rem;
    margin-top: 1rem;
  }

  .footer-bottom-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }

  @media (min-width: 768px) {
    .footer-bottom-container {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }

  .copyright {
    color: rgba(248, 250, 252, 0.5);
    font-size: 0.85rem;
    margin: 0;
  }

  .legal-links {
    display: flex;
    gap: 1.5rem;
  }

  .legal-links a {
    color: rgba(248, 250, 252, 0.5);
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.2s ease;
  }

  .legal-links a:hover {
    color: var(--terracota-suave, #FF6B00);
  }
</style>
