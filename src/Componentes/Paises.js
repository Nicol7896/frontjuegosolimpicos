import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/Paises.css';

function Paises() {
  const [paises, setPaises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/countries')
      .then(response => {
        console.log("Paises cargados:", response.data);
        setPaises(response.data);
      })
      .catch(error => console.error('Error al cargar países:', error));
  }, []);

  return (
    <div className="paises-container">
      <button onClick={() => navigate(-1)}>⬅ Volver</button>
      <h2>Listado de Países</h2>
      <ul>
        {paises.map(countries => (
          <li key={countries.id} onClick={() => navigate(`/countries/${countries.id}`)}>
            <img src={countries.bandera} alt={`Bandera de ${countries.nombre}`} width="40" />
            <span>{countries.nombre}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Paises;
