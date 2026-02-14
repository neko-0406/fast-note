export enum FileType {
  TEXT,
  IMAGE,
  VECTOR,
  BINARY
}

export interface TabDataObject {
  id: string
  type: FileType
  fileName: string
  absPath: string
}

export interface TextTabObject extends TabDataObject {
}

export interface ImageTabObject extends TabDataObject {
}

export interface VectorTabObject extends TabDataObject {
}

export interface BinaryTabObject extends TabDataObject {
}