const arrayHobbies = [];
const alfabeto = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVñÑ"
const numeros = "0123456789"

function agregar() {
    const input = document.getElementById("itemInput");
    const hobby = input.value;
    const errorSpan = document.getElementById("error-hobby");
    if (hobby != "") {
        arrayHobbies.push(hobby);
        actualizar();
        input.value = "";
    }
    if (arrayHobbies.length < 2) {
      errorSpan.innerText = "Debe ingresar al menos 2 aficiones.";
    } else {
      errorSpan.innerText = ""; 
  }
}

function actualizar() {
    const ul = document.getElementById("dynamicList");
    ul.innerHTML = "";
    for (let i = 0; i < arrayHobbies.length; i++) {
        const li = document.createElement("li");
        li.innerText = arrayHobbies[i];
        li.className = "list-group-item";
        ul.appendChild(li);
    }
}

function verfDigitos(campo){
  let i = 0;
  let verf = true;
  const largo = campo.length;

  while (i < largo && verf == true){
    if (!numeros.includes(campo[i])){
      i++;
    }else{
      verf = false;
    }  
  }
  while (i < largo){
    if (numeros.includes(campo[i])){
      i++;
    }else{
      return false;
    }
  }
  return true;
}

function verfEspeciales(campo){
  for (let i = 0; i < campo.length; i++){
    if (!alfabeto.includes(campo[i]) && !numeros.includes(campo[i])){
      return false;
    }
  }
  return true;
}

function validarUserName(campo){
  const valor = campo.value.trim();
  let mensajeError = "";

  const errorSpan = document.getElementById("error-userName");

  if (requerido(campo) == false){
    return; 
  }

  if (valor.length < 5){
    mensajeError = "Su nombre de usuario no puede ser más corto que 5 caracteres.";
  } else if (valor.length > 10){
    mensajeError = "Su nombre de usuario no puede ser más largo que 10 caracteres";
  } else if (!alfabeto.includes(valor[0])){
    mensajeError = "Su nombre de usuario debe comenzar con una letra";
  } else if (verfDigitos(valor) == false){
    mensajeError = "No puede haber letras después de un número";
  } else if (verfEspeciales(valor) == false){
    mensajeError = "Su nombre no puede contener caracteres especiales.";
  }


  if (mensajeError !== "") {
    errorSpan.innerText = mensajeError; 
  } else {
    errorSpan.innerText = "";           
  }
}

function validarTelefono(campo){
  const valor = campo.value.trim();
  let mensajeError = "";

  const errorSpan = document.getElementById("error-telefono");

  if (requerido(campo) == false){
    return; 
  }

  if (valor.length != 9){
    mensajeError = "Su numero de telefono debe tener 9 digitos.";
  }else if(valor[0] != 9){
    mensajeError = "Su numero debe comenzar con el numero 9";
  }else{
    for (let i = 0; i<valor.length ; i++){
      if(!numeros.includes(valor[i])){
        mensajeError = "Su numero solo puede contener valores numericos (sin espacios ni caracteres especiales)";
        break;
      }
    }
  }
  if (mensajeError !== "") {
    errorSpan.innerText = mensajeError;
  } else {
    errorSpan.innerText = "";
  }
}

function validarURL(campo) {
  const valor = campo.value.trim();
  let mensajeError = "";

  const errorSpan = document.getElementById("error-url");

  if (valor === "") {
    errorSpan.innerText = "";
    return;
  }

  let inicio = "";
  for (let i = 0; i < 4; i++) {
    if (valor[i]) {
      inicio += valor[i];
    }
  }

  if (inicio !== "www.") {
    mensajeError = "La dirección web debe comenzar estrictamente con www.";
  }else {
    let segundoPunto = false;
    let puntosVerf = false;
    let dominio = 0;

    if (valor[4] === ".") {
      puntosVerf = true;
    }

    for (let i = 4; i < valor.length; i++) {
      dominio++;

      if (valor[i] === ".") {
        segundoPunto = true;

        if (valor[i + 1] === ".") {
          puntosVerf = true;
        }
      }
    }

    if (puntosVerf == true) {
      mensajeError = "La URL no puede contener puntos seguidos.";
    } else if (dominio == 0) {
      mensajeError = "Falta el nombre del dominio después del www.";
    } else if (valor[valor.length - 1] === ".") {
      mensajeError = "La URL no puede terminar con un punto.";
    } else if (segundoPunto == false) {
      mensajeError = "Formato inválido. Falta el punto de la extensión (ejemplo: www.sitio.cl).";
    }
  }


  if (mensajeError !== "") {
    errorSpan.innerText = mensajeError;
  } else {
    errorSpan.innerText = "";
  }
}

function validarContra(campo){
  const valor = campo.value.trim();
  let mensajeError = "";

  const errorSpan = document.getElementById("error-contra");

  if (requerido(campo) == false){
    return; 
  }
  if (valor.length < 3){
    mensajeError = "Su contraseña debe tener mas de 2 caracteres";
  } else if(valor.length > 6){
    mensajeError = "Su contraseña debe tener menos de 7 caracteres";
  }else{
    let letra = false;
    let numero = false;
    let i = 0;
    while (i < valor.length && (!letra || !numero)){
      if (alfabeto.includes(valor[i])){
        letra = true;
      }else if (numeros.includes(valor[i])){
        numero = true;
      }
      i++;
    }
    if (letra == false){
      mensajeError = "Su contraseña debe contener al menos una letra";
    } else if (numero == false){
      mensajeError = "Su contraseña debe contener al menos un numero";
    }
    }


  if (mensajeError !== "") {
    errorSpan.innerText = mensajeError;
  } else {
    errorSpan.innerText = "";
  }

  const campoConfirmacion = document.getElementById("confirmarContra");

  if (campoConfirmacion.value.trim() !== "") {
    validarConfirmarContra(campoConfirmacion);
  }
}

function validarConfirmarContra(campo){
  const valor = campo.value.trim();
  let mensajeError = "";

  const errorSpan = document.getElementById("error-confirmarContra");

  if (requerido(campo) == false){
    return; 
  }

  const primeraContra = document.getElementById("contra").value.trim();  

  if (valor !== primeraContra) {
    mensajeError = "Las contraseñas no coinciden. Intente nuevamente.";
  }

  if (mensajeError !== "") {
    errorSpan.innerText = mensajeError;
  } else {
    errorSpan.innerText = "";
  }
}

function requerido(campo){
  const valor = campo.value.trim();
  const errorSpan = document.getElementById(`error-${campo.id.replace('Input', '')}`);

  if (valor == ""){
    errorSpan.innerText = "Este campo es obligatorio";
    return false;
  }else{
    if (errorSpan.innerText == "Este campo es obligatorio"){
      errorSpan.innerText = "";
      
    }
  return true;
  }
}

function validarFormulario() {
  
  const camposObligatorios = ["userNameInput", "contra", "confirmarContra", "telefono", "select", "direccion"];
  for (let i = 0; i < camposObligatorios.length; i++) {
    const campo = document.getElementById(camposObligatorios[i]);
    
    if (campo) {
      requerido(campo); 
    }
  }
  
  let erroresActivos = 0;
  const txtUsuario = document.getElementById("userNameInput").value.trim();
  const campoContra = document.getElementById("contra");
  
  if (txtUsuario !== "" && campoContra.value.includes(txtUsuario)) {
    document.getElementById("error-contra").innerText = "No puede contener el usuario.";
  }
  if (arrayHobbies.length < 2) {
    document.getElementById("error-hobby").innerText = "Mínimo 2 aficiones.";
  }

  const parentDiv = document.getElementById('formulario');
  const spans = parentDiv.querySelectorAll('.error-message');
  spans.forEach(span => {
    if (span.innerText.trim() !== "") {
      erroresActivos++; 
    }
  });


  if (erroresActivos > 0) {
    alert("No se puede enviar. Tienes " + erroresActivos + " errores pendientes.");
  } else {
    alert("¡Todo perfecto! Enviando formulario...");
  }
}