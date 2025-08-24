import { createContext, useState, useEffect } from "react";

export const ClimaContext = createContext();

export function ClimaProvider({ children }) {
  const [unidad, setUnidad] = useState("metric"); // metric = Celsius, imperial = Fahrenheit
  const [tema, setTema] = useState("dark"); // empieza en oscuro
  const [ultimoClima, setUltimoClima] = useState(
    JSON.parse(localStorage.getItem("ultimoClima")) || null
  );

  // Guardar último clima en localStorage
  useEffect(() => {
    localStorage.setItem("ultimoClima", JSON.stringify(ultimoClima));
  }, [ultimoClima]);

  // Aplicar clase al body según tema
  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(tema === "light" ? "light-theme" : "dark-theme");
  }, [tema]);

  // Cambiar unidad entre Celsius y Fahrenheit
  const cambiarUnidad = () => setUnidad(prev => (prev === "metric" ? "imperial" : "metric"));

  // Cambiar tema entre claro y oscuro
  const cambiarTema = () => setTema(prev => (prev === "light" ? "dark" : "light"));

  return (
    <ClimaContext.Provider
      value={{
        unidad,
        cambiarUnidad,
        tema,
        cambiarTema,
        ultimoClima,
        setUltimoClima
      }}
    >
      {children}
    </ClimaContext.Provider>
  );
}
