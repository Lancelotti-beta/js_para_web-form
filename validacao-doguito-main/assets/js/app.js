import { validacao } from "./validacaoDeIdade.js";

const inputs = document.querySelectorAll('input');

inputs.addEventListener('blur', function (evento){
    validacao(evento.target);
});

