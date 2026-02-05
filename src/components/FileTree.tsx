import { ReactElement, ReactNode, useState } from "react";
import style from "../styles/FileTree.module.css"

export default function FileTree(): ReactElement {
  return (
    <div className={style.FileTreeContainer}>
      
    </div>
  );
}

export interface FileItemProps {
  children: ReactNode
}

export function FileItem({ children }: FileItemProps): ReactElement {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <div className={style.FileTreeItemContainer}>
      
    </div>
  );
}