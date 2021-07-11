/*
    This file should import and contain all required external grafics and/or sounds.
    Each asset has to be paired with a name that will be used to identify the asset.
*/
import imgMostRecentFolder from "./assets/img_most_recent_folder.svg";
import imgOpenNewFolder from "./assets/img_open_new_folder.svg";
import imgPrevious from "./assets/img_previous.svg";

var ASSETS = {
    imgMostRecentFolder: imgMostRecentFolder,
    imgOpenNewFolder: imgOpenNewFolder,
    imgPrevious: imgPrevious
}

/*
    Returns a reference to an asset given its name.

    ARGS:
        name    - Name of the asset to return.
    
    RETURNS:
        The reference to the asset.
*/
export const getAsset = (name) => {
    if( name == null || name === "" ) return null;

    return ASSETS[name];
}