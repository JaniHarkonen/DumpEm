import React from "react";
import styled from "styled-components";
import { getComponent } from "../Classes";
import { jWorkspace } from "../Jsons";
import { SCRIPTS } from "../../EXTERN/Scripts";

export default class Workspace extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = jWorkspace;
        if( props.attributes != null ) this.state = {...this.state, ...props.attributes};

        if( this.state.scripts.init != null ) SCRIPTS[this.state.scripts.init]();
    }

        // Returns a reference to a component given its ID
    getComponentById = (id) => {
        for( let c of this.state.components ) if( c.attributes.id === id ) return c;

        console.log("not found");
        return null;
    }

        // Renders all the subcomponents of this workspace
    renderComponents = () => {
        return(
            this.state.components.map((comp) => {
                if( comp.class !== "workspace" )
                return getComponent(comp.class, {...comp.attributes, hostReference: this});
            })
        );
    }



    render() {
        return(
            <>
                {
                    this.state.isRendered &&

                    <Content id={this.state.id}>
                        {this.renderComponents()}
                    </Content>
                }
            </>
        );
    }
}

/*const DeleteOptionContainer = styled.div`
    position: absolute;
    right: 58px;
    top: 5px;
    width: 48px;
    height: 32px;
`;

const AddOptionContainer = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
    width: 48px;
    height: 32px;
`;*/

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-style: solid;
    border-width: 2px;
    border-color: black;
`;