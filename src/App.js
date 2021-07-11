import Workspace from "./BASE/common/Workspace";
import { getStartupRepository, setCurrentRepository } from "./BASE/Helpers";
const { app } = window.require("@electron/remote");

function App() {
    setCurrentRepository(app.getAppPath() + "\\src\\EXTERN\\"/*getStartupRepository()*/);

    return (
    <div className="App">
        <Workspace attributes={{config: "root_config.json"}} />
    </div>
    );
}

export default App;
