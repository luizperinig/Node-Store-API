const ValidationContract = require('../validators/fluent-validator'); // importa o módulo fluid-validator
const repository = require('../repositories/product-repository'); // importa o módulo product-repository


exports.get = async(req, res, next) => {
    try {   // tenta executar o bloco de código
        var data = await repository.get(); // busca os produtos
        res.status(200).send(data); // retorna os produtos
    } catch (e) {   // se ocorrer um erro
        res.status(500).sen({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'    // retorna a mensagem de erro
        }); 
    }
};

exports.getBySlug = async(req, res, next) => {
    try {   // tenta executar o bloco de código
        var data = await repository.getBySlug(req.params.slug)  // busca o produto pelo slug
        res.status(200).send(data); // retorna os dados
    } catch (e) {   // se ocorrer um erro
        res.status(500).sen({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'    // retorna a mensagem de erro
        }); 
    }
};

exports.getById = async(req, res, next) => {
    try {   // tenta executar o bloco de código
        var data = await repository.getById(req.params.id)     // busca o produto pelo id
        res.status(200).send(data); // retorna os dados
    } catch (e) {   // se ocorrer um erro
        res.status(500).sen({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'    // retorna a mensagem de erro
        }); 
    }
};

exports.getByTag = async(req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag)   // busca o produto pela tag
        res.status(200).send(data); // retorna os dados
    } catch (e) {   // se ocorrer um erro
        res.status(500).sen({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'    // retorna a mensagem de erro
        }); 
    }
};

exports.post = async(req, res, next) => {
    // Validação dos dados
    let contract = new ValidationContract(); // cria uma nova instância de ValidationContract
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres'); // valida o título
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');   // valida o slug
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');    // valida a descrição

    // se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end(); // retorna o status 400 (bad request) e a lista de erros encontrados na validação dos dados e encerra a requisição
        return; // encerra a função
    }

    try {
        await repository.create(req.body); // cria o produto
        res.status(201).send({  // retorna o status 201 (created) e a mensagem de sucesso
            message: 'Produto cadastrado com sucesso!'      // retorna a mensagem de sucesso
        });
    } catch (e) {   // se ocorrer um erro
        res.status(500).send({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'   , // retorna a mensagem de erro
        }); 
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body); // atualiza o produto
        res.status(200).send({      // retorna o status 200 (ok) e a mensagem de sucesso
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {   // se ocorrer um erro
        res.status(500).sen({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'    // retorna a mensagem de erro
        }); 
    }
};

exports.delete = async(req, res, next) => {
   try {
        await repository.delete(req.body.id); // remove o produto
        res.status(200).send({       // retorna o status 200 (ok) e a mensagem de sucesso
            message:'Produto removido com sucesso!'
        });
    } catch (e) {   // se ocorrer um erro
        res.status(500).sen({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'    // retorna a mensagem de erro
        }); 
    }     
};