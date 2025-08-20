import { useContext, useEffect } from "react";
import { ClimaContext } from "./contexts/ClimaContext";
import { obtenerClimaActual } from "./api/Clima";
import "./App.css";

import BuscadorCiudad from "./components/BuscadorCiudad";
import ClimaActual from "./components/ClimaActual";
import Pronostico24h from "./components/Pronostico24h";
import Pronostico5Dias from "./components/Pronostico5dias";
import CiudadesDestacadas from "./components/CiudadesDestacadas";
import ToggleUnidad from "./components/ToggleUnidad";
import ToggleTema from "./components/ToggleTema";

export default function App() {
  const { unidad, ultimoClima, setUltimoClima } = useContext(ClimaContext);

  useEffect(() => {
    if (!ultimoClima) {
      obtenerClimaActual("Buenos Aires", unidad).then(setUltimoClima);
    }
  }, [unidad, ultimoClima, setUltimoClima]);

  return (
    <div className="app">
      <header className="header">
        <h1>WeatherApp</h1>
        <div className="header-controls">
          <BuscadorCiudad />
          <ToggleUnidad />
          <ToggleTema />
        </div>
      </header>

      <main className="main-content">
        <ClimaActual />
        <Pronostico24h />
        <Pronostico5Dias />
        <CiudadesDestacadas />
      </main>
    </div>
  );
}

