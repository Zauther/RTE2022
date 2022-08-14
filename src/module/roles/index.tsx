import React, { useCallback, useState } from "react";
import AgoraRTC, { IAgoraRTCClient, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import "./index.less"
import { apps } from "@netless/fastboard-react";
import { RtcTokenBuilder, Role } from "../../utils/RtcTokenBuilder";

type RtcItem = {
  localAudioTrack: null | IMicrophoneAudioTrack;
  client: null | IAgoraRTCClient;
}

let rtc: RtcItem = {
  localAudioTrack: null,
  client: null
}; 

const APP_ID = "16cca950aca74708a9c3f1e2b7f2e655";
const APP_CERTIFICATE = "3a224adcf8e24a808a6906179379221b";
const CHANNEL_NAME = "rte2022";
var token= "00616cca950aca74708a9c3f1e2b7f2e655IADBbRMbi2I/3iPp7U9XUtbGxYEJttsi9JZLqP+++osd+d15FHwAAAAAEACxI7THFer4YgEAAQAq6vhi";

export default function Roles(props: any) {
  const [roles, setRoles] = useState([]);

  const renderRoles = useCallback(() => {
    const items: JSX.Element[] = [];

    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    rtc.client.on("user-published", async (user, mediaType) => {
      // Subscribe to the remote user when the SDK triggers the "user-published" event
      rtc.client && await rtc.client.subscribe(user, mediaType);
      console.log("subscribe success");

      // If the remote user publishes an audio track.
      if (mediaType === "audio") {
        // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
        const remoteAudioTrack = user.audioTrack;
        // Play the remote audio track.
        remoteAudioTrack && remoteAudioTrack.play();
      }

      // Listen for the "user-unpublished" event
      rtc.client && rtc.client.on("user-unpublished", async (user) => {
          // Unsubscribe from the tracks of the remote user.
          rtc.client && await rtc.client.unsubscribe(user);
      });
    });

    const itemClick = async (options: any) => {



      const rs = roles.map(r => {
        if (r.uid === options.uid) {
          return {
            ...r,
            choosed: true
          }
        } else {
          return r
        }
      })
      setRoles(rs);

      apps.push(
        {
          kind: "Slide",
          label: "剧本",
          icon: "../assets/play.png",
          onClick: (fastboard: any) => {
            fastboard.manager.addApp({
              kind: "Slide",
              options: { 
                scenePath: `/ppt/${1234567}`,
                title: "剧本" 
              },
              attributes: {
                taskId: "1234567", // [2]
                url: "https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF", // [3]
              },
            });
          },
        }
      );
      console.log("join option ====== ", options)
      // rtc.client && await rtc.client.join(APP_ID, CHANNEL_NAME, options.token, options.uid);
      rtc.client && await rtc.client.join(APP_ID, CHANNEL_NAME,null,null);
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      rtc.client && await rtc.client.publish([rtc.localAudioTrack]);  
      console.log("publish success!");

      // document.getElementById("leave").onclick = async function () {
      //   // Destroy the local audio track.
      //   rtc.localAudioTrack.close();
  
      //   // Leave the channel.
      //   await rtc.client.leave();
      // }
    }

    roles.forEach(role => {
      // 添加RTC
      let options = {
        token: "",
        uid: role.uid
      };
      options.token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID, // appID
        APP_CERTIFICATE, // appCertificate
        // CHANNEL_NAME, // channelName
        "rtc20222",
        role.uid,  // uid
        Role.PUBLISHER, // role
        Math.floor(Date.now() / 1000) + 3600 // privilegeExpiredTs
      );
      //  var token= "00616cca950aca74708a9c3f1e2b7f2e655IADBbRMbi2I/3iPp7U9XUtbGxYEJttsi9JZLqP+++osd+d15FHwAAAAAEACxI7THFer4YgEAAQAq6vhi";

      options.token ="00616cca950aca74708a9c3f1e2b7f2e655IAAxBZOYcQ6U6WkRkwiN49OKy/FJouoBr1+e6h3wx5+/vADnkjTH48ZKIgCBlTOykf74YgQAAQAhu/diAgAhu/diAwAhu/diBAAhu/di"
      console.log(`==token==${options.token}`);

      items.push(
        <div key={role.uid} className={`role-item ${role.choosed ? 'role-item-choosed' : 'role-item-not-choosed'}`}
          style={{ backgroundImage: "url('" + role.image + "')"}}
          onClick={() => itemClick(options)}>
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