import React, { useEffect, useState } from "react";
import { event } from "../../index";
import Play from "../play/play";
// import { addCluesListener, dispatchClues } from "../../events/EventsManager";
import "./index.less";

export const TYPES = {
  PLAY: 1, // 剧本
  CLUE: 2, // 线索卡
}

export default function Window(props: any) {
  const [data, setData] = useState<any>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // 更新window显示内容
  useEffect(() => {
    event.on("room", (room: any) => {
      room.addMagixEventListener("sendClues", (res: any) => {
        const { payload } = res;
        console.log("listen to sendClues: ", payload)
        if (!payload?.isAdmin) {
          setData({
            ...data,
            ...payload
          })
        }
      });
    });

    event.on("window", ((res: any) => {
      console.log("window ======= ", res)
      if (res?.isAdmin && res?.type === TYPES.CLUE) {
        console.log("set Admin clue ======= ", (res?.data || []).map((r: any) => {
          return {
            ...r,
            checked: false
          }
        }))
        setData({
          ...res,
          data: (res?.data || []).map((r: any) => {
            return {
              ...r,
              checked: false
            }
          })
        })
      } else if (res?.type === TYPES.PLAY) {
        setData(res);
      }
    }))
  }, [])

  // 全选更新data
  useEffect(() => {
    if (selectAll) {
      setData({
        ...data,
        data: (data?.data || []).map((r: any) => {
          return {
            ...r,
            checked: true
          }
        })
      })
    } else {
      setData({
        ...data,
        data: (data?.data || []).map((r: any) => {
          return {
            ...r,
            checked: false
          }
        })
      })
    }
  }, [selectAll])

  useEffect(() => {
    if (data?.isAdmin && data?.type === TYPES.CLUE) {
      const clues = (data?.data || []).filter((clue: any) => clue.checked);
      window.room.dispatchMagixEvent("sendClues", {
        isAdmin: false,
        data: clues
      });
    }
  }, [data])

  const shareClue = (clue: any) => {
    if (data?.isAdmin) {
      // 设置勾选状态
      setData({
        ...data,
        data: (data?.data || []).map((r: any) => {
          if (clue.name === r.name) {
            return {
              ...r,
              checked: !r.checked
            }
          } else {
            return r
          }
        })
      })
    }
    
  }
  
  return (
    data?.show && data?.type ? <div className="window">
      {
        data.type === TYPES.PLAY ? <Play url={data?.data || ""} /> : <div>
          {
            data?.isAdmin ? 
              <>
                <span className={`check-box ${selectAll ? 'check-box-checked' : ''}`} onClick={() => setSelectAll(!selectAll)}></span>
                <span>全选</span>
              </> : null
          }
          {
            (data?.data || []).map((item: any, index: number) => {
              return (
                <div key={index}>
                  <img className="clue" src={item.src} />
                  <div className="info">
                    {
                      data?.isAdmin ? <span className={`check-box ${item.checked ? 'check-box-checked' : ''}`} onClick={() => shareClue(item)}></span> : null
                    }
                    <span>{item.name}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      }
    </div> : null
  )
}