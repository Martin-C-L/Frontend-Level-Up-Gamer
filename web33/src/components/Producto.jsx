import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Producto() {
  const location = useLocation();
  const { producto } = location.state || {};

  const agregarAlCarrito = () => {
    if (!producto) return;
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(item => item.nombre === producto.nombre);
    if (index >= 0) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
  };

  if (!producto) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <div className="container mt-5">
      <Link to="/catalogo" className="btn btn-dark mb-4">Volver al catálogo</Link>
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
        <div className="card-body">
          <h2 className="card-title">{producto.nombre}</h2>
          <p className="card-text">{producto.descripcion}</p>
          <p className="card-text" style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>Precio: ${producto.precio}</p>
          <button className="btn btn-primary" onClick={agregarAlCarrito}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}


export default Producto;