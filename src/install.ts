import {join} from "path";
import {mkdir} from "fs/promises";
import * as download from "download";

export async function install(): Promise<void> {
    const pluginsPath: string = join(__dirname, "../plugins");
    await mkdir(pluginsPath);
    if(process.platform === "win32")
        await download("https://github.com/dev2alert/node-samp-fcnpc/releases/download/1.0.0/FCNPC.dll", pluginsPath);
    else await download("https://github.com/dev2alert/node-samp-fcnpc/releases/download/1.0.0/FCNPC.so", pluginsPath);
}

install();