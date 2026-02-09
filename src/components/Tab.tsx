import { Activity, ReactNode, useState } from "react";
import style from "../styles/Tab.module.css";

// タブをまとめるコンテナのコンポーネント
interface TabContainerProps {}

export default function TabContainer({ }: TabContainerProps) {
  const [selectedTabId, setSelectedTabId] = useState<string>("");
  
  return (
    <div className={style.Container}>
      {/* タブの名前を表示するところ */}
      <div className={style.TabIndexContainer}></div>
      {/* タブの中身を表示するところ */}
      <div className={style.TabValueContainer}></div>
    </div>
  );
}

// タブ本体
interface TabProps {
  selectedId: string
  children: ReactNode
}

export function Tab({ children }: TabProps) {
  const [selected, setSelected] = useState<boolean>(false);
  
  return (
    <div>
      {/*<Activity mode={}>*/}
        {children}
      {/*</Activity>*/}
    </div>
  )
}