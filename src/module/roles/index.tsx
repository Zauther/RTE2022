import { IAgoraRTCClient, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import React, { useCallback, useEffect, useState } from "react";
import Play from "../../service/play";
import { getRtcClient, join, leave } from "../../utils/RTCUtils";
import "./index.less";
import { MyContext } from "../../index";
import { User, getCurrentRoomUID } from "../../users/UserManager";

const APP_ID = "16cca950aca74708a9c3f1e2b7f2e655";
const APP_CERTIFICATE = "3a224adcf8e24a808a6906179379221b";
const CHANNEL_NAME = "rte2022";
let audioTrack: IMicrophoneAudioTrack | null | undefined = null;
let isTalk: boolean = false;

import RoomManager from "../../service/room";
import GlobalContext from "../../state/Global";

export default function Roles(props: any) {
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState<number | null>(null);

  useEffect(() => {
    const res = Play.getPlayInfo(1)
    setRoles(res.roles as [])
  }, [])

  const itemClick = (rtcClient: IAgoraRTCClient, id: number, context: GlobalContext) => {
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


    const rs = roles.map((r: any) => {
      const roomUserId = context.currentUser?.roomUserId;
      const userName = "haha";

      if (r.id === id) {
        if (r.choosed) {
          leave(rtcClient, audioTrack);
          const user = new User(
            `${roomUserId}`,
            userName,
            "", // rtcUserId
            id, // roleId
            id === 0 ? true : false,
          )
          window.userManager.setUser(user);
        } else {
          join(rtcClient, option).then((info) => {
            audioTrack = info.audioTrack;
            if (!context?.currentUser?.roleId) {
              const rtcUserId = option?.uid;
              const user = new User(
                `${roomUserId}`,
                userName,
                rtcUserId, // rtcUserId
                id, // roleId
                id === 1 ? true : false,
              )
              window.userManager.setUser(user);
            }
          });
          console.log(`===RoomManager===,${JSON.stringify(context?.currentUser)}`)
          RoomManager.bindRole(context.room?.uid as string, `${id}`, context.room?.uuid as string, context.isAdmin ? "1" : "0").then((response) => {
            console.log(`=====RoomManager bindRole====${JSON.stringify(response)}`);
          });
          context?.room?.dispatchMagixEvent("updateUserInfo",{});
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

  const renderRoles = useCallback((context: any) => {
    const items: JSX.Element[] = [];
    const rtcClient = getRtcClient();
    roles.forEach((role: any) => {
      items.push(
        <div key={role.uid}
          className={`role-item ${role.choosed ? 'role-item-choosed' : 'role-item-not-choosed'} ${role.choosed && isTalk ? 'sound-wave' : ''}`}
          style={{ backgroundImage: "url('" + role.image + "')" }}
          onClick={() => itemClick(rtcClient, +role.id, context)}>
        </div>
      );
    })

    return items;
  }, [roles]);

  return (
    <div className="roles">
      <MyContext.Consumer>
        {
          value => {
            return renderRoles(value)
          }
        }
      </MyContext.Consumer>
    </div>
  )
}