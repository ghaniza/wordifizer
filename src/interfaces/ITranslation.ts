type Gender = {
    male?: string;
    female?: string;
    neutral?: string;
}

type NumberSet = {
    [key: string]: string | Gender;
};

export interface ITranslation {
    unitSeparator?: string;
    orderSeparator?: string;
    units: NumberSet;
    tens: NumberSet;
    hundreds: NumberSet;
    other: {
        exponent: number,
        singular?: Gender | string;
        plural?: Gender | string;
        all?: Gender | string;
    }[];
    exceptions?: {
        type: 'pre' | 'post',
        func: (value: string, n: number) => string
    }[]
}