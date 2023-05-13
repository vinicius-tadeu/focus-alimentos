import DefaultPage from "../components/DefaultPage";
import data from "../services/utis.json";
import "./Alimentos.css";
export default function Alimentos() {
  return (
    <>
    <DefaultPage/>
      <h1 className="titleFoods">Alimentos</h1>
      <div className="wrapperFood">
        {data?.map((i) => {
          return (
            <div key={i.id} className="foodCard">
              <p className="cardCount">{i.id}</p>
              <h2>{i.description}</h2>
              <p>Categoria: {i.category}</p>
              <p>Proteínas: {Math.round(i.protein_g)?Math.round(i.protein_g)+"g":"*"}</p>
              <p>Carboidratos: {Math.round(i.carbohydrate_g)?Math.round(i.carbohydrate_g)+"g":"*"}</p>
              <p>Kcal: {Math.round(i.energy_kcal)?Math.round(i.energy_kcal)+"kcal":"*"}</p>
              <p>Kj: {Math.round(i.energy_kj)?Math.round(i.energy_kcal)+"kj":"*"}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
