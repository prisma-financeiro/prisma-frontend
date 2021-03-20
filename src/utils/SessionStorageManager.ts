import storageKey from "./storage-key";

enum SessionStorageItems {
    PasswordRecoverEmail = "PasswordRecoverEmail",
}

class SessionStorageManager {

    private passwordRecoverEmail: string;

    constructor() {
        this.passwordRecoverEmail = this.getItemFromSessionStorage(SessionStorageItems.PasswordRecoverEmail);
    }

    private getItemFromSessionStorage(item: SessionStorageItems): any {
        const itemValue = sessionStorage.getItem(storageKey(item));
        return itemValue ? JSON.parse(itemValue) : null;
    }

    private setSessionStorageItem(item: SessionStorageItems, value: any) {
        sessionStorage.setItem(storageKey(item), JSON.stringify(value));
    }

    private removeSessionStorageItem(item: SessionStorageItems) {
        sessionStorage.removeItem(storageKey(item));
    }

    public setPasswordRecoverEmail(email: string) {
        this.passwordRecoverEmail = email;
        this.setSessionStorageItem(SessionStorageItems.PasswordRecoverEmail, email);
    }

    public getPasswordRecoverEmail(): string {
        return this.passwordRecoverEmail;
    }

    public removePasswordRecoverEmail() {
        this.removeSessionStorageItem(SessionStorageItems.PasswordRecoverEmail);
    }

}

const sessionStorageManager = new SessionStorageManager();

export default sessionStorageManager;