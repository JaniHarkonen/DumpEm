import React from "react";
import styled from "styled-components";

export default class SymbolElement extends React.Component {
    render() {
        return(
            <Content onClick={() => {window.open(this.props.symbolData.tradingViewLink);}}>
                <p>{this.props.symbolData.title}</p>
                <p>{this.props.symbolData.ticker}</p>
            </Content>
        )
    }
}

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: #D3D3D3;
    border-radius: 12px;

    &:hover {
        cursor: pointer;
        border-style: dashed;
        border-width: 2px;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
    }
`;