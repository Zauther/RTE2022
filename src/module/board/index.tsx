import { Fastboard, FastboardApp, FastboardOptions } from "@netless/fastboard-react";
import { WindowManager } from "@netless/window-manager";
import React, { useEffect, useRef, useState } from "react";
import { contentModeScale, DefaultHotKeys, JoinRoomParams, ReplayRoomParams, WhiteWebSdk } from "white-web-sdk";

import { SyncedStorePlugin } from "@netless/synced-store";
import { get_uid } from "../../utils/common";
import { User } from "../../users/UserManager";
import { addUserInfoListener, dispatchUserInfo } from "../../events/EventsManager";
import { useFastboard } from "./fastboardutils";
// import { WindowManager } from "@netless/window-manager"
// import { SyncedStorePlugin } from "@netless/synced-store"




export default function Board(props: any) {

  let app: FastboardApp | null = null;
  if (props.uuid && props.roomToken) {
    // const whiteWebSdk = new WhiteWebSdk({
    //   appIdentifier: "ss4WoMf_EeqfCXcv33LmiA/izfIC88inXYJKw",
    //   region: "cn-hz",
    // });
    // const joinRoomParams = {
    //   uid: get_uid(),
    //   uuid: props.uuid,
    //   roomToken: props.roomToken
    // };
    // whiteWebSdk.joinRoom(joinRoomParams).then(function (room) {

    //   room.bindHtmlElement(document.getElementById("whiteboard"));
    //   // 监听 Greetings 事件
    //   // room.addMagixEventListener("Greetings", onReceiveGreetings);

    //   // 监听 Greetings 事件
    //   room.addMagixEventListener("Greetings", (eventObject) => {
    //     // 当收到 Greetings 事件时，在控制台输出事件的内容
    //     console.log(eventObject.payload);
    //   });
    //   room.createInvisiblePlugin

    //   // 发送 Greetings 事件
    //   room.dispatchMagixEvent("Greetings", "Hello, how do you do");

    //   // room.createInvisiblePlugin(WindowManager);
    //   // room.createInvisiblePlugin(SyncedStorePlugin);

    //   window.room = room;

    // }).catch(function (err) {

    //   console.error(err);
    // });


    //  ,
    //  joinRoom: {
    //    uid: unique_id,
    //    uuid: import.meta.env.VITE_ROOM_UUID,
    //    roomToken: import.meta.env.VITE_ROOM_TOKEN,
    //  },
    // createFastboard({
    //   sdkConfig: {
    //     appIdentifier: "ss4WoMf_EeqfCXcv33LmiA/izfIC88inXYJKw",
    //     region: "cn-hz",
    //   },
    //   joinRoom: {
    //     uid: get_uid(),
    //     uuid: props.uuid,
    //     roomToken: props.roomToken
    //   },
    // }).then((app) => {
    //   setApp(app);
    //   window.fastboardApp = app;
    // })



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

    window.fastboardApp = app;

    console.log(`=========${JSON.stringify(window.userManager.players)}`)


    // const ee = new EventEmitter();
    // ee.on("insertMediaInner", (src) => {
    //   // app?.insertMedia()
    //   console.log(`========= ${src} ========`)
    // })
  }
  return (
    app ? <Fastboard app={app} /> : null
    // <div>
    //   <div id="whiteboard" className="fastboard-react-div"></div>
    //   <div id="toolbar" className="fastboard-react-toolbar"></div>
    // </div>
  );
}

