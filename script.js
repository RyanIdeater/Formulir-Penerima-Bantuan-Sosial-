document.addEventListener("DOMContentLoaded", () => {
  // Fungsi untuk mengambil dan menampilkan daftar provinsi
  function fetchProvinces() {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((provinces) => {
        const provinsiSelect = document.getElementById("provinsi");
        provinsiSelect.innerHTML = '<option value="" disabled selected>Pilih Provinsi</option>';
        provinces.forEach((provinsi) => {
          const option = document.createElement("option");
          option.value = provinsi.id;
          option.textContent = provinsi.name;
          provinsiSelect.appendChild(option);
        });

        provinsiSelect.addEventListener("change", function () {
          const provinsiId = this.value;
          fetchKabupatenKota(provinsiId);
        });
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }

  // Fungsi untuk mengambil dan menampilkan daftar kabupaten/kota
  function fetchKabupatenKota(provinsiId) {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsiId}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((kabupatenKota) => {
        const kabupatenKotaSelect = document.getElementById("kabupatenKota");
        kabupatenKotaSelect.innerHTML = '<option value="" disabled selected>Pilih Kabupaten/Kota</option>';
        kabupatenKota.forEach((kota) => {
          const option = document.createElement("option");
          option.value = kota.id;
          option.textContent = kota.name;
          kabupatenKotaSelect.appendChild(option);
        });

        kabupatenKotaSelect.addEventListener("change", function () {
          const kabupatenKotaId = this.value;
          fetchKecamatan(kabupatenKotaId);
        });
      })
      .catch((error) => {
        console.error("Error fetching kabupaten/kota:", error);
      });
  }

  // Fungsi untuk mengambil dan menampilkan daftar kecamatan
  function fetchKecamatan(kabupatenKotaId) {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabupatenKotaId}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((kecamatan) => {
        const kecamatanSelect = document.getElementById("kecamatan");
        kecamatanSelect.innerHTML = '<option value="" disabled selected>Pilih Kecamatan</option>';
        kecamatan.forEach((kec) => {
          const option = document.createElement("option");
          option.value = kec.id;
          option.textContent = kec.name;
          kecamatanSelect.appendChild(option);
        });

        kecamatanSelect.addEventListener("change", function () {
          const kecamatanId = this.value;
          fetchKelurahanDesa(kecamatanId);
        });
      })
      .catch((error) => {
        console.error("Error fetching kecamatan:", error);
      });
  }

  // Fungsi untuk mengambil dan menampilkan daftar kelurahan/desa
  function fetchKelurahanDesa(kecamatanId) {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatanId}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((kelurahanDesa) => {
        const kelurahanDesaSelect = document.getElementById("kelurahanDesa");
        kelurahanDesaSelect.innerHTML = '<option value="" disabled selected>Pilih Kelurahan/Desa</option>';
        kelurahanDesa.forEach((desa) => {
          const option = document.createElement("option");
          option.value = desa.id;
          option.textContent = desa.name;
          kelurahanDesaSelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching kelurahan/desa:", error);
      });
  }

  fetchProvinces();

  //  form submission
  const form = document.getElementById("bansosForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    resultDiv.innerHTML = resultHTML;
  });

  // tmpilkan input alasanBantuanLainnya jika pilih lainnya
  const alasanBantuanSelect = document.getElementById("alasanBantuan");
  const alasanBantuanLainnyaInput = document.getElementById("alasanBantuanLainnya");

  alasanBantuanSelect.addEventListener("change", function () {
    if (this.value === "Lainnya") {
      alasanBantuanLainnyaInput.style.display = "inline";
    } else {
      alasanBantuanLainnyaInput.style.display = "none";
      alasanBantuanLainnyaInput.value = "";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const queryParams = new URLSearchParams(formData).toString();
    window.location.href = `result.html?${queryParams}`;
  });

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bansosForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      // Membaca file gambar
      const fotoKTP = formData.get("fotoKTP");
      const fotoKK = formData.get("fotoKK");

      const readerKTP = new FileReader();
      const readerKK = new FileReader();

      readerKTP.onload = function (e) {
        const imgKTP = document.createElement("img");
        imgKTP.src = e.target.result;
        imgKTP.style.maxWidth = "300px";
        imgKTP.style.marginTop = "10px";
        document.getElementById("result").appendChild(imgKTP);
      };

      readerKK.onload = function (e) {
        const imgKK = document.createElement("img");
        imgKK.src = e.target.result;
        imgKK.style.maxWidth = "300px";
        imgKK.style.marginTop = "10px";
        document.getElementById("result").appendChild(imgKK);
      };

      if (fotoKTP) readerKTP.readAsDataURL(fotoKTP);
      if (fotoKK) readerKK.readAsDataURL(fotoKK);
    });
    console.log(params.get("fotoKTP"));
  });
});

// mengatur input rupiah
function formatCurrency(input) {
  let value = input.value.replace(/\D/g, "");
  let formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
  input.value = formattedValue.replace(/\u00A0/g, " ");
}

document.getElementById("bansosForm").addEventListener("submit", function (event) {
  const umurInput = document.getElementById("umur");
  const errorMessage = document.getElementById("error-message");

  // Mengambil nilai umur
  const umur = Number(umurInput.value);

  // Memeriksa jika umur kurang dari 25
  if (umur < 25) {
    event.preventDefault();
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }
});
function previewImage(input, previewId) {
  const file = input.files[0];
  const preview = document.getElementById(previewId);

  // Validasi ukuran file
  const maxFileSize = 2 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/bmp"];

  if (file) {
    if (file.size > maxFileSize) {
      alert("Ukuran file terlalu besar. Maksimal 2MB.");
      input.value = "";
      preview.src = "";

      return;
    }

    // validasi tipe file
    if (!allowedTypes.includes(file.type)) {
      alert("Tipe file tidak didukung. Hanya menerima jpeg, jpg, png, dan bmp.");
      input.value = "";
      preview.src = "";
      preview.style.display = "none";

      return;
    }

    // image priview
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };

    reader.readAsDataURL(file);
  } else {
    preview.src = "";
    preview.style.display = "none";
  }
}
