const express = require('express')
const { v4:uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

const customers = []

app.post('/account', (request, response)=>{
  const { cpf, name } = request.body
  if( cpf=== null ){
    response.status(400).send()
  }
  const id = uuidv4()

  const customersAlreadyExists = customers.some(customer => customer.cpf === cpf)
  //some retorna true ou false, diferente do find que retorna o objeto

  if(customersAlreadyExists){
    console.log(customersAlreadyExists)
    return response.status(400).json({message: "Custumer Already exists"})
  }

  customers.push({cpf, name, id, statement: []})
  response.status(201).send()
})

app.get('/statement/:cpf', (request, response)=>{
  const { cpf } = request.params

  const customer = customers.find(customer => customer.cpf === cpf)

  if(!customer){
    return response.status(400).json({message: "Cpf not found"})
  }
  return response.json(customer.statement)
})


app.listen(8000)
