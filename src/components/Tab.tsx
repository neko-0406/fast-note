import { useState } from "react";
import style from "../styles/Tab.module.css";

export default function TabContainer() {
  const [selectedTabId, setSelectedTabId] = useState<string>("");
  
  
  return (
    <div className={style.Container}>
      {/* タブの名前を表示するところ */}
      <div></div>
      {/* タブの中身を表示するところ */}
      <div></div>
    </div>
  );
}

export function Tab() {}