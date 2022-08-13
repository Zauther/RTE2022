import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.netless.link/',
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' }
});



export function getSDKToken() {
    return new Promise((reslove, reject) => {
        axiosInstance({
            method: 'post',
            url: '/v5/tokens/teams',
            data: {
                "accessKey": "ZPJW8-gYnZtofXUz",
                "secretAccessKey": "yI5N9oE7YA0sP4GUZjn__ARiFpzQD7cV",
                "lifespan": 3600000,
                "role": "admin"
            },
            headers: {
                "region": "cn-hz"
            }
        }).then(function (response) {
            console.log(`===${JSON.stringify(response.data)}`)
            reslove(response.data);
        });

    });
}

export function getRoomToken(uuid: string, token: string) {

    return new Promise((reslove, reject) => {
        axiosInstance({
            method: 'post',
            url: `/v5/tokens/rooms/${uuid}`,
            data: {
                // "accessKey": "ZPJW8-gYnZtofXUz",
                "lifespan": 3600000,
                "role": "admin"
            },
            headers: {
                "token": token,
                "region": "cn-hz"
            }
        }).then(function (response) {
            console.log(`===${JSON.stringify(response.data)}`)
            reslove(response.data);
        });

    });
}  

export function getRoomTokenOne(uuid: string) {

    return new Promise((reslove, reject) => {

        getSDKToken().then((sdkToken)=>{
            getRoomToken(uuid,`${sdkToken}`).then((roomToken)=>{
                reslove(roomToken);
                console.log(`===${JSON.stringify(roomToken)}`)
            });
        });
    });
} 