import React, { useState } from "react";
import { joinRoom, newRoom, Role } from "../../utils/NetApi";
import "./room.less";
import { useNavigate } from 'react-router-dom';


function Rooms() {
    const navigate = useNavigate();

    const [uuid, setUuid] = useState("");
    const [uid, setUid] = useState("");

    const [roomToken, setRoomToken] = useState("");

    const createRoomClick = () => {
        newRoom(Role.Admin).then((res: any) => {
            // setOptions({
            //     uuid: res.uuid,
            //     roomToken: res.roomToken
            // });
            setUuid(res.uuid);
            setRoomToken(res.roomToken);
        });
    }

    const joinRoomClick = () => {
        // joinRoom(Role.Writer, uuid)
        //     .then((res: any) => {
        //         // setOptions({
        //         //     uuid: res.uuid,
        //         //     roomToken: res.roomToken
        //         // });
        //         setUuid(res.uuid);
        //         setRoomToken(res.roomToken);
        //         // navigate(`/room?uuid=${res.uuid}&roomToken=${res.roomToken}`);
        //         navigate(`/room/${res.uuid}`, {
        //             state: {
        //                 roomToken: res.roomToken
        //             }
        //         });
        //     });
        navigate(`/room/${uuid}`, {

        });
    }
    const onUUIDChange = (value: any) => {
        setUuid(value.target.value);
    }

    const onUIDChange = (value: any) => {
        setUid(value.target.value);
    }


    return (
        <div className='roomCreateContainer'>
            <div>
                <button className='' onClick={createRoomClick}>创建房间</button>
                <div className=''>房间号： {uuid}</div>
                <div className=''>Token： {roomToken}</div>
            </div>
            <div>
                房间号：
                <input type="text" value={uuid} onChange={onUUIDChange} defaultValue="" />
                <br />
                用户ID:
                <input type="text" value={uid} onChange={onUIDChange} defaultValue="" />
                <button className='' onClick={joinRoomClick}>进入房间</button>
            </div>

        </div>
    );
}

export { Rooms };
