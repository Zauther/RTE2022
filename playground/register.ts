import { apps, register } from "@netless/fastboard";
import { BuiltinApps } from "@netless/window-manager";
import annualrings from "../scripts/annualrings.jpg";
import ScriptsShow from "../scripts/ScriptsShow";
import App from "../src/index";

export const registering = register({ kind: App.kind, src: App });
apps.clear();
apps.push({
  kind: App.kind,
  label: App.kind.replace(/([a-z])([A-Z])/g, "$1 $2"),
  icon: "https://netless-docs.oss-cn-hangzhou.aliyuncs.com/Leo/WeChatc00e0aa34a57994719c6887727affc04.png",
  onClick: (fastboard) => {
    fastboard.manager.addApp({
      kind: App.kind,
      options: { title: "TicTacToe" },
    });
  },
});
apps.push({
  kind: ScriptsShow.kind,
  label: ScriptsShow.kind.replace(/([a-z])([A-Z])/g, "$1 $2"),
  icon: annualrings,
  onClick: (fastboard) => {
    fastboard.manager.addApp({
      kind: ScriptsShow.kind,
      options: { title: "Scripts" },
    });
  },
});

apps.push({
  kind: ScriptsShow.kind,
  label: ScriptsShow.kind.replace(/([a-z])([A-Z])/g, "$1 $2"),
  icon: annualrings,
  onClick: (fastboard) => {
    fastboard.manager.addApp({
      kind: BuiltinApps.DocsViewer,
      options: {
        scenePath: annualrings,
        title: "docs1", // 可选
        scenes: [
          {
            name: "1",
            ppt: {
              height: 1010,
              // src: "https://convertcdn.netless.link/staticConvert/18140800fe8a11eb8cb787b1c376634e/1.png",
              src: "https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%B0%81%E9%9D%A2.PDF",
              width: 714,
            },
          }
        ], // SceneDefinition[] 静态/动态 Scene 数据
      },
    });
  },
});

// apps.push({
//   kind: ScriptsShow.kind,
//   label: ScriptsShow.kind.replace(/([a-z])([A-Z])/g, "$1 $2"),
//   icon: annualrings,
//   onClick: (fastboard) => {
//     fastboard.manager.addApp({
//       kind: Dice,
//       options: {
//         scenePath: "/scripts/annualrings.jpg",
//         title: "docs1", // 可选
//         scenes: [], // SceneDefinition[] 静态/动态 Scene 数据
//       },
//     });
//   },
// });