import React from "react";
import styled from "styled-components";
import { nextKey } from "../../../Classes";
import { JSONS, CONFIGS } from "../../../Jsons";

import imgHoistAttribute from "../../../assets/img_arrow_height.svg";
import imgRemove from "../../../assets/img_delete_circle.svg";
import imgAdd from "../../../assets/img_add_circle.svg";
import { writeJson } from "../../../Helpers";

export default class AddOptionPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            componentListKey: nextKey(),
            componentSelection: null,
            inputs: {},
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

        // Exits the popup upon clicking the background
    handleBackgroundClick = (e) => {
        if( e.target.id !== "option-popup__overlay" ) return; 

        this.props.closeOverlay();
    }

        // Selects a component and auto-fills its configuration
    handleComponentSelection = (comp) => {
        let sel = this.state.componentSelection;
        if( sel != null && comp.class === sel.class ) return;

        let citems = {};

            // Copy values from the default configuration JSON
        for( let field of Object.keys(comp.fields) )
        {
            let data = CONFIGS[field];

            switch( CONFIGS[field].type )
            {
                    // Copy an array
                case "list":
                    data = {
                        ...data,
                        value: comp.fields[field].map((v) => v )
                    }
                    break;
                
                    // Copy another JSON-object
                case "object":
                    data = {
                        ...data,
                        value: Object.keys(comp.fields[field]).map((k) => {
                            return {
                                field: k,
                                value: comp.fields[field][k]
                            } 
                        })
                    }
                    break;
                
                    // Copy a text field ("text" or "number")
                default:
                    data = {
                        ...data,
                        value: comp.fields[field]
                    }
                    break;
            }

                // Append the copy
            citems = {
                ...citems,
                [field]: {
                    ...data,
                    key: nextKey()
                }
            }
        }

        citems.id.value = comp.class.replaceAll("-", "_") + "__" + new Date().getTime();
        citems.class.value = comp.class;

        this.setState({
            componentSelection: comp,
            inputs: citems
        });

            // Scroll back to the top
        document.getElementById("option-popup__configuration").scrollTop = 0;
    }

        // Adds the prepared component to the host component
    handleComponentAddition = () => {
        let attrib_h = {};
        let attrib_cf = {};

            // Determine which configuration fields are stored by the host component
            // and which ones are stored in the configuration .json.
        for( let at of Object.keys(this.state.inputs) )
        {
            let attrib_temp = {};

                // Fetch the fields of a configuration of type "object"
            if( this.state.inputs[at].type === "object" )
            {
                this.state.inputs[at].value.forEach((v) => {
                    attrib_temp[v.field] = v.value != null ? v.value : "";
                });
            }
            else attrib_temp = this.state.inputs[at].value;

                // If hoisted -> add to host, if not -> add to .json
            if( this.state.inputs[at].isHoisted === true ) attrib_h[at] = attrib_temp;
            else attrib_cf[at] = attrib_temp;
        }
        
        attrib_cf.hostComponent = this.props.hostReference.getComponentId();

        writeJson(attrib_h.config, { attributes: attrib_cf });

            // Add the component to the host component
        this.props.hostReference.addComponent({
            class: this.state.componentSelection.class,
            attributes: attrib_h
        });

        this.props.closeOverlay();
    }

        // Updates the configuration input fields in the state
    handleConfigurationChange = (e, ref, extra) => {

        switch( ref.type )
        {
                // Updates a text field ("text" or "number")
            case "text":
            case "number":
                ref.value = e.target.value;
                break;
            
                // Updates a checkbox
            case "check":
                ref.value = e.target.checked;
                break;
            
                // Updates a list (array)
            case "list":
                ref.value[extra.index] = e.target.value;
                break;
            
                // Updates a JSON-object (JSON)
            case "object":
                if( extra.index === 0 ) extra.obj.field = e.target.value;
                if( extra.index === 1 ) extra.obj.value = e.target.value;
                break;
            
            default: return;
        }

        this.setState({ inputs: this.state.inputs });
    }

        // Updates the hoist configuration of an item
    handleHoistChange = (ref) => {
        ref.isHoisted = !ref.isHoisted;
        this.setState({ inputs: this.state.inputs });
    }

        // Removes a given configuration from a list of configurations
    handleConfigurationRemovalList = (ref, index) => {
        ref.value.splice(index, 1);
        this.setState({ inputs: this.state.inputs });
    }

        // Adds a configuration item to a list of configurations
    handleConfigurationAdditionList = (ref, deflt) => {
        ref.value = ref.value.concat(deflt);
        this.setState({ inputs: this.state.inputs });
    }

        // Adds a configuration item to an object of configurations
    handleConfigurationAdditionObject = (ref, deflt) => {
        ref.value = ref.value.concat(deflt);
        this.setState({ inputs: this.state.inputs });
    }

        // Returns a configuration item given its json
    getConfigurationListItemByJson = (json) => {
        let item = null;

        switch( json.type )
        {
                // Text field
            case "text":
            case "number":
                item = <ConfigurationItemInput
                            value={(json.value != null) ? json.value : ""}
                            onChange={(e) => { this.handleConfigurationChange(e, json) }}
                            type="text"
                        />;
                break;
            
                // Checkbox
            case "check":
                item = <ConfigurationCheckBox
                            checked={(json.value != null && json.value === true) ? true : false}
                            onChange={(e) => { this.handleConfigurationChange(e, json) }}
                            type="checkbox"
                        />;
                break;
            
                // Array list
            case "list":
                item = json.value.map((v, index) => {
                    return(
                        <ConfigurationItemInputContainer
                            margin={true}
                            key={json.key + "__listitem" + index}
                        >
                            <ConfigurationItemListInput
                                value={(v != null) ? v : ""}
                                onChange={(e) => { this.handleConfigurationChange(e, json, {index: index}) }}
                                type="text"
                            />
                            <ConfigurationItemRemoveContainer onClick={() => { this.handleConfigurationRemovalList(json, index) }}>
                                <FullImage src={imgRemove} />
                            </ConfigurationItemRemoveContainer>
                        </ConfigurationItemInputContainer>
                    );
                });

                return item;
            
                // Object's field list
            case "object":
                item = json.value.map((v, index) => {
                    return(
                        <ConfigurationItemInputContainer
                            margin={true}
                            key={json.key + "__object" + index}
                        >
                            <ConfigurationItemObjectInput 
                                value={(v.field != null) ? v.field : ""}
                                onChange={(e) => { this.handleConfigurationChange(e, json, { index: 0, obj: v }) }}
                                type="text"
                            />
                            :
                            <ConfigurationItemObjectInput
                                value={(v.value != null) ? v.value : ""}
                                onChange={(e) => { this.handleConfigurationChange(e, json, { index: 1, obj: v }) }}
                                type="text"
                            />

                            <ConfigurationItemRemoveContainer onClick={() => { this.handleConfigurationRemovalList(json, index) }}>
                                <FullImage src={imgRemove} />
                            </ConfigurationItemRemoveContainer>
                        </ConfigurationItemInputContainer>
                    )
                });

                return item;
            
            default: return "";
        }

        return (
            <ConfigurationItemInputContainer>
                {item}
            </ConfigurationItemInputContainer>
        )
    }

        // Renders the list of available components
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

        // Renders the list of configurable properties
    renderConfigurationItems = () => {
        let inputs = this.state.inputs;
        return(
            Object.keys(inputs).map((p) => {
                let pjson = inputs[p];
                if( !pjson.isVisible ) return "";

                return(
                    <ConfigurationItem
                        key={pjson.key}
                        itemType={pjson.type}
                    >
                        <ConfigurationItemCaption>
                            {pjson.caption}
                        </ConfigurationItemCaption>

                        <ConfigurationHoistContainer check={pjson.isHoisted}>
                            <ConfigurationItemHoist
                                src={imgHoistAttribute}
                                onClick={() => { this.handleHoistChange(pjson) }}
                            />
                        </ConfigurationHoistContainer>

                        {this.getConfigurationListItemByJson(pjson)}

                        {
                            (pjson.type === "list" || pjson.type === "object") &&
                            <ConfigurationItemAddContainer
                                onClick={() => { this.handleConfigurationAdditionObject(pjson, {field: "", value: ""}) }}
                                noItems={pjson.value.length <= 0}
                            >
                                <FullImage src={imgAdd} />
                            </ConfigurationItemAddContainer>
                        }
                    </ConfigurationItem>
                );
            })
        );
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

                    <ConfigurationContainer id="option-popup__configuration">
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
    border-width: 1px;
`;

const ConfigurationItem = styled.div`
    position: relative;
    width: 100%;
    height: 80px;

    ${props => (props.itemType === "list" || props.itemType === "object") && "height: auto;"}

    min-height: 80px;
`;

const ConfigurationItemCaption = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    left: 16px;
    width: 100%;
    height: 50%;
    min-height: 40px;
`;

const ConfigurationItemInputContainer = styled.div`
    position: relative;
    left: 48px;
    width: calc(100% - 24px);
    max-width: 320px;
    height: 25%;

    ${props => (props.margin) && "margin-top: 5px;"}
`;

const ConfigurationItemInput = styled.input`
    position: relative;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const ConfigurationItemListInput = styled(ConfigurationItemInput)`
    width: 65%;
`;

const ConfigurationItemObjectInput = styled(ConfigurationItemInput)`
    display: inline-block;
    width: 40%;
    margin-left: 4px;
    margin-right: 4px;
`;

const ConfigurationCheckBox = styled(ConfigurationItemInput)`
    position: absolute;
    left: 0px;
    width: 20px;
    height: 20px;
`;

const ConfigurationItemRemoveContainer = styled.div`
    position: relative;
    display: inline-block;
    left: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transform: translateY(25%);

    &:hover {
        opacity: 0.5;
    }
`;

const ConfigurationItemAddContainer = styled.div`
    position: relative;
    left: 56px;
    top: 12px;
    margin-bottom: 16px;
    width: 32px;
    height: 32px;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }

    ${props => props.noItems && "left: 48px; top: 0px; "}
`;

const FullImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const ConfigurationHoistContainer = styled.div`
    position: absolute;
    left: 8px;
    top: 38px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    
    border-radius: 4px;
    ${props => props.check && "background-color: #BCBCBC"};

    &:hover {
        background-color: #E0E0E0;
    }
`;

const ConfigurationItemHoist = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;