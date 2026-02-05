import { memo, ReactElement, useCallback, useState } from 'react';
import { LuFile, LuFolder, LuFolderOpen } from 'react-icons/lu';
import style from '../styles/FileTree.module.css';
import { FileItem } from '../types/FileTree';

export interface FileTreeProps {
  fileTreeData: FileItem | null;
}

const FileTree = memo(function FileTree({ fileTreeData }: FileTreeProps): ReactElement {
  return (
    <div className={style.FileTreeContainer}>
      {fileTreeData != null ? (
        <ul className={style.FolderRoot}>
          {fileTreeData.node === 'Directory' ? (
            <FolderItemContent key={fileTreeData.id} folderItem={fileTreeData} />
          ) : (
            <FileItemContent key={fileTreeData.id} fileItem={fileTreeData} />
          )}
        </ul>
      ) : null}
    </div>
  );
});

export default FileTree;

export interface FileItemProps {
  fileItem: FileItem;
}
export interface FolderItemProps {
  folderItem: FileItem;
}
// ファイルを表示するコンポーネント
export const FileItemContent = memo(function FileItemContent({ fileItem }: FileItemProps): ReactElement {
  return (
    <li className={style.FileItem}>
      <button className={style.FileTreeItem}>
        <LuFile size={16} />
        <span>{fileItem.name}</span>
      </button>
    </li>
  );
});

export function TreeItem(items: FileItem[]) {
  return items.map((item) =>
    item.node === 'Directory' ? (
      <FolderItemContent key={item.id} folderItem={item} />
    ) : (
      <FileItemContent key={item.id} fileItem={item} />
    ),
  );
}
// フォルダを表示するコンポーネント
export const FolderItemContent = memo(function FolderItemContent({ folderItem }: FolderItemProps) {
  const [opened, setOpened] = useState<boolean>(false);

  const toggleFolderState = useCallback(() => setOpened((pre) => !pre), []);

  return (
    <li className={style.FileItem}>
      <div>
        <button className={style.FileTreeItem} onClick={toggleFolderState}>
          {opened ? <LuFolderOpen /> : <LuFolder />}
          <span>{folderItem.name}</span>
        </button>
        {opened && folderItem.children ? <ul className={style.FolderItem}> {TreeItem(folderItem.children)} </ul> : null}
      </div>
    </li>
  );
});
