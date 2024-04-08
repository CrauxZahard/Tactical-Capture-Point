import { Assets, Sprite, Texture } from "pixi.js";
import { PixiView } from "../core/PixiView";
import { InteractiveSprite } from "../core/InteractiveSprite";
import { Character } from "../core/Character";
import { CharacterRole } from "../enum/CharacterRoleEnum";

export class LobbySceneView extends PixiView {
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
        
        let character = new Character({
            name: "character-1 (tile)",
            role: CharacterRole.LIFTERS,
            image: this._happyPackedScene,
            skill: null
        })

        character.x = this.width / 2
        character.y = this.height / 2
        character.scale = 0.5
        character.anchor.set(0.5)
        character.addEvent("click", characterClicked.bind(character))
        console.log(character)
        this.addChild(character)
    }
}

// testing
function characterClicked(this: any) {
    this.x += 20
}