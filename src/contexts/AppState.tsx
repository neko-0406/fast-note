import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { FileItem } from '../types/FileTree';
import { invoke } from '@tauri-apps/api/core';

interface AppStateProps {
  fileTree: FileItem | null;
  setFileItem: Dispatch<SetStateAction<FileItem | null>>;
}

export const AppStateContext = createContext<AppStateProps | null>(null);

export function useAppState(): AppStateProps {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [fileItem, setFileItem] = useState<FileItem | null>(null);
  // const [tabData, setTabData] = useState

  useEffect(() => {
    const loadFileTree = async () => {
      let fItem: FileItem = await invoke('get_work_dir_tree');
      setFileItem(fItem);
    };

    loadFileTree();
  }, []);

  const defaultValue = useMemo(
    () => ({
      fileTree: fileItem,
      setFileItem: setFileItem,
    }),
    [fileItem, setFileItem],
  );

  return <AppStateContext.Provider value={defaultValue}>{children}</AppStateContext.Provider>;
}
