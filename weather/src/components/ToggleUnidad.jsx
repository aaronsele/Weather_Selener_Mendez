import { useContext } from "react";
import { ClimaContext } from "../contexts/ClimaContext";
import "./ToggleUnidad.css";

export default function ToggleUnidad() {
  const { unidad, cambiarUnidad } = useContext(ClimaContext);
  return (
    <button className="toggle-unidad-button" onClick={cambiarUnidad}>
      Cambiar a {unidad === "metric" ? "°F" : "°C"}
    </button>
  );
}
