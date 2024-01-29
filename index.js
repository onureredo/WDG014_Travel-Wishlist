import express from 'express';
import countryrouter from './routes/countryRouter.js';

const app = express();
const PORT = 8000;

app.use(express.json()); // body-parser for POST- requests w/ JSON-Payloads
app.use(express.urlencoded({ extended: true })); // to handle form submissions
app.set('view engine', 'ejs');

// ROUTES
app.use('/api/countries', countryrouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
