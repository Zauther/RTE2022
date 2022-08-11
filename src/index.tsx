import React from "react";
import ReactDOM from "react-dom";
import { useFastboard, Fastboard, register, apps } from "@netless/fastboard-react";
import Slide from "@netless/app-slide";
import { get_uid } from "./utils/common";
import './index.less';

import Roles from "./module/roles";


function App() {
  register({
    kind: "Slide",
    appOptions: {
      // 打开这个选项显示 debug 工具栏
      debug: false,
    },
    src: Slide,
  });
  apps.clear()

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
