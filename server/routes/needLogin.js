const express = require("express")
const verifyToken = require("../verifyToken.js")
const jwt = require("jsonwebtoken")
const sequelize = require("../database/connect.js")


const route = express.Router()

route.use(verifyToken)

route.post("/get-player", (request, response) => {
  try {

    const { token } = request.body

    if (token !== null && token.length !== 0 && typeof token !== 'undefined') {

      jwt.verify(token, process.env.SECRETE_TOKEN, async (err, decoded) => {
        if (err) {
          return response.json({ success: false, msg: "Token inválido ou não informado." })
          
        } else {
          const [user] = await sequelize.query(`
            SELECT name, email, level
            FROM player
            WHERE id = ${ decoded.userID }
          `)

          return response.json({ success: true, user: user[0] })
        }
      })

    } else {
      console.log("Token inválido ou não informado.")
      return response.json({ success: false, msg: "Token inválido ou não informado." })
    }

  }
  catch(error) {
    console.log("Erro no servidor: ", error)
    return { status: false, error: error }
  }
})


module.exports = route