export const setCookie=(name: string, value: string, days: number) =>{
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();

    
  }
  document.cookie =
    name +
    '=' +
    (encodeURIComponent(value) || '') +
    expires +
    '; path=/; Secure; SameSite=None;';
}
