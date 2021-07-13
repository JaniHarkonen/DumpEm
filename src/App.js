import Workspace from "./BASE/common/Workspace";
import { setCurrentRepository } from "./BASE/Helpers";
const { app } = window.require("@electron/remote");

function App() {
    setCurrentRepository(app.getAppPath() + "\\src\\EXTERN\\");

    return (
    <div className="App">
        <Workspace attributes={{config: "root_config.json"}} />
    </div>
    );
}

export default App;
