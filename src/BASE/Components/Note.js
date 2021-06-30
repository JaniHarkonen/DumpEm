import React from "react";
import styled from "styled-components";
import { jNote } from "../Jsons";
import { writeJson } from "../Helpers";
/*import { registerComponent } from "../ComponentRegistry";
import { SCRIPTS } from "../../EXTERN/Scripts";*/
import BaseComponent from "./BaseComponent";

export default class Note extends BaseComponent {
    constructor(props) {
        super(props, jNote);
    }

        // Updates the content of the note based on input
    updateNoteContent = (e) => {
        this.setState({content: e.target.value})
    }

        // Stores the potentially updated input of the note in its host component
    componentWillUnmount() {
        if( this.state.config == null ) return;
        if( this.state.config === "" ) return;

        writeJson(this.state.config, {
            class: this.state.class,
            attributes: {
                isRendered: this.state.isRendered,
                hostComponent: this.state.hostComponent,
                font: this.state.font,
                fontSize: this.state.fontSize,
                content: this.state.content
            }
        })
    }

    render() {
        return(
            <>
            {
                this.state.isRendered &&
                <Content>
                    <NoteInput
                        style=
                        {{
                            fontFamily: this.state.font,
                            fontSize: this.state.fontSize
                        }}
                        onChange={this.updateNoteContent}
                        value={this.state.content}
                    />
                </Content>
            }
            </>
        );
    }
}

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const NoteInput = styled.textarea`
    position: relative;
    left: 0px;
    top: 0px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    border: none;
    outline: none;
`;