import { serviceCliente } from "../service/clienteService.js"

const adionaClienteNaLista = ({ nome, email, id }) => {
    const elementoTr = document.createElement('tr')
    const elementoCliente = `
        <td class="td" data-td>${nome}</td>
            <td>${email}</td>
            <td>
             <ul class="tabela__botoes-controle">
                 <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                 <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
        </td>
    `
    elementoTr.innerHTML = elementoCliente
    elementoTr.dataset.id = id

    return elementoTr
}


const corpoDaTabela = document.querySelector('[data-tabela]')
corpoDaTabela.addEventListener('click' , async e => {
    const botaoDeletar = e.target.className === 'botao-simples botao-simples--excluir'
    if(botaoDeletar){
        try {
            const cliente = e.target.closest('[data-id]')
            const id = cliente.dataset.id
            await serviceCliente.deletaCliente(id)
            cliente.remove()
        } catch (error) {
            console.log(error)
            Window.location.href = '../../telas/erro.html'
        }

    }
})

const renderizando = async () => {

    try {
        const cliente = await serviceCliente.listaDeClientes()
        cliente.forEach(elemento => {
            corpoDaTabela.appendChild(adionaClienteNaLista(elemento))
        })
    } catch (error) {
        console.log(error)
        window.location.href = `../../telas/erro.html`
    }
}
renderizando()
