const canvas=document.getElementById("myCanvas");
canvas.width=200; // the width of road
const ctx=canvas.getContext("2d");
const car= new Car(100,100,30,50);

animate();

function animate(){
    
    car.update();
    canvas.height=window.innerHeight; //it fits all the height because it's inside of requestAnimationFrame
    car.draw(ctx); 
    
    
    requestAnimationFrame(animate); //repeat the function animate with 60fps

}

