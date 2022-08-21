import { EventEmitter } from "events";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './index.less';
import { registering } from "./module/apps";
import Room, { Role } from "./service/room";
import { search_parse } from "./utils/common";

import Board from "./module/board";
import Roles from "./module/roles";
import Toolbar from "./module/toolbar";
import Window from "./module/window";
import { UserManager } from "./users/UserManager";

export const event = new EventEmitter();

function App() {
  registering();
  const [show, setShow] = useState<boolean>(false);
  const [options, setOptions] = useState<{ uuid: string, roomToken: string } | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);


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
      window.userManager.isAdmin = true;
      window.userManager.admin = window.userManager.currentUser;
      console.log(`=====room admin======`);
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

  return (
    <div className="app">
      <Board uuid={options?.uuid} roomToken={options?.roomToken} />
      <Roles />
      <Toolbar setShowWindow={(show: boolean) => setShow(show)} roomId={roomId} />
      <Window show={show} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
