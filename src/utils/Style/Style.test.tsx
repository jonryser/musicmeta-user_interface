import { BreakpointData } from './../Breakpoint/BreakpointProps';
import { buildClassName, buildConfigClasses, complexClasses } from './Style';

describe(`Style `, () => {

    it(`buildClassName should return an empty string`, () => {
        let value: string = buildClassName(``);
        expect(value).toEqual(``);
        value = buildClassName(``, ``);
        expect(value).toEqual(``);
        value = buildClassName([``]);
        expect(value).toEqual(``);
        value = buildClassName([``], ``);
        expect(value).toEqual(``);
    });

    it(`buildClassName should return "baseClass firstClass" when BreakpointData and a breakpoint are passed.`, () => {
        const classBreakpointObj: BreakpointData = {
            Infinity: `firstClass`,
        };
        const baseClass: string = `baseClass`;
        let value: string = buildClassName(classBreakpointObj, baseClass, 1024);
        expect(value).toEqual(`baseClass firstClass`);
    });

    it(`buildClassName should return the base class.`, () => {
        const baseClass: string = `baseClass`;
        let value: string = buildClassName(``, baseClass);
        expect(value).toEqual(baseClass);
        value = buildClassName([``], baseClass);
        expect(value).toEqual(`${baseClass}`);
        value = buildClassName(undefined, baseClass);
        expect(value).toEqual(baseClass);
        value = buildClassName([undefined], baseClass);
        expect(value).toEqual(`${baseClass}`);
    });

    it(`buildClassName should return the classes concatenated with spaces.`, () => {
        const baseClass: string = `baseClass`;
        const customClass: string = `customClass`;
        let value: string = buildClassName(customClass, baseClass);
        expect(value).toEqual(`${baseClass} ${customClass}`);
        value = buildClassName([customClass, baseClass], ``);
        expect(value).toEqual(`${customClass} ${baseClass}`);
        value = buildClassName([customClass, baseClass]);
        expect(value).toEqual(`${customClass} ${baseClass}`);
        value = buildClassName([customClass, customClass], baseClass);
        expect(value).toEqual(`${baseClass} ${customClass} ${customClass}`);
    });

    it(`complexClasses should return the base class.`, () => {
        const classArray: string[] = [
            `baseClass`,
            `plokijuh`,
        ];
        const classBreakpointObj: BreakpointData = {
            Infinity: {
                baseClass: `baseClass`,
                variationId: `plokijuh`,
            },
        };
        const classObj: {[key: string]: string} = {
            baseClass: `baseClass`,
            variationId: `plokijuh`,
        };
        let value: string[] = complexClasses(classArray, 1024);
        expect(value).toEqual([`baseClass`, `plokijuh`]);
        value = complexClasses(classBreakpointObj, 1024);
        expect(value).toEqual([`baseClass`]);
        value = complexClasses(classObj, 1024);
        expect(value).toEqual([`baseClass`]);
    });

    it(`buildConfigClasses should return the baseClass.`, () => {
        let classArray: any;
        let baseClass: string = `baseClass`;
        let value: string = buildConfigClasses(classArray, baseClass, 1024);
        expect(value).toEqual(`baseClass`);
        value = buildConfigClasses(classArray, baseClass);
        expect(value).toEqual(`baseClass`);
    });

    it(`buildConfigClasses should an empty string.`, () => {
        let classArray: any;
        let baseClass: string;
        let value: string = buildConfigClasses(classArray, baseClass, 1024);
        expect(value).toEqual(``);
        value = buildConfigClasses(classArray, baseClass);
        expect(value).toEqual(``);
    });

    it(`buildConfigClasses should return a space separated string of classes when the classArray is a string.`, () => {
        let classArray: any = `firstClass`;
        let baseClass: string = `baseClass`;
        let value: string = buildConfigClasses(classArray, baseClass, 1024);
        expect(value).toEqual(`baseClass firstClass`);
        value = buildConfigClasses(classArray, baseClass);
        expect(value).toEqual(`baseClass firstClass`);
        baseClass = ``;
        value = buildConfigClasses(classArray, baseClass);
        expect(value).toEqual(`firstClass`);
    });

    it(`buildConfigClasses should return a space separated string of classes when the classArray is a string Array.`, () => {
        let classArray: any = [`firstClass`];
        let baseClass: string = `baseClass`;
        let value: string = buildConfigClasses(classArray, baseClass, 1024);
        expect(value).toEqual(`baseClass firstClass`);
        value = buildConfigClasses(classArray, baseClass);
        expect(value).toEqual(`baseClass firstClass`);
    });

    it(`buildConfigClasses should return the baseClass when the classArray is an empty Array.`, () => {
        let classArray: any = [``];
        let baseClass: string = `baseClass`;
        let value: string = buildConfigClasses(classArray, baseClass, 1024);
        expect(value).toEqual(`baseClass`);
        value = buildConfigClasses(classArray, baseClass);
        expect(value).toEqual(`baseClass`);
    });

    it(`buildConfigClasses should return a space separated string of classes when the classArray is an array of complex objects`, () => {
        let classArray: any = {
            Infinity: {
                baseClass: `firstClass`,
                variationId: `plokijuh`,
            },
        };
        let baseClass: string = `baseClass`;
        let value: string = buildConfigClasses(classArray, baseClass, 1024);
        expect(value).toEqual(`baseClass firstClass`);
        baseClass = ``;
        value = buildConfigClasses(classArray, baseClass, 1024);
        expect(value).toEqual(`firstClass`);
    });

    it(`buildConfigClasses should return a space separated string of classes when the classData is an array of shallow objects`, () => {
        let classData: any = [{ Infinity: 'firstClass' }];
        let baseClass: string = `baseClass`;
        let value: string = buildConfigClasses(classData, baseClass, 1024);
        expect(value).toEqual(`baseClass firstClass`);
        baseClass = ``;
        value = buildConfigClasses(classData, baseClass, 1024);
        expect(value).toEqual(`firstClass`);
    });

    it(`buildConfigClasses should return a space separated string of classes when the classArray is a complex object`, () => {
        let classArray: any = {
            Infinity: {
                baseClass: `firstClass`,
                variationId: `plokijuh`,
            },
        };
        let baseClass: string = `baseClass`;
        let value: string = buildConfigClasses(classArray, baseClass, 1024);
        expect(value).toEqual(`baseClass firstClass`);
        baseClass = ``;
        value = buildConfigClasses(classArray, baseClass, 1024);
        expect(value).toEqual(`firstClass`);
    });

    it(
        `buildConfigClasses should return a space separated string of classes ` +
        `when the classArray is a complex object and a string.`,
        () => {
            let classArray: any = [{
                Infinity: {
                    baseClass: `firstClass`,
                    variationId: `plokijuh`,
                },
            }, `otherClass`];
            let baseClass: string = `baseClass`;
            let value: string = buildConfigClasses(classArray, baseClass, 1024);
            expect(value).toEqual(`baseClass firstClass otherClass`);
            baseClass = ``;
            value = buildConfigClasses(classArray, baseClass, 1024);
            expect(value).toEqual(`firstClass otherClass`);
        },
    );

    it(`complexClasses should return the firstClass and secondClass as an Array from an Array of strings.`, () => {
        const classArray: string[] = [
            `firstClass`,
            `secondClass`,
        ];
        let value: string[] = complexClasses(classArray, 1024);
        expect(value).toEqual([`firstClass`, `secondClass`]);
    });

    it(`complexClasses should return the baseClass in an Array from BreakpointData.`, () => {
        const classBreakpointObj: BreakpointData = {
            Infinity: {
                baseClass: `baseClass`,
                variationId: `plokijuh`,
            },
        };
        let value: string[] = complexClasses(classBreakpointObj, 1024);
        expect(value).toEqual([`baseClass`]);
    });

    it(`complexClasses should return the baseClass in an Array from an object.`, () => {
        const classObj: {[key: string]: string} = {
            baseClass: `baseClass`,
            variationId: `plokijuh`,
        };
        let value: string[] = complexClasses(classObj, 1024);
        expect(value).toEqual([`baseClass`]);
    });

    it(`complexClasses should return "firstClass" as an Array.`, () => {
        const firstClass: string = `firstClass`;
        let value: string[] = complexClasses(firstClass, 1024);
        expect(value).toEqual([`firstClass`]);
    });
});
