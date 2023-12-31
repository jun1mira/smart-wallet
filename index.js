const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const path = require('path')
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({ extended:false}))
app.set('view engine', 'handlebars')
app.engine('handlebars', engine(''))


app.use('/css', express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname,'node_modules/jquery/dist')))
app.use('/public', express.static(path.join(__dirname,'public')))

const fakedata = [
  {
      id: 1,
      alimentacao: 'R$ 0,00',
      transporte: 'R$ 0,00',
      compras: 'R$ 0,00',
      estacionamento: 'R$ 0,00',
      combustivel: 'R$ 0,00',
      saude: 'R$ 0,00',
      entretenimento: 'R$ 0,00'
  },
  {
    id: 2,
    alimentacao: 'R$ 0,00',
    transporte: 'R$ 0,00',
    compras: 'R$ 0,00',
    estacionamento: 'R$ 0,00',
    combustivel: 'R$ 0,00',
    saude: 'R$ 0,00',
    entretenimento: 'R$ 0,00'
  }
]



app.get('/',function(req,res){
    res.render('index')
})

app.get('/clientes',function(req,res){
  res.render('cliente/cliente', 
      {listaclientes: fakedata})
})

app.get('/clientes/novo', function(req,res){
  res.render('cliente/formcliente')
})

app.post('/clientes/save', function(req,res){
  
  //procurar pelo cliente no fakedata
  let clienteantigo = 
      fakedata.find(o => o.id == req.body.id)

  if(clienteantigo != undefined){
    clienteantigo.alimentacao = req.body.alimentacao
    clienteantigo.transporte = req.body.transporte
    clienteantigo.compras = req.body.compras
    clienteantigo.estacionamento = req.body.estacionamento
    clienteantigo.combustivel = req.body.combustivel,
    clienteantigo.saude = req.body.saude,
    clienteantigo.entretenimento = req.body.entretenimento
  }else{
    let maiorId = Math.max(...fakedata.map(o => o.id))
    let novoCliente = {
      id: maiorId + 1,
      alimentacao: req.body.alimentacao,
      transporte: req.body.transporte,
      compras: req.body.compras,
      estacionamento: req.body.estacionamento,
      combustivel: req.body.combustivel,
      saude: req.body.saude,
      entretenimento: req.body.entretenimento
    }
    fakedata.push(novoCliente)
  }
  res.redirect('/clientes')
})

app.get('/clientes/alterar/:id', function(req,res){
  let id = req.params['id']
  
  //Procura um cliente pelo id
  let umcliente = fakedata.find(o => o.id == id)
  
  res.render('cliente/formcliente', {cliente: umcliente})
})

app.get('/clientes/delete/:id', function(req,res){
  //buscando o cliente pelo id
  let cliente = fakedata.find(o => o.id == req.params['id'])
  //qual a posição (ORDEM) do cliente na lista
  let posicaocliente = fakedata.indexOf(cliente)
  if (posicaocliente > -1){ //achou a posicao do cliente
    fakedata.splice(posicaocliente,1) //remove o cliente da lista
  }
  res.redirect('/clientes')
})


app.listen(80,()=>{
  console.log('Servidor rodando...')  
  console.log('http://localhost/')
})