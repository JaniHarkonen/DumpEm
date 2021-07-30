import React from "react";
import styled from "styled-components";

import imgEdit from "../../assets/img_edit_square.svg";

export default class EditComponentOption extends React.Component {
    render() {
        return(
            <Content>
                <FullImage src={imgEdit} />
            </Content>
        )
    }
}

const Content = styled.div`
    position: absolute;
    width: 32px;
    height: 32px;

    cursor: pointer;
    opacity: 0.75;

    &:hover {
        opacity: 1.0;
    }
`;

const FullImage = styled.img`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;