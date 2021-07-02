/*
    This file contains useful .JSONs that will frequently be used
    by components.
 */

/*
    Basic properties each DumpEm-component should utilize.
*/
export var jBasic =
{
    id: "",
    class: "",
    config: "",
    hostComponent: "",
    hostReference: null,
    this: null,
    isRendered: false,
    scripts: {
        init: null
    },
    variables: {
        
    }
};

/*
    Properties for workspace.
    (EXTENDS jBasic)
 */
export var jWorkspace = 
{
    ...jBasic,
    class: "workspace",
    name: "",
    components: [],
    options: []
};

/*
    Properties for Tabbed viewer.
    (EXTENDS jBasic)
*/
export var jTabbedViewer =
{
    ...jBasic,
    class: "viewer-tabbed",
    workspaces: [],
    activeTab: -1,
    options: []
};

/*
    Properties for Symbol list.
    (EXTENDS jBasic)
*/
export var jSymbolList = 
{
    ...jBasic,
    class: "symbol-list",
    symbolData: [],
    options: []
};

/*
    Properties for Note.
    (EXTENDS jBasic)
*/
export var jNote =
{
    ...jBasic,
    class: "note",
    font: "",
    fontSize: -1,
    content: ""
};

/*
    Properties for FileExplorer.
    (EXTENDS jBasic)
*/
export var jFileExplorer =
{
    ...jBasic,
    class: "file-explorer",
    defaultFolder: "",
    currentFolder: "",
    rootFolder: "",
    itemTypes: ["FOLDER", "FILE"],
    options: []
};