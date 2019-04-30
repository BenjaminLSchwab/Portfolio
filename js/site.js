window.addEventListener("DOMContentLoaded", scrollLoop, false); //causes scrollLoop function to be called once at start
 


 var BlueSquare = document.getElementById("BlueSquare");
 var GreySquare = document.getElementById("GreySquare");
 var Display = document.getElementById("Display");

 var counter = 0.0;
 var CountingUp = true;
 
 var yScrollPos;

 function scrollLoop(e){
     
    OrbitCounter();

    yScrollPos = window.scrollY; //get scrollbar position
    var GreySquarexVal = 70 * Math.sin(counter * 0.4);
    //  parallaxTranslate(-0.2, BigYellowCircle); //negative because scrollbar moves down and I want the element to move up
    //  parallaxTranslate(-0.4, GreenPentagon);
    parallaxTranslate(-0.6, BlueSquare);
    GreySquare.style.transform = "translate(" + GreySquarexVal + "em, "+GreySquarexVal * .1+"em)";
    swapZ(GreySquare, 100, CountingUp);

    requestAnimationFrame(scrollLoop); //This is what makes the function loop
 }
 
 //Translates an object using element style
 function parallaxTranslate(parallaxValue, el){
     el.style.transform = "translate3d(0, " + yScrollPos * parallaxValue + "em, 0)" ; 
 }

 function OrbitCounter(){
     var percentToGoal = Math.abs( counter / (Math.PI/2));
    //  Display.innerHTML = percentToGoal;
     var slow = Math.max( 1 - (percentToGoal * .8), 0.2) * 1.5;


     if(Math.abs(counter) > (Math.PI/2)){
        CountingUp = (!CountingUp);
     }

     if(CountingUp){
        counter += (Math.PI / 100) * slow;
     }
     else{
        counter -= (Math.PI / 100) * slow;
     }
 }

 function swapZ(obj, zVal, toggle){
    if(toggle){
        obj.style.zIndex = zVal;
    }
    else{
        obj.style.zIndex = -zVal;
    }
 }

 function PointOnCircle(radians, radius){
    var xpos = radius * Math.sin(radians);
    var ypos = radius * Math.cos(radians);
    return {xpos, ypos};
 }

 function GetRadianForOrbit(start, speed = 1, slowIntesity = 1, slowSpread = 0, eccentricity = 1){
    var increment = (2 * Math.PI);
    increment *= .01;
    increment *= speed;

   var distanceToEdge = Math.min(Math.abs(start - (2* Math.PI)), Math.abs(start - Math.PI));
   var usingEccentricity = (Math.abs(start - (2* Math.PI)) > Math.abs(start - Math.PI) );

   if(distanceToEdge < slowSpread){ 
      increment *= (slowIntesity * distanceToEdge);
   }

   if(usingEccentricity){
      increment *= eccentricity;
   }

   return start + increment;
 }
 

 


 
 
 