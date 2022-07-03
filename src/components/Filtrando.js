import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Filtrando() {
  const { info, setInfo, cache } = useContext(AppContext);
  const [filter, setFilter] = useState({
    peloNome: {
      name: '',
    },
    filtrandoPorValores: [],
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });
  const [filtrosAtuais, setFiltrosAtuais] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const procurandoFiltros = (name, numeric) => {
    let filtrar = cache
      .filter((element) => element.name.includes(name));
    if (numeric.length > 0) {
      numeric.forEach((element) => {
        if (element.comparison === 'maior que') {
          filtrar = filtrar
            .filter((e) => Number(e[element.column]) > Number(element.value));
        }
        if (element.comparison === 'menor que') {
          filtrar = filtrar
            .filter((e) => Number(e[element.column]) < Number(element.value));
        }
        if (element.comparison === 'igual a') {
          filtrar = filtrar
            .filter((e) => Number(e[element.column]) === Number(element.value));
        }
      });
    }
    setInfo(filtrar);
  };

  const desabilitar = (column) => (
    filter.filtrandoPorValores.some((element) => element.column === column)
  );

  const listaOrdenada = () => {
    const { column, sort } = filter.order;
    const negativo = -1;
    if (sort === 'ASC') {
      const comparativo = (a, b) => {
        if (b[column] === 'unknown') return negativo;
        return Number(a[column]) - Number(b[column]);
      };
      setInfo([...info.sort(comparativo)]);
    } else {
      const comparativo = (a, b) => {
        if (b[column] === 'unknown') return negativo;
        return Number(b[column]) - Number(a[column]);
      };
      setInfo([...info.sort(comparativo)]);
    }
  };

  return (
    <div>
      <label htmlFor="name-filter">
        Name
        <input
          type="text"
          data-testid="name-filter"
          value={ filter.peloNome.name }
          onChange={ ({ target }) => {
            setFilter({ ...filter, peloNome: { name: target.value } });
            procurandoFiltros(target.value, filter.filtrandoPorValores);
          } }
        />
      </label>
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          id="column-filter"
          value={ filtrosAtuais.column }
          onChange={ ({ target }) => (
            setFiltrosAtuais({ ...filtrosAtuais, column: target.value })
          ) }
        >
          {!desabilitar('population') && <option value="population">population</option>}
          {!desabilitar('orbital_period') && (
            <option value="orbital_period">orbital_period</option>
          )}
          {!desabilitar('diameter') && (
            <option value="diameter">diameter</option>
          )}
          {!desabilitar('rotation_period') && (
            <option value="rotation_period">rotation_period</option>
          )}
          {!desabilitar('surface_water') && (
            <option value="surface_water">surface_water</option>
          )}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          id="comparison-filter"
          value={ filtrosAtuais.comparison }
          onChange={ ({ target }) => (
            setFiltrosAtuais({ ...filtrosAtuais, comparison: target.value })
          ) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          value={ filtrosAtuais.value }
          onChange={ ({ target }) => (
            setFiltrosAtuais({ ...filtrosAtuais, value: target.value })
          ) }
        />
      </label>
      <button
        disabled={ filtrosAtuais.column === '' }
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setFilter({ ...filter,
            filtrandoPorValores: [...filter.filtrandoPorValores, filtrosAtuais] });
          setFiltrosAtuais({ ...filtrosAtuais, column: '' });
          procurandoFiltros(filter.peloNome.name,
            [...filter.filtrandoPorValores, filtrosAtuais]);
        } }
      >
        Filter
      </button>

      {filter.filtrandoPorValores.map((element, i) => (
        <section key={ `${element}${i}` } data-testid="filter">
          <span>{element.column}</span>
          <button
            type="button"
            onClick={ () => {
              setFilter({ ...filter,
                filtrandoPorValores: filter.filtrandoPorValores
                  .filter((item) => item.column !== element.column) });
              procurandoFiltros(filter.peloNome.name,
                filter.filtrandoPorValores
                  .filter((item) => item.column !== element.column));
            } }
          >
            x
          </button>
        </section>
      ))}
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => {
          setFilter({ ...filter,
            filtrandoPorValores: [] });
          setInfo(cache);
        } }
      >
        Clear All
      </button>

      <label htmlFor="order">
        <select
          name="order"
          id="order"
          data-testid="column-sort"
          value={ filter.order.column }
          onChange={ ({ target }) => {
            setFilter({ ...filter, order: { ...filter.order, column: target.value } });
          } }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="column-sort-input-asc">
        ASC
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          id="column-sort-input-asc"
          value="ASC"
          name="order"
          checked={ filter.order.sort === 'ASC' }
          onChange={ ({ target }) => (
            setFilter({ ...filter, order: { ...filter.order, sort: target.value } })) }
        />
      </label>
      <label htmlFor="column-sort-input-desc">
        DESC
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          id="column-sort-input-desc"
          value="DESC"
          name="order"
          checked={ filter.order.sort === 'DESC' }
          onChange={ ({ target }) => (
            setFilter({ ...filter, order: { ...filter.order, sort: target.value } })) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ listaOrdenada }
      >
        Sort
      </button>

    </div>
  );
}

export default Filtrando;
