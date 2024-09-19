<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="file" @change="handleFileChange('fotoKTP', $event)" />
      <input type="file" @change="handleFileChange('fotoKK', $event)" />
      <button type="submit">Submit</button>
    </form>
    <div v-if="uploadedFiles">
      <h2>Preview Data:</h2>
      <div v-if="uploadedFiles.fotoKTP">
        <h3>Foto KTP:</h3>
        <img :src="uploadedFiles.fotoKTP" alt="Foto KTP" />
      </div>
      <div v-if="uploadedFiles.fotoKK">
        <h3>Foto KK:</h3>
        <img :src="uploadedFiles.fotoKK" alt="Foto KK" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileData: {
        fotoKTP: null,
        fotoKK: null,
      },
      uploadedFiles: null,
    };
  },
  methods: {
    handleFileChange(key, event) {
      const file = event.target.files[0];
      if (file) {
        this.fileData[key] = file;
      }
    },
    async handleSubmit() {
      const formData = new FormData();
      formData.append("fotoKTP", this.fileData.fotoKTP);
      formData.append("fotoKK", this.fileData.fotoKK);

      try {
        const response = await fetch("your-server-endpoint", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        this.uploadedFiles = {
          fotoKTP: data.fotoKTPUrl,
          fotoKK: data.fotoKKUrl,
        };
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>
