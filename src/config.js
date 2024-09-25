global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá,<strong>{0}</strong>, seja bem-vindo à Node Store!'; // define o template do email de boas-vindas

module.exports = {
    connectionString: 'mongodb+srv://luiz:luiz@node-store.lkzrl.mongodb.net/?retryWrites=true&w=majority&appName=node-store',
    sendgridKey: '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', //usar para enviar email
    containerConnectionString: 'TBD' //usar para armazenar imagens
}