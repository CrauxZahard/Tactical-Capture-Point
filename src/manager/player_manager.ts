import { Player } from "../core/Player";

export class PlayerManager {
    private _player_one: Player
    private _player_two: Player

    constructor(player_one: Player, player_two: Player) {
        this._player_one = player_one
        this._player_two = player_two
    }

    public getPlayerOne(): Player {
        return this._player_one
    }
    public getPlayerTwo(): Player {
        return this._player_two
    }

    public setPlayerOne(player: Player) {
        this._player_one = player
    }
    public setPlayerTwo(player: Player) {
        this._player_two = player
    }
    
}