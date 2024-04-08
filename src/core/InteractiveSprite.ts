import { Sprite, Texture } from "pixi.js";



export class InteractiveSprite extends Sprite {
    eventMode: 'static' | 'dynamic'
    private _image: Texture
    
    constructor(loadedTexture: Texture, eventMode: 'static' | 'dynamic' = 'static') {
        super(loadedTexture)
        this._image = loadedTexture
        this.eventMode = eventMode
    }

    // TODO: use a proper type
    // to see the example, take a look at views/main_scene/view.ts
    public addEvent(eventName: string, callback: any): void {
        super.addEventListener(eventName, callback)
    }
}