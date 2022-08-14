import { User, UserManager } from "../users/UserManager";


/////////////// 用户信息同步 ///////////////
export function dispatchUserInfo(user: User) {
    window.appContext.dispatchMagixEvent("userInfoEvent", user);
}

export function addUserInfoListener(currentUser: User) {
    window.appContext.addMagixEventListener("userInfoEvent", (message) => {
        const user: User = message.payload;
        window.userManager.setUser(user);
    });
}
////////////////////////////////////////////



/////////////// 线索相关 ///////////////
export declare interface ClueInfo {
    clueName: string;
    clueUrl: string;
}

export declare interface ClueEvent {
    type: number; // 0分发，1召回
    roomUserId: string;
    clues: ClueInfo[];
}


export function dispatchClues(clueEvent: ClueEvent) {
    window.appContext.dispatchMagixEvent("clueEvent", clueEvent);
}

export function addCluesListener(currentUser: User) {
    return new Promise<ClueEvent>((reslove, reject) => {
        window.appContext.addMagixEventListener("clueEvent", (message) => {
            const clueEvent: ClueEvent = message.payload;
            if (clueEvent.roomUserId == window.appContext.getRoom()?.uid) {
                reslove(clueEvent);
            }
        });
    });
}
////////////////////////////////////////////



