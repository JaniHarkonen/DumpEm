import React from "react";
import styled from "styled-components";

import iconEdit from "../../assets/icon_edit.png";

export default class AddOption extends React.Component {

    handleClick() {
        this.props.hostReference.enableEditMode();
    }

    render() {
        return(
            <Content onClick={() => this.handleClick()}>
                <EditIcon src={iconEdit} />
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
    background-color: #D8D8D8;
    opacity: 0.5;

    &:hover {
        opacity: 1.0;
    }
`;

const EditIcon = styled.img`
    position: relative;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;