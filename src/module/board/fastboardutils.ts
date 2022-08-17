import { Fastboard, FastboardApp, FastboardOptions } from "@netless/fastboard-react";
import { WindowManager } from "@netless/window-manager";
import React, { useEffect, useRef, useState } from "react";
import { contentModeScale, DefaultHotKeys, JoinRoomParams, ReplayRoomParams, WhiteWebSdk } from "white-web-sdk";

import { SyncedStorePlugin } from "@netless/synced-store";
import { get_uid } from "../../utils/common";
import { User } from "../../users/UserManager";
import { addUserInfoListener, dispatchUserInfo } from "../../events/EventsManager";

const register = WindowManager.register.bind(WindowManager);

function ensure_official_plugins<T extends JoinRoomParams | ReplayRoomParams>(joinRoom: T): T {
  const plugins = new Set(joinRoom.invisiblePlugins || []);
  plugins.add(WindowManager);
  plugins.add(SyncedStorePlugin);
  joinRoom.invisiblePlugins = [...plugins];
  return joinRoom;
}

export function useFastboard(config: () => FastboardOptions): FastboardApp | null {
  const unmountRef = useRef(false);
  const [fastboard, setFastboard] = useState<FastboardApp | null>(null);

  useEffect(() => {
    let fastboard: FastboardApp | null = null;

    createFastboard(config()).then(app => {
      if (!unmountRef.current) {
        setFastboard((fastboard = app));
      } else {
        app.destroy();
      }
    });

    return () => {
      unmountRef.current = true;
      fastboard && fastboard.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return fastboard;
}

export async function createFastboard<TEventData = any>({
  sdkConfig,
  joinRoom: { callbacks, ...joinRoomParams },
  managerConfig,
  netlessApps,
}: FastboardOptions) {
  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    useMobXState: true,
  });

  const hotKeys = joinRoomParams.hotKeys || {
    ...DefaultHotKeys,
    changeToSelector: "s",
    changeToLaserPointer: "z",
    changeToPencil: "p",
    changeToRectangle: "r",
    changeToEllipse: "c",
    changeToEraser: "e",
    changeToText: "t",
    changeToStraight: "l",
    changeToArrow: "a",
    changeToHand: "h",
  };

  if (netlessApps) {
    netlessApps.forEach(app => {
      register({ kind: app.kind, src: app });
    });
  }

  const room = await sdk.joinRoom(
    {
      floatBar: true,
      hotKeys,
      ...ensure_official_plugins(joinRoomParams),
      useMultiViews: true,
      disableNewPencil: false,
      disableMagixEventDispatchLimit: true,
    },
    callbacks
  );

  window.room = room;

  room.addMagixEventListener("currentUser",(msd)=>{
    console.log(`========${JSON.stringify(msd)}=========`);
  });

  addUserInfoListener();

  if (!window.userManager.isAdmin) {
    const currentUser = new User(window.room.uid as string, "", "", false);
    window.userManager.currentUser = currentUser;
    window.userManager.setUser(currentUser);
    dispatchUserInfo(currentUser);
  }

  

  const syncedStore = await SyncedStorePlugin.init<TEventData>(room);

  const manager = await WindowManager.mount({
    cursor: true,
    ...managerConfig,
    room,
  });

  manager.mainView.setCameraBound({
    minContentMode: contentModeScale(0.3),
    maxContentMode: contentModeScale(3),
  });

  return new FastboardApp<TEventData>(sdk, room, manager, hotKeys, syncedStore);
}
