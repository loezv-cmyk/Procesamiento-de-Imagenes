const galeria = document.getElementById("galeria");

// Número total de imágenes que tienes
const totalImagenes = 22;

for (let i = 1; i <= totalImagenes; i++) {
    const img = document.createElement("img");
    img.src = `galeria/Foto ${i}.png`;
    img.alt = `Foto ${i}`;
    galeria.appendChild(img);
}

// ---- MINIATURA VIDEO MÉXICO ----

const contenedorVideo = document.createElement("div");
contenedorVideo.style.position = "relative";
contenedorVideo.style.cursor = "pointer";

const miniatura = document.createElement("img");
miniatura.src = "galeria/video-mexico.png"; 
miniatura.alt = "Video México";
miniatura.style.width = "100%";

const iconoPlay = document.createElement("div");
iconoPlay.innerHTML = "▶";
iconoPlay.style.position = "absolute";
iconoPlay.style.top = "50%";
iconoPlay.style.left = "50%";
iconoPlay.style.transform = "translate(-50%, -50%)";
iconoPlay.style.fontSize = "50px";
iconoPlay.style.color = "white";

contenedorVideo.appendChild(miniatura);
contenedorVideo.appendChild(iconoPlay);

contenedorVideo.addEventListener("click", () => {
    window.open("videos/mexico.mp4", "_blank");
});

galeria.appendChild(contenedorVideo);
