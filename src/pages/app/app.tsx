import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { registering } from "../../module/apps";
import './app.less';
import { get_uid, search_parse,search_roomId } from "../../utils/common";


import Board from "../../module/board";
import Roles from "../../module/roles";
import Toolbar from "../../module/toolbar";
import Window from "../../module/window";
import { joinRoom, newRoom, Role } from "../../utils/NetApi";

function App() {
    let { uuid } = useParams();

    useEffect(() => {
        // if (/uid/.test(window.location.search)) { // 如果没有uuid则生成一个作为房间
        const roomId = search_roomId();
        console.log(`uuid=${roomId}`);
        //       const uuid = search_obj['uuid'];
        joinRoom(Role.Writer, roomId as string).then((res: any) => {
            setOptions({
                uuid: res.uuid,
                roomToken: res.roomToken
            });
        });
        // }

    }, []);
    registering();

    const [options, setOptions] = useState<{ uuid: string, roomToken: string } | null>(null);

    const [show, setShow] = useState<boolean>(false);
    // console.log(`uuid=${uuid},uid =${"uid"} roomToken=${location.state.roomToken}`);






    return (
        <div className="app">
            <Board uuid={options?.uuid} roomToken={options?.roomToken} />
            {/* <Roles/> */}
            <Toolbar toggleWindow={() => setShow(!show)} />
            <Window show={show} />
        </div>
    );

}

export { App };
