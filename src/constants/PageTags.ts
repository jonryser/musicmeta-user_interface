import { PageTags } from './../components/Head/HeadProps';

export const pageTags: PageTags = {
    link: {
        stylesheet: [
            'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
        ],
    },
    meta: [
        {
            charSet: 'utf-8',
        },
        {
            content: `IE=edge`,
            httpEquiv: `X-UA-Compatible`,
        },
        {
            content: `user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width`,
            name: `viewport`,
        },
    ],
};
