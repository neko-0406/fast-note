export type Node = 'Directory' | 'File';

export interface FileItem {
  name: string;
  absPath: string;
  node: Node;
  level: number;
  children: FileItem[];
}
