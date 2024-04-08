import { Character } from "../core/Character";
import { Player } from "../core/Player";
import { CharacterState } from "../enum/CharacterStateEnum";
import { PlayerManager } from "./player_manager";

export class TurnManager {
    private _currentTurn: number = 1;
    private _player_manager: PlayerManager
    
    constructor(player_one: Player, player_two: Player) {
        this._player_manager = new PlayerManager(player_one, player_two)
    }

    public getPlayerOne(): Player {
        return this._player_manager.getPlayerOne()
    }
    public getPlayerTwo(): Player {
        return this._player_manager.getPlayerTwo()
    }

    public getCurrentPlayer(): Player {
        /*
        this._currentTurn => Player
        1 => first player
        2 => second player
        3 => first player
        */
        if(this._currentTurn % 2 === 1) {
            return this.getPlayerOne()
        }
        return this.getPlayerTwo()
    }

    public endTurn(): void {
        this._currentTurn += 1
    }

    public canMoveAgain(): boolean {
        return this.getCurrentPlayer()
        .getCharacters()
        .some((character: Character) => {
            character.getState() === CharacterState.READY
        })
    }
}