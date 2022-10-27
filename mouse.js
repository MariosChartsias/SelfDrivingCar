class Mouse{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.var="mouse: x="+this.x.toFixed(0)+" y="+this.y.toFixed(0);
    }

    setx(x){
        this.x=x;
    }
    sety(y){
        this.y=y;
    }
}