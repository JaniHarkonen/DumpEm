import BaseComponent from "./BaseComponent";

let MOUSE_POSITION = {};
let DRAG_INTERVAL = null;

const updateMousePosition = (e) => {
    MOUSE_POSITION = { x: e.pageX, y: e.pageY };
}

export default class ManifestComponent extends BaseComponent {
    constructor(props, skeleton) {
        super(props, skeleton);

        this.state.beingDragged = false;
        this.state.dragX = 0;
        this.state.dragY = 0;
    }

    // Performs addition on two sets of 2D-coordinates represented by JSONs
    static coordinateAddition = (c1, c2) => {
        return { x: c1.x + c2.x, y: c1.y + c2.y };
    }

        // Create the mouse listener as well as the interval for dragging upon mount
    componentDidMount() {
        super.componentDidMount();
        
        document.addEventListener("mousemove", updateMousePosition);

        DRAG_INTERVAL = setInterval(() => {
            let dragpos = { x: this.state.dragX, y: this.state.dragY };

            if( this.state.beingDragged === true ) this.setPosition(ManifestComponent.coordinateAddition(MOUSE_POSITION, dragpos));
        }, 16);
    }

        // Clear the mouse listener as well as the dragging interval upon unmount
    componentWillUnmount() {
        super.componentWillUnmount();

        document.removeEventListener("mousemove", updateMousePosition);
        clearInterval(DRAG_INTERVAL);
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
}