/*
    This file should contain all the custom scripts that the DumpEm workspaces may utilize.
    The scripts will be stored in the SCRIPTS- variable which will then be exported to
    components.

*/

import { getComponentById } from "../BASE/ComponentRegistry";
import { getCurrentRepository, modifyJsonVanilla, readJson, setCurrentRepository, writeJson } from "../BASE/Helpers";
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

    // Extracts symbol data from Kauppalehti
SCRIPTS.scrExtractSymbolData = () => {
    let comp = getComponentById("workspace_2021__1-ws_tab__1627743968758-sl_filter_volume");
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

    // Copies elements from a symbol list to another excluding all
    // symbols that do NOT have the color provided in 'args'.
SCRIPTS.scrDeriveSymbolsFromList = (args) => {
    if( args == null || args.length < 3 ) return;
    let arg_comp_src = args[0];
    let arg_comp_dest = args[1];
    let arg_excl = args[2];

    if( arg_excl == null ) return;
    let comp_src = getComponentById(arg_comp_src);
    let comp_dest = getComponentById(arg_comp_dest);

    if( comp_dest.state.symbolData.length > 0 ) return;
    if( comp_src == null ) return;
    if( comp_dest == null ) return;

    let symbols = [];
    for( let s of comp_src.state.symbolData )
    if( s.color === arg_excl || arg_excl.includes("," + s.color + ",") )
    symbols.push({ data: s.data, color: null });

    comp_dest.addEntry(symbols);
}

    // Copies elements from the Volume- filter
SCRIPTS.scrGetVolumeFilteredSymbols = () => {
    SCRIPTS.scrDeriveSymbolsFromList([
        "workspace_2021__1-ws_tab__1627743968758-sl_filter_volume",
        "workspace_2021__1-ws_tab__1627744203469-sl_filter_priceaction",
        "#93FF66"
    ]);
}

    // Copies elements from the Price Action- filter
SCRIPTS.scrGetPriceActionFilteredSymbols = () => {
    SCRIPTS.scrDeriveSymbolsFromList([
        "workspace_2021__1-ws_tab__1627744203469-sl_filter_priceaction",
        "workspace_2021__1-ws_tab__1627744209151-sl_filter_ta1",
        ",#93FF66, ,#93A3FF, ,#FFBB8E, ,#7FC9FF,"
    ]);
}

    // Copies elements from the TA #1- filter
SCRIPTS.scrGetPriceTA1FilteredSymbols = () => {
    SCRIPTS.scrDeriveSymbolsFromList([
        "workspace_2021__1-ws_tab__1627744209151-sl_filter_ta1",
        "workspace_2021__1-ws_tab__1627744210262-sl_finalpicks",
        ",#93FF66, ,#93A3FF, ,#FFBB8E, ,#7FC9FF,"
    ]);
}

    // Creates an analysis file for a symbol if it doesnt exist and
    // loads the analysis data into appropriate notes
SCRIPTS.scrOpenAnalyses = (symbol) => {
    let fname = symbol.data[2].dataPoint + ".json";
    if( !fs.existsSync(getCurrentRepository() + fname) )
    {
        writeJson(fname, {
            technical: "",
            fundamental: "",
            consensus: "",
            file: fname
        });
    }

    let analyses = readJson(fname);
    let ws = "workspace_2021__1-ws_tab__1627744210262-";
    let sl = getComponentById(ws + "sl_finalpicks");

    let c_ta = getComponentById(ws + "ws_tab__1627745308867-n_analysis_technical");
    let c_fa = getComponentById(ws + "ws_tab__1627745309549-n_analysis_fundamental");
    let c_ca = getComponentById(ws + "ws_tab__1627745310104-n_analysis_consensus");

    sl.setVariableMultiple({
        analysisFile: analyses.file
    }, false,
    () => {
        if( c_ta != null ) c_ta.setState({ content: analyses.technical });
        if( c_fa != null ) c_fa.setState({ content: analyses.fundamental });
        if( c_ca != null ) c_ca.setState({ content: analyses.consensus });
    });
}

    // Fetches the technical analysis of the currently open symbol
SCRIPTS.scrGetOpenTA = () => {
    let c_ta = getComponentById("workspace_2021__1-ws_tab__1627744210262-ws_tab__1627745308867-n_analysis_technical");
    let sl = getComponentById("workspace_2021__1-ws_tab__1627744210262-sl_finalpicks");

    if( c_ta != null && sl != null )
    c_ta.state.content = readJson(sl.getVariable("analysisFile")).technical;
}

    // Fetches the fundamental analysis of the currently open symbol
SCRIPTS.scrGetOpenFA = () => {
    let c_fa = getComponentById("workspace_2021__1-ws_tab__1627744210262-ws_tab__1627745309549-n_analysis_fundamental");
    let sl = getComponentById("workspace_2021__1-ws_tab__1627744210262-sl_finalpicks");

    if( c_fa != null && sl != null )
    c_fa.state.content = readJson(sl.getVariable("analysisFile")).fundamental;
}

    // Fetches the consensus analysis of the currently open symbol
SCRIPTS.scrGetOpenCA = () => {
    let c_ca = getComponentById("workspace_2021__1-ws_tab__1627744210262-ws_tab__1627745310104-n_analysis_consensus");
    let sl = getComponentById("workspace_2021__1-ws_tab__1627744210262-sl_finalpicks");

    if( c_ca != null && sl != null )
    c_ca.state.content = readJson(sl.getVariable("analysisFile")).consensus;
}

    // Saves the technical analysis for the currently open symbol to its analysis file
SCRIPTS.scrSaveOpenTA = () => {
    let c_ta = getComponentById("workspace_2021__1-ws_tab__1627744210262-ws_tab__1627745308867-n_analysis_technical");
    let sl = getComponentById("workspace_2021__1-ws_tab__1627744210262-sl_finalpicks");

    if( c_ta != null && sl != null )
    modifyJsonVanilla(sl.getVariable("analysisFile"), { technical: c_ta.state.content });
}

    // Saves the fundamental analysis for the currently open symbol to its analysis file
SCRIPTS.scrSaveOpenFA = () => {
    let c_fa = getComponentById("workspace_2021__1-ws_tab__1627744210262-ws_tab__1627745309549-n_analysis_fundamental");
    let sl = getComponentById("workspace_2021__1-ws_tab__1627744210262-sl_finalpicks");

    if( c_fa != null && sl != null )
    modifyJsonVanilla(sl.getVariable("analysisFile"), { fundamental: c_fa.state.content });
}

    // Saves the consensus analysis for the currently open symbol to its analysis file
SCRIPTS.scrSaveOpenCA = () => {
    let c_ca = getComponentById("workspace_2021__1-ws_tab__1627744210262-ws_tab__1627745310104-n_analysis_consensus");
    let sl = getComponentById("workspace_2021__1-ws_tab__1627744210262-sl_finalpicks");

    if( c_ca != null && sl != null )
    modifyJsonVanilla(sl.getVariable("analysisFile"), { consensus: c_ca.state.content });
}