import React from "react";
import styled from "styled-components";
import { getComponent } from "../Classes";
import ManifestComponent from "../general/ManifestComponent";
import { jButton } from "../Jsons";

export default class Button extends ManifestComponent {
    constructor(props) {
        super(props, jButton);
    }

        // Renders the items (sub-components) drawn inside the button
    renderItems = () => {
        return (
                this.state.components.map((comp) => {
                return getComponent(comp.class, { ...comp.attributes, hostReference: this });
            })
        )
    }

    render() {
        return(
            <Content
                id={this.state.id}
                left={this.getModifiedState(this.state.position.x)}
                top={this.getModifiedState(this.state.position.y)}
                width={this.getModifiedState(this.state.dimensions.width)}
                height={this.getModifiedState(this.state.dimensions.height)}
                addStyle={this.getModifiedState(this.state.style)}
                onClick={() => {this.runComponentScript("onClick")}}
            >
                {this.renderItems()}
            </Content>
        )
    }
}

const Content = styled.div`
    position: absolute;
    left: ${props => props.left};
    top: ${props => props.top};
    width: ${props => props.width};
    height: ${props => props.height};
    
    ${props => props.addStyle};
`;