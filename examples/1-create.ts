import {FightStyles, GameMode, Player, Weapons} from "@sa-mp/core";
import {Fcnpc} from "@sa-mp/fcnpc";

GameMode.on("init", () => {
    Player.addClass({skin: 100, spawn: {x: 1657.7761, y: -1840.0952, z: 13.5463}, angle: 0, weapons: [{type: Weapons.AK47, ammo: 89}]});
    const npc: Fcnpc = Fcnpc.create("example");
    npc.spawn({skin: 100, x: 1657.7761, y: -1842.0952, z: 13.5463});
    npc.fightingStyle = FightStyles.BOXING;
    npc.meleeAttack(1000, true);
});

Fcnpc.on("death", (npc) => {
    console.log(`${npc} death.`);
    npc.respawn();
});