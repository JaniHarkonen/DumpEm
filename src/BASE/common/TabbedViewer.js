import React from "react";
import styled from "styled-components";
import { getComponent, nextKey } from "../Classes";
import { jTabbedViewer } from "../Jsons";
import ManifestComponent from "../general/ManifestComponent";

export default class TabbedViewer extends ManifestComponent {
    constructor(props) {
        super(props, jTabbedViewer);
    }

        // Changes the tab by changing the workspaces that is being rendered
    changeTab = (tab) => {
        if( this.isOptionChecked("tab-lock") ) return;

        this.setState({activeTab: tab});
    }

        // Renders the titles of workspaces assigned to this viewer as tab labels
    renderLabels = () => {
        if( this.isOptionChecked("hide-tabs") ) return "";

        return(this.state.workspaces.map((ws, index) => {
            let ws_comp = this.state.hostReference.getComponentById(ws);
            if( ws_comp == null ) return "";

            let ws_name = ws_comp.attributes.name;
            
            return(
                    <Label
                        style= {{
                            left: index * 10 + "%",
                            backgroundColor: (this.state.activeTab === index) ? "#C10000" : "red"
                        }}
                        onClick={() => {this.changeTab(index);}}
                        key={nextKey()}
                    >
                    {ws_name}
                    </Label>
            );
        }));
    }

        // Renders the workspace active in the currently displayed tab
    renderActiveTab = () => {
        if( this.state.activeTab < 0 ) return;

        let id = this.state.workspaces[this.state.activeTab];
        let comp = this.state.hostReference.getComponentById(id);

        if( comp != null )
        return getComponent("workspace", {...comp.attributes, hostReference: this.state.hostReference});
        else
        {
            this.setState({
                workspaces: this.state.workspaces.filter((ws) => ws !== id),
                activeTab: (this.state.workspaces.length < 1) ? -1 : 0
            });
        }
    }



    render() {
        return(
            <>
            {
                this.state.isRendered &&
                <Content
                    id={this.state.id}
                    left={this.getModifiedState(this.state.position.x)}
                    top={this.getModifiedState(this.state.position.y)}
                    width={this.getModifiedState(this.state.dimensions.width)}
                    height={this.getModifiedState(this.state.dimensions.height)}
                >
                    {this.renderActiveTab()}
                    {this.renderLabels()}
                </Content>
            }
            </>
        )
    }
}

const Content = styled.div`
    position: absolute;
    left: ${props => props.left};
    top: ${props => props.top};
    width: ${props => props.width};
    height: ${props => props.height};
`;

const Label = styled.div`
    position: absolute;
    left: 0px;
    bottom: calc(100% - 2px);
    width: 10%;
    height: 32px;
    background-color: red;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: 1.0;

    &:hover {
        opacity: 0.5;
    }
`;