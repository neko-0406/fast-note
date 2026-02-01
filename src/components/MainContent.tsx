import { ReactElement, ReactNode } from 'react';

import style from '../styles/MainContent.module.css';

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps): ReactElement {
  return <div className={style.Container}>{children}</div>;
}
