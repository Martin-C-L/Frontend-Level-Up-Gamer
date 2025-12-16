import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


import Inicio from '../components/Inicio.jsx';

describe('Componente Inicio', () => {
  it('debería renderizar el título principal y los links de navegación', () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    expect(screen.getByText('Level Up Gamer')).toBeTruthy();
    expect(screen.getByText('Quiénes Somos')).toBeTruthy();
  });
});