import axios from "axios";

// Base URL for the API
const BASE_URL = "https://www.emsifa.com/api-wilayah-indonesia/";

// Function to fetch provinces
export const fetchProvinces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/provinsi.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};

// Function to fetch cities by province ID
export const fetchCities = async (provinceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/kabupaten/${provinceId}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

// Function to fetch districts by city ID
export const fetchDistricts = async (cityId) => {
  try {
    const response = await axios.get(`${BASE_URL}/kecamatan/${cityId}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching districts:", error);
    throw error;
  }
};

// Function to fetch villages by district ID
export const fetchVillages = async (districtId) => {
  try {
    const response = await axios.get(`${BASE_URL}/kelurahan/${districtId}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching villages:", error);
    throw error;
  }
};
