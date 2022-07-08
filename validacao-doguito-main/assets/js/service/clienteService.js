const listaDeClientes = () => {
    return fetch('http://localhost:3000/profile')
    .then( resposta => {
        return resposta.json()
    })
}

const criarCliente = (nome, email) => {
    return fetch('http://localhost:3000/profile', {
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
        return resposta.body
    })
}

const deletaCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE'
    })
}

export const serviceCliente = {
    listaDeClientes,
    criarCliente,
    deletaCliente
}
