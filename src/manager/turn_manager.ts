import { Character } from "../custom_pixis/Character";
import { PlayerModel } from "../models/PlayerModel";
import { CharacterStateEnum } from "../enums/CharacterStateEnum";
import { PlayerManager } from "./player_manager";

export class TurnManager {
    private _currentTurn: PlayerModel | null = null;
    private _player_manager: PlayerManager;
    
    constructor(player_one: PlayerModel, player_two: PlayerModel) {
        this._player_manager = new PlayerManager(player_one, player_two)
    }

    public getPlayerOne(): PlayerModel {
        return this._player_manager.getPlayerOne()
    }
    public getPlayerTwo(): PlayerModel {
        return this._player_manager.getPlayerTwo()
    }

    public getCurrentPlayer(): PlayerModel {
        if(this._currentTurn == null){
            this._currentTurn = this.getPlayerOne();
        }
        return this._currentTurn;
    }

    public endTurn(): void { // i dont know...
        // this._currentTurn += 1
    }

    public canMoveAgain(): boolean {
        // dont think pure logic, think of the UI too.
        // when the player press the end button of his turn the turn will immediately ended.
        // player can also choose what to move and what not to move before ending the match.
        // There will be a move and attack so when player move and attack, the character should not be movable...
        // maybe you can add a function in the character that prevent the user from doing stuff instead of handling this here.
        // but first we need to draw the map... lets get back to this when we are implmenting discord sdk
        return this._currentTurn!.getCharacters()
        .some((character: Character) => {
            character.getState() === CharacterStateEnum.READY
        })
    }


    public setCurrentPlayer(){ // call this function when player press end button;
        if(!this._currentTurn!.isEquals(this.getPlayerOne())) {
            this._currentTurn = this.getPlayerTwo();
            return this._currentTurn;
        }

        this._currentTurn = this.getPlayerOne();
        return this._currentTurn;
    }
}