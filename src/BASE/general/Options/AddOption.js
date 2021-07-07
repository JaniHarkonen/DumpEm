import React from "react";
import styled from "styled-components";

export default class AddOption extends React.Component {

    handleClick() {
        let id = "idid";
        let classname = "symbol-list";
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