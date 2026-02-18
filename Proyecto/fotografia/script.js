const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const btnFoto = document.getElementById("btnFoto");
const btnDescargar = document.getElementById("btnDescargar");
const btnRepetir = document.getElementById("btnRepetir");

const botonesIniciales = document.getElementById("botones-iniciales");
const botonesFinales = document.getElementById("botones-finales");

// Activar cámara
navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
})
.then(stream => {
    video.srcObject = stream;
})
.catch(error => {
    alert("No se pudo acceder a la cámara");
    console.error(error);
});

// 📸 Tomar foto
btnFoto.addEventListener("click", () => {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const marco = new Image();
    //marco.crossOrigin = "anonymous";
    marco.src = "marco.png";

    marco.onload = function() {
        context.drawImage(marco, 0, 0, canvas.width, canvas.height);
    };

    // Ocultar cámara y botón inicial
    video.style.display = "none";
    botonesIniciales.style.display = "none";

    // Mostrar foto y botones finales
    canvas.style.display = "block";
    botonesFinales.style.display = "flex";
});

// ⬇ Descargar
btnDescargar.addEventListener("click", () => {
    const enlace = document.createElement("a");
    enlace.download = "mi_foto.png";
    enlace.href = canvas.toDataURL("image/png");
    enlace.click();
});

// Repetir foto
btnRepetir.addEventListener("click", () => {

    // Mostrar cámara otra vez
    video.style.display = "block";
    botonesIniciales.style.display = "block";

    // Ocultar foto y botones finales
    canvas.style.display = "none";
    botonesFinales.style.display = "none";

});
