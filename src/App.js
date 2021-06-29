import Workspace from "./BASE/Components/Workspace";
import { getStartupRepository, setCurrentRepository } from "./BASE/Helpers";

function App() {
    setCurrentRepository(getStartupRepository());

    return (
    <div className="App">
        <Workspace attributes={{config: ".config.json"}} />
    </div>
    );
}

export default App;
