const listaDeClientes = () => {
    //https://js-para-web-form.vercel.app/telas/
    //http://localhost:3000/

    return fetch('https://js-para-web-form.vercel.app/profile')
    .then( resposta => {
        if (resposta.ok) {
            return resposta.json()
        }
        throw new Error(`Não foi possivel encontrar a lista de Clientes. Favor voltar mais tarde`)
    })
}

const criarCliente = (nome, email) => {
    return fetch('https://js-para-web-form.vercel.app/profile', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/JSON'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    .then( resposta => {
        if (resposta.ok) {
            return resposta.body
        }
        throw new Error(`Não foi possivel criar um novo Cliente. Tente novemente em alguns minutos`)
    })
}

const deletaCliente = (id) => {
    return fetch(`https://js-para-web-form.vercel.app/profile/${id}`, {
        method: 'DELETE'
    }).then( resposta => {
        if (!resposta.ok) {
            throw new Error(`Não foi possivel remover o Cliente. Tente novamente mais tarde`)
        }
    })
}

const retornoClienteAlterar = (id) => {
    return fetch(`https://js-para-web-form.vercel.app/profile/${id}`)
    .then( resposta => {
        if (resposta.ok) {
            return resposta.json()
        }
        throw new Error(`Não foi possivel encontrar os Dados do Cliente. Tente novamente mais tarde`)
    })
}

const infosDoClienteAlterada = (id, nome, email) => {
    return fetch(`https://js-para-web-form.vercel.app/profile/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/JSON'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    .then( resposta => {
        if (resposta.ok) {
            return resposta.json()
        }
        throw new Error(`Não foi possivel alterar os dados do Cliente. Cliente não encontrado`)
    })
}

export const serviceCliente = {
    listaDeClientes,
    criarCliente,
    deletaCliente,
    retornoClienteAlterar,
    infosDoClienteAlterada
}
