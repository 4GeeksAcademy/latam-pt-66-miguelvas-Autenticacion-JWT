import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            // ¡Corregido! En Vite se usa import.meta.env
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                alert("Usuario creado con éxito");
                navigate("/login");
            } else {
                alert("Hubo un error al registrar el usuario");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <h2 className="text-center mb-4 text-primary">Registro</h2>

                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="ejemplo@correo.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="******"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-bold">
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};