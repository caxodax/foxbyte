<script>
    //Ctafinal.svelte
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<section id="contacto" class="cta-final-section">
    <div class="cta-container">
        <h2>¿Tienes un proyecto en mente?</h2>
        <p>No esperes más. Entra a nuestro taller de ideas y comencemos a construir el futuro de tu negocio, juntos.</p>
        <button on:click={() => dispatch('openContact')}>
            Iniciar Colaboración
        </button>
    </div>
</section>

<style>
    .cta-final-section {
        background-color: var(--marfil-claro);
        padding: 6rem 1.5rem;
        text-align: center;
    }
    .cta-container {
        max-width: 700px;
        margin: 0 auto;
    }
    h2 {
        font-size: 2.5rem;
        color: var(--azul-petroleo);
        margin-bottom: 1rem;
    }
    p {
        color: var(--gris-grafito);
        font-size: 1.1rem;
        line-height: 1.7;
        margin-bottom: 2.5rem;
    }
    button {
        background: var(--terracota-suave);
        color: white;
        border: none;
        padding: 1rem 3rem;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 10px 20px rgba(210, 106, 58, 0.2);
    }
    button:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(210, 106, 58, 0.3);
    }
</style>