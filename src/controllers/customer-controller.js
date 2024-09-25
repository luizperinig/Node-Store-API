const ValidationContract = require('../validators/fluent-validator'); // importa o módulo fluid-validator
const repository = require('../repositories/customer-repository'); // importa o módulo product-repository
const md5 = require('md5'); // importa o módulo md5, usado para criptografar a senha
const authService = require('../services/auth-service'); // importa o módulo auth-service

const emailService = require('../services/email-service'); // importa o módulo email-service

exports.post = async(req, res, next) => {
    // Validação dos dados
    let contract = new ValidationContract(); // cria uma nova instância de ValidationContract
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres'); // valida o nome
    contract.isEmail(req.body.email, 'Email inválido');   // valida o email
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 3 caracteres');    // valida a senha

    // se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end(); // retorna o status 400 (bad request) e a lista de erros encontrados na validação dos dados e encerra a requisição
        return; // encerra a função
    }

    try {
        await repository.create({
            name: req.body.name,    // pega o nome do corpo da requisição
            email: req.body.email,  // pega o email do corpo da requisição
            password: md5(req.body.password + global.SALT_KEY), // pega a senha do corpo da requisição e criptografa com md5
            roles: ["user"] // define o perfil do usuário
        }); // cria o produto
        
        await emailService.send(
            req.body.email,
            'Bem vindo ao Node Store', 
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        ); // envia o email de boas-vindas

        res.status(201).send({  // retorna o status 201 (created) e a mensagem de sucesso
            message: 'Cliente cadastrado com sucesso!'      // retorna a mensagem de sucesso
        });
    } catch (e) {   // se ocorrer um erro
        res.status(500).send({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'    // retorna a mensagem de erro
        }); 
    }
};

exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,  // pega o email do corpo da requisição
            password: md5(req.body.password + global.SALT_KEY)  // pega a senha do corpo da requisição e criptografa com md5
        }); // cria o produto
 
        if(!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'               
            });
            return;
        };

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {   // se ocorrer um erro
        res.status(500).send({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'    // retorna a mensagem de erro
        }); 
    }
};

exports.refreshToken = async(req, res, next) => {
    try {    
        const token = req.body.token || req.query.token || req.headers['x-access-token'];     
        const data = await authService.decodeToken(token);
        
        const customer = await repository.getById(data.id); 
        
        if(!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado'               
            });
            return;
        };

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {   // se ocorrer um erro
        res.status(500).send({   // retorna o status 500 (internal server error) e a mensagem de erro
            message: 'Falha ao processar sua requisição'    // retorna a mensagem de erro
        }); 
    }
};