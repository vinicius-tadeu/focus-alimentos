import { Link } from 'react-router-dom';
export default function ErrorPage(){
    return(
        <>
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '100px'}}>
            <p style={{color: '#fff', fontSize: '2rem'}}>- OPS! -</p>
            <p style={{color: '#fff', fontSize: '2rem'}}>- Erro 404 -</p>
            <Link to="/login" style={{color: '#fff'}}><b>Voltar para Login</b></Link>
        </div>
        </>
    )
}