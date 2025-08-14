import { useState, useContext } from "react";
import { ClimaContext } from "./ClimaContext";

export default function WeatherApp() {
  const { unidad, cambiarUnidad, tema, cambiarTema, ultimoClima, setUltimoClima } = useContext(ClimaContext);
  const [ciudad, setCiudad] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "9c5f3b16c807cf8d7e355e3dc35f5240"; // poné la tuya

  const buscarClima = async () => {
    if (!ciudad.trim()) {
      setError("Poné una ciudad");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=${unidad}&appid=${API_KEY}&lang=es`
      );
      if (!res.ok) throw new Error("Ciudad no encontrada");
      const data = await res.json();
      setUltimoClima(data);
      setCiudad("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`weather-app ${tema}`}>
      <h1>🌤️ Weather App</h1>

      <div>
        <input
          type="text"
          placeholder="Escribí una ciudad..."
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
        <button onClick={buscarClima} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={cambiarUnidad}>
          Cambiar a {unidad === "metric" ? "Fahrenheit" : "Celsius"}
        </button>
        <button onClick={cambiarTema}>
          Cambiar a {tema === "light" ? "Modo Oscuro" : "Modo Claro"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {ultimoClima && (
        <div style={{ marginTop: "1rem" }}>
          <h2>{ultimoClima.name}, {ultimoClima.sys.country}</h2>
          <p>🌡 {ultimoClima.main.temp}° {unidad === "metric" ? "C" : "F"}</p>
          <p>{ultimoClima.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
