import G from "./g.js";

//definition dune classe raquette
//export par default de cette classe (toute methodes et propriétés)
export default class Raquette extends PIXI.Graphics {
    //constructeur de la class
    //fonction appelée quand vous créer une instance
    //let r =  new Raquette();
    constructor(x, y, h, w, color){
        console.log("instance de la classe raquette créer");
        console.log(x, y, h, w, color);

        //invoque la classe parent
        super();

        //propriété de linstance
        this.h = h;
        this.w = w;
        this.color = color;

        //sens de deplacement et vitesse (axe x)
        this._sens = 0; //o=immobile -1=gauche 1= droite
        this.vX= 5;
        

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
        this.drawRect(this.w * -0.5, this.h * -0.5, this.w, this.h);
    }

    //deplacement de la balle
    move(){
        this.x = Math.max(this.w * 0.5, Math.min(G.wST - this.w *0.5, this.x + this._sens * this.vX ))
    }

    get sens(){
        return this._sens;
    }

    set sens(value){
        if(value <-1 || value >1)
            console.warn("Attention; la valeur ,n'est pas bonne"); 
        this._sens = value;
    }




}

