export type Node = 'Directory' | 'File';

export interface FileItem {
  id: string
  name: string;
  absPath: string;
  node: Node;
  level: number;
  children: FileItem[];
}
