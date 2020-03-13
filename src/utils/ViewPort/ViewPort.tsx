import { IViewport } from './ViewPortProps';

/**
 * Returns viewport dimensions.
 * Works server side though it returns defaults
 * as there is no viewport server side.
 */
export const getViewport = (): IViewport => {
    const viewport: IViewport = {
        bottom: 768,
        left: 0,
        right: 1366,
        top: 0,
    };
    // Checking for process.browser determines client side or not.
    // To ensure process.browser is available, add a global.d.ts file to the
    // root of the project with the following in it:
    // declare namespace NodeJS {
    //     interface Process {
    //         browser: boolean;
    //     }
    // }
    if (process.browser) {
        viewport.bottom = window.innerHeight || document.documentElement.clientHeight;
        viewport.right = window.innerWidth || document.documentElement.clientWidth;
    }
    return viewport;
};

/**
 * Returns true if the passed container is
 * in the viewport at all.
 * Returns false if the passed container is
 * outside the viewport completely.
 * @param container
 */
export const isInViewport = (container: ClientRect): boolean => {
    return container.top >= 0 && container.left >= 0 && container.top < getViewport().bottom;
};
