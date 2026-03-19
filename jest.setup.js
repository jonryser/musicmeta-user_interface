require('@testing-library/jest-dom');

global.process.browser = true;

global.requestAnimationFrame = function (callback) {
    setTimeout(callback, 0);
};

if (global.window) {
    global.window.matchMedia = global.window.matchMedia || function () {
        return {
            matches: false,
            addListener: () => {},
            removeListener: () => {},
        };
    };
    global.window.resizeTo = function (width, height) {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
        window.dispatchEvent(new Event('resize'));
    };
}
