import React from "raect";
import { jDefault } from "../../Jsons";
import { jsonToState } from "../../Helpers";

export default class TestComponent2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = jDefault;
        jsonToState(this, props.attributes);
    }

    render() {
        <div>
        
        </div>
    }
}