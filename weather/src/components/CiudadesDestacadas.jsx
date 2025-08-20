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

  return (
    <section>
      <h3>Ciudades destacadas</h3>
      <div style={{ display: "flex", gap: "1rem" }}>
        {climas.map((c, i) => (
          <div key={i}>
            <p>{c.name}</p>
            <p>{Math.round(c.main.temp)}°</p>
            <p>{c.weather[0].description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
