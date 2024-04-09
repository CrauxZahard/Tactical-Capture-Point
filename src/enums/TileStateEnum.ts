export enum TileStateEnum {
    BLANK, // no character in this state, can move here
    RESERVED, // character/objects is standing here, can't move here
    NO_TILE // cant move here, there are no tiles.
}