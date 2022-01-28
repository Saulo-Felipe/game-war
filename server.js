const express = require("express")
const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname, "src")))

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "src", "index.html"))
})

app.listen(8081, (error) => {
  if (error) return console.log("Erro: ", error)

  console.log("Server is running!")
})