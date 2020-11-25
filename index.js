
const express = require('express');
const app = express();
const port = 3000;
const AkunRoute = require('./routes/akun');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/akun', AkunRoute);

app.listen(port, () => console.log(`App listening on port ${port}`));