<script lang="ts">
  //Layout.svelte
  import '../app.css';
  import { page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import CtaFinal from '$lib/components/CtaFinal.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ContactoPortal from '$lib/components/Contacto.svelte';
  import { isContactModalOpen } from '$lib/contactStore';

  $: isAdmin = $page.url.pathname.startsWith('/admin');
  $: isContacto = $page.url.pathname === '/contacto';
</script>

<svelte:head>
  <title>Foxbyte</title>
  <link rel="icon" type="image/png" href="/fox-logo.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <!-- SOLUCIÓN DEFINITIVA: Usamos el valor de texto "anonymous" que es lo que TypeScript espera.
       Aunque en HTML 'crossorigin' sin valor funciona, Svelte con TypeScript es más estricto. -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
</svelte:head>

{#if isAdmin}
  <slot />
{:else}
  <Navbar on:openContact={() => isContactModalOpen.set(true)} />
  <slot />
  {#if !isContacto}
    <CtaFinal on:openContact={() => isContactModalOpen.set(true)} />
  {/if}
  <Footer />
  <ContactoPortal bind:isVisible={$isContactModalOpen} on:close={() => isContactModalOpen.set(false)} />
{/if}