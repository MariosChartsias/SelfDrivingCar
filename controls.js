class Controls{
    constructor(){
        this.farward=false;
        this.left=false;
        this.right=false;
        this.reverse=false;

        this.#addKeybordListeners();
    }


    

    #addKeybordListeners(){
        document.onkeydown=(event)=>{ // it's the same with document.onkeydown=function(event){}
            switch(event.key){        // but then the this. refers to the function and not in the costructor
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
                case "ArrowUp":
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.reverse=true;
                    break;
            }
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
            }
        }
    }
}