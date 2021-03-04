import { Account, Session } from "../models";
import storageKey from "./storage-key";

enum LocalStorageItems {
    Account = "account",
    Session = "session"
}

class StorageManager {

    private userAccount: Account;
    private userSession: Session;

    constructor() {
        this.userAccount = this.getItemFromLocalStorage(LocalStorageItems.Account);
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

    public setUserAccount(account: Account) {
        this.userAccount = account;
        this.setLocalStorageItem(LocalStorageItems.Account, account);
    }

    public getUserSession(): Session {
        return this.userSession;
    }

    public getUserAccount(): Account {
        return this.userAccount;
    }

    public removeUserAccount() {
        this.removeLocalStorageItem(LocalStorageItems.Account);
    }

    public removeUserSession() {
        this.removeLocalStorageItem(LocalStorageItems.Session);
    }

}

const storageManager = new StorageManager();

export default storageManager;