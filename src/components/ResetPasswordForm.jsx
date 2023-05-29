import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { Link } from "react-router-dom";
import './ResetPasswordForm.css';
const firebaseApp = initializeApp({
    apiKey: "AIzaSyBYoKdb_kjxuMJjJPahmtWGPmkEB_b5DG4",
    authDomain: "alimentos-gustavo.firebaseapp.com",
    projectId: "alimentos-gustavo",
  });
export default function ResetPassword(){
    const [password, setPassword] = useState("");
    const typeUser = "Comum";
    const db = getFirestore(firebaseApp);
    const userCollectionRef = collection(db, "users");
  
    async function createUser() {
      if (name && email && password) {
        if (email.match(/@/)) {
          await addDoc(userCollectionRef, {
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
    return(
        <form className="formRegister">
            <h2>Redefinir Senha</h2>
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
    )
}