import { Activity, memo, ReactElement, useCallback, useEffect, useState } from 'react';

import style from '../styles/SideMenubar.module.css';
import { LuFolderTree, LuSettings, LuGitFork } from 'react-icons/lu';
import FileTree from './FileTree';
import { useAppState } from '../contexts/AppState';
import { FileItem } from '../types/FileTree';
import { listen } from '@tauri-apps/api/event';

type MenuID = 'FileTree' | 'Setting' | 'Git' | null;

interface OpenFolderEvent {
  new_file_item: FileItem
}

interface SideMenuContentProps {
  selectedId: MenuID;
  fileTreeItem: FileItem | null;
}

const SideMenuContent = memo(function SideMenuContent({
  selectedId,
  fileTreeItem,
}: SideMenuContentProps): ReactElement {
  return (
    <>
      <Activity mode={selectedId === 'FileTree' ? 'visible' : 'hidden'}>
        <FileTree fileTreeData={fileTreeItem} />
      </Activity>
      <Activity mode={selectedId === 'Git' ? 'visible' : 'hidden'}>{null}</Activity>
      <Activity mode={selectedId === 'Setting' ? 'visible' : 'hidden'}>{null}</Activity>
    </>
  );
});

export default function SideMenubar(): ReactElement {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const [menuWidth, setMenuWidth] = useState<number>(100);
  const [selectedId, setSelectedId] = useState<MenuID>(null);

  const { fileTree, setFileItem } = useAppState();

  const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
    setMenuWidth((pre) => Math.max(pre + event.movementX, 100));
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDraggable(false);
  }, []);

  const handleMouseDwon = useCallback(() => {
    setIsDraggable(true);
  }, []);

  const hideMenuContent = useCallback(() => {
    setShowContent(false);
  }, []);

  const showMenuContent = useCallback(() => {
    setShowContent(true);
  }, []);

  const toggleDisplayContent = useCallback(
    (menuId: MenuID) => {
      if (selectedId === menuId) {
        if (showContent) {
          hideMenuContent();
        } else {
          showMenuContent();
        }
      } else {
        showMenuContent();
        setSelectedId(menuId);
      }
    },
    [selectedId, showContent, hideMenuContent, showMenuContent],
  );

  useEffect(() => {
    if (isDraggable) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggable, handleMouseUp, handleMouseMove]);
  
  useEffect(() => {
    let unlisten: (() => void) | undefined;
    
    async function setupOpenFolderEventListener() {
      unlisten = await listen<OpenFolderEvent>('open-folder-event', (event) => {
        console.log(event.payload.new_file_item);
        setFileItem(event.payload.new_file_item);
      })
    };
    setupOpenFolderEventListener();
    
    return () => {
      if (unlisten) unlisten();
    };
  }, []);

  return (
    <div className={style.Container} style={{ width: `${menuWidth}px` }}>
      <div className={style.IconArea}>
        <button className={style.IconButton} onClick={() => toggleDisplayContent('FileTree')}>
          <LuFolderTree size={32} fontWeight={20} />
        </button>
        <button className={style.IconButton} onClick={() => toggleDisplayContent('Git')}>
          <LuGitFork size={32} fontWeight={20} />
        </button>
        <button className={style.IconButton} onClick={() => toggleDisplayContent('Setting')}>
          <LuSettings size={32} fontWeight={20} />
        </button>
      </div>
      <Activity mode={showContent ? 'visible' : 'hidden'}>
        <div className={style.ContentArea}>
          <SideMenuContent selectedId={selectedId} fileTreeItem={fileTree} />
        </div>
        <div className={style.MenuBorderLine} onMouseDown={handleMouseDwon}></div>
      </Activity>
    </div>
  );
}
