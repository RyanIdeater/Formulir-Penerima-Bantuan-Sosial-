<template>
  <div>
    <h1>Formulir Penerima Bantuan Sosial</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="provinsi">Provinsi:</label>
        <select v-model="selectedProvinsi" @change="fetchKabupatenKota">
          <option v-for="provinsi in provinsiList" :key="provinsi.id" :value="provinsi.id">
            {{ provinsi.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="kabupatenKota">Kabupaten/Kota:</label>
        <select v-model="selectedKabupatenKota" @change="fetchKecamatan">
          <option v-for="kabupatenKota in kabupatenKotaList" :key="kabupatenKota.id" :value="kabupatenKota.id">
            {{ kabupatenKota.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="kecamatan">Kecamatan:</label>
        <select v-model="selectedKecamatan">
          <option v-for="kecamatan in kecamatanList" :key="kecamatan.id" :value="kecamatan.id">
            {{ kecamatan.name }}
          </option>
        </select>
      </div>

      <!-- Tambahkan dropdown lainnya sesuai kebutuhan -->

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      provinsiList: [],
      kabupatenKotaList: [],
      kecamatanList: [],
      selectedProvinsi: "",
      selectedKabupatenKota: "",
      selectedKecamatan: "",
    };
  },
  methods: {
    async fetchProvinsi() {
      try {
        const response = await axios.get("https://www.emsifa.com/api-wilayah-indonesia/api/provinsi.json");
        this.provinsiList = response.data;
      } catch (error) {
        console.error("Error fetching provinsi data:", error);
      }
    },
    async fetchKabupatenKota() {
      if (!this.selectedProvinsi) return;

      try {
        const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/kabupaten/${this.selectedProvinsi}.json`);
        this.kabupatenKotaList = response.data;
      } catch (error) {
        console.error("Error fetching kabupaten/kota data:", error);
      }
    },
    async fetchKecamatan() {
      if (!this.selectedKabupatenKota) return;

      try {
        const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/kecamatan/${this.selectedKabupatenKota}.json`);
        this.kecamatanList = response.data;
      } catch (error) {
        console.error("Error fetching kecamatan data:", error);
      }
    },
    submitForm() {
      // Handle form submission
      console.log({
        selectedProvinsi: this.selectedProvinsi,
        selectedKabupatenKota: this.selectedKabupatenKota,
        selectedKecamatan: this.selectedKecamatan,
      });
    },
  },
  mounted() {
    this.fetchProvinsi();
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
