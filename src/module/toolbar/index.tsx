import EventEmitter from "events";
import React, { useEffect, useState } from "react";
import Play from "../../service/play";
import "./index.less";
import { event } from "../../index";
import { User } from "../../users/UserManager";

export default function Toolbar(props: any) {
  const { toggleWindow } = props;
  const [items, setItems] = useState<Array<any>>([]);
  const [people, setPeople] = useState<Array<User>>([]);
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
        icon: "../../../assets/clue.png",
        showBubble: false,
        list: plays.clues
      },
      {
        id: 2,
        icon: "../../../assets/voice.png",
        showBubble: false,
        list: plays.audios
      },
      {
        id: 3,
        icon: "../../../assets/audio.png",
        showBubble: false,
        list: plays.videos
      },
      {
        id: 4,
        icon: "../../../assets/people.png",
        showBubble: false,
        list: []
      },
    ])
  }, [])

  const click = (itemId: number) => {
    let its = [];
    if (itemId === 0) {
      toggleWindow();
      its = items.map(item => {
        return {
          ...item,
          showBubble: false
        }
      })
      console.log("its ======= ", its)
    } else if (itemId == 4) {
      console.log(`===== players ======${JSON.stringify(window.userManager.isAdmin) }`)

     console.log(`===== players ======${JSON.stringify(window.userManager.players) }`)

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

  const clickItem = (type: string, data: any) => {
    if (type === "media") {
      window?.app?.insertMedia("mic", data);
    } else {
      event.emit('setClues', data);
      toggleWindow();
    }
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
                    item.list.map((i: any, ind: number) => {
                      return <div key={ind} className="toolbar-item-bubble-line" onClick={() => clickItem(i?.src ? "media":"clue", i?.src ? i.src: i.data)}>{i.name}</div>
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