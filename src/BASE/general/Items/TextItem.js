import React from "react";
import styled from "styled-components";
import { jText } from "../../Jsons";
import ManifestComponent from "../ManifestComponent";
import EditOutline from "../Options/Edit/EditOutline";

export default class TextItem extends ManifestComponent {
    constructor(props) {
        super(props, jText);
    }

    render() {
        return(
            <Content
                id={this.state.id}
                style={{
                    left: this.getModifiedState(this.state.position.x),
                    top: this.getModifiedState(this.state.position.y),
                    width: this.getModifiedState(this.state.dimensions.width),
                    height: this.getModifiedState(this.state.dimensions.height),
                    fontFamily: this.getModifiedState(this.state.font),
                    fontSize: this.getModifiedState(this.state.fontSize),
                    justifyContent: this.getModifiedState(this.state.horizontalAlign),
                    alignItems: this.getModifiedState(this.state.verticalAlign)
                }}
                addStyle={this.getModifiedState(this.state.style)}
            >
                <div>{this.getModifiedState(this.state.content)}</div>

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
    display: flex;
    
    user-select: none;
    ${props => props.addStyle};
`;

const EditOutlineContainer = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
`;