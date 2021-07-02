import React from "react";
import { readJson } from "../Helpers";
import { registerComponent } from "../ComponentRegistry";
import { runScript, SCRIPTS } from "../../EXTERN/Scripts";

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

        /*
            Interprets a single attribute written in DumpEm-format.
            Variables that the attrbiute may utilize must be provided.
            Otherwise, only the scripts called in the attribute will be
            run.
        */
    static interpret = (vars, attrib) => {
        if( attrib == null ) return null;

            // Replace variables with their values
        if( vars != null )
        {
            let id_var = "#VAR:"

            for( let v of Object.keys(vars) )
            {
                let av = vars[v];
                attrib = attrib.replaceAll(id_var + v, av);
                attrib = attrib.replaceAll(id_var + v, av);
            }

            if( attrib.includes(id_var) ) attrib = this.interpret(vars, attrib);
        }

            // Replace a value with the one provided by the script
        let id_script = "#SCRIPT:"
        while( attrib.includes(id_script) )
        {
            let mega = attrib.split(id_script);
            attrib = attrib.replaceAll(id_script + mega[1], runScript(mega[1]));
        }

        return attrib;
    }

        // Returns the attributes of a direct subcomponent given its ID
    getComponentById = (id) => {
        for( let c of this.state.components ) if( c.attributes.id === id ) return c;

        return null;
    }

        // Returns whether an option has been checked in the options-array (the array
        // contains an entry for it), if the array exists
    isOptionChecked = (opt) => {
        if( this.state.options == null ) return false;
        return this.state.options.includes(opt);
    }

        /* 
            Returns a property of the state of this component but passing it through a
            DumpEm interpreter first and making all necessary adjustments (replacements
            and function calls) before providing the value.
        */
    getModifiedState = (p) => {
        return BaseComponent.interpret(this.state.variables, p);
    }
}