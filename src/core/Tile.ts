import { Texture } from "pixi.js";
import { InteractiveSprite } from "./InteractiveSprite";
import { Character } from "./Character";
import { Vector } from "../interface/2DVectorInterface";
import { TileState } from "../enum/TileStateEnum";

export class Tile extends InteractiveSprite {
    private readonly _coordinate: Vector
    private _state: TileState = TileState.BLANK

    constructor(image: Texture, coordinate: Vector) {
        super(image, "static")
        super.addEvent("click", this.on_click)
        this._coordinate = coordinate
    }

    public override addEvent(n: any, callback: any): Error {
        return new Error("u cant add an event to Tile")
    }

    private on_click(character: Character): void {
        /*
        TODO: check if its the user's turn
        check if user can move to this tile
        */
       console.log("clicked")
    }
}