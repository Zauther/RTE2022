import { apps, register } from "@netless/fastboard";
import Dice from "./dice";
// import Plyr from "@netless/app-plyr"
// import TicTacToe from "./TicTacToe";

export const registering = () => {
    register({
        kind: "Dice",
        appOptions: {
            // 打开这个选项显示 debug 工具栏
            debug: false,
        },
        src: Dice,
    });

    apps.clear()

    apps.push(
        {
            kind: "Dice",
            label: "骰子",
            icon: "../assets/dice.png",
            onClick: (fastboard: any) => {
                fastboard.manager.addApp({
                    src: Dice,
                    kind: "Dice",
                    options: {
                        title: "骰子",
                    },
                });
            },
        }
    );
}