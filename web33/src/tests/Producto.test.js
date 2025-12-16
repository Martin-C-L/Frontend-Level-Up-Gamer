
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


import Producto from '../components/Producto.jsx';

describe('Componente Producto', () => {
  it('debería renderizar los detalles del producto pasados por "location.state"', () => {
    const mockProducto = {
      nombre: "Producto de Prueba",
      descripcion: "Esta es una descripción de prueba.",
      precio: 12345,
      imagen: "test.jpg"
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/producto/test', state: { producto: mockProducto } }]}>
        <Producto />
      </MemoryRouter>
    );

    expect(screen.getByText('Producto de Prueba')).toBeTruthy();
    expect(screen.getByText('Esta es una descripción de prueba.')).toBeTruthy();
    expect(screen.getByText('Precio: $12345')).toBeTruthy();
  });
});