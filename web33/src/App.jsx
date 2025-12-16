import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';

// Componentes
import Header from './components/Header'; 
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import Ofertas from './components/Ofertas';
import Catalogo from './components/Catalogo';
import CarruselCategorias from './components/CarruselCategorias';
import Carrito from './components/Carrito';
import LoginRegister from './components/LoginRegister'; 
import Registro from './components/Registro'; 
import Producto from './components/Producto'; 
import PaymentResult from './components/PaymentResult';
import ProtectedRoute from './components/ProtectedRoute'; // Importamos el guardián

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Routes>
            {/* --- RUTAS PÚBLICAS (Accesibles para todos) --- */}
            <Route path="/" element={<Inicio />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/galeria" element={<CarruselCategorias />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/registro" element={<Registro />} />
            
            {/* --- RUTAS PROTEGIDAS (Requieren Login obligatoriamente) --- */}
            {/* Todo lo que esté aquí adentro verificará el Token antes de mostrarse */}
            <Route element={<ProtectedRoute />}>
               <Route path="/catalogo" element={<Catalogo />} />
               <Route path="/producto/:nombre" element={<Producto />} />
               <Route path="/carrito" element={<Carrito />} />
               <Route path="/payment/result" element={<PaymentResult />} />
            </Route>

            {/* Ruta para error 404 */}
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;