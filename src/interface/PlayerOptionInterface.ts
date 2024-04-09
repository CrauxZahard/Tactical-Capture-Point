import { Character } from "../custom_pixis/Character"

export interface PlayerOptionInterface {
    name: string,
    id: number,
    avatar: string
    characters?: Character[]
}