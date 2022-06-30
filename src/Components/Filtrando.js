import React, { useContext, useState } from 'react';
import MyContext from '../Context/MyContext';

const obj = {};

function Filtrando() {
  const { setFiltraValores, numericos, selecionando } = useContext(MyContext);
  const [valores, setValores] = useState({});

  const handleFunc = ({ target: { name, value } }) => {
    obj[name] = value;
    setValores(obj);
    setFiltraValores([obj]);
  };

  const handleValue = () => {
    numericos();
  };
  return (
    <div>
      <select
        data-testid="column-filter"
        defaultValue="population"
        name="filter"
        onChange={ handleFunc }
      >
        {selecionando.map((element) => (
          <option key={ element } value={ element }>
            {element}
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        defaultValue="maior que"
        name="comparison"
        onChange={ handleFunc }
      >
        <option value="maior que">
          maior que
        </option>
        <option value="menor que">
          menor que
        </option>
        <option value="igual a">
          igual a
        </option>
      </select>
      <input
        data-testid="value-filter"
        name="value"
        type="number"
        onChange={ handleFunc }
        value={ valores.value === undefined ? 0 : valores.value }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleValue }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filtrando;
