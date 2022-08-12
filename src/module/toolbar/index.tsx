import React from "react";
import "./index.less";

export default function Toolbar(props: any) {
  const { toggleWindow } = props;
  const items = [
    {
      icon: "../../../assets/play.png",
      onClick: () => {
        toggleWindow();
      }
    }
  ]

  return (
    <div className="toolbar">
      {
        items.map((item, index)  => {
          return (
            <div key={index}
              className="toolbar-item" 
              style={{background: `no-repeat center/60% url(${item.icon})`}}
              onClick={item.onClick}
              ></div>
          )
        })
      }
    </div>
  )
}