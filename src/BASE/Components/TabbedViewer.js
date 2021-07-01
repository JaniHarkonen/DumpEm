import React from "react";
import styled from "styled-components";
import { getComponent, nextKey } from "../Classes";
import { jTabbedViewer } from "../Jsons";
import BaseComponent from "./BaseComponent";

export default class TabbedViewer extends BaseComponent {
    constructor(props) {
        super(props, jTabbedViewer);
    }

        // Changes the tab by changing the workspaces that is being rendered
    changeTab = (tab) => {
        this.setState({activeTab: tab});
    }

        // Renders the titles of workspaces assigned to this viewer as tab labels
    renderLabels = () => {
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
        let id = this.state.workspaces[this.state.activeTab];
        let comp = this.state.hostReference.getComponentById(id);
        return getComponent("workspace", {...comp.attributes, hostReference: this.state.hostReference});
    }



    render() {
        return(
            <>
            {
                this.state.isRendered &&
                <Content id={this.state.id}>
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
    left: 50px;
    top: 50px;
    width: 80%;
    height: 80%;
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