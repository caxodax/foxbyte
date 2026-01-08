<script lang="ts">
  //Herobackground.svelte
  import { onMount } from 'svelte';

  // --- VARIABLES DE CONFIGURACIÓN ---
  // Siéntete libre de jugar con estos valores para ajustar el efecto
  const PARTICLE_COUNT = 70; // Cantidad de partículas
  const MAX_LINK_DISTANCE = 130; // Distancia máxima para que se formen las líneas
  const MOUSE_INTERACTION_RADIUS = 200; // Radio de interacción con el ratón
  const PARTICLE_SPEED = 0.5; // Velocidad de las partículas

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let particles: Particle[] = [];
  let mouse = { x: -1000, y: -1000 }; // Posición inicial del ratón fuera de la pantalla

  class Particle {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    color: string;

    constructor(x: number, y: number, color: string) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
      this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
      this.color = color;
    }

    draw() {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      this.x += this.vx;
      this.y += this.vy;
    }
  }

  function init() {
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    ctx = canvas.getContext('2d');
    particles = [];

    // Usamos los colores de la paleta
    const colors = ['#2C3E50', '#8E44AD', '#34495E'];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = colors[i % colors.length];
      particles.push(new Particle(x, y, color));
    }
  }

  function connect() {
    if (!ctx) return;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MAX_LINK_DISTANCE) {
          ctx.strokeStyle = '#34495E'; // Gris Volcánico para las líneas
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = 1 - distance / MAX_LINK_DISTANCE;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }
  
  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      // Interacción con el ratón
      const dxMouse = mouse.x - p.x;
      const dyMouse = mouse.y - p.y;
      const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      
      if (distanceMouse < MOUSE_INTERACTION_RADIUS) {
        p.x -= dxMouse / 40; // Empuja las partículas lejos del ratón
        p.y -= dyMouse / 40;
      }

      p.update();
      p.draw();
    });
    
    connect();
    requestAnimationFrame(animate);
  }

  onMount(() => {
    init();
    animate();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', init);

    // Limpieza al destruir el componente
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', init);
    };
  });
</script>

<div class="hero-background-container">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .hero-background-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  canvas {
    display: block; /* Elimina un pequeño espacio bajo el canvas */
    opacity: 0.7; /* Hace el efecto general más sutil */
  }
</style>