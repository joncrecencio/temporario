const express = require('express')
const cors = require('cors')
const nunjucks = require('nunjucks')
const app = express()

app.use(cors())

app.use(express.static('public'))
app.set('view engine', 'njk')
nunjucks.configure("views", {
    express: app,
    autoescape:false,
    noCache: true
})


app.get("/", (req, res) => {
    return res.render('index.html')
})

app.get("/sobre", (req, res) => {
    return res.render('localizacao.html')
})

app.get("/especialidades", (req, res) => {
    return res.render('especialidade.html')
})

app.get("/mater", (req, res) => {
    return res.render('planomater.html')
})

app.get("/trabalhe-conosco", (req, res) => {
    return res.render('trabalhe-conosco.html')
})


app.listen(3000, () => {
    console.log("ok, rodando")
})