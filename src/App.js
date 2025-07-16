import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bienvenida from './Componentes/Bienvenida';
import Paises from './Componentes/Paises';
import PaisEspecifico from './Componentes/PaisEspecifico';
import Diciplinas from './Componentes/Diciplinas';
import DiciplinaPais from './Componentes/DiciplinaPais';
import DisciplinaPorPais from './Componentes/DiciplinaPorPais';
import MedalleriaTipo from './Componentes/MedalleriaTipo';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bienvenida/>} />
        <Route path="/countries" element={<Paises />} />
        <Route path="/countries/:id" element={<PaisEspecifico />} />
        <Route path="/disciplines" element={<Diciplinas />} />
        <Route path="/disciplines/:id" element={<DiciplinaPais />} />
        <Route path="/medalleria/:tipo/:countryId" element={<MedalleriaTipo/>}></Route>
        <Route path="/disciplines/:id/country/:countryId" element={<DisciplinaPorPais />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
