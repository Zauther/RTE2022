import React, { useEffect, useState } from "react";
import Play from "../play/play";
import "./index.less";
import { event } from "../../index";

export default function Window(props: any) {
  const [list, setList] = useState<Array<any>>([]);

  useEffect(() => {
    event.on("setClues", ((clues: Array<any>) => {
      setList(clues);
    }))
  }, [])
  
  return (
    props.show ? <div className="window">
      {
        list && list?.length > 0 ? <div>
          {
            list.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <img className="clue" src={item.src} />
                  <span>{item.name}</span>
                </div>
              )
            })
          }
        </div> : <Play />
      }
    </div> : null
  )
}