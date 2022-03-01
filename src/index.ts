import {constants} from "./constants";
import {FcnpcFunctions} from "./functions";

export * from "./enums";
export * from "./functions";
export * from "./node";
export * from "./path";

export class Fcnpc extends FcnpcFunctions {
    public static readonly constants = constants;
}