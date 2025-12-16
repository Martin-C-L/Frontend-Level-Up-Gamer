import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


import Registro from '../components/Registro.jsx';

describe('Componente Registro', () => {
  it('debería mostrar un mensaje de error si el usuario es menor de 18 años', () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    const today = new Date();
    const underageDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate()).toISOString().split('T')[0];

    fireEvent.change(screen.getByLabelText(/Fecha de Nacimiento/i), {
      target: { value: underageDate },
    });

    fireEvent.click(screen.getByText('Registrarse'));

    expect(screen.getByText('Debes tener al menos 18 años para registrarte.')).toBeTruthy();
  });
});