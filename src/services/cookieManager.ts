class CookieManager {

    public getCookie(cookieName: string) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieList = decodedCookie.split(';');
        for(let i = 0; i <cookieList.length; i++) {
            var cookie = cookieList[i];
            
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }

            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }
}

const cookieManager = new CookieManager();

export default cookieManager;