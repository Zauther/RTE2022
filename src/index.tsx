import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import './index.less';
import { registering } from "./module/apps";
import { get_uid, search_parse } from "./utils/common";

import Roles from "./module/roles";
import Toolbar from "./module/toolbar";
import Window from "./module/window";
import Board from "./module/board";

import { Role, newRoom, joinRoom } from "./utils/NetApi";

export default function useMethods<T extends Record<string, (...args: any[]) => any>>(methods: T) {
  const { current } = React.useRef({
    methods,
    func: undefined as T | undefined,
  });
  current.methods = methods;

  // 只初始化一次
  if (!current.func) {
    const func = Object.create(null);
    Object.keys(methods).forEach((key) => {
      // 包裹 function 转发调用最新的 methods
      func[key] = (...args: unknown[]) => current.methods[key].call(current.methods, ...args);
    });
    // 返回给使用方的变量
    current.func = func;
  }

  return current.func as T;
}


function App() {
  registering();
  const [show, setShow] = useState(false);
  const {toggleWindow} = useMethods({
    toggleWindow(){
      setShow(!show);
    }
    // console.log("toggleWindow inner0======= ", show)
    // setShow(!show);
    // console.log("toggleWindow inner1======= ", show)
  });

  // const toggleWindow = useCallback(() => {
  //   setShow(!show);
  // }, [show]);



  
  console.log("show ======= ", show)
  const [options, setOptions] = useState<{uuid: string, roomToken:string} | null>(null);
  

  // 如果没有room_token则生成一个作为房间
  if (!/uuid/.test(window.location.search)) {
    // newRoom(Role.Admin).then((res: any)=>{
    //   // window.alert(`已创建房间，可通过链接邀请玩家加入：${window.location.href + "&uuid=" + res.uuid}`);
    //   setOptions({
    //     uuid: res.uuid,
    //     roomToken: res.roomToken
    //   });
    // });
  } else {
    const search_obj = search_parse();
    const uuid = search_obj['uuid'];
    joinRoom(Role.Writer, uuid).then((res: any) => {
      setOptions({
        uuid: res.uuid,
        roomToken: res.roomToken
      });
    });
  }

  return (
    <div className="app">
      <Board uuid={options?.uuid} roomToken={options?.roomToken} />
      <Roles />
      <Toolbar toggleWindow={toggleWindow} />
      <Window show={show} />
    </div>
  );
  
}

ReactDOM.render(<App />, document.getElementById("app"));
