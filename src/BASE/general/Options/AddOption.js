import React from "react";
import styled from "styled-components";

export default class AddOption extends React.Component {

    handleClick() {
        //printReferences();
        /*let classname = prompt("Which component to add?", "workspace");
        let name = prompt("give name: ", "Workspace 2022-0");
        let id = prompt("give id:", "idid");
        this.props.addComponent({class: classname, attributes: {name: name, id: id}});*/
        //console.log(this.props.hostReference.state);
        
        let id = "idid";//prompt("ID of the component: ", "idid");
        let classname = "symbol-list";//prompt("Which component", "symbol-list");
        let comp = {
            class: classname,
            attributes: {
                id: id,
                isRendered: true
            }
        }
        this.props.hostReference.addComponent(comp);
    }

    render() {
        return(
            <Content onClick={() => this.handleClick()}>
                +
            </Content>
        );
    }
}

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: #7CFF21;
    opacity: 0.5;

    &:hover {
        opacity: 1.0;
    }
`;