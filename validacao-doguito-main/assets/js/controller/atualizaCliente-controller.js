import { serviceCliente } from "../service/clienteService.js";

(async () =>{
    const url = new URL(window.location)
    const id = url.searchParams.get('id')
    
    const campoNome = document.querySelector('[data-nome]')
    const campoEmail = document.querySelector('[data-email]')
    try {
        const info = await serviceCliente.retornoClienteAlterar(id)
        campoNome.value = info.nome
        campoEmail.value = info.email
    } catch (error) {
        console.log(error)
        window.location.href = `../../telas/erro.html`
    }
    
    const formulario = document.querySelector('[data-form]')
    formulario.addEventListener('submit', async e => {
        e.preventDefault()
        try {
            await serviceCliente.infosDoClienteAlterada(id, campoNome.value, campoEmail.value)
            window.location.href = '../../telas/edicao_concluida.html'
        } catch (error) {
            console.log(error)
            window.location.href = `../../telas/erro.html`
        }
    })

})()
