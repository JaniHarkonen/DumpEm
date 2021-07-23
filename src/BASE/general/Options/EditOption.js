import React from "react";
import styled from "styled-components";

export default class AddOption extends React.Component {

    handleClick() {
        this.props.hostReference.toggleEditModeForSubcomponents();
    }

    render() {
        return(
            <Content
                onClick={() => this.handleClick()}
                addStyle={this.props.addStyle}
            >
                <EditImage src={this.props.imgEdit} />
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

    ${props => props.addStyle}
`;

const EditImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;