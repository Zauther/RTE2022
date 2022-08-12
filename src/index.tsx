import React from "react";
import ReactDOM from "react-dom";
import { useFastboard, Fastboard, register, apps } from "@netless/fastboard-react";
import Slide from "@netless/app-slide";
import Play from "./module/play";
import { get_uid } from "./utils/common";
import './index.less';

import Roles from "./module/roles";


function App() {
  register({
    kind: "Play",
    appOptions: {
      // 打开这个选项显示 debug 工具栏
      debug: false,
    },
    src: Play,
  });
  apps.clear()
  apps.push(
    {
      kind: "Play",
      label: "剧本",
      icon: "../assets/play.png",
      onClick: (fastboard: any) => {
        fastboard.manager.addApp({
          kind: "Play",
          // options: { 
          //   scenePath: `/ppt/${1234567}`,
          //   title: "剧本" 
          // },
          // attributes: {
          //   taskId: "1234567", // [2]
          //   url: "https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF", // [3]
          // },
        });
      },
    }
  );

  const app = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: "ss4WoMf_EeqfCXcv33LmiA/izfIC88inXYJKw",
      region: "cn-hz",
    },
    joinRoom: {
      uid: get_uid(),
      uuid: "ca6072e00b6e11ed8f73c3ac3bcce546",
      roomToken: "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNjYxMjcyNTk5MDU3Jm5vbmNlPWNhODdmODEwLTBiNmUtMTFlZC04OWQxLTNmZjQ1Mzc3YzYxNyZyb2xlPTEmc2lnPTM0YzkzNzRlMzVjNWI2YzBiZGViMzA3M2JhMTRjNGM1YzY5MzNmMWZjOTI0MzM3ZWEyZTE2ZWMzMzQ3YTE2YmYmdXVpZD1jYTYwNzJlMDBiNmUxMWVkOGY3M2MzYWMzYmNjZTU0Ng"
    },
  }));
  

  return (
    <div className="app">
      <Fastboard app={app} />
      <Roles />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
