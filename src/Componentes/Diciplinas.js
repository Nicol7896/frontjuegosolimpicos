import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Disciplinas() {
  const [disciplines, setDisciplinas] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:3000/disciplines')
      .then(res => setDisciplinas(res.data))
      .catch(err => console.error('Error al obtener disciplinas:', err));
  }, []);

  return (
    <div className="paises-container">
      <button onClick={() => navigate(-1)}>⬅ Volver</button>
      <h2>Listado de Disciplinas</h2>
      <ul>
        {disciplines.map(disciplines => (
          <li key={disciplines.id} onClick={() => navigate(`/disciplines/${disciplines.id}`)}>
            <img src={disciplines.icono} alt={`Icono de ${disciplines.nombre}`} width="40" />
            <span>{disciplines.nombre}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Disciplinas;
