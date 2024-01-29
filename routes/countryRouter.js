import { Router } from 'express';
import {
  addCountry,
  deleteCountry,
  getCountries,
  getCountryByCode,
  updateCountry,
} from '../controllers/countries.js';
import { countryValidator } from '../validator/countryValidator.js';

const countryrouter = Router();

countryrouter.get('/', getCountries);
countryrouter.get('/:code', getCountryByCode);
countryrouter.post('/', countryValidator, addCountry);
countryrouter.put('/:code', countryValidator, updateCountry);
countryrouter.delete('/:code', deleteCountry);

export default countryrouter;
