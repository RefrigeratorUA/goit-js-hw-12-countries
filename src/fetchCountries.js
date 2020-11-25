export default function fetchCountries(searchQuery) {
  const BASE_URL = 'https://restcountries.eu/rest/v2/name/';
  return fetch(`${BASE_URL}${searchQuery}`)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        let error = new Error();
        error.response = response;
        throw error.response.status;
      }
    })
    .then(response => response.json());
}
