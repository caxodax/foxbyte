<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { db } from '$lib/firebase';
  import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
  import { fly, fade } from 'svelte/transition';
  
  export let isVisible = false;
  const dispatch = createEventDispatcher();

  let modalContentElement: HTMLDivElement;
  $: if (isVisible && modalContentElement) {
    modalContentElement.focus();
  }

  let activeView = 'quick';
  let name = '', email = '', message = '';
  let isLoading = false, isSuccess = false, errorMessage = '';

  const handleSubmit = async () => {
    console.log('Función handleSubmit ejecutada.'); // Diagnóstico

    if (!name || !email || !message) {
      errorMessage = 'Por favor, completa todos los campos.';
      setTimeout(() => errorMessage = '', 3000);
      return;
    }
    
    isLoading = true; 
    errorMessage = ''; 
    isSuccess = false;
    
    try {
      console.log('Intentando enviar a Firebase...'); // Diagnóstico
      await addDoc(collection(db, "messages"), { 
        name: name, 
        email: email, 
        message: message, 
        sentAt: serverTimestamp() 
      });
      console.log('¡Éxito! Documento enviado.'); // Diagnóstico

      isSuccess = true; 
      name = ''; 
      email = ''; 
      message = '';
      
      setTimeout(() => { 
        dispatch('close'); 
        setTimeout(() => isSuccess = false, 500); 
      }, 2000);

    } catch (e) {
      // Diagnóstico: Muestra el error completo de Firebase en la consola
      console.error("ERROR DE FIREBASE AL ENVIAR:", e); 
      errorMessage = 'Hubo un error al conectar con el servidor. Inténtalo de nuevo.';
    } finally {
      isLoading = false;
    }
  };

</script>

<svelte:window on:keydown={(event) => { if (event.key === 'Escape' && isVisible) dispatch('close'); }} />

{#if isVisible}
<div 
  class="modal-overlay" 
  on:click={() => dispatch('close')} 
  transition:fade={{ duration: 300 }}>
  <div 
    class="modal-content" 
    on:click|stopPropagation 
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
    bind:this={modalContentElement}
    transition:fly={{ y: 50, duration: 400 }}>
    
    <button class="close-button" on:click={() => dispatch('close')} aria-label="Cerrar modal">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
    </button>
    
    <div class="background-animation"></div>

    <div class="modal-header">
      <div class="fox-logo-wrapper">
        <img src="/fox-logo-sf.png" alt="Logo de Foxbyte animado" class="modal-fox-logo" />
      </div>
      <h3 id="modal-title">Bienvenido al Taller de Ideas</h3>
      <p>Este es el primer paso. Elige cómo quieres empezar la conversación.</p>
    </div>

    <div class="view-toggle">
      <button class:active={activeView === 'quick'} on:click={() => activeView = 'quick'}>Conversación Rápida</button>
      <button class:active={activeView === 'form'} on:click={() => activeView = 'form'}>Detallar Proyecto</button>
    </div>

    <div class="modal-body">
      {#if activeView === 'quick'}
        <div class="quick-contact-view" transition:fade>
          <a href="https://wa.me/584128505629" target="_blank" rel="noopener noreferrer" class="direct-button whatsapp"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-whatsapp" width="24" height="24" viewBox="0 0 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg><span>WhatsApp</span></a>
          <a href="mailto:luismontesg145@gmail.com" class="direct-button email"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg><span>Email</span></a>
        </div>
      {:else}
        <form class="form-view" on:submit|preventDefault={handleSubmit} transition:fade>
          <div class="input-group"><input type="text" id="name_modal" placeholder=" " bind:value={name} required><label for="name_modal">Tu Nombre</label></div>
          <div class="input-group"><input type="email" id="email_modal" placeholder=" " bind:value={email} required><label for="email_modal">Correo Electrónico</label></div>
          <div class="input-group"><textarea id="message_modal" rows="4" placeholder=" " bind:value={message} required></textarea><label for="message_modal">Describe tu idea o desafío</label></div>
          {#if isSuccess} <p class="success-message">¡Propuesta recibida! Nos vemos en tu bandeja de entrada.</p> {/if}
          {#if errorMessage} <p class="error-message">{errorMessage}</p> {/if}
          <button type="submit" class="submit-button" disabled={isLoading}>{#if isLoading} <span class="spinner"></span> {:else} Forjar Colaboración {/if}</button>
        </form>
      {/if}
    </div>
  </div>
</div>
{/if}

<style>
  @keyframes fox-glow { 0% { transform: scale(1); box-shadow: 0 0 5px rgba(210, 106, 58, 0.2), 0 0 10px rgba(210, 106, 58, 0.2); } 50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(210, 106, 58, 0.5), 0 0 40px rgba(210, 106, 58, 0.4); } 100% { transform: scale(1); box-shadow: 0 0 5px rgba(210, 106, 58, 0.2), 0 0 10px rgba(210, 106, 58, 0.2); } }
  @keyframes gradient { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
  .background-animation { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; z-index: 0; background: linear-gradient(-45deg, var(--azul-petroleo), var(--ciruela-profunda), var(--terracota-suave), var(--azul-petroleo)); background-size: 400% 400%; animation: gradient 20s ease infinite; }
  .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(10, 20, 30, 0.5); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; }
  .modal-content { position: relative; width: 90%; max-width: 600px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 2rem; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); z-index: 1; overflow: hidden; }
  .close-button { position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: rgba(255, 255, 255, 0.5); cursor: pointer; transition: all 0.3s ease; z-index: 2; }
  .close-button:hover { color: white; transform: rotate(90deg); }
  .modal-header, .view-toggle, .modal-body { position: relative; z-index: 1; }
  .modal-header { text-align: center; margin-bottom: 2rem; }
  .fox-logo-wrapper { display: inline-block; padding: 10px; border-radius: 50%; animation: fox-glow 3s infinite ease-in-out; margin-bottom: 1rem; }
  .modal-fox-logo { width: 80px; height: auto; display: block; }
  .modal-header h3 { font-size: 1.8rem; color: white; margin-bottom: 0.5rem; }
  .modal-header p { color: rgba(255, 255, 255, 0.7); }
  .view-toggle { display: flex; justify-content: center; background-color: rgba(0, 0, 0, 0.2); border-radius: 8px; padding: 0.25rem; margin-bottom: 2rem; }
  .view-toggle button { flex: 1; padding: 0.75rem; background: transparent; border: none; color: rgba(255, 255, 255, 0.7); font-weight: 600; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; }
  .view-toggle button.active { background-color: var(--terracota-suave); color: white; box-shadow: 0 5px 15px rgba(210, 106, 58, 0.3); }
  .quick-contact-view, .form-view { min-height: 250px; }
  .quick-contact-view { display: flex; flex-direction: column; gap: 1rem; justify-content: center; }
  .direct-button { background: rgba(255, 255, 255, 0.1); border: 1px solid transparent; color: var(--marfil-claro); padding: 1rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
  .direct-button.whatsapp:hover { background-color: #25D366; border-color: transparent; }
  .direct-button.email:hover { background-color: var(--terracota-suave); border-color: transparent; }
  .form-view { display: flex; flex-direction: column; gap: 1.5rem; }
  .input-group { position: relative; }
  .input-group input, .input-group textarea { width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(255, 255, 255, 0.2); color: white; font-size: 1rem; padding: 0.75rem 0; }
  .input-group label { position: absolute; top: 0.75rem; left: 0; color: rgba(255, 255, 255, 0.5); pointer-events: none; transition: all 0.3s ease; }
  .input-group input:focus, .input-group textarea:focus { border-color: var(--terracota-suave); outline: none; }
  .input-group input:focus ~ label, .input-group input:not(:placeholder-shown) ~ label,
  .input-group textarea:focus ~ label, .input-group textarea:not(:placeholder-shown) ~ label { transform: translateY(-1.25rem); font-size: 0.75rem; color: var(--terracota-suave); }
  .submit-button { background: var(--terracota-suave); color: white; padding: 1rem; border-radius: 8px; border: none; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; }
  .submit-button:hover { background-color: var(--ciruela-profunda); }
  .success-message, .error-message { text-align: center; font-weight: 600; }
  .success-message { color: #4ade80; } .error-message { color: #f87171; }
  .spinner { width: 24px; height: 24px; border: 3px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto; }
</style>