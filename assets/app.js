/*=============================================
	                  VARIABLES
	=============================================*/

let existeImagen = false;

/*=============================================
	                  FUNCIONES
	=============================================*/

/*=============ENCRIPTAR=============*/
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

/*=============DESENCRIPTAR=============*/
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

/*=============SANITIZAR MENSAJE=============*/
function eliminarAcentosYmayusculas(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/*=============COPIAR TEXTO=============*/
function copiarTexto() {
  const inputText = document.getElementById("mensajeCopiar").innerText;
  navigator.clipboard
    .writeText(inputText)
    .then(() => {
      mostrarAlerta("Texto copiado!");
    })
    .catch((err) => {
      mostrarAlerta("Ocurrió un error: " + err);
    });
}

/*=============ENCRIPTAR O DESENCRIPTAR=============*/
function encriptar_desencriptar(codificar) {
  let mensaje = document.getElementById("texto").value;
  if (mensaje == "") return;
  let limpiarMensaje = eliminarAcentosYmayusculas(mensaje);
  document.querySelector(".mensaje").innerHTML = `
  <p id="mensajeCopiar">${codificar(limpiarMensaje)}</p>
  <button type="button" id="copiarTexto">Copiar</button>
 `;
  document.querySelector("#copiarTexto").addEventListener("click", function () {
    copiarTexto();
  });
}

/*=============ALERTA DE COPIADO=============*/
function mostrarAlerta(mensaje) {
  const alerta = document.querySelector(".alerta");
  alerta.innerHTML = `${mensaje}`;
  alerta.style.display = "block"; // Asegura que esté visible antes de animar
  alerta.classList.add("visible");
  setTimeout(() => {
    alerta.style.display = "none";
  }, 1500);
}

function quitarAnimacion() {
  document.querySelector("#limpiarTexto").style.display = "none";
  document.querySelector(".encriptar").classList.remove("animacion__escritura");
}

/*=============AGREGAR ANIMACIÓN=============*/
function ponerAnimacion() {
  document.querySelector("#limpiarTexto").style.display = "block";
  document.querySelector(".encriptar").classList.add("animacion__escritura");
}

/*=============RESETEAR=============*/
function resetarCampos() {
  document.querySelector("#texto").value = "";
  document.querySelector("#limpiarTexto").style.display = "none";
  document.querySelector(".encriptar").classList.remove("animacion__escritura");
}

/*=============RESTAURAR=============*/
function restaurarValores() {
  resetarCampos();
  document.querySelector(".mensaje").innerHTML = ` 
    <img src="assets/img/muneco.svg" class="d-none"/>
    <h3>Ningún mensaje fue encontrado</h3>
    <p>Ingresa el texto que desees encriptar o desencriptar.</p>
    `;
}

/*=============================================
	                  EVENTOS
	=============================================*/

/*=============ENCRIPTAR=============*/
document
  .querySelector(".acciones_button--encriptar")
  .addEventListener("click", function () {
    encriptar_desencriptar(encriptarTexto);
    document.querySelector(".mensaje").style.justifyContent = "space-between";
  });

/*=============DESENCRIPTAR=============*/
document
  .querySelector(".acciones_button--desencriptar")
  .addEventListener("click", function () {
    encriptar_desencriptar(desencriptarTexto);
    document.querySelector(".mensaje").style.justifyContent = "space-between";
  });

/*=============ESCRIBIR TEXTO=============*/
document.querySelector("#texto").addEventListener("input", function () {
  if (this.value == "") {
    quitarAnimacion();
    restaurarValores();
    document.querySelector(".mensaje").style.justifyContent = "center";
  } else {
    ponerAnimacion();
  }
});

/*=============LIMPIAR TEXTO=============*/
document.querySelector("#limpiarTexto").addEventListener("click", function () {
  restaurarValores();
  document.querySelector(".mensaje").style.justifyContent = "center";
});
