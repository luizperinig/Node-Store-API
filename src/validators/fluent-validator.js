'use strict';

let errors = [];        // Array de erros

function ValidationContract() {     //Constructor que inicializa uma nova lista de erros
    errors = [];       
}

ValidationContract.prototype.isRequired = (value, message) => {     //O campo é obrigatório
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {    //O campo tem um tamanho mínimo
    if (!value || value.length < min)
        errors.push({ message: message });
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {   //O campo tem um tamanho máximo
    if (!value || value.length > max)
        errors.push({ message: message });
}

ValidationContract.prototype.isFixedLen = (value, len, message) => {    //O campo tem um tamanho fixo
    if (value.length != len)
        errors.push({ message: message });
}

ValidationContract.prototype.isEmail = (value, message) => {    //O campo é um email
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

ValidationContract.prototype.errors = () => {       //Retorna a lista de erros
    return errors; 
}

ValidationContract.prototype.clear = () => {    //Limpa a lista de erros
    errors = [];
}

ValidationContract.prototype.isValid = () => {      //Verifica se a lista de erros está vazia (para ver se é válido)
    return errors.length == 0;
}

module.exports = ValidationContract;    //Exporta o módulo