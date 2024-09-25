const mongoose = require('mongoose');   // importa o módulo mongoose
const Product = mongoose.model('Product');  // importa o modelo Product criado no arquivo product.js

exports.get = async() => {     // busca os produtos  
    const res = await Product.find({     // busca os produtos
        active: true            // busca apenas os produtos ativos
    }, 'title price slug');    // retorna apenas o título, preço e slug
    return res;     // retorna os produtos
}

exports.getBySlug = async(slug) => {     // busca o produto pelo slug
    const res = await Product    // retorna o produto
        .findOne({    // busca o produto
            slug: slug,  // busca o produto pelo slug
            active: true    // busca apenas os produtos ativos
        }, 'title description price slug tags'); // retorna o título, descrição, preço, slug e tags
    return res;    // retorna o produto
}

exports.getById = async(id) => {     // busca o produto pelo id
    const res = await Product    // retorna o produto
        .findById(id);  // busca o produto pelo id
    return res;   // retorna o produto
}

exports.getByTag = async(tag) => {     // busca o produto pela tag
    const res = await Product
        .find({         // busca o produto
            tags: tag,   // busca o produto pela tag
            active:true     // busca apenas os produtos ativos
        },'title description price slug tags'); // retorna o título, descrição, preço, slug e tags  
    return res;     // retorna o produto
}

exports.create = async(data) => {
    var product = new Product(data);
    await product.save(); // salva o produto
}

exports.update = async(id, data) =>{
    await Product
        .findByIdAndUpdate(id, { // busca o produto pelo id e atualiza
            $set: { // define o que será atualizado
                title: data.title,  // atualiza o título do produto
                description: data.description,  // atualiza a descrição do produto
                price: data.price,  // atualiza o preço do produto
                slug: data.slug  // atualiza o slug do produto
            }
        });
}

exports.delete = async(id) => {
    await Product
    .findByIdAndDelete(id);      // busca o produto pelo id e remove   
}