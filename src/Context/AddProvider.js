import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';

function AddProvider({ children }) {
  const [data, setData] = useState([]);
  const [filtra, setFiltra] = useState('');

  const [filtraValores, setFiltraValores] = useState([
    { filter: 'population',
      comparison: 'maior que',
      value: '0' }]);

  const [selecionando, setSelecionando] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const APIdata = async () => {
    const api = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');

    const response = await api.json();

    const { results } = response;

    setData(results);
  };

  useEffect(() => {
    APIdata();
  }, []);

  const numericos = () => {
    const { filter, value, comparison } = filtraValores[0];
    setSelecionando(selecionando.filter((option) => option !== filter));
    if (comparison === 'maior que') {
      const filtred = data.filter((element) => (Number(element[filter])) > Number(value));
      setData(filtred);
    } else if (comparison === 'menor que') {
      const filtred = data.filter((element) => (Number(element[filter])) < Number(value));
      setData(filtred);
    } else {
      const filtred = data
        .filter((element) => (Number(element[filter])) === Number(value));
      setData(filtred);
    }
  };

  const context = {
    data,
    filtra,
    setData,
    setFiltra,
    filtraValores,
    setFiltraValores,
    numericos,
    selecionando,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

AddProvider.propTypes = {
  children: propTypes.element.isRequired,
};

export default AddProvider;
