const express = require("express")
const sequelize = require("../database/connect.js")
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
      return response.json({ success: false, msg: "Houve um erro ao tentar logar usuário. Tente novamente." })

    const [user] = await sequelize.query(`
      SELECT * FROM player WHERE email = '${email}'
    `)

    if (user.length === 0)
      return response.json({ success: false, msg: "Esse email não percente a nenhum usuário." })

    bcrypt.compare(password, user[0].password, (error, success) => {
      if (error) return response.json({ success: false, msg: "Houve um erro ao tentar logar usuário. Tente novamente." })

      else if (success) {
        const token = jwt.sign({ userID: user[0].id }, process.env.SECRETE_TOKEN, { expiresIn: "730d" })
        
        request.token_login = token

        return response.json({ success: true, token: token, userID: user[0].id })
        
      } else {
        return response.json({ success: false, msg: "Senha incorreta" })
      }
    })  
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


// router.post("/")

module.exports = router