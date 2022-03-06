const express = require("express")
const verifyToken = require("../verifyToken.js")


const route = express.Router()

route.use(verifyToken)

route.post("/get-player", (request, response) => {
  try {
    const { id } = request.body 

    console.log("id recebido: ", id)
  }
  catch(error) {
    console.log("Erro no servidor: ", error)
    return { status: false, error: error }
  }
})


module.exports = route