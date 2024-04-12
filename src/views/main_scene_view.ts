import { Assets, FederatedEvent, FederatedPointerEvent, Point, Texture } from "pixi.js";
import { PixiView } from "../core/PixiView";
import { Tile } from "../custom_pixis/Tile";
// import {  } from "";
import { PlayerModel } from "../models/PlayerModel";
import { Character } from "../custom_pixis/Character";
import { CharacterRoleEnum } from "../enums/CharacterRoleEnum";
import { TurnManager } from "../manager/turn_manager";
import { router } from "../main";
import { CompositeTilemap, Tilemap } from "@pixi/tilemap";
import { drawMap } from "../helpers/draw_map";

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
    private _tilemap: CompositeTilemap | undefined
    private _isClicking: boolean = false;
    private _eventData: any = null;
    private _oldData: Point | undefined;

    public override async ready(): Promise<void> {
        preloadAssets()
        this._tile = await Assets.load("normal-tile");
        console.log("Initializing");
        await this.drawTilemap();
        this.setCameraMovement();
        this.zoom()
        test()
    }   

    public override process(): void {
        if(this._tilemap!.scale.x > 0.3){
            this._tilemap!.scale.x -= 0.01;
            this._tilemap!.scale.y -= 0.01;
        }
    }

    private setCameraMovement() {
        if(this._tilemap == null){
            return;
        }
        this.interactive = true;
        this.on("pointerdown", (event) => {
            this._eventData = event;
            this._oldData = {
                x: event.globalX,
                y: event.globalY
            } as Point
            this._isClicking = true;
        });
        this.on("pointerup", () => {
            this._eventData = null;
            this._isClicking = false;
        });
        this.on('pointermove', () => {
            if (this._isClicking) {
                const newData = this._eventData.getLocalPosition(this._tilemap?.parent)
                this._tilemap!.x += (newData.x - (this._oldData?.x || 0)) * 0.5
                this._tilemap!.y += (newData.y - (this._oldData?.y || 0)) * 0.5
                this._oldData = newData
            }
        });
    }

    private async drawTilemap() {
        const drawer = await drawMap(
            {x: 20, y: 20},
            [{x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 1}]
        )
        this._tilemap = drawer
        this.addChild(drawer);
    }

    private zoom() {
        this.on("wheel", (event) => {
            this._tilemap!.scale.x -= (event.deltaY / 10000)
            this._tilemap!.scale.y -= (event.deltaY / 10000)
        })
    }

}

function test() {
    // console.log("Current turn: ")
    // console.log(turn.getCurrentPlayer())
    // turn.endTurn()
    // console.log("Next turn: ")
    // console.log(turn.getCurrentPlayer())
    // console.log("Craux Characters: ")
    // console.log(
    //     turn.getPlayerOne()
    //     .getCharacters()[0]
    //     .getState() // returns 0 for "NOT_STARTED"
    // )
}

function preloadAssets() {
    Assets.add({alias: "normal-tile", src: router.getAssetImage("tiles/normal-tile.png")})
    Assets.add({alias: "green-tile", src: router.getAssetImage("tiles/green-tile.png")})
    Assets.add({alias: "red-tile", src: router.getAssetImage("tiles/red-tile.png")})
}