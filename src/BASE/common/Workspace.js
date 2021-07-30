import React from "react";
import styled from "styled-components";
import { getComponent } from "../Classes";
import { jWorkspace } from "../Jsons";
import ManifestComponent from "../general/ManifestComponent";
import AddOption from "../general/Options/AddOption";
import EditOption from "../general/Options/EditOption";
import DeleteOption from "../general/Options/DeleteOption";
 
import imgEditCircle from "../assets/img_edit_circle.svg";

export default class Workspace extends ManifestComponent {
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
                        <DeleteOption hostReference={this} />
                    </DeleteOptionContainer>
                }
                {
                    this.isOptionChecked("add") &&
                    <AddOptionContainer>
                        <AddOption hostReference={this} />
                    </AddOptionContainer>
                }
                {
                    this.isOptionChecked("edit") &&
                    <EditOptionContainer>
                        <EditOption
                            hostReference={this}
                            imgEdit={imgEditCircle}
                        />
                    </EditOptionContainer>
                }
            </>
        )
    }

        // Renders all the subcomponents of this workspace
    renderComponents = () => {
        return(
            this.state.components.map((comp) => {
                if( comp.class !== "workspace" )
                return getComponent(comp.class, { ...comp.attributes, hostReference: this });
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
                    <Content
                        id={this.state.id}
                    >
                        {this.renderComponents()}
                        {this.renderOptions()}
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
    width: calc(100% - 4px);
    height: calc(100% - 4px);
`;

const AddOptionContainer = styled.div`
    position: absolute;
    right: 8px;
    top: 8px;
    width: 36px;
    height: 36px;
`;

const EditOptionContainer = styled.div`
    position: absolute;
    right: 8px;
    top: 48px;
    width: 36px;
    height: 36px;
`;

const DeleteOptionContainer = styled.div`
    position: absolute;
    right: 8px;
    top: 88px;
    width: 36px;
    height: 36px;
`;