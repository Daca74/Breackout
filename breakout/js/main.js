//IMPORTS
import G from "./g.js";
import Ball from "./ball.js";
import Raquette from "./raquette.js";
import Brick from "./brick.js";
import ExtractPixels from "./extractpixel.js";

//tableau referecement des briques
let tBricks = [];

//création d'une app pixi
const app = new PIXI.Application({
    width:G.wST,
    height:G.hST,
    backgroundColor: 0x555555,
    antialias: true
})

//ajoute le canva généré pat PIXI au body
document.body.appendChild(app.view);

/////////////////////////////////////////////////////////////////
//GRAPHIC

let ball = new Ball(G.wST * 0.5, G.hST * 0.5 , 10, 0xFF0000, 135, 5 );
app.stage.addChild(ball)

let raquette = new Raquette(G.wST * 0.5, G.hST - 30, 20, 90, 0xFFF000);
app.stage.addChild(raquette)

/*let b1 = new Brick (50, 50, 50, 300, 0xFF000);
app.stage.addChild(b1)

let b2 = new Brick (400, 50, 50, 300, 0xFF000);
app.stage.addChild(b2)*/

let extractPixels = new ExtractPixels([
    {identifiant:'i1', path:'./assets/bomb.png'},
    {identifiant:'i2', path:'./assets/mmi.png'}
])

// transmet l'objet extract de PIXI
extractPixels.extract = app.renderer.extract;
// récupère les pixels d'une texture
setTimeout(function() {
   const tPixels = extractPixels.getPixels('i1');
   for (let pixels of tPixels){
       if(pixels.a > 50){
           let brick = new Brick(
           pixels.x * 10, pixels.y * 10,
           9, 9, 
           G.rgbToHex(pixels.r, pixels.g, pixels.b)
           );
           brick.alpha = pixels.a;
           app.stage.addChild(brick);
           tBricks.push(brick);
       }
   }
}, 1000);

/////////////////////////////////////////////////////////////////
//EVENTS

window.addEventListener('keydown', (e)=>{
    //touche fleche gauche
    if(e.keyCode ===37){
        raquette.sens = -1;

    }
    //touche fleche droite
    else if(e.keyCode ===39){
        raquette.sens = 1;
    }
})

window.addEventListener('keyup', (e)=>{
    //touche fleche gauche
    if(e.keyCode ===37){
        raquette.sens = 0;

    }
    //touche fleche droite
    else if(e.keyCode ===39){
        raquette.sens = 0;
    }
})


/////////////////////////////////////////////////////////////////
//GAMELOOP

function gameloop() {
    requestAnimationFrame(gameloop); // rappel la fonction

    // logique du jeu
    ball.move();
    raquette.move();

    // collision
    const line = ball.line;
    if(G.collide(ball, raquette)) {
        let fC = G.faceCollide(line, raquette);
        if(fC !== false) ball.changeDirection(fC);
    } else {
        for(let [i, brick] of tBricks.entries()) {
            let fC = G.faceCollide(line, brick);
            if(fC !== false){
                ball.changeDirection(fC);
                // supprimer la brique percutée 
                app.stage.removeChild(brick);
                tBricks.splice(i, 1);
                // sort de la boucle
                break;
            } 
        }
 
    }
}

// lance la gameloop
gameloop();





