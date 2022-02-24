export default function clientErrorLogs(error) {
  alert("Erro no sistema. A página será recarregada por motivos de segurança.")
  console.error("Erro no client side: ", error)

  window.location.reload()
}