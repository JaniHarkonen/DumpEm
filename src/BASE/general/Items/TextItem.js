import React from "react";
import styled from "styled-components";
import { jText } from "../../Jsons";
import ManifestComponent from "../ManifestComponent";

export default class TextItem extends ManifestComponent {
    constructor(props) {
        super(props, jText);
    }

    render() {
        return(
            <Content
                id={this.state.id}
                left={this.getModifiedState(this.state.position.x)}
                top={this.getModifiedState(this.state.position.y)}
                width={this.getModifiedState(this.state.dimensions.width)}
                height={this.getModifiedState(this.state.dimensions.height)}
                font={this.getModifiedState(this.state.font)}
                fontSize={this.getModifiedState(this.state.fontSize)}
                addStyle={this.getModifiedState(this.state.style)}
                halign={this.getModifiedState(this.state.horizontalAlign)}
                valign={this.getModifiedState(this.state.verticalAlign)}
            >
                <div>{this.getModifiedState(this.state.content)}</div>
            </Content>
        )
    }
}

const Content = styled.div`
    position: relative;
    display: flex;
    left: ${props => props.left};
    top: ${props => props.top};
    width: ${props => props.width};
    height: ${props => props.height};
    justify-content: ${props => props.halign};
    align-items: ${props => props.valign};
    font-family: ${props => props.font};
    font-size: ${props => props.fontSize};
    
    user-select: none;
    ${props => props.addStyle};
`;