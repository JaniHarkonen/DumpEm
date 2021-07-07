import React from "react";
import styled from "styled-components";
import { getComponent } from "../Classes";
import { jWorkspace } from "../Jsons";
import ManifestComponent from "../general/ManifestComponent";
import AddOption from "../general/Options/AddOption";
import EditOption from "../general/Options/EditOption";
import DeleteOption from "../general/Options/DeleteOption";

export default class Workspace extends ManifestComponent {
    constructor(props) {
        super(props, jWorkspace);

        this.state.editModeEnabled = false;
    }

        // Enables edit mode
    enableEditMode = () => {
        this.setState({ editModeEnabled: true });
    }

        // Called upon attempting to drag the workspace
    requestDragBegin = () => {
        if( this.state.editModeEnabled === true )
        {
            if( this.isBeingDragged() === true ) this.stopDragging();
            else this.startDragging();
        }
    }

        // Called upon attempting to resize the workspace
    requestResizeBegin = () => {
        if( this.state.editModeEnabled === true )
        {
            if( this.isBeingResized() === true ) this.stopResizing();
            else this.startResizing();
        }
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
                        <EditOption hostReference={this} />
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
                    <Content
                        id={this.state.id}
                        onClick={() => {this.requestResizeBegin();}}
                        style={{
                            left: this.state.position.x + "px",
                            top: this.state.position.y + "px",
                            width: this.state.dimensions.width + "px",
                            height: this.state.dimensions.height + "px"
                        }}
                    >
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

const EditOptionContainer = styled.div`
    position: absolute;
    right: 106px;
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