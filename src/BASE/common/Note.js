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

        // Handles saving
    handleSaveShortcut = (e) => {
        if( e.ctrlKey && e.key === "s" )
        {
            this.runComponentScript("onShortcutSave");
            this.saveConfiguration("onShortcutSave");
            
            this.setState({ hasChanged: false });
        }
    }
        // Subscribe to the save listener
    componentDidMount() {
        super.componentDidMount();
        if( this.isOptionChecked("shortcut-save") )
        document.addEventListener("keydown", this.handleSaveShortcut);
    }

        // Unsubscribes from the save listener
    componentWillUnmount() {
        super.componentWillUnmount();
        document.removeEventListener("keydown", this.handleSaveShortcut);
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
                        style={{
                            fontFamily: this.getModifiedState(this.state.font),
                            fontSize: this.getModifiedState(this.state.fontSize),
                            backgroundColor: 
                                            (this.isOptionChecked("no-background"))
                                            ? (this.isOptionChecked("show-change") && this.state.hasChanged)
                                                ? "#FFF8D6"
                                                : "transparent"
                                            : this.getModifiedState(this.state.color) || "#FFF5C6"
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