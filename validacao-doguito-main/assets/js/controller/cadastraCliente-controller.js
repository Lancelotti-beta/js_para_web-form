import { serviceCliente } from '../service/clienteService.js'

const formulario = document.querySelector('[data-form]')

formulario.addEventListener('submit', e => {
    e.preventDefault()

    const nome = e.target.querySelector('[data-nome]').value
    const email = e.target.querySelector('[data-email]').value

    serviceCliente.criarCliente(nome, email)
    .then(
        window.location.href = '../../telas/cadastro_concluido.html'
    )
})
