import { useState, useEffect, useContext } from "react";
import { ClimaContext } from "./contexts/ClimaContext";
import { obtenerPronostico } from "./api/Clima";

export default function Pronostico5Dias() {
  const { ultimoClima, unidad } = useContext(ClimaContext);
  const [dias, setDias] = useState([]);

  useEffect(() => {
    if (ultimoClima) {
      obtenerPronostico(ultimoClima.name, unidad).then((res) => {
        // Agrupa por día
        const agrupado = {};
        res.list.forEach(item => {
          const fecha = new Date(item.dt * 1000).toLocaleDateString("es-AR");
          if (!agrupado[fecha]) agrupado[fecha] = [];
          agrupado[fecha].push(item);
        });

        const resultado = Object.entries(agrupado).map(([fecha, valores]) => {
          const temps = valores.map(v => v.main.temp);
          return {
            fecha,
            min: Math.min(...temps),
            max: Math.max(...temps),
            desc: valores[0].weather[0].description
          };
        });

        setDias(resultado.slice(0, 5));
      });
    }
  }, [ultimoClima, unidad]);

  if (!ultimoClima) return null;

  return (
    <section>
      <h3>Pronóstico 5 días</h3>
      {dias.map((d, i) => (
        <div key={i}>
          <p>{d.fecha}</p>
          <p>Mín: {Math.round(d.min)}° | Máx: {Math.round(d.max)}°</p>
          <p>{d.desc}</p>
        </div>
      ))}
    </section>
  );
}
