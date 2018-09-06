class stars {
    private starray: Array<star> = [];
    private size: number;

    constructor(size: number) {
        this.size = size;
        for (let i = 0; i < this.size; i++){
            this.starray.push(new star());
        }
    }

    getSize(): number {
        return this.size;
    }

    getStar(i: number): star {
        return this.starray[i];
    }
}

class star {
    private x: number;
    private y: number;
    private z: number;

    constructor() {
        this.x = Math.round(Math.random() * 10000)/100;
        this.y = Math.round(Math.random() * 10000)/100;
        this.z = Math.round(Math.random() * 10000)/100;
    }
    getLoc(): Array<number> {
        return [this.getX(), this.getY(), this.getZ()];
    }
    getX(): number {
        return this.x/100;
    }
    getY(): number {
        return this.y/100;
    }
    getZ(): number {
        return this.z/100;
    }
    move(): void {

    }
}

function draw(canvas: CanvasRenderingContext2D){
    for (let i = 0; i < start.getSize(); i++){
        let loc: Array<number> = start.getStar(i).getLoc();
        canvas.beginPath();
        canvas.strokeStyle="white";
        canvas.rect(Math.round(loc[0] * starfield.width), 
            Math.round(loc[1] * starfield.height), 2, 2);
        canvas.stroke();
    }
}

let start = new stars(100);
let starfield = <HTMLCanvasElement> document.getElementById("starfield");


// Match Hero size
window.onload = function() {
    let heroHeight = document.getElementById("hero").clientHeight;
    starfield.style.height = heroHeight + "px";
    starfield.width  = starfield.offsetWidth;
    starfield.height = starfield.offsetHeight;
    let c = starfield.getContext("2d");

    draw(c);
}