import "./App.css";
import { AppConfigProvider } from "./contexts/AppConfig";

function App() {

  return (
    <AppConfigProvider>
      <div>hello</div>
    </AppConfigProvider>
  );
}

export default App;
