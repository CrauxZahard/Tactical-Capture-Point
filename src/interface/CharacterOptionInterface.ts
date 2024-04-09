import { Texture } from "pixi.js";
import { CharacterRoleEnum } from "../enums/CharacterRoleEnum";

export interface CharacterOptionInterface {
    name: string,
    role: CharacterRoleEnum,
    skill?: (() => void) | null,
    image?: Texture
}