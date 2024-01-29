import { validationResult } from 'express-validator';
import countries from '../data/countries.js';

// STEP 0
// export const getCountries = (req, res) => {
//   res.status(200).json(countries);
// };

// STEP 1
// export const getCountries = (req, res) => {
//   const { sort } = req.query;
//   let result = [...countries]; // copy countries Array

//   // check if sort = true => sort alphabetically
//   if (sort === 'true') {
//     result.sort((a, b) => a.name.localeCompare(b.name));
//     return res.status(200).json(result);
//   }
//   return res.status(200).json(countries);
// };

// STEP 2
// export const addCountry = (req, res) => {
//   const { name, alpha2Code, alpha3Code } = req.body;
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res
//       .status(400)
//       .json({ errors: errors.array().map((err) => err.msg) });
//   }

//   // check if the country already exists
//   const existingCountry = countries.find(
//     (country) =>
//       country.alpha2Code === alpha2Code || countries.alpha3Code === alpha3Code
//   );

//   if (existingCountry) {
//     return res.status(409).json({ message: 'Country already exists' });
//   }

//   // if all checks passed, create and add the new country to the array
//   const newCountry = {
//     id: countries.length + 1,
//     name,
//     alpha2Code,
//     alpha3Code,
//   };
//   countries.push(newCountry);
//   res.status(201).json(newCountry);
// };

// STEP 3
export const getCountryByCode = (req, res) => {
  const { code } = req.params;

  const country = countries.find(
    (country) =>
      country.alpha2Code === code.toUpperCase() ||
      country.alpha3Code === code.toUpperCase()
  );

  if (!country) {
    return res.status(404).json({ message: 'Country does not exist' });
  }
  res.status(200).json(country);
};

// STEP 4
export const updateCountry = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  const { code } = req.params;

  const index = countries.findIndex(
    (country) => country.alpha2Code === code || country.alpha3Code === code
  );

  // if country not found
  if (index === -1) {
    return res.status(404).json({ message: 'country not found' });
  }

  // update the country
  countries[index] = {
    ...countries[index],
    ...req.body,
  };
  res.status(200).json(countries[index]);
};

// STEP 5
export const deleteCountry = (req, res) => {
  const { code } = req.params;

  const country = countries.find(
    (country) =>
      country.alpha2Code === code.toUpperCase() ||
      country.alpha3Code === code.toUpperCase()
  );

  if (!country) {
    return res.status(404).json({ message: 'Country not found' });
  }

  country.visited = true;
  res
    .status(200)
    .json({ message: `Country with code ${code} has been updated` });
};

// STEP 7
export const getCountries = (req, res) => {
  res.render('wishlist', { countries });
};

export const addCountry = (req, res) => {
  const newCountry = {
    id: countries.length + 1,
    name: req.body.name,
    alpha2Code: req.body.alpha2Code,
    alpha3Code: req.body.alpha3Code,
    visited: req.body.visited,
  };
  countries.push(newCountry);
  res.redirect('/api/countries');
};
