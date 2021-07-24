import BaseComponent from "./BaseComponent";
import imgEditSquare from "../assets/img_edit_square.svg";

let MOUSE_POSITION = {};

/*
    Only DumpEm components that have a visual manifestation on the
    screen should extend this component.
*/
export default class ManifestComponent extends BaseComponent {
    constructor(props, skeleton) {
        super(props, skeleton);

            // Dragging
        this.state.beingDragged = false;
        this.state.dragX = 0;
        this.state.dragY = 0;

            // Resizing
        this.state.beingResized = false;
        this.state.resizeX = 0;
        this.state.resizeY = 0;

            // Intervals
        this.state.DRAG_INTERVAL = null;
        this.state.RESIZE_INTERVAL = null;

        this.state.ManifestComponent = {
            imgEditSquare: imgEditSquare
        }

        this.state.editModeEnabled = false;
    }

        // Performs addition on two sets of 2D-coordinates represented by JSONs
    static coordinateAddition = (c1, c2) => {
        return { x: c1.x + c2.x, y: c1.y + c2.y };
    }

        // Performs subtraction on two sets of 2D-coordinates represented by JSONs
    static coordinateSubtraction = (c1, c2) => {
        return { x: c1.x - c2.x, y: c1.y - c2.y };
    }

        // Create the mouse listener as well as the interval for dragging upon mount
    componentDidMount() {
        super.componentDidMount();
        
        document.addEventListener("mousemove", this.updateMousePosition);

            // (Re)Set intervals
        this.setState({
            DRAG_INTERVAL: setInterval(() => {
                let dragpos = { x: this.state.dragX, y: this.state.dragY };

                if( this.state.beingDragged === true )
                this.setPosition(ManifestComponent.coordinateSubtraction(MOUSE_POSITION, dragpos));
            }, 16),

            RESIZE_INTERVAL: setInterval(() => {
                let rezpos = { x: this.state.resizeX, y: this.state.resizeY };
                let newsize = ManifestComponent.coordinateSubtraction(MOUSE_POSITION, rezpos);

                if( this.state.beingResized === true )
                this.setDimensions({ width: newsize.x, height: newsize.y });

                //console.log(newsize.y);
            }, 16)
        });
    }

        // Clear the mouse listener as well as the dragging interval upon unmount
    componentWillUnmount() {
        super.componentWillUnmount();

        document.removeEventListener("mousemove", this.updateMousePosition);
        clearInterval(this.state.DRAG_INTERVAL);
        clearInterval(this.state.RESIZE_INTERVAL);
    }

        // Updates the position of the mouse relative to the host component
    updateMousePosition = (e) => {
        MOUSE_POSITION = { x: e.pageX, y: e.pageY };
    }

        // Begins dragging the component IF the drag option is enabled
    startDragging = () => {
        if( this.isOptionChecked("draggable") === false ) return;
        let pos = this.getPosition();

        this.setState({
            beingDragged: true,
            dragX: MOUSE_POSITION.x - pos.x,
            dragY: MOUSE_POSITION.y - pos.y
        });
    }

        // Stops dragging the component
    stopDragging = () => {
        this.saveConfiguration("onDrag");
        this.setState({ beingDragged: false });
    }

        // Begins resizing the component IF the resize option is enabled
    startResizing = () => {
        if( this.isOptionChecked("resizable") === false ) return;
        let pos = this.getPosition();

        this.setState({
            beingResized: true,
            resizeX: pos.x,
            resizeY: pos.y
        });
    }

        // Stops resizing the component
    stopResizing = () => {
        this.saveConfiguration("onResize");
        this.setState({ beingResized: false });
    }

        // Sets the position of the component
    setPosition = (pos) => {
        this.setState({ position: {
                x: pos.x + "px",
                y: pos.y + "px"
            }
        });
    }

        // Sets the dimensions of the component
    setDimensions = (dim) => {
        this.setState({ dimensions: {
                width: dim.width + "px",
                height: dim.height + "px"
            }
        });
    }

        // Returns the position of the component
    getPosition = () => {
        let pos = this.state.position;
        let x = parseInt(this.getModifiedState(pos.x).replaceAll("px", "").replaceAll("%", ""));
        let y = parseInt(this.getModifiedState(pos.y).replaceAll("px", "").replaceAll("%", ""));
        return { x: x, y: y };
    }

        // Returns the dimensions of the component
    getDimensions = () => {
        let dim = this.state.dimensions;
        let w = parseInt(this.getModifiedState(dim.width).replaceAll("px", "").replaceAll("%", ""));
        let h = parseInt(this.getModifiedState(dim.height).replaceAll("px", "").replaceAll("%", ""));
        return { width: w, height: h };
    }

        // Returns whether an option has been checked in the options-array (the array
        // contains an entry for it), if the array exists
    isOptionChecked = (opt) => {
        if( this.state.options == null ) return false;
        return this.state.options.includes(opt);
    }

        // Returns whether this component is being dragged
    isBeingDragged = () => {
        return this.state.beingDragged;
    }

        // Returns whether this component is being resized
    isBeingResized = () => {
        return this.state.beingResized;
    }

        // Enables edit mode
    enableEditMode = () => {
        this.setState({ editModeEnabled: true });
    }
    
        // Disables edit mode
    disableEditMode = () => {
        this.setState({ editModeEnabled: false });
    }

        // Toggles edit mode
    toggleEditMode = () => {
        this.setState({ editModeEnabled: !this.state.editModeEnabled });
    }

        // Enable edit mode for subcomponents
    enableEditModeForSubcomponents = () => {
        if( this.state.components != null )
        {
            this.getAllComponentReferences().forEach((ref) => {
                if( ref != null ) ref.enableEditMode();
            });
        }
    }

        // Disable edit mode for subcomponents
    disableEditModeForSubcomponents = () => {
        if( this.state.components != null )
        {
            this.getAllComponentReferences().forEach((ref) => {
                if( ref != null ) ref.disableEditMode();
            });
        }
    }

        // Toggles edit mode for subcomponents
    toggleEditModeForSubcomponents = () => {
        if( this.state.components != null )
        {
            this.getAllComponentReferences().forEach((ref) => {
                if( ref != null ) ref.toggleEditMode();
            });
        }
    }
}