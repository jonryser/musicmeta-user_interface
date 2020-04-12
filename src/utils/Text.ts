export const removeProtocol = (stringToClean: string) => {
    if (!stringToClean) { return ``; }
    return stringToClean.replace(/^\/\/|^.*?:(\/\/)?/, ``).replace(/^\//, ``);
};

export const removeProtocolOrSlash = (stringToClean: string) => {
    return removeProtocol(stringToClean).replace(/^\//, ``);
};

export const isEmailValid = (value: string): boolean => {
    const regex = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-][a-zA-Z0-9-]+\\.[a-zA-Z0-9-.][a-zA-Z0-9-.]+$');
    return regex.test(value);
};

export const isPhoneNumberValid = (value: string): boolean => {
    // this is by far not comprehensive, just was put in to support emailSubscription page
    const regex = new RegExp('^\\d{3}\\.{1}\\d{3}\\.{1}\\d{4}$');
    return regex.test(value);
};

export const formatPhoneNumberWithDot = (value: string): string => {
    const phoneRegex = new RegExp('^[0-9.]*$');
    const numbersOnlyRegex = new RegExp('^[0-9]*$');
    let tempNumber = value;
    if (value && value.length > 0 && phoneRegex.test(value)) {
        tempNumber = value.indexOf('.') > 0 ? value.replace(/[^0-9]/g, '') : value;
    } else {
        return value;
    }
    if (tempNumber && tempNumber.length === 3 && numbersOnlyRegex.test(tempNumber)) {
        return tempNumber + '.';
    } else if (tempNumber && tempNumber.length === 6 && numbersOnlyRegex.test(tempNumber)) {
        return `${tempNumber.substr(0, 3)}.${tempNumber.substr(3, 3)}.`;
    } else if (tempNumber && tempNumber.length === 10 && numbersOnlyRegex.test(tempNumber)) {
        return `${tempNumber.substr(0, 3)}.${tempNumber.substr(3, 3)}.${tempNumber.substr(6)}`;
    } else {
        return value;
    }
};
