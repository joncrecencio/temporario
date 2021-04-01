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

const Form = {
    fullName: document.querySelector('#fullName'),
    vaga: document.querySelector('#vaga'),
    cep: document.querySelector('#cep'),
    logradouro: document.querySelector('#logradouro'),
    numero: document.querySelector('#numero'),
    bairro: document.querySelector('#bairro'),
    localidade: document.querySelector('#localidade'),
    complement: document.querySelector('#complement'),
    escolaridade: document.querySelector('#escolaridade'),
    idiomas: document.querySelector('#idiomas'),
    nivel: document.querySelector('#nivel'),
    positivo: document.querySelector('#positivo'),
    negativo: document.querySelector('#negativo'),
    cursos_extras: document.querySelector('#cursos_extras'),
    descricao_curso: document.querySelector('#descricao_curso'),
    empresaName: document.querySelector('#empresaName'),
    dataInicio: document.querySelector('#dataInicio'),
    dataFim: document.querySelector('#dataFim'),
    dataFimAtual: document.querySelector('#dataFimAtual'),
    descrevaXP: document.querySelector('#descrevaXP'),



    getValues(){
        return {
            fullName: Form.fullName.value,
            vaga: Form.vaga.value,
            cep: Form.cep.value,
            logradouro: Form.logradouro.value,
            numero: Form.numero.value,
            complement:Form.complement.value,
            bairro: Form.bairro.value,
            localidade: Form.localidade.value,
            escolaridade: Form.escolaridade.value,
            idiomas: Form.idiomas.value,
            nivel: Form.nivel.value,
            positivo: Form.positivo.value,
            negativo: Form.negativo.value,
            cursos_extras: Form.cursos_extras.value,
            descricao_curso: Form.descricao_curso.value,
            empresaName: Form.empresaName.value,
            dataInicio: Form.dataInicio.value,
            dataFim: Form.dataFim.value,
            dataFimAtual: Form.dataFimAtual.value,
            descrevaXP: Form.descrevaXP.value,
        }
    },

    validateFields(){
        const {fullName, vaga, cep, logradouro, numero,bairro, localidade} = Form.getValues()

        if( fullName.trim() === "" && vaga.trim() === "" && cep.trim() === "" && logradouro.trim() === "" && numero.trim() === "" && bairro.trim() === "" && localidade.trim() === "" ){
            throw new Error("Por favor, preencha todos os campos!")
        }
    },
 
    clearFields(){
        Form.fullName.value = ""
        Form.vaga.value = ""
        Form.cep.value = ""
        Form.logradouro.value = ""
        Form.numero.value = ""
        Form.bairro.value = ""
        Form.localidade.value = ""
        Form.complement.value = ""
        Form.bairro.value = ""
        Form.localidade.value = ""
        Form.escolaridade.value = ""
        Form.idiomas.value = ""
        Form.nivel.value = ""
        Form.positivo.value = ""
        Form.negativo.value = ""
        Form.cursos_extras.value = ""
        Form.descricao_curso.value = ""
        Form.empresaName.value = ""
        Form.dataInicio.value = ""
        Form.dataFim.value = ""
        Form.dataFimAtual.value = ""
        Form.descrevaXP.value = ""
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

function capturaRadioAndCheckbox(){
    document.querySelector('#positivo').addEventListener('change', pegaValorRadioCheck)
    document.querySelector('#negativo').addEventListener('change', pegaValorRadioCheck)
    document.querySelector('#dataFimAtual').addEventListener('change', pegaValorRadioCheck)
    document.querySelector('#dataFim').addEventListener('change', pegaValorRadioCheck)

}

function pegaValorRadioCheck(){
    const positivo = document.querySelector("#positivo").checked
    const negativo = document.querySelector("#negativo").checked
    const dataFimAtual = document.querySelector("#dataFimAtual").checked
    const dataFim = document.querySelector("#dataFim")
    const extraCurriculares = document.querySelector('.extraCurriculares')


    if(positivo){
        extraCurriculares.classList.remove('oculto')
    }

    if(negativo){
        extraCurriculares.classList.add('oculto')
    }   
        
    dataFimAtual ? dataFim.setAttribute('disabled', false) : dataFim.removeAttribute('disabled') 
}

function appear(){
    const liberaEscolaridade = document.querySelector('#liberaEscolaridade')
    const escolaridadeXP = document.querySelector('.escolaridadeXP')
    const liberaExperiencia = document.querySelector('#liberaExperiencia')
    const experiencia = document.querySelector('.experiencia')
    
    liberaEscolaridade.addEventListener('click', () =>{
        if(escolaridadeXP.classList.contains('escolaridadeOculta')){
            escolaridadeXP.classList.remove('escolaridadeOculta')
            liberaEscolaridade.classList.add('oculto')
        }
    })

    liberaExperiencia.addEventListener('click', () =>{
        if(experiencia.classList.contains('XPOculta')){
            experiencia.classList.remove('XPOculta')
            liberaExperiencia.classList.add('oculto')
        }
    })
}

preencheCEP()
appear()
capturaRadioAndCheckbox()




