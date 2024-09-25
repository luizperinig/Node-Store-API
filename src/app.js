const express = require('express'); // importa o módulo express
const bodyParser = require('body-parser'); // importa o módulo body-parser
const mongoose = require('mongoose'); // importa o módulo mongoose
const config = require('./config'); // importa o módulo config

const app = express();  // cria a aplicação express
const router = express.Router();    // cria um objeto de roteamento

// Conecta ao banco de dados
mongoose.connect(config.connectionString); // conecta ao banco de dados

//Carrega os Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Carrega as rotas
const indexRoute = require('./routes/index-route');  
const productRoute = require('./routes/product-route');  
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json({
    limit: '5mb' // limita o tamanho do corpo da requisição para 5mb
})); // utiliza o body-parser para converter o corpo da requisição para JSON
app.use(bodyParser.urlencoded({ extended: false }));      // codifica a URL 

// Habilita o CORS  (Cross-Origin Resource Sharing) para a API  
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');    // define que qualquer origem pode acessar a API
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token'); // define os cabeçalhos permitidos
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // define os métodos permitidos
    next(); // chama o próximo middleware
});

app.use('/', indexRoute);    // utiliza a rota criada
app.use('/products', productRoute);   // utiliza a rota criada
app.use('/customers', customerRoute);   // utiliza a rota criada
app.use('/orders', orderRoute);   // utiliza a rota criada

module.exports = app;   // exporta a aplicação