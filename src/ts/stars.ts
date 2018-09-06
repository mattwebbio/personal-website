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

    moveStar(i: number): void {
        if (i > this.getSize() || i < 0) return;
        else this.starray[i].move();
    }


    getStarX(i: number, width: number): number {
        if (i > this.getSize() || i < 0) return -1000;
        else return Math.round(this.starray[i].getX() * width);
    }

    getStarY(i: number, height: number): number {
        if (i > this.getSize() || i < 0) return -1000;
        else return Math.round(this.starray[i].getY() * height);
    }

    getStarZ(i: number): number {
        if (i > this.getSize() || i < 0) return -1000;
        else return Math.round(this.starray[i].getZ());
    }
}

class star {
    private x: number;
    private y: number;
    private z: number;
    private XY_INCREMENT: number = 0.5;
    private Z_INCREMENT: number = 1.5;
    private MARGIN: number = 10;

    constructor() {
        this.reset();
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
        if (this.z < 0) return 0;
        else return this.z;
    }
    reset(): void {
        this.x = Math.round(Math.random() * 10000)/100;
        this.y = Math.round(Math.random() * 10000)/100;
        this.z = Math.round(Math.random() * -100);
    }
    move(): void {
        this.x += ((this.x - 50)/50) + this.XY_INCREMENT;
        this.y += ((this.y - 50)/50) + this.XY_INCREMENT;
        this.z += this.Z_INCREMENT;

        if (this.y > (100 + this.MARGIN) || this.y < (0 - this.MARGIN) || 
        this.x > (100 + this.MARGIN) || this.x < (0 - this.MARGIN)){
            this.reset();
        }
    }
}

function render(container: HTMLCanvasElement, starfield: stars): void {
    let canvas = container.getContext("2d");
    canvas.clearRect(0, 0, container.width, container.height);

    for (let i = 0; i < starfield.getSize(); i++){
        let x = starfield.getStarX(i, container.width),
            y = starfield.getStarY(i, container.width),
            z = Math.round(starfield.getStarZ(i)/100 * 5);

        if (x < container.width && y < container.height){
            canvas.beginPath();
            canvas.fillStyle="white";
            canvas.fillRect(x, y, z, z);
            canvas.stroke();
        }

        starfield.moveStar(i);
    }
}

function nextFrame() {
    render(container, starfield);
    return setTimeout(function(){window.requestAnimationFrame(nextFrame)}, 1000/30);
}

let starfield = new stars(500);
let container = <HTMLCanvasElement> document.getElementById("starfield");

window.onload = function() {
    let heroHeight = document.getElementById("hero").clientHeight;
    // Match Hero size
    container.style.height = heroHeight + "px";
    container.width  = container.offsetWidth;
    container.height = container.offsetHeight;

    window.requestAnimationFrame(nextFrame);
}