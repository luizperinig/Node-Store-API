const repository = require('../repositories/order-repository'); // importa o módulo product-repository
const guid = require('guid');   // importa o módulo guid
const authService = require('../services/auth-service'); // importa o módulo auth-service

exports.get = async(req, res, next) => {
    try {   // tenta executar o bloco de código
        var data = await repository.get(); // busca os pedidos
        res.status(200).send(data); // retorna os pedidos
    } catch (e) {   // se ocorrer um erro
        res.status(500).send({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'    // retorna a mensagem de erro
        }); 
    }
};

exports.post = async(req, res, next) => {
    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        
        //Decodifica o token
        const data = await authService.decodeToken(token);

        await repository.create({ 
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        }); // cria um novo pedido com os dados passados no corpo da requisição
        res.status(201).send({  // retorna o status 201 (created) e a mensagem de sucesso
            message: 'Pedido cadastrado com sucesso!'      // retorna a mensagem de sucesso
        });
    } catch (e) {   // se ocorrer um erro
        res.status(500).send({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'    // retorna a mensagem de erro
        }); 
    }
};