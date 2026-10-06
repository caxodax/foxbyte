<script lang="ts">
  import { theme, toggleTheme } from '$lib/themeStore';
  import { fly } from 'svelte/transition';
</script>

<aside class="theme-toggle-wrapper" aria-label="Control de tema visual">
  <button
    type="button"
    class="theme-toggle-btn"
    on:click={toggleTheme}
    aria-label={$theme === 'light' ? 'Activar modo oscuro (Opción A)' : 'Activar modo claro (Opción B)'}
    title={$theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
  >
    <div class="icon-container">
      {#if $theme === 'light'}
        <!-- Icono de Luna para sugerir modo oscuro -->
        <span class="icon moon-icon" in:fly={{ y: -8, duration: 250 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          </svg>
        </span>
      {:else}
        <!-- Icono de Sol para sugerir modo claro -->
        <span class="icon sun-icon" in:fly={{ y: 8, duration: 250 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
          </svg>
        </span>
      {/if}
    </div>
    <span class="theme-label">
      {$theme === 'light' ? 'Oscuro' : 'Claro'}
    </span>
  </button>
</aside>

<style>
  .theme-toggle-wrapper {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 999;
  }

  .theme-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.65rem 1.15rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 9999px;
    color: var(--color-text-primary);
    box-shadow: var(--shadow-lg);
    cursor: pointer;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                border-color 0.25s ease,
                background-color 0.25s ease,
                box-shadow 0.25s ease;
    font-family: var(--font-display, inherit);
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: -0.01em;
  }

  .theme-toggle-btn:hover {
    transform: translateY(-3px) scale(1.02);
    border-color: var(--color-primary);
    box-shadow: var(--shadow-glow), var(--shadow-lg);
  }

  .theme-toggle-btn:active {
    transform: translateY(-1px) scale(0.98);
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    color: var(--color-primary);
    position: relative;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  .theme-toggle-btn:hover .icon {
    transform: rotate(15deg);
  }

  .theme-label {
    user-select: none;
    color: var(--color-text-primary);
    font-size: 0.82rem;
    font-weight: 700;
  }

  @media (max-width: 640px) {
    .theme-toggle-wrapper {
      bottom: 1.25rem;
      right: 1.25rem;
    }
    .theme-toggle-btn {
      padding: 0.55rem 0.95rem;
      font-size: 0.8rem;
    }
  }
</style>
