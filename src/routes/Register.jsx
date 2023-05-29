import "./Register.css";
import alimentos from "../assets/alimentos.jpg";
import ResetPasswordForm from '../components/ResetPasswordForm.jsx';

function Register() {
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
          <ResetPasswordForm />
        </div>
        <img src={alimentos} alt="Alimentos" className="imgAlimentos" />
      </div>
    </>
  );
}
export default Register;
