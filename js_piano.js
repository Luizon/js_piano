//////////////////////////////////////
// variables
//////////////////////////////////////
var notas =			["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var tecladoFisico = ["Z", "S",  "X", "D",  "C", "V",  "G", "B", "H",  "N", "J",  "M",  // graves
					 "R", "5",  "T", "6",  "Y", "U",  "8", "I", "9",  "O", "0",  "P"]; // agudas
//var Sonidos=		  [261, 277,  293, 311,  329, 349,  369, 392, 415,  440, 466,  493];
const frecuencias =[
//    C      C#       D      D#       E       F      F#       G      G#       A      A#       B
//32.70,  34.65,  36.71,  38.89,  41.20,  43.65,  46.25,  49.00,  51.91,  55.00,  58.27,  61.74, // octava 1, demasiado grave
  65.41,  69.30,  73.42,  77.78,  82.41,  87.31,  92.50,  98.00, 103.83, 110.00, 116.54, 123.47, // octava 2
 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 220.00, 233.08, 246.94, // octava 3
 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88, // octava 4
 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880.00, 932.33, 987.77, // octava 5
1046.50,1108.73,1174.66,1244.51,1318.51,1396.91,1479.98,1567.98,1661.22,1760.00,1864.66,1975.53, // octava 6
];
var teclas = []
//contiene la vibración por segundo de la nota
//posición en el arreglo: do=0,do#=1,re=2........
//creamos contexto
var context;
var octavas = 1;
var btnMas, btnMenos;

//////////////////////////////////////
// IFEE para evitar que context tire error de undefinded más adelante
//////////////////////////////////////
;(function () {
	context = new (window.AudioContext || window.webkitAudioContext)();
})();

// crear y colocar los botones
function iniciar() {
	let width = document.documentElement.clientWidth / octavas;
//	alert(width + " + " + height)
	let piano = document.getElementById("piano");
	const octavaTecladoGrave = 3,
		  octavaTecladoAguda = 4;
	for(let iteracionOctaval=1; iteracionOctaval <= 5; iteracionOctaval++) {
		let octavaActual = iteracionOctaval + 1;
		let entra = (octavas == 1 && octavaActual == 4); true
		|| (octavas == 2 && (iteracionOctaval == 4 || iteracionOctaval == 5))
		|| (octavas == 3 && 5 - iteracionOctaval > 1 && 5 - iteracionOctaval < 5)
		|| (octavas == 4 && iteracionOctaval > 1)
		|| (octavas == 5);
		notas.forEach( (n, i) => {
			let btnNota = document.createElement('button');
			btnNota.style.width = width/7;
			
			btnNota.className = "flat";
			btnNota.id = i + (iteracionOctaval - 1)*12;
			let espacio = "</i><br><br><br><b>";
			if(octavaActual == octavaTecladoGrave)
				btnNota.innerHTML = "<div class=\"labelWhite\"><i>" + tecladoFisico[i] + espacio + n + "</div>";
			else if(octavaActual == octavaTecladoAguda)
				btnNota.innerHTML = "<div class=\"labelWhite\"><i>" + tecladoFisico[i+12] + espacio + n + "</div>";
			else
				btnNota.innerHTML = "<div class=\"labelWhite\"><i>" + n + "</div>";
			if(n.includes("#")) {
				if(octavaActual == octavaTecladoGrave)
					btnNota.innerHTML = "<div class=\"labelBlack\"><i>" + tecladoFisico[i] + espacio + n + "</div>";
				else if(octavaActual == octavaTecladoAguda)
					btnNota.innerHTML = "<div class=\"labelBlack\"><i>" + tecladoFisico[i+12] + espacio + n + "</div>";
				else
					btnNota.innerHTML = "<div class=\"labelBlack\"><i>" + n + "</div>";
				//btnNota.innerHTML = n;
				btnNota.className = "sharp";
				let posicionNegra = iteracionOctaval - 1 -
				octavas <= 2 ? 2 :
				octavas <= 4 ? 1 : 0;
				//console.log(posicionNegra + ", " + (i + iteracionOctaval*12));
				switch(i % 12) {
					case 1: //C#
						btnNota.style.left = 0 + width/14 + width*(posicionNegra);
						break;
					case 3: // D#
						btnNota.style.left = width/7 + width/14 + width*(posicionNegra);
						break;
					case 6: // F#
						btnNota.style.left = width/7 * 3 + width/14 + width*(posicionNegra);
						break;
					case 8: // G#
						btnNota.style.left = width/7 * 4 + width/14 + width*(posicionNegra);
						break;
					case 10: // A#
						btnNota.style.left = width/7 * 5 + width/14 + width*(posicionNegra);
						break;
				}
			}
			//btnNota.setAttribute('onclick', alert(i));
			btnNota.onclick = function() {
				 //creamos oscilador
				var osc = context.createOscillator();
			 
				// admite: sine, square, sawtooth, triangle
				osc.type = 'sine'; 
			 
				//osc.frequency.value=Sonidos[i];
				osc.frequency.value = frecuencias[i + ((iteracionOctaval-1)*12)];
				//console.log(nota + "\n\t" + Sonidos[i] + "\n\t" +osc.frequency.value)
			 
				//asignamos el destino para el sonido
				osc.connect(context.destination);
				//iniciamos la nota
				osc.start();
				//detenemos la nota .25 segundos despues
				osc.stop(context.currentTime + .25);
			};
			teclas.push(btnNota);
			if(entra)
				piano.appendChild(btnNota);
		});
		}
	botonesOctavas();
	resize();
}

function hacerPiano(octavasAnteriores) {
	let inicio = 0, fin = 60;
	if(octavasAnteriores == 1) {
		inicio+= 24;
		fin-= 24;
	}
	else if(octavasAnteriores == 2) {
		inicio+= 24;
		fin-= 12;
	}
	else if(octavasAnteriores == 3) {
		inicio+= 12;
		fin-= 12;
	}
	else if(octavasAnteriores == 4) {
		inicio+= 12;
	}
	let piano = teclas[30].parentNode;
	
	// remover teclas
	for(var i = inicio; i < fin; i++) {
		piano.removeChild(teclas[i]);
	}

	inicio = 0;
	fin = 60;
	if(octavas == 1) {
		inicio+= 24;
		fin-= 24;
	}
	else if(octavas == 2) {
		inicio+= 24;
		fin-= 12;
	}
	else if(octavas == 3) {
		inicio+= 12;
		fin-= 12;
	}
	else if(octavas == 4) {
		inicio+= 12;
	}

	// agregar teclas
	for(var i = inicio; i < fin; i++) {
		piano.appendChild(teclas[i]);
	}
	resize();
}

function botonesOctavas() {
	btnMas = document.createElement("button");
	btnMenos = document.createElement("button");
	btnMas.className = btnMenos.className = "boton-octava";
	document.body.appendChild(btnMas);
	document.body.appendChild(btnMenos);
	
	resizeBotonesOctavas();
	
	btnMas.innerHTML = "+";
	btnMenos.innerHTML = "-";
	
	btnMas.onclick = agregarOctava;
	btnMenos.onclick = restarOctava;
}

function resizeBotonesOctavas() {
	let width = document.documentElement.clientWidth;
	let height = document.documentElement.clientHeight;
	let keySize = width/12/octavas;
	
	btnMas.style.left = width - height/6;
	btnMenos.style.left = width - height/18*5;
	btnMas.style.top = height/25;
	btnMenos.style.top = height/25;
}

function agregarOctava() {
	if(octavas >= 5)
		return;
	octavas+= 1;
	hacerPiano(octavas - 1);
}

function restarOctava() {
	if(octavas <= 1)
		return;
	octavas-= 1;
	hacerPiano(octavas + 1);
}

function resize() {
	let width = document.documentElement.clientWidth / octavas;
	let posicionOctava =
	octavas <= 2 ? -2 :
	octavas <= 4 ? -1 : 0;
	let actualPosicion = 0;
	teclas.forEach( (tecla, i) => {
		tecla.style.width = width/7;
		actualPosicion = posicionOctava + Math.floor(i/12);
		switch(i % 12) {
			case 1: // C#
				tecla.style.left = 0 + width/14 + width*actualPosicion;
				break;
			case 3: // D#
				tecla.style.left = width/7 + width/14 + width*actualPosicion;
				break;
			case 6: // F#
				tecla.style.left = width/7 * 3 + width/14 + width*actualPosicion;
				break;
			case 8: // G#
				tecla.style.left = width/7 * 4 + width/14 + width*actualPosicion;
				break;
			case 10: // A#
				tecla.style.left = width/7 * 5 + width/14 + width*actualPosicion;
				break;
		}
	});
	resizeBotonesOctavas();
}

document.addEventListener("keydown", key => {
	console.log(key.keyCode);
	let teclasTocables = 1 // cantidad de octavas antes de las teclas tocables
	* 12;
	
	// graves
	if(key.keyCode == 90) { // Z
		teclas[0 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 83) { // S
		teclas[1 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 88) { // X
		teclas[2 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 68) { // D
		teclas[3 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 67) { // C
		teclas[4 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 86) { // V
		teclas[5 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 71) { // G
		teclas[6 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 66) { // B
		teclas[7 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 72) { // H
		teclas[8 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 78) { // N
		teclas[9 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 74) { // J
		teclas[10 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 77) { // M
		teclas[11 + teclasTocables].click();
		return;
	}
	
	teclasTocables+= 12;
	// agudas
	if(key.keyCode == 82) { // R
		teclas[0 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 53) { // 5
		teclas[1 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 84) { // T
		teclas[2 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 54) { // 6
		teclas[3 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 89) { // Y
		teclas[4 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 85) { // U
		teclas[5 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 56) { // 8
		teclas[6 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 73) { // I
		teclas[7 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 57) { // 9
		teclas[8 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 79) { // O
		teclas[9 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 48) { // 0
		teclas[10 + teclasTocables].click();
		return;
	}
	if(key.keyCode == 80) { // P
		teclas[11 + teclasTocables].click();
		return;
	}
})


window.onresize = resize;
window.onload = iniciar;