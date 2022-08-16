import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './index.less';
import { registering } from "./module/apps";
import { get_uid, search_parse } from "./utils/common";
import { Role, newRoom, joinRoom } from "./utils/NetApi";
import { EventEmitter } from "events";

import Roles from "./module/roles";
import Toolbar from "./module/toolbar";
import Window from "./module/window";
import Board from "./module/board";
import { UserManager } from "./users/UserManager";

export const event = new EventEmitter();

function App() {
  registering();
  const [show, setShow] = useState<boolean>(false);
  const [options, setOptions] = useState<{ uuid: string, roomToken: string } | null>(null);

  useEffect(() => {
    window.userManager = new UserManager();
    if (!/uuid/.test(window.location.search)) { // 如果没有uuid则生成一个作为房间
      newRoom(Role.Admin).then((res: any) => {
        const url = new URL(window.location.href);
        url.searchParams.set('uuid', res.uuid);
        window.alert(`已创建房间，可通过链接邀请玩家加入：${url}`);
        setOptions({
          uuid: res.uuid,
          roomToken: res.roomToken
        });
        console.log(`isadmin===${JSON.stringify(window.userManager)}`)
        window.userManager.isAdmin = true;
        window.userManager.admin = window.userManager.currentUser;
      });
    } else { // 如果有uuid则加入uuid对应的房间
      const search_obj = search_parse();
      const uuid = search_obj['uuid'];
      joinRoom(Role.Writer, uuid).then((res: any) => {
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
      <Toolbar toggleWindow={() => setShow(!show)} />
      <Window show={show} />
    </div>
  );

}

ReactDOM.render(<App />, document.getElementById("app"));
