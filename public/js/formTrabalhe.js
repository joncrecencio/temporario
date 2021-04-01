function preencheCEP(){
    const cep = document.querySelector('#cep')
    const showData = (result) => {
        for(const campo in result){
            if(document.querySelector("#"+campo)){
                document.querySelector("#"+campo).value = result[campo]
            }
        }
    }

    cep.addEventListener('blur', (e) => {
        let search = cep.value.replace("-","")
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }

        fetch(`https://viacep.com.br/ws/${search}/json/`, options)
        .then((response) => {response.json()
            .then((data) => {showData(data)})
        })
        .catch((e) => {console.log('Deu erro ' + e.message)})  
    })

    cep.addEventListener('input', (e) => {
        e.target.value = mask.cep(e.target.value)
    }, false) 
}

const mask = {
    phone(value){
        return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1')
    },

    cep(value){
        return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
    },
}

preencheCEP()

const Form = {
    fullName: document.querySelector('#fullName'),
    cep: document.querySelector('#cep'),
    logradouro: document.querySelector('#logradouro'),
    numero: document.querySelector('#numero'),
    bairro: document.querySelector('#bairro'),
    localidade: document.querySelector('#localidade'),
    complemento: document.querySelector('#complemento'),

    getValues(){
        return {
            fullName: Form.fullName.value,
            cep: Form.cep.value,
            logradouro: Form.logradouro.value,
            numero: Form.numero.value,
            complemento:Form.complemento.value,
            bairro: Form.bairro.value,
            localidade: Form.localidade.value,
        }
    },

    validateFields(){
        const {fullName, cep, logradouro, numero,bairro, localidade} = Form.getValues()

        if( fullName.trim() === "" && cep.trim() === "" && logradouro.trim() === "" && numero.trim() === "" && bairro.trim() === "" && localidade.trim() === "" ){
            throw new Error("Por favor, preencha todos os campos!")
        }
    },
 
    clearFields(){
        Form.fullName.value = ""
        Form.cep.value = ""
        Form.logradouro.value = ""
        Form.numero.value = ""
        Form.bairro.value = ""
        Form.localidade.value = ""
        Form.complemento.value = ""
    },

    submit(event){
        event.preventDefault()

        try {
            // Verificar se todas as informações foram preenchidas
            Form.validateFields()
            // limpar o form
            Form.clearFields()
            swal({
                title : "Seu currículo foi enviado com sucesso! " , 
                text : "Boa sorte!" , 
                icon : "success" , 
                button : " Fechar " , 
            })
        } catch (error) {
            alert(error.message)
        } 
    }
}

