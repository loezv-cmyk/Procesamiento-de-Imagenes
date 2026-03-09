// VARIABLES
let modeloActivo = null;
let paisActivo = null;
let indiceFact = 0;
let girando = false;

let panelActivo = null;
let textoActivo = null;
let targetActivo = null;

const ui = document.querySelector(".ar-ui");


// DETECCION DE TARGETS
document.querySelectorAll("[mindar-image-target]").forEach((target, index) => {

target.addEventListener("targetFound", () => {

    console.log("TARGET DETECTADO:", index);

    targetActivo = target;

    modeloActivo = target.querySelector("a-gltf-model");

    panelActivo = target.querySelector(".infoPanel");
    textoActivo = target.querySelector(".infoText");

    console.log("panel encontrado:", panelActivo);
    console.log("texto encontrado:", textoActivo);

    // asignar pais segun indice
    switch(index){
        case 0: paisActivo="mexico"; break;
        case 1: paisActivo="tunez"; break;
        case 2: paisActivo="japon"; break;
        case 3: paisActivo="sudafrica"; break;
        case 4: paisActivo="corea"; break;
    }

    indiceFact = 0;

    ui.style.display = "flex";
});


target.addEventListener("targetLost", () => {

    console.log("TARGET PERDIDO");

    modeloActivo = null;
    paisActivo = null;
    panelActivo = null;
    textoActivo = null;
    targetActivo = null;

    ui.style.display = "none";

});

});


// BOTON ROTAR
document.getElementById("btnRotar").onclick = () => {

if(!modeloActivo) return;

if(!girando){

    modeloActivo.setAttribute("animation",{
        property:"rotation",
        to:"0 360 0",
        loop:true,
        dur:5000,
        easing:"linear"
    });

    girando = true;

}else{

    modeloActivo.removeAttribute("animation");
    girando = false;

}

};


// BOTON CONFETTI
document.getElementById("btnConfetti").onclick = () => {

confetti({
    particleCount:150,
    spread:90,
    origin:{y:0.6}
});

};


// BOTON INFO
document.getElementById("btnInfo").onclick = () => {

if(!panelActivo || !textoActivo || !paisActivo){
    console.log("No hay panel activo");
    return;
}

console.log("Mostrando info de:", paisActivo);

const datos = funFacts[paisActivo];

// mostrar panel
panelActivo.setAttribute("visible", true);

// mostrar texto
textoActivo.setAttribute("visible", true);

// actualizar texto
textoActivo.setAttribute("value", datos[indiceFact]);

indiceFact++;

if(indiceFact >= datos.length){
    indiceFact = 0;
}

};


// FUN FACTS
const funFacts = {

mexico:[
    "Es la tercera vez que Mexico es anfitrion de la Copa Mundial.",
    "Mexico llego a cuartos de final en 1970 y 1986.",
    "Mexico es el pais con más hispanohablantes.",
    "El Mundial de 1970 fue el primero transmitido a color.",
    "Antonio Carbajal fue el primer jugador en disputar 5 mundiales."
],

corea:[
    "Corea del Sur llego a semifinales en 2002.",
    "Fue el primer pais asiático en lograrlo.",
    "Corea organizo el Mundial 2002 junto con Japon.",
    "Ha clasificado 12 veces al Mundial.",
    "Tiene más de 3000 islas."
],

japon:[
    "Japon ha llegado 4 veces a octavos de final.",
    "Su primera participacion fue en Francia 1998.",
    "Japon es un archipielago de miles de islas.",
    "El hotel más antiguo del mundo está en Japon."
],

sudafrica:[
    "Sudafrica es conocida como la nacion arcoiris.",
    "Nunca ha pasado de fase de grupos.",
    "El diamante Cullinan fue encontrado alli.",
    "Tiene tres capitales oficiales."
],

tunez:[
    "Nunca ha pasado de fase de grupos.",
    "Ha participado en 7 Copas del Mundo.",
    "El futbol es el deporte más popular.",
    "Escenas de Star Wars se grabaron en Tunez."
]

};