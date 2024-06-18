
export const isObject = (arg: any) => arg && typeof arg === 'object' && !Array.isArray(arg);

export const prepareSearchFilterArray = ({keys = [], regex}: {keys: string[], regex: RegExp}) => {
    return keys.map((key) => ({
        [key]: regex,
    }));
};