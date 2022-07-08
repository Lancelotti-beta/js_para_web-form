import { serviceCliente } from "../service/clienteService.js"

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

serviceCliente.listaDeClientes()
.then( resposta => {
    resposta.forEach(elemento => {
        corpoDaTabela.appendChild(adionaClienteNaLista(elemento.nome, elemento.email))
    })
})

