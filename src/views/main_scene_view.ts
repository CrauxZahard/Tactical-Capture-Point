import { Assets, Texture } from "pixi.js";
import { PixiView } from "../core/PixiView";
import { Tile } from "../custom_pixis/Tile";
import { PlayerModel } from "../models/PlayerModel";
import { Character } from "../custom_pixis/Character";
import { CharacterRoleEnum } from "../enums/CharacterRoleEnum";
import { TurnManager } from "../manager/turn_manager";
import { router } from "../main";

const lifter = new Character({
    name: "Droid-01",
    role: CharacterRoleEnum.LIFTERS
})
const support = new Character({
    name: "Droid-02",
    role: CharacterRoleEnum.SUPPORTS
})
const sprinter = new Character({
    name: "Droid-03",
    role: CharacterRoleEnum.SPRINTER
})

const player_1 = new PlayerModel({
    name: "Craux",
    id: 1,
    avatar: 'some-url-to-avatar'
})

const player_2 = new PlayerModel({
    name: "Tezada",
    id: 1,
    avatar: 'some-url-to-avatar'
})

player_1.addCharacter(lifter, support, sprinter)
player_2.addCharacter(lifter, support, sprinter)

const turn = new TurnManager(player_1, player_2)
export class MainSceneView extends PixiView {
 
    private _image: Tile | null = null
    private _tile: Texture | null = null;

    public override async ready(): Promise<void> {
        this._tile = await Assets.load(router.getAssetImage("tiles/red-tile.png"));
        console.log("Initializing");
        this.addImage();
        test()
    }   

    public override process(): void {
        if(this._image){
            // this._image.rotation += 0.02;
        }
    }

    public addImage(){
        this._image = new Tile(this._tile!, {x: 0, y:0});
        this._image.x = this.width / 2;
        this._image.y = this.height / 2;
        this._image.scale = 0.5;
        this._image.anchor.set(0.5);
        this.addChild(this._image);
    }

}

function test() {
    console.log("Current turn: ")
    console.log(turn.getCurrentPlayer())
    turn.endTurn()
    console.log("Next turn: ")
    console.log(turn.getCurrentPlayer())
    console.log("Craux Characters: ")
    console.log(
        turn.getPlayerOne()
        .getCharacters()[0]
        .getState() // returns 0 for "NOT_STARTED"
    )
}