import * as amx from "@sa-mp/amx";
import {Position} from "@sa-mp/core";

export interface FcnpcNodeInfo {
    vehnodes: number;
    pednodes: number;
    navinode: number;
}

export class FcnpcNode {
    public static getById(id: number): FcnpcNode {
        return new FcnpcNode(id);
    } 

    public static open(id: number): FcnpcNode {
        const node: FcnpcNode = FcnpcNode.getById(id);
        return node.open();
    }

    private constructor(public readonly id: number) {}

    public open(): FcnpcNode {
        amx.callNative("FCNPC_OpenNode", "i", this.id);
        return this;
    }

    public close(): void {
        amx.callNative("FCNPC_CloseNode", "i", this.id);
    }

    public isOpen(): boolean {
        return Boolean(amx.callNative("FCNPC_IsNodeOpen", "i", this.id).retval);
    }

    public get type(): number {
        return amx.callNative("FCNPC_GetNodeType", "i", this.id).retval;
    }

    public set point(point: number) {
        amx.callNative("FCNPC_SetNodePoint", "ii", this.id, point);
    }

    public get pointPos(): Position {
        const [x, y, z] = amx.callNative("FCNPC_GetNodePointPosition", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public get pointCount(): number {
        return amx.callNative("FCNPC_GetNodePointCount", "i", this.id).retval;
    }

    public get info(): FcnpcNodeInfo {
        const [vehnodes, pednodes, navinode] = amx.callNative("FCNPC_GetNodeInfo", "iIII", this.id) as number[];
        return {vehnodes, pednodes, navinode};
    }
}