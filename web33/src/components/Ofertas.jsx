  // Estilos para flechas del carrusel más hacia afuera
  import './OfertasCustomCarousel.css';
  // Función para agregar al carrito (igual que en Catalogo)
  const agregarAlCarrito = (producto) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
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

import React, { useEffect, useState } from 'react';
import { Carousel, Container, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';


function Ofertas() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  // Ofertas del mes manuales
  const ofertasDestacadas = [
    {
      id: 1,
      nombre: "Multifuncional Brother",
      precio: 186990,
      descuento: "-31%",
      descripcion: "InkBenefit Tank WiFi-Direct",
      imagen: "https://serofic.cl/wp-content/uploads/2021/07/Maxify-GX-7010.jpg" 
    },
    {
      id: 2,
      nombre: "Notebook Gamer ASUS",
      precio: 899990,
      descuento: "-15%",
      descripcion: "Potencia gráfica para tus juegos favoritos.",
      imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
    }
  ];

  useEffect(() => {
    ProductService.getAllProductos()
      .then(data => {
        setProductos(data);
      })
      .catch(error => console.error("Error cargando productos:", error));
  }, []);

  // Filtrar por categoría
  const getPorCategoria = (cat) => productos.filter(p => p.categoria && p.categoria.toLowerCase() === cat.toLowerCase());

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4 text-danger fw-bold">🔥 Ofertas del Mes 🔥</h2>

      {/* CARRUSEL PRINCIPAL (Reemplaza a Slider de slick) */}
      <Carousel className="mb-5">
        {ofertasDestacadas.map((prod) => (
          <Carousel.Item key={prod.id} interval={3000}>
            <div className="d-block w-100 bg-dark text-white p-5 rounded" style={{ minHeight: '300px' }}>
              <Row className="align-items-center">
                <Col md={6}>
                  <img 
                    src={prod.imagen} 
                    alt={prod.nombre} 
                    className="img-fluid rounded shadow" 
                    style={{ maxHeight: '250px', objectFit: 'cover' }} 
                  />
                </Col>
                <Col md={6} className="text-center text-md-start mt-3 mt-md-0">
                  <span className="badge bg-warning text-dark mb-2 fs-5">{prod.descuento}</span>
                  <h1>{prod.nombre}</h1>
                  <p className="lead">{prod.descripcion}</p>
                  <h3 className="text-success fw-bold mb-4">{prod.precio}</h3>
                  <div className="d-flex justify-content-center">
                    <Button variant="dark" className="mt-1" onClick={() => agregarAlCarrito(prod)}>
                      Agregar al carro
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* SECCIÓN COMPUTADORES GAMER */}
      <h2 className="mb-3 border-bottom pb-2">Computadores Gamer</h2>
      <Carousel interval={null} indicators={true} className="ofertas-carousel-arrows-medio">
        {(() => {
          const items = getPorCategoria('computadores');
          const slides = [];
          for (let i = 0; i < items.length; i += 4) {
            slides.push(items.slice(i, i + 4));
          }
          return slides.map((slide, idx) => (
            <Carousel.Item key={idx}>
              <Row>
                {slide.map((pc, j) => (
                  <Col md={3} className="mb-4" key={pc.id || j}>
                    <Card className="h-100 shadow-sm border-0">
                      <Card.Img variant="top" src={pc.imagen} style={{ height: '200px', objectFit: 'cover' }} />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{pc.nombre}</Card.Title>
                        <Card.Text className="fw-bold text-primary mt-auto">${pc.precio ? pc.precio.toLocaleString() : 0}</Card.Text>
                        <Button variant="dark" className="mt-2" onClick={() => agregarAlCarrito(pc)}>Agregar al carro</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ));
        })()}
      </Carousel>


      {/* SECCIÓN CONSOLAS */}
      <h2 className="mb-3 border-bottom pb-2">Consolas</h2>
      <Carousel interval={null} indicators={true} className="ofertas-carousel-arrows-medio">
        {(() => {
          const items = getPorCategoria('consolas');
          const slides = [];
          for (let i = 0; i < items.length; i += 4) {
            slides.push(items.slice(i, i + 4));
          }
          return slides.map((slide, idx) => (
            <Carousel.Item key={idx}>
              <Row>
                {slide.map((item, j) => (
                  <Col md={3} className="mb-4" key={item.id || j}>
                    <Card className="h-100 shadow-sm border-0">
                      <Card.Img variant="top" src={item.imagen} style={{ height: '200px', objectFit: 'cover' }} />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{item.nombre}</Card.Title>
                        <Card.Text className="fw-bold text-primary mt-auto">${item.precio ? item.precio.toLocaleString() : 0}</Card.Text>
                        <Button variant="dark" className="mt-2" onClick={() => agregarAlCarrito(item)}>Agregar al carro</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ));
        })()}
      </Carousel>


      {/* SECCIÓN MOUSE */}
      <h2 className="mb-3 border-bottom pb-2">Mouse</h2>
      <Carousel interval={null} indicators={true} className="ofertas-carousel-arrows-medio">
        {(() => {
          const items = getPorCategoria('mouse');
          const slides = [];
          for (let i = 0; i < items.length; i += 4) {
            slides.push(items.slice(i, i + 4));
          }
          return slides.map((slide, idx) => (
            <Carousel.Item key={idx}>
              <Row>
                {slide.map((item, j) => (
                  <Col md={3} className="mb-4" key={item.id || j}>
                    <Card className="h-100 shadow-sm border-0">
                      <Card.Img variant="top" src={item.imagen} style={{ height: '200px', objectFit: 'cover' }} />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{item.nombre}</Card.Title>
                        <Card.Text className="fw-bold text-primary mt-auto">${item.precio ? item.precio.toLocaleString() : 0}</Card.Text>
                        <Button variant="dark" className="mt-2" onClick={() => agregarAlCarrito(item)}>Agregar al carro</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ));
        })()}
      </Carousel>
      <div className="d-flex justify-content-center mt-5">
        <Button variant="primary" size="lg" onClick={() => navigate('/catalogo')}>
          Ver todos los productos
        </Button>
      </div>
    </Container>
  );
}

export default Ofertas;