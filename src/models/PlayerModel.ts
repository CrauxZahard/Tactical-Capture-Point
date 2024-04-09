import { PlayerOptionInterface } from "../interface/PlayerOptionInterface";
import { Character } from "../custom_pixis/Character";

export class PlayerModel {
    private _name: string;
    private _id: number;
    private _avatar: string;
    private _characters: Character[];

    constructor(data: PlayerOptionInterface) {
        this._name = data.name
        this._id = data.id
        this._avatar = data.avatar
        this._characters = data.characters || []
    }
    // Getters and setters
    public getName(): string {
        return this._name;
    }

    public setName(name: string): void {
        this._name = name;
    }

    public getID(): number {
        return this._id;
    }

    public setID(id: number): void {
        this._id = id;
    }

    public getAvatar(): string {
        return this._avatar;
    }

    public setAvatar(avatar: string): void{
        this._avatar = avatar;
    }

    public addCharacter(...characterData: Character[]): void {
        this._characters.push(...characterData)
    }

    public getCharacters(): Character[] {
        return this._characters
    }

    // Helper methods
    public isEquals(other: PlayerModel) : boolean{
        if(this._name != other.getName()){
            return false;
        }
        if(this._id != other.getID()){
            return false;
        }
        if(this._avatar != other.getAvatar()){
            return false;
        }
        return true;
    }
}

