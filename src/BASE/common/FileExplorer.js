import React from "react";
import styled from "styled-components";
import { jFileExplorer } from "../Jsons";
import ManifestComponent from "../general/ManifestComponent";

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
        if( dir == null || dir === "" ) this.state.currentFolderContent = null;
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
        //if( next !== this.getModifiedState(this.state.rootFolder) ) this.moveToFolder(next);
    }

        // Called upon clicking a file system element (file/folder)
    fsItemClicked = (path) => {
        if( fs.lstatSync(path).isDirectory() )
        {
            if( !this.isOptionChecked("folder-lock") ) this.moveToFolder(path);
        }
        else
        {
            exec("\"" + path + "\"");
        }
    }

        // Renders the contents of the folder that were fetched upon construction
    renderCurrentFolder = () => {
        if( this.state.currentFolderContent == null ) return "";

        return(
            this.state.currentFolderContent.map((item) => {
                return  <FileEntry
                            onClick={() => {this.fsItemClicked(item.path/*this.state.currentFolder + item*/)}}
                        >
                            {item.name}
                        </FileEntry>;
            })
        );
    }


    render() {
        return(
            <Content>
                {this.renderCurrentFolder(this.state.currentFolder)}
                <GoBack onClick={() => {this.moveBack(this.state.currentFolder)}}>BACK</GoBack>
            </Content>
        );
    }
}

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    background-color: #DDFFFF;
`;

const FileEntry = styled.div`
    position: relative;
    left: 16px;
    margin-top: 4px;
    width: 218px;
    height: auto;

    background-color: #00C6FF;
    cursor: pointer;
    border-radius: 6px;
    padding-left: 32px;
    user-select: none;

    &:hover {
        opacity: 0.67;
    }
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