import { Character } from "./characters";
import { Episode } from "./episode";
import { Location } from "./location";

export interface CharacterFullData extends Character {
    origin: Location
    location: Location
    episode: Episode
}