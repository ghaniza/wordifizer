import { IOptions } from "./interfaces/IOptions";

export const DEFAULT_OPTIONS: IOptions = {
    gender: 'male',
    useUnitySeparator: true,
    alwaysSeparateLastNumber: true
}

export const ERROR = {
    INVALID_GENDER: 'The constructor does not have a valid gender and this language does not have a general case',
    MISSING_GENDER: 'This language requires a gender',
    MISSING_PROPERTY: 'The translation file does not cover this number',
}