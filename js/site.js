window.addEventListener("DOMContentLoaded", scrollLoop, false); //causes scrollLoop function to be called once at start
 


 var BlueSquare = document.getElementById("BlueSquare");
 var GreySquare = document.getElementById("GreySquare");
 var counter = 0;
 
 var yScrollPos;

 function scrollLoop(e){
    counter ++; 
    yScrollPos = window.scrollY; //get scrollbar position
    var GreySquarexVal = 500 * Math.sin(counter * 0.01);
    //  parallaxTranslate(-0.2, BigYellowCircle); //negative because scrollbar moves down and I want the element to move up
    //  parallaxTranslate(-0.4, GreenPentagon);
    parallaxTranslate(-0.6, BlueSquare);
    GreySquare.style.transform = "translate(" + GreySquarexVal + "px, "+GreySquarexVal * .1+"px)";

    requestAnimationFrame(scrollLoop); //This is what makes the function loop
 }
 
 //Translates an object using element style
 function parallaxTranslate(parallaxValue, el){
     el.style.transform = "translate3d(0, " + yScrollPos * parallaxValue + "px, 0)" ; 
 }

 


 
 
 