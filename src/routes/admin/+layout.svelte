<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { auth } from '$lib/firebase';
  import { onAuthStateChanged } from 'firebase/auth';
  import { page } from '$app/stores';

  let loading = true;
  let user = null;

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      user = currentUser;
      
      // Si no hay usuario y no estamos en la página de login, redirigir al login
      if (!user && $page.url.pathname !== '/admin/login') {
        goto('/admin/login');
      } 
      // Si hay usuario y estamos en la página de login, redirigir al dashboard
      else if (user && $page.url.pathname === '/admin/login') {
        goto('/admin');
      }
      
      loading = false;
    });

    return () => unsubscribe();
  });
</script>

{#if loading}
  <div class="loading-container">
    <div class="spinner"></div>
    <p>Cargando sesión...</p>
  </div>
{:else}
  <slot />
{/if}

<style>
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--marfil-claro, #F8F6F3);
    color: var(--azul-petroleo, #2C3E50);
    font-family: var(--font-principal, 'Montserrat', sans-serif);
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(44, 62, 80, 0.1);
    border-radius: 50%;
    border-top-color: var(--terracota-suave, #E67E22);
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
