import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { registering } from "../../module/apps";
import './app.less';
import { get_uid, search_parse } from "../../utils/common";


import Board from "../../module/board";
import Roles from "../../module/roles";
import Toolbar from "../../module/toolbar";
import Window from "../../module/window";
import { joinRoom, newRoom, Role } from "../../utils/NetApi";

function App() {
    let { uuid } = useParams();

    registering();

    const [options, setOptions] = useState<{ uuid: string, roomToken: string } | null>(null);

    const [show, setShow] = useState<boolean>(false);
    // console.log(`uuid=${uuid},uid =${"uid"} roomToken=${location.state.roomToken}`);
    useEffect(() => {
        // if (/uid/.test(window.location.search)) { // 如果没有uuid则生成一个作为房间
        const search_obj = search_parse();
        //       const uuid = search_obj['uuid'];
        joinRoom(Role.Writer, uuid as string).then((res: any) => {
            setOptions({
                uuid: res.uuid,
                roomToken: res.roomToken
            });
        });
        // }

    });





    return (
        <div className="app">
            <Board uuid={uuid} roomToken={options?.roomToken} />
            {/* <Roles/> */}
            <Toolbar toggleWindow={() => setShow(!show)} />
            <Window show={show} />
        </div>
    );

}

export { App };
