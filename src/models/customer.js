const mongoose = require('mongoose'); // importa o módulo mongoose
const Schema = mongoose.Schema; // importa o módulo Schema

const schema = new Schema({
    //_id
    name: { // define o campo name
        type: String, // define o tipo do campo
        required: true, // define que o campo é obrigatório
    },
    email: { // define o campo email
        type: String, // define o tipo do campo
        required: true, // define que o campo é obrigatório
    },
    password: { // define o campo password
        type: String, // define o tipo do campo
        required: true, // define que o campo é obrigatório
    },
    roles: [{ // define o campo roles
        type: String, // define o tipo do campo
        required: true, // define que o campo é obrigatório
        enum: ['user', 'admin'], // define os valores aceitos para o campo roles
        default: 'user' // define o valor padrão para o campo roles
    }],
});

module.exports = mongoose.model('Customer', schema); // exporta o modelo Product com o schema criado