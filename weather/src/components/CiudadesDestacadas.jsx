import { useState, useEffect, useContext } from "react";
import { ClimaContext } from "../contexts/ClimaContext";
import { obtenerClimaActual } from "../api/Clima";
import "./CiudadesDestacadas.css";

const CIUDADES = ["Nueva York", "Madrid", "Tokio"];

export default function CiudadesDestacadas() {
  const { unidad } = useContext(ClimaContext);
  const [climas, setClimas] = useState([]);

  useEffect(() => {
    Promise.all(CIUDADES.map(c => obtenerClimaActual(c, unidad)))
      .then(setClimas);
  }, [unidad]);

  const getWeatherIcon = (weather, dt) => {
    const mainWeather = weather[0].main.toLowerCase();
    const fecha = dt ? new Date(dt * 1000) : new Date();
    const hora = fecha.getHours();

    if (mainWeather.includes("clear")) {
      return hora >= 20 || hora < 6 ? "🌙" : "☀️";
    }
    if (mainWeather.includes("cloud")) return "☁️";
    if (mainWeather.includes("rain")) return "🌧️";
    if (mainWeather.includes("snow")) return "❄️";
    if (mainWeather.includes("thunder")) return "⛈️";
    return "🌡️";
  };

  return (
    <section className="ciudades-section">
      <h3>Ciudades destacadas</h3>
      <div className="ciudades-container">
        {climas.map((c, i) => (
          <div className="ciudad-card" key={i}>
            <p className="ciudad-nombre">{c.name}</p>
            <p className="icono">{getWeatherIcon(c.weather, c.dt)}</p>
            <p className="temp">{Math.round(c.main.temp)}° {unidad === "metric" ? "C" : "F"}</p>
            <p className="descripcion">{c.weather[0].description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
