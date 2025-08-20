<script>
  // Esta línea importa todos nuestros estilos globales para que se apliquen en toda la app.
  import '../app.css';
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

<slot />