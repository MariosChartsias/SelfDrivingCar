const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200; // the width of road
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300; // the width of road

const carCtx=carCanvas.getContext("2d");
const networkCtx=networkCanvas.getContext("2d");
const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
N=200;
const cars= generateCars(N);
let bestCar=cars[0]; //initializing the bestcar variable
if(localStorage.getItem("bestBrain")){ //it loads the best car we ever found on this simulation
    for(let i=0;i<cars.length;i++){ 
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1); //loads all cars based on the best brain car(weights and biases)
        }
    }
}
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-900,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-900,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-1200,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-1200,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-1500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-1500,30,50,"DUMMY",2)
];

animate();

function save(){
    localStorage.setItem("bestBrain", //saving the best case of car in local sorage
    JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));

    }
    return cars;
}

function animate(time){
    for(let i=0; i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0; i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    //cars.find they called fitness functions
    bestCar=cars.find(  //we focus on the car with the lognest distance from the starting point
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));
    
    
    
    carCanvas.height=window.innerHeight; //it fits all the height because it's inside of requestAnimationFrame
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);
    road.draw(carCtx); //first the road
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=0.1;
    for(let i=0; i<cars.length;i++){
        cars[i].draw(carCtx,"blue"); 
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue",true);
    
    carCtx.restore();

    networkCtx.lineDashOffset=-time/75;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate); //repeat the function animate with 60fps

}

