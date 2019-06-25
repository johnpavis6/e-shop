var express = require('express');
var app = express.Router();

const controller = require('../controllers/admin');
const middleware = require('../middlewares/admin');

app.get('/', controller.home);

app.post('/login', middleware.login, controller.login);

app.get('/dashboard', middleware.isLoggedIn, controller.dashboard);

app.get('/logout', controller.logout);

app.get('/products', controller.products);

app.post('/addproduct', middleware.isLoggedIn, middleware.productInfo, controller.addProduct);

app.post('/updateproduct', middleware.isLoggedIn, middleware.productInfo, controller.updateProduct);

app.post('/deleteproduct', middleware.isLoggedIn, controller.deleteProduct);

module.exports = app;