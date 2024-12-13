<script>
    import { writable } from 'svelte/store';
  
    let file;
    let uploadProgress = writable(0);
    let uploadStatus = writable('');
    let isUploading = writable(false);
    let chunkSize = 1024 * 1024; // 1MB
  
    async function uploadChunk(file, chunkNumber, totalChunks) {
      const start = chunkNumber * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
  
      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('chunk_number', chunkNumber + 1);
      formData.append('total_chunks', totalChunks);
  
      try {
        const response = await fetch('http://172.16.114.253:8000/upload/chunk', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to upload chunk');
        }
  
        const result = await response.json();
        console.log(result.message);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async function uploadFile() {
      if (!file) return;
  
      isUploading.set(true);
      uploadStatus.set('Upload started...');
  
      if (file.size > chunkSize) {
        const totalChunks = Math.ceil(file.size / chunkSize);
  
        for (let i = 0; i < totalChunks; i++) {
          try {
            await uploadChunk(file, i, totalChunks);
            uploadProgress.set(((i + 1) / totalChunks) * 100);
          } catch (error) {
            uploadStatus.set('Failed to upload file');
            isUploading.set(false);
            return;
          }
        }
  
        uploadStatus.set('File uploaded successfully');
      } else {
        const formData = new FormData();
        formData.append('file', file);
  
        try {
          const response = await fetch('http://172.16.114.253:8000/upload/single', {
            method: 'POST',
            body: formData,
          });
  
          if (!response.ok) {
            throw new Error('Failed to upload file');
          }
  
          const result = await response.json();
          console.log(result.message);
  
          uploadStatus.set('File uploaded successfully');
        } catch (error) {
          console.error(error);
          uploadStatus.set('Failed to upload file');
        }
      }
  
      isUploading.set(false);
    }
  
    function handleFileChange(event) {
      file = event.target.files[0];
      uploadProgress.set(0);
      uploadStatus.set('');
    }
  </script>
  
  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
      <h2 class="text-2xl font-bold">Upload a File</h2>
      <input type="file" on:change={handleFileChange} class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      <button on:click={uploadFile} class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Upload</button>
      {#if $isUploading}
        <div class="mt-4">
          <p>{$uploadStatus}</p>
          <progress max="100" value={$uploadProgress}></progress>
        </div>
      {/if}
    </div>
  </div>