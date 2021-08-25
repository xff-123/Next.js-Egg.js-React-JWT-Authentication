import {getCookie} from './getCookie'
const delCookie = (name: string): any => {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(document.cookie)[name];
  if (cval != null)
    document.cookie = `${name}=${cval}; expires=${exp.toUTCString()}`;
};

export { delCookie };