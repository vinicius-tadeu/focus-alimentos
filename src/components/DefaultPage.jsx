import { Outlet, Link } from "react-router-dom";
import "./DefaultPage.css";
import pessoa from "../assets/pessoa.png";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBYoKdb_kjxuMJjJPahmtWGPmkEB_b5DG4",
  authDomain: "alimentos-gustavo.firebaseapp.com",
  projectId: "alimentos-gustavo",
});
export default function DefaultPage() {
  const name = localStorage.getItem("1");
  const email = localStorage.getItem("2");
  // const password = localStorage.getItem("3");
  const typeUser = localStorage.getItem("4");
  const id = localStorage.getItem("5");
  const db = getFirestore(firebaseApp);

  async function updateUserState(){
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, {logado: false});
    window.location.href = "/login";
  }

  return (
    <>
      <header id="header">
        <nav>
          <ul className="ulHome">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/alimentos">Alimentos</Link>
            </li>
            {typeUser == "Administrador" ? (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </nav>
        <ul className="cardHeader">
          <div className="cardPessoa">
            <img src={pessoa} alt="Ícone de usuário" width={"40px"} />
          </div>
          <div>
            <li>{name}</li>
            <li>{email}</li>
          </div>
          <button type="button" className="btnSair" onClick={updateUserState}>Sair</button>
        </ul>
      </header>
      <Outlet />
    </>
  );
}
