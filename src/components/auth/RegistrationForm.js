import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Un CSS común para los formularios de auth integrados

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    setLoading(true);
    // Simulación de API call
    console.log('Datos de registro enviados:', formData);
    setTimeout(() => {
      setLoading(false);
      alert('¡Registro exitoso! Redirigiendo a Login');
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="auth-form-container integrated-auth-form"> {/* Nueva clase contenedora */}
      <div className="auth-form-header-integrated">
        <h2 className="auth-title-integrated">Crea tu cuenta CineFlow</h2>
        <p className="auth-subtitle-integrated">Disfruta de la mejor experiencia cinematográfica.</p>
      </div>
      <form onSubmit={handleSubmit} className="auth-form-fields">
        {error && <p className="form-error-integrated">{error}</p>}
        <div className="form-row"> {/* Para poner nombre y apellido en la misma fila */}
          <div className="form-group-integrated half-width">
            <label htmlFor="firstName">Nombre*</label>
            <input
              type="text" id="firstName" name="firstName"
              className="form-input-integrated" placeholder="Tu nombre"
              value={formData.firstName} onChange={handleChange} required disabled={loading}
            />
          </div>
          <div className="form-group-integrated half-width">
            <label htmlFor="lastName">Apellido*</label>
            <input
              type="text" id="lastName" name="lastName"
              className="form-input-integrated" placeholder="Tu apellido"
              value={formData.lastName} onChange={handleChange} required disabled={loading}
            />
          </div>
        </div>
        <div className="form-group-integrated">
          <label htmlFor="email">Correo Electrónico*</label>
          <input
            type="email" id="email" name="email"
            className="form-input-integrated" placeholder="ejemplo@cineflow.com"
            value={formData.email} onChange={handleChange} required disabled={loading}
          />
        </div>
        <div className="form-group-integrated">
          <label htmlFor="phone">Número de Teléfono*</label>
          <input
            type="tel" id="phone" name="phone"
            className="form-input-integrated" placeholder="Tu número de teléfono"
            value={formData.phone} onChange={handleChange} required disabled={loading}
          />
        </div>
        <div className="form-group-integrated">
          <label htmlFor="password">Contraseña*</label>
          <input
            type="password" id="password" name="password"
            className="form-input-integrated" placeholder="Mínimo 8 caracteres"
            value={formData.password} onChange={handleChange} required disabled={loading}
          />
        </div>
        <div className="form-group-integrated">
          <label htmlFor="confirmPassword">Confirmar Contraseña*</label>
          <input
            type="password" id="confirmPassword" name="confirmPassword"
            className="form-input-integrated" placeholder="Repite tu contraseña"
            value={formData.confirmPassword} onChange={handleChange} required disabled={loading}
          />
        </div>
        
        <div className="form-group-integrated terms-checkbox">
            <input type="checkbox" id="terms" name="terms" required disabled={loading} />
            <label htmlFor="terms" className="checkbox-label">
                Acepto los <a href="/terminos" target="_blank">Términos y Condiciones</a> y las <a href="/privacidad" target="_blank">Políticas de Protección de Datos</a>.
            </label>
        </div>

        <button type="submit" className="form-button-integrated" disabled={loading}>
          {loading ? 'Creando Cuenta...' : 'Crear Cuenta'}
        </button>
        <p className="form-link-integrated">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;