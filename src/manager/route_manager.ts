import { MainSceneView } from "../views/main_scene_view";
import { PixiView } from "../core/PixiView";
import { app } from "../main";

export class RouteManager {
    private _currentScene: PixiView | null = null;

    constructor(){
        this._currentScene = new MainSceneView();
    }

    public startGame(){
        app.stage.addChild(this._currentScene!);
    }

    public changeScene<T extends PixiView>(controller: T): void {
        if(this._currentScene == null){
            return;
        }
        app.stage.removeChild(this._currentScene);
        this._currentScene.destroy();
        this._currentScene = controller;
        app.stage.addChild(this._currentScene);
    }
}