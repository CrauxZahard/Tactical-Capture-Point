import { Assets, Sprite, Texture } from "pixi.js";
import { PixiView } from "../core/PixiView";
import { InteractiveSprite } from "../core/InteractiveSprites";

export class MainSceneView extends PixiView {
 
    private _image: InteractiveSprite | Sprite | null = null;
    private _happyPackedScene: Texture | null = null;

    public override async ready(): Promise<void> {
        this._happyPackedScene = await Assets.load('./src/assets/img/tiles/red-tile.png');
        console.log("Initializing");
        this.addHappyImage();
        /*
        setTimeout(() => {
            console.log("Hello");
            router.changeScene<LobbySceneView>(new LobbySceneView());
            console.log()
        }, 2000);
        
        console.log(this._image?.isInteractive())
        */
    }   

    public override process(): void{
        if(this._image){
            this._image.rotation += 0.02;
        }
    }

    public addHappyImage() {
        this._image = new InteractiveSprite(this._happyPackedScene!);
        this._image.x = this.width / 2;
        this._image.y = this.height / 2;
        this._image.scale = 0.5;
        this._image.anchor.set(0.5);
        if(this._image instanceof InteractiveSprite) {
            this._image.addEvent("click", spriteClick.bind(this))
        }

        this.addChild(this._image);
    }

}

// a function to move the sprite when it is clicked
// TODO: put this in another file maybe?
function spriteClick(this: any): void {
    if (this._image) {
        this._image.x += 10
        console.log("clicked")
    }
}