import React from "react";
import styled from "styled-components";

export default class DeleteOption extends React.Component {

    handleClick = () => {
        let id = this.props.hostReference.state.id;
        id = id.substring(id.lastIndexOf("-") + 1, id.length);
        this.props.hostReference.state.hostReference.removeComponent(id);
    }

    render() {
        return(
            <Content onClick={this.handleClick}>
                -
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
    background-color: #FF6868;
    opacity: 0.5;

    &:hover {
        opacity: 1.0;
    }
`;