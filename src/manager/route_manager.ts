import { PixiView } from "../core/PixiView";
import { app } from "../main";
import { LobbySceneView } from "../views/lobby_scene_view";

export class RouteManager {
    private _currentScene: PixiView | null = null;

    public startGame(){
        this._currentScene = new LobbySceneView();
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

    public getAssetImage(filepath: string): string {
        return "./src/assets/img/" + filepath;
    }
}