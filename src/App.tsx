import { ReactElement } from "react";
import "./App.css";
import { AppConfigProvider } from "./contexts/AppConfig";
import MainContent from "./components/MainContent";
import StatusBar from "./components/Statusbar";
import SideMenubar from "./components/SideMenuBar";

function App(): ReactElement {
  return (
    <AppConfigProvider>
      <MainContent>
        <SideMenubar />
      </MainContent>
      <StatusBar />
    </AppConfigProvider>
  );
}

export default App;
