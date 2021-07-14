import React from "react";
import styled from "styled-components";
import AddOptionPopup from "./Add/AddOptionPopup";

import imgAdd from "../../assets/img_add_circle.svg";

export default class AddOption extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPopupOpen: false
        };
    }

    handleClick() {
        this.setState({ isPopupOpen: true });
    }

    render() {
        return(
            <>
                <Content onClick={() => this.handleClick()}>
                    <AddImage src={imgAdd} />
                </Content>

                {
                    this.state.isPopupOpen &&
                    <AddOptionPopup
                        closeOverlay={() => { this.setState({ isPopupOpen: false }) }}
                        hostReference={this.props.hostReference}
                    />
                }
            </>
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