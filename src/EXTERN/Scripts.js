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
    if( comp == null ) return;

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

        symbol.volume = file.substring(index, file.indexOf("<", index)) + " ";
        tag = "<span class=\"thinsp faux\"></span>";

            // Find the remaining parts of the volume
        while( (index = file.indexOf(tag, index)) >= 0 && index < next_index )
        {
            symbol.volume += file.substring(index + tag.length, file.indexOf("<", index + tag.length)) + " ";
            index += tag.length;
        }

        symbols.push({
            data: [
                { dataPoint: symbol.name, visible: true },
                { dataPoint: "€ " + symbol.volume, visible: true },
                { dataPoint: symbol.ticker, visible: true }
            ],
            color: (parseInt(symbol.volume.replaceAll(" ", "")) > 25000) ? "#93FF66" : "#FFA8A8"
        });

        index = next_index - 1;

        if( next_index < 0 ) break;
        comp.addEntry(symbols);
    }
}

SCRIPTS.scrDeriveSymbolsFromList = (args) => {
    if( args == null || args.length < 3 ) return;
    let arg_comp_src = args[0] || null;
    let arg_comp_dest = args[1] || null;
    let arg_excl = args[2] || null;

    if( arg_excl == null ) return;
    let comp_src = getComponentById(arg_comp_src);
    let comp_dest = getComponentById(arg_comp_dest);

    if( comp_dest.state.symbolData.length > 0 ) return;
    if( comp_src == null ) return;
    if( comp_dest == null ) return;

    let symbols = [];
    for( let s of comp_src.state.symbolData )
    if( s.color !== arg_excl ) symbols.push({ data: s.data, color: null });

    comp_dest.addEntry(symbols);
}

SCRIPTS.scrGetFirstPhaseSymbols = () => {
    SCRIPTS.scrDeriveSymbolsFromList([
        "workspace_2021__1-ws_tab__1627239518953-symbol_list__1627245422733",
        "workspace_2021__1-ws_tab__1627239838495-symbol_list__1627663811781",
        "#93FF66"
    ]);
}