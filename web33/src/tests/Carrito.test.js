import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


import Carrito from '../components/Carrito.jsx';

describe('Componente Carrito', () => {
  it('debería mostrar "El carrito está vacío" si localStorage está vacío', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    expect(screen.getByText('El carrito está vacío.')).toBeTruthy();
  });
});