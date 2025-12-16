import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


import Catalogo from '../components/Catalogo.jsx';

describe('Componente Catalogo', () => {
  it('debería filtrar los productos cuando se cambia la categoría', () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );

    expect(screen.getByText('Ajedrez Nación')).toBeTruthy();
    expect(screen.getByText('Silla Gamer Cougar')).toBeTruthy();

    fireEvent.change(screen.getByRole('combobox'), { 
      target: { value: 'sillas' } 
    });

    expect(screen.queryByText('Ajedrez Nación')).not.toBeTruthy();
    expect(screen.getByText('Silla Gamer Cougar')).toBeTruthy();
  });
});