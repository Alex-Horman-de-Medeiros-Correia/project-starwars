import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';

function AddProvider({ children }) {
  const [data, setData] = useState([]);

  const APIdata = async () => {
    const api = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');

    const response = await api.json();

    const { results } = response;

    setData(results);
  };

  useEffect(() => {
    APIdata();
  }, []);

  const context = {
    data,
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
