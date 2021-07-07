/*
    This file contains useful .JSONs that will frequently be used
    by components.
 */

/*
    Basic properties each DumpEm-component should utilize.
*/
export var jBasic =
{
    id: "",                 // Unique identifier (will be modified during runtime to form "root-host-...-id")
    class: "",              // Determines the component that will be rendered
    config: "",             // Configuration that will be implemented upon creation
    hostComponent: "",      // Unique identifier of the host component
    hostReference: null,    // Will contain a reference to the host component instance
    this: null,             // Will contain a reference to this component's instance
    isRendered: false,      // Whether the component should render

        // Scripts that will trigger upon the event they're assigned to
    scripts: {
        init: null,         // Upon constructor call
        afterMount: null,   // Immediately after being mounted
        onUnmount: null     // Before unmounting
    },

        // Can be used to store additional or frequently chaning information
    variables: {
        
    },

        // Groups of fields that will be saved on different events
    savedFields: {

    }
};

/*
    A component that has a name.
*/
export var jHasName = { name: "" };

/*
    A component with options.
*/
export var jHasOptions = { options: [] }

/*
    A component with sub-components.
*/
export var jHasComponents = { components: [] }

/*
    A component with dimensions.
*/
export var jHasDimensions = 
{
    position: { 
        x: 0,
        y: 0
    },

    dimensions: {
        width: 0,
        height: 0
    }
}

/*
    Properties for workspace.
    (EXTENDS jBasic)
 */
export var jWorkspace = 
{
    ...jBasic,
    ...jHasName,            // Name of the workspace that will be displayed in a viewer
    ...jHasComponents,      // Sub-components of this workspace
    ...jHasOptions,         // Array of strings representing options that are enabled for the user
    ...jHasDimensions,
    class: "workspace",         
};

/*
    Properties for Tabbed viewer.
    (EXTENDS jBasic)
*/
export var jTabbedViewer =
{
    ...jBasic,
    ...jHasOptions,             // Array of strings representing options that are enabled for the user
    ...jHasDimensions,          // The dimensions and the position of the viewer
    class: "viewer-tabbed",
    workspaces: [],             // Unique identifiers of the workspaces tabbed within this viewer
    activeTab: -1,              // The index of the tab currently being displayed
};

/*
    Properties for Symbol list.
    (EXTENDS jBasic)
*/
export var jSymbolList = 
{
    ...jBasic,
    ...jHasOptions,         // Array of strings representing options that are enabled for the user
    ...jHasDimensions,      // The position and the dimensions of the list
    class: "symbol-list",
    symbolData: [],         // Ticker data assigned to the symbols displayed on this list
};

/*
    Properties for Note.
    (EXTENDS jBasic)
*/
export var jNote =
{
    ...jBasic,
    ...jHasDimensions,      // The position and the dimensions fo the note
    class: "note",
    font: "",               // Name of the font family the note text will be drawn in
    fontSize: -1,           // Height of the font in pixels
    content: ""             // The text content of the note
};

/*
    Properties for FileExplorer.
    (EXTENDS jBasic)
*/
export var jFileExplorer =
{
    ...jBasic,
    ...jHasOptions,                     // Array of strings representing options that are enabled for the user
    ...jHasDimensions,                  // The position and the dimensions of the explorer window
    class: "file-explorer",
    defaultFolder: "",                  // Folder that will be opened by default
    currentFolder: "",                  // Folder the explorer is currently displaying
    rootFolder: "",                     // Folder the explorer cannot go beyond
    itemTypes: ["FOLDER", "FILE"],      // Types of items visible to the explorer (FOLDER, FILE, <.extension>)
};