// Variables de botones y elementos del DOM

const linkEstilo = document.getElementById("estilo");
const selectorEstilos = document.getElementById("select-estilo");
const radioEstilos = document.querySelectorAll("input[name='estilo-radio']");
const botonRecordar = document.getElementById("fijar-estilo");
const botonSiguiente = document.getElementById("siguiente-estilo");

// Variable para rastrear si el modo "Recordar" está activo

let recordarActivo = false;

function removerEstiloGuardado() {
    // En caso de cambiar el estilo, se quita de la memoria
    if (recordarActivo) {
        // Elimina el estilo guardado de localStorage
        localStorage.removeItem("estiloGuardado");
        botonRecordar.classList.remove("hundido"); // Quita el estilo "hundido"
    }
}

// estilos disponibles

const estilos = ["./css/estilos.css", "./css/estilos-retro.css", "./css/estilos-futuro.css", ""];

//Indice actual

let indiceActual = 0;

// Función para cambiar el estilo según el botón "siguiente"

function cambiarSiguienteEstilo() {
    if (indiceActual < (estilos.length - 1)) {
        // Aplica el siguiente estilo
        linkEstilo.setAttribute("href", `${estilos[indiceActual + 1]}`);
        indiceActual++;

    } else {
        // Reinicia el ciclo
        linkEstilo.setAttribute("href", `${estilos[0]}`); // Estilo inicial
        indiceActual = 0; // Reinicia el índice
    }
    removerEstiloGuardado(); //Quita estilo de la memoria
}

botonSiguiente.addEventListener("click", cambiarSiguienteEstilo);

// Función para cambiar el estilo de forma aleatoria
function cambiarEstiloAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * estilos.length);
    const estiloAleatorio = estilos[indiceAleatorio];
    indiceActual = indiceAleatorio;

    linkEstilo.setAttribute("href", `${estiloAleatorio}`);

    removerEstiloGuardado(); //Quita estilo de la memoria
}

document.getElementById("estilo-random").addEventListener("click", cambiarEstiloAleatorio);

// Función para cambiar el estilo según el select
function cambiarEstiloSelect() {
    const indiceSelect = parseInt(selectorEstilos.value);
    linkEstilo.setAttribute("href", `${estilos[indiceSelect]}`);
    indiceActual = indiceSelect;

    removerEstiloGuardado(); //Quita estilo de la memoria
}

selectorEstilos.addEventListener("change", cambiarEstiloSelect);

//Función para cambiar el estilo según el input radio
function cambiarEstiloRadio() {
    const indiceRadio = parseInt(this.value);
    linkEstilo.setAttribute("href", `${estilos[indiceRadio]}`);
    indiceActual = indiceRadio;

    removerEstiloGuardado(); //Quita estilo de la memoria
}

radioEstilos.forEach(radioEstilos => radioEstilos.addEventListener("change", cambiarEstiloRadio));

// Función para manejar el botón "Recordar"

function toggleRecordar() {
    recordarActivo = !recordarActivo; // Cambia el estado

    if (recordarActivo) {
        // Guarda el estilo actual en localStorage
        localStorage.setItem("estiloGuardado", linkEstilo.getAttribute("href"));
        botonRecordar.classList.add("hundido"); // Aplica el estilo "hundido"
    } else {
        // Elimina el estilo guardado de localStorage
        localStorage.removeItem("estiloGuardado");
        botonRecordar.classList.remove("hundido"); // Quita el estilo "hundido"
    }
}

botonRecordar.addEventListener("click", toggleRecordar);

// Aplicar el estilo guardado al cargar la página
function aplicarEstiloGuardado() {
    const estiloGuardado = localStorage.getItem("estiloGuardado");
    if (estiloGuardado) {
        linkEstilo.setAttribute("href", estiloGuardado);
        recordarActivo = true;
        botonRecordar.classList.add("hundido");
        for (var i = 0; i < estilos.length; i++) {
            if (estiloGuardado == estilos[i]) {
                indiceActual = i;
            }
        }
    }
}

aplicarEstiloGuardado();