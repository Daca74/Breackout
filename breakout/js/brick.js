//definition dune classe brick
//export par default de cette classe (toute methodes et propriétés)
export default class Brick extends PIXI.Graphics {
    //constructeur de la class
    //fonction appelée quand vous créer une instance
    //let B =  new Brick();
    constructor(x, y, h, w, color){
        console.log("instance de la classe brick créer");
        console.log(x, y, h, w, color);

        //invoque la classe parent
        super();

        //propriété de linstance
        this.h = h;
        this.w = w;
        this.color = color;

        //positionner la raquette
        this.x = x;
        this.y = y;

        //dessine la raquette
        this._draw();
    }

    //dessiner la raquette
    //appeller uniquement dans la classe
    _draw(){
        this.beginFill(this.color);
        this.drawRect(0, 0, this.w, this.h);
    }

}

