import { Character } from "../custom_pixis/Character";
import { PlayerModel } from "./PlayerModel";

export class PlayerWithCharactersModel {
    private _characters: Array<Character>;
    private _player: PlayerModel;

    constructor(player: PlayerModel){
        this._characters = new Array();
        this._player = player;
    }

    public addCharacter(characterData: Character): void {
        this._characters.push(characterData);
    }

    public getCharacters(): Character[] {
        return this._characters
    }

    public getPlayer(): PlayerModel{
        return this._player;
    }

    public setPlayer(player: PlayerModel): void{
        this._player = player;
    }
}