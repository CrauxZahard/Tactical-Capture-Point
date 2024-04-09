import {  Container, Graphics, Sprite } from "pixi.js";
import { app } from "../main";

export class PixiView extends Container {
    constructor (backgroundColor: string | null = null) { 
        super();
        this.instantiate(backgroundColor);
    };

    private async instantiate(backgroundColor: string | null): Promise<void>{
        const container = new Graphics();
        container.rect(0, 0, app.canvas.width, app.canvas.height);
        container.fill(backgroundColor ? backgroundColor : "#008000");
        this.addChild(container);
        await this.ready();
        app.ticker.add(this.process.bind(this));
    }

    public async ready(): Promise<void> {}

    public process(): void {}

    public cleanUp(): void {
        app.ticker.stop();
        app.ticker.remove(this.process.bind(this));
        while (this.children.length > 0) {
            const child = this.removeChild(this.children[0]);
            if (child instanceof Sprite) {
                child.destroy(); // Destroy Sprites for more thorough cleanup
            }
        }
    }
}