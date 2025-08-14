import { useContext } from "react";
import { ClimaContext } from "./contexts/ClimaContext";

export default function ClimaActual() {
  const { ultimoClima, unidad } = useContext(ClimaContext);

  if (!ultimoClima) return <p>No hay datos de clima.</p>;

  const { name, sys, main, weather, wind } = ultimoClima;

  return (
    <section>
      <h2>{name}, {sys.country}</h2>
      <p>{Math.round(main.temp)}° {unidad === "metric" ? "C" : "F"}</p>
      <p>{weather[0].description}</p>
      <p>Viento: {Math.round(wind.speed)} {unidad === "metric" ? "m/s" : "mph"}</p>
      <p>Mín: {Math.round(main.temp_min)}° | Máx: {Math.round(main.temp_max)}°</p>
    </section>
  );
}
