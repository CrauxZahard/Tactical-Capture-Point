import { Sprite, Texture } from "pixi.js";
import { InteractiveSpriteEventModeEnum } from "../enums/InteractiveSpriteEventModeEnum";


export class InteractiveSprite extends Sprite {
    private _eventMode: string;

    constructor(
        loadedTexture: Texture, 
        eventMode: InteractiveSpriteEventModeEnum = InteractiveSpriteEventModeEnum.STATIC
    ) {
        super(loadedTexture)
        this._eventMode = eventMode == InteractiveSpriteEventModeEnum.STATIC ? "static" : "dynamic";
    }

    // TODO: use a proper type
    // to see the example, take a look at views/main_scene/view.ts
    public addEvent(eventName: string, callback: any): void {
        super.addEventListener(eventName, callback)
    }
}