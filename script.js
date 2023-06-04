// Obtener elementos del DOM
var apodoInput = document.getElementById('nickName');
var getInto = document.getElementById('getInto');
var login = document.getElementById('login');
var btnLogin = document.getElementById('btnSave');

// Agregar evento al botón de "Ingresar"
getInto.addEventListener('click', function() {
    //ocultar el boton de ingresar y activa el login 
    getInto.style.display = 'none';
    login.style.display = 'block';
  
});

// Agregar evento al botón de "Guardar"
btnLogin.addEventListener('click', function() {
  var apodo = apodoInput.value; // Obtener el valor del input
  
  // Verificar si se ingresó un apodo válido
  if (apodo.trim() !== '') {
    localStorage.setItem('apodo', apodo); // Guardar apodo en Local Storage
    alert('Apodo guardado exitosamente');
  } else {
    alert('Ingrese un apodo válido');
  }
  login.style.display = 'none';
});
