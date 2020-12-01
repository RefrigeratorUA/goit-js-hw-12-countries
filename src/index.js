import './css/styles.scss';
import ViewCountries from './js/viewCountries';

const viewCountries = new ViewCountries({
  input: '#searchCountryField',
  output: '.js-view',
});
viewCountries.init();
