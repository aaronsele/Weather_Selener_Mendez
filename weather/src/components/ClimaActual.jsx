import { useContext, useEffect, useState } from "react";
import { ClimaContext } from "../contexts/ClimaContext";
import { obtenerClimaActual } from "../api/Clima";
import "./ClimaActual.css";

export default function ClimaActual() {
  const { ultimoClima, unidad, setUltimoClima } = useContext(ClimaContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ultimoClima) {
      setLoading(true);
      obtenerClimaActual(ultimoClima.name, unidad)
        .then((data) => setUltimoClima(data))
        .finally(() => setLoading(false));
    }
  }, [unidad]);

  if (!ultimoClima || loading) return <p>Cargando clima...</p>;

  const { main, name, weather, timezone } = ultimoClima;

  // --- calcular hora local ---
  const ahoraUTC = new Date();
  const offsetMs = timezone * 1000; // timezone viene en segundos
  const horaLocal = new Date(ahoraUTC.getTime() + offsetMs);
  const hora = horaLocal.getUTCHours(); // usamos getUTCHours porque ya sumamos offset

  // --- función de íconos ---
  const getWeatherIcon = (weather, hora) => {
    const mainWeather = weather[0].main.toLowerCase();

    if (mainWeather.includes("clear")) {
      return hora >= 20 || hora < 6 ? "🌙" : "☀️"; // luna de 20 a 6
    }
    if (mainWeather.includes("cloud")) return "☁️";
    if (mainWeather.includes("rain")) return "🌧️";
    if (mainWeather.includes("snow")) return "❄️";
    if (mainWeather.includes("thunder")) return "⛈️";
    return "🌡️";
  };

  const icon = getWeatherIcon(weather, hora);

  return (
    <div className="clima-card">
      <h2>Clima Actual</h2>
      <p className="ciudad">{name}</p>
      <p className="temp">
        {icon} {Math.round(main.temp)}° {unidad === "metric" ? "C" : "F"}
      </p>
      <p className="descripcion">{weather[0].description}</p>
    </div>
  );
}
