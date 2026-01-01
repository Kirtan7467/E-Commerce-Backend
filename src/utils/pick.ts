type AnyObject = Record<string, any>;

const pick = <T extends AnyObject, K extends readonly (keyof T)[]>(
  object: T,
  keys: K
): Pick<T, K[number]> => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Pick<T, K[number]>);
};

export default pick;
