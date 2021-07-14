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
    isRendered: true,       // Whether the component should render

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
*/
export var jTabbedViewer =
{
    ...jBasic,
    ...jHasOptions,             // Array of strings representing options that are enabled for the user
    ...jHasDimensions,          // The dimensions and the position of the viewer
    class: "viewer-tabbed",
    workspaces: [],             // Unique identifiers of the workspaces tabbed within this viewer
    activeTab: 0,               // The index of the tab currently being displayed
};

/*
    Properties for Symbol list.
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
*/
export var jNote =
{
    ...jBasic,
    ...jHasDimensions,      // The position and the dimensions fo the note
    class: "note",
    font: "Arial",          // Name of the font family the note text will be drawn in
    fontSize: "16px",       // Height of the font in pixels
    content: ""             // The text content of the note
};

/*
    Properties for FileExplorer.
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

    scripts: {
        ...jBasic.scripts,
        onItem: null,                   // Upon selecting an item
        onSelect: null,                 // Upon clicking "Select"
        onFolderChange: null            // Upon changing the current folder
    },

        /*
            Contains extensions (without leading dot) and the names of the graphics assets
            representing them inside the explorer view.
        */
    extensionImages: {
    }
};

/*
    Properties for Button.
*/
export var jButton =
{
    ...jBasic,
    ...jHasDimensions,
    ...jHasComponents,
    ...jHasOptions,

    scripts: {
        ...jBasic.scripts,
        onClick: null
    },

    class: "button",
    style: ""               // Additional CSS-styling that will be applied to the button element
}

/*
    Properties for Text.
*/
export var jText =
{
    ...jBasic,
    ...jHasDimensions,              // NOTE: The position will be relative to the host component
    class: "item-text",
    content: "",                    // Text content that will be displayed
    font: "Arial",                  // Name of the font family the text will be draw in
    fontSize: "16px",               // Height of the font in pixels
    horizontalAlign: "flex-start",  // Horizontal alignment of the text (uses Flexbox)
    verticalAlign: "flex-start",    // Vertical alignment of the text (uses Flexbox)
    style: ""                       // Additional CSS-styling that will be applied to the text element
}

/*
    Properties for Image.
*/
export var jImage =
{
    ...jBasic,
    ...jHasDimensions,          // NOTE: The position will be relative to the host component
    class: "item-image",
    assetName: "",              // Name of the image asset that will be displayed
    style: ""                   // Additional CSS-styling that will be applied to the text element
}

/*
    All jsons bundled in one.
*/

export var JSONS = {
    jBasic: jBasic,
    jHasName: jHasName,
    jHasOptions: jHasOptions,
    jHasComponents: jHasComponents,
    jHasDimensions: jHasDimensions,
    jWorkspace: jWorkspace,
    jTabbedViewer: jTabbedViewer,
    jSymbolList: jSymbolList,
    jNote: jNote,
    jFileExplorer: jFileExplorer,
    jButton: jButton,
    jText: jText,
    jImage: jImage
}