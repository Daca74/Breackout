import G from "./g.js";

//definition dune classe ball
//export par default de cette classe (toute methodes et propriétés)
export default class Ball extends PIXI.Graphics {
    //constructeur de la class
    //fonction appelée quand vous créer une instance
    //let b =  new Ball();
    constructor(x, y, radius, color, angle, speed){
        console.log("instance de la classe ball créer");
        console.log(x, y, radius, color);

        //invoque la classe parent
        super();

        //propriété de linstance
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        //vecteur pour deplacer la ball
        const a = angle / 180 * Math.PI;
        this.vector = {x:Math.cos(a), y:Math.sin(a)};


        //positionner la balle
        this.x = x;
        this.y = y;

        //dessine le cercle
        this._draw();
    }

    //dessiner le cercle
    //appeller uniquement dans la classe
    _draw(){
        this.beginFill(this.color);
        this.drawCircle(0, 0, this.radius);
    }

    //deplacement de la balle
    move(){
        this.x += this.vector.x * this.speed;
        this.y += this.vector.y * this.speed;
        //rebondit sur les x inferieur ou superieur a 600
        if (this.x<= this.radius || this.x >=G.wST - this.radius)
            this.vector.x *=-1;
        //rebondit sur les y inferieur ou superieur a 400
        if (this.y<= this.radius || this.y >=G.hST - this.radius)
            this.vector.y *=-1;

    }
    /*fonction pour chnager la direction de la balle*/
    changeDirection(direction) {
        if (direction === G.FaceCollide.left || direction === G.FaceCollide.right){ 
        this.vector.x *=-1;
        }
        if (direction === G.FaceCollide.top || direction === G.FaceCollide.bottom){ 
            this.vector.x *=-1;
        }
    }

    /*fonction pour definir une ligne entre l'instant et t-1 de la balle*/
    get line(){
        const currentX = this.x + this.radius * this.vector.x;
        const currentY = this.y + this.radius * this.vector.y;
        const previusX = this.x - this.vector.x; 
        const previusY = this.y - this.vector.y;
        return [
            {x:currentX, y:currentY},
            {x:previusX, y:previusY}
        ]
    }

}










