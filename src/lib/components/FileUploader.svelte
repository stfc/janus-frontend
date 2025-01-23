<script>
	import SparkMD5 from 'spark-md5';
	import { createEventDispatcher } from 'svelte';

	let file;
	let uploadProgress = 0;
	let uploadStatus = '';
	let isUploading = false;
	const chunkSize = 1024 * 1024; // 1MB
	const dispatch = createEventDispatcher();

	async function uploadChunk(file, chunkNumber, totalChunks) {
		const start = chunkNumber * chunkSize;
		const end = Math.min(start + chunkSize, file.size);
		const chunk = file.slice(start, end);

		// Compute MD5 hash for the chunk
		const chunkArrayBuffer = await chunk.arrayBuffer();
		const chunkHash = SparkMD5.ArrayBuffer.hash(chunkArrayBuffer);
		console.log(`Chunk ${chunkNumber + 1} MD5 Hash: ${chunkHash}`);

		const formData = new FormData();
		formData.append('file', new File([chunk], file.name)); // Set the original filename
		formData.append('chunk_number', chunkNumber); // Ensure chunk_number is correctly passed
		formData.append('total_chunks', totalChunks);
		formData.append('chunk_hash', chunkHash); // Append the chunk hash

		try {
			const response = await fetch('api/upload/chunk', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Failed to upload chunk');
			}

			await response.json();
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async function uploadFile() {
		if (!file) return;

		isUploading = true;
		uploadStatus = 'Upload started...';

		if (file.size > chunkSize) {
			const totalChunks = Math.ceil(file.size / chunkSize);

			for (let i = 0; i < totalChunks; i++) {
				try {
					await uploadChunk(file, i, totalChunks);
					uploadProgress = ((i + 1) / totalChunks) * 100;
				} catch (error) {
					uploadStatus = 'Failed to upload file, ' + { error };
					console.log(uploadStatus);
					isUploading = false;
					return;
				}
			}

			uploadStatus = 'File uploaded successfully';
		} else {
			const formData = new FormData();
			formData.append('file', file);

			// Compute MD5 hash for the entire file
			const fileArrayBuffer = await file.arrayBuffer();
			const fileHash = SparkMD5.ArrayBuffer.hash(fileArrayBuffer);
			console.log(`File MD5 Hash: ${fileHash}`);
			formData.append('file_hash', fileHash); // Append the file hash

			try {
				const response = await fetch('api/upload/single', {
					method: 'POST',
					body: formData
				});

				if (!response.ok) {
					throw new Error('Failed to upload file');
				}

				await response.json();

				uploadStatus = 'File uploaded successfully';
			} catch (error) {
				console.error(error);
				uploadStatus = 'Failed to upload file';
			}
		}

		isUploading = false;
		dispatch('upload', { filename: file.name }); // Dispatch the custom event with the filename
	}

	function handleFileChange(event) {
		file = event.target.files[0];
		uploadProgress = 0;
		uploadStatus = '';
	}
</script>

<div>
	<div class="w-full max-w-md space-y-4 rounded bg-white p-8 shadow-md">
		<h2 class="text-2xl font-bold">Upload a File</h2>
		<input
			type="file"
			on:change={handleFileChange}
			class="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
		/>
		<button
			on:click={uploadFile}
			class="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>Upload</button
		>
		{#if isUploading}
			<div class="mt-4">
				<p>{uploadStatus}</p>
				<progress max="100" value={uploadProgress} class="w-full"></progress>
			</div>
		{/if}
	</div>
</div>
