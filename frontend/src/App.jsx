import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import Login from './paginas/Login';
import NuevoPassword from './paginas/NuevoPassword';
import OlvidePassword from './paginas/OlvidePassword';
import Registrar from './paginas/Registrar';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta publica con root / en v6.0 */}
        <Route path="/" element={<AuthLayout />}>

          <Route index element={ <Login /> } />
          <Route path="registrar" element={ <Registrar /> } />
          <Route path="olvide-password" element={ <OlvidePassword /> } />
          <Route path="olvide-password/:token" element={ <NuevoPassword /> } />
          <Route path="confirmar/:id" element={ <ConfirmarCuenta /> } />

        </Route>
        {/* Rutas privadas */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
