<script>
  import { onMount } from 'svelte';
  import { db } from '$lib/firebase';
  import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

  let services = [];
  let loading = true;
  let isEditing = false;
  
  // Estado del formulario
  let currentId = null;
  let title = '';
  let description = '';
  let iconSvg = '';
  let subServices = ''; // Se ingresan separados por comas

  const servicesCollection = collection(db, 'services');

  onMount(async () => {
    await fetchServices();
  });

  async function fetchServices() {
    loading = true;
    try {
      const querySnapshot = await getDocs(servicesCollection);
      services = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error obteniendo servicios: ", error);
    } finally {
      loading = false;
    }
  }

  async function handleSubmit() {
    loading = true;
    const subServicesArray = subServices.split(',').map(s => s.trim()).filter(s => s);
    
    const serviceData = {
      title,
      description,
      icon_svg: iconSvg,
      sub_services: subServicesArray
    };

    try {
      if (isEditing) {
        const docRef = doc(db, 'services', currentId);
        await updateDoc(docRef, serviceData);
      } else {
        await addDoc(servicesCollection, serviceData);
      }
      resetForm();
      await fetchServices();
    } catch (error) {
      console.error("Error guardando el servicio: ", error);
    } finally {
      loading = false;
    }
  }

  function editService(service) {
    isEditing = true;
    currentId = service.id;
    title = service.title;
    description = service.description;
    iconSvg = service.icon_svg || '';
    subServices = (service.sub_services || []).join(', ');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteService(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      loading = true;
      try {
        await deleteDoc(doc(db, 'services', id));
        await fetchServices();
      } catch (error) {
        console.error("Error eliminando: ", error);
        loading = false;
      }
    }
  }

  function resetForm() {
    isEditing = false;
    currentId = null;
    title = '';
    description = '';
    iconSvg = '';
    subServices = '';
  }
</script>

<svelte:head>
  <title>Gestionar Servicios - Foxbyte Admin</title>
</svelte:head>

<div class="header-section">
  <h1>Gestionar Servicios</h1>
  <p>Crea, edita o elimina los servicios que aparecen en la página principal.</p>
</div>

<div class="crud-container">
  <!-- Formulario -->
  <div class="form-card">
    <h2>{isEditing ? 'Editar Servicio' : 'Nuevo Servicio'}</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="title">Título del Servicio</label>
        <input type="text" id="title" bind:value={title} required placeholder="Ej: Desarrollo a la Medida" disabled={loading} />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea id="description" bind:value={description} required rows="3" placeholder="Descripción breve del servicio..." disabled={loading}></textarea>
      </div>
      
      <div class="form-group">
        <label for="subServices">Sub-servicios (separados por coma)</label>
        <input type="text" id="subServices" bind:value={subServices} placeholder="Sistemas ERP, Aplicaciones Empresariales, etc." disabled={loading} />
      </div>

      <div class="form-group">
        <label for="iconSvg">Código SVG del Icono (Opcional)</label>
        <textarea id="iconSvg" bind:value={iconSvg} rows="3" placeholder='<svg xmlns="http://www.w3.org/2000/svg"...' disabled={loading}></textarea>
        <small>Busca iconos gratis en <a href="https://tabler-icons.io/" target="_blank">Tabler Icons</a> y copia el código SVG.</small>
      </div>

      <div class="form-actions">
        {#if isEditing}
          <button type="button" class="btn-secondary" on:click={resetForm} disabled={loading}>Cancelar</button>
        {/if}
        <button type="submit" class="btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : (isEditing ? 'Actualizar Servicio' : 'Añadir Servicio')}
        </button>
      </div>
    </form>
  </div>

  <!-- Lista -->
  <div class="list-card">
    <h2>Servicios Actuales</h2>
    
    {#if loading && services.length === 0}
      <div class="loading-state">Cargando servicios...</div>
    {:else if services.length === 0}
      <div class="empty-state">No hay servicios registrados aún.</div>
    {:else}
      <div class="items-list">
        {#each services as service (service.id)}
          <div class="item-row">
            <div class="item-info">
              <div class="item-header">
                {#if service.icon_svg}
                  <div class="icon-preview">{@html service.icon_svg}</div>
                {/if}
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
              <div class="tags">
                {#each service.sub_services || [] as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
            </div>
            <div class="item-actions">
              <button class="action-btn edit" on:click={() => editService(service)} aria-label="Editar" disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
              </button>
              <button class="action-btn delete" on:click={() => deleteService(service.id)} aria-label="Eliminar" disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .header-section { margin-bottom: 2rem; }
  h1 { font-size: 1.8rem; color: var(--azul-petroleo, #2C3E50); margin-bottom: 0.5rem; }
  .header-section p { color: var(--gris-grafito, #4A4A4A); }

  .crud-container { display: grid; grid-template-columns: 1fr; gap: 2rem; }
  @media (min-width: 992px) { .crud-container { grid-template-columns: 350px 1fr; align-items: start; } }

  .form-card, .list-card {
    background: white; border-radius: 12px; padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;
  }
  
  h2 { font-size: 1.25rem; color: var(--azul-petroleo, #2C3E50); margin-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; }

  .form-group { margin-bottom: 1.25rem; }
  label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--azul-petroleo, #2C3E50); margin-bottom: 0.5rem; }
  input, textarea {
    width: 100%; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 8px;
    font-family: inherit; font-size: 0.95rem; box-sizing: border-box; transition: all 0.2s;
  }
  input:focus, textarea:focus { outline: none; border-color: var(--terracota-suave, #E67E22); box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1); }
  input:disabled, textarea:disabled { background-color: #f1f5f9; cursor: not-allowed; }
  small { display: block; font-size: 0.8rem; color: #64748b; margin-top: 0.25rem; }
  small a { color: var(--terracota-suave, #E67E22); }

  .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
  button { padding: 0.75rem 1.25rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; font-size: 0.95rem; }
  .btn-primary { background-color: var(--terracota-suave, #E67E22); color: white; flex-grow: 1; }
  .btn-primary:hover:not(:disabled) { background-color: var(--ciruela-profunda, #5E3A6B); }
  .btn-secondary { background-color: #e2e8f0; color: var(--azul-petroleo, #2C3E50); }
  .btn-secondary:hover:not(:disabled) { background-color: #cbd5e1; }
  button:disabled { opacity: 0.6; cursor: not-allowed; }

  .items-list { display: flex; flex-direction: column; gap: 1rem; }
  .item-row { display: flex; justify-content: space-between; gap: 1rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc; }
  
  .item-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
  .icon-preview { width: 32px; height: 32px; background-color: var(--terracota-suave, #E67E22); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
  .icon-preview :global(svg) { width: 18px; height: 18px; }
  .item-info h3 { margin: 0; font-size: 1.1rem; color: var(--azul-petroleo, #2C3E50); }
  .item-info p { margin: 0 0 0.5rem 0; font-size: 0.9rem; color: var(--gris-grafito, #4A4A4A); line-height: 1.4; }
  
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .tag { background: #e2e8f0; color: #475569; padding: 0.2rem 0.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }

  .item-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
  .action-btn { padding: 0.5rem; border-radius: 6px; display: grid; place-items: center; background: white; border: 1px solid #cbd5e1; color: #64748b; }
  .action-btn:hover:not(:disabled) { color: white; border-color: transparent; }
  .action-btn.edit:hover:not(:disabled) { background-color: #3b82f6; }
  .action-btn.delete:hover:not(:disabled) { background-color: #ef4444; }

  .loading-state, .empty-state { text-align: center; padding: 2rem; color: #64748b; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1; }
</style>
