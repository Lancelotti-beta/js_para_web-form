export function validacao(input) {
    const dataTipoDoInput = input.dataset.tipo;

    if(validadores[dataTipoDoInput]){
        validadores[dataTipoDoInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(dataTipoDoInput, input);
    }
}

const vadidaErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'CustomError'
];

const mensagemDeErro = {
    nome: {
        valueMissing: `O campo nome não pode estar vazio.`
    },
    email: {
        valueMissing: `O campo de email não pode estar vazio.`,
        typeMismatch: `O email digitado não é valído.`
    },
    senha: {
        valueMissing: `O campo senha não pode estar vazio.`,
        patternMismatch: `A senha deve conter de 6 à 12 caracteres com letras maiúscula e minúscula, pelo menos um numeros e não pode conter caracteres especias como @,#& ou semelhante`
    },
    dataNascimento: {
        valueMissing: `O campo data de aniversário não pode estar vazio.`,
        CustomError: `Para efetuar o Cadastro você precisa ser maior de 18 anos`
    },
    cpf: {
        valueMissing: `O campo de CPF não pode estar vazio.`,
        CustomError: `O CPF digitado não é Válido!`
    }
};

function mostraMensagemDeErro(tipoInput, input) {
    let mensagem = '';

    vadidaErro.forEach( error => {
        if(input.validity[error]){
            mensagem = mensagemDeErro[tipoInput][error];
        }
    });

    return mensagem;
}

//Validação da Data de Nascimento 

const validadores = {
    dataNascimento: input => validacaoDataDoNascimento(input),
    cpf: input => validandoCPF(input)
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

//Validação do CPF
function validandoCPF(input) {
    const cpfFromatado = input.value.replace(/\D/g, ''); 
    let mensagem = '';

    input.setCustomValidity(mensagem);

    if(!verificaRepeticaoDeCPF(cpfFromatado)) {
        mensagem = 'O CPF digitado não é Válido!'
    }
}

function verificaRepeticaoDeCPF(cpf) {
    const cpfInvalido = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    let cpfValido = true;

    cpfInvalido.forEach( valor => {
        if(valor == cpf){
            cpfValido = false;
        }
    })

    return cpfValido;
}

function checaEstruturaDoCPF(cpf) {
    const multiplicador = 10;

    return checarDigitoVerificador(cpf, multiplicador);
}

//function 

function confirmaDigito(soma) {
    return 11 - (soma % 11);
}

