const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  
  // Registro (se mantiene casi igual)
  async register(usuario) {
    const response = await fetch(API_URL + "registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || "Error en el registro");
    }
    return await response.json();
  }

  // Login: Ahora esperamos recibir un Token
  async login(email, password) {
    const response = await fetch(API_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }
    
    const data = await response.json();
    
    // Suponemos que el backend devuelve: { token: "...", email: "...", rol: "ROLE_USER" }
    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data)); // Guardamos todo (token + info)
    }
    return data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // NUEVO: Método helper para generar la cabecera HTTP
  getAuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      // Retorna la cabecera estándar para JWT
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }
  
  // NUEVO: Verificar si es Admin (útil para proteger rutas)
  isAdmin() {
    const user = this.getCurrentUser();
    // Ajusta "ROLE_ADMIN" según cómo lo devuelva tu backend (puede ser "ADMIN" a secas)
    return user && user.rol === 'ROLE_ADMIN';
  }
}

export default new AuthService();