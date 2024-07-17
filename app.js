function encriptarTexto(mensaje) {
  let sanitizarMensaje = mensaje.trim();
  let textoEncriptado = sanitizarMensaje
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
  return textoEncriptado;
}

function desencriptarTexto(mensaje) {
  let sanitizarMensaje = mensaje.trim();
  let textoDesencriptado = sanitizarMensaje
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
  return textoDesencriptado;
}

function eliminarAcentosYmayusculas(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

document.querySelector("#encriptar").addEventListener("click", function () {
  let mensaje = document.getElementById("texto").value;
  mensaje = eliminarAcentosYmayusculas(mensaje);
  console.log(encriptarTexto(mensaje));
});
document.querySelector("#desencriptar").addEventListener("click", function () {
  let mensaje = document.getElementById("texto").value;
  mensaje = eliminarAcentosYmayusculas(mensaje);
  console.log(desencriptarTexto(mensaje));
});
