import './styles.scss';
import api from './fetchCountries';
import { showAlert, closeAlert } from './alerts';
const debounce = require('lodash.debounce');
import countriesTpl from './templates/countries.hbs';
import countryTpl from './templates/country.hbs';

const refs = {
  searchCountryFieldRef: document.querySelector('#searchCountryField'),
  showCountries: document.querySelector('.js-view'),
};

refs.searchCountryFieldRef.addEventListener('input', debounce(onInputChars, 500));

function onInputChars(e) {
  const searchQuery = e.target.value;

  closeAlert();
  refs.showCountries.innerHTML = '';
  if (!searchQuery) return;

  api(searchQuery)
    .then(data => {
      if (data.length > 9) {
        showAlert(
          'notice',
          'Найдено слишком много совпадений',
          'Пожалуйста, введите более конкретный запрос',
        );
        return;
      } else if (data.length > 1) {
        refs.showCountries.innerHTML = countriesTpl(data);
        return;
      }
      refs.showCountries.innerHTML = countryTpl(data[0]);
    })
    .catch(error => {
      showAlert('error', 'Ошибка!', `HTTP Status Code ${error}`);
    });
}
