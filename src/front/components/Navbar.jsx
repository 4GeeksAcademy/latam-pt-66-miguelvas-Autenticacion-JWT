import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    // Verificamos si existe un token activo en el store o en el almacenamiento de sesión
    const token = store.token || sessionStorage.getItem("token");

    const handleLogout = () => {
        // 1. Limpiamos el token del navegador
        sessionStorage.removeItem("token");

        // 2. Limpiamos el estado global
        dispatch({ type: "logout" });

        // 3. Redirigimos inmediatamente al inicio de sesión como pide el requisito
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold text-primary" to="/">
                    Autenticación JWT
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto gap-2">
                        {!token ? (
                            /* Si NO hay token: Mostrar botones de acceso rápido */
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-outline-primary fw-bold" to="/login">
                                        Iniciar Sesión
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary fw-bold text-white" to="/signup">
                                        Registrarse
                                    </Link>
                                </li>
                            </>
                        ) : (
                            /* Si SÍ hay token: Mostrar navegación privada y botón de salida */
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link fw-bold text-secondary me-2 mt-1" to="/private">
                                        Área Privada
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-danger fw-bold" onClick={handleLogout}>
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};