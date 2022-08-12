import React from "react";
import "./index.less";

export default function Toolbar(props: any) {
  const { showWindow } = props;
  const items = [
    {
      icon: "../../../assets/play.png",
      onClick: () => {
        showWindow(true);
      }
    }
  ]

  return (
    <div className="toolbar">
      {
        items.map(item => {
          return (
            <div className="toolbar-item" 
              style={{background: `no-repeat center/60% url(${item.icon})`}}
              onClick={item.onClick}
              ></div>
          )
        })
      }
    </div>
  )
}