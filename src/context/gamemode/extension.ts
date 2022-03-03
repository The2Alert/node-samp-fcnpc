import {GameMode} from "@sa-mp/core";
import {Fcnpc, FcnpcGameModeContextEvents} from "../..";

export class FcnpcGameModeExtension extends GameMode.Extension {
    public callEvent<EventName extends keyof FcnpcGameModeContextEvents>(name: EventName, ...args: Parameters<FcnpcGameModeContextEvents[EventName]>): number | undefined {
        return this.factory.callEvent(name, ...args);
    }

    public create(): void {
        Fcnpc.on("create", (npc) => {
            npc.retval = this.callEvent("onFcnpcCreate", npc);
        });
        Fcnpc.on("destroy", (npc) => {
            npc.retval = this.callEvent("onFcnpcDestroy", npc);
        });
        Fcnpc.on("spawn", (npc) => {
            npc.retval = this.callEvent("onFcnpcSpawn", npc);
        });
        Fcnpc.on("respawn", (npc) => {
            npc.retval = this.callEvent("onFcnpcRespawn", npc);
        });
        Fcnpc.on("death", (npc, killer, reason) => {
            npc.retval = this.callEvent("onFcnpcDeath", npc, killer, reason);
        });
        Fcnpc.on("update", (npc) => {
            npc.retval = this.callEvent("onFcnpcUpdate", npc);
        });
        Fcnpc.on("take-damage", (npc, issuer, amount, weapon, bodyPart) => {
            npc.retval = this.callEvent("onFcnpcTakeDamage", npc, issuer, amount, weapon, bodyPart);
        });
        Fcnpc.on("give-damage", (npc, damaged, amount, weapon, bodyPart) => {
            npc.retval = this.callEvent("onFcnpcGiveDamage", npc, damaged, amount, weapon, bodyPart);
        });
        Fcnpc.on("reach-destination", (npc) => {
            npc.retval = this.callEvent("onFcnpcReachDestination", npc);
        });
        Fcnpc.on("weapon-shot", (npc, weapon, hitType, hitId, coord) => {
            npc.retval = this.callEvent("onFcnpcWeaponShot", npc, weapon, hitType, hitId, coord);
        });
        Fcnpc.on("weapon-state-change", (npc, state) => {
            npc.retval = this.callEvent("onFcnpcWeaponStateChange", npc, state);
        });
        Fcnpc.on("stream-in", (npc, forPlayer) => {
            npc.retval = this.callEvent("onFcnpcStreamIn", npc, forPlayer);
        });
        Fcnpc.on("stream-out", (npc, forPlayer) => {
            npc.retval = this.callEvent("onFcnpcStreamOut", npc, forPlayer);
        });
        Fcnpc.on("vehicle-entry-complete", (npc, vehicle, seat) => {
            npc.retval = this.callEvent("onFcnpcVehicleEntryComplete", npc, vehicle, seat);
        });
        Fcnpc.on("vehicle-exit-complete", (npc, vehicle) => {
            npc.retval = this.callEvent("onFcnpcVehicleExitComplete", npc, vehicle);
        });
        Fcnpc.on("vehicle-take-damage", (npc, issuer, vehicle, amount, weapon, coord) => {
            npc.retval = this.callEvent("onFcnpcVehicleTakeDamage", npc, issuer, vehicle, amount, weapon, coord);
        });
        Fcnpc.on("finish-playback", (npc) => {
            npc.retval = this.callEvent("onFcnpcFinishPlayback", npc);
        });
        Fcnpc.on("finish-node", (npc, node) => {
            npc.retval = this.callEvent("onFcnpcFinishNode", npc, node);
        });
        Fcnpc.on("finish-node-point", (npc, node, point) => {
            npc.retval = this.callEvent("onFcnpcFinishNodePoint", npc, node, point);
        });
        Fcnpc.on("change-node", (npc, node, oldNode) => {
            npc.retval = this.callEvent("onFcnpcChangeNode", npc, node, oldNode);
        });
        Fcnpc.on("finish-move-path", (npc, path) => {
            npc.retval = this.callEvent("onFcnpcFinishMovePath", npc, path);
        });
        Fcnpc.on("finish-move-path-point", (npc, path, point) => {
            npc.retval = this.callEvent("onFcnpcFinishMovePathPoint", npc, path, point);
        });
        Fcnpc.on("change-height-pos", (npc, newZ, oldZ) => {
            npc.retval = this.callEvent("onFcnpcChangeHeightPos", npc, newZ, oldZ);
        });
    }
}