import axios from "axios";
const API_KEY = " 9c5f3b16c807cf8d7e355e3dc35f5240 ";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function obtenerClimaActual(ciudad, unidad) {
  const res = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: ciudad,
      units: unidad,
      appid: API_KEY,
      lang: "es"
    }
  });
  return res.data;
}

export async function obtenerPronostico(ciudad, unidad) {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: ciudad,
      units: unidad,
      appid: API_KEY,
      lang: "es"
    }
  });
  return res.data;
}
