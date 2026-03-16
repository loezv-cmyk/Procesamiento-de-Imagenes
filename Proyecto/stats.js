// =============================
// CONFIGURACION API
// =============================

let intervaloStats = null;

// API KEY "c1c667302c8e314a6d62188989fc8854"

// API KEY
const API_KEY = "";

const equipos = [
    { nombre:"México", id:16, escudo:"escudos/mexico.png" },
    { nombre:"Japón", id:25, escudo:"escudos/japon.png" },
    { nombre:"Túnez", id:28, escudo:"escudos/tunez.png" },
    { nombre:"Corea del Sur", id:35, escudo:"escudos/korea.png" },
    { nombre:"Sudáfrica", id:29, escudo:"escudos/sudafrica.png" }
];

const LEAGUE_ID = 1;
const SEASON = 2022;


// =============================
// OBTENER ESTADISTICAS
// =============================

async function obtenerStats(team){

    try{

        const response = await fetch(
            `https://v3.football.api-sports.io/teams/statistics?league=${LEAGUE_ID}&season=${SEASON}&team=${team.id}`,
            {
                headers:{
                    "x-apisports-key": API_KEY
                }
            }
        );

        const data = await response.json();
        const stats = data.response;

        crearTarjeta(team, stats);

    }catch(error){
        console.error("Error cargando stats:", error);
    }
}


// =============================
// CREAR TARJETA VISUAL
// =============================

function crearTarjeta(team, stats){

    const container = document.getElementById("statsContainer");

    const card = document.createElement("div");
    card.className = "stat-card";

    card.innerHTML = `
        <img src="${team.escudo}">
        <h3>${team.nombre}</h3>

        <p>Partidos: ${stats.fixtures.played.total}</p>
        <p>Ganados: ${stats.fixtures.wins.total}</p>
        <p>Empates: ${stats.fixtures.draws.total}</p>
        <p>Derrotas: ${stats.fixtures.loses.total}</p>
        <p>Goles: ${stats.goals.for.total.total}</p>
    `;

    // animación entrada
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    container.appendChild(card);

    setTimeout(() => {
        card.style.transition = "all 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }, 100);
}


// =============================
// CARGAR TODOS LOS PAISES
// =============================

function cargarEstadisticas(){

    const container = document.getElementById("statsContainer");
    container.innerHTML = "";

    equipos.forEach(team => {
        obtenerStats(team);
    });
}


// =============================
// CONTROL DE ACTUALIZACION API
// =============================

function iniciarActualizacion(){

    if(!intervaloStats){

        console.log("▶ Iniciando actualización stats");

        cargarEstadisticas(); // primera carga inmediata

        intervaloStats = setInterval(() => {
            console.log("🔄 Actualizando stats...");
            cargarEstadisticas();
        }, 300000); // 5 minutos
    }
}

function detenerActualizacion(){

    console.log("⏸ Deteniendo actualización");

    clearInterval(intervaloStats);
    intervaloStats = null;
}


// =============================
// DETECTAR SI LA PAGINA ESTA VISIBLE
// =============================

document.addEventListener("visibilitychange", () => {

    if(document.hidden){
        detenerActualizacion();
    }else{
        iniciarActualizacion();
    }

});


// =============================
// INICIAR AL CARGAR
// =============================

document.addEventListener("DOMContentLoaded", () => {
    iniciarActualizacion();
});