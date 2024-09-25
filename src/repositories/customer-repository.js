const mongoose = require('mongoose');   // importa o módulo mongoose
const Customer = mongoose.model('Customer');  // importa o modelo Product criado no arquivo product.js

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save(); // salva o produto
}

exports.authenticate = async(data) => {     // cria uma função para autenticar o usuário
    const res = await Customer.findOne({       // busca um usuário com base no email e senha
        email: data.email,                  // define o email   
        password: data.password             // define a senha
    });    
    return res;     
}

exports.getById = async(id) => {     
    const res = await Customer.findById(id);    
    return res;     
}