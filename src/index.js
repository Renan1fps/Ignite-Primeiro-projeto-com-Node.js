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

  const custumersAlreadyExists = customers.find(custumer => custumer.cpf === cpf)

  if(custumersAlreadyExists){
    console.log(custumersAlreadyExists)
    return response.status(400).json({message: "Custumer Already exists"})
  }

  customers.push({cpf, name, id})
  response.status(201).send()
})


app.listen(8000)
