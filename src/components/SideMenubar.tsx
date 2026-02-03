import { ReactElement, useCallback, useState } from 'react';

import style from '../styles/SideMenubar.module.css';

export default function SideMenubar(): ReactElement {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [menuWidth, setMenuWidth] = useState<number>(50);
  
  const dragMenuWidth = useCallback((move_x: number) => {
    
  }, [])
  
  return (
    <div className={style.Container} style={{width: `${menuWidth}px`}}>
      <div className={style.IconArea}></div>
      {showContent ? <div className={style.ContentArea}></div> : null}
    </div>
  );
}
