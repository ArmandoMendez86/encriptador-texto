/* ################ VARIABLES ################ */

let existeImagen = false;

/* ################ FUNCIONES ################ */

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

function encriptar_desencriptar(codificar) {
  let mensaje = document.getElementById("texto").value;
  if (mensaje == "") return;
  document.querySelector(".mensaje").innerHTML = `
  <p id="mensajeCopiar">${codificar(mensaje)}</p>
  <button type="button" id="copiarTexto">Copiar</button>
 `;
  document.querySelector("#copiarTexto").addEventListener("click", function () {
    copiarTexto();
  });
}

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
function ponerAnimacion() {
  document.querySelector("#limpiarTexto").style.display = "block";
  document.querySelector(".encriptar").classList.add("animacion__escritura");
}

function resetarCampos() {
  document.querySelector("#texto").value = "";
  document.querySelector("#limpiarTexto").style.display = "none";
  document.querySelector(".encriptar").classList.remove("animacion__escritura");
}

function restaurarValores() {
  if (existeImagen === true) {
    resetarCampos();
    document.querySelector(".mensaje").innerHTML = ` 
    <img src="assets/img/muneco.svg"/>
    <h3>Ningún mensaje fue encontrado</h3>
    <p>Ingresa el texto que desees encriptar o desencriptar.</p>
    `;
  } else {
    resetarCampos();
    document.querySelector(".mensaje").innerHTML = ` 
    <img src="assets/img/muneco.svg" class="d-none"/>
    <h3>Ningún mensaje fue encontrado</h3>
    <p>Ingresa el texto que desees encriptar o desencriptar.</p>
    `;
  }
  existeImagen = false;
}

function verificarImagen() {
  let imagen = document.querySelector(".d-none");
  if (imagen.classList.contains("d-none")) {
    existeImagen = false;
  } else {
    existeImagen = true;
  }
}

/* ################ EVENTOS ################ */

//ENCRIPTAR
document
  .querySelector(".acciones_button--encriptar")
  .addEventListener("click", function () {
    verificarImagen();
    encriptar_desencriptar(encriptarTexto);
  });

//DESENCRIPTAR
document
  .querySelector(".acciones_button--desencriptar")
  .addEventListener("click", function () {
    verificarImagen();
    encriptar_desencriptar(desencriptarTexto);
  });

//ESCRIBIR TEXTO
document.querySelector("#texto").addEventListener("input", function () {
  if (this.value == "") {
    quitarAnimacion();
    restaurarValores();
  } else {
    ponerAnimacion();
  }
});

//LIMPIAR TEXTO
document.querySelector("#limpiarTexto").addEventListener("click", function () {
  restaurarValores();
});
