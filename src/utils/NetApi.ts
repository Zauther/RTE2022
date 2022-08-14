import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.netless.link/',
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export declare interface RoomInfo {
  uuid: string, // room 的uuid
  teamUUID: string,
  appUUID: string,
  isRecord: boolean,
  isBan: boolean,
  createdAt: string,
  limit: number
}

export declare interface Room {
  uuid: string, // room 的uuid
  roomToken: string
}

export const Role = {
  Admin: "admin",
  Writer: "writer",
  Reader: "reader"
}

const default_lifespan = 3600 * 12;

/*
role:string="admin|writer|reader"
{
    "uuid":"f0b79a601ae911ed9f7d8590b0255a6b",
    "roomToken":"NETLESSROOM_YWs9WlBKVzgtZ1luWnRvZlhVeiZleHBpcmVBdD0xNjYwMzg2MzU5MDEzJm5vbmNlPTE2NjAzODI3NTkwMTMwMCZyb2xlPTAmc2lnPWQ4MDQ0NTUyMTdhMTViNGZjNmNiMzIzOTU0MWNmYzU0NTRiOGQ1OTk0MDIzY2E0ZmI0YWQ3NGQ2M2M5MjRlNTgmdXVpZD1mMGI3OWE2MDFhZTkxMWVkOWY3ZDg1OTBiMDI1NWE2Yg"
}
*/
export function newRoom(role: string) {
    return new Promise<Room>((reslove, reject) => {
        getSDKToken(role).then((sdkToken) => {
            createRoom(sdkToken).then((roomInfo) => {
                const uuid = roomInfo.uuid;
                getRoomToken(uuid, sdkToken,role).then((roomToken) => {
                    reslove({ uuid: uuid, roomToken: roomToken });
                });
            })
        })
    });
}

export function joinRoom(role: string, uuid: string) {
  return new Promise<Room>((reslove, reject) => {
    getSDKToken(role).then((sdkToken) => {
      getRoomToken(uuid, sdkToken,role).then((roomToken) => {
        reslove({ uuid: uuid, roomToken: roomToken });
      });
    })
  });
}


/*
{
    "uuid": "81f025401ae711ed857671280b14c673", // room 的uuid
    "teamUUID": "GT9jcAsqEe2h3gGzQbAihw",
    "appUUID": "fQMzaWge4PL5IQ",
    "isRecord": true,
    "isBan": false,
    "createdAt": "2022-08-13T09:08:33.872Z",
    "limit": 0
}
*/
function createRoom(token: string) {
    return new Promise<RoomInfo>((reslove, reject) => {
        axiosInstance({
            method: 'post',
            url: '/v5/rooms',
            headers: {
                // "token":"NETLESSSDK_YWs9WlBKVzgtZ1luWnRvZlhVeiZub25jZT0xNmY1MGY4MC0xYWU3LTExZWQtOWI1MC1kOWRhMDQ1MjEzNDYmcm9sZT0wJnNpZz0xZjhlZDM3OGQwMWJkN2ZiYTk2ZDIzOGFhZjRkMDNhNmE5Y2Q3MmUyN2IzYjllMWU2MDljOGVmNmY0OTFlZGI4",
                "token": token,
                "Content-Type": "application/json",
                "region": "cn-hz"
            }
        }).then(function (response) {
            console.log(`===${JSON.stringify(response.data)}`)
            reslove(response.data);
        });

    });
}


function getSDKToken(role: string) {
    return new Promise<string>((reslove, reject) => {
        axiosInstance({
            method: 'post',
            url: '/v5/tokens/teams',
            data: {
                "accessKey": "ZPJW8-gYnZtofXUz",
                "secretAccessKey": "yI5N9oE7YA0sP4GUZjn__ARiFpzQD7cV",
                "lifespan": default_lifespan,
                "role": role
            },
            headers: {
                "region": "cn-hz"
            }
        }).then(function (response) {
            reslove(response.data);
        });

    });
}

function getRoomToken(uuid: string, sdkToken: string, role: string) {

    return new Promise<string>((reslove, reject) => {
        axiosInstance({
            method: 'post',
            url: `/v5/tokens/rooms/${uuid}`,
            data: {
                // "accessKey": "ZPJW8-gYnZtofXUz",
                "lifespan": default_lifespan,
                "role": role
            },
            headers: {
                "token": sdkToken,
                "region": "cn-hz"
            }
        }).then(function (response) {
            reslove(response.data);
        });

    });
}  