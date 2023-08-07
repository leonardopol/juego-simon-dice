let movimientosMaquina = [];
let movimientosJugador = [];
let ronda = 0;
let indice = 0;
let estado = '';

document.querySelector("#boton-empezar").onclick = empezar;

function empezar(){
    reiniciarMovimientos();
    ronda = 1;
    indice = 0;
    actualizarRonda();
    actualizarEstado(`Turno computadora`);
    actualizarColorAlertaInicioDeJuego();
    turnoComputadora();
}

function turnoComputadora(){
    
    bloquearUsuario();
    movimientosMaquina.push(obtenerCuadroAleatoreo());
    const RETRASO_TURNO_JUGADOR = (movimientosMaquina.length + 1) * 1000;

    movimientosMaquina.forEach(function($cuadro, index){
        const RETRASO_MS = (index + 1) * 1000;
        setTimeout(function() {
            resaltarCuadro($cuadro);
        },RETRASO_MS);
    });

    setTimeout(function() {
        actualizarEstado('Turno del jugador');
        desbloquearUsuario();
      }, RETRASO_TURNO_JUGADOR);
}

function obtenerCuadroAleatoreo(){
    const $cuadros = document.querySelectorAll(".cuadro");
    const cuadro = $cuadros[Math.floor(Math.random() * $cuadros.length)];
    return cuadro;    
}

function turnoJugador(){
    document.querySelectorAll(".cuadro").forEach(function($cuadro){
        $cuadro.onclick = entradaJugador;
    });
}

function entradaJugador(e){

    const $cuadro = e.target;
    indice++;
    resaltarCuadro($cuadro);
    
    if($cuadro !== movimientosMaquina[indice - 1]){
        actualizarEstado(`Perdisteee! toca "Empezar" para volver a Jugar!`);
        actualizarColorAlertaFinDeJuego();
        ronda = 0;
        actualizarRonda();
        bloquearUsuario();
        return;
    }

    movimientosJugador.push($cuadro);

    if(movimientosJugador.length === movimientosMaquina.length){
        compararJugada();
    }
    
}

function compararJugada(){
    
    for(let i = 0; i < movimientosMaquina.length; i++){
        if(movimientosMaquina[i] === movimientosJugador[i]){
            setTimeout(function(){
                actualizarEstado(`Turno computadora`);
                
            },1000);

        }

    }
    setTimeout(function(){

        ronda++;
        actualizarRonda();
        turnoComputadora();
        
    },1000);
    reiniciarMovimientosJugador();
    indice = 0;
}

function reiniciarMovimientosJugador(){
    movimientosJugador = [];
}

function reiniciarMovimientos(){
    movimientosMaquina = [];
    movimientosJugador = [];
}

function bloquearUsuario(){
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = function() {
        };
    });
}

function desbloquearUsuario() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
      $cuadro.onclick = entradaJugador;
    });
}

function actualizarRonda(){
    const $ronda = document.querySelector("#ronda");
    $ronda.textContent = ronda;
}

function actualizarEstado(estado){
    const $estado = document.querySelector("#estado");
    $estado.textContent = estado;
}

function actualizarColorAlertaFinDeJuego(){
    const $alerta = document.querySelector("#estado");
    $alerta.style.color = "red";
}

function actualizarColorAlertaInicioDeJuego(){
    const $alerta = document.querySelector("#estado");
    $alerta.style.color = "green";
}

function resaltarCuadro($cuadro) {
    $cuadro.style.opacity = 1;
    setTimeout(function() {
      $cuadro.style.opacity = 0.5;
    }, 500);
}