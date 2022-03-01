import * as amx from "@sa-mp/amx";
import {BulletHitTypes, FightStyles, Group, Player, PlayerObject, Position, Position2D, SampObject, SpecialActions, Vehicle, Weapons, WeaponSkills, WeaponStates} from "@sa-mp/core";
import {Fcnpc, FcnpcEntityCheck, FcnpcEntityModes, FcnpcMoveModes, FcnpcMovePath, FcnpcMovePathfinding, FcnpcMoveSpeed, FcnpcMoveTypes, FcnpcNode} from ".";

export interface FcnpcSpawnOptions extends Position {
    skin: number;
}

export interface FcnpcQuaternion extends Position {
    w: number;
}

export interface FcnpcVelocityOptions extends Position {
    updatePos?: boolean;
}

export interface FcnpcWeaponInfo {
    reloadTime: number;
    shootTime: number;
    clipSize: number; 
    accuracy: number;
}

export interface FcnpcKeys {
    udAnalog: number;
    lrAnalog: number;
    keys: number;
}

export interface FcnpcAnimation {
    id: number;
    speed?: number;
    loop?: boolean;
    lockX?: boolean;
    lockY?: boolean;
    freeze?: boolean;
    time?: number;
}

export interface FcnpcSetAnimationByNameOptions {
    name: string;
    speed?: number;
    loop?: boolean;
    lockX?: boolean;
    lockY?: boolean;
    freeze?: boolean;
    time?: number;
}

export interface FcnpcApplyAnimationOptions {
    library: string;
    name: string;
    speed?: number;
    loop?: boolean;
    lockX?: boolean;
    lockY?: boolean;
    freeze?: boolean;
    time?: number;
}

export interface FcnpcGoToOptions extends Position {
    type?: FcnpcMoveTypes;
    speed?: number; 
    mode?: FcnpcMoveModes;
    pathfinding?: FcnpcMovePathfinding;
    radius?: number;
    setAngle?: boolean;
    minDistance?: number;
    stopDelay?: number;
}

export interface FcnpcGoToPlayerOptions {
    player: Player;
    type?: FcnpcMoveTypes;
    speed?: number;
    mode?: FcnpcMoveModes;
    pathfinding?: FcnpcMovePathfinding;
    radius?: number;
    setAngle?: boolean;
    minDistance?: number;
    distCheck?: number;
    stopDelay?: number;
}

export interface FcnpcAimAtOptions extends Position {
    shoot?: boolean;
    shootDelay?: number;
    setAngle?: boolean;
    offsetFrom?: Position;
    betweenCheckMode?: FcnpcEntityModes;
    betweenCheckFlags?: FcnpcEntityCheck;
}

export interface FcnpcAimAtPlayerOptions {
    player: Player;
    shoot?: boolean;
    shootDelay?: number;
    setAngle?: boolean;
    offset?: Position;
    offsetFrom?: Position;
    betweenCheckMode?: FcnpcEntityModes;
    betweenCheckFlags?: FcnpcEntityCheck;
}

export interface FcnpcTriggerWeaponShotOptions extends Position {
    weapon: Weapons;
    hitType: BulletHitTypes; 
    hitId: number; 
    isHit?: boolean; 
    offsetFrom?: Position; 
    betweenCheckMode?: FcnpcEntityModes; 
    betweenCheckFlags?: FcnpcEntityCheck;
}

export interface FcnpcGetClosestEntityInBetweenOptions extends Position {
    range: number;
    betweenCheckMode?: FcnpcEntityModes; 
    betweenCheckFlags?: FcnpcEntityCheck;
    offsetFrom?: Position;
}

export interface FcnpcGetClosestEntityInBetweenResponse {
    id: number;
    type: number;
    objectOwner: Player;
    point: Position;
}

export interface FcnpcStartPlayingPlaybackOptions {
    file?: string;
    record?: number;
    autoUnload?: boolean;
    delta?: Position;
    deltaQ?: {w: number} & Position;
}

export interface FcnpcPlayNodeOptions {
    node: FcnpcNode;
    type?: FcnpcMoveTypes;
    speed?: number;
    mode?: FcnpcMoveModes;
    radius?: number;
    setAngle?: boolean;
}

export interface FcnpcGoOptions {
    path: FcnpcMovePath;
    point?: number;
    type?: FcnpcMoveTypes;
    speed?: number;
    mode?: FcnpcMoveModes;
    pathfinding?: FcnpcMovePathfinding;
    radius?: number;
    setAngle?: boolean;
    minDistance?: number;
}

export class FcnpcFunctions {
    public static getPluginVersion(size: number): string {
        const [version] = amx.callNative("FCNPC_GetPluginVersion", "Si", size, size);
        return version as string;
    }

    public static set updateRate(rate: number) {
        amx.callNative("FCNPC_SetUpdateRate", "i", rate);
    }

    public static get updateRate(): number {
        return amx.callNative("FCNPC_GetUpdateRate", "").retval;
    }

    public static set tickRate(rate: number) {
        amx.callNative("FCNPC_SetTickRate", "i", rate);
    }

    public static get tickRate(): number {
        return amx.callNative("FCNPC_GetTickRate", "").retval;
    }

    public static useMoveMode(mode: FcnpcMoveModes, use: boolean = true): void {
        amx.callNative("FCNPC_UseMoveMode", "ii", mode, Number(use));
    }

    public static isMoveModeUsed(mode: FcnpcMoveModes): boolean {
        return Boolean(amx.callNative("FCNPC_IsMoveModeUsed", "i", mode).retval);
    }

    public static useMovePathfinding(pathfinding: FcnpcMovePathfinding, use: boolean = true): void {
        amx.callNative("FCNPC_UseMovePathfinding", "ii", pathfinding, Number(use));
    }

    public static isMovePathfindingUsed(pathfinding: FcnpcMovePathfinding): boolean {
        return Boolean(amx.callNative("FCNPC_IsMovePathfindingUsed", "i", pathfinding).retval);
    }

    public static useCrashLog(use: boolean = true): void {
        amx.callNative("FCNPC_UseCrashLog", "i", Number(use));
    }

    public static isCrashLogUsed(): boolean {
        return Boolean(amx.callNative("FCNPC_IsCrashLogUsed", "").retval);
    }

    public static getById(id: number): Fcnpc {
        return new Fcnpc(id);
    }

    public static create(name: string): Fcnpc {
        const npc = new Fcnpc(name);
        return npc.create();
    } 

    public static isValid(npc: Fcnpc): boolean {
        return Boolean(amx.callNative("FCNPC_IsValid", "i", npc.id).retval);
    }

    public static getValidArray(size: number): Group<Fcnpc> {
        const [npcs] = amx.callNative("FCNPC_GetValidArray", "Ai", size, size) as unknown as [number[]];
        const result: Group<Fcnpc> = new Group;
        for(const id of npcs)
            result.push(Fcnpc.getById(id));
        return result;
    }

    public static setWeaponDefaultInfo(weapon: Weapons, {reloadTime = -1, shootTime = -1, clipSize = -1, accuracy = 1.0}: Partial<FcnpcWeaponInfo>): void {
        amx.callNative("FCNPC_SetWeaponDefaultInfo", "iiiif", weapon, reloadTime, shootTime, clipSize, accuracy);
    }

    public static getWeaponDefaultInfo(weapon: Weapons): FcnpcWeaponInfo {
        const [reloadTime, shootTime, clipSize, accuracy] = amx.callNative("FCNPC_GetWeaponDefaultInfo", "iIIIF", weapon) as number[];
        return {reloadTime, shootTime, clipSize, accuracy};
    }

    public static loadPlayingPlayback(file: string): void {
        amx.callNative("FCNPC_LoadPlayingPlayback", "s", file);
    }

    public static unloadPlayingPlayback(record: number): void {
        amx.callNative("FCNPC_UnloadPlayingPlayback", "i", record);
    }

    public id: number = -1;

    constructor(public readonly idOrName: number | string) {
        if(typeof idOrName === "number")
            this.id = idOrName;
    }

    public create(): Fcnpc {
        if(typeof this.idOrName === "number")
            return this;
        const name: string = this.idOrName;
        this.id = amx.callNative("FCNPC_Create", "s", name).retval;
        return this;
    }

    public destroy(): boolean {
        return Boolean(amx.callNative("FCNPC_Destroy", "i", this.id).retval);
    }

    public spawn({skin, x, y, z}: FcnpcSpawnOptions): boolean {
        return Boolean(amx.callNative("FCNPC_Spawn", "iifff", this.id, skin, x, y, z).retval);
    }

    public respawn(): boolean {
        return Boolean(amx.callNative("FCNPC_Respawn", "i", this.id).retval);
    }

    public isSpawned(): boolean {
        return Boolean(amx.callNative("FCNPC_IsSpawned", "i", this.id).retval);
    }

    public kill(): boolean {
        return Boolean(amx.callNative("FCNPC_Kill", "i", this.id).retval);
    }

    public isDead(): boolean {
        return Boolean(amx.callNative("FCNPC_IsDead", "i", this.id).retval);
    }

    public isStreamedIn(forPlayer: Player): boolean {
        return Boolean(amx.callNative("FCNPC_IsStreamedIn", "ii", this.id, forPlayer.id).retval);
    }

    public isStreamedInForAnyone(): boolean {
        return Boolean(amx.callNative("FCNPC_IsStreamedInForAnyone", "i", this.id).retval);
    }

    public set pos({x, y, z}: Position) {
        amx.callNative("FCNPC_SetPosition", "ifff", this.id, x, y, z);
    }

    public get pos(): Position {
        const [x, y, z] = amx.callNative("FCNPC_GetPosition", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public givePosition({x, y, z}: Position): void {
        amx.callNative("FCNPC_GivePosition", "ifff", this.id, x, y, z);
    }

    public set angle(angle: number) {
        amx.callNative("FCNPC_SetAngle", "if", this.id, angle);
    }

    public get angle(): number {
        return amx.callNativeInFloat("FCNPC_GetAngle", "i", this.id).retval;
    }

    public giveAngle(angle: number): number {
        return amx.callNativeInFloat("FCNPC_GiveAngle", "if", this.id, angle).retval;
    }

    public setAngleToPos({x, y}: Position2D): void {
        amx.callNative("FCNPC_SetAngleToPos", "iff", this.id, x, y);
    }

    public setAngleToPlayer(player: Player): void {
        amx.callNative("FCNPC_SetAngleToPlayer", "ii", this.id, player.id);
    }

    public set quaternion({w, x, y, z}: FcnpcQuaternion) {
        amx.callNative("FCNPC_SetQuaternion", "iffff", this.id, w, x, y, z);
    }

    public get quaternion(): FcnpcQuaternion {
        const [w, x, y, z] = amx.callNative("FCNPC_GetQuaternion", "iFFFF", this.id) as number[];
        return {w, x, y, z};
    }

    public giveQuaternion({w, x, y, z}: FcnpcQuaternion): void {
        amx.callNative("FCNPC_GiveQuaternion", "iffff", this.id, w, x, y, z);
    }

    public set velocity({x, y, z, updatePos = false}: FcnpcVelocityOptions) {
        amx.callNative("FCNPC_SetVelocity", "ifffi", this.id, x, y, z, Number(updatePos));
    }

    public get velocity(): Position {
        const [x, y, z] = amx.callNative("FCNPC_GetVelocity", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public giveVelocity({x, y, z, updatePos = false}: FcnpcVelocityOptions): void {
        amx.callNative("FCNPC_GiveVelocity", "ifffi", this.id, x, y, z, Number(updatePos));
    }

    public set speed(speed: number) {
        amx.callNative("FCNPC_SetSpeed", "if", this.id, speed);
    }

    public get speed(): number {
        return amx.callNativeInFloat("FCNPC_GetSpeed", "i", this.id).retval;
    }
 
    public set interior(interior: number) {
        amx.callNative("FCNPC_SetInterior", "ii", this.id, interior);
    }

    public get interior(): number {
        return amx.callNative("FCNPC_GetInterior", "i", this.id).retval;
    }

    public set world(world: number) {
        amx.callNative("FCNPC_SetVirtualWorld", "ii", this.id, world);
    }

    public get world(): number {
        return amx.callNative("FCNPC_GetVirtualWorld", "i", this.id).retval;
    }

    public set health(health: number) {
        amx.callNative("FCNPC_SetHealth", "if", this.id, health);
    }

    public get health(): number {
        return amx.callNativeInFloat("FCNPC_GetHealth", "i", this.id).retval;
    }

    public giveHealth(health: number): number {
        return amx.callNativeInFloat("FCNPC_GiveHealth", "if", this.id, health).retval;
    }

    public set armour(armour: number) {
        amx.callNative("FCNPC_SetArmour", "if", this.id, armour);
    }

    public get armour(): number {
        return amx.callNativeInFloat("FCNPC_GetArmour", "i", this.id).retval;
    }

    public giveArmour(armour: number): number {
        return amx.callNativeInFloat("FCNPC_GiveArmour", "if", this.id, armour).retval;
    }

    public set invulnerable(invulnerable: boolean) {
        amx.callNative("FCNPC_SetInvulnerable", "ii", this.id, Number(invulnerable));
    }

    public get invulnerable(): boolean {
        return Boolean(amx.callNative("FCNPC_IsInvulnerable", "i", this.id).retval);
    }

    public set skin(skin: number) {
        amx.callNative("FCNPC_SetSkin", "ii", this.id, skin);
    }

    public get skin(): number {
        return amx.callNative("FCNPC_GetSkin", "i", this.id).retval;
    }

    public set weapon(weapon: Weapons) {
        amx.callNative("FCNPC_SetWeapon", "ii", this.id, weapon);
    }

    public get weapon(): Weapons {
        return amx.callNative("FCNPC_GetWeapon", "i", this.id).retval;
    }

    public set ammo(ammo: number) {
        amx.callNative("FCNPC_SetAmmo", "ii", this.id, ammo);
    }

    public get ammo(): number {
        return amx.callNative("FCNPC_GetAmmo", "i", this.id).retval;
    }

    public giveAmmo(ammo: number): void {
        amx.callNative("FCNPC_GiveAmmo", "ii", this.id, ammo);
    }

    public setAmmoInClip(ammo: number): void {
        amx.callNative("FCNPC_SetAmmoInClip", "ii", this.id, ammo);
    }

    public giveAmmoInClip(ammo: number): void {
        amx.callNative("FCNPC_GiveAmmoInClip", "ii", this.id, ammo);
    }

    public getAmmoInClip(): number {
        return amx.callNative("FCNPC_GetAmmoInClip", "i", this.id).retval;
    }

    public skillLevel(skill: WeaponSkills, level: number): void {
        amx.callNative("FCNPC_SetWeaponSkillLevel", "iii", this.id, skill, level);
    }

    public giveSkillLevel(skill: WeaponSkills, level: number): void {
        amx.callNative("FCNPC_GiveWeaponSkillLevel", "iii", this.id, skill, level);
    }

    public getSkillLevel(skill: WeaponSkills): number {
        return amx.callNative("FCNPC_GetWeaponSkillLevel", "ii", this.id, skill).retval;
    }

    public set weaponState(state: WeaponStates) {
        amx.callNative("FCNPC_SetWeaponState", "ii", this.id, state);
    }

    public get weaponState(): WeaponStates {
        return amx.callNative("FCNPC_GetWeaponState", "i", this.id).retval;
    }

    public setWeaponReloadTime(weapon: Weapons, time: number): void {
        amx.callNative("FCNPC_SetWeaponReloadTime", "iii", this.id, weapon, time);
    }

    public getWeaponReloadTime(weapon: Weapons): number {
        return amx.callNative("FCNPC_GetWeaponReloadTime", "ii", this.id, weapon).retval;
    }

    public getWeaponActualReloadTime(weapon: Weapons): void {
        amx.callNative("FCNPC_GetWeaponActualReloadTime", "ii", this.id, weapon);
    }

    public setWeaponShootTime(weapon: Weapons, time: number): void {
        amx.callNative("FCNPC_SetWeaponShootTime", "iii", this.id, weapon, time);
    }

    public getWeaponShootTime(weapon: Weapons): number {
        return amx.callNative("FCNPC_GetWeaponShootTime", "ii", this.id, weapon).retval;
    }

    public setWeaponClipSize(weapon: Weapons, size: number): void {
        amx.callNative("FCNPC_SetWeaponClipSize", "iii", this.id, weapon, size);
    }

    public getWeaponClipSize(weapon: Weapons): number {
        return amx.callNative("FCNPC_GetWeaponClipSize", "ii", this.id, weapon).retval;
    }

    public getWeaponActualClipSize(weapon: Weapons): number {
        return amx.callNative("FCNPC_GetWeaponActualClipSize", "ii", this.id, weapon).retval;
    }

    public setWeaponAccuracy(weapon: Weapons, accuracy: number): void {
        amx.callNative("FCNPC_SetWeaponAccuracy", "iif", this.id, weapon, accuracy);
    }

    public getWeaponAccuracy(weapon: Weapons): number {
        return amx.callNativeInFloat("FCNPC_GetWeaponAccuracy", "ii", this.id, weapon).retval;
    }

    public setWeaponInfo(weapon: Weapons, {reloadTime = -1, shootTime = -1, clipSize = -1, accuracy = 1.0}: Partial<FcnpcWeaponInfo>): void {
        amx.callNative("FCNPC_SetWeaponInfo", "iiiiif", this.id, weapon, reloadTime, shootTime, clipSize, accuracy);
    }

    public getWeaponInfo(weapon: Weapons): FcnpcWeaponInfo {
        const [reloadTime, shootTime, clipSize, accuracy] = amx.callNative("FCNPC_GetWeaponInfo", "iiIIIF", this.id, weapon) as number[];
        return {reloadTime, shootTime, clipSize, accuracy};
    }

    public set keys({udAnalog, lrAnalog, keys}: FcnpcKeys) {
        amx.callNative("FCNPC_SetKeys", "iiii", this.id, udAnalog, lrAnalog, keys);
    }

    public get keys(): FcnpcKeys {
        const [udAnalog, lrAnalog, keys] = amx.callNative("FCNPC_GetKeys", "iIII", this.id) as number[];
        return {udAnalog, lrAnalog, keys};
    }

    public set specialAction(action: SpecialActions) {
        amx.callNative("FCNPC_SetSpecialAction", "ii", this.id, action);
    }

    public get specialAction(): SpecialActions {
        return amx.callNative("FCNPC_GetSpecialAction", "i", this.id).retval;
    }

    public setAnimation({id, speed = 4.1, loop = false, lockX = true, lockY = true, freeze = false, time = 1}: FcnpcAnimation): boolean {
        return Boolean(amx.callNative("FCNPC_SetAnimation", "iifiiiii", this.id, id, speed, Number(loop), Number(lockX), Number(lockY), Number(freeze), time).retval);
    }

    public setAnimationByName({name, speed = 4.1, loop = false, lockX = true, lockY = true, freeze = false, time = 1}: FcnpcSetAnimationByNameOptions): boolean {
        return Boolean(amx.callNative("FCNPC_SetAnimationByName", "isfiiiii", this.id, name, speed, Number(loop), Number(lockX), Number(lockY), Number(freeze), time).retval);
    }

    public resetAnimation(): boolean {
        return Boolean(amx.callNative("FCNPC_ResetAnimation", "i", this.id).retval);
    }

    public getAnimation(): FcnpcAnimation {
        const [id, speed, loop, lockX, lockY, freeze, time] = amx.callNative("FCNPC_GetAnimation", "iIFIIIII", this.id) as number[];
        return {id, speed, loop: Boolean(loop), lockX: Boolean(lockX), lockY: Boolean(lockY), freeze: Boolean(freeze), time};
    }

    public anim({library, name, speed = 4.1, loop = false, lockX = true, lockY = true, freeze = false, time = 1}: FcnpcApplyAnimationOptions): boolean {
        return Boolean(amx.callNative("FCNPC_ApplyAnimation", "issfiiiii", this.id, library, name, speed, Number(loop), Number(lockX), Number(lockY), Number(freeze), time).retval);
    }

    public clearAnims(): boolean {
        return Boolean(amx.callNative("FCNPC_ClearAnimations", "i", this.id).retval);
    }

    public set fightingStyle(style: FightStyles) {
        amx.callNative("FCNPC_SetFightingStyle", "ii", this.id, style);
    }

    public get fightingStyle(): FightStyles {
        return amx.callNative("FCNPC_GetFightingStyle", "i", this.id).retval;
    }

    public useReloading(use: boolean = true): void {
        amx.callNative("FCNPC_UseReloading", "ii", this.id, Number(use));
    }

    public isReloadingUsed(): boolean {
        return Boolean(amx.callNative("FCNPC_IsReloadingUsed", "i", this.id).retval);
    }

    public useInfiniteAmmo(use: boolean = true): void {
        amx.callNative("FCNPC_UseInfiniteAmmo", "ii", this.id, Number(use));
    }

    public isInfiniteAmmoUsed(): boolean {
        return Boolean(amx.callNative("FCNPC_IsInfiniteAmmoUsed", "i", this.id).retval);
    }

    public goTo({x, y, z, type = FcnpcMoveTypes.AUTO, speed = FcnpcMoveSpeed.AUTO, mode = FcnpcMoveModes.AUTO, pathfinding = FcnpcMovePathfinding.AUTO, radius = 0.0, setAngle = true, minDistance = 0.0, stopDelay = 250}: FcnpcGoToOptions): void {
        amx.callNative("FCNPC_GoTo", "ifffifiififi", this.id, x, y, z, type, speed, mode, pathfinding, radius, Number(setAngle), minDistance, stopDelay);
    }

    public goToPlayer({player, type = FcnpcMoveTypes.AUTO, speed = FcnpcMoveSpeed.AUTO, mode = FcnpcMoveModes.AUTO, pathfinding = FcnpcMovePathfinding.AUTO, radius = 0.0, setAngle = true, minDistance = 0.0, distCheck = 1.5, stopDelay = 250}: FcnpcGoToPlayerOptions): void {
        amx.callNative("FCNPC_GoToPlayer", "iiifiififfi", this.id, player.id, type, speed, mode, pathfinding, radius, Number(setAngle), minDistance, distCheck, stopDelay);
    }

    public stop(): void {
        amx.callNative("FCNPC_Stop", "i", this.id);
    }

    public isMoving(): boolean {
        return Boolean(amx.callNative("FCNPC_IsMoving", "i", this.id).retval);
    }

    public isMovingAtPlayer(player: Player): boolean {
        return Boolean(amx.callNative("FCNPC_IsMovingAtPlayer", "ii", this.id, player.id).retval);
    }

    public get destinationPoint(): Position {
        const [x, y, z] = amx.callNative("FCNPC_GetDestinationPoint", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public aimAt({x, y, z, shoot = false, shootDelay = -1, setAngle = true, offsetFrom = {x: 0.0, y: 0.0, z: 0.0}, betweenCheckMode = FcnpcEntityModes.AUTO, betweenCheckFlags = FcnpcEntityCheck.ALL}: FcnpcAimAtOptions): void {
        amx.callNative("FCNPC_AimAt", "ifffiiifffii", this.id, x, y, z, Number(shoot), shootDelay, Number(setAngle), offsetFrom.x, offsetFrom.y, offsetFrom.z, betweenCheckMode, betweenCheckFlags);
    }

    public aimAtPlayer({player, shoot = false, shootDelay = -1, setAngle = true, offset = {x: 0.0, y: 0.0, z: 0.0}, offsetFrom = {x: 0.0, y: 0.0, z: 0.0}, betweenCheckMode = FcnpcEntityModes.AUTO, betweenCheckFlags = FcnpcEntityCheck.ALL}: FcnpcAimAtPlayerOptions): void {
        amx.callNative("FCNPC_AimAtPlayer", "iiiiiffffffii", this.id, player.id, Number(shoot), shootDelay, Number(setAngle), offset.x, offset.y, offset.z, offsetFrom.x, offsetFrom.y, offsetFrom.z, betweenCheckMode, betweenCheckFlags);
    }

    public stopAim(): void {
        amx.callNative("FCNPC_StopAim", "i", this.id);
    }

    public meleeAttack(delay: number = -1, fightingStyle: boolean = false): void {
        amx.callNative("FCNPC_MeleeAttack", "iii", this.id, delay, Number(fightingStyle));
    }

    public stopAttack(): void {
        amx.callNative("FCNPC_StopAttack", "i", this.id);
    }

    public isAttacking(): boolean {
        return Boolean(amx.callNative("FCNPC_IsAttacking", "i", this.id).retval);
    }

    public isAiming(): boolean {
        return Boolean(amx.callNative("FCNPC_IsAiming", "i", this.id).retval);
    }

    public isAimingAtPlayer(player: Player): boolean {
        return Boolean(amx.callNative("FCNPC_IsAimingAtPlayer", "ii", this.id, player.id).retval);
    }

    public getAimingPlayer(): Player {
        return Player.getById(amx.callNative("FCNPC_GetAimingPlayer", "i", this.id).retval);
    }

    public isShooting(): boolean {
        return Boolean(amx.callNative("FCNPC_IsShooting", "i", this.id).retval);
    }

    public isReloading(): boolean {
        return Boolean(amx.callNative("FCNPC_IsReloading", "i", this.id).retval);
    }

    public triggerWeaponShot({weapon, hitType, hitId, x, y, z, isHit = true, offsetFrom = {x: 0.0, y: 0.0, z: 0.0}, betweenCheckMode = FcnpcEntityModes.AUTO, betweenCheckFlags = FcnpcEntityCheck.ALL}: FcnpcTriggerWeaponShotOptions): void {
        amx.callNative("FCNPC_TriggerWeaponShot", "iiiifffifffii", this.id, weapon, hitType, hitId, x, y, z, Number(isHit), offsetFrom.x, offsetFrom.y, offsetFrom.z, betweenCheckMode, betweenCheckFlags);
    }

    public getClosestEntityInBetween({x, y, z, range, betweenCheckMode = FcnpcEntityModes.AUTO, betweenCheckFlags = FcnpcEntityCheck.ALL, offsetFrom = {x: 0.0, y: 0.0, z: 0.0}}: FcnpcGetClosestEntityInBetweenOptions): FcnpcGetClosestEntityInBetweenResponse {
        const [id, type, objectOwnerId, pointX, pointY, pointZ] = amx.callNative("FCNPC_GetClosestEntityInBetween", "iffffiifffIIIFFF", this.id, x, y, z, range, betweenCheckMode, betweenCheckFlags, offsetFrom.x, offsetFrom.y, offsetFrom.z) as number[];
        return {id, type, objectOwner: Player.getById(objectOwnerId), point: {x: pointX, y: pointY, z: pointZ}};
    }

    public enterVehicle(vehicle: Vehicle, seat: number = 0, type: FcnpcMoveTypes = FcnpcMoveTypes.WALK): void {
        amx.callNative("FCNPC_EnterVehicle", "iiii", this.id, vehicle.id, seat, type);
    }

    public exitVehicle(): void {
        amx.callNative("FCNPC_ExitVehicle", "i", this.id);
    }

    public put(vehicle: Vehicle, seat: number = 0): void {
        amx.callNative("FCNPC_PutInVehicle", "iii", this.id, vehicle.id, seat);
    }

    public removeFromVehicle(): void {
        amx.callNative("FCNPC_RemoveFromVehicle", "i", this.id);
    }

    public get vehicle(): Vehicle {
        return Vehicle.getById(amx.callNative("FCNPC_GetVehicleID", "i", this.id).retval);
    }

    public get vehicleSeat(): number {
        return amx.callNative("FCNPC_GetVehicleSeat", "i", this.id).retval;
    }

    public useVehicleSiren(use: boolean = true): void {
        amx.callNative("FCNPC_UseVehicleSiren", "ii", this.id, Number(use));
    }

    public isVehicleSirenUsed(): boolean {
        return Boolean(amx.callNative("FCNPC_IsVehicleSirenUsed", "i", this.id).retval);
    }

    public set vehicleHealth(health: number) {
        amx.callNative("FCNPC_SetVehicleHealth", "if", this.id, health);
    }

    public get vehicleHealth(): number {
        return amx.callNativeInFloat("FCNPC_GetVehicleHealth", "i", this.id).retval;
    }

    public set vehicleHydraThrusters(direction: number) {
        amx.callNative("FCNPC_SetVehicleHydraThrusters", "ii", this.id, direction);
    }

    public get vehicleHydraThrusters(): number {
        return amx.callNative("FCNPC_GetVehicleHydraThrusters", "i", this.id).retval;
    }

    public set vehicleGearState(state: number) {
        amx.callNative("FCNPC_SetVehicleGearState", "ii", this.id, state);
    }

    public get vehicleGearState(): number {
        return amx.callNative("FCNPC_GetVehicleGearState", "i", this.id).retval;
    }

    public set vehicleTrainSpeed(speed: number) {
        amx.callNative("FCNPC_SetVehicleTrainSpeed", "if", this.id, speed);
    }

    public get vehicleTrainSpeed(): number {
        return amx.callNativeInFloat("FCNPC_GetVehicleTrainSpeed", "i", this.id).retval;
    }

    public surfing(element: Position | Vehicle | SampObject | PlayerObject): void {
        if(element instanceof Vehicle)
            amx.callNative("FCNPC_SetSurfingVehicle", "ii", this.id, element.id);
        else if(element instanceof SampObject)
            amx.callNative("FCNPC_SetSurfingObject", "ii", this.id, element.id);
        else if(element instanceof PlayerObject)
            amx.callNative("FCNPC_SetSurfingPlayerObject", "ii", this.id, element.id);
        else amx.callNative("FCNPC_SetSurfingOffsets", "ifff", this.id, element.x, element.y, element.z);
    }

    public giveSurfingOffsets({x, y, z}: Position): void {
        amx.callNative("FCNPC_GiveSurfingOffsets", "ifff", this.id, x, y, z);
    }

    public get surfingOffsets(): Position {
        const [x, y, z] = amx.callNative("FCNPC_GetSurfingOffsets", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public get surfingVehicle(): Vehicle {
        return Vehicle.getById(amx.callNative("FCNPC_GetSurfingVehicle", "i", this.id).retval);
    }

    public get surfingObject(): SampObject {
        return SampObject.getById(amx.callNative("FCNPC_GetSurfingObject", "i", this.id).retval);
    }

    public getSurfingPlayerObject(player: Player): PlayerObject {
        return PlayerObject.getById(amx.callNative("FCNPC_GetSurfingPlayerObject", "i", this.id).retval, player);
    }

    public stopSurfing(): void {
        amx.callNative("FCNPC_StopSurfing", "i", this.id);
    }

    public startPlayingPlayback({file = "", record = Fcnpc.constants.INVALID_RECORD_ID, autoUnload = false, delta = {x: 0.0, y: 0.0, z: 0.0}, deltaQ = {w: 0.0, x: 0.0, y: 0.0, z: 0.0}}: FcnpcStartPlayingPlaybackOptions): void {
        amx.callNative("FCNPC_StartPlayingPlayback", "isiifffffff", this.id, file, record, Number(autoUnload), delta.x, delta.y, delta.z, deltaQ.w, deltaQ.x, deltaQ.y, deltaQ.z);
    }

    public stopPlayingPlayback(): void {
        amx.callNative("FCNPC_StopPlayingPlayback", "i", this.id);
    }

    public pausePlayingPlayback(): void {
        amx.callNative("FCNPC_PausePlayingPlayback", "i", this.id);
    }

    public resumePlayingPlayback(): void {
        amx.callNative("FCNPC_ResumePlayingPlayback", "i", this.id);
    }

    public setPlayingPlaybackPath(path: string): void {
        amx.callNative("FCNPC_SetPlayingPlaybackPath", "is", this.id, path);
    }

    public getPlayingPlaybackPath(size: number): string {
        const [path] = amx.callNative("FCNPC_GetPlayingPlaybackPath", "iSi", this.id, size, size) as string[];
        return path;
    }

    public playNode({node, type = FcnpcMoveTypes.AUTO, speed = FcnpcMoveSpeed.AUTO, mode = FcnpcMoveModes.AUTO, radius = 0.0, setAngle = true}: FcnpcPlayNodeOptions): void {
        amx.callNative("FCNPC_PlayNode", "iiififi", this.id, node.id, type, speed, mode, radius, Number(setAngle));
    }

    public stopPlayingNode(): void {
        amx.callNative("FCNPC_StopPlayingNode", "i", this.id);
    }

    public pausePlayingNode(): void {
        amx.callNative("FCNPC_PausePlayingNode", "i", this.id);
    }

    public resumePlayingNode(): void {
        amx.callNative("FCNPC_ResumePlayingNode", "i", this.id);
    }

    public isPlayingNode(): boolean {
        return Boolean(amx.callNative("FCNPC_IsPlayingNode", "i", this.id).retval);
    }

    public isPlayingNodePaused(): boolean {
        return Boolean(amx.callNative("FCNPC_IsPlayingNodePaused", "i", this.id).retval);
    }

    public go({path, point = 0, type = FcnpcMoveTypes.AUTO, speed = FcnpcMoveSpeed.AUTO, mode = FcnpcMoveModes.AUTO, pathfinding = FcnpcMovePathfinding.AUTO, radius = 0.0, setAngle = true, minDistance = 0.0}: FcnpcGoOptions): void {
        amx.callNative("FCNPC_GoByMovePath", "iiiifiifif", this.id, path.id, point, type, speed, mode, pathfinding, radius, Number(setAngle), minDistance);
    }

    public set moveMode(mode: FcnpcMoveModes) {
        amx.callNative("FCNPC_SetMoveMode", "ii", this.id, mode);
    }

    public get moveMode(): FcnpcMoveModes {
        return amx.callNative("FCNPC_GetMoveMode", "i", this.id).retval;
    }

    public setMinHeightPosCall(height: number): void {
        amx.callNative("FCNPC_SetMinHeightPosCall", "if", this.id, height);
    }

    public getMinHeightPosCall(): number {
        return amx.callNativeInFloat("FCNPC_GetMinHeightPosCall", "i", this.id).retval;
    }

    public showInTabListForPlayer(forPlayer: Player): void {
        amx.callNative("FCNPC_ShowInTabListForPlayer", "ii", this.id, forPlayer.id);
    }

    public hideInTabListForPlayer(forPlayer: Player): void {
        amx.callNative("FCNPC_HideInTabListForPlayer", "ii", this.id, forPlayer.id);
    }
}