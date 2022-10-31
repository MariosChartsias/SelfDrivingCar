class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        //this.maxx=window.innerWidth;
        //this.maxy=window.innerHeight;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=4;
        this.friction=0.05;
        this.angle=0;

        this.sensor=new Sensor(this);
        this.controls= new Controls();
    }
    update(roadBorders){
        this.#move();
        this.sensor.update(roadBorders);
    }
    
    
    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }
        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }
        if(this.speed>0){
            this.speed-=this.friction;
        }
        //if(this.x<30 || this.x>this.maxx*0.975||this.y<58 || this.y>this.maxy*0.955){
        //    this.speed*=-1.1;
        //}
        if(this.speed< 0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }
        if(Math.abs(this.speed)>0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }
        // if(this.x<20 || this.x>this.maxx*0.99||this.y<50 || this.y>this.maxy*0.98){
        //    this.x=window.innerWidth/2;
        //    this.y=window.innerHeight/2
        //}
        this.y-=Math.cos(this.angle)*this.speed;
        this.x-=Math.sin(this.angle)*this.speed;

        
       
    }

    draw(ctx){
        
        ctx.save();
        //ctx.font = "12px times new  roman"; //for personal use
        //ctx.fillText(this.speed.toFixed(2)+" km/h", window.innerWidth/80,window.innerHeight/22); // for personal use
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        
        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();
        
        ctx.restore();

        this.sensor.draw(ctx);
    }
}
