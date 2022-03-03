import {Player} from "@sa-mp/core";
import {Fcnpc, FcnpcPlayerContextEvents} from "../..";

export class FcnpcPlayerExtension extends Player.Extension {
    public callEvent<EventName extends keyof FcnpcPlayerContextEvents>(player: Player, name: EventName, ...args: Parameters<FcnpcPlayerContextEvents[EventName]>): number | undefined {
        return this.factory.getPersonal(player).callEvent(name, ...args);
    }

    public create(): void {
        Fcnpc.on("death", (npc, killer, reason) => {
            npc.retval = this.callEvent(killer, "onFcnpcDeath", npc, reason);
        });
        Fcnpc.on("take-damage", (npc, issuer, amount, weapon, bodyPart) => {
            npc.retval = this.callEvent(issuer, "onFcnpcTakeDamage", npc, amount, weapon, bodyPart);
        });
        Fcnpc.on("give-damage", (npc, damaged, amount, weapon, bodyPart) => {
            npc.retval = this.callEvent(damaged, "onFcnpcGiveDamage", npc, amount, weapon, bodyPart);
        });
        Fcnpc.on("stream-in", (npc, forPlayer) => {
            npc.retval = this.callEvent(forPlayer, "onFcnpcStreamIn", npc);
        });
        Fcnpc.on("stream-out", (npc, forPlayer) => {
            npc.retval = this.callEvent(forPlayer, "onFcnpcStreamOut", npc);
        });
        Fcnpc.on("vehicle-take-damage", (npc, issuer, vehicle, amount, weapon, coord) => {
            npc.retval = this.callEvent(issuer, "onFcnpcVehicleTakeDamage", npc, vehicle, amount, weapon, coord);
        });
    }
}