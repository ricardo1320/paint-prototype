//Objeto con los valores de las teclas de las flechas, su valor KeyCode.
var teclas = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

//Variables para contexto de Canvas
var cuadrito = document.getElementById("area_dibujo");
var papel = cuadrito.getContext("2d");
//Agregar eventos al objeto de Canvas para dibujar con el mouse (o con el dedo en pantalla touch)
cuadrito.addEventListener("mousedown", clickMouse); //Hacer click
cuadrito.addEventListener("mousemove", moveMouse); //Mover mouse
cuadrito.addEventListener("mouseup", quitMouse); //Quitar click

//Variables para el boton de limpiar lienzo al evento del click
var button_clear = document.getElementById("clear_button");
button_clear.addEventListener("click", clearLienzo);

//Variables para cambiar el color
var selectColor = document.getElementById("select_color");
selectColor.addEventListener("change", changeColor, false);

//Objeto para el borrador
var eraser = document.getElementById("eraser");
eraser.addEventListener("click", erase);

//Objeto para manipular el tamaño del lapiz
var pencilSize = document.getElementById("sizePencil");

//Agregar evento que se dispara al presionar(keydown) o dejar de presionar(keyup) una tecla del teclado
document.addEventListener("keydown", dibujarTeclado);

//------------ Variables Globales ------------
//Punto inicial
var x = 500;
var y = 250;
//Color global, negro por default
var color = "#000000";
//Variable auxiliar para dibujar con el mouse
var drawing = false;
//Variable para tamaño de lapiz
var lineWidth = pencilSize.value;
//---------------------------------------------

//---------------- Funciones ------------------
//Funcion para dibujar linea
function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal, lienzo){
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = lineWidth;
  lienzo.moveTo(xinicial,yinicial);
  lienzo.lineTo(xfinal,yfinal);
  lienzo.stroke();
  lienzo.closePath();
}

//Crear funcion que se dispara al presionar (o dejar de presionar) una tecla
function dibujarTeclado(evento){
  var movimiento = 10; //Moverse de 10 en 10 pixeles

  //Switch para los casos de las 4 flechas, comparar keyCode.
  switch(evento.keyCode){
    case teclas.UP:
      dibujarLinea(color, x, y, x, y-movimiento, papel);
      //Importante mantener el punto donde nos quedamos
      y = y - movimiento;
    break;
    case teclas.DOWN:
    dibujarLinea(color, x, y, x, y+movimiento, papel);
    y = y + movimiento;
    break;
    case teclas.LEFT:
    dibujarLinea(color, x, y, x-movimiento, y, papel);
    x = x - movimiento;
    break;
    case teclas.RIGHT:
    dibujarLinea(color, x, y, x+movimiento, y, papel);
    x = x + movimiento;
    break;
    default:
      console.log("Otra tecla")
  }
}

//Crear funcion que se dispara al presionar mouse
//Guardamos las coordenadas y epezamos dibujo
function clickMouse(evento){
  //console.log(evento)
  x = evento.layerX;
  y = evento.layerY;
  drawing = true;
}

//Crear funcion que se dispara al mover mouse
function moveMouse(evento){
  //console.log(evento)
  if(drawing == true){
    dibujarLinea(color, x, y, evento.layerX, evento.layerY, papel);
    x = evento.layerX;
    y = evento.layerY;
  }
}

//Crear funcion que se dispara al quitar mouse
function quitMouse(evento){
  //console.log(evento)
  drawing = false;
}

//Funcion para limpiar lienzo
function clearLienzo(){
  location.reload();
}

//Funcion para cambiar el color
function changeColor(evento){
  //console.log(evento.target.value)
  color = evento.target.value;
}

//Funcion para borrar trazos
function erase(){
  color = "white";
}

//Funcion para cambiar el tamaño del lapiz
pencilSize.onchange = function() {
  lineWidth = this.value;
}
//---------------------------------------------
