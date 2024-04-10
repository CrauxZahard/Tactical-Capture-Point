import { Assets, FederatedEvent, FederatedPointerEvent, Texture } from "pixi.js";
import { PixiView } from "../core/PixiView";
import { Tile } from "../custom_pixis/Tile";
// import {  } from "";
import { PlayerModel } from "../models/PlayerModel";
import { Character } from "../custom_pixis/Character";
import { CharacterRoleEnum } from "../enums/CharacterRoleEnum";
import { TurnManager } from "../manager/turn_manager";
import { router } from "../main";
import { CompositeTilemap, Tilemap } from "@pixi/tilemap";

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

    constructor(){
        super("#000000");
    }
 
    private _image: Tile | null = null
    private _tile: Texture | null = null;
    private _tilemap: CompositeTilemap | null = null;
    private _isClicking: boolean = false;
    private _eventData: FederatedPointerEvent | null = null;

    public override async ready(): Promise<void> {
        this._tile = await Assets.load(router.getAssetImage("tiles/normal-tile.png"));
        console.log("Initializing");
        this.drawTilemap();
        this.setCameraMovement();
        test()
    }   

    public override process(): void {
        if(this._tilemap!.scale.x > 0.3){
            this._tilemap!.scale.x -= 0.01;
            this._tilemap!.scale.y -= 0.01;
        }
    }

    private setCameraMovement(){
        if(this._tilemap == null){
            return;
        }
        this.interactive = true;
        this.on("pointerdown", (event) => {
            this._eventData = event;
            this._isClicking = true;
        });
        this.on("pointerup", () => {
            this._eventData = null;
            this._isClicking = false;
        });
        this.on('pointermove', () => {
            if (this._isClicking) {
                const newPosition = this._eventData!.getLocalPosition(this._tilemap!.parent);
                this._tilemap!.x = newPosition.x * 0.5;
                this._tilemap!.y = newPosition.y * 0.5;
            }
        });
    }

    private drawTilemap(){
        this._tilemap = new CompositeTilemap();

        this._tilemap.position.x = 30;
        this._tilemap.position.y = 30;

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) { 
                this._tilemap.tile(this._tile!, i * 200 , j * 200);
            }
        }

        this.addChild(this._tilemap);
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