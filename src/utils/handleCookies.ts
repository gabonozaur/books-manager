export type CookieName = "Access-Token";

export const accessTokenCookieKey = "Access-Token" as CookieName;

export const setCookie = (name: CookieName, value) => {
  var expires = "";
  const days = 5;

  var date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  expires = "; expires=" + date.toUTCString();

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
export const eraseCookie = (name: CookieName) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
