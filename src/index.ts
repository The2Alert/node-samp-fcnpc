import {EventEmitter, DefaultEventMap} from "tsee";
import * as amx from "@sa-mp/amx";
import {BulletHitTypes, Player, Position, Vehicle, Weapons, WeaponStates} from "@sa-mp/core";
import {FcnpcNode, FcnpcMovePath} from ".";
import {constants} from "./constants";
import {FcnpcFunctions} from "./functions";

export * from "./enums";
export * from "./functions";
export * from "./node";
export * from "./path";
export * from "./context";

export interface FcnpcEventMap extends DefaultEventMap {
    "create": (npc: Fcnpc) => any;
    "destroy": (npc: Fcnpc) => any;
    "spawn": (npc: Fcnpc) => any;
    "respawn": (npc: Fcnpc) => any;
    "death": (npc: Fcnpc, killer: Player, reason: Weapons) => any;
    "update": (npc: Fcnpc) => any;
    "take-damage": (npc: Fcnpc, issuer: Player, amount: number, weapon: Weapons, bodyPart: number) => any;
    "give-damage": (npc: Fcnpc, damaged: Player, amount: number, weapon: Weapons, bodyPart: number) => any;
    "reach-destination": (npc: Fcnpc) => any;
    "weapon-shot": (npc: Fcnpc, weapon: Weapons, hitType: BulletHitTypes, hitId: number, coord: Position) => any;
    "weapon-state-change": (npc: Fcnpc, state: WeaponStates) => any;
    "stream-in": (npc: Fcnpc, forPlayer: Player) => any;
    "stream-out": (npc: Fcnpc, forPlayer: Player) => any;
    "vehicle-entry-complete": (npc: Fcnpc, vehicle: Vehicle, seat: number) => any;
    "vehicle-exit-complete": (npc: Fcnpc, vehicle: Vehicle) => any;
    "vehicle-take-damage": (npc: Fcnpc, issuer: Player, vehicle: Vehicle, amount: number, weapon: Weapons, coord: Position) => any;
    "finish-playback": (npc: Fcnpc) => any;
    "finish-node": (npc: Fcnpc, node: FcnpcNode) => any;
    "finish-node-point": (npc: Fcnpc, node: FcnpcNode, point: number) => any;
    "change-node": (npc: Fcnpc, node: FcnpcNode, oldNode: FcnpcNode) => any;
    "finish-move-path": (npc: Fcnpc, path: FcnpcMovePath) => any;
    "finish-move-path-point": (npc: Fcnpc, path: FcnpcMovePath, point: number) => any;
    "change-height-pos": (npc: Fcnpc, newZ: number, oldZ: number) => any;
}

export class Fcnpc extends FcnpcFunctions {
    public static readonly constants = constants;
    public static readonly events: EventEmitter<FcnpcEventMap> = new EventEmitter;
    public static readonly on = Fcnpc.events.on;
    
    public static init(): void {
        amx.onPublicCall("FCNPC_OnCreate", "i", (npcid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            return Fcnpc.emit("create", npc, npc);
        });
        amx.onPublicCall("FCNPC_OnDestroy", "i", (npcid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            return Fcnpc.emit("destroy", npc, npc);
        });
        amx.onPublicCall("FCNPC_OnSpawn", "i", (npcid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            return Fcnpc.emit("spawn", npc, npc);
        });
        amx.onPublicCall("FCNPC_OnRespawn", "i", (npcid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            return Fcnpc.emit("respawn", npc, npc);
        });
        amx.onPublicCall("FCNPC_OnDeath", "iii", (npcid, killerid, reason) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const killer: Player = Player.getById(killerid as number);
            return Fcnpc.emit("death", npc, npc, killer, reason as Weapons);
        });
        amx.onPublicCall("FCNPC_OnUpdate", "i", (npcid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            return Fcnpc.emit("update", npc, npc);
        });
        amx.onPublicCall("FCNPC_OnTakeDamage", "iifii", (npcid, issuerid, amount, weaponid, bodypart) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const issuer: Player = Player.getById(issuerid as number);
            return Fcnpc.emit("take-damage", npc, npc, issuer, amount as number, weaponid as Weapons, bodypart as number);
        });
        amx.onPublicCall("FCNPC_OnGiveDamage", "iifii", (npcid, damagedid, amount, weaponid, bodypart) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const damaged: Player = Player.getById(damagedid as number);
            return Fcnpc.emit("give-damage", npc, npc, damaged, amount as number, weaponid as Weapons, bodypart as number);
        });
        amx.onPublicCall("FCNPC_OnReachDestination", "i", (npcid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            return Fcnpc.emit("reach-destination", npc, npc);
        });
        amx.onPublicCall("FCNPC_OnWeaponShot", "iiiifff", (npcid, weaponid, hittype, hitid, fX, fY, fZ) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const coord: Position = {x: fX as number, y: fY as number, z: fZ as number};
            return Fcnpc.emit("weapon-shot", npc, npc, weaponid as Weapons, hittype as BulletHitTypes, hitid as number, coord);
        });
        amx.onPublicCall("FCNPC_OnWeaponStateChange", "ii", (npcid, weapon_state) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            return Fcnpc.emit("weapon-state-change", npc, npc, weapon_state as WeaponStates);
        });
        amx.onPublicCall("FCNPC_OnStreamIn", "ii", (npcid, forplayerid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const forPlayer: Player = Player.getById(forplayerid as number);
            return Fcnpc.emit("stream-in", npc, npc, forPlayer);
        });
        amx.onPublicCall("FCNPC_OnStreamOut", "ii", (npcid, forplayerid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const forPlayer: Player = Player.getById(forplayerid as number);
            return Fcnpc.emit("stream-out", npc, npc, forPlayer);
        });
        amx.onPublicCall("FCNPC_OnVehicleEntryComplete", "iii", (npcid, vehicleid, seatid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const vehicle: Vehicle = Vehicle.getById(vehicleid as number);
            return Fcnpc.emit("vehicle-entry-complete", npc, npc, vehicle, seatid as number);
        });
        amx.onPublicCall("FCNPC_OnVehicleExitComplete", "ii", (npcid, vehicleid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const vehicle: Vehicle = Vehicle.getById(vehicleid as number);
            return Fcnpc.emit("vehicle-exit-complete", npc, npc, vehicle);
        });
        amx.onPublicCall("FCNPC_OnVehicleTakeDamage", "iiififff", (npcid, issuerid, vehicleid, amount, weaponid, fX, fY, fZ) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const issuer: Player = Player.getById(issuerid as number);
            const vehicle: Vehicle = Vehicle.getById(vehicleid as number);
            const coord: Position = {x: fX as number, y: fY as number, z: fZ as number};
            return Fcnpc.emit("vehicle-take-damage", npc, npc, issuer, vehicle, amount as number, weaponid as Weapons, coord);
        });
        amx.onPublicCall("FCNPC_OnFinishPlayback", "i", (npcid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            return Fcnpc.emit("finish-playback", npc, npc);
        });
        amx.onPublicCall("FCNPC_OnFinishNode", "ii", (npcid, nodeid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const node: FcnpcNode = FcnpcNode.getById(nodeid as number);
            return Fcnpc.emit("finish-node", npc, npc, node);
        });
        amx.onPublicCall("FCNPC_OnFinishNodePoint", "iii", (npcid, nodeid, pointid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const node: FcnpcNode = FcnpcNode.getById(nodeid as number);
            return Fcnpc.emit("finish-node-point", npc, npc, node, pointid as number);
        });
        amx.onPublicCall("FCNPC_OnChangeNode", "iii", (npcid, newnodeid, oldnodeid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const node: FcnpcNode = FcnpcNode.getById(newnodeid as number);
            const oldNode: FcnpcNode = FcnpcNode.getById(oldnodeid as number);
            return Fcnpc.emit("change-node", npc, npc, node, oldNode);
        });
        amx.onPublicCall("FCNPC_OnFinishMovePath", "ii", (npcid, pathid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const path: FcnpcMovePath = FcnpcMovePath.getById(pathid as number);
            return Fcnpc.emit("finish-move-path", npc, npc, path);
        });
        amx.onPublicCall("FCNPC_OnFinishMovePathPoint", "iii", (npcid, pathid, pointid) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            const path: FcnpcMovePath = FcnpcMovePath.getById(pathid as number);
            return Fcnpc.emit("finish-move-path-point", npc, npc, path, pointid as number);
        });
        amx.onPublicCall("FCNPC_OnChangeHeightPos", "iff", (npcid, newz, oldz) => {
            const npc: Fcnpc = Fcnpc.getById(npcid as number);
            return Fcnpc.emit("change-height-pos", npc, npc, newz as number, oldz as number);
        });
    }

    public static emit<EventKey extends keyof FcnpcEventMap>(key: EventKey, npc: Fcnpc, ...args: Parameters<FcnpcEventMap[EventKey]>): number | void {
        Fcnpc.events.emit(key, ...args);
        const {retval} = npc;
        if(typeof retval === "number")
            return retval;
    }

    public retval?: number;
}

Fcnpc.init();