const express = require('express'); 
const router = express.Router();
const controller = require('../controllers/customer-controller');  // importa o controller
const authService = require('../services/auth-service'); // importa o módulo auth-service

router.post('/', controller.post);   // cria uma rota para criar um cliente
router.post('/authenticate', controller.authenticate);   // cria uma rota para autenticar o usuário
router.post('/refresh-token', authService.authorize, controller.refreshToken);   // cria uma rota para atualizar o token

module.exports = router;   // exporta o roteador