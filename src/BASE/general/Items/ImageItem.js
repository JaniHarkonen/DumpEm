import React from "react";
import styled from "styled-components";
import { getAsset } from "../../../EXTERN/Assets";
import { jImage } from "../../Jsons";
import ManifestComponent from "../ManifestComponent";
import EditOutline from "../Options/Edit/EditOutline";

export default class ImageItem extends ManifestComponent {
    constructor(props) {
        super(props, jImage);

        this.state.image = getAsset(this.getModifiedState(this.state.assetName));
    }

    render() {
        return(
            <Content
                id={this.state.id}
                style={{
                    left: this.getModifiedState(this.state.position.x),
                    top: this.getModifiedState(this.state.position.y),
                    width: this.getModifiedState(this.state.dimensions.width),
                    height: this.getModifiedState(this.state.dimensions.height)
                }}
                addStyle={this.getModifiedState(this.state.style)}
            >
                <ImageContent src={this.state.image} />

                {
                    this.state.editModeEnabled &&
                    <EditOutlineContainer>
                        <EditOutline
                            padding={2}
                            dragStartHook={this.startDragging}
                            dragStopHook={this.stopDragging}
                            resizeStartHook={this.startResizing}
                            resizeStopHook={this.stopResizing}
                        />
                    </EditOutlineContainer>
                }
            </Content>
        )
    }
}

const Content = styled.div`
    position: relative;
    
    user-select: none;
    ${props => props.addStyle};
`;

const ImageContent = styled.img`
    position: relative;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const EditOutlineContainer = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
`;