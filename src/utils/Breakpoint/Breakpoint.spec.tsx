import {
    getCurrentBreakpoint,
    getCurrentOrientation,
    getDerivedValueAtWidth,
    parsePropsForBreakPoints,
} from './Breakpoint';
import { BreakpointData } from './BreakpointProps';

const data: { [key: string]: BreakpointData } = {
    bgImage: { Infinity: `/path/to/image.png` },
    copy: {
        Infinity: `Hi, I'm for Desktop.`,
        1024: `Hi, I'm smaller.`,
        960: false,
        767: null,
        640: ``,
    },
    empty: {},
    heading: {
        Infinity: `Hi, I'm for Desktop.`,
    },
    undefined: {
        Infinity: undefined,
    },
};

describe(`Breakpoint `, () => {
    it(`getDerivedValueAtWidth should return the default.`, () => {
        const noData: string = ``;
        const variationId: { variationID: string } = { variationID: `plokijuh` };
        let value: string = getDerivedValueAtWidth(noData, Infinity, `Default Value`);
        expect(value).toMatch(`Default Value`);
        value = getDerivedValueAtWidth(data.empty, 640, `Default Value`);
        expect(value).toMatch(`Default Value`);
        value = getDerivedValueAtWidth(variationId, 1024, `Default Value`);
        expect(value).toMatch(`Default Value`);
        value = getDerivedValueAtWidth(data.undefined, 1440, `Default Value`);
        expect(value).toMatch(`Default Value`);

    });

    it(`getDerivedValueAtWidth should return the passed data.`, () => {
        const arrayData: string[] = [`Hello`];
        const objectData: { value: string } = { value: `Hello` };
        const stringData: string = `Hello`;
        let value: string = getDerivedValueAtWidth(arrayData, Infinity);
        expect(value).toEqual(arrayData);
        value = getDerivedValueAtWidth(objectData, Infinity);
        expect(value).toEqual(objectData);
        value = getDerivedValueAtWidth(stringData, Infinity);
        expect(value).toMatch(stringData);
    });

    it(`getDerivedValueAtWidth should return the heading value at Infinity.`, () => {
        const value: string = getDerivedValueAtWidth(data.heading, Infinity);
        expect(value).toMatch(`Hi, I'm for Desktop.`);
    });

    it(`getDerivedValueAtWidth should return the copy value at 1024.`, () => {
        const value: string = getDerivedValueAtWidth(data.copy, 1024);
        expect(value).toMatch(`Hi, I'm smaller.`);
    });

    it(`getDerivedValueAtWidth should return the heading value at Infinity even though 1024 is requested.`, () => {
        const value: string = getDerivedValueAtWidth(data.heading, 1024);
        expect(value).toMatch(`Hi, I'm for Desktop.`);
    });

    it(`getDerivedValueAtWidth should return the copy value at 640 even though it is an empty string.`, () => {
        const value: string = getDerivedValueAtWidth(data.copy, 640);
        expect(value).toMatch(``);
    });

    it(`getDerivedValueAtWidth should return false at 950.`, () => {
        const value: string = getDerivedValueAtWidth(data.copy, 950);
        expect(value).toEqual(false);
    });

    it(`getCurrentBreakpoint should return 1920.`, () => {
        window.resizeTo(1920, 800);
        const value: number = getCurrentBreakpoint();
        expect(value).toEqual(1920);
    });

    it(`getCurrentOrientation should return "L" for landscape.`, () => {
        window.resizeTo(1920, 800);
        const value: string = getCurrentOrientation();
        expect(value).toEqual(`L`);
    });

    it(`getCurrentOrientation should return "P" for portrait.`, () => {
        window.resizeTo(800, 1920);
        const value: string = getCurrentOrientation();
        expect(value).toEqual(`P`);
    });

    it(`parsePropsForBreakPoints should return the default props.`, () => {
        window.resizeTo(1920, 800);
        const props: { bang: any } = { bang: `pow` };
        const value: string = parsePropsForBreakPoints(props, 1024);
        expect(value).toMatchObject({ data: {}, options: {} });
    });

    it(`parsePropsForBreakPoints should return an object with the values from Infinity.`, () => {
        const props: { data: any; options: any } = {
            data: {
                value: { Infinity: `data` },
            },
            options: {
                value: { Infinity: `options` },
            },
        };
        const value: string = parsePropsForBreakPoints(props, 1024);
        expect(value).toMatchObject({
            data: { value: `data` },
            options: { value: `options` },
        });
    });

    it(`parsePropsForBreakPoints should return an object identical to the props object.`, () => {
        const props: { data: any; options: any } = {
            data: {
                value: `data`,
            },
            options: {
                value: `options`,
            },
        };
        const value: string = parsePropsForBreakPoints(props, 1024);
        expect(value).toMatchObject(props);
    });

    it(`parsePropsForBreakPoints should return an object with an options.class value of "firstClass".`, () => {
        const props: { data: any; options: any } = {
            data: {
                value: `data`,
            },
            options: {
                className: [`firstClass`],
            },
        };
        const value: string = parsePropsForBreakPoints(props, 1024);
        expect(value).toMatchObject({
            data: {
                value: `data`,
            },
            options: {
                className: `firstClass`,
            },
        });
    });
});
