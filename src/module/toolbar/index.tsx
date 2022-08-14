import React, { useCallback, useState } from "react";
import "./index.less";

export default function Toolbar(props: any) {
  const { toggleWindow } = props;
  const [items, setItems] = useState<Array<any>>([
    {
      id: 0,
      icon: "../../../assets/play.png",
      showBubble: false,
      onClick: () => {
        toggleWindow();
      },
    },
    {
      id: 1,
      icon: "../../../assets/voice.png",
      showBubble: false,
      onClick: () => {
        toggleShowBubble(1)
      }
    },
    {
      id: 2,
      icon: "../../../assets/audio.png",
      showBubble: false,
      onClick: () => {
        toggleShowBubble(2)
      }
    }
  ]);
  console.log("items ======= ", items)
  const toggleShowBubble = useCallback((itemId: number) => {
    let its = items.map(item => {
      if (itemId === item.id) {
        
        console.log("showBubble ======= ", itemId, item.showBubble)
        return {
          ...item,
          showBubble: !item.showBubble
        }
      } else {
        return item
      }
    })
    console.log("its ======= ", its)
    setItems(its)
  }, [items]);

  return (
    <div className="toolbar">
      {
        items.map((item, index)  => {
          return (
            <div key={index}
              className="toolbar-item" 
              style={{background: `no-repeat center/60% url(${item.icon})`}}
              onClick={item.onClick}
              >
              {
                item.showBubble ? <div className="toolbar-item-bubble">

                </div> : null
              }
            </div> 
          )
        })
      }
    </div>
  )
}