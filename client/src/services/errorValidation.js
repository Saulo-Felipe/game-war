export default function errorValidation(data) {
  if (data.error) {
    console.error("ERRO FATAL NO SERVIDOR!")
    alert("Erro interno no servidor")
    return false
  }

  return true
}