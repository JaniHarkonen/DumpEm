/*
    This file will contain useful helper-functions that are regularly needed.


 */
import configuration from "../EXTERN/config.json";
const fs = window.require("fs");

/*
    Repository currently being accessed.
*/
var REPO_CURRENT = "";

/*
    Repository that will be brought up upon start.
*/
var REPO_STARTUP = configuration.startupRepo;

/*
    Transfers the contents of a given json "json" to the state of a given
    React-component "thisref".

    NOTE:   The React-component should ALWAYS be the caller (this). Assigning
            to the states of other instances may result in unexpected
            behavior.
            ALSO, this function should only be called in the constructor as
            the state is being modified DIRECTLY (no re-rendering).
    
    ARGS:
            thisref - React-component instance whose state to modify.
            json    - JSON that should replace the old values in old state.
*/
export const jsonToState = (thisref, json) => {
    if( thisref == null ) return;
    if( json == null ) return;
    
    if( thisref.state == null ) thisref.state = {};

    for( var key of Object.keys(json) ) thisref.state[key] = json[key];
}

/*
    Reads a stringified JSON from a .json- file and returns its parsed form.
    NOTE: Only works in currently accessed repository.

    ARGS:
            path    - Path to the .json- file.
        
    RETURNS:
            Parsed JSON.
*/
export const readJson = (path) => {
    if( path == null || path === "" ) return {};

    const file = fs.readFileSync(getCurrentRepository() + path);
    return JSON.parse(file);
}

/*
    Writes a stringified JSON to a .json-file. Useful when saving changes to
    components.
    NOTE: Only writes files into the currently accessed repository.

    If the file doesn't exist, it will be created.

    Existing files will be overwritten (see modifyJson to prevent overwrite).

    ARGS:
            path    - Path to the .json- file to write to.
            json    - JSON to write in the file.
*/
export const writeJson = (path, json) => {
    if( path == null ) return;
    if( json == null ) return;

    const file = getCurrentRepository() + path;
    const json_str = JSON.stringify(json, null, 4);
    fs.writeFileSync(file, json_str);
}

/*
    Modifies a configuration .json-file of a component by concatenating the
    "attributes"-field of a JSON within with a given JSON.

    ARGS:
            path    - Path to the configuration file that should be modified.
            json    - JSON to modify the file with.
*/
export const modifyJson = (path, json) => {
    let read_json = readJson(path);
    if( read_json == null ) return;

    let mod_attribs = { ...read_json.attributes, ...json };
    let mod_json = { ...read_json, ...{attributes: mod_attribs} };
    writeJson(path, mod_json);
}

/*
    Modifies a given .json-file by concatenating the JSON within with a given
    JSON.

    ARGS:
            path    - Path to the .json- file that should be modified.
            json    - JSON to modify the file with.
*/
export const modifyJsonVanilla = (path, json) => {
    let read_json = readJson(path);
    if( read_json == null ) return;

    writeJson(path, { ...read_json, ...json });
}

/*
    Returns the file path to the repository currently being accessed.

    RETURNS:
            Path to the repository.
*/
export const getCurrentRepository = () => {
    return REPO_CURRENT;
}

/*
    Sets the file path to the repository currently being accessed.

    ARGS:
            path    - Path to the repository.
*/
export const setCurrentRepository = (path) => {
    REPO_CURRENT = path;
}

/*
    Returns the file path to the repository that will be brought up
    upon start.

    RETURNS:
            Path to the repository.
*/
export const getStartupRepository = () => {
    return REPO_STARTUP;
}