     
import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  background: '#222',
  color: '#fff',
  fontFamily: 'Roboto, Arial, sans-serif',
  padding: '10px 22px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'background 0.2s',
};

function Inicio() {
  return (
    <div className="container mt-5">
      


      {/* Contenido principal centrado */}
      <div className="text-center">
        <h1 className="display-4 mb-4">Level Up Gamer</h1>
        <div className="quienes-somos mx-auto p-4" style={{ maxWidth: '600px', background: 'rgba(34,34,34,0.85)', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.2)', color: '#fff' }}>
          <h2 className="mb-3" style={{ fontFamily: 'Orbitron, Arial, sans-serif', fontWeight: 700, fontSize: '2rem' }}>Quiénes Somos</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.7', fontFamily: 'Roboto, Arial, sans-serif' }}>
            ¡Bienvenido a Level-Up Gamer! Somos tu centro de mando online en Chile, un espacio creado por y para entusiastas de los videojuegos. Entendemos que ser gamer es más que un pasatiempo; es un estilo de vida. Por eso, nos dedicamos a equiparte con todo lo que necesitas para llevar tu experiencia de juego al siguiente nivel.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
