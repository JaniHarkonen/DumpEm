/*
    This file will contain all class-component- pairings. In order to translate a class name into a
    React-component this file should be imported and its getComponent-function should be utilized.

 */
import Workspace from "./common/Workspace";
import SymbolList from "./common/SymbolList";
import TabbedViewer from "./common/TabbedViewer";
import Note from "./common/Note";

import FileExplorer from "./common/FileExplorer";
import Button from "./common/Button";
import TextItem from "./general/Items/TextItem";
import ImageItem from "./general/Items/ImageItem";


/*
    React requires a unique key for each element rendered on to the screen. This variable is used
    to assign one to each component craeted with makeComponent.
*/
var key = 0;

/*
    Returns the next available unique key and increments the key counter.
*/
export function nextKey() {
    return key++;
}

/*
    Creates and returns a new component of a given class "compclass", and
    with given attributes "attrib". This function is NOT intended to be
    exported as it has a rather specific use in the getComponent-function.

    ARGS:
            compclass   - A reference to the component that is to be created.
            attrib      - JSON that should be used to replace the values in
                          component's default state.
 */
function makeComponent(compclass, attrib) {
    const NewComponent = compclass;
    const unikey = nextKey();

    return <NewComponent attributes={attrib} key={unikey} />
}

/*
    Returns a React-component based on its DumpEm class name "classname".
    The component will receive a set of props passed by "attributes" which
    the component will then use to replace its default state with in the
    constructor.

    ARGS:
            classname - DumpEm class name of the React-component to return.
            attrib    - JSON that should be used to replace the values in
                        component's default state.
*/
export function getComponent(classname, attrib) {
    if( classname == null ) return;

    switch( classname )
    {
        case "workspace": return makeComponent(Workspace, attrib);
        case "symbol-list": return makeComponent(SymbolList, attrib);
        case "viewer-tabbed": return makeComponent(TabbedViewer, attrib);
        case "note": return makeComponent(Note, attrib);
        case "file-explorer": return makeComponent(FileExplorer, attrib);
        case "button": return makeComponent(Button, attrib);
        case "item-text": return makeComponent(TextItem, attrib);
        case "item-image": return makeComponent(ImageItem, attrib);
        default: return null;
    }
}