import { Texture } from "pixi.js";
import { InteractiveSprite } from "../core/InteractiveSprite";
import { Character } from "./Character";
import { Vector2dInterface } from "../interface/Vector2dInterface";
import { TileStateEnum } from "../enums/TileStateEnum";
import { InteractiveSpriteEventModeEnum } from "../enums/InteractiveSpriteEventModeEnum";

export class Tile extends InteractiveSprite {
    private readonly _coordinate: Vector2dInterface
    private _state: TileStateEnum = TileStateEnum.BLANK

    constructor(image: Texture, coordinate: Vector2dInterface) {
        super(image, InteractiveSpriteEventModeEnum.STATIC)
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