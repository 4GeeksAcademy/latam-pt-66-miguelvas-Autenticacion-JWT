import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const token = store.token || sessionStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setLoading(false);
                } else {
                    sessionStorage.removeItem("token");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error en la verificación del token:", error);
                navigate("/login");
            }
        };

        verifyToken();
    }, [store.token, navigate]);

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Verificando credenciales...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0 bg-light p-5 text-center">
                        <div className="card-body">
                            <h1 className="display-4 text-success mb-4">
                                <i className="fas fa-lock-open me-3"></i>Área Privada
                            </h1>
                            <p className="lead text-secondary">
                                Has ingresado correctamente. Esta sección está protegida y solo es visible si cuentas con un <strong>JSON Web Token (JWT)</strong> válido.
                            </p>

                            {userData && (
                                <div className="alert alert-info mt-4 mx-auto" style={{ maxWidth: "450px" }}>
                                    <h5 className="alert-heading mb-2">Usuario Autenticado</h5>
                                    <p className="mb-0"><strong>Email:</strong> {userData.email}</p>
                                </div>
                            )}

                            <div className="mt-5 pt-3 border-top">
                                <p className="text-muted small">
                                    Si eliminas el token manualmente o presionas "Cerrar Sesión", la validación fallará en tu próximo intento de ingreso y serás devuelto al formulario de acceso.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};