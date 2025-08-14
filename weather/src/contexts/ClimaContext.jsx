import { createContext, useState, useEffect } from "react";

export const ClimaContext = createContext();

export function ClimaProvider({ children }) {
  const [unidad, setUnidad] = useState("metric"); // metric es para Celsius, imperial para farenheit
  const [tema, setTema] = useState("light");
  const [ultimoClima, setUltimoClima] = useState(
    JSON.parse(localStorage.getItem("ultimoClima")) || null
  );

  useEffect(() => {
    localStorage.setItem("ultimoClima", JSON.stringify(ultimoClima));
  }, [ultimoClima]);

  const cambiarUnidad = () => setUnidad(unidad === "metric" ? "imperial" : "metric");
  const cambiarTema = () => setTema(tema === "light" ? "dark" : "light");

  return (
    <ClimaContext.Provider value={{
      unidad, cambiarUnidad,
      tema, cambiarTema,
      ultimoClima, setUltimoClima
    }}>
      {children}
    </ClimaContext.Provider>
  );
}
