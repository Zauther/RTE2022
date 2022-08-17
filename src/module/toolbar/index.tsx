import React, { useEffect, useState } from "react";
import Play from "../../service/play";
import { TYPES } from "../window";
import { event } from "../../index";
import "./index.less";

export default function Toolbar(props: any) {
  const { setShowWindow } = props;
  const [items, setItems] = useState<Array<any>>([]);
  const [plays, setPlays] = useState<any>(null);
  const [innerShowWindow, setInnerShowWindow] = useState<any>({
    show: false,
    name: "",
    id: 0
  });

  useEffect(() => {
    const plays = Play.getPlayInfo(1);
    setPlays(plays);
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
    ])
  }, [])

  const click = (itemId: number) => {
    let its = [];
    if (itemId === 0) {
      event.emit('window', {
        type: TYPES.PLAY,
        data: plays.roles[0].play,
      });
      // 打开关闭自己的窗口
      if (innerShowWindow.id === itemId) {
        setShowWindow(!innerShowWindow.show);
        setInnerShowWindow({
          show: !innerShowWindow.show,
          id: itemId
        });
      } else {
        setShowWindow(true)
        setInnerShowWindow({
          show: true,
          id: itemId
        });
      }
      // 关闭其他弹窗
      its = items.map(item => {
        return {
          ...item,
          showBubble: false
        }
      })
    } else {
      setShowWindow(false);
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

  const clickItem = (e: any, type: string, data: any) => {
    // 防止事件捕获触发click调用
    e.stopPropagation();
    
    if (type === "media") {
      window?.app?.insertMedia("mic", data.src);
    } else {
      event.emit('window', {
        type: TYPES.CLUE,
        data: data?.data || [],
      });
      if (innerShowWindow.id === 1 && data.name === innerShowWindow.name) {
        setShowWindow(!innerShowWindow.show);
        setInnerShowWindow({
          show: !innerShowWindow.show,
          name: data.name,
          id: 1
        });
      } else {
        setShowWindow(true);
        setInnerShowWindow({
          show: true,
          name: data.name,
          id: 1
        });
      }
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
                      return (
                        <div key={ind} className="toolbar-item-bubble-line" 
                          onClick={(e) => clickItem(e, i?.src ? "media":"clue", i)}>
                          {i.name}
                        </div>)
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