<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Servicios from '$lib/components/Servicios.svelte';
  import PropuestaValor from '$lib/components/PropuestaValor.svelte';
  import Portafolio from '$lib/components/Portafolio.svelte';
  import Footer from '$lib/components/Footer.svelte';
  
  import CtaFinal from '$lib/components/CtaFinal.svelte';
  import ContactoPortal from '$lib/components/Contacto.svelte';
  
  let isContactModalVisible = false;
</script>

<!-- CORRECCIÓN: Añadido el listener on:openContact -->
<Navbar on:openContact={() => isContactModalVisible = true} />
<Hero />
<Servicios />
<Portafolio />
<PropuestaValor />

<CtaFinal on:openContact={() => isContactModalVisible = true} />
<Footer />

<ContactoPortal bind:isVisible={isContactModalVisible} on:close={() => isContactModalVisible = false} />