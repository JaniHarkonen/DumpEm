import React from "react";
import styled from "styled-components";
import { nextKey } from "../Classes";
import { jSymbolList } from "../Jsons";
import SymbolElement from "./SymbolList/SymbolElement";
import { registerComponent } from "../ComponentRegistry";
import { SCRIPTS } from "../../EXTERN/Scripts"
import { readJson } from "../Helpers";

export default class SymbolList extends React.Component {
    constructor(props) {
        super(props);
        
            // Copy attributes from the host component, if there are any
        this.state = jSymbolList;
        if( props.attributes != null )
        {
            this.state = { ...this.state, ...readJson(props.attributes.config).attributes, ...props.attributes }
        }

            // Prefix the ID of this component with that of the host
        if( this.state.hostReference != null ) this.state.id = this.state.hostReference.state.id + "-" + this.state.id;

        registerComponent(this.state.id, this);


            // Run initialization script, if it exists
        if( this.state.scripts.init != null ) SCRIPTS[this.state.scripts.init]();
    }

        // Returns a reference to a component given its ID
    getComponentById = (id) => {
        for( let c of this.state.components ) if( c.attributes.id === id ) return c;

        return null;
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