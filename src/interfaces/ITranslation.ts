export type Gender = {
    male?: string;
    female?: string;
    neutral?: string;
}

export type NumberSet = {
    [key: string]: string | Gender;
};

export type OrderSet = {
    exponent: number,
    singular?: Gender | string;
    plural?: Gender | string;
    all?: Gender | string;
}

export interface ITranslation {
    separator?: string;
    orderSeparator?: string;
    alwaysSeparateLastNumber?: boolean;
    units: NumberSet;
    tens: NumberSet;
    hundreds: NumberSet;
    other: OrderSet[];
    exceptions?: {
        type: 'pre' | 'post',
        func: (value: string, n: number) => string
    }[]
}