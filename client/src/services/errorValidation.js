export default function errorValidation(data) {
  console.log("[log] ", data)
  if (data.error) {
    console.error("ERRO FATAL NO SERVIDOR!")
    alert("Erro interno no servidor")
    return false
  }

  return true
}