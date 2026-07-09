<script lang="ts">
    let fileInput: HTMLInputElement;
    let isUploading = false;
    let uploadedUrl: string | null = null;
    let errorMessage: string | null = null;

    async function handleUpload() {
        if (!fileInput.files || fileInput.files.length === 0) {
            errorMessage = 'Por favor selecciona una imagen.';
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('image', file);

        isUploading = true;
        errorMessage = null;

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error subiendo la imagen');
            }

            uploadedUrl = data.url;
        } catch (error: any) {
            errorMessage = error.message;
        } finally {
            isUploading = false;
        }
    }
</script>

<div class="container mx-auto p-8 max-w-lg mt-10 border rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
    <h1 class="text-2xl font-bold mb-4">Prueba de Subida a Cloudflare R2</h1>
    
    <div class="mb-4">
        <label for="imageUpload" class="block text-sm font-medium mb-2">Selecciona una imagen:</label>
        <input 
            type="file" 
            id="imageUpload"
            accept="image/*"
            bind:this={fileInput}
            disabled={isUploading}
            class="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
    </div>

    <button 
        on:click={handleUpload}
        disabled={isUploading}
        class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
    >
        {isUploading ? 'Subiendo imagen a R2...' : 'Subir Imagen'}
    </button>

    {#if errorMessage}
        <div class="mt-4 bg-red-100 text-red-700 p-3 rounded">
            {errorMessage}
        </div>
    {/if}

    {#if uploadedUrl}
        <div class="mt-6">
            <h2 class="text-lg font-semibold mb-2 text-green-600">¡Imagen subida con éxito!</h2>
            <div class="border rounded-lg overflow-hidden mb-2">
                <img src={uploadedUrl} alt="Imagen subida" class="w-full object-cover" />
            </div>
            <div class="text-xs break-all bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">
                    {uploadedUrl}
                </a>
            </div>
        </div>
    {/if}
</div>
