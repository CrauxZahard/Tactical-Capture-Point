import { PlayerModel } from "../models/PlayerModel";

export class PlayerManager {
    // This is good but there's kinda need to tweak,
    // I created a model call PlayerHoldsCharacterModel
    private _player_one: PlayerModel
    private _player_two: PlayerModel

    constructor(player_one: PlayerModel, player_two: PlayerModel) {
        this._player_one = player_one
        this._player_two = player_two
    }

    public getPlayerOne(): PlayerModel {
        return this._player_one
    }
    public getPlayerTwo(): PlayerModel {
        return this._player_two
    }

    public setPlayerOne(player: PlayerModel) {
        this._player_one = player
    }
    public setPlayerTwo(player: PlayerModel) {
        this._player_two = player
    }
    
}