let guardarMovimientosMaquina = [];
let guardarMovimientosJugador = [];

document.querySelector("#boton-empezar").onclick = empezar;

function empezar(){
    reiniciarMovimientos();
    turnoComputadora();
}

function turnoComputadora(){
    
    console.log("turno de la computadora");
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
    console.log("obtener cuadro");
    const $cuadros = document.querySelectorAll(".cuadro");
    const cuadro = $cuadros[Math.floor(Math.random() * $cuadros.length)];
    return cuadro;    
}

function turnoJugador(){
    console.log("Turno jugador");
    document.querySelectorAll(".cuadro").forEach(function($cuadro){
        $cuadro.onclick = entradaJugador;
    });
}

function entradaJugador(e){
    let delay = 0;
    console.log("obtener cuadro jugador");
    const $cuadro = e.target;
    setTimeout(function(){
        $cuadro.style.opacity = 1;
        
        setTimeout(function(){
            $cuadro.style.opacity = 0.5;
        },500);

    },80 + delay);
        delay += 80;

    guardarMovimientosJugador.push($cuadro);
    if(guardarMovimientosJugador.length === guardarMovimientosMaquina.length){
        compararJugada();
    }
    
}

function compararJugada(){

    guardarMovimientosMaquina.forEach(function($cuadroMaquina){
        guardarMovimientosJugador.forEach(function($cuadroJugador){
            if($cuadroMaquina === $cuadroJugador){
                setTimeout(function(){
                    
                    turnoComputadora();
                    
                },1000);
                reiniciarMovimientosJugador();
            }
            if($cuadroMaquina !== $cuadroJugador){
                
                console.log("Perdiste!!!");
            }
        });
    });
    
}

function reiniciarMovimientosJugador(){
    guardarMovimientosJugador = [];
}
function reiniciarMovimientos(){
    guardarMovimientosMaquina = [];
    guardarMovimientosJugador = [];
}