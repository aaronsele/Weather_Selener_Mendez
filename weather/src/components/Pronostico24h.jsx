import { useState, useEffect, useContext } from "react";
import { ClimaContext } from "../contexts/ClimaContext";
import { obtenerPronostico } from "../api/Clima";
import "./Pronostico24h.css";

export default function Pronostico24h() {
  const { ultimoClima, unidad } = useContext(ClimaContext);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    if (ultimoClima) {
      obtenerPronostico(ultimoClima.name, unidad).then((res) => {
        // Filtrar solo las próximas 8 mediciones (24h = 8 intervalos de 3h)
        setDatos(res.list.slice(0, 8));
      });
    }
  }, [ultimoClima, unidad]);

  if (!ultimoClima) return null;

  // --- función de íconos ---
  const getWeatherIcon = (weather, dt) => {
    const mainWeather = weather[0].main.toLowerCase();
    const fecha = new Date(dt * 1000);
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
    <section className="pronostico-section">
      <h3>Pronóstico 24h</h3>
      <div className="pronostico-container">
        {datos.map((item, i) => (
          <div className="pronostico-card" key={i}>
            <p className="hora">{new Date(item.dt * 1000).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</p>
            <p className="icono">{getWeatherIcon(item.weather, item.dt)}</p>
            <p className="temp">{Math.round(item.main.temp)}° {unidad === "metric" ? "C" : "F"}</p>
            <p className="descripcion">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
