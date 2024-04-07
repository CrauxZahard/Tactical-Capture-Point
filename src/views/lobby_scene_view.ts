import { Assets, Sprite, Texture } from "pixi.js";
import { PixiView } from "../core/PixiView";

export class LobbySceneView extends PixiView {
 
    private _image: Sprite | null = null;
    private _happyPackedScene: Texture | null = null;

    public override async ready (): Promise<void> {
        console.log("Initializing");
        await this.addHappyImage();
    }

    public override process(): void {}

    public async addHappyImage(): Promise<void> {
        this._happyPackedScene = await Assets.load('./src/assets/img/center-tile.png');
        if(!this._happyPackedScene){
            return;
        }
        this._image = new Sprite(this._happyPackedScene);
        this._image.x = this.width / 2;
        this._image.y = this.height / 2;
        this._image.scale = 0.5;
        this._image.anchor.set(0.5);    
        this.addChild(this._image);
    }
}