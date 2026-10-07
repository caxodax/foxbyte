<script lang="ts">
  // Contacto.svelte - Unified Contact Modal
  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import ContactForm from '$lib/components/ContactForm.svelte';
  
  export let isVisible = false;
  const dispatch = createEventDispatcher();

  let modalContentElement: HTMLDivElement;
  $: if (isVisible && modalContentElement) {
    modalContentElement.focus();
  }

  let activeView = 'quick';

  function handleSuccess() {
    setTimeout(() => {
      dispatch('close');
    }, 2000);
  }
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
        <div class="form-view" transition:fade>
          <ContactForm 
            submitLabel="Forjar Colaboración" 
            idPrefix="modal" 
            on:success={handleSuccess} 
          />
        </div>
      {/if}
    </div>
  </div>
</div>
{/if}

<style>
  @keyframes fox-glow { 0% { transform: scale(1); box-shadow: 0 0 5px rgba(255, 102, 0, 0.2); } 50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(255, 102, 0, 0.4); } 100% { transform: scale(1); box-shadow: 0 0 5px rgba(255, 102, 0, 0.2); } }
  .background-animation { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; z-index: 0; background: radial-gradient(circle at 50% 0%, rgba(255, 102, 0, 0.08) 0%, transparent 70%); pointer-events: none; }
  .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem; }
  .modal-content { position: relative; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; overflow-x: hidden; background: var(--color-surface, #FFFFFF); border: 1px solid var(--color-border, #E2E8F0); border-radius: 20px; padding: 2.25rem; box-shadow: var(--shadow-xl, 0 20px 50px rgba(15, 23, 42, 0.15)); z-index: 1; }
  .close-button { position: absolute; top: 1.25rem; right: 1.25rem; background: transparent; border: none; color: var(--color-text-secondary, #64748B); cursor: pointer; transition: all 0.25s ease; z-index: 2; }
  .close-button:hover { color: var(--color-text-primary, #0F172A); transform: rotate(90deg); }
  .modal-header, .view-toggle, .modal-body { position: relative; z-index: 1; }
  .modal-header { text-align: center; margin-bottom: 2rem; }
  .fox-logo-wrapper { display: inline-block; padding: 10px; border-radius: 50%; animation: fox-glow 3s infinite ease-in-out; margin-bottom: 1rem; }
  .modal-fox-logo { width: 80px; height: auto; display: block; }
  .modal-header h3 { font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif); font-size: 1.8rem; font-weight: 800; color: var(--color-text-primary, #0F172A); margin-bottom: 0.5rem; }
  .modal-header p { font-family: var(--font-body, 'Inter', sans-serif); color: var(--color-text-secondary, #475569); }
  .view-toggle { display: flex; justify-content: center; background-color: var(--color-background, #F1F5F9); border: 1px solid var(--color-border, #E2E8F0); border-radius: 8px; padding: 0.25rem; margin-bottom: 2rem; }
  .view-toggle button { flex: 1; padding: 0.75rem; background: transparent; border: none; color: var(--color-text-secondary, #475569); font-weight: 600; border-radius: 6px; cursor: pointer; transition: all 0.2s ease; }
  .view-toggle button.active { background-color: var(--color-primary, #FF6600); color: white; box-shadow: 0 2px 8px rgba(255, 102, 0, 0.3); }
  .quick-contact-view, .form-view { min-height: 250px; }
  .quick-contact-view { display: flex; flex-direction: column; gap: 1rem; justify-content: center; }
  .direct-button { background: var(--color-background, #F8FAFC); border: 1px solid var(--color-border, #E2E8F0); color: var(--color-text-primary, #0F172A); padding: 1rem; border-radius: 12px; text-decoration: none; font-weight: 600; transition: all 0.25s ease; display: flex; align-items: center; justify-content: center; gap: 0.75rem; box-shadow: var(--shadow-sm); }
  .direct-button:hover { border-color: var(--color-border-strong, #CBD5E1); }
  .direct-button.whatsapp:hover { background-color: #25D366; color: #FFFFFF; border-color: transparent; }
  .direct-button.email:hover { background-color: var(--color-primary, #FF6600); color: #FFFFFF; border-color: transparent; }
  .form-view { display: flex; flex-direction: column; gap: 1.5rem; }
</style>