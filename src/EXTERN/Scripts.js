/*
    This file should contain all the custom scripts that the DumpEm workspaces may utilize.
    The scripts will be stored in the SCRIPTS- variable which will then be exported to
    components.

*/

import { getComponentById } from "../BASE/ComponentRegistry";
import { modifyJsonVanilla, readJson, setCurrentRepository } from "../BASE/Helpers";

/*
    The DumpEm- components will fetch their scripts from this JSON by name.
*/
export var SCRIPTS = {};

/*
    Runs a script with given arguments (the arguments are expected to be
    bundled with "scr_str").

    ARGS:
        scr_str  - Name of the script to execute.
*/
export const runScript = (scr_str) => {
    if( scr_str == null ) return;

    let a_scr_str = scr_str.trim().split(" ");
    let script = a_scr_str.splice(0, 1);
    return SCRIPTS[script[0]](a_scr_str);
}


//////////////////////// CUSTOM SCRIPTS ////////////////////////////

SCRIPTS.scrChooseRepo = () => {
    getComponentById("ROOT-startup-viewer").changeTab(1);
}

SCRIPTS.scrBackToMain = () => {
    getComponentById("ROOT-startup-viewer").changeTab(0);
}

SCRIPTS.scrSelectFolder = (args) => {
    modifyJsonVanilla("config.json", { recentRepo: args });
    setCurrentRepository(args);

    let root = getComponentById("ROOT");
    root.state.config = ".init.json";
    root.reloadConfiguration();
}

SCRIPTS.scrSelectMostRecent = () => {
    setCurrentRepository(readJson("config.json").recentRepo);

    let root = getComponentById("ROOT");
    root.state.config = ".init.json";
    root.reloadConfiguration();
}