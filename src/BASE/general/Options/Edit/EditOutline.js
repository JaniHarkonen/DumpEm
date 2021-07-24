import React from "react";
import styled from "styled-components";

export default class EditOutline extends React.Component {

        // Set a mouse listener for left button release for smoother dragging
    componentDidMount() {
        document.addEventListener("mouseup", this.props.resizeStopHook);
    }

        // Remove listeners
    componentWillUnmount() {
        document.removeEventListener("mouseup", this.props.resizeStopHook);
    }

        // Called upon clicking a resize handle
    handleResizeClick = () => {
        this.props.resizeStartHook();
    }

        // Begins dragging upon clicking the element
    handleElementClick = (e) => {
        if( e.target.id.includes("edit-selection-outline-resize") ) return;
        this.props.dragStartHook();
    }

        // Renders a single resize handle
    resizeHandleElement = (id, at) => {
        return(
            <ResizeHandle
                id={id}
                at={at}
                onMouseDown={this.handleResizeClick}
                outlineColor={this.props.outlineColor || "black"}
            />
        )
    }

        // Renders resize handles at the corners of the element
    renderResizeHandles = () => {
        return(
            <>
                {this.resizeHandleElement("edit-selection-outline-resize-tl", {x: 0, y: 0})}
                {this.resizeHandleElement("edit-selection-outline-resize-tr", {x: 1, y: 0})}
                {this.resizeHandleElement("edit-selection-outline-resize-bl", {x: 0, y: 1})}
                {this.resizeHandleElement("edit-selection-outline-resize-br", {x: 1, y: 1})}
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
                outlineColor={this.props.outlineColor || "black"}
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
    border-color: ${props => props.outlineColor};

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

    background-color: ${props => props.outlineColor};
`;