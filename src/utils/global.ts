import { FastboardApp } from "@netless/fastboard-react";
import type { AppContext } from "@netless/window-manager";
import { UserManager } from "../users/UserManager";
declare global {
    interface Window {
        appContext: AppContext;
        userManager: UserManager;
        app: FastboardApp | null;
    }
}

window.appContext = window.appContext || {};
window.userManager = new UserManager();
window.app = window.app || null;