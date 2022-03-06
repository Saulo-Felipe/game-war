const express = require("express")
const sequelize = require("./database/connect.js")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.get("/", (request, response) => {
  response.send("<h1>Hello OK!</h1>")
})


router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body

    if (email.length === 0 || password.length === 0) 
      return response.json({ invalidEmail: "Houve um erro ao cadastrar usuário. Tente novamente." })

    const [result] = await sequelize.query(`
      SELECT * FROM player WHERE email = '${email}'
    `)

    if (result.length === 0)
      return response.json({ invalidEmail: "Esse email não percente a nenhum usuário." })
    
    console.log("user: ", result)
    bcrypt.compare(password, result[0].password, (error, success) => {
      if (success) {
        const token = jwt.sign({ userID: result[0].id }, "tokenIcarreavel", { expiresIn: "730d" })

        request.token_login = token

        return response.json({ success: true, token: token })

      } else {
        return response.json({ invalidEmail: "Senha incorreta" })
      }
    })
  
    return response.json({ recebido: "sucess" })
  }
  catch(error) {
    console.log("Erro no servidor: ", error)
    return { status: false, error: error }
  }
})

router.post("/register", async (request, response) => {
  try {
    const { user, email, password } = request.body

    if (user.length == 0 || email.length == 0 || password.length == 0) 
      return response.json({ isRegistered: true, msg: "Houve um erro ao cadastrar usuário. Tente novamente." })

    const [result] = await sequelize.query(`
      SELECT * FROM player WHERE email = '${email}'
    `)

    if (result.length > 0)
      return response.json({ isRegistered: true, msg: "Este email está sendo usado por outra conta." })

    bcrypt.hash(password, 10, async (error, hash) => {
      if (error) return response.json({ isRegistered: true, msg: "Houve um erro ao cadastrar usuário. Tente novamente." })

      await sequelize.query(`
        INSERT INTO player (name, level, email, password)
        VALUES ('${user}', 1, '${email}', '${hash}')
      `)
    })


    return response.json({ success: true })
  }
  catch(error) {
    console.log("Erro no servidor: ", error)
    return { status: false, error: error }
  }
})

module.exports = router