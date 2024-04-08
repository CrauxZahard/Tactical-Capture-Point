import { Character } from "../core/Character"

export interface PlayerOption {
    name: string,
    id: number,
    avatar: string
    characters?: Character[]
}