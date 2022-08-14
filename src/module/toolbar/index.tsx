import React, { useEffect, useState } from "react";
import Play from "../../service/play";
import "./index.less";

export default function Toolbar(props: any) {
  const { toggleWindow } = props;
  useEffect(() => {
    const plays = Play.getPlayInfo(1);
    console.log(plays)
    setItem(1, "list", plays.audios);
  }, [])
  const [items, setItems] = useState<Array<any>>([
    {
      id: 0,
      icon: "../../../assets/play.png",
      showBubble: false,
    },
    {
      id: 1,
      icon: "../../../assets/voice.png",
      showBubble: false,
    },
    {
      id: 2,
      icon: "../../../assets/audio.png",
      showBubble: false,
    }
  ]);

  const click = (itemId: number) => {
    if (!itemId) {
      toggleWindow();
    } else {
      let its = items.map(item => {
        if (itemId === item.id) {
          return {
            ...item,
            showBubble: !item.showBubble
          }
        } else {
          return {
            ...item,
            showBubble: false
          }
        }
      })
      setItems(its)
    }
  }

  const setItem = (id: number, key: any, value: any) => {
    let its = items.map(item => {
      if (id === item.id) {
        return {
          ...item,
          [key]: value
        }
      } else {
        return item
      }
    })
    setItems(its)
  }

  const play = (src: string) => {
    
  }

  return (
    <div className="toolbar">
      {
        items.map((item, index) => {
          return (
            <div key={index}
              className="toolbar-item"
              style={{ background: `no-repeat center/60% url(${item.icon})` }}
              onClick={() => click(item.id)}
            >
              {
                item.list && item.showBubble ? <div className="toolbar-item-bubble">
                  {
                    item.list.map((i:any, ind: number) => {
                      return <div key={ind} className="toolbar-item-bubble-line" onClick={() => play(i.src)}>{i.name}</div>
                    })
                  }
                </div> : null
              }
            </div>
          )
        })
      }
    </div>
  )
}