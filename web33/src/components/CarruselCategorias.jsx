import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';

function CarruselCategorias() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  // Definimos las 4 categorías que quieres mostrar
  const categoriasAVisualizar = ['consolas', 'juegos', 'accesorios', 'sillas'];

  useEffect(() => {
    ProductService.getAllProductos()
      .then(data => {
        setProductos(data);
      })
      .catch(error => console.error("Error cargando productos:", error));
  }, []);

  // Función auxiliar para filtrar productos por categoría
  const getProductosPorCategoria = (cat) => {
    return productos.filter(p => p.categoria && p.categoria.toLowerCase() === cat.toLowerCase());
  };

  const handleVerProducto = (producto) => {
    navigate(`/producto/${producto.nombre}`, { state: { producto } });
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center mb-4">Galería Destacada</h1>

      {categoriasAVisualizar.map((categoria) => {
        const productosCat = getProductosPorCategoria(categoria);
        
        // Si no hay productos en esta categoría, no renderizamos el carrusel
        if (productosCat.length === 0) return null;

        return (
          <div key={categoria} className="mb-5">
            <h3 className="text-uppercase mb-3 border-bottom pb-2">{categoria}</h3>
            
            <Carousel interval={3000} indicators={false}>
              {productosCat.map((producto) => (
                <Carousel.Item key={producto.id || producto.nombre}>
                  <div className="d-flex justify-content-center">
                    <Card style={{ width: '18rem', cursor: 'pointer' }} onClick={() => handleVerProducto(producto)}>
                      <Card.Img 
                        variant="top" 
                        src={producto.imagen || "https://placehold.co/250x150?text=Sin+Imagen"} 
                        style={{ height: '200px', objectFit: 'cover' }} 
                      />
                      <Card.Body className="text-center">
                        <Card.Title>{producto.nombre}</Card.Title>
                        <Card.Text className="fw-bold text-primary">
                          ${producto.precio ? producto.precio.toLocaleString() : 0}
                        </Card.Text>
                        <Button variant="dark" size="sm">Ver Detalles</Button>
                      </Card.Body>
                    </Card>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        );
      })}
    </Container>
  );
}

export default CarruselCategorias;