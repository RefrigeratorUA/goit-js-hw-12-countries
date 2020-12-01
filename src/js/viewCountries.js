const debounce = require('lodash.debounce');
import api from './fetchCountries';
import { showAlert, closeAlert } from './alerts';
import countriesTpl from '../templates/countries.hbs';
import countryTpl from '../templates/country.hbs';
const DELAY = 500;

export default class ViewCountries {
  constructor({ input, output }) {
    this._refs = {
      searchCountryFieldRef: document.querySelector(input),
      showCountries: document.querySelector(output),
    };
  }

  init() {
    this._refs.searchCountryFieldRef.addEventListener(
      'input',
      debounce(this.onInputChars.bind(this), DELAY),
    );
  }

  onInputChars(e) {
    const searchQuery = e.target.value;

    closeAlert();
    this._refs.showCountries.innerHTML = '';
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
          this._refs.showCountries.innerHTML = countriesTpl(data);
          return;
        }
        this._refs.showCountries.innerHTML = countryTpl(data[0]);
      })
      .catch(error => {
        showAlert('error', 'Ошибка!', `HTTP Status Code ${error}`);
      });
  }
}
