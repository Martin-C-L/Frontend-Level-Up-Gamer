import AuthService from './AuthService'; // Importamos para obtener el token

const API_URL = "http://localhost:8080/api/productos";

class ProductService {
  
  async getAllProductos() {
    // Agregamos el header de autorización a la petición
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        ...AuthService.getAuthHeader(), // Inserta: { Authorization: 'Bearer ...' }
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      // Manejo básico de expiración de token
      if (response.status === 401 || response.status === 403) {
          AuthService.logout();
          window.location.href = "/login"; // Forzar login si el token venció
      }
      throw new Error("Error al cargar los productos o no autorizado");
    }
    return await response.json();
  }
}

export default new ProductService();