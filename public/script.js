


// Obtener elementos del DOM
var apodoInput = document.getElementById('nickName');
var getInto = document.getElementById('getInto');
var login = document.getElementById('login');
var btnLogin = document.getElementById('btnSave');
var btnsPlay = document.getElementById('btns-Play');
var btnPlay = document.getElementById('btnPlay');
var nivelsContainer = document.getElementById('nivelsContainer');
var btnYes = document.getElementById('btnYes');
var btnsOptions = document.getElementById('btnsOptions');
var score = document.getElementById('score');
var check = document.getElementById('check');



let palabras  /* ['camisa','sorteo','barco','sandalia','loma','peru','hola',"zeus","afrodita", "grisales","conejo","rabia","acelerador","manuales","gorro"] */
// array para comparar las palabras
const palabrasMostradas = [];

const palabrasAle = [];
//para comparar las palabras que salen en pantalla
let palabraPantalla;
//
 let punctuation = 0;

 let press = false;

 let nivelgame = [1]

 let nivelButtons = [];

 let nivelCurrent; 

 let users;
 
 
var isBtnYesLocked = false; // Variable para controlar el bloqueo del botón "Yes"
var isLevelButtonLocked = false; // Variable para controlar el bloqueo de los botones de nivel

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
  if(users.includes(texto)) alert("welcome again")
  else {
    alert("user created")
    addUser(texto)
  }
  login.style.display = 'none';
  btnsPlay.style.display = 'block';
});

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


function mostrarPalabrasNivel(nivel) {
  // oculta los botones 
  nivelButtons.forEach(function(button) {
    button.style.display = 'none';
  });

  // Obtener las palabras aleatorias del nivel
  const palabrasNivel = obtenerPalabrasAleatorias(5, palabras);

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
      mostrarOpciones(palabrasMostradas);
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
    }, 4500);
  }, 5000);
}

function mostrarOpciones() {
  btnsOptions.style.display = 'block';
 /*  const puntaje = document.createElement('h1');
  puntaje.textContent = 0;
  nivelsContainer.appendChild(puntaje); */

   /* btnNot.style.display = 'block';   */
  // creo un nuevo array con otras 5 palabras aletorias 
  let palabrasAleatorias = obtenerPalabrasAleatorias(5, palabras);
  // ejecuto un bucle para que las palabras no se repitan 
  while (!sonDiferentes(palabrasMostradas, palabrasAleatorias)) {
    palabrasAleatorias = obtenerPalabrasAleatorias(5, palabras);
  }
  // concateno las palabras mostradas y las nuevas palabras totalmente diferentes 
  const palabrasAMostrar = [...palabrasMostradas, ...palabrasAleatorias];
  // cambio los indices del array par mostrarlas aletoriamentes 
  shuffleArray(palabrasAMostrar);

  let index = 0;
  const intervalo = setInterval(function() {
    if (index >= palabrasAMostrar.length) {
      clearInterval(intervalo);
      if(punctuation>4) desbloquearSiguienteNivel(nivelCurrent)
      nivelButtons.forEach(function(button) {
        button.style.display = 'block';
      });
      console.log(nivelgame)
      
      return;
    }
    
    const palabraElement = document.createElement('h3');
    palabraElement.textContent = palabrasAMostrar[index];
    nivelsContainer.appendChild(palabraElement);
    palabrasAle.push(palabrasAMostrar[index]);
    palabraPantalla = palabrasAMostrar[index];
    press = false;
    index++;

    setTimeout(function() {
      palabraElement.remove();
    }, 3000);
  }, 4000);
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


btnYes.addEventListener('click', function() {
  if (press==false) {
    isBtnYesLocked = true; // Bloquear el botón "Yes"
    
    if (palabrasMostradas.includes(palabraPantalla)) {
      punctuation++;
      score.textContent = punctuation;
      press = true;
      check.style.display = 'block';
    }

    setTimeout(function() {
      check.style.display = 'none'; 
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