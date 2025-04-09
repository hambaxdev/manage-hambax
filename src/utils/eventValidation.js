import i18n from 'i18next';

export const validateEventDetails = (eventData) => {
    const errors = {};

    // Title validation
    if (!eventData.title.trim()) {
        errors.title = i18n.t('validation.eventDetails.titleRequired');
    }

    // Event type validation
    if (!eventData.eventType) {
        errors.eventType = i18n.t('validation.eventDetails.eventTypeRequired');
    }

    // Description validation (no external links)
    if (!eventData.description.trim()) {
        errors.description = i18n.t('validation.eventDetails.descriptionRequired');
    } else if (/(http|https):\/\/[^\s]+/.test(eventData.description)) {
        errors.description = i18n.t('validation.eventDetails.descriptionNoLinks');
    }

    // Event date validation
    if (!eventData.eventDate) {
        errors.eventDate = i18n.t('validation.eventDetails.eventDateRequired');
    } else {
        const selectedDate = new Date(eventData.eventDate);
        const currentDate = new Date();
        if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
            errors.eventDate = i18n.t('validation.eventDetails.eventDatePast');
        }
    }

    // Start time validation
    if (!eventData.startTime) {
        errors.startTime = i18n.t('validation.eventDetails.startTimeRequired');
    }

    
    // Age restriction validation
    if (!eventData.ageRestriction) {
        errors.ageRestriction = i18n.t('validation.eventDetails.ageRestrictionRequired');
    }

    return errors;
};

export const validateAddress = (address) => {
    const errors = {};

    // Location validation
    if (!address.location || !address.location.trim()) {
        errors.location = i18n.t('validation.eventAddress.locationRequired');
    }
    
    // Street validation
    if (!address.street.trim()) {
        errors.street = i18n.t('validation.eventAddress.streetRequired');
    }

    // Building validation
    if (!address.building.trim()) {
        errors.building = i18n.t('validation.eventAddress.buildingRequired');
    }

    // City validation
    if (!address.city.trim()) {
        errors.city = i18n.t('validation.eventAddress.cityRequired');
    }

    // Country validation
    if (!address.country) {
        errors.country = i18n.t('validation.eventAddress.countryRequired');
    }

    // Postal code validation
    if (!address.postalCode.trim()) {
        errors.postalCode = i18n.t('validation.eventAddress.postalCodeRequired');
    }

    return errors;
};

export const validateFixedPrice = ({ ticketPrice, limitTickets, ticketLimit }) => {
    const errors = {};

    if (!ticketPrice || parseFloat(ticketPrice) <= 0) {
        errors.ticketPrice = i18n.t('validation.pricingOptions.fixedPriceRequired');
    }

    if (limitTickets && (!ticketLimit || parseInt(ticketLimit, 10) <= 0)) {
        errors.ticketLimit = i18n.t('validation.pricingOptions.ticketLimitRequired');
    }

    return errors;
};

export const validateTicketPools = (pools) => {
    const errors = {
        general: '',
        pools: [], // Здесь будут ошибки для каждого пула
    };

    // Проверка на минимальное количество пулов
    if (pools.length < 2) {
        errors.general = i18n.t('validation.pricingOptions.minimumPoolsRequired');
    }

    // Проверка каждого пула
    pools.forEach((pool, index) => {
        const poolErrors = {};

        if (!pool.name.trim()) {
            poolErrors.name = i18n.t('validation.pricingOptions.poolNameRequired');
        }
        if (!pool.price || parseFloat(pool.price) <= 0) {
            poolErrors.price = i18n.t('validation.pricingOptions.poolPriceRequired');
        }
        if (!pool.startDate) {
            poolErrors.startDate = i18n.t('validation.pricingOptions.poolStartDateRequired');
        }
        if (!pool.endDate) {
            poolErrors.endDate = i18n.t('validation.pricingOptions.poolEndDateRequired');
        }
        if (new Date(pool.startDate) > new Date(pool.endDate)) {
            poolErrors.dates = i18n.t('validation.pricingOptions.poolDatesInvalid');
        }
        if (pool.limitTickets && (!pool.quantity || parseInt(pool.quantity, 10) <= 0)) {
            poolErrors.quantity = i18n.t('validation.pricingOptions.poolQuantityRequired');
        }

        // Если есть ошибки для текущего пула, добавляем их в массив
        if (Object.keys(poolErrors).length > 0) {
            errors.pools[index] = poolErrors;
        }
    });

    // Убираем ключ `pools`, если он пуст
    if (errors.pools.length === 0) {
        delete errors.pools;
    }

    // Если нет общей ошибки и ошибок пулов, возвращаем пустой объект
    if (!errors.general && !errors.pools) {
        return {};
    }

    return errors;
};

