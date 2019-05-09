window.addEventListener("DOMContentLoaded", scrollLoop, false); //causes scrollLoop function to be called once at start
 


 var BlueSquare = document.getElementById("BlueSquare");
 var GreySquare = document.getElementById("GreySquare");
 var Display = document.getElementById("Display");
 var StarDustPieces = new Array();
 var StarDustCounters = new Array();
 CreateStarDust();

 var counter = 0.0;
 var CountingUp = true;
 var greySquareRad = 0;
 
 var yScrollPos;

 function scrollLoop(e){
     
    OrbitCounter();
    MoveStarDust();
    greySquareRad = GetRadianForOrbit(greySquareRad);
    var GreySquareVal = PointOnCircle(greySquareRad, 4);

    yScrollPos = window.scrollY; //get scrollbar position
    //var GreySquarexVal = 70 * Math.sin(counter * 0.4);
    //  parallaxTranslate(-0.2, BigYellowCircle); //negative because scrollbar moves down and I want the element to move up
    //  parallaxTranslate(-0.4, GreenPentagon);
    GreySquare.style.transform = "translate(" + GreySquareVal.xpos + "em, 0)";
    GreySquare.style.zIndex = GreySquareVal.ypos;
    //swapZ(GreySquare, 1, CountingUp);

    requestAnimationFrame(scrollLoop); //This is what makes the function loop
 }
 
 //Translates an object using element style
 function parallaxScrollTranslate(parallaxValue, el){
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

 function CreateStarDust(){
    var dust = document.createElement("div");
    dust.classList.add("StarDust");
    dust.style.zIndex = Math.floor((Math.random() * 10) -5);
    var body = document.getElementById("B");
    body.style.zIndex = -100;
    var dustText = document.createTextNode(".");
    dust.appendChild(dustText);
    body.appendChild(dust);
    console.log("dust created");
    StarDustPieces.push(dust);
    StarDustCounters.push(0);
 }

 function MoveStarDust(){
    var i = 0;
    StarDustPieces.forEach(element => {

       console.log(StarDustCounters[i]);
      element.style.transform = "translate3d("+ (StarDustCounters[i] - 5) * (element.zIndex + 6)  * 0.1+"em, 0, 0)" ;
      

      StarDustCounters[i] -= 5;

      i++;
    });
 }
 

 


 
 
 