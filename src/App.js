import React from 'react';
import './App.css';
import Filtrando from './Components/Filtrando';
import Table from './Components/Table';
import AddProvider from './Context/AddProvider';

function App() {
  return (
    <AddProvider>
      <span>Star Wars System!!!</span>
      <br />
      <br />
      <Filtrando />
      <Table />
    </AddProvider>
  );
}

export default App;
