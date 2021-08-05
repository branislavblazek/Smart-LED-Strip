export const setCookie = (cookieName, cookieValue) => {
    document.cookie = `${cookieName}=${cookieValue};path=/`;
};

export const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=;path=/`;
};

export const getCookie = (cookieName) => {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const allCookies = decodedCookie.split(';');
    const relevantCookie = allCookies.find(cookie => cookie.trim().startsWith(name)) || null;
    return relevantCookie ? relevantCookie.trim().substring(name.length) : '';
};

export const checkCookie = (cookieName) => {
    const value = getCookie(cookieName);
    return value !== '';
};
