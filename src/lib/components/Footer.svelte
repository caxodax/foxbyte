<script lang="ts">
  import { isContactModalOpen } from '$lib/contactStore';
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="footer-container">
    <!-- Columna de Marca y Estado Operativo -->
    <div class="footer-brand">
      <a href="/" class="footer-logo">
        <img src="/fox-logo-sf.png" alt="Logo de Foxbyte" width="46" height="46" />
        <span>Foxbyte</span>
      </a>
      
      <p class="footer-tagline">
        Ingeniería de software de alta exigencia. Diseñamos e implementamos productos digitales escalables, arquitecturas resilientes y experiencias de usuario premium.
      </p>

      <!-- Badge de Disponibilidad en Vivo -->
      <div class="status-indicator">
        <span class="status-pulse"></span>
        <span class="status-text">Disponible para nuevos proyectos Q2/Q3</span>
      </div>
    </div>

    <!-- Columnas de Enlaces -->
    <div class="footer-links-grid">
      <!-- Navegación -->
      <nav class="footer-nav-col" aria-label="Navegación del sitio">
        <h4>Navegación</h4>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/#servicios">Servicios</a></li>
          <li><a href="/#portafolio">Proyectos</a></li>
          <li><a href="/#propuesta-valor">Propuesta de Valor</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </nav>

      <!-- Servicios -->
      <nav class="footer-nav-col" aria-label="Servicios especializados">
        <h4>Servicios</h4>
        <ul>
          <li><a href="/servicios/e-commerce">E-commerce de Alto Rendimiento</a></li>
          <li><a href="/servicios/aplicaciones-moviles">Aplicaciones Móviles</a></li>
          <li><a href="/servicios/bases-de-datos">Bases de Datos & Arquitectura</a></li>
          <li><a href="/servicios/solucion-a-la-medida">Desarrollo a la Medida</a></li>
        </ul>
      </nav>

      <!-- Contacto Directo (WhatsApp y Email prioritarios) -->
      <div class="footer-nav-col contact-col">
        <h4>Contacto Directo</h4>
        <div class="direct-channels">
          <a href="mailto:luismontesg145@gmail.com" class="channel-card">
            <div class="channel-icon mail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div class="channel-info">
              <span class="channel-label">Correo electrónico</span>
              <span class="channel-val">luismontesg145@gmail.com</span>
            </div>
          </a>

          <a href="https://wa.me/584128505629?text=Hola%20Foxbyte,%20me%20gustar%C3%ADa%20conversar%20sobre%20un%20proyecto" target="_blank" rel="noopener noreferrer" class="channel-card">
            <div class="channel-icon whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-10.416c-4.417 0-8 3.584-8 8.002 0 1.488.406 2.88 1.112 4.078l-1.18 4.316 4.437-1.164c1.149.627 2.457.97 3.631.97 4.418 0 8-3.584 8-8.002 0-4.418-3.582-8-8-8z"/>
              </svg>
            </div>
            <div class="channel-info">
              <span class="channel-label">WhatsApp Corporativo</span>
              <span class="channel-val">+58 412 850 5629</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Barra Inferior -->
  <div class="footer-bottom">
    <div class="footer-bottom-container">
      <p class="copyright">&copy; {currentYear} Foxbyte Technologies. Todos los derechos reservados.</p>
      <div class="legal-links">
        <button type="button" class="legal-btn" on:click={() => isContactModalOpen.set(true)}>
          Taller de Ideas & Diagnóstico
        </button>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    background-color: #050912;
    color: #F8FAFC;
    padding: 5rem 1.5rem 2.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    font-family: var(--font-body, 'Inter', sans-serif);
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3.5rem;
    padding-bottom: 3.5rem;
  }

  @media (min-width: 992px) {
    .footer-container {
      grid-template-columns: 1.3fr 2.7fr;
      gap: 5rem;
    }
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .footer-logo {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: #FFFFFF;
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-weight: 800;
    font-size: 1.6rem;
    letter-spacing: -0.02em;
  }

  .footer-logo img {
    height: 44px;
    width: auto;
    object-fit: contain;
  }

  .footer-tagline {
    color: rgba(248, 250, 252, 0.72);
    line-height: 1.65;
    font-size: 0.95rem;
    max-width: 380px;
    margin: 0;
  }

  .status-indicator {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(34, 197, 94, 0.08);
    border: 1px solid rgba(34, 197, 94, 0.25);
    padding: 0.45rem 0.9rem;
    border-radius: 100px;
    margin-top: 0.5rem;
  }

  .status-pulse {
    width: 8px;
    height: 8px;
    background-color: #22C55E;
    border-radius: 50%;
    box-shadow: 0 0 10px #22C55E;
    animation: statusBlink 2.2s infinite ease-in-out;
  }

  @keyframes statusBlink {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
  }

  .status-text {
    font-size: 0.8rem;
    font-weight: 600;
    color: #86EFAC;
    font-family: var(--font-mono, monospace);
  }

  .footer-links-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  @media (min-width: 600px) {
    .footer-links-grid {
      grid-template-columns: 1fr 1.2fr 1.4fr;
      gap: 2rem;
    }
  }

  .footer-nav-col h4 {
    color: #FFFFFF;
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0 0 1.25rem 0;
    letter-spacing: -0.01em;
  }

  .footer-nav-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .footer-nav-col ul a {
    color: rgba(248, 250, 252, 0.7);
    text-decoration: none;
    font-size: 0.92rem;
    line-height: 1.4;
    transition: all 0.2s ease;
    display: inline-block;
  }

  .footer-nav-col ul a:hover {
    color: var(--color-primary, #FF5A00);
    transform: translateX(3px);
  }

  .direct-channels {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .channel-card {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.75rem 1rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.25s ease;
  }

  .channel-card:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 107, 0, 0.3);
    transform: translateY(-2px);
  }

  .channel-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .channel-icon.mail {
    background: rgba(255, 107, 0, 0.12);
    color: #FF7A1A;
  }

  .channel-icon.mail svg {
    width: 18px;
    height: 18px;
  }

  .channel-icon.whatsapp {
    background: rgba(37, 211, 102, 0.12);
    color: #25D366;
  }

  .channel-icon.whatsapp svg {
    width: 18px;
    height: 18px;
  }

  .channel-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    overflow: hidden;
  }

  .channel-label {
    font-size: 0.75rem;
    color: rgba(248, 250, 252, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-family: var(--font-mono, monospace);
  }

  .channel-val {
    font-size: 0.88rem;
    font-weight: 600;
    color: #FFFFFF;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 2rem;
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
    align-items: center;
    gap: 1.5rem;
  }

  .legal-btn {
    background: none;
    border: none;
    padding: 0;
    color: rgba(248, 250, 252, 0.6);
    font-size: 0.85rem;
    font-family: var(--font-body, 'Inter', sans-serif);
    cursor: pointer;
    transition: color 0.2s ease;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .legal-btn:hover {
    color: var(--color-primary, #FF5A00);
  }
</style>
