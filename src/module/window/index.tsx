import React from "react";
import Play from "../play/play";
import "./index.less";

export default function Window(props: any) {

  return (
    props.show ? <div className="window">
      <Play />
    </div> : null
  )
}