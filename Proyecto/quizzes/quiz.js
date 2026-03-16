// ===== OBTENER QUIZ DESDE LA URL =====
const params = new URLSearchParams(window.location.search);
const quizNombre = params.get("quiz");

const quizData = quizzes[quizNombre];

// Validación por si alguien entra sin seleccionar quiz
if (!quizData) {
    document.body.innerHTML = `
        <h2 style="text-align:center;margin-top:50px;">
        Quiz no encontrado 😢
        </h2>
    `;
    throw new Error("Quiz no válido");
}

// ===== VARIABLES =====
let indice = 0;
let puntaje = 0;

const tituloQuiz = document.getElementById("tituloQuiz");
const preguntaEl = document.getElementById("pregunta");
const respuestasEl = document.getElementById("respuestas");
const feedbackEl = document.getElementById("feedback");
const btnSiguiente = document.getElementById("btnSiguiente");

tituloQuiz.textContent = quizData.titulo;


// ===== CARGAR PREGUNTA =====
function cargarPregunta() {

    feedbackEl.textContent = "";
    respuestasEl.innerHTML = "";

    const actual = quizData.preguntas[indice];
    preguntaEl.textContent = actual.pregunta;

    actual.opciones.forEach((opcion, i) => {

        const btn = document.createElement("button");
        btn.textContent = opcion;
        btn.classList.add("opcion");

        btn.addEventListener("click", () => seleccionarRespuesta(i, btn));

        respuestasEl.appendChild(btn);
    });
}


// ===== SELECCIONAR RESPUESTA =====
function seleccionarRespuesta(i, boton) {

    const botones = document.querySelectorAll(".opcion");
    botones.forEach(b => b.disabled = true);

    if (i === quizData.preguntas[indice].correcta) {
        boton.classList.add("correcta");
        feedbackEl.textContent = "✅ ¡Correcto!";
        puntaje++;
    } else {
        boton.classList.add("incorrecta");
        botones[quizData.preguntas[indice].correcta]
            .classList.add("correcta");

        feedbackEl.textContent = "❌ Incorrecto";
    }
}


// ===== BOTÓN SIGUIENTE =====
btnSiguiente.addEventListener("click", () => {

    indice++;

    if (indice < quizData.preguntas.length) {
        cargarPregunta();
    } else {
        mostrarResultado();
    }
});


// ===== RESULTADO FINAL =====
function mostrarResultado() {

    preguntaEl.textContent = "Quiz terminado";
    respuestasEl.innerHTML = "";

    feedbackEl.textContent =
        `Obtuviste ${puntaje} de ${quizData.preguntas.length}`;

    btnSiguiente.textContent = "Volver";

    btnSiguiente.onclick = () => {
        window.location.href = quizData.redirectFinal;
    };
}


// ===== INICIAR =====
cargarPregunta();