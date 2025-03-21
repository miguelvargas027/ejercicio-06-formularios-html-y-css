// Obtén los elementos necesarios
const linkEstilo = document.getElementById("estilo");
const selectorEstilos = document.getElementById("select-estilo");
const radioEstilos = document.querySelectorAll("input[name='estilo-radio']");
const botonRecordar = document.getElementById("fijar-estilo");

// Variable para rastrear si el modo "Recordar" está activo
let recordarActivo = false;

// Función para cambiar el estilo de forma aleatoria
function cambiarEstiloAleatorio() {
    const estilos = ["estilos.css", "estilos-futuro.css", "estilos-retro.css"];
    const indiceAleatorio = Math.floor(Math.random() * estilos.length);
    const estiloAleatorio = estilos[indiceAleatorio];

    linkEstilo.setAttribute("href", `./css/${estiloAleatorio}`);
    if (recordarActivo) {
        localStorage.setItem("estiloGuardado", rutaCSS);
    }
}
document.getElementById("estilo-random").addEventListener("click", cambiarEstiloAleatorio);

// Función para cambiar el estilo según el <select>
function cambiarEstiloSelect() {
    const rutaCSS = selectorEstilos.value;
    linkEstilo.setAttribute("href", rutaCSS);
    if (recordarActivo) {
        localStorage.setItem("estiloGuardado", rutaCSS);
    }
}
selectorEstilos.addEventListener("change", cambiarEstiloSelect);

//Función para cambiar el estilo según el <input type="radio">
function cambiarEstiloRadio() {
    const rutaCSS = this.value;
    linkEstilo.setAttribute("href", rutaCSS);
    if (recordarActivo) {
        localStorage.setItem("estiloGuardado", rutaCSS);
    }
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

// Aplicar el estilo guardado al cargar la página
function aplicarEstiloGuardado() {
    const estiloGuardado = localStorage.getItem("estiloGuardado");
    if (estiloGuardado) {
        linkEstilo.setAttribute("href", estiloGuardado);
        recordarActivo = true;
        botonRecordar.classList.add("hundido");
    }
}

botonRecordar.addEventListener("click", toggleRecordar);

// Aplicar el estilo guardado al cargar la página
aplicarEstiloGuardado();