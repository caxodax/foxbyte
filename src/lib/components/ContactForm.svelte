<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let submitLabel: string = 'Enviar propuesta';
  export let idPrefix: string = 'contact';

  const dispatch = createEventDispatcher<{
    success: { name: string; email: string };
  }>();

  let name = '';
  let email = '';
  let message = '';
  let isLoading = false;
  let isSuccess = false;
  let errorMessage = '';

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      errorMessage = 'Por favor, completa todos los campos requeridos.';
      setTimeout(() => errorMessage = '', 3500);
      return;
    }

    isLoading = true;
    errorMessage = '';
    isSuccess = false;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim()
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Error al procesar la propuesta.');
      }

      isSuccess = true;
      dispatch('success', { name, email });
      name = '';
      email = '';
      message = '';
    } catch (e: any) {
      console.error('Error al enviar formulario de contacto:', e);
      errorMessage = e.message || 'Error de conexión. Inténtalo nuevamente.';
    } finally {
      isLoading = false;
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit} class="fx-contact-form" novalidate>
  <div class="input-group">
    <input 
      type="text" 
      id="{idPrefix}-name" 
      placeholder=" " 
      bind:value={name} 
      required 
      autocomplete="name"
    />
    <label for="{idPrefix}-name">Tu Nombre</label>
  </div>

  <div class="input-group">
    <input 
      type="email" 
      id="{idPrefix}-email" 
      placeholder=" " 
      bind:value={email} 
      required 
      autocomplete="email"
    />
    <label for="{idPrefix}-email">Correo Electrónico</label>
  </div>

  <div class="input-group">
    <textarea 
      id="{idPrefix}-message" 
      rows="4" 
      placeholder=" " 
      bind:value={message} 
      required
    ></textarea>
    <label for="{idPrefix}-message">Describe tu idea, proceso manual o desafío técnico</label>
  </div>

  {#if isSuccess}
    <p class="status-msg success" transition:fade>
      ¡Propuesta recibida con éxito! Nos pondremos en contacto a la brevedad.
    </p>
  {/if}

  {#if errorMessage}
    <p class="status-msg error" transition:fade>
      {errorMessage}
    </p>
  {/if}

  <button type="submit" class="submit-btn" disabled={isLoading}>
    {#if isLoading}
      <span class="spinner" aria-label="Enviando..."></span>
    {:else}
      {submitLabel}
    {/if}
  </button>
</form>

<style>
  .fx-contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    width: 100%;
  }

  .input-group {
    position: relative;
    width: 100%;
  }

  .input-group input,
  .input-group textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--color-border, #CBD5E1);
    color: var(--color-text-primary, #0F172A);
    font-size: 1rem;
    padding: 0.75rem 0;
    font-family: inherit;
    transition: border-color 0.25s ease;
  }

  .input-group textarea {
    resize: vertical;
    min-height: 90px;
  }

  .input-group label {
    position: absolute;
    top: 0.75rem;
    left: 0;
    color: var(--color-text-muted, #64748B);
    pointer-events: none;
    transition: all 0.25s ease;
    font-family: inherit;
    font-size: 0.95rem;
  }

  .input-group input:focus,
  .input-group textarea:focus {
    border-color: var(--color-primary, #FF6600);
    outline: none;
  }

  .input-group input:focus ~ label,
  .input-group input:not(:placeholder-shown) ~ label,
  .input-group textarea:focus ~ label,
  .input-group textarea:not(:placeholder-shown) ~ label {
    transform: translateY(-1.3rem);
    font-size: 0.75rem;
    color: var(--color-primary, #FF6600);
    font-weight: 600;
  }

  .submit-btn {
    background-color: var(--color-primary, #FF6600);
    color: #FFFFFF;
    border: none;
    padding: 1rem 1.8rem;
    border-radius: var(--radius-full, 50px);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 4px 15px rgba(255, 90, 0, 0.3);
    margin-top: 0.5rem;
    width: 100%;
  }

  .submit-btn:hover:not(:disabled) {
    background-color: var(--color-primary-hover, #E04E00);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 90, 0, 0.4);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .status-msg {
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.75rem;
    border-radius: 8px;
  }

  .status-msg.success {
    background: #DCFCE7;
    color: #15803D;
    border: 1px solid #BBF7D0;
  }

  .status-msg.error {
    background: #FEE2E2;
    color: #B91C1C;
    border: 1px solid #FECACA;
  }

  .spinner {
    width: 22px;
    height: 22px;
    border: 2.5px solid rgba(255, 255, 255, 0.3);
    border-top-color: #FFFFFF;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    display: inline-block;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
