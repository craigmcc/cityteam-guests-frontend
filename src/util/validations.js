// Common Field Validation Rules and Data

// Validate date format (if required, validate that separately)
export const validateDate = (value) => {
    if (!value || (value.length === 0)) {
        return true;
    }
    if (!validateDatePattern.test(value)) {
        return false;
    }
    // TODO - range check on each component
    return true;
}

export const validateDatePattern = /^\d{4}-\d{2}-\d{2}$/;

// Validate month format (if required, validate that separately)
export const validateMonth = (value) => {
    if (!value || (value.length === 0)) {
        return true;
    }
    if (!validateMonthPattern.test(value)) {
        return false;
    }
    // TODO - range check on each component
    return true;
}

export const validateMonthPattern = /^\d{4}-\d{2}$/;

// Validate payment type (if required, validate that separately)
export const validatePaymentType = (value) => {
    if (!value || (value.length === 0)) {
        return true;
    }
    if (value.length !== 2) {
        return false;
    }
    validatePaymentTypes.forEach(paymentType => {
        if (paymentType.startsWith(value)) {
            return true;
        }
    });
    return false;
}

// First two characters of each option are the value to be checked
export const validatePaymentTypes = [
    "$$ - Cash",
    "AG - Agency",
    "CT - CityTeam",
    "FM - Free Mat",
    "MM - Medical Mat",
    "SW - Severe Weather",
    "UK - Unknown"
]

// Validate phone number format (if required, validate that separately)
export const validatePhone = (value) => {
    // Not a required field
    if (!value || (value.length === 0)) {
        return true;
    }
    let pattern = /^\d{3}-\d{3}-\d{4}$/;
    return pattern.test(value);
}

// Validate US state abbreviation (if required, validate that separately)
export const validateState = (value) => {
    if (!value || (value.length === 0)) {
        return true;
    }
    return value.length === 2 && validateStateAbbreviations.indexOf(value) >= 0;
}

export const validateStateAbbreviations =
    [ "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC",
      "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY",
      "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
      "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
      "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
      "VT", "VA", "WA", "WV", "WI", "WY" ];

// Validate time format (if required, validate that separately)
export const validateTime = (value) => {
    if (!value || (value.length === 0)) {
        return true;
    }
    if (!validateTimePattern.test(value)) {
        return false;
    }
    // TODO - range check on each component
    return true;
}

export const validateTimePattern = /^\d{2}:\d{2}$|^\d{2}:\d{2}:\d{2}$/

// Validate zip code format (if required, validate that separately)
export const validateZipCode = (value) => {
    if (!value || (value.length === 0)) {
        return true;
    }
    return validateZipCodePattern.test(value);
}

export const validateZipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
