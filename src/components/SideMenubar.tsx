import { ReactElement, useCallback, useEffect, useState } from 'react';

import style from '../styles/SideMenubar.module.css';
import { LuFolderTree, LuSettings, LuGitFork } from 'react-icons/lu';
import FileTree from './FileTree';
import { useAppState } from '../contexts/AppState';

type MenuID = 'FileTree' | 'Setting' | 'Git' | null;
export default function SideMenubar(): ReactElement {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);
  const [menuWidth, setMenuWidth] = useState<number>(100);
  const [selectedId, setSelectedId] = useState<MenuID>(null);

  const appState = useAppState();

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

  const showContentByMenuId = () => {
    switch (selectedId) {
      case 'FileTree':
        return <FileTree fileTreeData={appState.fileTree} />;
      default:
        return null;
    }
  };

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

  return (
    <div className={style.Container} style={{ width: `${menuWidth}px` }}>
      <div className={style.IconArea}>
        <button className={style.IconButton} onClick={() => toggleDisplayContent('FileTree')}>
          <LuFolderTree size={32} />
        </button>
        <button className={style.IconButton} onClick={() => toggleDisplayContent('Git')}>
          <LuGitFork size={32} />
        </button>
        <button className={style.IconButton} onClick={() => toggleDisplayContent('Setting')}>
          <LuSettings size={32} />
        </button>
      </div>
      {showContent ? <div className={style.ContentArea}>{showContentByMenuId()}</div> : null}
      {showContent ? <div className={style.MenuBorderLine} onMouseDown={handleMouseDwon}></div> : null}
    </div>
  );
}
