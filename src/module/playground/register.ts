import { register, apps } from "@netless/fastboard";
import App from "../tic-tac-toe/index";
import Slide from "@netless/app-slide";

export const registering = () => {
  register({ kind: App.kind, src: App });
  register({
    kind: "Slide",
    appOptions: {
      // 打开这个选项显示 debug 工具栏
      debug: false,
    },
    src: Slide,
  });
};

apps.clear();
apps.push(
  {
    kind: App.kind,
    label: App.kind.replace(/([a-z])([A-Z])/g, "$1 $2"),
    icon: "https://netless-docs.oss-cn-hangzhou.aliyuncs.com/Leo/WeChatc00e0aa34a57994719c6887727affc04.png",
    onClick: (fastboard) => {
      fastboard.manager.addApp({
        kind: App.kind,
        options: { title: "TicTacToe" },
      });
    },
  },
  {
    kind: "Slide",
    label: "剧本",
    icon: "../assets/play.png",
    onClick: (fastboard) => {
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
