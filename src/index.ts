import {constants} from "./constants";
import {FcnpcFunctions} from "./functions";

export * from "./enums";
export * from "./functions";

export class Fcnpc extends FcnpcFunctions {
    public static readonly constants = constants;
}