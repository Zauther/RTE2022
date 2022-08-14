import React from "react";
import { Fastboard, useFastboard } from "@netless/fastboard-react";
import { get_uid } from "../../utils/common";

export default function Board(props: any) {
  let app = null;
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
  }
  return (
    app ? <Fastboard app={app} /> : null
  );
}