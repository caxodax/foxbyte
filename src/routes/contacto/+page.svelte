<script lang="ts">
  import ContactForm from '$lib/components/ContactForm.svelte';
</script>

<svelte:head>
  <title>Solicitar diagnóstico | Foxbyte</title>
  <meta name="description" content="Inicia tu proyecto con Foxbyte. Solicita un diagnóstico técnico y comercial gratuito para tu negocio." />
</svelte:head>

<section class="contacto-page">
  <div class="glow-bg"></div>

  <div class="container">
    <div class="contacto-wrapper">
      <header class="header">
        <h1>Solicitar diagnóstico</h1>
        <p>Cuéntanos tu idea, problema o desafío técnico. Analizamos tu requerimiento y te mostramos un camino de solución sin compromiso.</p>
      </header>

      <div class="grid">
        <!-- Direct channels -->
        <div class="channels-column">
          <h2>Contacto Directo</h2>
          <p class="direct-desc">Si prefieres una conversación inmediata, escríbenos directamente a través de nuestros canales oficiales:</p>
          
          <div class="direct-links">
            <a href="https://wa.me/584128505629" target="_blank" rel="noopener noreferrer" class="direct-card whatsapp">
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-whatsapp" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
              </div>
              <div class="info">
                <h3>WhatsApp</h3>
                <span>Chat directo instantáneo</span>
              </div>
            </a>

            <a href="mailto:luismontesg145@gmail.com" class="direct-card email">
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
              </div>
              <div class="info">
                <h3>Correo Electrónico</h3>
                <span>luismontesg145@gmail.com</span>
              </div>
            </a>
          </div>
        </div>

        <!-- Form -->
        <div class="form-column">
          <h2>Describe tu Proyecto</h2>
          <div class="form-card">
            <ContactForm submitLabel="Enviar propuesta" idPrefix="page" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .contacto-page {
    position: relative;
    background-color: var(--azul-petroleo, #0F172A);
    color: var(--marfil-claro, #F8FAFC);
    padding: 10rem 1.5rem 6rem;
    overflow: hidden;
    min-height: 100vh;
  }

  .glow-bg {
    position: absolute;
    top: -10%;
    left: 30%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 107, 0, 0.06) 0%, rgba(15, 23, 42, 0) 70%);
    z-index: 0;
    pointer-events: none;
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 5rem;
  }

  h1 {
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    font-weight: 900;
    color: white;
    margin-bottom: 1.5rem;
    line-height: 1.12;
    letter-spacing: -0.035em;
  }

  .header p {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    font-size: 1.1rem;
    color: rgba(248, 250, 252, 0.7);
    line-height: 1.6;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: 1fr 1.2fr;
      gap: 5rem;
    }
  }

  h2 {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
  }

  .direct-desc {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    color: rgba(248, 250, 252, 0.7);
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 0.95rem;
  }

  .direct-links {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .direct-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    text-decoration: none;
    color: white;
    transition: all 0.3s ease;
  }

  .direct-card .icon {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(248, 250, 252, 0.8);
    transition: all 0.3s ease;
  }

  .direct-card.whatsapp:hover {
    border-color: rgba(37, 211, 102, 0.3);
    background: rgba(37, 211, 102, 0.03);
  }

  .direct-card.whatsapp:hover .icon {
    background: #25D366;
    color: white;
  }

  .direct-card.email:hover {
    border-color: rgba(255, 90, 0, 0.3);
    background: rgba(255, 90, 0, 0.04);
  }

  .direct-card.email:hover .icon {
    background: var(--color-primary, #FF5A00);
    color: white;
  }

  .info h3 {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
  }

  .info span {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    color: rgba(248, 250, 252, 0.5);
    font-size: 0.9rem;
  }

  .form-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 2.5rem 2rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
</style>
