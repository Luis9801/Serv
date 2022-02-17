window.onload = function() {
   database.ref('/servosolar').update({
      Boton:0});
      boton=0;
}

var database = firebase.database();

// here I will assume that this function simply 
// updates the contents of the element with a value
var updateStarCount = function(element, value) {
   element.textContent = value;
};

var postElement = document.getElementById("selector");
var esp= postElement.innerHTML;

var slider = document.getElementById("servoslider");
var selector = document.getElementById("selector");

var postElement1 = document.getElementById("postElement1");
var boton = postElement1.innerHTML;

var postElement2 = document.getElementById("postElement2");
var esp = postElement2.innerHTML;

var postElement3 = document.getElementById("postElement3");
var html = postElement3.innerHTML;


var checkbox= document.getElementById("switch-label");
var check = document.getElementById("check");
checkbox.addEventListener('click', function() {
  if(checkbox.checked) {
    check.innerText = 'Control Web (Slider)';
    database.ref('/servosolar').update({
     Boton:1});
     boton=1;
     postElement1.innerHTML = boton;


  } else {
    check.innerText = 'Control manual (ESP32)';
    database.ref('/servosolar').update({
     Boton:0});
     boton=0;
     postElement1.innerHTML = boton;
 
     var starCountRef = firebase.database().ref('/servosolar' + '/AnguloEsp32');
     starCountRef.on('value', function(snapshot) {
         var esp32=snapshot.val();
         updateStarCount(postElement, esp32);
         selector.innerHTML = "Ángulo del servomotor = "+esp32+" º";
         slider.value=esp32;
     });  

  }
});


slider.oninput = function() {
  if(boton==1){
   database.ref('/servosolar').update({
      AnguloHTML:Number(slider.value)});
      selector.innerHTML = "Ángulo del servomotor = "+slider.value+" º";

  }
  if(boton==0){

   var starCountRef = firebase.database().ref('/servosolar' + '/AnguloEsp32');
   starCountRef.on('value', function(snapshot) {
       var esp32=snapshot.val();
       updateStarCount(postElement, esp32);
       selector.innerHTML = "Ángulo del servomotor = "+esp32+" º";
       slider.value=esp32;


   });  

  }

}




var starCountRef = firebase.database().ref('/servosolar' + '/AnguloEsp32');
starCountRef.on('value', function(snapshot) {
    var esp32=snapshot.val();
    updateStarCount(postElement2, esp32);
    if(boton==0){     
      selector.innerHTML = "Ángulo del servomotor = "+esp32+" º";
      slider.value=esp32;
      database.ref('/servosolar').update({
         AnguloHTML:Number(slider.value)});
    }
    if(boton==1){
      selector.innerHTML = "Ángulo del servomotor = "+slider.value+" º";
    }
});



var starCountRef = firebase.database().ref('/servosolar' + '/AnguloHTML');
starCountRef.on('value', function(snapshot) {
    var htmljs=snapshot.val();
    updateStarCount(postElement3, htmljs);

});










//var postElement1 = document.getElementById("postElement1");
//var paro= postElement1.innerHTML;

//var postElement2 = document.getElementById("postElement2");
//var inic= postElement2.innerHTML;

//var postElement3 = document.getElementById("postElement3");
//var repet= postElement3.innerHTML;


//var starCountRef = firebase.database().ref('servosolar/' + '/AnguloEsp32');
//starCountRef.on('value', function(snapshot) {
    //var iniciando=snapshot.val();
    //updateStarCount(postElement2, iniciando);
//});

//var starCountRef = firebase.database().ref('servosolar/' + '/AnguloHTML');
//starCountRef.on('value', function(snapshot) {
 //   var data=snapshot.val();
 //   updateStarCount(postElement1, data);
//});

///var starCountRef = firebase.database().ref('servosolar/' + '/Boton');
//starCountRef.on('value', function(snapshot) {
//    var repitiendo=snapshot.val();
 //   updateStarCount(postElement3, repitiendo);
//});












 







