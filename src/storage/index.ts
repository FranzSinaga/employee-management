export const setItemToSessionStorage = (key: string, value: any): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromSessionStorage = (key: string): String => {
  const result = sessionStorage.getItem(key);
  return JSON.parse(result);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};

export const removeSessionByKey = (key: string) => {
  sessionStorage.removeItem(key);
};
