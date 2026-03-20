// Mock for CSS Modules — returns a Proxy so any className access returns the key
module.exports = new Proxy(
    {},
    {
        get(_, className) {
            return className;
        },
    }
);
