<script lang="ts">
  const brands = [
    { name: 'Nova Logistics', industry: 'Logística' },
    { name: 'Helix Finance', industry: 'Finanzas' },
    { name: 'Apex E-learning', industry: 'Educación' },
    { name: 'Zenith Retail', industry: 'E-commerce' },
    { name: 'Aura Tech', industry: 'SaaS' }
  ];
</script>

<section class="clientes-section">
  <div class="container">
    <p class="section-title">Empresas que confían en nuestra ingeniería</p>
    
    <!-- Marquee container for smooth continuous loop -->
    <div class="marquee-wrapper">
      <div class="marquee-content">
        {#each [...brands, ...brands] as brand}
          <div class="brand-logo">
            <span class="logo-icon">▲</span>
            <div class="logo-text">
              <span class="brand-name">{brand.name}</span>
              <span class="brand-industry">{brand.industry}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .clientes-section {
    background-color: var(--azul-petroleo, #0F172A);
    padding: 4rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    overflow: hidden;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(248, 250, 252, 0.4);
    text-align: center;
    margin-bottom: 3rem;
  }

  .marquee-wrapper {
    display: flex;
    overflow: hidden;
    position: relative;
    user-select: none;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 15%,
      rgba(0, 0, 0, 1) 85%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .marquee-content {
    display: flex;
    gap: 4rem;
    animation: scroll 25s linear infinite;
    min-width: 100%;
    padding: 1rem 0;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    filter: grayscale(1);
    opacity: 0.35;
    transition: all 0.3s ease;
    cursor: default;
  }

  .brand-logo:hover {
    filter: grayscale(0);
    opacity: 0.9;
    color: var(--terracota-suave, #FF6B00);
    transform: scale(1.03);
  }

  .logo-icon {
    font-size: 1.5rem;
    color: var(--terracota-suave, #FF6B00);
  }

  .logo-text {
    display: flex;
    flex-direction: column;
  }

  .brand-name {
    font-family: var(--font-principal, 'Montserrat', sans-serif);
    font-weight: 700;
    font-size: 1.15rem;
    color: white;
    letter-spacing: -0.01em;
  }

  .brand-industry {
    font-family: var(--font-secundaria, 'Open Sans', sans-serif);
    font-size: 0.7rem;
    color: rgba(248, 250, 252, 0.4);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 0.1rem;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-50% - 2rem));
    }
  }
</style>
