export function validacao(input) {
    const dataTipoDoInput = input.dataset.tipo;

    if (validadores[dataTipoDoInput]) {
        validadores[dataTipoDoInput](input);
    }

    if (input.validity.valid) {
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
    'customError'
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
        customError: `Para efetuar o Cadastro você precisa ser maior de 18 anos`
    },
    cpf: {
        valueMissing: `O campo de CPF não pode estar vazio.`,
        customError: `O CPF digitado não é Válido!`
    },
    cep: {
        valueMissing: `O campo de CEP não pode estar vazio.`,
        patternMismatch: `O CEP digitado não é válido!`,
        customError: `Não foi possivel fazer a Busca do CEP informado`
    },
    logradouro: {
        valueMissing: `O campo de logradouro não pode estar vazio.`
    },
    cidade: {
        valueMissing: `O campo de cidade não pode estar vazio.`
    },
    estado: {
        valueMissing: `O campo de estado não pode estar vazio.`
    },
    preco: {
        valueMissing: `O campo de Preço não pode estar Vazio!`
    }
};

function mostraMensagemDeErro(tipoInput, input) {
    let mensagem = '';

    vadidaErro.forEach(error => {
        if (input.validity[error]) {
            mensagem = mensagemDeErro[tipoInput][error];
        }
    });

    return mensagem;
}

//Validações 

const validadores = {
    dataNascimento: input => validacaoDataDoNascimento(input),
    cpf: input => validandoCPF(input),
    cep: input => recuperarCEP(input)
}

function validacaoDataDoNascimento(input) {
    const dataRecebida = new Date(input.value);

    let mensagem = '';

    if (!maiorDe18(dataRecebida)) {
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

    if (!verificaRepeticaoDeCPF(cpfFromatado) || !checaEstruturaDoCPF(cpfFromatado)) {
        mensagem = 'O CPF digitado não é Válido!';
    }

    input.setCustomValidity(mensagem);
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

    cpfInvalido.forEach(valor => {
        if (valor == cpf) {
            cpfValido = false;
        }
    });

    return cpfValido;
}

function checaEstruturaDoCPF(cpf) {
    const multiplicador = 10;

    return checarDigitoVerificador(cpf, multiplicador);
}

function checarDigitoVerificador(cpf, multiplicador) {
    if (multiplicador >= 12) {
        return true;
    }

    let multiplicadorInicial = multiplicador;
    let soma = 0;

    const cpfSemDigito = cpf.substr(0, multiplicador - 1).split('');
    const digitoVerificado = cpf.charAt(multiplicador - 1);

    for (let cont = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
        soma = soma + cpfSemDigito[cont] * multiplicadorInicial;
        cont++;
    }

    if (digitoVerificado == confirmaDigito(soma)) {
        return checarDigitoVerificador(cpf, multiplicador + 1);
    }

    return false;
}

function confirmaDigito(soma) {
    return 11 - (soma % 11);
}

//CEP - API
function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const opcoes = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    };

    if ((!input.validity.patternMismatch) && (!input.validity.valueMissing)) {
        fetch(url, opcoes).then(
            response => response.json()
        ).then(
            data => {
                if (data.erro) {
                    input.setCustomValidity('Não foi possivel fazer a Busca do CEP informado');
                    return;
                }
                input.setCustomValidity('');
                preencheCamposDoEndereco(data);
                return;
            }
        );
    }
}

function preencheCamposDoEndereco(data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]');
    const cidade = document.querySelector('[data-tipo="cidade"]');
    const estado = document.querySelector('[data-tipo="estado"]');

    logradouro.value = data.logradouro;
    cidade.value = data.localidade;
    estado.value = data.uf;
}

