import {BulletHitTypes, Player, Position, Vehicle, Weapons, WeaponStates} from "@sa-mp/core";
import {Fcnpc, FcnpcMovePath, FcnpcNode} from "../..";

export interface OnFcnpcCreate {
    onFcnpcCreate(npc: Fcnpc): any;
}

export interface OnFcnpcDestroy {
    onFcnpcDestroy(npc: Fcnpc): any;
}

export interface OnFcnpcSpawn {
    onFcnpcSpawn(npc: Fcnpc): any;
}

export interface OnFcnpcRespawn {
    onFcnpcRespawn(npc: Fcnpc): any;
}

export interface OnFcnpcDeath {
    onFcnpcDeath(npc: Fcnpc, killer: Player, reason: Weapons): any;
}

export interface OnFcnpcUpdate {
    onFcnpcUpdate(npc: Fcnpc): any;
}

export interface OnFcnpcTakeDamage {
    onFcnpcTakeDamage(npc: Fcnpc, issuer: Player, amount: number, weapon: Weapons, bodyPart: number): any;
}

export interface OnFcnpcGiveDamage {
    onFcnpcGiveDamage(npc: Fcnpc, damaged: Player, amount: number, weapon: Weapons, bodyPart: number): any;
}

export interface OnFcnpcReachDestination {
    onFcnpcReachDestination(npc: Fcnpc): any;
}

export interface OnFcnpcWeaponShot {
    onFcnpcWeaponShot(npc: Fcnpc, weapon: Weapons, hitType: BulletHitTypes, hitId: number, coord: Position): any;
}

export interface OnFcnpcWeaponStateChange {
    onFcnpcWeaponStateChange(npc: Fcnpc, state: WeaponStates): any;
}

export interface OnFcnpcStreamIn {
    onFcnpcStreamIn(npc: Fcnpc, forPlayer: Player): any;
}

export interface OnFcnpcStreamOut {
    onFcnpcStreamOut(npc: Fcnpc, forPlayer: Player): any;
}

export interface OnFcnpcVehicleEntryComplete {
    onFcnpcVehicleEntryComplete(npc: Fcnpc, vehicle: Vehicle, seat: number): any;
}

export interface OnFcnpcVehicleExitComplete {
    onFcnpcVehicleExitComplete(npc: Fcnpc, vehicle: Vehicle): any;
}

export interface OnFcnpcVehicleTakeDamage {
    onFcnpcVehicleTakeDamage(npc: Fcnpc, issuer: Player, vehicle: Vehicle, amount: number, weapon: Weapons, coord: Position): any;
}

export interface OnFcnpcFinishPlayback {
    onFcnpcFinishPlayback(npc: Fcnpc): any;
}

export interface OnFcnpcFinishNode {
    onFcnpcFinishNode(npc: Fcnpc, node: FcnpcNode): any;
}

export interface OnFcnpcFinishNodePoint {
    onFcnpcFinishNodePoint(npc: Fcnpc, node: FcnpcNode, point: number): any;
}

export interface OnFcnpcChangeNode {
    onFcnpcChangeNode(npc: Fcnpc, node: FcnpcNode, oldNode: FcnpcNode): any;
}

export interface OnFcnpcFinishMovePath {
    onFcnpcFinishMovePath(npc: Fcnpc, path: FcnpcMovePath): any;
}

export interface OnFcnpcFinishMovePathPoint {
    onFcnpcFinishMovePathPoint(npc: Fcnpc, path: FcnpcMovePath, point: number): any;
}

export interface OnFcnpcChangeHeightPos {
    onFcnpcChangeHeightPos(npc: Fcnpc, newZ: number, oldZ: number): any;
}

export interface FcnpcGameModeContextEvents extends OnFcnpcCreate, OnFcnpcDestroy, OnFcnpcSpawn, OnFcnpcRespawn, OnFcnpcDeath, OnFcnpcUpdate, OnFcnpcTakeDamage, OnFcnpcGiveDamage, OnFcnpcReachDestination, OnFcnpcWeaponShot, OnFcnpcWeaponStateChange, OnFcnpcStreamIn, OnFcnpcStreamOut, OnFcnpcVehicleEntryComplete, OnFcnpcVehicleExitComplete, OnFcnpcVehicleTakeDamage, OnFcnpcFinishPlayback, OnFcnpcFinishNode, OnFcnpcFinishNodePoint, OnFcnpcChangeNode, OnFcnpcFinishMovePath, OnFcnpcFinishMovePathPoint, OnFcnpcChangeHeightPos {}