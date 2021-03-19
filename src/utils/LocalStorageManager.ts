import { UserAccount, Session } from "../models";
import storageKey from "./storage-key";

enum LocalStorageItems {
    UserAccount = "user_account",
    Session = "session"
}

class LocalStorageManager {

    private userAccount: UserAccount;
    private userSession: Session;

    constructor() {
        this.userAccount = this.getItemFromLocalStorage(LocalStorageItems.UserAccount);
        this.userSession = this.getItemFromLocalStorage(LocalStorageItems.Session);
    }

    private getItemFromLocalStorage(item: LocalStorageItems): any {
        const itemValue = localStorage.getItem(storageKey(item));
        return itemValue ? JSON.parse(itemValue) : null;
    }

    private setLocalStorageItem(item: LocalStorageItems, value: any) {
        localStorage.setItem(storageKey(item), JSON.stringify(value));
    }

    private removeLocalStorageItem(item: LocalStorageItems) {
        localStorage.removeItem(storageKey(item));
    }

    public setUserSession(session: Session) {
        this.userSession = session;
        this.setLocalStorageItem(LocalStorageItems.Session, session);
    }

    public setUserAccount(userAccount: UserAccount) {
        this.userAccount = userAccount;
        this.setLocalStorageItem(LocalStorageItems.UserAccount, userAccount);
    }

    public getUserSession(): Session {
        return this.userSession;
    }

    public getUserAccount(): UserAccount {
        return this.userAccount;
    }

    public removeUserAccount() {
        this.removeLocalStorageItem(LocalStorageItems.UserAccount);
    }

    public removeUserSession() {
        this.removeLocalStorageItem(LocalStorageItems.Session);
    }

}

const localStorageManager = new LocalStorageManager();

export default localStorageManager;