
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaymentService from '../services/PaymentService';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  // Mantenemos este estado solo para mensajes de error o carrito vacío
  const [mensajeSistema, setMensajeSistema] = useState(null);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  };

  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setMensajeSistema(null); 
  };

  const cambiarCantidad = (index, cambio) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad += cambio;
    
    if (nuevoCarrito[index].cantidad < 1) {
      nuevoCarrito[index].cantidad = 1;
    }
    
    actualizarCarrito(nuevoCarrito);
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    actualizarCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    if (window.confirm("¿Seguro que quieres vaciar el carrito?")) {
      actualizarCarrito([]);
    }
  };

  // --- LÓGICA DE WEBPAY PLUS ---
  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      setMensajeSistema(
        <div className="resumen-card"><p>El carrito está vacío.</p></div>
      );
      return;
    }

    const total = calcularTotal();

    try {
      // 1. Pedimos al Backend que inicie la transacción
      // (Esto conecta con tu PaymentController en Java)
      const data = await PaymentService.iniciarPago(total);
      const { url, token } = data;

      // 2. Creamos un formulario invisible para redirigir a Transbank
      const form = document.createElement("form");
      form.action = url;
      form.method = "POST";

      const inputToken = document.createElement("input");
      inputToken.type = "hidden";
      inputToken.name = "token_ws";
      inputToken.value = token;

      form.appendChild(inputToken);
      document.body.appendChild(form);
      
      // 3. ¡Enviamos al usuario a pagar!
      form.submit(); 

    } catch (error) {
      console.error("Error iniciando pago:", error);
      alert("Hubo un error al conectar con Webpay. Revisa que el Backend esté corriendo.");
    }
  };

  const total = calcularTotal();

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center justify-content-md-end mb-4">
        <Link to="/catalogo" className="btn btn-dark">Atrás</Link>
      </div>
      <h2 className="mb-4 text-start">Tu carro ({carrito.length} producto{carrito.length !== 1 ? 's' : ''})</h2>
      {carrito.length === 0 && (
        <center>
          <p className="text-white">El carrito está vacío.</p>
          {mensajeSistema}
        </center>
      )}
      {carrito.length > 0 && (
        <div className="row g-4">
          <div className="col-lg-8">
            {carrito.map((item, i) => (
              <div key={i} className="carrito-card d-flex align-items-center justify-content-between mb-3 p-3 bg-dark rounded shadow-sm">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minWidth: 100 }}>
                  <img src={item.imagen} alt={item.nombre} className="rounded mb-2" style={{ width: 80, height: 80, objectFit: 'cover', background: '#fff' }} />
                  <button className="btn btn-link text-danger p-0" style={{ fontSize: '0.95rem' }} onClick={() => eliminarProducto(i)}>Eliminar</button>
                </div>
                <div className="flex-grow-1 ms-3" style={{ minWidth: 0 }}>
                  <div className="fw-bold" style={{ fontSize: '1.1rem' }}>{item.nombre}</div>
                  <div className="text-muted small">{item.categoria}</div>
                  <div className="text-muted small">ID {item.id || ''}</div>
                </div>
                <div className="d-flex flex-column align-items-end" style={{ minWidth: 120 }}>
                  <div className="fw-bold" style={{ fontSize: '1.2rem', color: '#fff' }}>${(item.precio * item.cantidad).toLocaleString()}</div>
                  <div className="d-flex align-items-center mt-2">
                    <button className="btn btn-sm btn-outline-secondary px-2 py-1" onClick={() => cambiarCantidad(i, -1)}>-</button>
                    <span className="mx-2" style={{ minWidth: 24, display: 'inline-block', textAlign: 'center' }}>{item.cantidad}</span>
                    <button className="btn btn-sm btn-outline-secondary px-2 py-1" onClick={() => cambiarCantidad(i, 1)}>+</button>
                  </div>
                  <div className="text-muted small mt-2">Precio unitario: <span className="fw-bold" style={{ color: '#fff' }}>${item.precio.toLocaleString()}</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-4">
            <div className="carrito-resumen bg-dark rounded shadow-sm p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold" style={{ fontSize: '1.1rem' }}>Resumen de tu compra</span>
                <span className="text-muted">Productos ({carrito.length})</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total</span>
                <span className="fw-bold" style={{ fontSize: '1.2rem', color: '#fff' }}>${total.toLocaleString()}</span>
              </div>
              <hr style={{ borderColor: '#444' }} />
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-danger" onClick={vaciarCarrito}>Vaciar carrito</button>
                <button className="btn btn-success" onClick={finalizarCompra}>Pagar con Webpay</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;