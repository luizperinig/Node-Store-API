const express = require('express'); // importa o express
const router = express.Router();    // cria um objeto de roteamento

const route = router.get('/', (req, res, next) =>{  // cria uma rota 
    res.status(200).send({      // envia uma resposta com status 200 (OK)
        title: "Node Store API",    
        version: "0.0.1"    
    }); 
}); 

module.exports = router;   // exporta o roteador