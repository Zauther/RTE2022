import type { AppContext } from "@netless/window-manager";
import { UserManager } from "../users/UserManager";
declare global {
    interface Window { 
        appContext: AppContext; 
        userManager:UserManager;
    }
}

window.appContext = window.appContext || {};
window.userManager = new UserManager();