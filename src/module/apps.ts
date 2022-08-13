import { apps, register } from "@netless/fastboard";
import Play from "./play";

export const registering = () => {

    register({
        kind: "Play",
        appOptions: {
            // 打开这个选项显示 debug 工具栏
            debug: false,
        },
        src: Play,
    });
    apps.clear()
    apps.push(
        {
            kind: "Play",
            label: "剧本",
            icon: "../assets/play.png",
            onClick: (fastboard: any) => {
                // fastboard.manager.addApp({
                //     kind: "Play",
                //     // options: { 
                //     //   scenePath: `/ppt/${1234567}`,
                //     //   title: "剧本" 
                //     // },
                //     // attributes: {
                //     //   taskId: "1234567", // [2]
                //     //   url: "https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF", // [3]
                //     // },
                // });
            },
        }
    );

}