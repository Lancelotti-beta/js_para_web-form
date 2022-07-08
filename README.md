# JavaScript na web - form

Projeto da @Alura para aprender a manipular dados em um formulario, desenvolvendo uma validação de Cadastro para a empresa ficticia Doguinho PetShop

#### Iniciando o projeto no windows
 ---------
 Para iniciar projeto tenha o `node.js` e instale o `browser-sync`

 inicie o Json sever com o comando: 
 > npx json-server --watch db.json

 em seguida inicie o Browser Sync:
 > browser-sync start --server --file . --host --port 5000 --startPath telas/lista_cliente.html 

## Validação de fomulario - Parte I

 ### No HTML
 - Usando `atributos` HTML para a validação no formuario de cadastro de cliente e produtos
 - Utilizando `Pattern` no HTML para validar Senha e Cep | `Regex` 
 - Usando `data attribute` para trabalhar com `JS` 
 
 ### Com JavaScript
 - Mandar uma mensagem customizada de erro 
 - Como customizar as mensagens de erro
 - Recursão de `function`
 - Fazer requisição para API | ViaCEP
 - Adicionar máscara monetária para o campo de preço


## CRUD com JavaScript assícrono - Parte II

 ### Js Assíncrono 
 - Fazer requisições utilizando `XMLHttpRequest()` | Buscar clientes em um servidor
 - Utilizar template `literals` para criar um template html
 - Lidar com `promises` & Refatorar o código para diminuir a complexidade com `fetch`

 | `promises` |
 | --- |  
```
    const promise = new Promise((resolve, reject) => {     
        const http = new XMLHttpRequest()                 
        http.open('GET', 'Url::/localhost/profile')
        http.onload = () => {                            
            if (http.status >= 400) {                     
                reject(JSON.parse(http.response))           
            } else {                                     
                resolve(JSON.parse(http.response))        
            }                                            
        }                                                
        http.send()                                      
    })                                                   
    return promise                                       
```
 | `fetch` |
 | --- |

```
    return fetch('Url::/localhost/profile')
    .then( resposta => {
        return resposta.json()
    })
```

