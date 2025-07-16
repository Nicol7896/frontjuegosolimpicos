import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DisciplinaPais() {
  const { id } = useParams(); // ID de la disciplina
  const navigate = useNavigate();

  const [disciplina, setDisciplina] = useState(null);
  const [medallas, setMedallas] = useState([]);
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    // Obtener la disciplina
    axios.get(`http://localhost:3000/disciplines/${id}`)
      .then(res => setDisciplina(res.data))
      .catch(err => console.error('Error cargando disciplina:', err));

    // Obtener todas las medallas
    axios.get('http://localhost:3000/medals')
      .then(res => setMedallas(res.data))
      .catch(err => console.error('Error cargando medallas:', err));

    // Obtener todos los países
    axios.get('http://localhost:3000/countries')
      .then(res => setPaises(res.data))
      .catch(err => console.error('Error cargando países:', err));
  }, [id]);

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={() => navigate(-1)}>⬅ Volver</button>
      <h3>Medallería por país</h3>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>País</th>
            <th>Total de Medallas</th>
          </tr>
        </thead>
        <tbody>
          {paises.map(countries => (
            <tr key={countries.id} style={{ cursor: 'pointer'}} onClick={() => navigate(`/disciplines/${id}/country/${countries.id}`)}>
              <td>
                <img
                  src={countries.bandera}
                  alt={countries.nombre}
                  width="30"
                  style={{ verticalAlign: 'middle', marginRight: '8px' }}
                />
                {countries.nombre}
              </td>
              <td>{countries.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisciplinaPais;
