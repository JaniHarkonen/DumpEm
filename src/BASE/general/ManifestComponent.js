import BaseComponent from "./BaseComponent";

let MOUSE_POSITION = {};

/*
    Only DumpEm components that have a visual manifestation on the
    screen should extend this component.
*/
export default class ManifestComponent extends BaseComponent {
    constructor(props, skeleton) {
        super(props, skeleton);

        this.state.beingDragged = false;
        this.state.dragX = 0;
        this.state.dragY = 0;

        this.state.beingResized = false;
        this.state.resizeX = 0;
        this.state.resizeY = 0;

        this.state.DRAG_INTERVAL = null;
        this.state.RESIZE_INTERVAL = null;
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
                this.setDimensions({width: newsize.x, height: newsize.y});
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
        })
    }

        // Stops resizing the component
    stopResizing = () => {
        this.setState({ beingResized: false });
    }

        // Sets the position of the component
    setPosition = (pos) => {
        this.setState({ position: pos });
    }

        // Sets the dimensions of the component
    setDimensions = (dim) => {
        this.setState({ dimensions: dim });
    }

        // Returns the position of the component
    getPosition = () => {
        let pos = this.state.position;
        return { x: this.getModifiedState(pos.x), y: this.getModifiedState(pos.y) };
    }

        // Returns the dimensions of the component
    getDimensions = () => {
        let dim = this.state.dimensions;
        return { width: this.getModifiedState(dim.width), height: this.getModifiedState(dim.height) }
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
}