const canvas=document.getElementById("myCanvas");
canvas.width=200; // the width of road

const ctx=canvas.getContext("2d");
const road=new Road(canvas.width/2,canvas.width*0.9);
const car= new Car(road.getLaneCenter(1),100,30,50,"AI");
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2)
];

animate();

function animate(){
    for(let i=0; i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);
    
    canvas.height=window.innerHeight; //it fits all the height because it's inside of requestAnimationFrame
    
    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);
    road.draw(ctx); //first the road
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,"red");
    }
    car.draw(ctx,"blue"); 
    ctx.restore();
    requestAnimationFrame(animate); //repeat the function animate with 60fps

}

