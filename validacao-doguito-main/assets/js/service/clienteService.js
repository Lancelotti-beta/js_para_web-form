const adionaClienteNaLista = (nome, email) => {

    const elementoTr = document.createElement('tr')
    const elementoCliente = `
        <td class="td" data-td>${nome}</td>
            <td>${email}</td>
            <td>
             <ul class="tabela__botoes-controle">
                 <li><a href="../telas/edita_cliente.html" class="botao-simples botao-simples--editar">Editar</a></li>
                 <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
        </td>
    `
    elementoTr.innerHTML = elementoCliente

    return elementoTr
}

const corpoDaTabela = document.querySelector('[data-tabela]')

const listaDeClientes = () => {
    const promise = new Promise((resolve, reject) => {
        const http = new XMLHttpRequest()
        http.open('GET', 'http://localhost:3000/profile')

        http.onload = () => {
            if (http.status >= 400) {
                reject(JSON.parse(http.response)) 
            } else {
                resolve(JSON.parse(http.response))
            }
        }
        
        http.send()
    })
    console.log(promise)
    return promise
}

listaDeClientes()
.then( resposta => {
    resposta.forEach(elemento => {
        corpoDaTabela.appendChild(adionaClienteNaLista(elemento.nome, elemento.email))
    })
})
