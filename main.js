let guardarMovimientosMaquina = [];
let guardarMovimientosJugador = [];
let ronda = 0;
let estado = '';
let indice = 0;

document.querySelector("#boton-empezar").onclick = empezar;

function empezar(){
    reiniciarMovimientos();
    ronda = 1;
    indice = 0;
    actualizaRonda();
    actualizaEstado(`Turno computadora`);
    turnoComputadora();
}

function turnoComputadora(){
    
    guardarMovimientosMaquina.push(obtenerCuadro());
    let delay = 0;
    guardarMovimientosMaquina.forEach(function($cuadro){
        
        setTimeout(function() {
        $cuadro.style.opacity = 1;

            setTimeout(function(){
                $cuadro.style.opacity = 0.5;
            },500);

        },800 + delay);
        delay += 800;
    });
    turnoJugador();
}

function obtenerCuadro(){
    const $cuadros = document.querySelectorAll(".cuadro");
    const cuadro = $cuadros[Math.floor(Math.random() * $cuadros.length)];
    return cuadro;    
}

function turnoJugador(){
    let delay = 0;
    setTimeout(function(){
        actualizaEstado(`Turno Jugador`);
    },1000 + delay);
    document.querySelectorAll(".cuadro").forEach(function($cuadro){
        $cuadro.onclick = entradaJugador;
    });
}

function entradaJugador(e){

    let delay = 0;

    const $cuadro = e.target;
    indice++;
    setTimeout(function(){
        $cuadro.style.opacity = 1;
        
        setTimeout(function(){
            $cuadro.style.opacity = 0.5;
        },500);

    },80 + delay);
    delay += 80;
    
    if($cuadro !== guardarMovimientosMaquina[indice - 1]){
        actualizaEstado(`Perdisteee! toca "Empezar" para volver a Jugar!`);
        estadoFinDeJuego();
        ronda = 0;
        actualizaRonda();
        bloquearUsuario();
        return;
    }

    guardarMovimientosJugador.push($cuadro);

    if(guardarMovimientosJugador.length === guardarMovimientosMaquina.length){
        compararJugada();
    }
    
}

function compararJugada(){
    for(let i = 0; i < guardarMovimientosMaquina.length; i++){
        if(guardarMovimientosMaquina[i] === guardarMovimientosJugador[i]){
            setTimeout(function(){
                actualizaEstado(`Turno computadora`);
            },1000);

        }

    }
    setTimeout(function(){
        
        ronda++;
        actualizaRonda();
        turnoComputadora();
        
    },1000);
    reiniciarMovimientosJugador();
    indice = 0;
}

function reiniciarMovimientosJugador(){
    guardarMovimientosJugador = [];
}
function reiniciarMovimientos(){
    guardarMovimientosMaquina = [];
    guardarMovimientosJugador = [];
}
function bloquearUsuario(){
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = function() {
        };
    });
}
function actualizaRonda(){
    const $ronda = document.querySelector("#ronda");
    $ronda.textContent = ronda;
}
function actualizaEstado(estado){
    const $estado = document.querySelector("#estado");
    $estado.textContent = estado;
}
function estadoFinDeJuego(){
    const $alerta = document.querySelector("#estado");
    $alerta.style.color = "red";
}
