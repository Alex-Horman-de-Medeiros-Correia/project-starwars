import React from 'react';
import './App.css';
import Table from './Components/Table';
import AddProvider from './Context/AddProvider';

function App() {
  return (
    <AddProvider>
      <span>Star Wars System!!!</span>
      <Table />
    </AddProvider>
  );
}

export default App;
