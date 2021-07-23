import React from "react";
import styled from "styled-components";

import imgDelete from "../../assets/img_delete_circle.svg";
import { deleteFile } from "../../Helpers";

export default class DeleteOption extends React.Component {

    handleClick = () => {

            // Remove from the host component
        let id = this.props.hostReference.getComponentId();
        this.props.hostReference.state.hostReference.removeComponent(id);

            // Remove the configuration
        deleteFile(this.props.hostReference.state.config);
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
    user-select: none;
`;

const DeleteImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;