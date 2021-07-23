import React from "react";
import styled from "styled-components";
import { jFileExplorer } from "../Jsons";
import ManifestComponent from "../general/ManifestComponent";
import { getCurrentRepository } from "../Helpers";
import { nextKey } from "../Classes";

// Graphics imports
import imgFileExpFile from "../../BASE/assets/img_file_text.svg";
import imgFileExpFolder from "../../BASE/assets/img_folder_black.svg";
import imgCurrentFolder from "../../BASE/assets/img_folder_white.svg";
import imgSelectionCheckmark from "../../BASE/assets/img_green_checkmark.svg";
import imgPreviousFolder from "../../BASE/assets/img_arrow_left.svg";

const { exec } = window.require("child_process");
const fs = window.require("fs");
const pathModule = window.require("path");

export default class FileExplorer extends ManifestComponent {
    constructor(props) {
        super(props, jFileExplorer);
        
        let dir = this.getModifiedState(this.state.currentFolder);

            // If the current folder is not defined, switch to default folder
        if( dir == null || dir === "" )
        {
            this.state.currentFolder = this.getModifiedState(this.state.defaultFolder);
            dir = this.state.currentFolder;
        }

            // If the default folder is not defined, content is null
            // Otherwise, fetch the contents of the folder
        if( dir == null || dir === "" )
        {
            this.state.currentFolder = getCurrentRepository();
            this.state.currentFolderContent = this.readFolder(this.state.currentFolder);
        }
        else this.state.currentFolderContent = this.readFolder(dir);

        this.state.CURRENT_FOLDER_INPUT = this.state.currentFolder;
        this.state.ENTER_LISTENER = document.addEventListener("keypress", this.handleEnterPress);
    }

        // Detaches ENTER-listener on unmount
    componentWillUnmount() {
        super.componentWillUnmount();
        document.removeEventListener("keypress", this.handleEnterPress);
    }

        // Handles changing of folder via ENTER
    handleEnterPress = (e) => {
        if( e.keyCode !== 13 ) return;

        let infield = document.getElementById(this.state.id + "__current-folder-input");
        
        if( infield !== document.activeElement ) return;
        this.moveToFolder(infield.value);
    }

        // Reads and returns the contents of a folder with current filters
    readFolder = (path) => {
        let files = fs.readdirSync(path);
        let file_objs = files.map((file) => {
            if( (path + "\\" + file).includes("System Volume Information") ) return false;

            let is_folder = fs.lstatSync(path + "\\" + file).isDirectory();
            return { 
                path: (is_folder) ? path + file + "\\" : path + "\\" + file,
                name: file,
                isFolder: is_folder,
                extension: pathModule.extname(file)
            };
        });
    
        let opts = this.state.itemTypes;
        return file_objs.filter((file) => {
            if( !opts.includes("FOLDER") && file.isFolder === true ) return false;
            if( !opts.includes("FILE") && file.isFolder === false )
            {
                if( opts.includes(file.extension) ) return true;
                else return false;
            }

            return true;
        });
    }

        // Moves the explorer to a given folder (returns false upon fail, true upon success)
    moveToFolder = (path) => {
        if( path == null || path === "" ) return false;

        this.setState({
            currentFolder: path,
            currentFolderContent: this.readFolder(path),
            CURRENT_FOLDER_INPUT: path
        });
        return true;
    }

        // Moves the explorer back one folder from the given one
    moveBack = (path) => {
        let next = pathModule.join(path, "../");
        this.moveToFolder(next)
    }

        // Called upon clicking a file system element (file/folder)
    fsItemClicked = (path) => {
        if( fs.lstatSync(path).isDirectory() )
        {
            if( !this.isOptionChecked("folder-lock") ) this.moveToFolder(path);
        }
        else
        {
            if( this.isOptionChecked("allow-exec") ) exec("\"" + path + "\"");
        }

        this.runComponentScript("onItem");
    }

        // Renders the contents of the folder that were fetched upon construction
    renderCurrentFolder = () => {
        if( this.state.currentFolderContent == null ) return "";

        return(
            this.state.currentFolderContent.map((item) => {
                return  <FileEntry
                            onClick={() => {this.fsItemClicked(item.path)}}
                            key={nextKey()}
                        >
                            <FileEntryImageContainer>
                                <FileEntryImage
                                    src={(item.isFolder) ? imgFileExpFolder : imgFileExpFile}
                                />
                            </FileEntryImageContainer>

                            <FileEntryInfoContainer>
                                <div><b>{item.name}</b></div>
                            </FileEntryInfoContainer>
                        </FileEntry>;
            })
        );
    }


    render() {
        return(
            <Content
                id={this.state.id}
                style={{
                    left: this.getModifiedState(this.state.position.x),
                    top: this.getModifiedState(this.state.position.y),
                    width: this.getModifiedState(this.state.dimensions.width),
                    height: this.getModifiedState(this.state.dimensions.height)
                }}
            >
                <TopBarContainer>
                    <CurrentFolderContainer id={this.state.id + "__current-folder"}>

                        <CurrentFolderIconContainer>
                            <CurrentFolderIcon src={imgCurrentFolder} />
                        </CurrentFolderIconContainer>

                        <CurrentFolderInputContainer>
                            <CurrentFolderInput
                                id={this.state.id + "__current-folder-input"}
                                value={this.state.CURRENT_FOLDER_INPUT}
                                onChange={(e) => {this.setState({CURRENT_FOLDER_INPUT: e.target.value})}}
                            />
                        </CurrentFolderInputContainer>

                    </CurrentFolderContainer>
                </TopBarContainer>

                <FileContainer id={this.state.id + "__file-container"}>
                    {this.renderCurrentFolder(this.state.currentFolder)}
                </FileContainer>

                <PreviousFolderContainer onClick={() => this.moveBack(this.state.currentFolder)}>
                    <PreviousFolderImage src={imgPreviousFolder} />
                </PreviousFolderContainer>

                <FolderSelectionButton onClick={() => { this.runComponentScriptArgs("onSelect", this.state.currentFolder) }}>
                    <FolderSelectionButtonImageContainer>
                        <FolderSelectionButtonImage src={imgSelectionCheckmark} />
                    </FolderSelectionButtonImageContainer>
                    <FolderSelectionTextContainer>Select</FolderSelectionTextContainer>
                </FolderSelectionButton>
            </Content>
        );
    }
}

const Content = styled.div`
    position: absolute;

    border-radius: 12px;
    border-style: solid;
    border-width: 3px;

    background-color: white;
    user-select: none;
`;

const PreviousFolderContainer = styled.div`
    position: absolute;
    left: calc(50% + 16px);
    top: 18%;
    width: 42px;
    height: 32px;

    border-radius: 8px;
    border-style: solid;
    border-width: 3px;

    cursor: pointer;
`;

const PreviousFolderImage = styled.img`
    position: relative;
    left: 25%;
    top: 25%;
    width: 50%;
    height: 50%;
`;

const FolderSelectionButton = styled.div`
    position: absolute;
    display: flex;
    align-items: center;

    right: 16px;
    bottom: 16px;
    width: 100px;
    height: 48px;

    border-radius: 8px;
    border-style: solid;
    border-width: 3px;

    cursor: pointer;
`;

const FolderSelectionTextContainer = styled.div`
    position: absolute;
    left: 42%;
    font-weight: bold;
`;

const FolderSelectionButtonImageContainer = styled.div`
    position: relative;
    left: 8%;
    height: 100%;
    width: 25%;
`;

const FolderSelectionButtonImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const TopBarContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;

    left: 0px;
    top: 0px;
    width: 100%;
    height: 15%;
`;

const CurrentFolderContainer = styled.div`
    position: relative;
    left: 24px;
    width: calc(100% - 16px);
    height: 75%;
`;

const CurrentFolderInputContainer = styled.div`
    position: relative;
    display: inline-block;
    left: 0px;
    top: 0px;
    width: calc(100% - 44px);
    height: 100%;
`;

const CurrentFolderInput = styled.input`
    position: absolute;
    left: 16px;
    top: 50%;
    width: calc(100% - 40px);
    height: 50%;
    transform: translateY(-50%);
    border-style: none;
    font-size: 16px;
    font-weight: bold;
`;

const CurrentFolderIconContainer = styled.div`
    position: relative;
    display: inline-block;
    float: left;
    left: 0px;
    top: 0px;
    width: 44px;
    height: 100%;
`;

const CurrentFolderIcon = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const FileContainer = styled.div`
    position: relative;
    left: 32px;
    top: 18%;
    width: calc(50% - 32px);
    height: 76%;
    overflow: auto;

    border-radius: 8px;

    background-color: #F7F7F7;
`;

const FileEntry = styled.div`
    position: relative;
    width: 350px;
    height: 32px;

    margin-top: 5px;
    padding-top: 5px;
    padding-bottom: 5px;

    cursor: pointer;
    &:hover {
        background-color: #E0E0E0;
    }
`;

const FileEntryImageContainer = styled.div`
    position: absolute;
    left: 16px;
    top: 5px;
    width: 32px;
    height: calc(100% - 10px);
`;

const FileEntryImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const FileEntryInfoContainer = styled.div`
    position: absolute;
    display: flex;
    left: 48px;
    top: 0px;
    width: 287px;
    height: 100%;
    align-items: center;
    padding-left: 15px;
`;