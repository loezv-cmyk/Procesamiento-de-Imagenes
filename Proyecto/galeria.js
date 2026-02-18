const galeria = document.getElementById("galeria");

// Número total de imágenes que tienes
const totalImagenes = 22;

for (let i = 1; i <= totalImagenes; i++) {
    const img = document.createElement("img");
    img.src = `galeria/Foto ${i}.png`;
    img.alt = `Foto ${i}`;
    galeria.appendChild(img);
}