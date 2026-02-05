import { ReactElement } from 'react';
import './App.css';
import { AppConfigProvider } from './contexts/AppConfig';
import MainContent from './components/MainContent';
import StatusBar from './components/Statusbar';
import SideMenubar from './components/SideMenubar';
import { AppStateProvider } from './contexts/AppState';

function App(): ReactElement {
  return (
    <AppConfigProvider>
      <AppStateProvider>
        <MainContent>
          <SideMenubar />
        </MainContent>
        <StatusBar />
      </AppStateProvider>
    </AppConfigProvider>
  );
}

export default App;
