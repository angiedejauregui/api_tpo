import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, verifyCode } from './AuthSlice';

const VerifyCode = () => {
    const [code, setCode] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, message, emailStore } = useSelector((state) => state.auth);

    const email = localStorage.getItem("recoveryEmail") || emailStore;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'auth/veridyCode/pending'});
        setTimeout(() => {
            dispatch(verifyCode({ email, code }));
        }, 1500);
    }


    useEffect(() => {
        if (message === "Código correcto. Podés continuar con el cambio de contraseña.") {
            navigate("/reset-password");
        }
    }, [message]);

    const handleCode = () => {
        dispatch(forgotPassword({ email }));
    }

  return (
    <>
      <div className="container">
        <h2>Verificar código</h2>
        {error && <p className="error">{error}</p>}
        <p className="description">Un código de seis dígitos fue enviado al mail ingresado</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder=""
            autoComplete=""
          />
          <a href="" onClick={handleCode} className='resend-code-link'>Enviar otro código</a>
          <button type="submit">
            {loading ? "Enviando..." : "Continuar"}
          </button>
        </form>
      </div>
    </>
)
}

export default VerifyCode