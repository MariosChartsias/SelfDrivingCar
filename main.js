const canvas=document.getElementById("myCanvas");

const ctx=canvas.getContext("2d");
var mouse=new Mouse(1,0); //for personal use
const car= new Car(window.innerWidth/2,window.innerHeight/2,30,50);

animate();

function animate(){
    
    car.update();
    canvas.width=window.innerWidth; // the width of road
    canvas.height=window.innerHeight; //it fits all the height because it's inside of requestAnimationFrame
    car.draw(ctx); 
    
    
    requestAnimationFrame(animate); //repeat the function animate with 60fps

}

