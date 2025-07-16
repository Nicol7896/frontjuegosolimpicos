import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/paisEspecifico.css';

function PaisEspecifico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [countries, setPais] = useState(null);
  const [medallas, setMedallas] = useState([]);

  useEffect(() => {
    // Cargar país
    axios.get(`http://localhost:3000/countries/${id}`)
      .then(res => setPais(res.data))
      .catch(err => {
        console.error('Error al cargar país:', err);
        setPais({ nombre: 'No encontrad' }); // evita bucle infinito
      });

    // Cargar medallas
    axios.get('http://localhost:3000/medals')
      .then(res => setMedallas(res.data))
      .catch(err => console.error('Error al cargar medallas:', err));
  }, [id]);

  if (!countries) return <p>Cargando país...</p>;
  if (!countries.nombre) return <p>País no encontrado</p>;

  // Filtrar medallas del país
  const medallasDelPais = medallas.filter(m => m.countryId === parseInt(id));

  const contarTipo = (tipo) =>
    medallasDelPais
      .filter(m => m.tipo === tipo)
      .reduce((total, m) => total + (m.cantidad || 1), 0);

  const irAMedalleria = (tipo) => {
    navigate(`/medalleria/${tipo.toLowerCase()}/${id}`);
  };

  return (
<div style={{ padding: '1rem' }}>
  <button onClick={() => navigate(-1)}>⬅ Volver</button>



  <h3>Medallas ganadas:</h3>
  <ul>
    <li>🥇 Oro: {contarTipo('Gold')}</li>
    <li>🥈 Plata: {contarTipo('Silver')}</li>
    <li>🥉 Bronce: {contarTipo('Bronze')}</li>
    <li><strong>Total:</strong> {contarTipo('Gold') + contarTipo('Silver') + contarTipo('Bronze')}</li>
  </ul>

  <div style={{ marginTop: '1rem' }}>
    <button onClick={() => irAMedalleria('oro')}>🥇 Ver Oro</button>{' '}
    <button onClick={() => irAMedalleria('plata')}>🥈 Ver Plata</button>{' '}
    <button onClick={() => irAMedalleria('bronce')}>🥉 Ver Bronce</button>
  </div>
</div>



  );
}

export default PaisEspecifico;
