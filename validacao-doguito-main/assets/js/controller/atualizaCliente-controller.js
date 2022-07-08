import { serviceCliente } from "../service/clienteService.js";

const url = new URL(window.location)
console.log(url)
const id = url.searchParams.get('id')

const campoNome = document.querySelector('[data-nome]')
const campoEmail = document.querySelector('[data-email]')
serviceCliente.retornoClienteAlterar(id)
.then( info => {
    campoNome.value = info.nome
    campoEmail.value = info.email
})

const formulario = document.querySelector('[data-form]')
formulario.addEventListener('submit', e => {
    e.preventDefault()
    serviceCliente.infosDoClienteAlterada(id, campoNome.value, campoEmail.value)
    .then(() => {
        window.location.href = '../../telas/edicao_concluida.html'
    })
})