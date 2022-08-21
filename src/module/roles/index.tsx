import { IAgoraRTCClient, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import React, { useCallback, useEffect, useState } from "react";
import Play from "../../service/play";
import { getRtcClient, join, leave } from "../../utils/RTCUtils";
import "./index.less";

const APP_ID = "16cca950aca74708a9c3f1e2b7f2e655";
const APP_CERTIFICATE = "3a224adcf8e24a808a6906179379221b";
const CHANNEL_NAME = "rte2022";
let audioTrack: IMicrophoneAudioTrack | null | undefined = null;
let isTalk: boolean = false;

import RoomManager from "../../service/room";

export default function Roles(props: any) {
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState<number | null>(null);

  useEffect(() => {
    const res = Play.getPlayInfo(1)
    setRoles(res.roles as [])
  }, [])

  const itemClick = (rtcClient: IAgoraRTCClient, id: number) => {
    const option = {
      appid: APP_ID,
      channel: CHANNEL_NAME,
      uid: "0",
    }
    if (!roleId) {
      setRoleId(id);
    }
    if (roleId && id !== roleId) {
      console.error("这不是你所选的角色，不能操作!")
      return;
    }

    RoomManager.bindRole(window.room.uid as string, `${roleId}`, window.room.uuid, window.userManager.isAdmin?"1":"0").then((response) => {
      console.log(`=====RoomManager bindRole====${response}`);
    });
    const rs = roles.map((r: any) => {
      if (r.id === id) {
        if (r.choosed) {
          leave(rtcClient, audioTrack);
        } else {
          join(rtcClient, option).then((info) => {
            audioTrack = info.audioTrack;
          });
        }
        return {
          ...r,
          choosed: !r.choosed
        }
      } else {
        return r
      }
    })
    setRoles(rs as []);
  }

  const renderRoles = useCallback(() => {
    const items: JSX.Element[] = [];
    const rtcClient = getRtcClient();

    roles.forEach((role: any) => {
      items.push(
        <div key={role.uid}
          className={`role-item ${role.choosed ? 'role-item-choosed' : 'role-item-not-choosed'} ${role.choosed && isTalk ? 'sound-wave' : ''}`}
          style={{ backgroundImage: "url('" + role.image + "')" }}
          onClick={() => itemClick(rtcClient, +role.id)}>
        </div>
      );
    })

    return items;
  }, [roles]);

  return (
    <div className="roles">
      {
        renderRoles()
      }
    </div>
  )
}