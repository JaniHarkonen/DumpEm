/*
    This file will contain the memory structure that holds ID-reference- pairings for
    components whose constructors have been called in the application.

    This file also contains useful helper functions regarding the pairings.
*/



/*
    Contains the pairings.
*/
var REGISTRY = {};

/*
    Registers a component by setting its reference in the REGISTRY
    with a given ID.

    ARG:
            id      - ID by which the component will be registered.
            thisref - Reference to the instance of the component.
*/
export const registerComponent = (id, thisref) => {
    if( id == null || id === "" ) return;
    if( thisref == null ) return;

    REGISTRY[id] = thisref;
}

/*
    Returns a reference to a component given its ID, if it exists
    in the REGISTRY.

    ARG:
            id  - ID of the component.
    
    RETURN:
            A reference to the component with a corresponding ID.

            Undefined if no such component exists.
*/
export const getComponentById = (id) => {
    if( id == null || id === "" ) return;

    return REGISTRY[id];
}