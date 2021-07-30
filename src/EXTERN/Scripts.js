/*
    This file should contain all the custom scripts that the DumpEm workspaces may utilize.
    The scripts will be stored in the SCRIPTS- variable which will then be exported to
    components.

*/

import { getComponentById } from "../BASE/ComponentRegistry";
import { modifyJsonVanilla, readJson, setCurrentRepository } from "../BASE/Helpers";
const fs = window.require("fs");


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

SCRIPTS.scrExtractSymbolData = () => {
    let comp = getComponentById("workspace_2021__1-ws_tab__1627239518953-symbol_list__1627245422733");

    if( comp == null || comp.state.symbolData.length > 0 ) return;

    let file = fs.readFileSync("C:\\Users\\User\\Desktop\\filez\\site.html", { encoding: "utf8" });
    let symbols = [];
    let token = "<a href=\"https://www.kauppalehti.fi/porssi/porssikurssit/osake/";
    let index = 0;

    while( (index = file.indexOf(token, index)) >= 0 )
    {
            // Find the ticker symbol
        let symbol = {}
        symbol.ticker = file.substring(index + token.length, file.indexOf("\"", index + token.length));
        index += token.length;

            // Find the company name
        symbol.name = file.substring(file.indexOf(">", index) + 1, file.indexOf("<", index));

            // Find the beginning of the volume
        let next_index = file.indexOf(token, index);
        let tag = "<span class=\"monospace\">";

        for( let i = 0; i < 4; i++ ) index = file.indexOf(tag, index) + tag.length;

        symbol.volume = "€" + file.substring(index, file.indexOf("<", index)) + " ";
        tag = "<span class=\"thinsp faux\"></span>";

            // Find the remaining parts of the volume
        while( (index = file.indexOf(tag, index)) >= 0 && index < next_index )
        {
            symbol.volume += file.substring(index + tag.length, file.indexOf("<", index + tag.length)) + " ";
            index += tag.length;
        }

        symbols.push({
            data: [
                symbol.name,
                symbol.volume,
                symbol.ticker
            ]
        });
        index = next_index - 1;

        if( next_index < 0 ) break;

        comp.addEntry(symbols);
    }
}