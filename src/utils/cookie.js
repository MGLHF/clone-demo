function Cookie() {
  Cookie.prototype.getCookie = function(key) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + key + '=');
    if (parts.length === 2) {
      return parts
        .pop()
        .split(';')
        .shift();
    }
  };

  Cookie.prototype.deleteCookie = function(key) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  Cookie.prototype.setCookie = function(key, value, seconds) {
    let expires = '';
    if (seconds) {
      const date = new Date();
      date.setTime(date.getTime() + seconds * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = key + '=' + (value || '') + expires + '; path=/';
  };
}

const cookie = new Cookie();
export default cookie;