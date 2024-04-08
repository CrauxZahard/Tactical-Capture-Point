import { Texture } from "pixi.js";
import { CharacterRole } from "../enum/CharacterRoleEnum";

export interface CharacterOption {
    name: string,
    role: CharacterRole,
    skill?: (() => void) | null,
    image?: Texture
}