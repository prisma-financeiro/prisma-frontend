import setCookie from "set-cookie-parser";

interface Cookies {
    token: string;
}

class CookieManager {

    public getCookies(): Cookies {
        var cookies = setCookie.parse(document.cookie, {
            decodeValues: true,
            map: true
        });

        return {
            token: cookies?.token?.value
        };
    }
}

const cookieManager = new CookieManager();

export default cookieManager;