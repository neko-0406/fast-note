export type Node = "Directory" | "File";

export interface FileItem {
  name: String,
  absPath: String,
  node: Node,
  level: number,
  children: FileItem[]
}