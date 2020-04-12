import { getViewport } from './../ViewPort';
import { BreakpointData } from './BreakpointProps';
import { buildConfigClasses } from './../Style';

export const LANDSCAPE: string = 'L';
export const PORTRAIT: string = 'P';

/**
 * Returns the current breakpoint of the page.
 * Leverages the Viewport util. This works server side,
 * but will return a default value as there is no breakpoint server side.
 */
export const getCurrentBreakpoint = (): number => {
    return getViewport().right;
};

/**
 * Returns "L" when landscape, and "P" when portrait.
 */
export const getCurrentOrientation = (): string => {
    return getViewport().bottom > getViewport().right ? PORTRAIT : LANDSCAPE;
};

/**
 *
 * @param props
 * @param breakpoint
 */
export const parsePropsForBreakPoints = (props: any, breakpoint: number): any => {
    const newObj: any = { data: {}, options: {} };
    if (props && props.data) {
        for (const i in props.data) {
            if (i && props.data[i] && props.data[i].Infinity) {
                newObj.data[i] = getDerivedValueAtWidth(props.data[i], breakpoint);
            } else {
                newObj.data[i] = props.data[i];
            }
        }
    }
    if (props && props.options) {
        for (const i in props.options) {
            if (i && i === 'className') {
                newObj.options.className = buildConfigClasses(props.options.className, ``, breakpoint);
            } else if (i && props.options[i] && props.options[i].Infinity) {
                newObj.options[i] = getDerivedValueAtWidth(props.options[i], breakpoint);
            } else {
                newObj.options[i] = props.options[i];
            }
        }
    }
    return newObj;
}

/**
 * Returns the highest value from BreakpointData closest to the width passed.
 * For example, if the BreakPointData object
 *     {
 *         Infinity: true,
 *         1024: false,
 *         767: 'maybe',
 *     }
 * is passed with the width of 1162, false will be returned.
 * If no data is passed, it will return the optional passed default.
 * If the passed data is an empty object or an object with only a
 * "variationID" property, the optional passed default will be returned.
 * If the passed data is a string or an Array, the data will be returned.
 * If the highest value found (lower than the passed width) is undefined,
 * the optional passed default will be returned.
 *
 * @param data
 * @param width
 * @param defaults
 */
export const getDerivedValueAtWidth = (data: BreakpointData, width: number, defaults?: any): any => {
    if (
        !data ||
        (
            !Array.isArray(data) &&
            typeof data === 'object' &&
            (Object.keys(data).length < 2 && data.hasOwnProperty('variationID') ||
                Object.keys(data).length === 0)
        )
    ) {
        return defaults;
    }
    if (
        typeof data === 'string' ||
        typeof data === 'boolean' ||
        Array.isArray(data) ||
        (
            !Array.isArray(data) &&
            typeof data === 'object' &&
            !data.hasOwnProperty('Infinity') &&
            !data.hasOwnProperty(Infinity)
        )
    ) {
        return data;
    }
    let found: number = Infinity;
    for (const key in data) {
        if (data[key] || data[key] === `` || data[key] === false) {
            const currentKey: number = parseFloat(key);
            if (currentKey < found && currentKey >= width) {
                found = currentKey;
            }
        }
    }
    return typeof data[found] !== 'undefined' ? data[found] : defaults;
};

export const getDerivedValueAtWidthAndOrientation = (data: BreakpointData, breakpoint: number, orientation: string, defaults?: any): any => {
    const breakpointData = getDerivedValueAtWidth(data, breakpoint, defaults);
    const o = orientation ? orientation.toLowerCase() : 'l';
    return breakpointData && breakpointData[o] ? breakpointData[o] : breakpointData;
};
