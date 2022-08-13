import { apps, register } from "@netless/fastboard";
import Play from "./play";
import Plyr from "@netless/app-plyr"
import TicTacToe from "./TicTacToe";

export const registering = () => {

    register({
        kind: "Play",
        appOptions: {
            // 打开这个选项显示 debug 工具栏
            debug: false,
        },
        src: Play,
    });
    
    register({
        kind: "TicTacToe",
        appOptions: {
            // 打开这个选项显示 debug 工具栏
            debug: false,
        },
        src: TicTacToe,
    });
    
    

    // register({
    //     kind: "Plyr",
    //     appOptions: {
    //         // 打开这个选项显示 debug 工具栏
    //         debug: false,
    //     },
    //     src: Plyr,
    // });

    apps.clear()
    apps.push(
        {
            kind: "Play",
            label: "剧本",
            icon: "../assets/play.png",
            onClick: (fastboard: any) => {
                fastboard.manager.addApp({
                    kind: "Play",
                    // options: { 
                    //   scenePath: `/ppt/${1234567}`,
                    //   title: "剧本" 
                    // },
                    // attributes: {
                    //   taskId: "1234567", // [2]
                    //   url: "https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF", // [3]
                    // },
                });
            },
        }
    );

    apps.push(
        {
            kind: "Plyr",
            label: "播放音频",
            icon: "../assets/play.png",
            onClick: (fastboard: any) => {
                fastboard.manager.addApp({
                    src: Plyr,
                    kind: "Plyr",
                    options: {
                        title: "MP3",
                    },
                    attributes: {
                        src: "https://flat-storage.oss-accelerate.aliyuncs.com/cloud-storage/2022-03/28/f663cdcc-3367-4a15-8d2d-65fa4302c782/f663cdcc-3367-4a15-8d2d-65fa4302c782.mp3",
                        type: "audio/mp3",
                    },
                    // options: { 
                    //   scenePath: `/ppt/${1234567}`,
                    //   title: "剧本" 
                    // },
                    // attributes: {
                    //   taskId: "1234567", // [2]
                    //   url: "https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF", // [3]
                    // },
                });
            },
        }
    );
    apps.push(
        {
            kind: "Plyr",
            label: "播放视频",
            icon: "../assets/play.png",
            onClick: (fastboard: any) => {
                fastboard.manager.addApp({
                    src: Plyr,
                    kind: "Plyr",
                    options: {
                        title: "MP4",
                    },
                    attributes: {
                        src: "https://flat-storage.oss-accelerate.aliyuncs.com/cloud-storage/2022-03/28/e35a6676-aa5d-4a61-8f17-87e626b7d1b7/e35a6676-aa5d-4a61-8f17-87e626b7d1b7.mp4",
                        type: "video/mp4",
                    },
                    // options: { 
                    //   scenePath: `/ppt/${1234567}`,
                    //   title: "剧本" 
                    // },
                    // attributes: {
                    //   taskId: "1234567", // [2]
                    //   url: "https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF", // [3]
                    // },
                });
            },
        }
    );

    apps.push(
        {
            kind: "TicTacToe",
            label: "TicTacToe",
            icon: "../assets/play.png",
            onClick: (fastboard: any) => {
                fastboard.manager.addApp({
                    src: TicTacToe,
                    kind: "TicTacToe",
                    options: {
                        title: "TicTacToe",
                    },
                    // attributes: {
                    //     src: "https://flat-storage.oss-accelerate.aliyuncs.com/cloud-storage/2022-03/28/e35a6676-aa5d-4a61-8f17-87e626b7d1b7/e35a6676-aa5d-4a61-8f17-87e626b7d1b7.mp4",
                    //     type: "video/mp4",
                    // },
                    // options: { 
                    //   scenePath: `/ppt/${1234567}`,
                    //   title: "剧本" 
                    // },
                    // attributes: {
                    //   taskId: "1234567", // [2]
                    //   url: "https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF", // [3]
                    // },
                });
            },
        }
    );
}