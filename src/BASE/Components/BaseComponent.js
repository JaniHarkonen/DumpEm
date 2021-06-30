import React from "react";
import { readJson } from "../Helpers";
import { registerComponent } from "../ComponentRegistry";
import { SCRIPTS } from "../../EXTERN/Scripts";

export default class BaseComponent extends React.Component {
    constructor(props, skeleton) {
        super(props);
        /*
            First places the attributes from the config-file, and then places
            the attributes from the parent component.
        */
        this.state = skeleton;
        if( props.attributes != null )
        {
            this.state = { ...this.state, ...readJson(props.attributes.config).attributes, ...props.attributes }
        }

            // Prefix the ID of this component with that of the host
        if( this.state.hostReference != null ) this.state.id = this.state.hostReference.state.id + "-" + this.state.id;

        registerComponent(this.state.id, this);


            // Run initialization script, if it exists
        if( this.state.scripts.init != null ) SCRIPTS[this.state.scripts.init]();
    }

        // Returns the attributes of a direct subcomponent given its ID
    getComponentById = (id) => {
        for( let c of this.state.components ) if( c.attributes.id === id ) return c;

        return null;
    }
}