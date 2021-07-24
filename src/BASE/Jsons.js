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
        onDrag: ["position"],
        onResize: ["dimensions"]
    }
};

/*
    A component that has a name.
*/
export var jHasName = { name: "" };

/*
    A component with options.
*/
export var jHasOptions = { options: [] };

/*
    A component with sub-components.
*/
export var jHasComponents = { components: [] };

/*
    A component with dimensions.
*/
export var jHasDimensions = 
{
    position: { 
        x: "0px",
        y: "0px"
    },

    dimensions: {
        width: "0px",
        height: "0px"
    }
};

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
    caption: "",            // Caption that will be displayed on top of the list
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
};

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
};

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
};

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
};

/*
    Generates a configuration for a field outlined in CONFIGS- json and
    appends given modifications to it.

    ARGS:
        mod - Modifications that are to be applied to the default configuration.
    
    RETURNS:
        Default configuration with given modifications applied.
*/
const generateConfiguration = (mod) => {
    return {
        isVisible: true,
        caption: "<NO CAPTION>",
        isHoisted: false,
        type: "text",
        value: "",
        key: -1,
        ...mod
    }
}

export var CONFIGS = {
    id: generateConfiguration({
        caption: "ID",
        isHoisted: true,
        value: jBasic.id
    }),
    class: generateConfiguration({
        isVisible: false,
        caption: "ID",
        isHoisted: true,
        value: jBasic.class
    }),
    config: generateConfiguration({
        caption: "Configuration file",
        isHoisted: true,
        value: jBasic.config
    }),
    hostComponent: generateConfiguration({
        isVisible: false,
        caption: "Host component ID",
        value: jBasic.hostComponent
    }),
    hostReference: generateConfiguration({
        isVisible: false,
        caption: "Reference to host",
        type: "reference",
        value: jBasic.hostReference
    }),
    this: generateConfiguration({
        isVisible: false,
        caption: "Reference to this",
        type: "reference",
        value: jBasic.this
    }),
    isRendered: generateConfiguration({
        caption: "Allow rendering",
        type: "check",
        value: jBasic.isRendered
    }),
    scripts: generateConfiguration({
        caption: "Event scripts",
        type: "object",
        value: jBasic.scripts
    }),
    variables: generateConfiguration({
        caption: "Component variables",
        type: "object",
        value: jBasic.variables
    }),
    savedFields: generateConfiguration({
        caption: "Saved attributes",
        type: "object",
        value: jBasic.savedFields
    }),
    name: generateConfiguration({
        caption: "Name",
        isHoisted: true,
    }),
    options: generateConfiguration({
        caption: "Options",
        type: "list",
        value: []
    }),
    workspaces: generateConfiguration({
        caption: "Workspaces",
        type: "list",
        value: []
    }),
    activeTab: generateConfiguration({
        caption: "Active tab index",
        type: "number",
        value: 0
    }),
    font: generateConfiguration({
        caption: "Font",
        type: "text"
    }),
    fontSize: generateConfiguration({
        caption: "Font height (px)",
        type: "text"
    }),
    content: generateConfiguration({
        caption: "Text content"
    }),
    currentFolder: generateConfiguration({
        caption: "Current folder"
    }),
    defaultFolder: generateConfiguration({
        caption: "Default folder"
    }),
    rootFolder: generateConfiguration({
        caption: "Root folder"
    }),
    itemTypes: generateConfiguration({
        caption: "Allowed item types",
        type: "list",
        value: []
    }),
    extensionImages: generateConfiguration({
        caption: "Item type images",
        type: "object",
        value: {}
    }),
    style: generateConfiguration({
        caption: "Additional CSS"
    }),
    horizontalAlign: generateConfiguration({
        caption: "Horizontal alignment"
    }),
    verticalAlign: generateConfiguration({
        caption: "Vertical alignment"
    }),
    assetName: generateConfiguration({
        caption: "Image asset name"
    }),
    position: generateConfiguration({
        caption: "Position",
        type: "object",
        value: {}
    }),
    dimensions: generateConfiguration({
        caption: "Dimensions",
        type: "object",
        value: {}
    }),
    components: generateConfiguration({
        isVisible: false,
        caption: "Components",
        type: "list",
        value: []
    }),
    symbolData: generateConfiguration({
        isVisible: false,
        caption: "Symbols",
        type: "list",
        value: []
    }),
    caption: generateConfiguration({
        caption: "Caption"
    })
};