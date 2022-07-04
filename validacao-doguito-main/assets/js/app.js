import { validacao } from "./validacaoFormulario.js";

const inputs = document.querySelectorAll('input');

inputs.forEach( input => {
    if(input.dataset.tipo === 'preco') {
        SimpleMaskMoney.setMask(input, {
            prefix: 'R$ ',
            suffix: '',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'end'
        });
    }

    input.addEventListener('blur', function (evento){
        validacao(evento.target);
    });
});

