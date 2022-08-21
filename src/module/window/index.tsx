import React, { useEffect, useState } from "react";
import Play from "../play/play";
import "./index.less";
import { event } from "../../index";

export const TYPES = {
  PLAY: 1, // 剧本
  CLUE: 2, // 线索卡
}

export default function Window(props: any) {
  const [data, setData] = useState<any>(null);
  const curUser = window.userManager.currentUser;

  useEffect(() => {
    event.on("window", ((res: any) => {
      setData(res);
    }))
  }, [])

  const shareClue = () => {

  }
  
  return (
    data?.show && data?.type ? <div className="window">
      {
        data.type === TYPES.PLAY ? <Play url={data?.data || ""} /> : <div>
        {
          (data?.data || []).map((item: any, index: number) => {
            return (
              <div key={index}>
                <div className="hahah"></div>
                <img className="clue" src={item.src} />
                <span>{item.name}</span>
              </div>
            )
          })
        }
      </div>
      }
    </div> : null
  )
}