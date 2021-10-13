var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run(event) {
    event.preventDefault();

    var zipCode = zipCodeField.value

    zipCode = zipCode.replaceAll(' ', '')
    zipCode = zipCode.replaceAll('.', '')
    zipCode = zipCode.trim()

    axios
        .get('https://viacep.com.br/ws/' + zipCode + '/json/')
        .then(function(response) {
            if (response.data.erro) {
                throw new Error('Cep Inválido')
            }


            content.innerHTML = ''
            creatLine(response.data.logradouro)
            creatLine(response.data.localidade + "/" + response.data.uf)
            creatLine(response.data.cep)

        })
        .catch(function(error) {
            content.innerHTML = ''
            console.log(error)

            creatLine('Ops, algo deu errado')
        })
}

function creatLine(text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)

}