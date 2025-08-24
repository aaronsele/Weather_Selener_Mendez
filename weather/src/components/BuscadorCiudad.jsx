import { useState, useContext } from "react";
import { ClimaContext } from "../contexts/ClimaContext";
import { obtenerClimaActual } from "../api/Clima";
import "./BuscadorCiudad.css";

export default function BuscadorCiudad() {
  const [ciudad, setCiudad] = useState("");
  const { unidad, setUltimoClima } = useContext(ClimaContext);

  const buscarClima = async () => {
    if (!ciudad) return;
    try {
      const data = await obtenerClimaActual(ciudad, unidad);
      setUltimoClima(data);
      setCiudad("");
    } catch (error) {
      console.error("Error al buscar clima:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") buscarClima();
  };

  return (
    <div className="buscador-container">
      <input
        type="text"
        placeholder="Buscar ciudad..."
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={buscarClima}>Buscar</button>
    </div>
  );
}
