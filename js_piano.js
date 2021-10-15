//////////////////////////////////////
// variables
//////////////////////////////////////
var notas =         ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
var tecladoFisico = ["Z", "S",  "X", "D",  "C", "V",  "G", "B", "H",  "N", "J",  "M"]
var Sonidos=        [261, 277,  293, 311,  329, 349,  369, 392, 415,  440, 466,  493];
var teclas = []
//contiene la vibración por segundo de la nota
//posición en el arreglo: do=0,do#=1,re=2........
//creamos contexto
var context;

//////////////////////////////////////
// IFEE para evitar que context tire error de undefinded más adelante
//////////////////////////////////////
;(function () {
	context = new (window.AudioContext || window.webkitAudioContext)();
})() 

 iniciar();

// crear y colocar los botones
function iniciar() {
	let width = document.documentElement.clientWidth;
//	alert(width + " + " + height)
	let piano = document.getElementById("piano");
	notas.forEach( (n, i) => {
		let nota = document.createElement('button');
		
		nota.className = "flat";
		nota.onClick = "alert(\"jala\")";
		nota.id = i;
		let espacio = "</i><br><br><br><b>";
		nota.innerHTML = "<div class=\"labelWhite\"><i>" + tecladoFisico[i] + espacio + n + "</div>";
		if(n.includes("#")) {
			nota.innerHTML = "<div class=\"labelBlack\"><i>" + tecladoFisico[i] + espacio + n + "</div>";
			//nota.innerHTML = n;
			nota.className = "sharp";
			switch(i) {
				case 1: //C#
					nota.style.left = 0 + width/14;
					break;
				case 3: // D#
					nota.style.left = width/7 + width/14;
					break;
				case 6: // F#
					nota.style.left = width/7 * 3 + width/14;
					break;
				case 8: // G#
					nota.style.left = width/7 * 4 + width/14;
					break;
				case 10: // A#
					nota.style.left = width/7 * 5 + width/14;
					break;
			}
		}
		//nota.setAttribute('onclick', alert(i));
		nota.onclick = function() {
			 //creamos oscilador
			var osc = context.createOscillator();
		 
			// admite: sine, square, sawtooth, triangle
			osc.type = 'sawtooth'; 
		 
			osc.frequency.value=Sonidos[i];
		 
			//asignamos el destino para el sonido
			osc.connect(context.destination);
			//iniciamos la nota
			osc.start();
			//detenemos la nota medio segundo despues
			osc.stop(context.currentTime + .5);
		};
		teclas.push(nota);
		piano.appendChild(nota);
	})

}

function resize() {
	let width = document.documentElement.clientWidth;
	notas.forEach( (n, i) => {
		if(n.includes("#")) {
			switch(i) {
				case 1: //C#
					teclas[i].style.left = 0 + width/14;
					break;
				case 3: // D#
					teclas[i].style.left = width/7 + width/14;
					break;
				case 6: // F#
					teclas[i].style.left = width/7 * 3 + width/14;
					break;
				case 8: // G#
					teclas[i].style.left = width/7 * 4 + width/14;
					break;
				case 10: // A#
					teclas[i].style.left = width/7 * 5 + width/14;
					break;
			}
		}
	});
}

document.addEventListener("keydown", key => {
	console.log(key.keyCode);
	if(key.keyCode == 90) { // z
		teclas[0].click();
		return;
	}
	if(key.keyCode == 83) { // s
		teclas[1].click();
		return;
	}
	if(key.keyCode == 88) { // x
		teclas[2].click();
		return;
	}
	if(key.keyCode == 68) { // d
		teclas[3].click();
		return;
	}
	if(key.keyCode == 67) { // c
		teclas[4].click();
		return;
	}
	if(key.keyCode == 86) { // v
		teclas[5].click();
		return;
	}
	if(key.keyCode == 71) { // g
		teclas[6].click();
		return;
	}
	if(key.keyCode == 66) { // b
		teclas[7].click();
		return;
	}
	if(key.keyCode == 72) { // h
		teclas[8].click();
		return;
	}
	if(key.keyCode == 78) { // n
		teclas[9].click();
		return;
	}
	if(key.keyCode == 74) { // j
		teclas[10].click();
		return;
	}
	if(key.keyCode == 77) { // m
		teclas[11].click();
		return;
	}
})


window.onresize = resize;