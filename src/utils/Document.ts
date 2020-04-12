/* Utility functions for document specific callbacks */

export const docReady = (handleDocumentReady: () => void) => {
    if (process.browser && document) {
        document.removeEventListener('readystatechange', handleDocumentReady);
        if (document.readyState === 'loading') {
            document.addEventListener('readystatechange', handleDocumentReady, false);
        } else {
            handleDocumentReady();
        }
    }
};

export const docComplete = (handleDocumentComplete: () => void) => {
    if (process.browser && document) {
        document.removeEventListener('readystatechange', handleDocumentComplete);
        if (document.readyState === 'interactive') {
            document.addEventListener('readystatechange', () => setTimeout(handleDocumentComplete, 1), false);
        } else {
            setTimeout(handleDocumentComplete, 2);
        }
    }
};
