import { getViewport, isInViewport } from './ViewPort';
import { IViewport } from './ViewPortProps';

describe('ViewPort ', () => {

    it('getViewport should return an object with the properies top, right, bottom, and left.', () => {
        const value: IViewport = getViewport();
        expect(value).toHaveProperty('top');
        expect(value).toHaveProperty('right');
        expect(value).toHaveProperty('bottom');
        expect(value).toHaveProperty('left');
    });

    it('getViewport should return the default a top and left value of 0.', () => {
        const value: IViewport = getViewport();
        expect(value.top).toEqual(0);
        expect(value.left).toEqual(0);
    });

    it('getViewport should return a window width of 1920.', () => {
        window.resizeTo(1920, 800);
        const value: IViewport = getViewport();
        expect(value.right).toBeGreaterThan(0);
        expect(value.right).toEqual(1920);
    });

    it('getViewport should return a window height of 800.', () => {
        window.resizeTo(1920, 800);
        const value: IViewport = getViewport();
        expect(value.bottom).toBeGreaterThan(0);
        expect(value.bottom).toEqual(800);
    });

    it('isInViewport should return true. Then isInViewport should return false.', () => {
        window.resizeTo(1920, 800);
        const outsideViewport: ClientRect = {
            bottom: 501,
            height: 500,
            left: -1,
            right: 501,
            top: -1,
            width: 500,
        };
        const value: boolean = isInViewport(outsideViewport);
        expect(value).toBeFalsy();
    });

    it('isInViewport should return true. Then isInViewport should return true.', () => {
        window.resizeTo(1920, 800);
        const inViewport: ClientRect = {
            bottom: 801,
            height: 500,
            left: 301,
            right: 801,
            top: 301,
            width: 500,
        };
        let value: boolean = isInViewport(inViewport);
        expect(value).toBeTruthy();
    });
});
