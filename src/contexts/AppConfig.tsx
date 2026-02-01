import { invoke } from '@tauri-apps/api/core';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { AppConfig } from '../types/AppConfig';

interface AppConfigProps {
  appConfig: AppConfig | null;
  setAppConfig: Dispatch<SetStateAction<AppConfig | null>>;
}

// コンテキストの作成
export const AppConfigContext = createContext<AppConfigProps | null>(null);

// これを呼び出して中身にアクセス
export function useAppContext(): AppConfigProps {
  const context = useContext(AppConfigContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
}

export function AppConfigProvider({ children }: { children: React.ReactNode }) {
  // デフォルトの値の設定
  const [appConfig, setAppConfig] = useState<AppConfig | null>(null);

  useEffect(() => {
    const loadAppConfig = async () => {
      let appConfig: AppConfig = await invoke('get_app_config');
      setAppConfig(appConfig);
    };

    loadAppConfig();
  }, []);

  const defaultValue = useMemo(
    () => ({
      appConfig: appConfig,
      setAppConfig: setAppConfig,
    }),
    [appConfig, setAppConfig],
  );

  return <AppConfigContext.Provider value={defaultValue}>{children}</AppConfigContext.Provider>;
}
