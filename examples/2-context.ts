import {GameMode, Player, Weapons} from "@sa-mp/core";
import {Context} from "@sa-mp/decorators";
import {Fcnpc, FcnpcGameModeExtension, FcnpcPlayerExtension, OnFcnpcCreate, OnFcnpcDestroy, PlayerOnFcnpcDeath} from "@sa-mp/fcnpc";

@Context()
export class Mode extends GameMode.Context implements OnFcnpcCreate, OnFcnpcDestroy {
    public onInit(): void {
        Player.addClass({skin: 100, spawn: {x: 1657.7761, y: -1840.0952, z: 13.5463}, angle: 0, weapons: [{type: Weapons.MP5, ammo: 110}]});
        this.setTimeout(() => {
            const npc: Fcnpc = Fcnpc.create("example");
            npc.spawn({skin: 100, x: 1657.7761, y: -1842.0952, z: 13.5463});
            this.setTimeout(() => npc.destroy(), 20000);
        }, 1000);
    }

    public onFcnpcCreate(npc: Fcnpc): void {
        console.log(`Create ${npc}.`);
    }

    public onFcnpcDestroy(npc: Fcnpc): void {
        console.log(`Destroy npc. Id: ${npc.id}.`);
    }
}

@Context()
export class ModePlayer extends Player.Context implements PlayerOnFcnpcDeath {
    public onFcnpcDeath(npc: Fcnpc): void {
        this.send(`Death ${npc}.`, 0xfcba03AA);
        npc.respawn();
    }
}

const gamemodeFactory = GameMode.Factory.create(Mode, [FcnpcGameModeExtension]);
Player.Factory.create(ModePlayer, {gamemodeFactory, extensions: [FcnpcPlayerExtension]});