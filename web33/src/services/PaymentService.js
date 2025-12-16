const API_URL = "http://localhost:8080/api/pagos";

class PaymentService {
  
  async iniciarPago(total) {
    const response = await fetch(`${API_URL}/iniciar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total }),
    });
    return await response.json();
  }

  async confirmarPago(token) {
    const response = await fetch(`${API_URL}/confirmar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    return await response.json();
  }
}

export default new PaymentService();