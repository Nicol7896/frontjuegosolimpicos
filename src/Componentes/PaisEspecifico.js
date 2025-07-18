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
    
    axios.get(`http://localhost:3000/countries/${id}`)
      .then(res => setPais(res.data))
      .catch(err => {
        console.error('Error al cargar país:', err);
        setPais({ nombre: 'No encontrad' }); 
      });

    axios.get('http://localhost:3000/medals')
      .then(res => setMedallas(res.data))
      .catch(err => console.error('Error al cargar medallas:', err));
  }, [id]);

  if (!countries) return <p>Cargando país...</p>;
  if (!countries.nombre) return <p>País no encontrado</p>;

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
  <button onClick={() => navigate(-1)} className="lala">⬅ Volver</button>

  <ul>
    <li>🥇 Oro: {contarTipo('Gold')}</li>
    <li>🥈 Silver: {contarTipo('Silver')}</li>
    <li>🥉 Bronze: {contarTipo('Bronze')}</li>
    <li><strong>Total:</strong> {contarTipo('Gold') + contarTipo('Silver') + contarTipo('Bronze')}</li>
  </ul>

  <div style={{ marginTop: '1rem' }}>
    <button onClick={() => irAMedalleria('oro')}>🥇 Gold</button>{' '}
    <button onClick={() => irAMedalleria('plata')}>🥈 Silver</button>{' '}
    <button onClick={() => irAMedalleria('bronce')}>🥉 Bronze</button>
  </div>
</div>



  );
}

export default PaisEspecifico;
