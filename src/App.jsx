import React, { useState } from 'react';
import './App.css';
import MiApi from './componentes/Miapi';
import Buscador from './componentes/Buscador';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [data, setData] = useState([]);
  return (
    <>
      <div className="container">
        <div className="buscador">
          <h1>Buscador de Feriados Legales en Chile</h1>
          <Buscador data={data} setData={setData} /> 
          <MiApi data={data} setData={setData} /> 
        </div>
        <div className="imgs">
        </div>
      </div>
    </>
  );
}

export default App;