// babel.config.js
module.exports = api => {
    // You can use isTest to determine what presets and plugins to use.
    const isTest = api.env('test');
    return {
        presets: [
            [
                '@babel/preset-env',
                { targets: { node: 'current' } },
            ],
        ],
    }
};