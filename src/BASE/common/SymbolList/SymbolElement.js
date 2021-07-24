import React from "react";
import styled from "styled-components";
import { nextKey } from "../../Classes";
import ColorCodePicker from "./ColorCodePicker";

//import imgChart from "../../assets/img_chart.svg";

export default class SymbolElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            symbolData: props.symbolData,
            colorCode: props.symbolData.color
        }
    }

        // Updates the color code of this element
    updateColorCode = (code) => {
        this.setState({ colorCode: code });
    }

        // Renders the datapoints that are visible on the element
    renderData = () => {
        let elems = [];

        let sd = this.props.symbolData.data;
        let s = Math.min(4, sd.length);
        for( let i = 0; i < s; i++ )
        {
            elems.push(
                <DataContainer key={nextKey()}>
                    <Data>
                        {sd[i]}
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
                    /*onClick={() => { window.open(this.props.symbolData.tradingViewLink) }}*/
                    code={this.state.colorCode || "#D3D3D3"}
                    style={{ zIndex: (this.state.dropDownOpen) ? 2 : 0 }}
                >
                    {this.renderData()}

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

/*const ChartButton = styled.div`
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 8.25%;
    height: 50%;

    background-color: gray;
    border-bottom-right-radius: 12px;
    cursor: pointer;
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
`;*/