import { Sprite, Texture } from "pixi.js";



export class InteractiveSprite extends Sprite {
    eventMode: 'static' | 'dynamic'

    constructor(loadedTexture: Texture, eventMode: 'static' | 'dynamic') {
        super(loadedTexture)
        this.eventMode = eventMode
    }

    // TODO: use a proper type
    // to see the example, take a look at views/main_scene/view.ts
    public addEvent(eventName: string, callback: any): void {
        super.addEventListener(eventName, callback)
    }
}