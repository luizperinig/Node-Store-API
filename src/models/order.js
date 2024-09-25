const mongoose = require('mongoose'); // importa o módulo mongoose
const Schema = mongoose.Schema; // importa o módulo Schema

const schema = new Schema({
    //_id
    customer: { // define o campo customer
        type: mongoose.Schema.Types.ObjectId, // define o tipo do campo como ObjectId  (referência para outra tabela)
        ref: 'Customer' // define a referência para a tabela Customer
    },
    number: { // define o campo number
        type: String, // define o tipo do campo
        required: true, // define que o campo é obrigatório
    },
    createDate: { // define o campo createDate
        type: Date, // define o tipo do campo
        required: true, // define que o campo é obrigatório
        default: Date.now // define o valor padrão do campo como a data atual
    },
    status: { // define o campo status
        type: String, // define o tipo do campo
        required: true, // define que o campo é obrigatório
        enum: ['created', 'done'], // define os valores possíveis para o campo
        default: 'created' // define o valor padrão do campo como 'created'
    },
    items: [{   // define o campo items como um array
        quantity: { // define o campo quantity
            type: Number, // define o tipo do campo
            required: true, // define que o campo é obrigatório
            default: 1 // define o valor padrão do campo como 1
        },
        price: { // define o campo price
            type: Number, // define o tipo do campo
            required: true, // define que o campo é obrigatório
        },
        product: { // define o campo customer
            type: mongoose.Schema.Types.ObjectId, // define o tipo do campo como ObjectId  (referência para outra tabela)
            ref: 'Product' // define a referência para a tabela Customer
        },
    }],
});

module.exports = mongoose.model('Order', schema); // exporta o modelo Product com o schema criado