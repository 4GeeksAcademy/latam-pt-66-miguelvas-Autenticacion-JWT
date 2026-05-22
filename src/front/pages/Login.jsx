import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
    const { dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Petición real al backend usando la variable de entorno de Vite
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();

                // Guardamos el token tanto en sessionStorage como en el estado global
                sessionStorage.setItem("token", data.access_token);
                dispatch({ type: "login", payload: data.access_token });

                // Redirigimos a la ruta protegida
                navigate("/private");
            } else {
                alert("Credenciales inválidas. Verifica tu correo y contraseña.");
            }
        } catch (error) {
            console.error("Error en el login:", error);
            alert("Hubo un error al intentar conectarse con el servidor.");
        }
    };

    return (
        // Contenedor alineado exactamente igual que en el Signup
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <h2 className="text-center mb-4 text-primary">Iniciar Sesión</h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="nombre@ejemplo.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};