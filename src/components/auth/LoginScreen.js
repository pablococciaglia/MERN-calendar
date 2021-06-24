import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { authStartLogin, authStartRegister } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {
    const dispatch = useDispatch()
    const logininitialState={
        loginEmail: '',
        loginPassword: '',
    }

    const registerinitialState={
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerConfirmPassword: '',
    }

    const [ loginvalues, handleloginInputChange, loginreset ] = useForm(logininitialState);
    const { loginEmail, loginPassword } = loginvalues;

    const [ registervalues, handleregisterInputChange, registerreset ] = useForm(registerinitialState);
    const{ registerName, registerEmail, registerPassword, registerConfirmPassword } = registervalues;

    const handleLogin = (e) =>{
        e.preventDefault()
        dispatch( authStartLogin( loginEmail, loginPassword ) )
        loginreset()
    }
    
    const handleRegister = (e) =>{
        e.preventDefault()

        if ( registerPassword !== registerConfirmPassword ){
            return Swal.fire ('Error', 'Las contraseñas deben ser iguales', 'error');
        }
        dispatch( authStartRegister( registerName, registerEmail, registerPassword ) )
        Swal.fire('Felicitaciones', 'El registro ha sido exitoso', 'success')
        registerreset()
    }
    
    return (
        <div className="container login__container">
            <div className="row">
                <div className="col-md-6 login__form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value= {loginEmail}
                                onChange={handleloginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={handleloginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login__form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={ handleregisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={ handleregisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword" 
                                value={registerPassword}
                                onChange={ handleregisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerConfirmPassword" 
                                value={registerConfirmPassword}
                                onChange={ handleregisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
