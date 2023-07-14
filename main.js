let guardarMovimientosMaquina = [];
let guardarMovimientosJugador = [];

document.querySelector("#boton-empezar").onclick = empezar;

function empezar(){
    console.log("empezo");
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
        $cuadro.style.opacity = 0.5;
        delay += 800;
    });
    turnoJugador();
}

function obtenerCuadro(){
    console.log("obtener cuadro");
    const $cuadrosLista = document.querySelectorAll(".cuadro");
    const indiceLista = Number(Math.floor(Math.random() * $cuadrosLista.length));
    return $cuadrosLista[indiceLista];    
}

function turnoJugador(){
    console.log("obtener cuadro jugador");
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
    $cuadro.style.opacity = 0.5;
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
                    reiniciarMovimientosJugador();
                    turnoComputadora();
                },1000);
                
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