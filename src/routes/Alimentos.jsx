import DefaultPage from "../components/DefaultPage";
import data from "../services/utis.json";
import { useMemo, useState } from "react";
import "./Alimentos.css";
export default function Alimentos() {
  const [busca, setBusca] = useState("");
  const dataFilter = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return data.filter((a) => a.description.toLowerCase().includes(lowerBusca));
  }, [busca]);
  const countData = dataFilter.length;
  return (
    <>
      <DefaultPage />
      <h1 className="titleFoods">Alimentos</h1>
      <div className="wrapperBusca">
        <h2>Buscar</h2>
        <input
          type="text"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
          }}
        />
        <p>Resultados ({countData})</p>
      </div>
      <div className="wrapperFood">
        {dataFilter?.map((i) => {
          return (
            <div key={i.id} className="foodCard">
              <p className="cardCount">{i.id}</p>
              <h2 className="cardTitle">{i.description}</h2>  
              <div className="foodCardInfos">
                <p className="pTitle">Categoria</p>
                <p className="pValue">{i.category}</p>
              </div>
              <div className="foodCardInfos">
                <p className="pTitle">Proteínas </p>
                <p className="pValue">
                  {Math.round(i.protein_g)
                    ? Math.round(i.protein_g) + "g"
                    : "*"}
                </p>
              </div>
              <div className="foodCardInfos">
                <p className="pTitle">Carboidratos </p>
                <p className="pValue">
                  {Math.round(i.carbohydrate_g)
                    ? Math.round(i.carbohydrate_g) + "g"
                    : "*"}
                </p>
              </div>
              <div className="foodCardInfos">
                <p className="pTitle">Kcal </p>
                <p className="pValue">
                  {Math.round(i.energy_kcal)
                    ? Math.round(i.energy_kcal) + "kcal"
                    : "*"}
                </p>
              </div>
              <div className="foodCardInfos">
                <p className="pTitle">Kj </p>
                <p className="pValue">
                  {Math.round(i.energy_kj)
                    ? Math.round(i.energy_kcal) + "kj"
                    : "*"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
