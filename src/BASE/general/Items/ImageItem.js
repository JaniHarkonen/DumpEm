import React from "react";
import styled from "styled-components";
import { getAsset } from "../../../EXTERN/Assets";
import { jImage } from "../../Jsons";
import ManifestComponent from "../ManifestComponent";

export default class ImageItem extends ManifestComponent {
    constructor(props) {
        super(props, jImage);

        this.state.image = getAsset(this.getModifiedState(this.state.assetName));
    }

    render() {
        return(
            <Content
                id={this.state.id}
                left={this.getModifiedState(this.state.position.x)}
                top={this.getModifiedState(this.state.position.y)}
                width={this.getModifiedState(this.state.dimensions.width)}
                height={this.getModifiedState(this.state.dimensions.height)}
                addStyle={this.getModifiedState(this.state.style)}
            >
                <ImageContent src={this.state.image} />
            </Content>
        )
    }
}

const Content = styled.div`
    position: relative;
    left: ${props => props.left};
    top: ${props => props.top};
    width: ${props => props.width};
    height: ${props => props.height};
    
    user-select: none;
    pointer-events: none;
    ${props => props.addStyle};
`;

const ImageContent = styled.img`
    position: relative;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;