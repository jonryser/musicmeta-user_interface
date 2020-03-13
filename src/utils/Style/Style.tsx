import { getDerivedValueAtWidth } from './../Breakpoint';
import { BreakpointData } from './../Breakpoint/BreakpointProps';

/**
 * Builds a space separated string of classnames derived from the
 * className object passed in.
 * If a baseClass is passed in, the baseCalss will be added to the
 * returned string.
 * If a breakpoiint is passed in, it will attempt to get the className
 * value from width (BreakPointData may be passed in).
 * @param className
 * @param baseClass
 * @param breakpoint
 */
export const buildClassName = (
    className: string | string[] | BreakpointData,
    baseClass?: string,
    breakpoint?: number,
): string => {
    if (className) {
        if (breakpoint) {
            className = getDerivedValueAtWidth(className, breakpoint, ``);
        }
        let customClass: string = className as string;
        if (typeof className !== 'string') {
            const joinClass: string[] = className as string[];
            customClass = joinClass.join(` `).trim();
        }
        return baseClass ? [baseClass, customClass].join(` `).trim() : customClass;
    }
    return baseClass || ``;
};

/**
 * Utility for parsing config options from CMS with Infinity structure
 * @param configData
 * @param baseClass
 * @param breakpoint
 */
export const buildConfigClasses = (configData: any, baseClass?: string, breakpoint?: number): string => {
    const configClasses = [];

    if (!configData) {
        return baseClass || ``;
    } else if (typeof configData === 'string') {
        return baseClass ? [baseClass, configData].join(` `).trim() : configData;
    }

    if (Array.isArray(configData)) {
        configData.forEach((item) => {
            if (!item) {
                return;
            }
            if (typeof item === 'string') {
                configClasses.push(item);
            } else {
                const complex: string[] = complexClasses(item, breakpoint);
                complex.forEach((classname) => {
                    configClasses.push(classname);
                });
            }
        });
        return baseClass ?
            [baseClass, configClasses.join(` `).trim()].join(` `).trim()
            : configClasses.join(` `).trim();
    } else {
        return baseClass ?
            [baseClass, complexClasses(configData, breakpoint).join(` `).trim()].join(` `).trim()
            : complexClasses(configData, breakpoint).join(` `).trim();
    }
};

/**
 * Accepts any sort of className configuration and returns an Array of classes.
 * @param classObj
 * @param breakpoint
 */
export const complexClasses = (classObj: any, breakpoint: number): string[] => {
    const classArr = [];
    if (classObj.Infinity) {
        // Infinity -> structure, pass to breakpoint util
        const classObjData = getDerivedValueAtWidth(classObj, breakpoint, {});
        if (typeof classObjData === 'string') {
            classArr.push(classObjData);
        } else {
            Object.keys(classObjData).forEach((key) => {
                if (key !== 'variationId') {
                    classArr.push(classObjData[key]);
                }
            });
        }
    } else if (Array.isArray(classObj)) {
        // styles array
        classObj.forEach((classname) => { classArr.push(classname); });
    } else if (typeof classObj !== 'string') {
        // style object with key/value pairs from ContentCorrector
        Object.keys(classObj).forEach((key) => {
            if (key !== 'variationId') {
                classArr.push(classObj[key]);
            }
        });
    } else {
        classArr.push(classObj);
    }
    return classArr;
};
