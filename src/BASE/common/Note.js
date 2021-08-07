import React from "react";
import styled from "styled-components";
import { jNote } from "../Jsons";
import ManifestComponent from "../general/ManifestComponent";
import EditOutline from "../general/Options/Edit/EditOutline";

export default class Note extends ManifestComponent {
    constructor(props) {
        super(props, jNote);

        this.state.hasChanged = false;
    }

        // Handles key presses and shortcuts
    handleKeyPresses = (e) => {
        let elem_ta = document.getElementById(this.state.id + "__textarea");

            // Only capture key presses if the text area is focused on
        if( document.activeElement !== elem_ta ) return;

            // Handle shortcuts
        if( e.ctrlKey )
        {
                // SHORTUCT: save
            if( e.key === "s" )
            {
                if( !this.isOptionChecked("shortcut-save") ) return;

                this.runComponentScript("onShortcutSave");
                this.saveConfiguration("onShortcutSave");
                
                this.setState({ hasChanged: false });
            }
        }

            // Handle tabs
        if( e.key === "Tab" )
        {
            let newstr = elem_ta.value.substring(0, elem_ta.selectionStart);

            for( let i = 0; i < this.state.indentSize; i++ )
            newstr += " ";

            newstr += elem_ta.value.substring(elem_ta.selectionEnd);
            this.setState({ content: newstr });
        }
    }
    
        // Subscribe to the save listener
    componentDidMount() {
        super.componentDidMount();
        document.addEventListener("keydown", this.handleKeyPresses);
    }

        // Unsubscribes from the save listener
    componentWillUnmount() {
        super.componentWillUnmount();
        document.removeEventListener("keydown", this.handleKeyPresses);
    }

        // Updates the content of the note based on input
    updateNoteContent = (e) => {
        this.setState({
            content: e.target.value,
            hasChanged: true
        }, () => {
            this.runComponentScript("onChange");
        });
    }

        // Returns appropriate background color for the note
    determineNoteColor = () => {
        if( this.isOptionChecked("show-change") && this.state.hasChanged )
        return "#FFF8D6";

        if( this.isOptionChecked("no-background") )
        return "transparent";

        return this.getModifiedState(this.state.color) || "#FFF5C6";
    }

    render() {
        return(
            <>
            {
                this.state.isRendered &&
                <Content
                    id={this.state.id}
                    style={{
                        left: this.getModifiedState(this.state.position.x),
                        top: this.getModifiedState(this.state.position.y),
                        width: this.getModifiedState(this.state.dimensions.width),
                        height: this.getModifiedState(this.state.dimensions.height)
                    }}
                    onClick={this.testtest}
                >
                    <NoteInput
                        id={this.state.id + "__textarea"}
                        style={{
                            fontFamily: this.getModifiedState(this.state.font),
                            fontSize: this.getModifiedState(this.state.fontSize),
                            backgroundColor: this.determineNoteColor()
                        }}
                        onChange={this.updateNoteContent}
                        value={this.state.content || ""}
                    />

                    {
                        this.state.editModeEnabled &&
                        <EditOutlineContainer>
                            <EditOutline
                                padding={2}
                                dragStartHook={this.startDragging}
                                dragStopHook={this.stopDragging}
                                resizeStartHook={this.startResizing}
                                resizeStopHook={this.stopResizing}
                            />
                        </EditOutlineContainer>
                    }
                </Content>
            }
            </>
        );
    }
}

const Content = styled.div`
    position: absolute;
`;

const NoteInput = styled.textarea`
    position: relative;
    left: 0px;
    top: 0px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    border: none;
    outline: none;
    resize: none;

    border-radius: 8px;
`;

const EditOutlineContainer = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
`;