const express = require('express'); 
const router = express.Router();
const controller = require('../controllers/order-controller');  // importa o controller
const authService = require('../services/auth-service');   // importa o serviço de autenticação

router.get('/', authService.authorize, controller.get);     // cria uma rota para buscar os pedidos
router.post('/', authService.authorize, controller.post);   // cria uma rota para criar um novo pedido

module.exports = router;   // exporta o roteador