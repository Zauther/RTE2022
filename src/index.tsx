import { Fastboard, useFastboard } from "@netless/fastboard-react";
import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import './index.less';
import { registering } from "./module/apps";
import { get_uid } from "./utils/common";

import Roles from "./module/roles";
import Toolbar from "./module/toolbar";
import Window from "./module/window";

import { newRoom } from "./utils/NetApi";




function App() {

  registering();


  const uuid1 = "81f025401ae711ed857671280b14c673";
  const uuid2 = "a6da52d6-d4d3-42bf-a7f9-47f544865160";

  var uuid = "ca6072e00b6e11ed8f73c3ac3bcce546";
  uuid = "c44631301ae911ed857671280b14c673";
  // const roomToken =  getRoomTokenOne(uuid);
  const roomToken = "NETLESSROOM_YWs9WlBKVzgtZ1luWnRvZlhVeiZleHBpcmVBdD0xNjYwMzg2Mjg0NTExJm5vbmNlPTE2NjAzODI2ODQ1MTEwMCZyb2xlPTAmc2lnPTRjZTYzNzM1Y2IwMDUyODUwMDVhODYwMzYzOGNiNDAyN2YwNWQ5MDEyMmY5NWI1ZGNlNTZlNzE4OTY4ZjRlYWQmdXVpZD1jNDQ2MzEzMDFhZTkxMWVkODU3NjcxMjgwYjE0YzY3Mw";
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
    // joinRoom: {
    //   uid: get_uid(),
    //   uuid: uuid,
    //   roomToken: roomToken
    // },
  }));

  // newRoom().then((res)=>{
  //   console.log(`==newRoom=${JSON.stringify(res)}`)
  // });
  // getRoomsInfo().then((res)=>{
  //   console.log(`rooms=${res}`)
  // })

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
