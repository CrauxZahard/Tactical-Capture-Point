import { CompositeTilemap } from "@pixi/tilemap"
import { Vector2dInterface } from "../interface/Vector2dInterface"
import { Assets } from "pixi.js"

type MapSize = {
    // the result will be multiplied by 200x200
    x: number,
    y: number
}

export async function drawMap(size: MapSize, exclude: Vector2dInterface[]) {
    const tilemap = new CompositeTilemap()
    const tile = {
        normal: await Assets.load("normal-tile"),
        green: await Assets.load("green-tile"),
        red: await Assets.load("red-tile")
    }

    const spawn = spawn_area({x: 1, y: 1}, size)
    const point = point_area({x: 5, y: 5}, size)

    tilemap.position.x = 30
    tilemap.position.y = 30

    for(let i = 0; i < size.y; i++) {
        for(let j = 0; j < size.x; j++) {
            // dont render blank tile(s)
            if(!exclude.some(tile => (tile.y === i && tile.x === j))) {
                // nested if lol, please make it better
                if(spawn.some(tile => (tile.y === i && tile.x === j))) {
                    tilemap.tile(tile.green, j * 200, i * 200)
                }
                else if(point.some(tile => (tile.y === i && tile.x === j))) {
                    tilemap.tile(tile.red, j * 200, i * 200)
                }
                else {
                    tilemap.tile(tile.normal, j * 200, i * 200)
                }
            }
        }
    }
    return tilemap
}

function spawn_area(center: Vector2dInterface, map_size: MapSize): Vector2dInterface[] {
    // assuming the area is a 3x3 grid
    // lets say the center is {x: 1, y: 1}
    // this will return an array from {x: 0, y: 0} to {x: 2, y: 2}
    let arr = []

    for(let i = (-1); i <= 1; i++) {
        for(let j = (-1); j <= 1; j++) {
            if( 
                center.x + j >= 0 && 
                center.x + j <= map_size.x &&
                center.y + i >= 0 &&
                center.y + i <= map_size.y
            ) {
               arr.push({x: center.x + j, y: center.y + i})
            }
        }
        
    }

    return arr as Vector2dInterface[]
}

function point_area(center: Vector2dInterface, map_size: MapSize): Vector2dInterface[] {
    let arr = []

    for(let i = (-1); i <= 1; i++) {
        for(let j = (-1); j <= 1; j++) {
            if( 
                center.x + j >= 0 && 
                center.x + j <= map_size.x &&
                center.y + i >= 0 &&
                center.y + i <= map_size.y
            ) {
               arr.push({x: center.x + j, y: center.y + i})
            }
        }
        
    }

    return arr as Vector2dInterface[]
}