import React from "react";
import styled from "styled-components";

export default class EditOutline extends React.Component {
    handleResizeClick = () => {
        console.log("lol")
    }

    handleElementClick = (e) => {
        if( e.target.id.includes("edit-selection-outline-resize") ) return;
        this.props.dragStartHook();
    }

    renderResizeHandles = () => {
        return(
            <>
                <ResizeHandle
                    id="edit-selection-outline-resize-tl"
                    at={{x: 0, y: 0}}
                    onMouseDown={this.handleResizeClick}
                />
                <ResizeHandle
                    id="edit-selection-outline-resize-tr"
                    at={{x: 1, y: 0}}
                    onMouseDown={this.handleResizeClick}
                />
                <ResizeHandle
                    id="edit-selection-outline-resize-bl"
                    at={{x: 0, y: 1}}
                    onMouseDown={this.handleResizeClick}
                />
                <ResizeHandle
                    id="edit-selection-outline-resize-br"
                    at={{x: 1, y: 1}}
                    onMouseDown={this.handleResizeClick}
                />
            </>
        )
    }

    render() {
        return (
            <Content
                id={"edit-selection-outline"}
                pad={this.props.padding}
                onMouseDown={this.handleElementClick}
                onMouseUp={() => {
                    this.props.dragStopHook();
                }}
            >
                {this.renderResizeHandles()}
            </Content>
        )
    }
}

const Content = styled.div`
    position: absolute;
    left: -${props => props.pad}px;
    top: -${props => props.pad}px;
    right: -${props => props.pad}px;
    bottom: -${props => props.pad}px;

    border-style: dashed;
    border-width: 1px;

    opacity: 0;

    &:hover {
        opacity: 1;
    }
`;

let resizeHandleSize = 7;
const ResizeHandle = styled.div`
    position: absolute;
    left: calc(${props => props.at.x * 100}% - ${props => props.at.x * resizeHandleSize}px);
    top: calc(${props => props.at.y * 100}% - ${props => props.at.y * resizeHandleSize}px);
    width: ${resizeHandleSize}px;
    height: ${resizeHandleSize}px;

    background-color: black;
`;