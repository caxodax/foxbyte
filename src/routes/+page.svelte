<script lang="ts">
  //+page.svelte
  import Hero from '$lib/components/Hero.svelte';
  import Clientes from '$lib/components/Clientes.svelte';
  import Servicios from '$lib/components/Servicios.svelte';
  import Portafolio from '$lib/components/Portafolio.svelte';
  import PropuestaValor from '$lib/components/PropuestaValor.svelte';
  import Testimonios from '$lib/components/Testimonios.svelte';
  
  export let data;
</script>

<Hero />
<Clientes />
<Servicios />
<Portafolio initialPortfolioItems={data.portfolioItems} />
<PropuestaValor />
<Testimonios />