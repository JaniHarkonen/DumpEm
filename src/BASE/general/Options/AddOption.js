import React from "react";
import styled from "styled-components";

import imgAdd from "../../assets/img_add_circle.svg";

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
                <AddImage src={imgAdd} />
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

    &:hover {
        opacity: 0.5;
    }

    cursor: pointer;
`;

const AddImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;