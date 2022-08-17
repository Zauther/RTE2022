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
  const { show } = props;

  useEffect(() => {
    event.on("window", ((res: any) => {
      console.log("window ======= ", res, show)
      setData(res);
    }))
  }, [])
  
  return (
    show ? <div className="window">
      {
        data.type === TYPES.PLAY ? <Play url={data?.data || ""} /> : <div>
        {
          (data?.data || []).map((item: any, index: number) => {
            return (
              <div key={index}>
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