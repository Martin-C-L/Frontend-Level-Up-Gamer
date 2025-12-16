import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import palancaImg from '../imagenes/palanca-de-mando.png';
import AuthService from '../services/AuthService';

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [carritoCantidad, setCarritoCantidad] = useState(0);
  const [userName, setUserName] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const actualizarCantidadCarrito = () => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
      setCarritoCantidad(totalCantidad);
    };

    const actualizarUsuario = () => {
      const user = AuthService.getCurrentUser();
      setUserName(user && (user.nombre || user.name || user.email));
    };

    actualizarCantidadCarrito();
    actualizarUsuario();

    const interval = setInterval(() => {
      actualizarCantidadCarrito();
      actualizarUsuario();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header className="header-fullwidth" style={{ backgroundColor: '#222', color: '#fff' }}>
      <div className="container-header d-flex align-items-center" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', padding: '0 32px' }}>
        {/* Logo y nombre alineados a la izquierda */}
        <div className="d-flex align-items-center" style={{ flex: '0 0 auto', height: '80px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={palancaImg} alt="Level Up Logo" style={{ height: '36px', marginRight: '14px', verticalAlign: 'middle' }} />
            </Link>
          <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: 700, letterSpacing: '1px', lineHeight: '80px', verticalAlign: 'middle' }}>Level Up Gamer</h1>
        </div>

        {/* Input centrado */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '340px', display: 'flex', justifyContent: 'center', height: '80px', alignItems: 'center' }}>
          <form style={{ width: '100%' }} onSubmit={e => {
            e.preventDefault();
            if (busqueda.trim()) {
              navigate(`/catalogo?busqueda=${encodeURIComponent(busqueda.trim())}`);
            } else {
              navigate('/catalogo');
            }
          }}>
            <input
              type="text"
              placeholder="Busca aquí la tecnología para ti"
              className="form-control"
              style={{ width: '100%', backgroundColor: '#fff', color: '#000', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', padding: '8px 16px', textAlign: 'center', height: '40px' }}
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </form>
        </div>

  {/* Menú y carrito alineados a la derecha */}
  <div className="d-flex align-items-center" style={{ gap: '18px', flex: '0 0 auto', height: '80px', alignItems: 'center' }}>
          <div className="d-flex align-items-center position-relative">
            <button
              className="btn btn-link text-white"
              style={{ textDecoration: 'none', fontWeight: 500, fontSize: '1rem', padding: '0 8px' }}
              onClick={toggleMenu}
            >
              {userName ? `Hola, ${userName}` : 'Hola, ingresa'}
            </button>
            {menuVisible && (
              <div
                className="dropdown-menu show"
                style={{ position: 'absolute', top: '40px', right: '0', backgroundColor: '#fff', color: '#000', borderRadius: '5px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: '150px' }}
              >
                <Link to="/login" className="dropdown-item">Inicia sesión</Link>
                <Link to="/registro" className="dropdown-item">Regístrate</Link>
              </div>
            )}
          </div>
          <Link to="/carrito" className="btn btn-link text-white" style={{ textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center', fontWeight: 500, fontSize: '1rem', padding: '0 8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}>
              <circle cx="9" cy="21" r="1.2"/>
              <circle cx="20" cy="21" r="1.2"/>
              <path d="M1 1h3l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39a2 2 0 0 0-2-2.39H6.12"/>
            </svg>
            {carritoCantidad > 0 && (
              <span className="badge bg-success" style={{ position: 'absolute', top: '-5px', right: '-10px', fontSize: '0.8rem' }}>{carritoCantidad}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;