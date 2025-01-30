<script>
	import SparkMD5 from 'spark-md5';

	export let onUpload;

	let file;
	let uploadProgress = 0;
	let uploadStatus = '';
	let isUploading = false;

	async function uploadFile() {
		if (!file) return;

		isUploading = true;
		uploadStatus = 'Upload started...';

		const formData = new FormData();
		formData.append('file', file);

		// Compute MD5 hash for the entire file
		const fileArrayBuffer = await file.arrayBuffer();
		const fileHash = SparkMD5.ArrayBuffer.hash(fileArrayBuffer);
		console.log(`File MD5 Hash: ${fileHash}`);
		formData.append('file_hash', fileHash);

		try {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', 'api/upload/single', true);

			xhr.upload.onprogress = function (event) {
				if (event.lengthComputable) {
					uploadProgress = (event.loaded / event.total) * 100;
				}
			};

			xhr.onload = function () {
				if (xhr.status === 200) {
					uploadStatus = 'File uploaded successfully';
				} else {
					uploadStatus = 'Failed to upload file';
				}
				isUploading = false;
				onUpload({ filename: file.name });
			};

			xhr.onerror = function () {
				uploadStatus = 'Failed to upload file';
				isUploading = false;
			};

			xhr.send(formData);
		} catch (error) {
			console.error(error);
			uploadStatus = 'Failed to upload file';
			isUploading = false;
		}
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
			class="w-full rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-500"
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
