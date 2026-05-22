import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Private } from "./pages/Private";
import { Navbar } from "./components/Navbar"; // Asegúrate de haber creado este componente como te indiqué

// Componente base que envuelve la aplicación e inyecta el Navbar arriba de todo
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    // Asignamos el diseño base a la ruta raíz "/"
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="private" element={<Private />} />
    </Route>
  )
);