import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/medallas.css'

function MedalleriaTipo() {
  const { tipo, paisId } = useParams(); 
  const navigate = useNavigate();

  const [medallas, setMedallas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

  const tipoCapitalizado = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();
  const tipoReal = tipoCapitalizado === 'Oro' ? 'Gold'
                  : tipoCapitalizado === 'Plata' ? 'Silver'
                  : tipoCapitalizado === 'Bronce' ? 'Bronze' : '';

  useEffect(() => {
    axios.get('http://localhost:3000/medals')
      .then(res => setMedallas(res.data));

    axios.get('http://localhost:3000/disciplines')
      .then(res => setDisciplinas(res.data));
  }, []);

 
  const medallasFiltradas = medallas.filter(
    m => m.countryId === parseInt(paisId) && m.tipo === tipoReal
  );

  const conteoPorDisciplina = {};
  medallasFiltradas.forEach(m => {
    conteoPorDisciplina[m.disciplineId] = (conteoPorDisciplina[m.disciplineId] || 0) + (m.cantidad || 1);
  });

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={() => navigate(-1)}>⬅ Volver</button>
      <h2>🏅 {tipoCapitalizado}</h2>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Cantidad de medallas</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map(d => (
            <tr key={d.id}>
              <td>{d.nombre}</td>
              <td>{d.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedalleriaTipo;
