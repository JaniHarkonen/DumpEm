import React from "react";
import styled from "styled-components";
import { nextKey } from "../../../Classes";
import { JSONS } from "../../../Jsons";

export default class AddOptionPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            componentSelection: null,
            componentList: [
                {
                    class: "workspace",
                    name: "Workspace",
                    fields: JSONS.jWorkspace
                },
                {
                    class: "viewer-tabbed",
                    name: "Viewer - Tabs",
                    fields: JSONS.jTabbedViewer
                },
                {
                    class: "file-explorer",
                    name: "File explorer",
                    fields: JSONS.jFileExplorer
                },
                {
                    class: "symbol-list",
                    name: "Symbol list",
                    fields: JSONS.jSymbolList
                },
                {
                    class: "note",
                    name: "Note",
                    fields: JSONS.jNote
                },
                {
                    class: "button",
                    name: "Button",
                    fields: JSONS.jButton
                },
                {
                    class: "item-image",
                    name: "Image",
                    fields: JSONS.jImage
                },
                {
                    class: "item-text",
                    name: "Text",
                    fields: JSONS.jText
                }
            ]
        };
    }

    handleBackgroundClick = (e) => {
        if( e.target.id !== "option-popup__overlay" ) return; 

        this.props.closeOverlay();
    }

    handleComponentSelection = (comp) => {
        this.setState({ componentSelection: comp });
    }

    handleComponentAddition = () => {
        this.props.hostReference.addComponent({
            class: this.state.componentSelection.class
        });

        this.props.closeOverlay();
    }

    renderComponentList = () => {
        return(
            this.state.componentList.map((comp) => {
                return(
                    <ComponentListItem
                        key={nextKey()}
                        selected={(this.state.componentSelection === comp)}
                        onClick={() => { this.handleComponentSelection(comp) }}
                    >
                        {comp.name}
                    </ComponentListItem>
                );
            })
        );
    }

    renderConfigurationItems = () => {
        let comp = this.state.componentSelection;
        if( comp == null ) return "";

        return(
            Object.keys(comp.fields).map((p) => {
                if(
                    p === "hostReference" ||
                    p === "this" ||
                    p === "class" ||
                    p === "hostComponent" ||
                    p === "components" ||
                    p === "workspaces"
                ) return "";

                return(
                    <ConfigurationItem>
                        <ConfigurationItemCaption>{p}:</ConfigurationItemCaption>
                        <ConfigurationItemInput value={
                            (p === "id") ? comp.class + "-" + new Date().getTime() : ""
                        } />
                    </ConfigurationItem>
                )
            })
        )
    }

    render() {
        return(
            <Overlay
                id="option-popup__overlay"
                onMouseDown={this.handleBackgroundClick}
            >

                <Content
                    id="option-popup__content"
                >
                    <PopupCaptionContainer>
                        Add a component to the workspace
                    </PopupCaptionContainer>

                    <ComponentListContainer>
                        {this.renderComponentList()}
                    </ComponentListContainer>

                    <ConfigurationContainer>
                        {this.renderConfigurationItems()}
                    </ConfigurationContainer>

                    <OptionButtonContainer>
                        <ButtonAdd
                            onClick={this.handleComponentAddition}
                        >
                            Add
                        </ButtonAdd>

                        <ButtonCancel
                            onClick={() => { this.props.closeOverlay() }}
                        >
                            Cancel
                        </ButtonCancel>
                    </OptionButtonContainer>
                </Content>
            </Overlay>
        )
    }
}

const Overlay = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;

    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
    position: absolute;
    width: 33%;
    height: 65%;

    border-radius: 12px;

    background-color: white;
    user-select: none;
`;

const PopupCaptionContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    left: 0px;
    top: 0px;
    width: 100%;
    height: 48px;
    font-size: 20px;
    font-weight: bold;

    border-bottom-style: solid;
`;

const ComponentListContainer = styled.div`
    position: relative;
    left: 16px;
    margin-top: 16px;
    width: calc(100% - 32px);
    height: 25%;
    font-weight: bold;
    line-height: 28px;

    overflow-y: auto;
`;

const ComponentListItem = styled.div`
    position: relative;
    left: 0px;
    width: 100%;
    font-size: ${(props) => props.selected ? "20px" : "16px"};
    color: ${(props) => props.selected ? "black" : "#808080"};

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.12);
    }
`;

const OptionButtonContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;

    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 100px;
`;

const OptionButton = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;

    width: 86px;
    height: 42px;
    cursor: pointer;

    &:hover {
        opacity: 0.75;
    }
`;

const ButtonCancel = styled(OptionButton)`
    left: 15%;
    color: white;
    background-color: black;

    border-radius: 8px;
`;

const ButtonAdd = styled(OptionButton)`
    right: 15%;

    border-radius: 8px;
    border-style: solid;
    border-width: 3px;
`;

const ConfigurationContainer = styled.div`
    position: relative;
    left: 16px;
    top: 16px;
    width: calc(100% - 38px);
    height: calc(75% - 189px);
    overflow-y: auto;
    overflow-x: hidden;
    font-weight: bold;

    border-radius: 8px;
    border-style: solid;
    border-width: 3px;
`;

const ConfigurationItem = styled.div`
    position: relative;
    width: 100%;
    height: 80px;
`;

const ConfigurationItemCaption = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    left: 16px;
    width: 100%;
    height: 50%;
`;

const ConfigurationItemInput = styled.input`
    position: relative;
    left: 8px;
    width: calc(100% - 24px);
    max-width: 320px;
    height: 25%;
`;