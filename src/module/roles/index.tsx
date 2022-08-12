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
const APP_CERTIFICATE = "5e9a25fcf32d401381fe53c6974051c3";
const CHANNEL_NAME = "rte2022";


export default function Roles(props: any) {
  const [roles, setRoles] = useState([
    {
      uid: 100000,
      name: "master",
      image: 'https://p0.meituan.net/roleplay/dda93d3f9d4c5268a421370abe49f2562621818825.png',
      play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF',
      choosed: false,
    },
    {
      uid: 111111,
      name: "girl1",
      image: 'https://p0.meituan.net/roleplay/f4198ca37f6af080d6bc0f3ddae1f872530181281.png',
      play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E7%8E%8B%E5%B0%8F%E5%86%89.PDF',
      choosed: false,
    },
    {
      uid: 222222,
      name: "girl2",
      image: 'https://p0.meituan.net/roleplay/500051c98d58c5ec3d5d0a4ccac8655e530668143.png',
      play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E8%A2%81%E6%9C%AC.PDF',
      choosed: false,
    },
    {
      uid: 333333,
      name: "boy1",
      image: 'https://p0.meituan.net/roleplay/378c0eeb8f9c04fd9d4fb4e78896423a103715896.jpg',
      play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%A7%9A%E6%B3%A2.PDF',
      choosed: false,
    },
    {
      uid: 444444,
      name: "boy2",
      image: 'https://p0.meituan.net/roleplay/5459ea2d0fd3ee0b8a42a267e20cd561544014163.png',
      play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E7%8E%8B%E5%B0%8F%E5%86%89.PDF',
      choosed: false,
    },
    {
      uid: 555555,
      name: "boy3",
      image: 'https://p0.meituan.net/roleplay/8648220bf8862aa0a543ceb6174fb8cb516128541.png',
      play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E9%99%88%E6%A0%8E.PDF',
      choosed: false,
    },
  ]);

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
      rtc.client && await rtc.client.join(APP_ID, CHANNEL_NAME, options.token, options.uid);
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
        CHANNEL_NAME, // channelName
        role.uid,  // uid
        Role.PUBLISHER, // role
        Math.floor(Date.now() / 1000) + 3600 // privilegeExpiredTs
      );

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