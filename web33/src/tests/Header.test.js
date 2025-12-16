import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from '../components/Header.jsx';

describe('Componente Header', () => {

  it('debería mostrar la cantidad correcta de items (ej: 3)', () => {
    const mockCarrito = [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 1 }];
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify(mockCarrito));

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('no debería mostrar el contador si el carrito está vacío', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));

    
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    const badge = screen.queryByText(/\d+/); 
    expect(badge).toBeNull();
  });
});