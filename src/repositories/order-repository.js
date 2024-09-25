const mongoose = require('mongoose');   // importa o módulo mongoose
const { resolve } = require('path/posix');
const Order = mongoose.model('Order');  // importa o modelo Product criado no arquivo product.js

exports.get = async(data) => {
    var res = await Order
        .find({}, 'number status customer items')
        .populate('customer', 'name')
        .populate('items.product', 'title') ;
    return res;
}

exports.create = async(data) => {
    var order = new Order(data);    // cria um novo pedido
    await order.save(); // salvar o pedido
}