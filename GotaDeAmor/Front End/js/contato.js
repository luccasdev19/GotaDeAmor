// Back-end vai ser realizado aqui  // 

const form = document.elementFromPoint(0, 0).closest('form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
});

const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const mensagemInput = document.getElementById('mensagem');

