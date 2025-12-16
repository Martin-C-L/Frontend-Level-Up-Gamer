import React from "react";
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo-section">
          <div className="footer-logo-text">LevelUPGamer</div>
        </div>
        <div className="footer-section">
          <h3>Conócenos</h3>
          <ul>
            <li><a href="#">Zona de despacho</a></li>
            <li><a href="#">Reclamo</a></li>
            <li><a href="#">Descarga nuestra app</a></li>
            <li><a href="#">Recicla tus Productos</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Redes sociales</h3>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">TikTok</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Mi cuenta</h3>
          <ul>
            <li><a href="#">Pedir</a></li>
            <li><a href="#">Iniciar sesión</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
