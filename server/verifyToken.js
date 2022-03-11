const jwt = require("jsonwebtoken")

const verifyToken = (request, response, next) => {
  const token = request.headers.authorization

  if (token && typeof token !== 'undefined' && token !== null && token.length !== 0) {
    jwt.verify(token, process.env.SECRETE_TOKEN, (err, decoded) => {

      if (err) return response.json({ token_isValid: false })
      else {
        next()
      }

    })
  } else {
    return response.json({ token_isValid: false })
  }
}


module.exports = verifyToken