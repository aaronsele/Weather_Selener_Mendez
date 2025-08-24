import { useState, useEffect, useContext } from "react";
import { ClimaContext } from "../contexts/ClimaContext";
import { obtenerPronostico } from "../api/Clima";
import "./Pronostico5dias.css";

export default function Pronostico5Dias() {
  const { ultimoClima, unidad } = useContext(ClimaContext);
  const [dias, setDias] = useState([]);

  useEffect(() => {
    if (ultimoClima) {
      obtenerPronostico(ultimoClima.name, unidad).then((res) => {
        // Agrupa por día
        const agrupado = {};
        res.list.forEach(item => {
          const fecha = new Date(item.dt * 1000).toLocaleDateString("es-AR");
          if (!agrupado[fecha]) agrupado[fecha] = [];
          agrupado[fecha].push(item);
        });

        const resultado = Object.entries(agrupado).map(([fecha, valores]) => {
          const temps = valores.map(v => v.main.temp);
          return {
            fecha,
            min: Math.min(...temps),
            max: Math.max(...temps),
            desc: valores[0].weather[0].description,
            icon: valores[0].weather
          };
        });

        setDias(resultado.slice(0, 5));
      });
    }
  }, [ultimoClima, unidad]);

  if (!ultimoClima) return null;

  const getWeatherIcon = (weather) => {
    const mainWeather = weather[0].main.toLowerCase();
    if (mainWeather.includes("clear")) return "☀️";
    if (mainWeather.includes("cloud")) return "☁️";
    if (mainWeather.includes("rain")) return "🌧️";
    if (mainWeather.includes("snow")) return "❄️";
    if (mainWeather.includes("thunder")) return "⛈️";
    return "🌡️";
  };

  return (
    <section className="pronostico5-section">
      <h3>Pronóstico 5 días</h3>
      <div className="pronostico5-container">
        {dias.map((d, i) => (
          <div className="pronostico5-card" key={i}>
            <p className="fecha">{d.fecha}</p>
            <p className="icono">{getWeatherIcon(d.icon)}</p>
            <p className="temp">Mín: {Math.round(d.min)}° | Máx: {Math.round(d.max)}° {unidad === "metric" ? "C" : "F"}</p>
            <p className="descripcion">{d.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
