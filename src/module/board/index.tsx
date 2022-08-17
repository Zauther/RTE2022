import React from "react";
import { Fastboard, FastboardApp, useFastboard } from "@netless/fastboard-react";
import { get_uid } from "../../utils/common";
import "./index.less";

export default function Board(props: any) {
  let app: FastboardApp | null = null;
  
  if (props.uuid && props.roomToken) {
    app = useFastboard(() => ({
      sdkConfig: {
        appIdentifier: "ss4WoMf_EeqfCXcv33LmiA/izfIC88inXYJKw",
        region: "cn-hz",
      },
      joinRoom: {
        uid: get_uid(),
        uuid: props.uuid,
        roomToken: props.roomToken
      },
    }));
    window.app = app;
  }

  return (
    app ? <div className="board"><Fastboard app={app} /></div> : null
  );
}