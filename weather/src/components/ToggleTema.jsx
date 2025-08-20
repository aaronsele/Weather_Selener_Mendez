import { useContext } from "react";
import { ClimaContext } from "../contexts/ClimaContext";

export default function ToggleTema() {
  const { tema, cambiarTema } = useContext(ClimaContext);
  return (
    <button onClick={cambiarTema}>
      {tema === "light" ? "Modo oscuro" : "Modo claro"}
    </button>
  );
}
