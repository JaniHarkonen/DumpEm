import React from "react";
import styled from "styled-components";
import { nextKey } from "../Classes";
import { jSymbolList } from "../Jsons";
import SymbolElement from "./SymbolList/SymbolElement";
import ManifestComponent from "../general/ManifestComponent";

export default class SymbolList extends ManifestComponent {
    constructor(props) {
        super(props, jSymbolList);
    }

        // Renders all the symbols provided to this symbol list.
    renderSymbols() {
        return(
            this.state.symbolData.map((symb) => {
                return(
                    <SymbolElementContainer key={nextKey()}>
                        <SymbolElement key={nextKey()} symbolData={symb} />
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
                <Content id={this.state.id}>
                    <SymbolListContainer>
                        {this.renderSymbols()}
                    </SymbolListContainer>
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
    background-color: #808080;
`;

const SymbolListContainer = styled.div`
    position: relative;
    left: 5%;
    top: 2.5%;
    width: 90%;
    height: 95%;
    overflow-y: auto;
    overflow-x: visible;
`;

const SymbolElementContainer = styled.div`
    position: relative;
    left: 0px;
    top: auto;
    width: 100%;
    height: 25%;
    margin-bottom: 5px;
`;