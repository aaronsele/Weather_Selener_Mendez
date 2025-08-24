import { useContext } from "react";
import { ClimaContext } from "../contexts/ClimaContext";
import "./ToggleTema.css";

export default function ToggleTema() {
  const { tema, cambiarTema } = useContext(ClimaContext);
  const icono = tema === "light" ? "🌙" : "☀️"; // si está claro, mostramos luna

  return (
    <button className="toggle-tema-button" onClick={cambiarTema}>
      {icono}
    </button>
  );
}
