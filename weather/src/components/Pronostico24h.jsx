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

  return (
    <section>
      <h3>Pronóstico 24h</h3>
      <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
        {datos.map((item, i) => (
          <div key={i}>
            <p>{new Date(item.dt * 1000).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</p>
            <p>{Math.round(item.main.temp)}°</p>
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
