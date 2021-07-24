import React from "react";
import styled from "styled-components";
import { nextKey } from "../../Classes";

export default class ColorCodePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colorCode: props.colorCode,
            menuOpen: false,
            codeChoices: [
                "#D3D3D3",
                "#D4FF68",
                "#FFBB8E",
                "#93FF66",
                "#9BFFFF",
                "#7FC9FF",
                "#93A3FF",
                "#FFA8A8"
            ]
        };
    }

        // Changes the color code of the element and updates the hosting SymbolList
    changeCode = (code) => {
        this.setState({
            menuOpen: false,
            colorCode: code
        });
        this.props.updateCodeHook(code);
    }

        // Toggles the color picker drop down menu
    toggleMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen });
    }

        // Renders the drop down menu containing color codes
    renderCodeMenu = () => {
        return(
            <ChoicesContainer>
            {
                this.state.codeChoices.map((cc) => {
                    return(
                        <CodeChoiceContainer
                            key={nextKey()}
                            onClick={() => { this.changeCode(cc) }}
                        >
                            <CodeChoice style={{ backgroundColor: cc }}>
                                {(cc === "#D3D3D3") && "none"}
                            </CodeChoice>
                        </CodeChoiceContainer>
                    )
                })
            }
            </ChoicesContainer>
        );
    }

    render() {
        return(
            <>
                <Content onClick={this.toggleMenu}>
                    <ColorCircle code={(this.state.colorCode !== "#D3D3D3") ? this.state.colorCode : null} />
                </Content>
                {
                    this.state.menuOpen &&
                    <DropDownContainer>
                        {this.renderCodeMenu()}
                    </DropDownContainer>
                }
            </>
        )
    }
}

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;

    border-radius: 4px;
    border-style: solid;
    border-width: 2px;

    background-color: white;
    cursor: pointer;
`;

const ColorCircle = styled.div`
    position: absolute;
    left: 2px;
    top: 2px;
    right: 2px;
    bottom: 2px;

    border-radius: 50%;
    background-color: ${props => props.code};
`;

const DropDownContainer = styled.div`
    position: absolute;
    right: 0px;
    top: 100%;
    width: 160px;
    height: 84px;

    background-color: rgba(255, 255, 255, 0.65);
    border-radius: 8px;
`;

const ChoicesContainer = styled.div`
    position: absolute;
    left: 5px;
    top: 5px;
    width: 100%;
    height: 100%;

`;

const CodeChoiceContainer = styled.div`
    position: relative;
    display: inline-block;
    margin-right: 3.75%;
    margin-bottom: 1.25%;
    width: 20%;
    height: 38%;

    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }

    z-index: 1;
`;

const CodeChoice = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    border-style: solid;
    border-width: 2px;
    border-color: white;
    border-radius: 4px;

    font-size: 10px;
`;