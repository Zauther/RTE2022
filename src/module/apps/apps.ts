import { register, apps } from "@netless/fastboard";
import Slide from "@netless/app-slide";
import { BuiltinApps } from "@netless/window-manager";
import annualrings from "../../../assets/annualrings.jpg";
import NetlessAppDocsViewer from "./DocsViewer";

export const registering = () => {

    register({
        kind: "Slide",
        appOptions: {
          // 打开这个选项显示 debug 工具栏
          debug: true,
        },
        src: Slide,
      });

      register({
        kind: "NetlessAppDocsViewer",
        appOptions: {
          // 打开这个选项显示 debug 工具栏
          debug: true,
        },
        src: NetlessAppDocsViewer,
      });


      apps.clear()

      apps.push({
        kind: "NetlessAppDocsViewer",
        label: "NetlessAppDocsViewer",
        
        icon: annualrings,
        onClick: (fastboard) => {
          fastboard.manager.addApp({
            kind: "NetlessAppDocsViewer",
            options: {
              scenePath: '/assets/annualrings.jpg',
              title: "docs1", // 可选
              scenes: [
                {
                  name: "2",
                  ppt: {
                    height: 1010,
                    src: 'https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF',
                    width: 714,
                  }},
              ], // SceneDefinition[] 静态/动态 Scene 数据
            },
          });
        },
      });



//     register({ kind: App.kind, src: App });
//     register({
//       kind: "Slide",
//       appOptions: {
//         // 打开这个选项显示 debug 工具栏
//         debug: false,
//       },
//       src: Slide,
//     });
//   };

//   register({
//     kind: "Slide",
//     appOptions: {
//       // 打开这个选项显示 debug 工具栏
//       debug: true,
//     },
//     src: Slide,
//   });
//   apps.clear()
  
//   apps.push(
//     {
//       kind: "App.kind",
//       label: "A",
//       icon: "https://netless-docs.oss-cn-hangzhou.aliyuncs.com/Leo/WeChatc00e0aa34a57994719c6887727affc04.png",
//       onClick: (fastboard) => {
//         fastboard.manager.addApp({
//           kind: "App.kind",
//           options: { title: "TicTacToe" },
//         });
//       },
//     },
//     {
//       kind: "Slide",
//       label: "剧本",
//       icon: "../assets/play.png",
//       onClick: (fastboard) => {
//         fastboard.manager.addApp({
//           kind: "Slide",
//           options: { 
//             scenePath: `/ppt/${1234567}`,
//             title: "剧本" 
//           },
//           attributes: {
//             taskId: "1234567", // [2]
//             url: "https://cwiki.cn/downloads/%E5%B9%B4%E8%BD%AE/%E5%89%A7%E6%9C%AC/%E5%88%98%E4%BC%AF%E9%92%8A.PDF", // [3]
//           },
//         });
//       },
//     }
//   );

apps.push({
    kind: "ScriptsShow",
    label: "剧本",
    icon: annualrings,
    onClick: (fastboard) => {
      fastboard.manager.addApp({
        kind: BuiltinApps.DocsViewer,
        options: {
          scenePath: '/assets/annualrings.jpg',
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
  
}