/*
    This file contains useful .JSONs that will frequently be used
    by components.
 */

/*
    Basic properties each DumpEm-component should utilize.
*/
export var jBasic =
{
    "id": "",
    "class": "",
    "config": "",
    "hostComponent": "",
    "hostReference": null,
    "this": null,
    "isRendered": false,
    "scripts": {
        "init": null
    }
};

/*
    Properties for workspace.
    (EXTENDS jBasic)
 */
export var jWorkspace = 
{
    ...jBasic,
    "name": "",
    "components": [],
    "options": []
};

/*
    Properties for Tabbed viewer.
    (EXTENDS jBasic)
*/
export var jTabbedViewer =
{
    ...jBasic,
    "workspaces": [],
    "activeTab": -1,
    "options": []
};

/*
    Properties for Symbol list.
    (EXTENDS jBasic)
*/
export var jSymbolList = 
{
    ...jBasic,
    "symbolData": [],
    "options": []
}

/*
    Properties for Notes.
    (EXTENDS jBasic)
*/
export var jNote =
{
    ...jBasic,
    font: "",
    fontSize: -1,
    content: ""
}