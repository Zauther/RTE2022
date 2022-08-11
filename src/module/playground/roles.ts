import AgoraRTC, { IAgoraRTCClient, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";


export const roles = [
  {
    uid: 100000,
    name: "master",
    image: 'https://p0.meituan.net/roleplay/dda93d3f9d4c5268a421370abe49f2562621818825.png',
    play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF'
  },
  {
    uid: 111111,
    name: "girl1",
    image: 'https://p0.meituan.net/roleplay/f4198ca37f6af080d6bc0f3ddae1f872530181281.png',
    play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E7%8E%8B%E5%B0%8F%E5%86%89.PDF'
  },
  {
    uid: 222222,
    name: "girl2",
    image: 'https://p0.meituan.net/roleplay/500051c98d58c5ec3d5d0a4ccac8655e530668143.png',
    play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E8%A2%81%E6%9C%AC.PDF'
  },
  {
    uid: 333333,
    name: "boy1",
    image: 'https://p0.meituan.net/roleplay/378c0eeb8f9c04fd9d4fb4e78896423a103715896.jpg',
    play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%A7%9A%E6%B3%A2.PDF'
  },
  {
    uid: 444444,
    name: "boy2",
    image: 'https://p0.meituan.net/roleplay/5459ea2d0fd3ee0b8a42a267e20cd561544014163.png',
    play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E7%8E%8B%E5%B0%8F%E5%86%89.PDF'
  },
  {
    uid: 555555,
    name: "boy3",
    image: 'https://p0.meituan.net/roleplay/8648220bf8862aa0a543ceb6174fb8cb516128541.png',
    play: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E9%99%88%E6%A0%8E.PDF'
  },
]

type RtcItem = {
  localAudioTrack: null | IMicrophoneAudioTrack;
  client: null | IAgoraRTCClient;
}

let rtc: RtcItem = {
  localAudioTrack: null,
  client: null
};

export function createRoles($node: any, ) {
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

  roles.forEach(role => {
    // 添加RTC
    let options = {
      appId: "16cca950aca74708a9c3f1e2b7f2e655",
      channel: "rte2022",
      token: "00616cca950aca74708a9c3f1e2b7f2e655IADq7BLcXqQRNHs5CIGsoUpVFy+6ApSYoCpDY8zNsdeuJN15FHwAAAAAEABUJOp9ENPrYgEAAQAQ0+ti",
      uid: role.uid
    };
    const $role = $node.appendChild(document.createElement("div"));
    $role.id = role.name;
    $role.style = "background-image: url('"+ role.image + "'); background-size: cover; width: 80px; height: 80px; border-radius: 50%; margin: 0 20px; cursor: pointer;";
    $role.onclick = async function () {
      console.log("role onclick: ", $role);
      rtc.client && await rtc.client.join(options.appId, options.channel, options.token, options.uid);
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      rtc.client && await rtc.client.publish([rtc.localAudioTrack]);  
      console.log("publish success!");
    }

    // document.getElementById("leave").onclick = async function () {
    //   // Destroy the local audio track.
    //   rtc.localAudioTrack.close();

    //   // Leave the channel.
    //   await rtc.client.leave();
    // }
  })
}
