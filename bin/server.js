const app = require('../src/app')
const http = require('http');    // importa o módulo http
const debug = require('debug')('nodestr:server') ;   // importa o módulo debug

const port = normalizePort(process.env.PORT || '3000'); // process.env.PORT -> env = environment (variável de ambiente) // || '3000' -> se não encontrar a variável de ambiente, utiliza a porta 3000
app.set('port', port);

const server = http.createServer(app);    // cria o servidor

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

function normalizePort(val) {
    const port = parseInt(val, 10); //parseInt converte a string para inteiro na base 10 (decimal)
    
    if (isNaN(port)) { // isNaN verifica se o valor não é um número
        return val; // retorna o valor original
    }

    if (port >= 0) {    // verifica se o valor é maior ou igual a 0
        return port;    // retorna o valor
    }

    return false;   
}

function onError(error) {
    if (error.syscall !== 'listen') {   
        throw error;    
    }

    const bind = typeof port === 'string'?  // verifica se o tipo da variável port é string
        'Pipe ' + port :    // se for string, retorna 'Pipe ' + port
        'Port ' + port;    // se não for string, retorna 'Port ' + port

    switch (error.code) {
        case 'EACCES':  // EACCES -> erro de permissão
            console.error(bind + ' requires elevated privileges');  
            process.exit(1); // finaliza a aplicação
            break;
        case 'EADDRINUSE':  // EADDRINUSE -> erro de endereço em uso
            console.error(bind + ' is already in use');
            process.exit(1); // finaliza a aplicação
            break;
        default:
            throw error;    // lança o erro
    }
}

function onListening() {
    const addr = server.address(); // pega o endereço do servidor (localhost) e a porta que está rodando a aplicação (3000) 
    const bind = typeof addr === 'string'?
        'pipe ' + addr:
        'port ' + addr.port;
    debug('Listeninh on ' + bind);
}