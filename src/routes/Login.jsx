import "./Login.css";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  query,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBYoKdb_kjxuMJjJPahmtWGPmkEB_b5DG4",
  authDomain: "alimentos-gustavo.firebaseapp.com",
  projectId: "alimentos-gustavo",
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const db = getFirestore(firebaseApp);
  var userExist = true;

  function armazenar(usuario, id) {
    localStorage.setItem("1", usuario.name);
    localStorage.setItem("2", usuario.email);
    localStorage.setItem("3", usuario.password);
    localStorage.setItem("4", usuario.typeUser);
    localStorage.setItem("5", id);
  }

  async function updateDocument(document) {
    userExist = false;
    const usuario = document.data();
    const userDoc = doc(db, "users", document.id);
    await updateDoc(userDoc, {
      name: usuario.name,
      email: usuario.email,
      password: usuario.password,
      typeUser: usuario.typeUser,
      logado: true,
    });
    console.log(usuario, document.id);
    armazenar(usuario, document.id);
    window.location.assign("/home");
  }

  async function authLogin() {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      if (
        document.data().email == email &&
        document.data().password == password
      ) {
        updateDocument(document);
      }
    });
    if (userExist) {
      alert("Email ou senha incorretos.");
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
        <div className="wrapperLogin">
          <form className="formLogin">
            <label htmlFor="Email">Email</label>
            <input
              name="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="Password">Senha</label>
            <input
              name="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={authLogin} className="button" >
              Entrar
            </button>
            <a href="/register" className="button">Registrar</a>
          </form>
        </div>
        <div className="wrapperTitle">
          <h1>
            ALIMENTOS SAUDÁVEIS <br />
            GUSTAVO FERNANDES
          </h1>
        </div>
      </div>
    </>
  );
}

export default Login;
