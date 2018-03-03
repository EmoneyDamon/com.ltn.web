import Cookies from 'js-cookie';

export const getCookie = name => Cookies.get(name);
export const setCookie = ({ name, value, options }) => {
  if (typeof name === 'undefined') {
    throw new Error('cookie name must be not undefined');
  } else {
    Cookies.set(name, value, options);
  }
};
