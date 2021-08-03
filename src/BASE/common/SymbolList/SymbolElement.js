import React from "react";
import styled from "styled-components";
import { nextKey } from "../../Classes";
import ColorCodePicker from "./ColorCodePicker";

import imgChart from "../../assets/img_chart.svg";

export default class SymbolElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            symbolData: props.symbolData,
            colorCode: props.symbolData.color,
            hostReference: props.hostReference,
            index: props.index,
            showLink: props.showLink,
            LINK_INDEX: 2
        }
    }

        // Updates the color code of this element
    updateColorCode = (code) => {
        this.state.hostReference.updateSymbol(this.state.index, { color: code });
    }

        // Called upon opening the link to the symbol
    handleLinkOpen = () => {
        window.require("electron")
        .shell.openExternal(
            "https://www.tradingview.com/chart/?symbol=" +
            this.state.symbolData.data[this.state.LINK_INDEX].dataPoint
        );
    }

        // Renders the datapoints that are visible on the element
    renderData = () => {
        let elems = [];
        let sd = this.props.symbolData.data;
        let s = Math.min(4, sd.length);

        for( let i = 0; ; i++ )
        {
            if( i >= s ) break;
            if( sd[i] == null || !sd[i].visible ) continue;

            elems.push(
                <DataContainer key={nextKey()}>
                    <Data>
                        {sd[i].dataPoint}
                    </Data>
                </DataContainer>
            );
        }

        return elems;
    }

    render() {
        return(
            <>
                <Content
                    onClick={() => { this.props.hostReference.handleSymbolClick(this.state.index); }}
                    code={this.state.colorCode || "#D3D3D3"}
                    style={{ zIndex: (this.state.dropDownOpen) ? 2 : 0 }}
                >
                    {this.renderData()}
                    <SelectionOverlay style={{ display: this.props.isSelected ? "block" : "none" }} />

                    {
                        this.state.showLink &&
                        <ChartButton onClick={this.handleLinkOpen}>
                            <ChartImageContainer>
                                <FullImage src={imgChart} />
                            </ChartImageContainer>
                        </ChartButton>
                    }
                </Content>

                <ColorCodePickerContainer>
                    <ColorCodePicker
                        colorCode={this.state.colorCode}
                        updateCodeHook={this.updateColorCode}
                    />
                </ColorCodePickerContainer>
            </>
        )
    }
}

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: ${props => props.code};
    border-radius: 12px;

    &:hover {
        opacity: 0.75;
    }
`;

const DataContainer = styled.div`
    position: relative;
    display: inline-block;
    width: 40%;
    height: 45%;
`;

const Data = styled.div`
    position: absolute;
    display: flex;
    align-items: center;

    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    padding-left: 10px;
`;

const ColorCodePickerContainer = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    width: 24px;
    height: 24px;
`;

const SelectionOverlay = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;

    background-color: rgba(0, 0, 0, 0.18);
    border-radius: 12px;
    border-style: dashed;
    border-width: 1px;
`;

const ChartButton = styled.div`
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 8.25%;
    height: 50%;

    background-color: white;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

const ChartImageContainer = styled.div`
    position: absolute;
    left: 2px;
    top: 2px;
    right: 2px;
    bottom: 2px;
`;

const FullImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;