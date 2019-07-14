/**
 * Проверяет пустой объект или нет
 * @param {object} obj - проверяемый объект
 * @returns {boolean} true - объект пустой, false - нет
 */
export const isEmptyObject = obj => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};
