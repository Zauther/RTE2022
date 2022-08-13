import { Fastboard, useFastboard } from "@netless/fastboard-react";
import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import './index.less';
import { registering } from "./module/apps";
import { get_uid } from "./utils/common";

import Roles from "./module/roles";
import Toolbar from "./module/toolbar";
import Window from "./module/window";





function App() {

  registering();


  const uuid1 = "a14fc2c2-07e0-4943-b61b-e98c108608a2";
  const uuid2 = "a6da52d6-d4d3-42bf-a7f9-47f544865160";

  const uuid = "ca6072e00b6e11ed8f73c3ac3bcce546";
  // const roomToken =  getRoomTokenOne(uuid);
  const roomToken = "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNjYxMjcyNTk5MDU3Jm5vbmNlPWNhODdmODEwLTBiNmUtMTFlZC04OWQxLTNmZjQ1Mzc3YzYxNyZyb2xlPTEmc2lnPTM0YzkzNzRlMzVjNWI2YzBiZGViMzA3M2JhMTRjNGM1YzY5MzNmMWZjOTI0MzM3ZWEyZTE2ZWMzMzQ3YTE2YmYmdXVpZD1jYTYwNzJlMDBiNmUxMWVkOGY3M2MzYWMzYmNjZTU0Ng";
  const app = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: "ss4WoMf_EeqfCXcv33LmiA/izfIC88inXYJKw",
      region: "cn-hz",
    },
    // joinRoom: {
    //   uid: get_uid(),
    //   uuid: "ca6072e00b6e11ed8f73c3ac3bcce546",
    //   roomToken: "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNjYxMjcyNTk5MDU3Jm5vbmNlPWNhODdmODEwLTBiNmUtMTFlZC04OWQxLTNmZjQ1Mzc3YzYxNyZyb2xlPTEmc2lnPTM0YzkzNzRlMzVjNWI2YzBiZGViMzA3M2JhMTRjNGM1YzY5MzNmMWZjOTI0MzM3ZWEyZTE2ZWMzMzQ3YTE2YmYmdXVpZD1jYTYwNzJlMDBiNmUxMWVkOGY3M2MzYWMzYmNjZTU0Ng"
    // },
    joinRoom: {
      uid: get_uid(),
      uuid: uuid,
      roomToken: roomToken
    },
  }));


  const [show, setShow] = useState(false);
  const toggleWindow = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <div className="app">
      <Fastboard app={app} />
      <Roles />
      <Toolbar toggleWindow={toggleWindow} />
      <Window show={show} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
