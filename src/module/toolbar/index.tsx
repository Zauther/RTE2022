import React, { useEffect, useState } from "react";
import Play from "../../service/play";
import "./index.less";

export default function Toolbar(props: any) {
  const { toggleWindow } = props;
  const [items, setItems] = useState<Array<any>>([]);

  useEffect(() => {
    const plays = Play.getPlayInfo(1);
    setItems([
      {
        id: 0,
        icon: "../../../assets/play.png",
        showBubble: false,
      },
      {
        id: 1,
        icon: "../../../assets/voice.png",
        showBubble: false,
        list: plays.audios
      },
      {
        id: 2,
        icon: "../../../assets/audio.png",
        showBubble: false,
      },
      {
        id: 3,
        icon: "../../../assets/clue.png",
        showBubble: false,
        list: plays.clues
      }
    ])
  }, [])

  const click = (itemId: number) => {
    let its = [];
    if (!itemId) {
      toggleWindow();
      its = items.map(item => {
        return {
          ...item,
          showBubble: false
        }
      })
      console.log("its ======= ", its)
    } else {
      its = items.map(item => {
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