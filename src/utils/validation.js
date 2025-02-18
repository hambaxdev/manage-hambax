import i18n from '../i18n';

/**
 * Функция для валидации данных регистрации.
 * @param {Object} values - Объект с полями формы.
 * @returns {Object} Объект с ошибками (пустой, если ошибок нет).
 */
export const validateRegistration = (values) => {
    const errors = {};
  
    if (!values.username.trim()) {
      errors.username = 'Username is required';
    }
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
  
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
  
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    return errors;
  };


  /**
 * Функция для валидации данных логина.
 * @param {Object} values - Объект с полями формы.
 * @returns {Object} Объект с ошибками (пустой, если ошибок нет).
 */
export const validateLogin = (values) => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
  
    if (!values.password) {
      errors.password = 'Password is required';
    }
  
    return errors;
  };

  /**
 * Функция для валидации пароля.
 * @param {string} password - Пароль для проверки.
 * @returns {string | null} Сообщение об ошибке (или null, если ошибок нет).
 */
export const validatePassword = (password) => {
  if (!password) {
      return 'Password is required';
  } else if (password.length < 6) {
      return 'Password must be at least 6 characters long';
  }
  return null;
};

/**
 * Функция для валидации данных контактной формы.
 * @param {Object} values - Объект с полями формы.
 * @returns {Object} Объект с ошибками (пустой, если ошибок нет).
 */
export const validateContactForm = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return errors;
};

export const validateCompleteRegistration = ({ firstName, lastName, citizenship }) => {
  const errors = {};

  if (!firstName) {
      errors.firstName = 'First name is required';
  }
  if (!lastName) {
      errors.lastName = 'Last name is required';
  }
  if (!citizenship) {
      errors.citizenship = 'Citizenship is required';
  }

  return errors;
};


export const validatePersonalInfoStep = (formData) => {
  const errors = {};

  if (!formData.firstName) {
    errors.firstName = i18n.t("validation.firstNameRequired");
  }

  if (!formData.lastName) {
    errors.lastName = i18n.t("validation.lastNameRequired");
  }

  if (!formData.citizenship) {
    errors.citizenship = i18n.t("validation.citizenshipRequired");
  }

  if (!formData.language) {
    errors.language = i18n.t("validation.languageRequired");
  }

  if (!formData.dateOfBirth) {
    errors.dateOfBirth = i18n.t("validation.dateOfBirthRequired");
  } else {
    const today = new Date();
    const birthDate = new Date(formData.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear(); // Используем let вместо const
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--; // Теперь изменение допустимо
    }

    if (age < 18) {
      errors.dateOfBirth = i18n.t("validation.dateOfBirthUnderage");
    }
  }

  if (!formData.gender) {
    errors.gender = i18n.t("validation.genderRequired");
  }

  if (formData.taxIdentificationNumber) {
    const taxIdRegex = /^[A-Za-z0-9]{8,15}$/; // Пример: только буквы и цифры, длиной от 8 до 15 символов
    if (!taxIdRegex.test(formData.taxIdentificationNumber)) {
      errors.taxIdentificationNumber = i18n.t("validation.taxIdentificationNumberInvalid");
    }
  }

  return errors;
};


export const validateAddressStep = (formData) => {
  let errors = {};

  if (!formData.country) errors.country = i18n.t("validation.countryRequired");
  if (!formData.city) errors.city = i18n.t("validation.cityRequired");
  if (!formData.zipCode) errors.zipCode = i18n.t("validation.zipCodeRequired");
  if (!formData.streetName) errors.streetName = i18n.t("validation.streetNameRequired");
  if (!formData.houseNumber) errors.houseNumber = i18n.t("validation.houseNumberRequired");

  return errors;
};

export const validateContactInfoStep = (formData) => {
  let errors = {};

  if (!formData.phone) {
    errors.phone = i18n.t("validation.phoneRequired");
  }

  // Проверяем, введен ли вебсайт и если введен, проверяем его формат
  if (formData.website) {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
      "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-zA-Z0-9@:%._+~#=]*)*" +
      "(\\?[;&a-zA-Z0-9%_.~+=-]*)?" +
      "(\\#[-a-zA-Z0-9_]*)?$",
      "i"
    );

    if (!urlPattern.test(formData.website)) {
      errors.website = i18n.t("validation.websiteInvalid");
    }
  }

  return errors;
};

const validatePhone = (phone) => {
  if (!phone.startsWith('+')) {
    return 'Phone number must start with + and country code';
  }
  if (phone.length < 10) {
    return 'Phone number is too short';
  }
  return null;
};