import React from "react";
import styled from "styled-components";
import { nextKey } from "../Classes";
import { jSymbolList } from "../Jsons";
import SymbolElement from "./SymbolList/SymbolElement";
import ManifestComponent from "../general/ManifestComponent";
import EditOutline from "../general/Options/Edit/EditOutline";

import imgBrush from "../assets/img_brush.svg";

export default class SymbolList extends ManifestComponent {
    constructor(props) {
        super(props, jSymbolList);
    }

        // Adds an entry/entries to the symbol list
    addEntry = (ent) => {
        let entries = this.state.symbolData.concat(ent);
        this.setState({
            symbolData: entries
        }, () => {
            this.saveConfiguration("onAddition");
        });
    }

        // Removes all entries from the symbol list
    clearSymbolList = () => {
        this.setState({
            symbolData: []
        }, () => {
            this.saveConfiguration("onClear");
        })
    }

        // Updates the color code of a symbol and saves the changes
    updateSymbol = (index, change) => {
        let state = this.state.symbolData;
        if( state[index] == null ) return;
        
        state[index] = { ...state[index], ...change };

        this.setState({
            symbolData: state
        }, () => {
            this.saveConfiguration("onColorChange");
        })
    }

        // Renders all the symbols provided to this symbol list.
    renderSymbols = () => {
        return(
            this.state.symbolData.map((symb, index) => {
                return(
                    <SymbolElementContainer key={nextKey()}>
                        <SymbolElement
                            key={nextKey()}
                            index={index}
                            symbolData={symb}
                            hostReference={this}
                        />
                    </SymbolElementContainer>
                );
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
                    style={{
                        left: this.getModifiedState(this.state.position.x),
                        top: this.getModifiedState(this.state.position.y),
                        width: this.getModifiedState(this.state.dimensions.width),
                        height: this.getModifiedState(this.state.dimensions.height)
                    }}
                >
                    <Caption onClick={this.testtest}>
                        <ClearListContainer onClick={this.clearSymbolList}>
                            <FullImage src={imgBrush} />
                        </ClearListContainer>

                        <b>{this.getModifiedState(this.state.caption)}</b>
                    </Caption>

                    <SymbolListContainer>
                        {this.renderSymbols()}
                    </SymbolListContainer>

                    {
                        this.state.editModeEnabled &&
                        <EditOutlineContainer>
                            <EditOutline
                                padding={4}
                                dragStartHook={this.startDragging}
                                dragStopHook={this.stopDragging}
                                resizeStartHook={this.startResizing}
                                resizeStopHook={this.stopResizing}
                                outlineColor="black"
                            />
                        </EditOutlineContainer>
                    }
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
    width: 50%;
    height: 60%;
    background-color: white;

    border-radius: 12px;
    border-style: solid;
    border-width: 3px;
`;

const Caption = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    left: 0px;
    top: 0px;
    width: 100%;
    height: 32px;

    border-bottom-style: solid;
    border-width: 3px;
`;

const SymbolListContainer = styled.div`
    position: relative;
    left: 50%;
    top: 2.5%;
    width: 90%;
    max-width: 500px;
    height: calc(95% - 32px);
    overflow-y: auto;
    overflow-x: hidden;
    transform: translateX(-50%);
`;

const SymbolElementContainer = styled.div`
    position: relative;
    left: 0px;
    top: auto;
    width: 100%;
    //max-width: 500px;
    height: 75px;
    margin-bottom: 5px;
`;

const EditOutlineContainer = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
`;

const ClearListContainer = styled.div`
    position: absolute;
    left: 8px;
    width: 24px;
    height: 24px;

    cursor: pointer;
    opacity: 0.5;

    &:hover {
        opacity: 1;
    }
`;

const FullImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;