import { ReactElement } from "react";
import "./App.css";
import { AppConfigProvider } from "./contexts/AppConfig";
import MainContent from "./components/MainContent";
import StatusBar from "./components/Statusbar";

function App(): ReactElement {

  return (
    <AppConfigProvider>
      <MainContent />
      <StatusBar />
    </AppConfigProvider>
  );
}

export default App;
