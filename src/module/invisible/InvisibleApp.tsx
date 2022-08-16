import type { NetlessApp } from "@netless/window-manager";


import React from "react";
import { createRoot } from "react-dom/client";
import { dispatch } from "../../events/EventsManager";
import { User } from "../../users/UserManager";
import "./InnerInvisibleApp.less"
// 专门用来获取appContext
const InnerInvisibleApp: NetlessApp = {
    config: {
        height: 0,
        width: 0,
        minheight: 0,
        minwidth: 0
    },
    kind: "InnerInvisibleApp",
    setup(context) {

        window.appContext = context;
        if (window.userManager.isAdmin && context.getRoom()) {
            window.userManager.admin = new User(`${context.getRoom()?.uid}`, "", "", true);
            window.userManager.currentUser = window.userManager.admin;
        } else {
            window.userManager.currentUser = new User(`${context.getRoom()?.uid}`, "", "", false);
            window.userManager.setUser(window.userManager.currentUser);
        }

        console.log(`isadmin${JSON.stringify(window.userManager.isAdmin)}`)
        console.log(`admin${JSON.stringify(window.userManager.admin)}`)
        console.log(`currentUser${JSON.stringify(window.userManager.currentUser)}`)
        console.log(`players${JSON.stringify(window.userManager.players)}`)

        
        dispatch("SyncUserInfo",{});

        const box = context.getBox();
        const $content = document.createElement("div");
        $content.className = "InnerInvisibleApp";
        box.mountContent($content);
        $content.hidden = true;
        const root = createRoot($content);
        root.render(<p />);

        context.emitter.on("destroy", () => {
            root.unmount();
        });
    },
};

export default InnerInvisibleApp;
