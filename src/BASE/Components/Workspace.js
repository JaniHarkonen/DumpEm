import React from "react";
import styled from "styled-components";
import { getComponent } from "../Classes";
import { jWorkspace } from "../Jsons";
import BaseComponent from "./BaseComponent";
import DeleteOption from "./Options/DeleteOption";

export default class Workspace extends BaseComponent {
    constructor(props) {
        super(props, jWorkspace);
    }

        // Renders all available options for this component
    renderOptions = () => {
        let opts = this.state.options;
        if( opts.length <= 0 ) return <></>;
        return(
            <>
                {
                    this.isOptionChecked("delete") &&
                    <DeleteOptionContainer>
                        <DeleteOption />
                    </DeleteOptionContainer>
                }
            </>
        )
    }

        // Renders all the subcomponents of this workspace
    renderComponents = () => {
        return(
            this.state.components.map((comp) => {
                if( comp.class !== "workspace" )
                return getComponent(comp.class, {...comp.attributes, hostReference: this});
                else
                return "";
            })
        );
    }

    render() {
        return(
            <>
                {
                    this.state.isRendered &&
                    <Content id={this.state.id}>
                        {this.renderComponents()}
                        {this.renderOptions()}
                    </Content>
                }
            </>
        );
    }
}

const DeleteOptionContainer = styled.div`
    position: absolute;
    right: 58px;
    top: 5px;
    width: 48px;
    height: 32px;
`;

const AddOptionContainer = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
    width: 48px;
    height: 32px;
`;

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-style: solid;
    border-width: 2px;
    border-color: black;
`;