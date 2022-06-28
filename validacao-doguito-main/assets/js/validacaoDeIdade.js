export function validacao(input) {
    const dataTipoDoInput = input.dataset.tipo;

    if(validadores[dataTipoDoInput]){
        validadores[dataTipoDoInput](input)
    }
}

const validadores = {
    dataNascimento: input => validacaoDataDoNascimento(input)
}

function validacaoDataDoNascimento(input) {
    const dataRecebida = new Date(input.value);
    
    let mensagem = '';
    
    if(!maiorDe18(dataRecebida)){
        mensagem = 'Para efetuar o Cadastro você precisa ser maior de 18 anos';
    }

    input.setCustomValidity(mensagem);
}

function maiorDe18(data) {
    const dataAtual = new Date();
    const dataMaiorQue18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

   return dataMaiorQue18 <= dataAtual;
}

