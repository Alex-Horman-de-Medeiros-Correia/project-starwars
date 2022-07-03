export default async function planetasApi() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url);
  const planets = await response.json();
  return planets.results;
}
