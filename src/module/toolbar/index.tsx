import React, { useEffect, useState } from "react";
import Play from "../../service/play";
import { TYPES } from "../window";
import { event } from "../../index";
import clipboard from "clipboard-js";
import { MyContext } from "../../index";

import RoomIcon from "../../assets/room.png";
import PlayIcon from "../../assets/play.png";
import ClueIcon from "../../assets/clue.png";
import AudioIcon from "../../assets/audio.png";
import VoiceIcon from "../../assets/voice.png";

import "./index.less";

export default function Toolbar(props: any) {
  const { roomId } = props;
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
        icon: RoomIcon,
        showBubble: false,
        list: [
          {
            id: 0,
            name: "复制加入房间链接"
          }
        ]
      },
      {
        id: 1,
        icon: PlayIcon,
        showBubble: false,
      },
      {
        id: 2,
        icon: ClueIcon,
        showBubble: false,
        list: plays.clues
      },
      {
        id: 3,
        icon: VoiceIcon,
        showBubble: false,
        list: plays.audios
      },
      {
        id: 4,
        icon: AudioIcon,
        showBubble: false,
        list: plays.videos
      },
    ])
  }, [])

  const click = (itemId: number) => {
    const curUser = window.userManager.currentUser;

    let its = [];
    if (itemId === 1) {
      let windowData: any = {
        show: true,
        type: TYPES.PLAY,
        data: plays.roles[curUser?.roleId as number].play,
      }
      // 打开关闭自己的窗口
      if (innerShowWindow.id === itemId) {
        event.emit('window', {
          ...windowData,
          show: !innerShowWindow.show
        });
        setInnerShowWindow({
          show: !innerShowWindow.show,
          id: itemId
        });
      } else {
        event.emit('window', {
          ...windowData,
          show: true
        });
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
      event.emit('window', {
        data: [],
        type: -1,
        show: false
      });
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
    console.log(type, " ======== type", data, " ======== data")
    if (type === "media") {
      window?.fastboardApp?.insertMedia("mic", data.src);
    } else {
      let windowData: any = {
        show: true,
        type: TYPES.CLUE,
        data: data?.data || [],
      }
      if (innerShowWindow.id === 2 && data.name === innerShowWindow.name) {
        event.emit('window',{
          ...windowData,
          show: !innerShowWindow.show
        });
        setInnerShowWindow({
          show: !innerShowWindow.show,
          name: data.name,
          id: 2
        });
      } else {
        event.emit('window',{
          ...windowData,
          show: true
        });
        setInnerShowWindow({
          show: true,
          name: data.name,
          id: 2
        });
      }
    }
  }

  const copyRoomLink = () => {
    clipboard.copy(`${window.location.href}&roomId=${roomId}`)
  }

  return (
    <div className="toolbar">
      <MyContext.Consumer>
        {
          value => {
            const list = value.isAdmin ? items : items.slice(2);
            console.log(`====MyContext=====${JSON.stringify(value)}`)
            return list.map((item, index) => {
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
                              onClick={(e) => item.id === 0 ? copyRoomLink() : clickItem(e, i?.src ? "media":"clue", i)}>
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
        }
      </MyContext.Consumer>
    </div>
  )
}