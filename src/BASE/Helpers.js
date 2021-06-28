/*
    This file will contain useful helper-functions that are regularly needed.


 */



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
    Loads a stringified JSON from a .json- file and returns its parsed form.

    ARGS:
            path    - Path to the .json- file.
        
    RETURNS:
            Parsed JSON.
*/

export const loadJson = (path) => {
    
}