const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const btnFoto = document.getElementById("btnFoto");
const btnDescargar = document.getElementById("btnDescargar");
const btnRepetir = document.getElementById("btnRepetir");
const btnVoltear = document.getElementById("btnVoltear");
const btnPixel = document.getElementById("btnPixel");
const btnRandom = document.getElementById("btnRandom");
const btnReset = document.getElementById("btnReset");

const botonesIniciales = document.getElementById("botones-iniciales");
const botonesFinales = document.getElementById("botones-finales");

let fotoOriginal = null;
let marcoImg = new Image();
let volteada = false;

let pixelActivo = false;
let randomActivo = false;

marcoImg.src = "marco.png";


// 📷 Activar cámara
navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
})
.then(stream => {
    video.srcObject = stream;
})
.catch(error => {
    alert("No se pudo acceder a la cámara");
});


// 📸 Tomar foto
btnFoto.addEventListener("click", () => {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    fotoOriginal = new Image();
    fotoOriginal.src = canvas.toDataURL("image/png");

    context.drawImage(marcoImg, 0, 0, canvas.width, canvas.height);

    video.style.display = "none";
    botonesIniciales.style.display = "none";

    canvas.style.display = "block";
    botonesFinales.style.display = "flex";
});


// 🔄 Voltear (mantiene filtros)
btnVoltear.addEventListener("click", () => {
    volteada = !volteada;
    aplicarFiltros();
});


// 🎨 Función central de render
function aplicarFiltros() {

    if (!fotoOriginal) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();

    // Voltear si está activo
    if (volteada) {
        context.scale(-1, 1);
        context.drawImage(fotoOriginal, -canvas.width, 0, canvas.width, canvas.height);
    } else {
        context.drawImage(fotoOriginal, 0, 0, canvas.width, canvas.height);
    }

    context.restore();

    // ---------- PIXEL ----------
    if (pixelActivo) {

        const tamañoPixel = 15;

        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");

        tempCanvas.width = canvas.width / tamañoPixel;
        tempCanvas.height = canvas.height / tamañoPixel;

        tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

        context.imageSmoothingEnabled = false;
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(
            tempCanvas,
            0,
            0,
            tempCanvas.width,
            tempCanvas.height,
            0,
            0,
            canvas.width,
            canvas.height
        );

        context.imageSmoothingEnabled = true;
    }

    // ---------- COLOR RANDOM SUAVE ----------
    if (randomActivo) {

        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {

            data[i] = (data[i] + Math.random() * 255) / 2;
            data[i + 1] = (data[i + 1] + Math.random() * 255) / 2;
            data[i + 2] = (data[i + 2] + Math.random() * 255) / 2;
        }

        context.putImageData(imageData, 0, 0);
    }

    // Marco siempre encima
    context.drawImage(marcoImg, 0, 0, canvas.width, canvas.height);
}


// 🎮 Activar / Desactivar filtros
btnPixel.addEventListener("click", () => {
    pixelActivo = !pixelActivo;
    aplicarFiltros();
});

btnRandom.addEventListener("click", () => {
    randomActivo = !randomActivo;
    aplicarFiltros();
});


// 🔄 Restaurar
btnReset.addEventListener("click", () => {
    pixelActivo = false;
    randomActivo = false;
    volteada = false;
    aplicarFiltros();
});


// ⬇ Descargar
btnDescargar.addEventListener("click", () => {
    const enlace = document.createElement("a");
    enlace.download = "mi_foto.png";
    enlace.href = canvas.toDataURL("image/png");
    enlace.click();
});


// 🔁 Repetir
btnRepetir.addEventListener("click", () => {

    pixelActivo = false;
    randomActivo = false;
    volteada = false;

    video.style.display = "block";
    botonesIniciales.style.display = "block";

    canvas.style.display = "none";
    botonesFinales.style.display = "none";
});
