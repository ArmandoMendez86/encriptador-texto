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

function restaurarValores() {
  document.querySelector("#texto").value = "";
  document.querySelector("#limpiarTexto").style.display = "none";
  document.querySelector(".encriptar").classList.remove("animacion__escritura");
  document.querySelector(
    ".mensaje"
  ).innerHTML = ` <h3>Ningún mensaje fue encontrado</h3>
  <p>Ingresa el texto que desees encriptar o desencriptar.</p>`;
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

// Define la media query
const mediaQuery = window.matchMedia("(max-width: 1440px)");

// Define la función de callback
function handleMediaQueryChange(event) {
  if (event.matches) {
    // La ventana tiene un ancho máximo de 992px
    document.querySelector(".muneco").style.display = "none";
  } else {
    // La ventana tiene un ancho mayor a 992px
    document.querySelector(".muneco").style.display = "block";
  }
}

// Registra el listener para el evento de cambio
mediaQuery.addEventListener("change", handleMediaQueryChange);


/* ################ EVENTOS ################ */

//Encriptar
document
  .querySelector(".acciones_button--encriptar")
  .addEventListener("click", function () {
    encriptar_desencriptar(encriptarTexto);
  });

//Desencriptar
document
  .querySelector(".acciones_button--desencriptar")
  .addEventListener("click", function () {
    encriptar_desencriptar(desencriptarTexto);
  });

//Escribir en caja texto
document.querySelector("#texto").addEventListener("input", function () {
  if (this.value == "") {
    document.querySelector("#limpiarTexto").style.display = "none";
    document
      .querySelector(".encriptar")
      .classList.remove("animacion__escritura");
  } else {
    document.querySelector("#limpiarTexto").style.display = "block";
    document.querySelector(".encriptar").classList.add("animacion__escritura");
  }
});

//Limpiar caja texto
document.querySelector("#limpiarTexto").addEventListener("click", function () {
  restaurarValores();
});
