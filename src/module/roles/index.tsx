import React, { useCallback, useEffect, useState } from "react";
import { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import "./index.less"
import Play from "../../service/play";
import { getRtcClient, join, leave } from "../../utils/RTCUtils";

const APP_ID = "16cca950aca74708a9c3f1e2b7f2e655";
const APP_CERTIFICATE = "3a224adcf8e24a808a6906179379221b";
const CHANNEL_NAME = "rte2022";

export default function Roles(props: any) {
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState<number | null>(null);
  const [rtcInfo, setRtcInfo] = useState<any>(null);

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
      console.error("this is not your role!")
      return;
    }

    const rs = roles.map((r: any) => {
      if (r.id === id) {
        if (r.choosed) {
          leave(rtcClient, rtcInfo.audioTrack);
        } else {
          join(rtcClient, option).then((info) => {
            setRtcInfo(info);
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
        <div key={role.uid} className={`role-item ${role.choosed ? 'role-item-choosed' : 'role-item-not-choosed'}`}
          style={{ backgroundImage: "url('" + role.image + "')"}}
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