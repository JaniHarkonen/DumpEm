import React from "react";
import styled from "styled-components";
import { getComponent, nextKey } from "../Classes";
import { jTabbedViewer } from "../Jsons";
import ManifestComponent from "../general/ManifestComponent";

import imgAdd from "../assets/img_add_circle.svg";
import { readJson, writeJson } from "../Helpers";

export default class TabbedViewer extends ManifestComponent {
    constructor(props) {
        super(props, jTabbedViewer);
        //console.log("LOLs: " + getCurrentRepository())
    }

        // Changes the tab by changing the workspaces that is being rendered
    changeTab = (tab) => {
        if( this.isOptionChecked("tab-lock") ) return;

        this.setState({activeTab: tab});
    }

        // Adds a new tab (fitted workspaces) to the viewer
    handleTabAddition = () => {
        if( !this.isOptionChecked("add") ) return;

        let id = "ws_tab__" + new Date().getTime();
        let cpath = id + ".json";

            // Contains the hoisted configuration of the tab
        let tab_h = {
            class: "workspace",
            attributes: {
                id: id,
                name: "New tab",
                config: cpath
            }
        }

            // Contains the configuration of the tab that will be placed in the .json
        let tab_c = {
            hostComponent: this.state.hostComponent,
            isRendered: true,
            components: [],
            dimensions: {
                width: "100%",
                height: "100%"
            },
            options: ["add", "delete", "edit"]
        }

        this.state.hostReference.addComponent(tab_h);

            // Add the new workspace to the configuration JSON of this component
        let config = readJson(this.state.config);
        config.attributes.workspaces = config.attributes.workspaces.concat(id);
        writeJson(this.state.config, config);

            // Create a configuration .json for the added tab
        writeJson(cpath, { attributes: tab_c });

        this.setState({ workspaces: this.state.workspaces.concat(id) });
    }

        // Renders the titles of workspaces assigned to this viewer as tab labels
    renderLabels = () => {
        if( this.isOptionChecked("hide-tabs") ) return "";

        let n_ws = this.state.workspaces.length;
        return(this.state.workspaces.map((ws, index) => {
            let ws_comp = this.state.hostReference.getComponentById(ws);
            if( ws_comp == null ) return "";

            let ws_name = ws_comp.attributes.name;
            
            return(
                    <Label
                        isActive={this.state.activeTab === index}
                        onClick={() => {this.changeTab(index);}}
                        key={nextKey()}
                        count={n_ws}
                    >
                        <LabelCaptionContainer>
                            {ws_name}
                        </LabelCaptionContainer>
                    </Label>
            );
        }));
    }

        // Renders the workspace active in the currently displayed tab
    renderActiveTab = () => {
        if( this.state.activeTab < 0 ) return;
        if( this.state.workspaces.length <= 0 ) return;

        let id = this.state.workspaces[this.state.activeTab];
        let comp = this.state.hostReference.getComponentById(id);

        if( comp != null )
        return getComponent("workspace", {...comp.attributes, hostReference: this.state.hostReference});
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

                    <LabelContainer>
                        {this.renderLabels()}
                        <AddTabContainer onClick={this.handleTabAddition}>
                            <AddTabBackground />
                            <FullImage src={imgAdd} />
                        </AddTabContainer>
                    </LabelContainer>
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

    background-color: white;

    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    border-style: solid;
    border-width: 2px;
    border-color: #B7B7B7;
`;

const Label = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 2px;
    padding-left: 10px;
    padding-right: 10px;
    width: ${props => ( 1 / (props.count) * 50 )}%;
    max-width: 100px;
    min-width: 32px;
    height: 26px;
    bottom: 4px;

    background-color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    &:hover {
        opacity: 0.75;
    }

    ${props => !props.isActive && "opacity: 0.5;"}
`;

const LabelCaptionContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    left: 0px;
    top: 0px;
    width: 100%;
    height: calc(100% - 1px);

    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const LabelContainer = styled.div`
    position: absolute;
    left: -2px;
    bottom: calc(100% - 1px);
    width: calc(100% + 4px);
    height: 30px;
    

    background-color: #B7B7B7;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

const AddTabContainer = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 8px;
    top: 50%;
    width: 25px;
    height: 25px;
    transform: translateY(-50%);

    cursor: pointer;

    &:hover {
        opacity: 0.75;
    }
`;

const AddTabBackground = styled.div`
    position: absolute;
    left: 1px;
    top: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);

    background-color: white;
    border-radius: 50%;
    
`;

const FullImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;