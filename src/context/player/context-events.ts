import {Position, Vehicle, Weapons} from "@sa-mp/core";
import {Fcnpc} from "../..";

export interface PlayerOnFcnpcDeath {
    onFcnpcDeath(npc: Fcnpc, reason: Weapons): any;
}

export interface PlayerOnFcnpcTakeDamage {
    onFcnpcTakeDamage(npc: Fcnpc, amount: number, weapon: Weapons, bodyPart: number): any;
}

export interface PlayerOnFcnpcGiveDamage {
    onFcnpcGiveDamage(npc: Fcnpc, amount: number, weapon: Weapons, bodyPart: number): any;
}

export interface PlayerOnFcnpcStreamIn {
    onFcnpcStreamIn(npc: Fcnpc): any;
}

export interface PlayerOnFcnpcStreamOut {
    onFcnpcStreamOut(npc: Fcnpc): any;
}

export interface PlayerOnFcnpcVehicleTakeDamage {
    onFcnpcVehicleTakeDamage(npc: Fcnpc, vehicle: Vehicle, amount: number, weapon: Weapons, coord: Position): any;
}

export interface FcnpcPlayerContextEvents extends PlayerOnFcnpcDeath, PlayerOnFcnpcTakeDamage, PlayerOnFcnpcGiveDamage, PlayerOnFcnpcStreamIn, PlayerOnFcnpcStreamOut, PlayerOnFcnpcVehicleTakeDamage {}