import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
    const { dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // ... lógica de fetch ...
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="login-card">
                <h2 className="text-center fw-bold mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label text-muted">Correo electrónico</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="nombre@ejemplo.com"
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-muted">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3 py-2">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};