

export function getCurrentRoomUID(): string {
    return `${window?.appContext?.getRoom()?.uid}`;
}

export class UserManager {
    admin: User | undefined;
    currentUser: User | undefined;
    players: User[] = [];

    public setUser(user: User): any {
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
        const u = this.players.find((u)=>{
           return u.roomUserId ==user.roomUserId;
        })
        if(u){
            console.log(`=== 5 ===`);
            u.update(user);
        }else{
            this.players.push(user);
        }
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

    toJson() {
        return {
            isAdmin: this.isAdmin,
            userName: this.userName,
            roomUserId: this.roomUserId,
            rtcUserId: this.rtcUserId
        }
    }

}