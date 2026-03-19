import React from 'react';
import { render } from '@testing-library/react';

// Components.
import { HeadData } from './HeadProps';
import Head from './Head';

const headData1: HeadData = {
    link: [
        {
            href: `https://someUrl1.com`,
            hrefLang: `en`,
            rel: `linkTag1`,
        },
        {
            href: `https://someUrl2.com`,
            hrefLang: `fr`,
            rel: `linkTag2`,
        },
    ],
    script: [
        {
            type: `type1`,
            value: `value1`,
        },
        {
            type: `type2`,
            value: `value2`,
        },
    ],
    scriptCall: [
        {
            async: true,
            defer: true,
            src: `https://someUrl1.com`,
            type: `application/javascript`,
        },
        {
            src: `https://someUrl1.com`,
        },
    ],
    title: `Test Head - 1`,
};

const headData2: HeadData = {
    link: [
        {
            href: `https://someUrl2.com`,
            hrefLang: `fr`,
            rel: `linkTag2`,
        },
        {
            href: `https://someUrl1.com`,
            hrefLang: `en`,
            rel: `linkTag1`,
        },
    ],
    script: [
        {
            type: `type2`,
            value: `value2`,
        },
        {
            type: `type1`,
            value: `value1`,
        },
    ],
    title: `Test Head - 2`,
};

const headData3: HeadData = {};

const headData4: HeadData = {
    link: [
        {
            hrefLang: `es`,
        },
    ],
    script: [
        {
            value: `value4`,
        },
        {
            type: `type4`,
        },
    ],
    title: `Test Head - 4`,
};

describe(`Head `, () => {
    it(
        `should render correctly initially and then when the passed data changes and again when no data is passed.`,
        () => {
            const { rerender } = render(<Head data={headData1} />);
            rerender(<Head data={headData2} />);
            rerender(<Head data={headData3} />);
        },
    );

    it(
        `should render correctly initially and then when new data is passed that is identical.`,
        () => {
            const { rerender } = render(<Head data={headData1} />);
            rerender(<Head data={headData1} />);
        },
    );

    it(
        `should render correctly when data is passed does not contain complete or valid content.`,
        () => {
            const { container } = render(<Head data={headData4} />);
            expect(container).toBeDefined();
        },
    );

    it(
        `should NOT render when NO data is passed and ` +
        `should render when props are updated with data.`,
        () => {
            const { rerender } = render(<Head data={undefined} />);
            rerender(<Head data={undefined} />);
        },
    );

    it(
        `should NOT render when NO data is passed and ` +
        `should still not render when props are updated with no data.`,
        () => {
            const { rerender } = render(<Head data={undefined} />);
            rerender(<Head data={headData1} />);
        },
    );
});
