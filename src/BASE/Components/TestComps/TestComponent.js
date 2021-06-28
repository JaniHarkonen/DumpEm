import React from "react";
import { jsonToState } from "../../Helpers";

export default class TestComponent extends React.Component {
    constructor(props){
        super(props);

        var attrib = props.attributes;
        jsonToState(this, attrib);
    }

    render() {
        return(
            <div style={{position: "relative", width: "100px", height: "100px"}}>
                {(this.props.attributes == null) ? "xd xd xd" : this.state.testattrib}
            </div>
        )
    }
}