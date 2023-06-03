import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import "./Register.css";
import alimentos from "../assets/alimentos.jpg";
import { Link } from "react-router-dom";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBYoKdb_kjxuMJjJPahmtWGPmkEB_b5DG4",
  authDomain: "alimentos-gustavo.firebaseapp.com",
  projectId: "alimentos-gustavo",
});
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const typeUser = "Comum";
  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users");

  async function createUser() {
    if (name && email && password) {
      if (email.match(/@/)) {
        await addDoc(userCollectionRef, {
          name,
          email,
          password,
          typeUser,
          logado: false,
        });
        alert("Usuário criado com sucesso!");
      }
    }else{
      alert("Preencha todos os campos!");
    }
  }
  return (
    <>
      <style>
        {`
          header{
            display:none;
          }
        
        `}
      </style>
      <div className="wrapper">
        <div className="wrapperRegister">
        <form className="formRegister">
            <h2>Registrar</h2>
            <label htmlFor="Nome">Nome</label>
            <input
              type="text"
              name="Nome"
              placeholder="Nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="Senha">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/" onClick={createUser} className="btnRegister">
              Criar Conta
            </Link>
            <Link to="/" className="btnRegister">
              Voltar ao início
            </Link>
          </form>
        </div>
        <img src={alimentos} alt="Alimentos" className="imgAlimentos" />
      </div>
    </>
  );
}
export default Register;
