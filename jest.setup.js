const JSDOM = require('jsdom').JSDOM;
global.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
};

class SessionStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value;
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.sessionStorage = new SessionStorageMock();
// Fake the document and window objects.
const dom = new JSDOM();
global.document = dom.window.document;
global.window = document.parentWindow;
global.process.browser = true;

global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
};
global.window.matchMedia = () => {
    return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
    };
};
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });
