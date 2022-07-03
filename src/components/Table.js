import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import planetasApi from '../issues/planetasApi';

function Table() {
  const { info, setInfo, setCache } = useContext(AppContext);
  useEffect(() => {
    async function mundos() {
      const negativo = -1;

      const resposta = await planetasApi();
      setInfo(resposta.sort((a, b) => (a.name < b.name ? negativo : true)));
      setCache(resposta);
    }
    mundos();
  }, [setInfo, setCache]);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
          {info.map((element) => (
            <tr key={ element.name }>
              <td data-testid="planet-name">{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>{element.films}</td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
