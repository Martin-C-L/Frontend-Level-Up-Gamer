import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function PaymentResult() {
  const [searchParams] = useSearchParams();
  const [mensaje, setMensaje] = useState("Verificando...");
  const [icono, setIcono] = useState("⏳");
  
  // Leemos el status que nos mandó el Backend (success, failure, o null)
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "success") {
      setMensaje("¡Compra Exitosa!");
      setIcono("🎮");
      // Opcional: Limpiar carrito aquí
      // localStorage.removeItem("carrito");
    } else if (status === "failure") {
      setMensaje("El pago fue rechazado");
      setIcono("❌");
    } else if (status === "aborted") {
      setMensaje("Pago anulado por el usuario");
      setIcono("⚠️");
    } else {
      setMensaje("Hubo un error desconocido");
      setIcono("❓");
    }
  }, [status]);

  return (
    <div className="container mt-5 text-center text-white">
      <div className="card bg-dark p-5">
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
            {icono}
        </div>
        <h1>{mensaje}</h1>
        
        <p className="mt-3 text-muted">
            {status === 'success' 
                ? "Gracias por tu compra. Te hemos enviado el comprobante." 
                : "Inténtalo nuevamente o selecciona otro medio de pago."}
        </p>

        <div className="mt-4">
            <Link to="/catalogo" className="btn btn-primary">
                {status === 'success' ? "Seguir Comprando" : "Volver a intentar"}
            </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentResult;