import AgoraRTC, { IAgoraRTCClient, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";


const roles = [ 
  {
    uid: 111111,
    name: "girl1",
    image: '../assets/girl1.png'
  },
  {
    uid: 222222,
    name: "girl2",
    image: '../assets/girl2.png'
  },
  {
    uid: 333333,
    name: "boy1",
    image: '../assets/boy1.png'
  },
  {
    uid: 444444,
    name: "boy2",
    image: '../assets/boy2.png'
  },
  {
    uid: 555555,
    name: "boy3",
    image: '../assets/boy3.png'
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
      token: "00616cca950aca74708a9c3f1e2b7f2e655IAAb0G2/AjNkz7UgXpbzI1FG8gRXf7SZck26CCZBB2vntt15FHwAAAAAEABUJOp9zV3qYgEAAQDMXepi",
      uid: role.uid
    };
    const $role = $node.appendChild(document.createElement("div"));
    $role.id = role.name;
    $role.style = "background-image: url('"+ getImageUrl(role.image) + "'); background-size: cover; width: 80px; height: 80px; border-radius: 50%; margin: 0 20px;";
    $role.onclick = async function () {
      if (rtc?.client && rtc?.localAudioTrack) {
        await rtc.client.join(options.appId, options.channel, options.token, options.uid);
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await rtc.client.publish([rtc.localAudioTrack]);  
        console.log("publish success!");
      } 
    }

    // document.getElementById("leave").onclick = async function () {
    //   // Destroy the local audio track.
    //   rtc.localAudioTrack.close();

    //   // Leave the channel.
    //   await rtc.client.leave();
    // }
  })
}

function getImageUrl(url: string) {
  return new URL(url, import.meta.url).href
}
