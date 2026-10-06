<script lang="ts">
  // Clientes.svelte - Ecosistema Tecnológico de Producción Foxbyte
  const stack = [
    {
      name: 'SvelteKit',
      category: 'Frontend & SSR',
      color: '#FF3E00',
      svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20.5 5.5c-1.2-2.1-3.6-3.3-6.1-3.1-2.2.2-4.1 1.4-5.1 3.3L6.1 11c-.5.9-.6 2-.1 2.9.5 1 1.4 1.7 2.4 1.9l3.3.4c.5.1.9.3 1.2.7.3.4.4.9.2 1.4-.2.8-1 1.4-1.8 1.4-1 0-1.8-.7-2-1.7l-3.3-.4c.3 2.8 2.6 4.9 5.4 4.9 2.2 0 4.1-1.3 5-3.3l3.2-5.3c.5-.9.6-2 .1-2.9-.5-1-1.4-1.7-2.4-1.9l-3.3-.4c-.5-.1-.9-.3-1.2-.7-.3-.4-.4-.9-.2-1.4.2-.8 1-1.4 1.8-1.4.9 0 1.7.6 2 1.5l3.5-.5z"/></svg>`
    },
    {
      name: 'TypeScript',
      category: 'Type Safety & Core',
      color: '#3178C6',
      svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3 3h18v18H3V3zm8.5 7.5h-5v1.5h1.75V18H10v-6h1.5V10.5zm3.75 3.75c0-.69.56-1.25 1.25-1.25h1.75V11.5H15V10h4.75v3.25c0 .69-.56 1.25-1.25 1.25H16.75v1.75h3.25V18h-4.75v-3.75z"/></svg>`
    },
    {
      name: 'Python',
      category: 'AI & Machine Learning',
      color: '#3776AB',
      svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M11.9 2c-3.3 0-5.3 1.5-5.3 3.6v2.1h5.3v.8H4.6C2.3 8.5.5 10.3.5 12.6s1.8 4.1 4.1 4.1h1.8v-2.7c0-2.1 1.8-3.8 3.9-3.8h5.2c1.5 0 2.7-1.2 2.7-2.7V5.6c0-2.1-2-3.6-6.3-3.6zm-1.8 1.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zM19.4 7.3h-1.8v2.7c0 2.1-1.8 3.8-3.9 3.8H8.5c-1.5 0-2.7 1.2-2.7 2.7v4.6c0 2.1 2 3.6 6.3 3.6 3.3 0 5.3-1.5 5.3-3.6V19h-5.3v-.8h7.3c2.3 0 4.1-1.8 4.1-4.1s-1.8-4.1-4.1-4.1v-2.7zm-5.5 13.1c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z"/></svg>`
    },
    {
      name: 'AWS Cloud',
      category: 'Cloud & Edge',
      color: '#FF9900',
      svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8.2 11.2c-.2-.7-.6-1.3-1.2-1.7-.6-.4-1.3-.6-2.1-.6-.9 0-1.7.3-2.3.8-.6.5-1 1.2-1.2 2.1l1.5.4c.1-.5.4-1 .8-1.3.4-.3.9-.5 1.4-.5.6 0 1.1.2 1.5.5.4.3.6.8.7 1.4l.1.6c-.7 0-1.4.1-2 .2-.7.1-1.3.4-1.8.8-.5.4-.7.9-.7 1.6 0 .6.2 1.2.7 1.6.5.4 1.1.6 1.9.6.8 0 1.4-.2 1.9-.7.5-.5.8-1.1.9-1.8v-.9zm-1.5 3c-.1.5-.3.9-.7 1.2-.4.3-.8.4-1.4.4-.4 0-.8-.1-1.1-.3-.3-.2-.4-.6-.4-1 0-.4.2-.8.5-1 .3-.2.8-.3 1.4-.4.6-.1 1.2-.1 1.7-.1v1.2zm6.2 2.6l-1.9-6.6h1.6l1.2 4.9 1.3-4.9h1.4l1.3 4.9 1.2-4.9h1.6L19 16.8h-1.5l-1.3-4.8-1.3 4.8h-2zm-9 3.4c4.6 2.3 10.3 1.8 14.5-.9l.4.5c-4.5 2.9-10.5 3.4-15.3 1l.4-.6zm15.4-1.7l1.7.8-1.9 1.2.2-2z"/></svg>`
    },
    {
      name: 'PostgreSQL',
      category: 'Data Architecture',
      color: '#336791',
      svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93V17h-2v1.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 11.5v1h2v-1.5l1.5.75V14h2v-1.25l2-.75v1h2v-1.5l1.79-2.39c.13.58.21 1.17.21 1.79 0 4.08-3.05 7.44-7 7.93z"/></svg>`
    },
    {
      name: 'Docker',
      category: 'DevOps & Containers',
      color: '#2496ED',
      svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5zm9 8.5c-.3 0-.6.1-.9.2-.5-.4-1.2-.6-2-.6-1.5 0-2.8.9-3.3 2.2-.6-.1-1.3-.1-2 .1-.5-.8-1.4-1.3-2.5-1.3-.4 0-.8.1-1.2.2V11H1v3.2c0 2.8 2.2 5.1 5 5.1h9.4c3.4 0 6.2-2.7 6.3-6.1.1-.4.2-.8.2-1.2-.7-.3-1.3-.5-1.9-.5z"/></svg>`
    },
    {
      name: 'Node.js',
      category: 'High-Concurrency Runtime',
      color: '#5FA04E',
      svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2L3.5 6.9v9.8L12 21.6l8.5-4.9V6.9L12 2zm6.9 13.9L12 19.9l-6.9-4V8.1L12 4.1l6.9 4v7.8z"/></svg>`
    },
    {
      name: 'Redis',
      category: 'Cache & Async Queues',
      color: '#DC382D',
      svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M2 9.5L12 4l10 5.5-10 5.5L2 9.5zm0 5L12 20l10-5.5-2.2-1.2L12 17.5l-7.8-4.2L2 14.5z"/></svg>`
    },
    {
      name: 'Tailwind CSS',
      category: 'Design Systems',
      color: '#06B6D4',
      svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/></svg>`
    },
    {
      name: 'Firebase',
      category: 'Realtime Sync Engine',
      color: '#FFCA28',
      svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M4.6 17.5L6.8 3.8c.1-.4.5-.6.8-.4l3.1 5.9-6.1 8.2zm14.8 0L14 3.7c-.1-.4-.6-.5-.8-.2L3.6 17.5c-.3.4-.2 1 .3 1.2l7.7 4.3c.3.2.7.2 1 0l7.7-4.3c.5-.2.6-.8.3-1.2zM9.5 12l2.1-4.1c.1-.3.5-.3.7 0l2.3 4.1-5.1 0z"/></svg>`
    }
  ];
</script>

<section class="clientes-section" aria-label="Ecosistema e infraestructura tecnológica">
  <div class="container">
    <header class="stack-header">
      <div class="stack-badge">
        <span class="pulse-dot"></span>
        <span class="badge-label">Stack de Producción</span>
      </div>
      <p class="section-title">
        Tecnología seleccionada para alta disponibilidad, seguridad y rendimiento predecible.
      </p>
    </header>
    
    <!-- Track continuo de marquee sin saltos ni desbordamientos -->
    <div class="marquee-track">
      <div class="marquee-group">
        {#each stack as tech}
          <div class="tech-item" style="--hover-color: {tech.color}">
            <div class="tech-icon" aria-hidden="true">
              {@html tech.svg}
            </div>
            <div class="tech-text">
              <span class="tech-name">{tech.name}</span>
              <span class="tech-category">{tech.category}</span>
            </div>
          </div>
        {/each}
      </div>

      <!-- Duplicado exacto para bucle infinito suave -->
      <div class="marquee-group" aria-hidden="true">
        {#each stack as tech}
          <div class="tech-item" style="--hover-color: {tech.color}">
            <div class="tech-icon">
              {@html tech.svg}
            </div>
            <div class="tech-text">
              <span class="tech-name">{tech.name}</span>
              <span class="tech-category">{tech.category}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .clientes-section {
    background-color: var(--color-background, #090D16);
    padding: 4.5rem 1.5rem;
    border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
    border-top: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  .stack-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 2.75rem;
  }

  .stack-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.35rem 0.95rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 0.9rem;
  }

  .pulse-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: var(--color-primary, #FF6600);
    box-shadow: 0 0 8px var(--color-primary, #FF6600);
    animation: dot-pulse 2s infinite ease-in-out;
  }

  @keyframes dot-pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.4;
      transform: scale(0.85);
    }
  }

  .badge-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: -0.01em;
  }

  .section-title {
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--color-text-secondary, #CBD5E1);
    margin: 0;
    max-width: 58ch;
    text-wrap: pretty;
    font-weight: 400;
  }

  /* Marquee Track Continuo */
  .marquee-track {
    display: flex;
    overflow: hidden;
    position: relative;
    user-select: none;
    gap: 1.5rem;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 8%,
      rgba(0, 0, 0, 1) 92%,
      rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 8%,
      rgba(0, 0, 0, 1) 92%,
      rgba(0, 0, 0, 0) 100%
    );
    padding: 0.5rem 0;
  }

  .marquee-group {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    min-width: 100%;
    animation: scroll-track 35s linear infinite;
    will-change: transform;
  }

  .marquee-track:hover .marquee-group {
    animation-play-state: paused;
  }

  .tech-item {
    display: inline-flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.65rem 1.25rem;
    background: var(--color-surface, rgba(17, 24, 39, 0.65));
    border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
    border-radius: 12px;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: default;
    flex-shrink: 0;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .tech-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.25s ease;
  }

  .tech-text {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .tech-name {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--color-text-primary, #F8FAFC);
    letter-spacing: -0.015em;
    transition: color 0.25s ease;
  }

  .tech-category {
    font-size: 0.72rem;
    color: var(--color-text-muted, #94A3B8);
    font-weight: 400;
    margin-top: 0.1rem;
    font-variant-numeric: tabular-nums;
  }

  /* Hover micro-interactions */
  .tech-item:hover {
    background: var(--color-surface-elevated, rgba(23, 32, 51, 0.82));
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5);
  }

  .tech-item:hover .tech-icon {
    color: var(--hover-color, var(--color-primary, #FF6600));
    transform: scale(1.08);
  }

  @keyframes scroll-track {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - 1.5rem));
    }
  }

  /* Accesibilidad: Reducción de movimiento */
  @media (prefers-reduced-motion: reduce) {
    .pulse-dot {
      animation: none;
    }
    .marquee-track {
      mask-image: none;
      -webkit-mask-image: none;
      overflow-x: hidden;
    }
    .marquee-group {
      animation: none;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
    .marquee-group[aria-hidden="true"] {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .clientes-section {
      padding: 3rem 1rem;
    }
    .section-title {
      font-size: 0.88rem;
    }
    .tech-item {
      padding: 0.55rem 1rem;
    }
    .tech-name {
      font-size: 0.85rem;
    }
    .tech-category {
      font-size: 0.68rem;
    }
  }
</style>
