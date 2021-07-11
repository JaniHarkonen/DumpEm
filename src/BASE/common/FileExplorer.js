import React from "react";
import styled from "styled-components";
import { jFileExplorer } from "../Jsons";
import ManifestComponent from "../general/ManifestComponent";
import { getCurrentRepository } from "../Helpers";

// Graphics imports
import imgFileExpFile from "../../BASE/assets/imgFileExpFile.svg";
import imgFileExpFolder from "../../BASE/assets/imgFileExpFolder.svg";

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
        if( dir == null || dir === "" ) this.state.currentFolderContent = this.readFolder(getCurrentRepository());
        else this.state.currentFolderContent = this.readFolder(dir);
    }

        // Reads and returns the contents of a folder with current filters
    readFolder = (path) => {
        let files = fs.readdirSync(path);
        let file_objs = files.map((file) => {
            if( (path + "\\" + file).includes("System Volume Information") ) return false;
            return { 
                path: path + "\\" + file,
                name: file,
                isFolder: fs.lstatSync(path + "\\" + file).isDirectory(),
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

        this.setState({currentFolder: path, currentFolderContent: this.readFolder(path)});
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
    }

        // Renders the contents of the folder that were fetched upon construction
    renderCurrentFolder = () => {
        if( this.state.currentFolderContent == null ) return "";

        return(
            this.state.currentFolderContent.map((item) => {
                return  <FileEntry
                            onClick={() => {this.fsItemClicked(item.path)}}
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
                left={this.getModifiedState(this.state.position.x)}
                top={this.getModifiedState(this.state.position.y)}
                width={this.getModifiedState(this.state.dimensions.width)}
                height={this.getModifiedState(this.state.dimensions.height)}
            >
                <FileContainer>
                    {this.renderCurrentFolder(this.state.currentFolder)}
                </FileContainer>
                {/*<GoBack onClick={() => {this.moveBack(this.state.currentFolder)}}>BACK</GoBack>*/}
            </Content>
        );
    }
}

const Content = styled.div`
    position: absolute;
    left: ${props => props.left};
    top: ${props => props.top};
    width: ${props => props.width};
    height: ${props => props.height};

    border-radius: 12px;
    border-style: solid;
    border-width: 3px;

    background-color: white;
    user-select: none;
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

const GoBack = styled.div`
    position: absolute;
    left: 400px;
    top: 50px;
    width: 64px;
    height: 64px;
    background-color: red;
    color: white;
    cursor: pointer;
    user-select: none;
`;