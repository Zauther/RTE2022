import { apps, register } from "@netless/fastboard";
import { BuiltinApps } from "@netless/window-manager";
import annualrings from "../scripts/annualrings.jpg";
import ScriptsShow from "../scripts/ScriptsShow";
import App from "../src/index";
import 封面 from "../assets/年轮/封面.pdf"

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
        scenePath: 'annualrings',
        title: "docs1", // 可选
        scenes: [
          {
            name: "2",
            ppt: {
              height: 1010,
              // src: 'https://scripts-res.oss-cn-shanghai.aliyuncs.com/%E5%88%98%E4%BC%AF%E9%92%8A.pdf?Expires=1660176957&OSSAccessKeyId=TMP.3Kg7SEu5jyCHkVELcVXJMJqpjUCtEwec6u2iSYmoWrNXKxHbJbNoCheHuTYZ9yDDkZPbc4DRRCZNjmbZpeyJWdcSQS3Mg3&Signature=emelSTgrBuv2b1xS2ahsXFaE1PQ%3D',
              // src: "https://convertcdn.netless.link/staticConvert/18140800fe8a11eb8cb787b1c376634e/1.png",
              // src: "https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%B0%81%E9%9D%A2.PDF",
              src: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF',
              // src: "https://scripts-res.oss-cn-shanghai.aliyuncs.com/%E5%B0%81%E9%9D%A2.pdf?Expires=1660175887&OSSAccessKeyId=TMP.3Kg7SEu5jyCHkVELcVXJMJqpjUCtEwec6u2iSYmoWrNXKxHbJbNoCheHuTYZ9yDDkZPbc4DRRCZNjmbZpeyJWdcSQS3Mg3&Signature=6w1CYrLdEo9RcqthYFiNoPe5%2FhU%3D",
              width: 714,
            }},
          // {
          //   name: "1",
          //   ppt: {
          //     height: 1010,
          //     src: "https://convertcdn.netless.link/staticConvert/18140800fe8a11eb8cb787b1c376634e/1.png",
          //     // src: "https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%B0%81%E9%9D%A2.PDF",
          //     // src: 'https://cwiki.cn/downloads/f4198ca37f6af080d6bc0f3ddae1f872530181281.png',
          //     // src: "http://localhost:3000/assets/%E5%B9%B4%E8%BD%AE/%E5%B0%81%E9%9D%A2.pdf",
          //     width: 714,
          //   },
          // }
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