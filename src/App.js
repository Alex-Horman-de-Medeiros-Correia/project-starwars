import React from 'react';
import './App.css';
import Filtrando from './components/Filtrando';
import Table from './components/Table';
import AContext from './context/AppContext';

function App() {
  return (
    <AContext>
      <span>App Star Wars Info!</span>
      <br />
      <br />
      <Filtrando />
      <Table />
    </AContext>
  );
}

export default App;
