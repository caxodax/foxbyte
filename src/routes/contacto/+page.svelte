<script lang="ts">
  import { db } from '$lib/firebase';
  import { collection, addDoc, serverTimestamp } from "firebase/firestore";
  import { fade } from 'svelte/transition';

  let name = '', email = '', message = '';
  let isLoading = false, isSuccess = false, errorMessage = '';

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      errorMessage = 'Por favor, completa todos los campos.';
      setTimeout(() => errorMessage = '', 3000);
      return;
    }
    
    isLoading = true; 
    errorMessage = ''; 
    isSuccess = false;
    
    try {
      await addDoc(collection(db, "messages"), { 
        name: name, 
        email: email, 
        message: message, 
        sentAt: serverTimestamp() 
      });
      isSuccess = true; 
      name = ''; 
      email = ''; 
      message = '';
    } catch (e) {
      console.error("ERROR AL ENVIAR CONTACTO:", e); 
      errorMessage = 'Hubo un error al enviar tu propuesta. Inténtalo de nuevo.';
    } finally {
      isLoading = false;
    }
  };
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
        <span class="tag">Taller de Ideas</span>
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
          
          <form on:submit|preventDefault={handleSubmit} class="contact-form">
            <div class="input-group">
              <input type="text" id="name" placeholder=" " bind:value={name} required>
              <label for="name">Tu Nombre</label>
            </div>

            <div class="input-group">
              <input type="email" id="email" placeholder=" " bind:value={email} required>
              <label for="email">Correo Electrónico</label>
            </div>

            <div class="input-group">
              <textarea id="message" rows="5" placeholder=" " bind:value={message} required></textarea>
              <label for="message">Describe tu idea, proceso manual o desafío técnico</label>
            </div>

            {#if isSuccess}
              <p class="status-msg success" transition:fade>
                ¡Propuesta recibida con éxito! Nos pondremos en contacto contigo a la brevedad.
              </p>
            {/if}

            {#if errorMessage}
              <p class="status-msg error" transition:fade>
                {errorMessage}
              </p>
            {/if}

            <button type="submit" class="submit-btn" disabled={isLoading}>
              {#if isLoading}
                <span class="spinner"></span>
              {:else}
                Enviar propuesta
              {/if}
            </button>
          </form>
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

  .tag {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--terracota-suave, #FF6B00);
    margin-bottom: 1.25rem;
    display: inline-block;
  }

  h1 {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: white;
    margin-bottom: 1.5rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
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
    border-color: rgba(255, 107, 0, 0.3);
    background: rgba(255, 107, 0, 0.03);
  }

  .direct-card.email:hover .icon {
    background: var(--terracota-suave, #FF6B00);
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

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: rgba(255, 255, 255, 0.01);
    border: 1px solid rgba(255, 255, 255, 0.03);
    padding: 2.5rem 2rem;
    border-radius: 20px;
  }

  .input-group {
    position: relative;
  }

  .input-group input, .input-group textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    color: white;
    font-size: 1rem;
    padding: 0.75rem 0;
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
  }

  .input-group label {
    position: absolute;
    top: 0.75rem;
    left: 0;
    color: rgba(248, 250, 252, 0.5);
    pointer-events: none;
    transition: all 0.3s ease;
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
  }

  .input-group input:focus, .input-group textarea:focus {
    border-color: var(--terracota-suave, #FF6B00);
    outline: none;
  }

  .input-group input:focus ~ label, .input-group input:not(:placeholder-shown) ~ label,
  .input-group textarea:focus ~ label, .input-group textarea:not(:placeholder-shown) ~ label {
    transform: translateY(-1.25rem);
    font-size: 0.75rem;
    color: var(--terracota-suave, #FF6B00);
  }

  .submit-btn {
    background-color: var(--terracota-suave, #FF6B00);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    margin-top: 1rem;
  }

  .submit-btn:hover {
    background-color: var(--ciruela-profunda, #E67E22);
  }

  .status-msg {
    text-align: center;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .status-msg.success {
    color: #4ade80;
  }

  .status-msg.error {
    color: #f87171;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2.5px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
    display: inline-block;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
