import { FileItem } from './FileTree';

export interface AppConfig {
  theme: 'System' | 'Dark' | 'Light';
  workDir: string;
}

export interface AppState {
  fileTreeItem: FileItem;
}
