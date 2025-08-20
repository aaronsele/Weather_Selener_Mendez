import { useContext, useEffect, useState } from "react";
import { ClimaContext } from "../contexts/ClimaContext";
import { obtenerClimaActual } from "../api/Clima";
import "./ClimaActual.css"

export default function ClimaActual() {
  const { ultimoClima, unidad, setUltimoClima } = useContext(ClimaContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ultimoClima) {
      setLoading(true);
      // pedimos la ciudad actual con la nueva unidad
      obtenerClimaActual(ultimoClima.name, unidad)
        .then((data) => setUltimoClima(data))
        .finally(() => setLoading(false));
    }
  }, [unidad]); // 👈 se dispara cada vez que cambia unidad

  if (!ultimoClima || loading) return <p>Cargando clima...</p>;

  const { main, name, weather } = ultimoClima;

  return (
    <div>
      <h2>Clima Actual</h2>
      <p>{name}</p>
      <p>{Math.round(main.temp)}° {unidad === "metric" ? "C" : "F"}</p>
      <p>{weather[0].description}</p>
    </div>
  );
}
