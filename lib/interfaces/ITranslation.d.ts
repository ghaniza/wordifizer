export declare type Gender = {
    male?: string;
    female?: string;
    neutral?: string;
};
export declare type NumberSet = {
    [key: string]: string | Gender;
};
export declare type OrderSet = {
    exponent: number;
    singular?: Gender | string;
    plural?: Gender | string;
    all?: Gender | string;
};
export interface ITranslation {
    separator?: string;
    orderSeparator?: string;
    unitSeparator?: string;
    ignoreHundredsSeparator?: boolean;
    units: NumberSet;
    tenths: NumberSet;
    hundreds: NumberSet;
    other: OrderSet[];
    exceptions?: {
        type: 'pre' | 'post';
        func: (value: string, n: number) => string;
    }[];
}
//# sourceMappingURL=ITranslation.d.ts.map