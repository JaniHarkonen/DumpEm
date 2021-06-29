import React from "react";
import styled from "styled-components";
import { jNote } from "../Jsons";
import { readJson, writeJson } from "../Helpers";
import { registerComponent } from "../ComponentRegistry";
import { SCRIPTS } from "../../EXTERN/Scripts";

export default class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = jNote;
        if( props.attributes != null )
        {
            this.state = { ...this.state, ...readJson(props.attributes.config).attributes, ...props.attributes }
        }

            // Prefix the ID of this component with that of the host
        if( this.state.hostReference != null ) this.state.id = this.state.hostReference.state.id + "-" + this.state.id;

        registerComponent(this.state.id, this);


            // Run initialization script, if it exists
        if( this.state.scripts.init != null ) SCRIPTS[this.state.scripts.init]();
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
                id: this.state.id,
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