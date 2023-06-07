


// Obtener elementos del DOM
var apodoInput = document.getElementById('nickName');
var getInto = document.getElementById('getInto');
var login = document.getElementById('login');
var btnLogin = document.getElementById('btnSave');
var btnsPlay = document.getElementById('btns-Play');
var btnPlay = document.getElementById('btnPlay');
var nivelsContainer = document.getElementById('nivelsContainer');
var btnYes = document.getElementById('btnYes');
var btnNot = document.getElementById('btnNot');
var btnsOptions = document.getElementById('btnsOptions');
var scoreH = document.getElementById('scoreH');
var score = document.getElementById('score');
var check = document.getElementById('check');
var smark = document.getElementById('smark');
var howplayText = document.getElementById('howplayText');
var btnhowPlay = document.getElementById('btnhowPlay');
var btnreturn = document.getElementById('btnreturn');
var btnreturnWhat = document.getElementById('btnreturnWhat');
var WhatIsIt = document.getElementById('WhatIsIt');
var btnWhat = document.getElementById('btnWhat');
var begginGame = document.getElementById('begginGame');
var btnbeggin = document.getElementById('btnbeggin');
var btnHome = document.getElementById('btnHome');

let palabras  

const palabrasMostradas = [];

const palabrasAle = [];
//para comparar las palabras que salen en pantalla
let palabraPantalla;
//
let punctuation = 0;

let press = false;

let nivelgame = [];

let nivelButtons = [];

let nivelCurrent; 

let users;

let user;

let win ;

var isBtnYesLocked = false; // Variable para controlar el bloqueo del botón "Yes"

var isBtnNotLocked  = false;

var isLevelButtonLocked = false;

let result

// Variable para controlar el bloqueo de los botones de nivel

// Agregar evento al botón de "Ingresar"
getInto.addEventListener('click', function() {
    //ocultar el boton de ingresar y activa el login 
    getInto.style.display = 'none';
    login.style.display = 'block';
    leerArchivo();
    bringUsers();
  
});



// Agregar evento al botón de "Guardar"
btnLogin.addEventListener('click', function() {
  var texto = apodoInput.value; // Obtener el valor del input
  const resultado  = findUser(users,texto);
  if(resultado) {
    alert(`welcome again ${resultado.palabra}`)
    user = resultado.palabra;
    createNivels(resultado.numero);
  }
  else {
    alert("user created");
    user = `${texto}:1`;
    nivelgame.push(1);
    addUser(user);
  }
  login.style.display = 'none';
  btnsPlay.style.display = 'block';
});
// Agregar evento al botón de "ver las instruciones del juego"
btnhowPlay.addEventListener('click',function(){
  howplayText.style.display = 'block';
  btnsPlay.style.display = 'none';
});
// Agregar evento al botón de "ver para que sirve el juego "
btnWhat.addEventListener('click',function(){
  WhatIsIt.style.display = 'block';
  btnsPlay.style.display = 'none';
})
// Agregar evento al botón de "ver el home "
btnreturnWhat.addEventListener('click',function(){
  WhatIsIt.style.display = 'none';
  btnsPlay.style.display = 'block';
});

btnbeggin.addEventListener('click',function(){
  begginGame.style.display = 'none';
  mostrarOpciones(palabrasMostradas);
});

btnreturn.addEventListener('click', function(){
  howplayText.style.display = 'none';
  btnsPlay.style.display = 'block';
});

btnHome.addEventListener('click',function(){
  btnsPlay.style.display = 'block';
  nivelButtons.forEach(function(button) {
    button.style.display = 'none';
  });
  btnHome.style.display = 'none';
})

//crea los botones de los niveles 
btnPlay.addEventListener('click', function() {
  btnsPlay.style.display = 'none';

  // Crear los botones de niveles
  for (let i = 1; i <= 10; i++) {
    const nivelButton = document.createElement('button');
    nivelButton.textContent = 'Nivel ' + i;

    if (nivelgame.includes(i)) {
      nivelButton.classList.add('desbloqueado'); // Aplicar clase "desbloqueado" al botón desbloqueado
    } else {
      nivelButton.classList.add('bloqueado'); // Aplicar clase "bloqueado" al botón bloqueado
    }

    nivelButton.classList.add('nivel-' + i); // Agregar la clase CSS "nivel-x" al botón

    nivelsContainer.appendChild(nivelButton);
    nivelButtons.push(nivelButton); // Agregar el botón al array de botones de niveles

    nivelButton.addEventListener('click', function() {
      const nivel = i;

      if (nivelgame.includes(nivel)) {
        nivelCurrent = nivel
        mostrarPalabrasNivel(nivel);
      }
    });
  }
  
});

  // Ocultar los botones de niveles
  /* nivelButtons.forEach(function(button) {
    button.style.display = 'none';
  }); */

//funcion que muestra las primeras 5 palabras 
function mostrarPalabrasNivel(nivelCurrent) {
  // oculta los botones 
  nivelButtons.forEach(function(button) {
    button.style.display = 'none';
    score.style.display = 'block';
    scoreH.style.display = 'block'
  });
  // Obtener las palabras aleatorias del nivel

  if(nivelCurrent==1 || nivelCurrent==2) {
    totalWords = nivelCurrent*10;
    win = totalWords*0.7
  }
  if(nivelCurrent==3) {
    totalWords = nivelCurrent*10-5;
    win = totalWords*0.75
  }

  if(nivelCurrent==4){
    totalWords = nivelCurrent*10-10;
    win = totalWords*0.8
  }

  if(nivelCurrent==5){
    totalWords = nivelCurrent*10-15;
    win = totalWords*0.8
  }
  if(nivelCurrent== 6){
    totalWords = nivelCurrent*10-20;
    win = totalWords*0.85
  }

  if(nivelCurrent==7){
    totalWords = nivelCurrent*10-20;
    win = totalWords*0.9
  }

  if(nivelCurrent==8) {
    totalWords = nivelCurrent*10-20;
    win = totalWords*0.9
  }

  if(nivelCurrent==9){
    totalWords = nivelCurrent*10-20;
    win = totalWords*0.95
  }

  if(nivelCurrent==10){
    totalWords = nivelCurrent*10;
    win = totalWords
  }

  const palabrasNivel = obtenerPalabrasAleatorias(totalWords, palabras);

  // Mostrar la primera palabra inmediatamente
  const primeraPalabraElement = document.createElement('h3');
  primeraPalabraElement.textContent = palabrasNivel[0];
  nivelsContainer.appendChild(primeraPalabraElement);
  palabrasMostradas.push(palabrasNivel[0]);

  // Eliminar la primera palabra después de un breve retraso
  setTimeout(function() {
    primeraPalabraElement.remove();
  }, 5000);

  // Mostrar las palabras restantes después de cada 5 segundos
  let index = 1;
  const intervalo = setInterval(function() {
    if (index >= palabrasNivel.length) {
      clearInterval(intervalo);
      /* mostrarOpciones(palabrasMostradas); */
      begginGame.style.display = 'block'
      return;
    }
    const palabraElement = document.createElement('h3');
    palabraElement.textContent = palabrasNivel[index];
    nivelsContainer.appendChild(palabraElement);
    palabrasMostradas.push(palabrasNivel[index]);
    index++;

    // Eliminar la palabra mostrada después de 5 segundos
    setTimeout(function() {
      palabraElement.remove();
    }, 4800);
  }, 5000);
}
//funcion que muestra las palabras aletorias con todos los jugadores 
function mostrarOpciones() {
  btnsOptions.style.display = 'block';

  if(nivelCurrent==1 || nivelCurrent==2) {
    totalWords = nivelCurrent*10;
  }
  if(nivelCurrent==3) {
    totalWords = nivelCurrent*10-5;
  }

  if(nivelCurrent==4){
    totalWords = nivelCurrent*10-10;
  }

  if(nivelCurrent==5){
    totalWords = nivelCurrent*10-15;
  }
  if(nivelCurrent== 6){
    totalWords = nivelCurrent*10-20;
  }

  if(nivelCurrent==7){
    totalWords = nivelCurrent*10-20;
  }

  if(nivelCurrent==8) {
    totalWords = nivelCurrent*10-20;
  }

  if(nivelCurrent==9){
    totalWords = nivelCurrent*10-20;
  }

  if(nivelCurrent==10){
    totalWords = nivelCurrent*10;
  }

  btnYes.classList.add('desbloqueado');
  btnNot.classList.add('desbloqueado');
  let palabrasAleatorias = obtenerPalabrasAleatorias(totalWords, palabras);
  // ejecuto un bucle para que las palabras no se repitan 
  while (!sonDiferentes(palabrasMostradas, palabrasAleatorias)) {
    palabrasAleatorias = obtenerPalabrasAleatorias(totalWords, palabras);
  }
  // concateno las palabras mostradas y las nuevas palabras totalmente diferentes 
  const palabrasAMostrar = [...palabrasMostradas, ...palabrasAleatorias];
  // cambio los indices del array par mostrarlas aletoriamentes 
  shuffleArray(palabrasAMostrar);

  const primeraPalabraElement = document.createElement('h3');
  primeraPalabraElement.textContent = palabrasAMostrar[0];
  nivelsContainer.appendChild(primeraPalabraElement);
  palabrasAle.push(palabrasAMostrar[0]);

  setTimeout(function() {
    primeraPalabraElement.remove();
    if (!press) {
      smark.style.display = 'block';
    }
  }, 7000);

  setTimeout(function() {
      smark.style.display = 'none';
  }, 7300);

  let index = 1;
  const intervalo = setInterval(function() {
    if (index >= palabrasAMostrar.length) {
      clearInterval(intervalo);
      if(punctuation=>win) {
        desbloquearSiguienteNivel(nivelCurrent)
        const nivelnext = nivelgame[nivelgame.length-1];
        updateUser(user,nivelnext)
      }
      endGame();
      /* nivelButtons.forEach(function(button) {
        button.style.display = 'block';
      }); */
      
      return;
    }
    
    const palabraElement = document.createElement('h3');
    palabraElement.textContent = palabrasAMostrar[index];
    nivelsContainer.appendChild(palabraElement);
    palabrasAle.push(palabrasAMostrar[index]);
    palabraPantalla = palabrasAMostrar[index];
    press = false;
    
 
      btnYes.classList.remove('bloqueado');
      btnNot.classList.remove('bloqueado');
      btnYes.classList.add('desbloqueado');
      btnNot.classList.add('desbloqueado');


    index++;

    setTimeout(function() {
      if (!press) {
        smark.style.display = 'block';
      }
    }, 7900);
  
    setTimeout(function() {
        smark.style.display = 'none';
    }, 8000);

    setTimeout(function() {
      palabraElement.remove();
    }, 7980);
  }, 8000);
}





// Función para obtener un número específico de palabras aleatorias de un array
function obtenerPalabrasAleatorias(numeroPalabras, array) {
  const palabrasAleatorias = [];
  const copiaArray = [...array]; // Copiar el array original para no modificarlo directamente

  for (let i = 0; i < numeroPalabras; i++) {
    const indiceAleatorio = Math.floor(Math.random() * copiaArray.length);//obtenemos un indice aletorio
    const palabraAleatoria = copiaArray.splice(indiceAleatorio, 1)[0];//sacamos el contenido de ese indice
    palabrasAleatorias.push(palabraAleatoria);//guardamos la plabra en el array 
  }
  

  return palabrasAleatorias;
}
// funcion para verificar si los array son diferentes para que no repitan las palabras mostradas 
function sonDiferentes(arr1, arr2) {
  // Verificar si los arrays tienen la misma longitud
/*   if (arr1.length !== arr2.length) {
    return true;
  } */

  // Verificar si cada elemento de arr1 es diferente al correspondiente en arr2
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      return false;
    }
  }

  return true;
}

// funcion que cambia los indices del array para mostrarlos aletoriamente
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//define 
btnYes.addEventListener('click', function() {
  if (press==false) {
    isBtnYesLocked = true; // Bloquear el botón "Yes"
    isBtnNotLocked = true;
    btnYes.classList.add('bloqueado');
    btnNot.classList.add('bloqueado');
    press = true;
    
    if (palabrasMostradas.includes(palabraPantalla)) {
      punctuation++;
      score.textContent = punctuation;
      check.style.display = 'block';
    }
    else {
      smark.style.display = 'block';
    }

    setTimeout(function() {
      check.style.display = 'none';
      smark.style.display = 'none'; 
    }, 1000);  
  }
});

btnNot.addEventListener('click', function() {
  if (press==false) {
    isBtnYesLocked = true; // Bloquear el botón "Yes"
    isBtnNotLocked = true;
    btnYes.classList.add('bloqueado');
    btnNot.classList.add('bloqueado');
    press = true;
    
    if (!palabrasMostradas.includes(palabraPantalla)) {
      check.style.display = 'block';
      punctuation++;
      score.textContent = punctuation;
    }
    else{
      smark.style.display = 'block'
    }

    setTimeout(function() {
      check.style.display = 'none';
      smark.style.display = 'none' 
    }, 1000);  
  }
});

 
// funcion que se encarga de desbloquear el siguiente nivel 
function desbloquearSiguienteNivel(nivelActual) {
  const nivelButton = document.querySelector('.nivel-' + nivelActual);

  if (nivelButton) {
    nivelButton.classList.remove('bloqueado');
    nivelButton.classList.add('desbloqueado');

    // Desbloquear el siguiente nivel si existe
    const siguienteNivel = nivelActual + 1;
    const siguienteNivelButton = document.querySelector('.nivel-' + siguienteNivel);

    if (siguienteNivelButton) {
      siguienteNivelButton.classList.remove('bloqueado');
      siguienteNivelButton.classList.add('desbloqueado');

      // Agregar el siguiente nivel a la lista de niveles desbloqueados
      if(!nivelgame.includes(siguienteNivel)){
        nivelgame.push(siguienteNivel);
      }
    }
  }
}

//funcion que obtiene las palabras del archivo txt
function leerArchivo() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var contenido = this.responseText;
      var arrayDatos = contenido.split('\n'); // Divide el contenido por líneas 
      /* var arrayDatos = contenido.filter(Boolean);  */ // Elimina las líneas vacías

      palabras = arrayDatos // Imprime el array de datos en la consola
    }
  };

  xhttp.open("GET", "diccionario.txt", true);
  xhttp.send();
}
// funcion que trae todos los usuarios
function bringUsers() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var contenido = this.responseText;
      var arrayDatos = contenido.split('\n'); // Divide el contenido por líneas 
      /* var arrayDatos = contenido.filter(Boolean);  */ // Elimina las líneas vacías

      users = arrayDatos; // Asigna los datos al array de usuarios
      console.log(users); // Imprime el array de usuarios en la consola

      // Aquí puedes realizar cualquier manipulación adicional de los datos
    }
  };

  xhttp.open("GET", "usuarios.txt", true);
  xhttp.send();
}

//funcion que agrega un usuario
function addUser(texto) {
  fetch('http://localhost:3000/escribirArchivo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ palabra: texto }),
})
  .then((response) => {
    if (response.ok) {
      console.log('Palabra guardada correctamente');
    } else {
      console.log('Error al guardar la palabra');
    }
  })
  .catch((error) => {
    console.error('Error en la solicitud:', error);
  });
}

//funcion que crea los niveles 
function createNivels(num) {
  for(let i = 1; i <= num; i++) {
    nivelgame.push(i);
  }
}

// funcion que  consegui los los datos del jugador
function findUser(array, palabraBuscada) {
  for (let i = 0; i < array.length; i++) {
    const elemento = array[i].split(':');
    const palabra = elemento[0];
    const numero = parseInt(elemento[1]);
    
    if (palabra === palabraBuscada) {
      return {
        palabra: palabra,
        numero: numero
      };
    }
  }
  
  return null; // Si la palabra no se encuentra en el array, se devuelve null
}
//funcion que actualiza el nivel del jugador
function updateUser(user,nivel) {
  fetch('http://localhost:3000/actualizarArchivo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ nombre: user, numero: nivel }),
})
  .then((response) => {
    if (response.ok) {
      console.log('nivel actualizado correctamente');
    } else {
      console.log('Error al actualizar nivel');
    }
  })
  .catch((error) => {
    console.error('Error en la solicitud:', error);
  });
}

//funcion que determina que hacer cuando se termine el juego 
function endGame() {
  btnYes.style.display = 'none';
  btnNot.style.display = 'none';
  result = punctuation
  if(result>=win){

    alert( `felicidades tu puntuacion fue ${result} desbloqueaste el siguiente nivel `);

  }
  if(result<win){
    
    alert(`lo sentimos tu puntaje fue ${result} no desbloqueaste el siguiente nivel suerte para la proxima `);
    
  }
  punctuation = 0
  score.style.display = 'none';
  scoreH.style.display = 'none';
  nivelButtons.forEach(function(button) {
    button.style.display = 'block';
    button.style.marginLeft = '400px';
  });

  btnHome.style.display = 'block';
}