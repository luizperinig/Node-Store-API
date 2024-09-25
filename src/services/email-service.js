var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    try {
        await sendgrid.send({
            to: to,
            from: 'luiz.p.giacomin@gmail.com',
            subject: subject,
            html: body
        });
        console.log('Email enviado com sucesso');
    } catch (error) {
        console.error('Erro ao enviar email:', error);
    }
}