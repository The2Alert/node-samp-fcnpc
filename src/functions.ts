import * as amx from "@sa-mp/amx";
import {Fcnpc, FcnpcMoveModes, FcnpcMovePathfinding} from ".";

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
}