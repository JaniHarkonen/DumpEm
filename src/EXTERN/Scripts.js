/*
    This file should contain all the custom scripts that the DumpEm workspaces may utilize.
    The scripts will be stored in the SCRIPTS- variable which will then be exported to
    components.

*/

/*
    The DumpEm- components will fetch their scripts from this JSON by name.
*/
export var SCRIPTS = {};

/*
    Runs a script with given arguments.

    ARGS:
        script  - Name of the script to execute.
        args    - String containing the arguments in a non-parsed form.
*/
export const runScript = (scr_str) => {
    if( scr_str == null ) return;

    let a_scr_str = scr_str.trim().split(" ");
    let script = a_scr_str.splice(0, 1);
    return SCRIPTS[script[0]](a_scr_str);
}

/*
    Test script.
*/
SCRIPTS.testInit = () => {
    console.log("INIT");
}