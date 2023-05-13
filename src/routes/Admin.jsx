import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import "./Admin.css";
import DefaultPage from './../components/DefaultPage';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBYoKdb_kjxuMJjJPahmtWGPmkEB_b5DG4",
  authDomain: "alimentos-gustavo.firebaseapp.com",
  projectId: "alimentos-gustavo",
});
function Admin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser, setTypeUser] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [emailUpdate, setEmailUpdate] = useState("");
  const [passwordUpdate, setPasswordUpdate] = useState("");
  const [typeEditUser, setTypeEditUser] = useState("");
  const [users, setUsers] = useState([]);
  const [userAtual, setUserAtual] = useState({});
  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users");

  async function createUser() {
    if (name && email && password && typeUser != "") {
      if (email.match(/@/)) {
        await addDoc(userCollectionRef, {
          name,
          email,
          password,
          typeUser,
          logado: false,
        });
      }
    }
  }

  async function updateUserSubmit(user) {
    const userDoc = doc(db, "users", user.id);
    console.log(nameUpdate, emailUpdate, passwordUpdate, typeEditUser);
    if (nameUpdate && emailUpdate && passwordUpdate && typeEditUser != "") {
      await updateDoc(userDoc, {
        name: nameUpdate,
        email: emailUpdate,
        password: passwordUpdate,
        typeUser: typeEditUser,
        logado: false,
      });
      console.log(user);
    }
  }

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  });

  return (
    <>
      <DefaultPage />
      <main className="mainAdmin">
        <div className="formularios">
          <form className="formulario">
            <h2>Criar Usuário</h2>
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
              type="text"
              name="password"
              placeholder="Senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="tipo">Tipo de usuário</label>
            <select
              name="tipo"
              value={typeUser}
              onChange={(e) => setTypeUser(e.target.value)}
            >
              <option disabled></option>
              <option value={"Comum"}>Comum</option>
              <option value={"Administrador"}>Administrador</option>
            </select>
            <button type="button" onClick={createUser}>
              Criar Usuário
            </button>
          </form>
          <form className="formulario">
            <h2>Editar Usuário</h2>
            <label htmlFor="Nome">Nome</label>
            <input
              type="text"
              name="Nome"
              placeholder="Nome..."
              value={nameUpdate}
              onChange={(e) => setNameUpdate(e.target.value)}
            />
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="Email..."
              value={emailUpdate}
              onChange={(e) => setEmailUpdate(e.target.value)}
            />
            <label htmlFor="Senha">Senha</label>
            <input
              type="text"
              name="Senha"
              placeholder="Senha..."
              value={passwordUpdate}
              onChange={(e) => setPasswordUpdate(e.target.value)}
            />
            <label htmlFor="tipo">Tipo de usuário</label>
            <select
              name="tipo"
              value={typeEditUser}
              onChange={(e) => setTypeEditUser(e.target.value)}
            >
              <option disabled></option>
              <option value={"Comum"}>Comum</option>
              <option value={"Administrador"}>Administrador</option>
            </select>
            <button
              type="button"
              onClick={() => {
                updateUserSubmit(userAtual);
              }}
            >
              Editar
            </button>
          </form>
        </div>
        <ul className="ulAdmin">
          <h1>Usuários</h1>
          {users?.map((user) => {
            return (
              <div key={user.id} className="cardUser">
                <div className="cardInfo">
                  <li>
                    Nome
                    <p>{user.name}</p>
                  </li>
                  <hr style={{ height: "60px" }} />
                  <li>
                    Email
                    <p>{user.email}</p>
                  </li>
                  <hr style={{ height: "60px" }} />
                  <li>
                    Senha
                    <p>{user.password}</p>
                  </li>
                  <hr style={{ height: "60px" }} />
                  <li>
                    Tipo de usuário
                    <p>{user.typeUser}</p> 
                    </li>
                  <hr style={{ height: "60px" }} />
                  {user.logado ? (
                    <li style={{ color: "#0f0" }}>Online</li>
                  ) : (
                    <li style={{ color: "#f00" }}>Offline</li>
                  )}
                </div>
                <div className="buttonsCard">
                  <button
                    onClick={() => {
                      setNameUpdate(user.name);
                      setEmailUpdate(user.email);
                      setPasswordUpdate(user.password);
                      setTypeEditUser(user.typeUser);
                      setUserAtual(user);
                    }}
                  >
                    Editar Usuário
                  </button>
                  <button onClick={() => deleteUser(user.id)}>
                    Deletar Usuário
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export default Admin;
