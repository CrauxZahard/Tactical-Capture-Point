import { InteractiveSprite } from "../core/InteractiveSprite";
import { CharacterOptionInterface } from "../interface/CharacterOptionInterface";
import { CharacterRoleEnum } from "../enums/CharacterRoleEnum";
import { Vector2dInterface } from "../interface/Vector2dInterface";
import { CharacterStateEnum } from "../enums/CharacterStateEnum";
import { InteractiveSpriteEventModeEnum } from "../enums/InteractiveSpriteEventModeEnum";

export class Character extends InteractiveSprite {
    name: string
    role: CharacterRoleEnum
    private _skill;
    private _current_position: Vector2dInterface = { x: 0, y: 0 }
    private _character_state: CharacterStateEnum

    constructor(data: CharacterOptionInterface) {
        super(data.image!, InteractiveSpriteEventModeEnum.STATIC)
        this.name = data.name
        this.role = data.role
        this._skill = data.skill || null
        this._character_state = CharacterStateEnum.NOT_STARTED
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
        if(this._character_state !== CharacterStateEnum.READY) {
            console.log("this character cant move yet")
            return this
        }
        // maybe do some sprite animation idk
        this._current_position.x = to_x
        this._current_position.y = to_y
        return this
    }

    private changeState(state: CharacterStateEnum): Character {
        this._character_state = state
        return this
    }

    public getState(): CharacterStateEnum {
        return this._character_state
    }
}