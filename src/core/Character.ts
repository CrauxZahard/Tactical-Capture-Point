import { Texture } from "pixi.js";
import { InteractiveSprite } from "./InteractiveSprite";
import { CharacterOption } from "../interface/CharacterOptionInterface";
import { CharacterRole } from "../enum/CharacterRoleEnum";
import { Vector } from "../interface/2DVectorInterface";
import { CharacterState } from "../enum/CharacterStateEnum";

export class Character extends InteractiveSprite {
    name: string
    role: CharacterRole
    private _skill;
    private _current_position: Vector = {x: 0, y: 0}
    private _character_state: CharacterState

    constructor(data: CharacterOption) {
        super(data.image!, "static")
        this.name = data.name
        this.role = data.role
        this._skill = data.skill || null
        this._character_state = CharacterState.NOT_STARTED
    }

    public addSkill(fn: () => void, context: any): void {
        if(!this._skill) {
            // make sure a skill is not overwrited
            this._skill = fn.bind(context)
        }
        console.log("a skill is being overwritten")
    }

    public useSkill() {
        if(this._skill) this._skill()
    }

    public moveTo(to_x: number, to_y: number): Character {
        if(this._character_state !== CharacterState.READY) {
            console.log("this character cant move yet")
            return this
        }
        // maybe do some sprite animation idk
        this._current_position.x = to_x
        this._current_position.y = to_y
        return this
    }

    private changeState(state: CharacterState): Character {
        this._character_state = state
        return this
    }

    public getState(): CharacterState {
        return this._character_state
    }
}