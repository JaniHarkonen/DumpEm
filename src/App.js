import Workspace from "./BASE/Components/Workspace";
import { jROOT } from "./BASE/TestData";

function App() {
  return (
    <div className="App">
      <Workspace attributes={jROOT} />
    </div>
  );
}

export default App;
