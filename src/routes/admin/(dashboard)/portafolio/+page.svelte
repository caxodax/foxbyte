<script>
  import { onMount } from 'svelte';
  import { db } from '$lib/firebase';
  import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

  let portfolioItems = [];
  let loading = true;
  let isEditing = false;
  
  // Estado del formulario
  let currentId = null;
  let title = '';
  let category = '';
  let description = '';
  let imageUrl = '';
  let stackStr = ''; // Separado por comas
  
  // KPIs
  let kpi1Value = '';
  let kpi1Label = '';
  let kpi2Value = '';
  let kpi2Label = '';

  const portfolioCollection = collection(db, 'portfolio');

  onMount(async () => {
    await fetchPortfolio();
  });

  async function fetchPortfolio() {
    loading = true;
    try {
      const querySnapshot = await getDocs(portfolioCollection);
      portfolioItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error obteniendo portafolio: ", error);
    } finally {
      loading = false;
    }
  }

  async function handleSubmit() {
    loading = true;
    const stackArray = stackStr.split(',').map(s => s.trim()).filter(s => s);
    
    const kpis = [];
    if (kpi1Value) kpis.push({ value: kpi1Value, label: kpi1Label });
    if (kpi2Value) kpis.push({ value: kpi2Value, label: kpi2Label });
    
    const itemData = {
      title,
      category,
      description,
      image_url: imageUrl,
      stack: stackArray,
      kpis: kpis
    };

    try {
      if (isEditing) {
        const docRef = doc(db, 'portfolio', currentId);
        await updateDoc(docRef, itemData);
      } else {
        await addDoc(portfolioCollection, itemData);
      }
      resetForm();
      await fetchPortfolio();
    } catch (error) {
      console.error("Error guardando el proyecto: ", error);
    } finally {
      loading = false;
    }
  }

  function editItem(item) {
    isEditing = true;
    currentId = item.id;
    title = item.title;
    category = item.category;
    description = item.description;
    imageUrl = item.image_url || '';
    stackStr = (item.stack || []).join(', ');
    
    const kpis = item.kpis || [];
    kpi1Value = kpis[0] ? kpis[0].value : '';
    kpi1Label = kpis[0] ? kpis[0].label : '';
    kpi2Value = kpis[1] ? kpis[1].value : '';
    kpi2Label = kpis[1] ? kpis[1].label : '';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteItem(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto del portafolio?')) {
      loading = true;
      try {
        await deleteDoc(doc(db, 'portfolio', id));
        await fetchPortfolio();
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
    category = '';
    description = '';
    imageUrl = '';
    stackStr = '';
    kpi1Value = '';
    kpi1Label = '';
    kpi2Value = '';
    kpi2Label = '';
  }
</script>

<svelte:head>
  <title>Gestionar Portafolio - Foxbyte Admin</title>
</svelte:head>

<div class="header-section">
  <h1>Gestionar Portafolio</h1>
  <p>Añade o edita los casos de estudio que se muestran en el carrusel principal.</p>
</div>

<div class="crud-container">
  <!-- Formulario -->
  <div class="form-card">
    <h2>{isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="title">Título del Proyecto</label>
        <input type="text" id="title" bind:value={title} required placeholder="Ej: Dashboard Inteligente" disabled={loading} />
      </div>
      
      <div class="form-group">
        <label for="category">Categoría</label>
        <input type="text" id="category" bind:value={category} required placeholder="Ej: Análisis de Datos" disabled={loading} />
      </div>

      <div class="form-group">
        <label for="description">Descripción Breve</label>
        <textarea id="description" bind:value={description} required rows="2" placeholder="Describe el reto y la solución..." disabled={loading}></textarea>
      </div>
      
      <div class="form-group">
        <label for="imageUrl">URL de la Imagen (Cover)</label>
        <input type="url" id="imageUrl" bind:value={imageUrl} required placeholder="https://ejemplo.com/imagen.jpg" disabled={loading} />
      </div>
      
      <div class="form-group">
        <label for="stackStr">Stack Tecnológico (separado por comas)</label>
        <input type="text" id="stackStr" bind:value={stackStr} placeholder="SvelteKit, Node.js, Firebase..." disabled={loading} />
      </div>

      <div class="kpis-section">
        <h3>KPIs (Opcional)</h3>
        
        <div class="kpi-row">
          <div class="form-group half">
            <label>KPI 1 - Valor (Ej: -40%)</label>
            <input type="text" bind:value={kpi1Value} disabled={loading} />
          </div>
          <div class="form-group half">
            <label>KPI 1 - Etiqueta (Ej: tiempo admin)</label>
            <input type="text" bind:value={kpi1Label} disabled={loading} />
          </div>
        </div>
        
        <div class="kpi-row">
          <div class="form-group half">
            <label>KPI 2 - Valor (Ej: +28%)</label>
            <input type="text" bind:value={kpi2Value} disabled={loading} />
          </div>
          <div class="form-group half">
            <label>KPI 2 - Etiqueta (Ej: retención)</label>
            <input type="text" bind:value={kpi2Label} disabled={loading} />
          </div>
        </div>
      </div>

      <div class="form-actions">
        {#if isEditing}
          <button type="button" class="btn-secondary" on:click={resetForm} disabled={loading}>Cancelar</button>
        {/if}
        <button type="submit" class="btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : (isEditing ? 'Actualizar Proyecto' : 'Añadir Proyecto')}
        </button>
      </div>
    </form>
  </div>

  <!-- Lista -->
  <div class="list-card">
    <h2>Proyectos en Portafolio</h2>
    
    {#if loading && portfolioItems.length === 0}
      <div class="loading-state">Cargando portafolio...</div>
    {:else if portfolioItems.length === 0}
      <div class="empty-state">No hay proyectos registrados aún.</div>
    {:else}
      <div class="items-grid">
        {#each portfolioItems as item (item.id)}
          <div class="item-card">
            <div class="item-image" style="background-image: url({item.image_url});">
              {#if !item.image_url}
                <span>Sin Imagen</span>
              {/if}
              <div class="item-actions-overlay">
                <button class="action-btn edit" on:click={() => editItem(item)} aria-label="Editar" disabled={loading}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
                </button>
                <button class="action-btn delete" on:click={() => deleteItem(item.id)} aria-label="Eliminar" disabled={loading}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </button>
              </div>
            </div>
            
            <div class="item-info">
              <span class="category">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              
              <div class="tags">
                {#each item.stack || [] as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
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
  @media (min-width: 1024px) { .crud-container { grid-template-columns: 400px 1fr; align-items: start; } }

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
  input:focus, textarea:focus { outline: none; border-color: var(--ciruela-profunda, #5E3A6B); box-shadow: 0 0 0 3px rgba(94, 58, 107, 0.1); }
  input:disabled, textarea:disabled { background-color: #f1f5f9; cursor: not-allowed; }

  .kpis-section { margin-top: 1.5rem; padding: 1rem; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; }
  .kpis-section h3 { font-size: 0.95rem; color: var(--azul-petroleo, #2C3E50); margin-top: 0; margin-bottom: 1rem; }
  .kpi-row { display: flex; gap: 1rem; }
  .form-group.half { flex: 1; margin-bottom: 0.75rem; }
  .kpi-row:last-child .form-group { margin-bottom: 0; }

  .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
  button { padding: 0.75rem 1.25rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; font-size: 0.95rem; }
  .btn-primary { background-color: var(--azul-petroleo, #2C3E50); color: white; flex-grow: 1; }
  .btn-primary:hover:not(:disabled) { background-color: var(--terracota-suave, #E67E22); }
  .btn-secondary { background-color: #e2e8f0; color: var(--azul-petroleo, #2C3E50); }
  .btn-secondary:hover:not(:disabled) { background-color: #cbd5e1; }
  button:disabled { opacity: 0.6; cursor: not-allowed; }

  .items-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
  
  .item-card { border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; background: white; display: flex; flex-direction: column; transition: transform 0.2s; }
  .item-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
  
  .item-image { height: 160px; background-color: #cbd5e1; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; }
  
  .item-actions-overlay { position: absolute; top: 0; right: 0; padding: 0.75rem; display: flex; gap: 0.5rem; opacity: 0; transition: opacity 0.2s; background: linear-gradient(to bottom left, rgba(0,0,0,0.6) 0%, transparent 100%); border-bottom-left-radius: 20px; }
  .item-card:hover .item-actions-overlay { opacity: 1; }
  
  .action-btn { padding: 0.4rem; border-radius: 6px; display: grid; place-items: center; background: white; border: none; color: var(--azul-petroleo, #2C3E50); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  .action-btn:hover:not(:disabled) { color: white; }
  .action-btn.edit:hover:not(:disabled) { background-color: #3b82f6; }
  .action-btn.delete:hover:not(:disabled) { background-color: #ef4444; }

  .item-info { padding: 1.25rem; flex-grow: 1; display: flex; flex-direction: column; }
  .category { font-size: 0.75rem; font-weight: 700; color: var(--terracota-suave, #E67E22); text-transform: uppercase; margin-bottom: 0.5rem; }
  .item-info h3 { margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--azul-petroleo, #2C3E50); line-height: 1.3; }
  .item-info p { margin: 0 0 1rem 0; font-size: 0.9rem; color: var(--gris-grafito, #4A4A4A); line-height: 1.5; flex-grow: 1; }
  
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .tag { background: #f1f5f9; color: #475569; padding: 0.2rem 0.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }

  .loading-state, .empty-state { text-align: center; padding: 3rem; color: #64748b; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1; }
</style>
