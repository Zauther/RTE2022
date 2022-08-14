

export function getCurrentRoomUID() {
    return window?.appContext?.getRoom()?.uid;
}

export class UserManager {
    admin: User | undefined;
    currentUser: User | undefined;
    players: User[] = [];

    setUser(user: User): any {
        if (user == undefined || user == null) {
            return;
        }

        if (user.roomUserId = getCurrentRoomUID()) {
            this.currentUser = user;
        }

        if (user.isAdmin) {
            this.admin = user;
            return;
        }


        this.players.forEach((u) => {
            if (user.equals(u)) {
                u.update(user);
            }
        })
    }
}


export class User {
    isAdmin: boolean | undefined;
    userName: string | undefined;
    roomUserId: string | undefined;
    rtcUserId: string | undefined;
    constructor(roomUserId: string, userName: string, rtcUserId: string, isAdmin?: boolean | false) {
        this.roomUserId = roomUserId;
        this.userName = userName;
        this.rtcUserId = rtcUserId;
        this.isAdmin = isAdmin;
    }


    equals(u: User): boolean {
        if (u == undefined || u == null) {
            return false;
        }

        return u.roomUserId == this.roomUserId;
    }

    update(u: User) {
        this.userName = u.userName;
        this.roomUserId = u.roomUserId;
    }

}