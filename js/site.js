
 window.addEventListener("DOMContentLoaded", scrollLoop, false); //causes scrollLoop function to be called once at start

 var BigYellowCircle = document.getElementById("BigYellowCircle");
 var GreenPentagon = document.getElementById("GreenPentagon");
 var BlueSquare = document.getElementById("BlueSquare");
 
 var yScrollPos;
 
 function scrollLoop(e){
     yScrollPos = window.scrollY; //get scrollbar position
 
     parallaxTranslate(-0.2, BigYellowCircle); //negative because scrollbar moves down and I want the element to move up
     parallaxTranslate(-0.4, GreenPentagon);
     parallaxTranslate(-0.6, BlueSquare);
 
     requestAnimationFrame(scrollLoop); //This is what makes the function loop
 }
 
 //Translates an object using element style
 function parallaxTranslate(parallaxValue, el){
     el.style.transform = "translate3d(0, " + yScrollPos * parallaxValue + "px, 0)" ; 
 }
 
 
 