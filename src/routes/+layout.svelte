<script lang="ts">
  //Layout.svelte
  import '../app.css';
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import Navbar from '$lib/components/Navbar.svelte';
  import CtaFinal from '$lib/components/CtaFinal.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ContactoPortal from '$lib/components/Contacto.svelte';
  import { isContactModalOpen } from '$lib/contactStore';

  $: isAdmin = $page.url.pathname.startsWith('/admin');
  $: isContacto = $page.url.pathname === '/contacto';

  afterNavigate((nav) => {
    // Si la ruta cambia y no es un ancla hash, asegurar que inicie siempre desde el header arriba
    if (nav.from?.url.pathname !== nav.to?.url.pathname && !nav.to?.url.hash) {
      window.scrollTo(0, 0);
    }
  });
</script>

<svelte:head>
  <title>Foxbyte</title>
  <link rel="icon" type="image/png" href="/favicon.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <!-- SOLUCIÓN DEFINITIVA: Usamos el valor de texto "anonymous" que es lo que TypeScript espera.
       Aunque en HTML 'crossorigin' sin valor funciona, Svelte con TypeScript es más estricto. -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

{#if isAdmin}
  <slot />
{:else}
  <div class="app-layout">
    <Navbar on:openContact={() => isContactModalOpen.set(true)} />
    <main class="page-container">
      <slot />
    </main>
    {#if !isContacto}
      <CtaFinal on:openContact={() => isContactModalOpen.set(true)} />
    {/if}
    <Footer />
    <ContactoPortal bind:isVisible={$isContactModalOpen} on:close={() => isContactModalOpen.set(false)} />
  </div>
{/if}

<style>
  .app-layout {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .page-container {
    flex: 1;
    width: 100%;
    overflow-x: hidden;
  }
</style>