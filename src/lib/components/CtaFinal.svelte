<script lang="ts">
  import { isContactModalOpen } from "$lib/contactStore";

  const projectScopes = [
    { id: 'plataforma-web', label: 'Plataforma Web / SaaS' },
    { id: 'automatizacion-ia', label: 'Automatización & IA Aplicada' },
    { id: 'ecommerce-escala', label: 'E-commerce de Alta Escala' },
    { id: 'sistema-medida', label: 'Software Interno a Medida' }
  ];

  let selectedScope = projectScopes[0].id;

  function openDiagnostic() {
    isContactModalOpen.set(true);
  }

  $: selectedLabel = projectScopes.find(s => s.id === selectedScope)?.label || 'Desarrollo de Software';
  $: whatsappUrl = `https://wa.me/584128505629?text=Hola%20Foxbyte,%20me%20gustar%C3%ADa%20agendar%20un%20diagn%C3%B3stico%20t%C3%A9cnico%20para%20${encodeURIComponent(selectedLabel)}`;
</script>

<section id="contacto" class="cta-final-section" aria-labelledby="cta-heading">
  <!-- Halo ambiental estático optimizado -->
  <div class="ambient-glow" aria-hidden="true"></div>

  <div class="cta-wrapper">
    <div class="cta-card">
      <div class="trust-badges">
        <span class="trust-badge">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          Respuesta en &lt; 24h
        </span>
        <span class="trust-badge">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Protección bajo NDA
        </span>
        <span class="trust-badge">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
          Diagnóstico sin compromiso
        </span>
      </div>

      <h2 id="cta-heading" class="cta-title">
        ¿Listo para construir software que impulse el crecimiento de tu empresa?
      </h2>
      
      <p class="cta-subtitle">
        Selecciona el tipo de solución que necesitas y evaluemos la arquitectura ideal antes de comenzar.
      </p>

      <!-- Project Scoper Interactivo -->
      <div class="scoper-container" role="group" aria-label="Seleccionar alcance del proyecto">
        <span class="scoper-label">Selecciona tu prioridad técnica:</span>
        <div class="scoper-chips">
          {#each projectScopes as scope}
            <button
              type="button"
              class="scoper-chip"
              class:selected={selectedScope === scope.id}
              on:click={() => selectedScope = scope.id}
              aria-pressed={selectedScope === scope.id}
            >
              <span>{scope.label}</span>
            </button>
          {/each}
        </div>
      </div>

      <div class="cta-actions">
        <button 
          type="button" 
          class="btn-primary" 
          on:click={openDiagnostic}
        >
          <span>Agendar diagnóstico para {selectedLabel}</span>
          <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-secondary"
        >
          <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-10.416c-4.417 0-8 3.584-8 8.002 0 1.488.406 2.88 1.112 4.078l-1.18 4.316 4.437-1.164c1.149.627 2.457.97 3.631.97 4.418 0 8-3.584 8-8.002 0-4.418-3.582-8-8-8z"/>
          </svg>
          <span>Conversar por WhatsApp</span>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .cta-final-section {
    position: relative;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    background-color: var(--color-background, #090D16);
    padding: 6.5rem 1.5rem;
    overflow: hidden;
    scroll-margin-top: 80px;
    border-top: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
  }

  .ambient-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(255, 102, 0, 0.08) 0%, rgba(255, 102, 0, 0.015) 50%, transparent 70%);
    pointer-events: none;
    z-index: 1;
  }

  .cta-wrapper {
    position: relative;
    max-width: 1040px;
    margin: 0 auto;
    z-index: 2;
  }

  .cta-card {
    background: var(--color-surface, rgba(17, 24, 39, 0.65));
    border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
    border-radius: 28px;
    padding: 4.5rem 2.5rem;
    text-align: center;
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .trust-badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .trust-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.82rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.4rem 0.95rem;
    border-radius: 9999px;
  }

  .badge-icon {
    width: 14px;
    height: 14px;
    color: var(--color-primary, #FF6600);
    flex-shrink: 0;
  }

  .cta-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.15;
    letter-spacing: -0.03em;
    max-width: 820px;
    margin: 0 auto 1.5rem;
    text-wrap: balance;
  }

  .cta-subtitle {
    color: var(--color-text-secondary, #CBD5E1);
    font-size: clamp(1rem, 1.8vw, 1.15rem);
    line-height: 1.65;
    max-width: 680px;
    margin: 0 auto 2.5rem;
    text-wrap: pretty;
  }

  /* Scoper Interactivo */
  .scoper-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .scoper-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text-muted, #94A3B8);
  }

  .scoper-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    justify-content: center;
    max-width: 780px;
  }

  .scoper-chip {
    padding: 0.55rem 1.25rem;
    border-radius: 9999px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    background: var(--color-surface, rgba(17, 24, 39, 0.65));
    border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
    color: var(--color-text-secondary, #CBD5E1);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: inherit;
  }

  .scoper-chip:hover {
    background: var(--color-surface-elevated, rgba(23, 32, 51, 0.82));
    color: #FFFFFF;
    border-color: rgba(255, 255, 255, 0.2);
  }

  .scoper-chip.selected {
    background: var(--color-primary, #FF6600);
    border-color: var(--color-primary, #FF6600);
    color: #FFFFFF;
    font-weight: 600;
    box-shadow: 0 0 16px rgba(255, 102, 0, 0.35);
  }

  .cta-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    background: var(--color-primary, #FF6600);
    color: #FFFFFF;
    border: none;
    padding: 1.05rem 2.25rem;
    border-radius: 9999px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 20px rgba(255, 102, 0, 0.35);
    font-family: inherit;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    background: var(--color-primary-hover, #EA580C);
    box-shadow: 0 8px 30px rgba(255, 102, 0, 0.5);
  }

  .btn-primary:active {
    transform: scale(0.98);
  }

  .arrow-icon {
    width: 18px;
    height: 18px;
    transition: transform 0.2s ease;
  }

  .btn-primary:hover .arrow-icon {
    transform: translateX(3px);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    background: rgba(255, 255, 255, 0.05);
    color: #F8FAFC;
    border: 1px solid rgba(255, 255, 255, 0.16);
    padding: 1.05rem 2rem;
    border-radius: 9999px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.25s ease;
    font-family: inherit;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    color: #FFFFFF;
    transform: translateY(-2px);
  }

  .whatsapp-icon {
    width: 20px;
    height: 20px;
    color: #25D366;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .cta-final-section {
      padding: 4.5rem 1.25rem;
    }

    .cta-card {
      padding: 3rem 1.5rem;
      border-radius: 20px;
    }

    .scoper-chips {
      flex-direction: column;
      width: 100%;
    }

    .scoper-chip {
      width: 100%;
      text-align: center;
    }

    .cta-actions {
      flex-direction: column;
      width: 100%;
    }

    .btn-primary, .btn-secondary {
      width: 100%;
      text-align: center;
    }
  }
</style>