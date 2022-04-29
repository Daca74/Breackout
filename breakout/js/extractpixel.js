export default class ExtractPixels {
    constructor(tImages) {
        // stocke les images à charger
        this.tImages = tImages;
        // lance le chargement
        this._load();

    }

    _load() {
        // cible le loader
        const ldr = PIXI.Loader.shared;
        // boucle sur les images pour les ajouter au loader
        for(let img of this.tImages) {
            ldr.add(img.identifiant, img.path);
        }

        // lance le chagement des images
        ldr.load((loader, resources) => {
            // affiche les resources chargées
            console.log("Resources", resources);
            // stocke les resources
            this.resources = resources;
        })
    }

    getPixels(identifiantImage) {
        const sp = new PIXI.Sprite(this.resources[identifiantImage].texture);
        /*const w =sp.witdh;*/
        // Pixels
        const pixels = this.extract.pixels(sp);
        // tableau contenant les données de chaques pixels (x, y, r, g, b, a)
        let tPixels = [];
        for(let i = 0 ; i < pixels.length ; i += 4) {
            tPixels.push ({
                x: (i / 4) % 32,
                y: Math.floor((i / 4) / 32),
                r: pixels[i],
                g: pixels[i + 1],
                b: pixels[i + 2],
                a: pixels[i + 3]
            })
        }
        // renvoie le tableau
        return tPixels;
    }
}
