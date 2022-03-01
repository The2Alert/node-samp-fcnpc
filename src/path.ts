import * as amx from "@sa-mp/amx";
import {Position} from "@sa-mp/core";
import {Fcnpc} from ".";

export class FcnpcMovePath {
    public static getById(id: number): FcnpcMovePath {
        return new FcnpcMovePath(id);
    }

    public static create(): FcnpcMovePath {
        const path = new FcnpcMovePath;
        return path.create();
    }

    public static isValid(path: FcnpcMovePath): boolean {
        return Boolean(amx.callNative("FCNPC_IsValidMovePath", "i", path.id).retval);
    }

    private constructor(public id: number = Fcnpc.constants.INVALID_MOVEPATH_ID) {}

    public create(): FcnpcMovePath {
        this.id = amx.callNative("FCNPC_CreateMovePath", "").retval; 
        return this;
    }

    public destroy(): boolean {
        return Boolean(amx.callNative("FCNPC_DestroyMovePath", "i", this.id).retval);
    }

    public addPoint({x, y, z}: Position): void {
        amx.callNative("FCNPC_AddPointToMovePath", "ifff", this.id, x, y, z);
    }

    public addPoints(points: Position[]): void {
        const pointsX: number[] = [];
        const pointsY: number[] = [];
        const pointsZ: number[] = [];
        for(const {x, y, z} of points) {
            pointsX.push(x);
            pointsY.push(y);
            pointsZ.push(z);
        }
        amx.callNative("FCNPC_AddPointsToMovePath2", "ivvvi", this.id, pointsX, pointsY, pointsZ, points.length);
    }

    public removePoint(id: number): boolean {
        return Boolean(amx.callNative("FCNPC_RemovePointFromMovePath", "ii", this.id, id).retval);
    }

    public isValidPoint(id: number): boolean {
        return Boolean(amx.callNative("FCNPC_IsValidMovePathPoint", "ii", this.id, id).retval);
    }

    public getPoint(id: number): Position {
        const [x, y, z] = amx.callNative("FCNPC_GetMovePathPoint", "iiFFF", this.id, id) as number[];
        return {x, y, z};
    }

    public get numberPoint(): number {
        return amx.callNative("FCNPC_GetNumberMovePathPoint", "i", this.id).retval;
    }
}