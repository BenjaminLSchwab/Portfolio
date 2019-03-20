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
    var GreySquarexVal = 500 * Math.sin(counter * 0.4);
    //  parallaxTranslate(-0.2, BigYellowCircle); //negative because scrollbar moves down and I want the element to move up
    //  parallaxTranslate(-0.4, GreenPentagon);
    parallaxTranslate(-0.6, BlueSquare);
    GreySquare.style.transform = "translate(" + GreySquarexVal + "px, "+GreySquarexVal * .1+"px)";
    swapZ(GreySquare, 100, CountingUp);

    requestAnimationFrame(scrollLoop); //This is what makes the function loop
 }
 
 //Translates an object using element style
 function parallaxTranslate(parallaxValue, el){
     el.style.transform = "translate3d(0, " + yScrollPos * parallaxValue + "px, 0)" ; 
 }

 function OrbitCounter(){
     var percentToGoal = Math.abs( counter / (Math.PI/2));
    //  Display.innerHTML = percentToGoal;
     var slow = Math.max( 1 - (percentToGoal * .8), 0.2);


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

 


 
 
 