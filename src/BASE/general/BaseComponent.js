import React from "react";
import { modifyJson, readJson } from "../Helpers";
import { registerComponent } from "../ComponentRegistry";
import { runScript as Scripts_runScript, SCRIPTS } from "../../EXTERN/Scripts";

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
            this.state = { ...this.state, ...readJson(this.getModifiedState(props.attributes.config)).attributes, ...props.attributes }
        }

            // Prefix the ID of this component with that of the host
        if( this.state.hostReference != null ) this.state.id = this.state.hostReference.state.id + "-" + this.state.id;

        registerComponent(this.state.id, this);


            // Run initialization script, if it exists
        this.runComponentScript("init");
    }

        // Calls a script after mounting, if it exists
    componentDidMount() {
        this.runComponentScript("afterMount");
    }

        // Calls a script upon unmounting, if it exists
    componentWillUnmount() {
        this.runComponentScript("onUnmount");
    }

        /*
            Interprets a single attribute written in DumpEm-format.
            Variables that the attrbiute may utilize must be provided.
            Otherwise, only the scripts called in the attribute will be
            run.
        */
    static interpret = (vars, attrib) => {
        if( attrib == null ) return null;
        if( typeof attrib == "number" ) return attrib;

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
            let scr_str = attrib.split(id_script);
            attrib = attrib.replaceAll(id_script + scr_str[1], Scripts_runScript(scr_str[1]));
        }

        return attrib;
    }

        // Returns the attributes of a direct subcomponent given its ID
    getComponentById = (id) => {
        for( let c of this.state.components ) if( c.attributes.id === id ) return c;

        return null;
    }

        /* 
            Returns a property of the state of this component but passing it through a
            DumpEm interpreter first and making all necessary adjustments (replacements
            and function calls) before providing the value.
        */
    getModifiedState = (p) => {
        return BaseComponent.interpret(this.state.variables, p);
    }

        // Runs a script assigned to this component
    runComponentScript = (scr) => {
        if( scr == null ) return;

        let script = this.state.scripts[scr];
        if( script == null || script === "" ) return;

        SCRIPTS[this.getModifiedState(script)]();
    }

        // Saves the attributes of the component to its config file
    saveConfiguration = (save_event) => {
        let config = this.getModifiedState(this.state.config);
        if( config == null || config === "" ) return;
        if( save_event == null || save_event === "" ) return;
        let fields = this.state.savedFields[save_event];
        if( fields == null || fields.length <= 0 ) return;

        
        let fields_c = {};
        for( let field of fields )
        {
            let state = this.state[field];
            fields_c[field] = state ? state : null;
        }

        modifyJson(config, fields_c);
    }

        // Removes a sub-component with a given ID from the "components"-array
    removeComponent = (id) => {
        this.setState({components: this.state.components.filter((comp) => comp.attributes.id !== id)})
    }
    
        // Adds a given sub-component to the "components"-array
    addComponent = (comp) => {
        console.log(comp)
        this.setState({components: this.state.components.concat(comp)});
    }
}