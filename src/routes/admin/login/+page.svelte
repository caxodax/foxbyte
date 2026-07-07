<script>
  import { auth } from '$lib/firebase';
  import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';
  let loading = false;
  let isRegistering = false; // Permite crear el primer usuario temporalmente

  async function handleSubmit() {
    error = '';
    loading = true;
    
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // El onAuthStateChanged en +layout.svelte manejará la redirección
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        error = 'Credenciales inválidas. Verifica tu correo y contraseña.';
      } else if (err.code === 'auth/email-already-in-use') {
        error = 'Este correo ya está registrado.';
      } else {
        error = 'Ocurrió un error. Inténtalo de nuevo.';
      }
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>{isRegistering ? 'Registro' : 'Login'} - Foxbyte Admin</title>
</svelte:head>

<div class="login-container">
  <div class="login-box">
    <div class="logo-placeholder">
      <!-- Icono de zorro simple -->
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-brand-firefox"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 3a9 9 0 0 1 9 9" /><path d="M12 21a9 9 0 0 1 -9 -9" /></svg>
    </div>
    
    <h1>{isRegistering ? 'Crear Administrador' : 'Panel de Administración'}</h1>
    <p class="subtitle">Foxbyte Workspace</p>

    {#if error}
      <div class="error-message">
        {error}
      </div>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input 
          type="email" 
          id="email" 
          bind:value={email} 
          placeholder="admin@foxbyte.com" 
          required 
          disabled={loading}
        />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input 
          type="password" 
          id="password" 
          bind:value={password} 
          placeholder="••••••••" 
          required 
          disabled={loading}
          minlength="6"
        />
      </div>

      <button type="submit" class="submit-btn" disabled={loading}>
        {#if loading}
          Procesando...
        {:else}
          {isRegistering ? 'Crear Usuario' : 'Iniciar Sesión'}
        {/if}
      </button>
    </form>
    
    <div class="toggle-mode">
      <button class="toggle-btn" type="button" on:click={() => isRegistering = !isRegistering}>
        {isRegistering ? 'Ya tengo una cuenta. Iniciar sesión.' : '¿No hay usuarios? Crear uno nuevo.'}
      </button>
    </div>
  </div>
</div>

<style>
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--marfil-claro, #F8F6F3);
    background-image: radial-gradient(var(--gris-grafito) 1px, transparent 1px);
    background-size: 30px 30px;
    background-position: 0 0;
    opacity: 0.95;
    padding: 1rem;
  }

  .login-box {
    background: white;
    padding: 3rem 2.5rem;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(44, 62, 80, 0.1);
    width: 100%;
    max-width: 420px;
    text-align: center;
  }

  .logo-placeholder {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, var(--terracota-suave, #E67E22), var(--ambar-luminoso, #F1C40F));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: white;
    box-shadow: 0 8px 20px rgba(230, 126, 34, 0.3);
  }

  h1 {
    font-size: 1.5rem;
    color: var(--azul-petroleo, #2C3E50);
    margin-bottom: 0.25rem;
  }

  .subtitle {
    color: var(--gris-grafito, #4A4A4A);
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  .error-message {
    background-color: #fee2e2;
    color: #b91c1c;
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    border: 1px solid #f87171;
  }

  .form-group {
    text-align: left;
    margin-bottom: 1.25rem;
  }

  label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--azul-petroleo, #2C3E50);
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-family: inherit;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: var(--terracota-suave, #E67E22);
    box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1);
  }

  input:disabled {
    background-color: #f1f5f9;
    cursor: not-allowed;
  }

  .submit-btn {
    width: 100%;
    padding: 1rem;
    background-color: var(--azul-petroleo, #2C3E50);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }

  .submit-btn:hover:not(:disabled) {
    background-color: var(--ciruela-profunda, #5E3A6B);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(94, 58, 107, 0.3);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .toggle-mode {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }
  
  .toggle-btn {
    background: none;
    border: none;
    color: var(--terracota-suave, #E67E22);
    font-size: 0.85rem;
    cursor: pointer;
    font-weight: 600;
  }
  
  .toggle-btn:hover {
    text-decoration: underline;
  }
</style>
