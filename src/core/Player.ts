import { PlayerOption } from "../interface/PlayerOptionInterface";
import { Character } from "./Character";

export class Player {
    private _characters: Character[];
    name: string;
    id: number;
    avatar: string;

    constructor(data: PlayerOption) {
        this.name = data.name
        this.id = data.id
        this.avatar = data.avatar
        this._characters = data.characters || []
    }

    public addCharacter(...characterData: Character[]): void {
        this._characters.push(...characterData)
    }

    public getCharacters(): Character[] {
        return this._characters
    }

}

