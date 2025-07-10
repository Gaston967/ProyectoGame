//------------------Variables y Constantes-----------------

const vidaBoss = 1000;
const manaBoss = 10000;
const ataqueBoss = 150;
const ataqueBossEspecial = 150;
const vidaHeroe = 500;
const manaHeroe = 800;
const ataqueHeroe = 150;

let jefeFinal;
let Artur;
let Gandalf;
let Xena;

let jugadores = [
  { "nombre": "Ceci", "puntuacion": 1000 },
  { "nombre": "Pepe", "puntuacion": 3000 },
  { "nombre": "Bart", "puntuacion": 4000 },
  { "nombre": "Luck", "puntuacion": 6000 },
  { "nombre": "ALF", "puntuacion": 250 },
  { "nombre": "HAl9000", "puntuacion": 5500 },
  { "nombre": "Feanor", "puntuacion": 2000 },
  { "nombre": "Doc", "puntuacion": 4300 }
]

//-----------------Clases-----------------------------------------------

class Boss
{
  constructor(vida) 
  {
    this.vida = vida;
    this.contadorAtaqueEspecial = 0;
  }

  recibirGolpe(golpe, personaje) 
  {
    this.contadorAtaqueEspecial++;

    this.vida = Math.max(0, this.vida - golpe);
    let porcentajeB = (this.vida / vidaBoss) * 100;
    document.getElementById('vida-barra-boss').style.width = porcentajeB + '%';

    if(this.vida<=0)
      {
        console.log("cambia la imagen del boss");
        const boss = document.querySelector('.boss');
        boss.style.backgroundImage = "url('assets/Diablo.png')"
        document.getElementById("emojiBoss").textContent = "💀 Ganaste! 💀"
        return;
      }

  if (this.contadorAtaqueEspecial % 3 === 0) 
  {
    console.log("¡Ataque especial del Jefe!");

    Gandalf.vida = Math.max(0, Gandalf.vida - ataqueBossEspecial);
    let porcentajeG = (Gandalf.vida / vidaHeroe) * 100;
    document.getElementById('vida-barra-hechicero').style.width = porcentajeG + '%';

    Artur.vida = Math.max(0, Artur.vida - ataqueBossEspecial);
    let porcentajeA = (Artur.vida / vidaHeroe) * 100;
    document.getElementById('vida-barra-heroe').style.width = porcentajeA + '%';

    Xena.vida = Math.max(0, Xena.vida - ataqueBossEspecial);
    let porcentajeX = (Xena.vida / vidaHeroe) * 100;
    document.getElementById('vida-barra-arquera').style.width = porcentajeX + '%';

  } 
  else 
  {
    let porcentaje;
    switch (personaje) 
      {
        case 'hechicero':
          Gandalf.vida = Math.max(0, Gandalf.vida - ataqueBoss);
          porcentaje = (Gandalf.vida / vidaHeroe) * 100;
          document.getElementById('vida-barra-hechicero').style.width = porcentaje + '%';
          break;
        case 'heroe':
          Artur.vida = Math.max(0, Artur.vida - ataqueBoss);
          porcentaje = (Artur.vida / vidaHeroe) * 100;
          document.getElementById('vida-barra-heroe').style.width = porcentaje + '%';
          break;
        case 'arquera':
          Xena.vida = Math.max(0, Xena.vida - ataqueBoss);
          porcentaje = (Xena.vida / vidaHeroe) * 100;
          document.getElementById('vida-barra-arquera').style.width = porcentaje + '%';
          break;
      }
    }
  } 
}

class Heroe 
{
  constructor(vida)
  {
    this.vida = vida;
  }
  atacar(ataque,personaje)
  {
    jefeFinal.recibirGolpe(ataque, personaje);
  }
}
//---------------------------------funciones----------------------
function newGame() 
{
  alert("¡Llegaste Jefe Final!");
  const nombre = prompt("¿Cómo te llamás, valiente guerrero?");
  const listo = confirm(`¿Estás listo para enfrentar al Amo de la Masmorra, ${nombre}?`);
  if (!listo) 
  {
    alert("¡Regresá cuando estés preparado!");
    return;
  }
  jefeFinal = new Boss(vidaBoss);
  Artur = new Heroe(vidaHeroe);
  Gandalf = new Heroe(vidaHeroe);
  Xena = new Heroe(vidaHeroe);
  contadorSesion(nombre);
  guardarListado();
}

function contadorSesion(usuario){
  let contador=0;

  if(localStorage.getItem("juegos")===null){  
    contador=1;
    localStorage.setItem('juegos',JSON.stringify(contador));
    localStorage.setItem('usuario',JSON.stringify(usuario));
     }
  else{
    contador =  parseInt(localStorage.getItem("juegos"));
    contador = contador + 1;
    console.log(contador);
    localStorage.setItem('juegos', JSON.stringify(contador));
  }  
};

function guardarListado(){ 
      localStorage.setItem("jugadores", JSON.stringify(jugadores));
}


 //console.log("");

