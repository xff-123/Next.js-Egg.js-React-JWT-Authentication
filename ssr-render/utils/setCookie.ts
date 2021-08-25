const setCookie = (name: string, value: string): any => {
  const Days = 10;
  let exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${exp.toUTCString()}`;
};

export { setCookie };