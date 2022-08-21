import { EventEmitter } from "events";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './index.less';
import { registering } from "./module/apps";
import Room, { Role, RoomRolesInfo } from "./service/room";
import { search_parse } from "./utils/common";

import Board from "./module/board";
import { FastboardAndRoom } from "./module/board/fastboardutils";
import Roles from "./module/roles";
import Toolbar from "./module/toolbar";
import Window from "./module/window";
import RoomManager from "./service/room";
import GlobalContext from "./state/Global";
import { User, UserManager } from "./users/UserManager";

export const event = new EventEmitter();
export const MyContext = React.createContext(new GlobalContext());
function App() {
  registering();
  const [options, setOptions] = useState<{ uuid: string, roomToken: string } | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [userManager, setUserManager] = useState<UserManager>(new UserManager());
  const [globalContext, setGlobalContext] = useState<GlobalContext>(new GlobalContext());


  useEffect(() => {
    window.userManager = new UserManager();
    if (!/roomId/.test(window.location.search)) { // 如果没有uuid则生成一个作为房间
      Room.createRoom(Role.Admin).then((res: any) => {
        setRoomId(res.uuid);
        setOptions({
          uuid: res.uuid,
          roomToken: res.roomToken
        });
      });
      globalContext.isAdmin = true;
      setGlobalContext(globalContext);

      // window.userManager.isAdmin = true;
      // window.userManager.admin = window.userManager.currentUser;

      // userManager.isAdmin = true;
      // setUserManager(userManager);

      console.log(`=====room admin======${JSON.stringify(globalContext)}`);
    } else { // 如果有uuid则加入uuid对应的房间
      console.log(`=====room players======`);
      const search_obj = search_parse();
      const uuid = search_obj['roomId'];
      Room.joinRoom(Role.Writer, uuid).then((res: any) => {
        setOptions({
          uuid: res.uuid,
          roomToken: res.roomToken
        });
      });
    }
  }, [])


  const configRoom = (fastboardAndRoom: FastboardAndRoom) => {
    if (fastboardAndRoom && fastboardAndRoom.room) {

      // RoomManager.bindRole()
      const currentUid = fastboardAndRoom.room.uid;

      RoomManager.queryRolesByRoomId(fastboardAndRoom.room.uuid as string).then((roomRolesInfos: Array<RoomRolesInfo>) => {
        console.log(`===queryRolesByRoomId===${JSON.stringify(roomRolesInfos)}`)
        roomRolesInfos.forEach((ri) => {

          if (ri.uid == currentUid) {
            let user = globalContext.currentUser;
            if (user == undefined) {
              user = new User(ri.uid, "", "", +ri.roleId, ri.isRoomAdmin);
            }
            globalContext.currentUser = user;
            globalContext.isAdmin = ri.isRoomAdmin;

          }
          let user = new User(ri.uid, "", "", +ri.roleId, ri.isRoomAdmin);
          globalContext.setPlayer(user);
          setGlobalContext(globalContext);
        })

      })
    }
  }

  return (
    <MyContext.Provider value={globalContext}>
      <div className="app">
        <Board uuid={options?.uuid} roomToken={options?.roomToken}
          updateFastboardAndRoom={configRoom}
        />
        <Roles />
        <Toolbar roomId={roomId} />
        <Window />
      </div>
    </MyContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
