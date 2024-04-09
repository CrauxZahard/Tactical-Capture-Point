import { Assets, Container, FederatedPointerEvent, Graphics, Texture } from "pixi.js";
import { PixiView } from "../core/PixiView";
import { app, router } from "../main";
import { InteractiveSprite } from "../core/InteractiveSprite";
import { Button } from "@pixi/ui";
import { MainSceneView } from "./main_scene_view";

const BACKGROUND_COLOR: string = "#180431";

export class LobbySceneView extends PixiView {
 
    private _images: Array<InteractiveSprite> = [];
    private _textures: Array<Texture> = [];
    private _containerItem: Container | null = null;

    constructor(){
        super(BACKGROUND_COLOR);
    }

    public override async ready (): Promise<void> {
        // TODO: put loading screen on
        this._images = new Array();
        this._textures = new Array();
        await this.loadImages();
        this.setAnotherBackgroundLayer();
        this.addMadchensToBackground();
        this.addTitleToBackground();
        this.addButtonToBackground();
        this.addStarsToBackground();
        // TODO: put loading screen off
    }

    public override process(): void {}

    public async loadImages(): Promise<void> {
        const arrayOfFilepath: Array<string> = [
            router.getAssetImage('characters/blue-madchen.png'),
            router.getAssetImage('characters/purple-madchen.png'),
            router.getAssetImage('characters/green-madchen.png'),
            router.getAssetImage('others/title.png'),
            router.getAssetImage('others/star.png'),
            router.getAssetImage('buttons/story-mode-button.png'),
            router.getAssetImage('buttons/find-match-button.png'),
            router.getAssetImage('buttons/credit-button.png'),
        ];

        for (let i = 0; i < arrayOfFilepath.length; i++) {
            const itemTexture = await Assets.load(arrayOfFilepath[i]);
            this._textures.push(itemTexture);
        }
    }

    private setAnotherBackgroundLayer(){
        this._containerItem = new Container();
        this._containerItem.interactive = true;
        const graphics = new Graphics();
        graphics.rect(0, 0, app.canvas.width, app.canvas.height);
        graphics.fill(BACKGROUND_COLOR);
        this._containerItem .addChild(graphics);
        this.addChild(this._containerItem );
        this._containerItem.on("mousemove", this.moveBackgroundBasedOnMouseMovement.bind(this));
    }

    private addMadchensToBackground(){
        if(this._containerItem == null){
            return;
        }
        // madchen blue
        this._images.push(new InteractiveSprite(this._textures[0]));
        this._images[0].x = this.width / 2;
        this._images[0].y = this.height / 1.2;
        this._images[0].scale = 1.2;
        this._images[0].anchor.set(0.5);
        this._containerItem.addChild(this._images[0]);
        //madchen purple
        this._images.push(new InteractiveSprite(this._textures[1]));
        this._images[1].x = this.width / 4;
        this._images[1].y = this.height / 3.5;
        this._images[1].rotation = -.3;
        this._images[1].scale = .8;
        this._images[1].anchor.set(0.5);
        this._containerItem.addChild(this._images[1]);
        //madchen green
        this._images.push(new InteractiveSprite(this._textures[2]));
        this._images[2].x = this.width / 1.45;
        this._images[2].y = this.height / 6;
        this._images[2].rotation = .3;
        this._images[2].scale = .4;
        this._images[2].anchor.set(0.5);
        this._containerItem.addChild(this._images[2]);
    }

    private addStarsToBackground(){
        if(this._containerItem == null){
            return;
        }
        // large star
        this._images.push(new InteractiveSprite(this._textures[4]));
        this._images[7].x = this.width / 1.5;
        this._images[7].y = this.height / 1.5;
        this._images[7].scale = .4;
        this._images[7].anchor.set(0.5);
        this._containerItem.addChild(this._images[7]);
        //medium star
        this._images.push(new InteractiveSprite(this._textures[4]));
        this._images[8].x = this.width / 2.8;
        this._images[8].y = this.height / 2.8;
        this._images[8].rotation = -.3;
        this._images[8].scale = .3;
        this._images[8].anchor.set(0.5);
        this._containerItem.addChild(this._images[8]);
        //small star
        this._images.push(new InteractiveSprite(this._textures[4]));
        this._images[9].x = this.width / 1.65;
        this._images[9].y = this.height / 10;
        this._images[9].rotation = .3;
        this._images[9].scale = .2;
        this._images[9].anchor.set(0.5);
        this._containerItem.addChild(this._images[9]);
    }
    
    private addTitleToBackground(){
        this._images.push(new InteractiveSprite(this._textures[3]));
        this._images[3].x = this.width / 2;
        this._images[3].y = this.height / 3.5;
        this._images[3].scale = .35;
        this._images[3].anchor.set(0.5);
        this.addChild(this._images[3])
    }

    private addButtonToBackground(){
        // comming soon button
        const commingSoonContainer = new Container();
        this._images.push(new InteractiveSprite(this._textures[5]));
        this._images[4].scale = .25;
        commingSoonContainer.addChild(this._images[4]);
        const commingSoonButton = new Button(commingSoonContainer);
        commingSoonButton.view.x = this.width / 3.6;
        commingSoonButton.view.y = this.height / 1.9;
        this.addChild(commingSoonButton.view);
        // find match button
        const findMatchContainer = new Container();
        this._images.push(new InteractiveSprite(this._textures[6]));
        this._images[5].scale = .25;
        findMatchContainer.addChild(this._images[5]);
        const findMatchButton = new Button(findMatchContainer);
        findMatchButton.view.x = this.width / 2.25;
        findMatchButton.view.y = this.height / 1.9;
        findMatchButton.view.on("click", () => {
            router.changeScene(new MainSceneView());
        });
        this.addChild(findMatchButton.view);
        // credits button
        const creditsContainer = new Container();
        this._images.push(new InteractiveSprite(this._textures[7]));
        this._images[6].scale = .25;
        creditsContainer.addChild(this._images[6]);
        const creditsButton = new Button(creditsContainer);
        creditsButton.view.x = this.width / 1.64;
        creditsButton.view.y = this.height / 1.9;
        this.addChild(creditsButton.view);
    }

    private moveBackgroundBasedOnMouseMovement(event: FederatedPointerEvent){
        if(this._containerItem == null){
            return;
        }
        let itemX = event.x - (app.canvas.width/2)
        let itemY = event.y - (app.canvas.height/2)
        this._containerItem.x = itemX * 0.03;
        this._containerItem.y = itemY * 0.03;
    }

    public override cleanUp(): void {
        this._textures.forEach(element => {
            element.destroy();
        });
        super.cleanUp();
    }
}