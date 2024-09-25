const express = require('express'); 
const router = express.Router();
const controller = require('../controllers/product-controller');  // importa o controller
const authService = require('../services/auth-service');   // importa o serviço de autenticação

router.get('/', controller.get);    // cria uma rota para buscar todos os produtos
router.get('/:slug', controller.getBySlug);  // cria uma rota para buscar um produto pelo slug
router.get('/admin/:id', controller.getById);  // cria uma rota para buscar um produto pelo id
router.get('/tags/:tag', controller.getByTag);  // cria uma rota para buscar um produto pela tag
router.post('/', authService.isAdmin, controller.post);   // cria uma rota para criar um produto
router.put('/:id', authService.isAdmin, controller.put);  // cria uma rota para atualizar um produto
router.delete('/', authService.isAdmin, controller.delete);  // cria uma rota para deletar um produto

module.exports = router;   // exporta o roteador