import React from "react";
import styled from "styled-components";

export default class DeleteOption extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        
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