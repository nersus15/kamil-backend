const express = require('express');
const AkunController = require('../controllers/akun');
const route = express.Router();

const Akun = new AkunController;

route.post('/', Akun.register)
route.get('/', Akun.getAkun)

module.exports = route;