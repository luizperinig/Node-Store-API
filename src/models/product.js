const mongoose = require('mongoose'); // importa o módulo mongoose
const Schema = mongoose.Schema; // importa o módulo Schema

const schema = new Schema({
    //_id
    title: { // define o campo title
        type: String, // define o tipo do campo
        required: true, // define que o campo é obrigatório
        trim: true // define que o campo não pode ter espaços no início e no fim
    },
    slug: { // Cadeira gamer = cadeira-gamer (cadeira-gamer é o slug)
        type: String, // define o tipo do campo
        required: [true, 'O slug é obrigatório'], // define que o campo é obrigatório
        trim: true, // define que o campo não pode ter espaços no início e no fim
        index: true, // define que o campo é um índice
        unique: true // define que o campo é único
    },
    description: { // define o campo description
        type: String, // define o tipo do campo
        required: true, // define que o campo é obrigatório
    },
    price: { // define o campo price
        type: Number, // define o tipo do campo
        required: true // define que o campo é obrigatório
    },
    active: { // define o campo active
        type: Boolean, // define o tipo do campo
        required: true, // define que o campo é obrigatório
        default: true // define um valor padrão para o campo
    },
    tags: [{ // define o campo tags
        type: String, // define o tipo do campo
        required: true // define que o campo é obrigatório
    }]
});

module.exports = mongoose.model('Product', schema); // exporta o modelo Product com o schema criado