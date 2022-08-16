import React, { useState } from "react";
import { Fastboard, FastboardApp, useFastboard } from "@netless/fastboard-react";
import { get_uid } from "../../utils/common";
import EventEmitter from "events"

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
    // const ee = new EventEmitter();
    // ee.on("insertMediaInner", (src) => {
    //   // app?.insertMedia()
    //   console.log(`========= ${src} ========`)
    // })
   
  }
  return (
    app ? <Fastboard app={app} /> : null
  );
}