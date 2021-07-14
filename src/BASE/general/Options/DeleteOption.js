import React from "react";
import styled from "styled-components";

import imgDelete from "../../assets/img_delete_circle.svg";

export default class DeleteOption extends React.Component {

    handleClick = () => {
        let id = this.props.hostReference.state.id;
        id = id.substring(id.lastIndexOf("-") + 1, id.length);
        this.props.hostReference.state.hostReference.removeComponent(id);
    }

    render() {
        return(
            <Content onClick={this.handleClick}>
                <DeleteImage src={imgDelete} />
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

const DeleteImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;