import { postcodeValidator } from "postcode-validator";

/**
 * Проверяет валидность почтового индекса
 * @param {string} country - Код страны (например, "AT" для Австрии)
 * @param {string} zipCode - Почтовый индекс
 * @returns {boolean}
 */
export const isValidPostalCode = (country, zipCode) => {
  return postcodeValidator(zipCode, country);
};
