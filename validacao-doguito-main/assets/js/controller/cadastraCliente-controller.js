import { serviceCliente } from '../service/clienteService.js'

const formulario = document.querySelector('[data-form]')

formulario.addEventListener('submit', async e => {
    e.preventDefault()

    try {
        const nome = e.target.querySelector('[data-nome]').value
        const email = e.target.querySelector('[data-email]').value

        await serviceCliente.criarCliente(nome, email)
        window.location.href = '../../telas/cadastro_concluido.html'
    } catch (error) {
        console.log(error)
        window.location.href = '../../telas/erro.html'
    }
    
})
