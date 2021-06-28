import React from "react";
import styled from "styled-components";
import { jNote } from "../Jsons";

export default class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = jNote;
        if( props.attributes != null ) this.state = { ...this.state, ...props.attributes };
    }

        // Updates the content of the note based on input
    updateNoteContent = (e) => {
        this.setState({content: e.target.value})
    }

        // Stores the potentially updated input of the note in its host component
    componentWillUnmount() {

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