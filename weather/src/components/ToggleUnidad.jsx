import { useContext } from "react";
import { ClimaContext } from "../contexts/ClimaContext";

export default function ToggleUnidad() {
  const { unidad, cambiarUnidad } = useContext(ClimaContext);
  return (
    <button onClick={cambiarUnidad}>
      Cambiar a {unidad === "metric" ? "°F" : "°C"}
    </button>
  );
}
