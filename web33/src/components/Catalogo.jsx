import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProductService from '../services/ProductService';

function Catalogo() {
  // 2. Estado inicial vacío (se llenará con datos del backend)
  const [productos, setProductos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 3. Cargar productos desde Spring Boot al iniciar
  useEffect(() => {
    ProductService.getAllProductos()
      .then(data => {
        setProductos(data);
        setProductosFiltrados(data); // Inicialmente mostramos todo
        console.log("Catálogo cargado:", data);
      })
      .catch(error => {
        console.error("Error conectando al servidor:", error);
      });
  }, []);

  // Lógica de filtrado (incluye búsqueda por query param)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const busqueda = params.get('busqueda');
    let filtrados = productos;
    if (filtroCategoria !== 'todos') {
      filtrados = filtrados.filter(p => p.categoria === filtroCategoria);
    }
    if (busqueda && busqueda.trim()) {
      const b = busqueda.trim().toLowerCase();
      filtrados = filtrados.filter(p =>
        (p.nombre && p.nombre.toLowerCase().includes(b)) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(b))
      );
    }
    setProductosFiltrados(filtrados);
  }, [filtroCategoria, productos, location.search]);

  // Función para agregar al carrito (integrada dentro del componente)
  const agregarAlCarrito = (producto) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    // Buscamos por ID si existe, si no por nombre (para compatibilidad)
    const identificador = producto.id || producto.nombre;
    const index = carrito.findIndex(item => (item.id || item.nombre) === identificador);
    if (index >= 0) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`¡${producto.nombre} agregado al carrito!`); 
  };

  const handleVerProducto = (producto) => {
    navigate(`/producto/${producto.nombre}`, { state: { producto } });
  };

  return (
    <div className="container mt-5">
      {/* Título centrado y blanco para que contraste con el fondo oscuro */}
      <h1 className="mb-4 text-center text-white">Catálogo de Productos</h1>
      
      {/* Filtros */}
      <div className="filtros d-flex justify-content-center mb-5">
        <select 
          id="categoriaFiltro" 
          className="form-select w-auto" 
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="todos">Todas las categorías</option>
          <option value="juegos">Juegos de mesa</option>
          <option value="accesorios">Accesorios</option>
          <option value="consolas">Consolas</option>
          <option value="computadores">Computadores gamers</option>
          <option value="sillas">Sillas gamers</option>
          <option value="mouse">Mouse</option>
          <option value="mousepad">Mousepad</option>
          <option value="poleras">Poleras personalizadas</option>
          <option value="polerones">Polerones gamers personalizados</option>
          <option value="servicio">Servicio técnico</option>
        </select>
      </div>

      {/* Lógica de visualización de la Grilla */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center mt-5 text-white">
          {productos.length === 0 ? (
             <p>Cargando catálogo desde el servidor... (Asegúrate que Spring Boot esté corriendo)</p>
          ) : (
            <p>No se encontraron productos en esta categoría.</p>
          )}
        </div>
      ) : (
        /* CONFIGURACIÓN DE LA GRILLA:
           row-cols-1: 1 columna en celular
           row-cols-md-2: 2 columnas en tablet
           row-cols-lg-4: 4 columnas en PC (desktop)
           g-4: Espacio (gap) entre tarjetas
        */
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {productosFiltrados.map((producto, index) => (
            <div key={producto.id || index} className="col">
              <div 
                className="card h-100 bg-dark text-white border-secondary" 
                onClick={() => handleVerProducto(producto)} 
                style={{ cursor: 'pointer', overflow: 'hidden' }}
              >
                {/* Contenedor de Imagen con altura fija */}
                <div style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
                    <img 
                      src={producto.imagen || "https://placehold.co/250x150?text=Sin+Imagen"} 
                      alt={producto.nombre} 
                      className="card-img-top"
                      style={{ 
                        maxHeight: '100%', 
                        maxWidth: '100%', 
                        objectFit: 'contain' /* Ajusta la imagen sin cortarla */
                      }} 
                    />
                </div>
                
                {/* Cuerpo de la tarjeta */}
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title text-center text-truncate">{producto.nombre}</h6>
                  
                  {/* PRECIO EN BLANCO */}
                  <p className="card-text text-center fw-bold text-white fs-5">
                    ${producto.precio ? producto.precio.toLocaleString() : 0}
                  </p>
                  
                  {/* Botón al fondo */}
                  <div className="mt-auto">
                    <button 
                        className="btn btn-outline-light w-100 btn-sm" 
                        onClick={(e) => { e.stopPropagation(); agregarAlCarrito(producto); }}
                    >
                        <i className="bi bi-cart me-2"></i>
                        Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogo;