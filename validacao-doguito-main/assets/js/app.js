import { validacao } from "./validacaoDeIdade.js";

const inputs = document.querySelectorAll('input');

inputs.forEach( input => {

    input.addEventListener('blur', function (evento){
        validacao(evento.target);
    });
});

