import React from "react";
import styled from "styled-components";

import imgEdit from "../../assets/img_edit_circle.svg";

export default class AddOption extends React.Component {

    handleClick() {
        //this.props.hostReference.enableEditMode();
    }

    render() {
        return(
            <Content onClick={() => this.handleClick()}>
                <EditImage src={imgEdit} />
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

const EditImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;