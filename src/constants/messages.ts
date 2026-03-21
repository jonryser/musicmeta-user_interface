export const STATUS = {
    LOADING: 'Loading...',
    LOADING_ELLIPSIS: 'Loading\u2026',
    LOADING_CREDITS: 'Loading credits\u2026',
    LOADING_LINKS: 'Loading links\u2026',
};

export const ERRORS = {
    WORK_NOT_FOUND: 'Work not found.',
    PERSON_NOT_FOUND: 'Person not found.',
    FAILED_CREATE_WORK: 'Failed to create work.',
    FAILED_UPDATE_TITLE: 'Failed to update title.',
    FAILED_UPDATE_DESCRIPTION: 'Failed to update description.',
    FAILED_DELETE_WORK: 'Failed to delete work.',
    FAILED_ADD_CREDIT: 'Failed to add credit.',
    FAILED_ADD_LINK: 'Failed to add link.',
    TITLE_REQUIRED: 'Title is required.',
    PERSON_ROLE_REQUIRED: 'Person and Role are required.',
    URL_REQUIRED: 'URL is required.',
    CLIENT_ERROR: 'An error occurred on client',
    SERVER_ERROR: (statusCode: number) => `An error ${statusCode} occurred on server`,
    LOADING_WORKS: (message: string) => `Error loading works: ${message}`,
    LOADING_PEOPLE: (message: string) => `Error loading people: ${message}`,
    LOADING_CREDITS: (message: string) => `Error loading credits: ${message}`,
    LOADING_LINKS: (message: string) => `Error loading links: ${message}`,
    GENERIC: (error: unknown) => `Error: ${JSON.stringify(error)}`,
};

export const EMPTY = {
    WORKS: 'No works yet. Create your first one.',
    PEOPLE: 'No people in the directory yet.',
    PEOPLE_SEARCH: (search: string) => `No people match "${search}".`,
    CREDITS: 'No credits yet.',
    LINKS: 'No links yet.',
    WORK_DESCRIPTION: 'No description. Click to add one.',
};

export const CONFIRM = {
    REMOVE_CREDIT: 'Remove this credit?',
    REMOVE_LINK: 'Remove this link?',
    DELETE_WORK: (title: string) => `Delete "${title}"? This cannot be undone.`,
};

export const LOADING_STATES = {
    ADDING: 'Adding\u2026',
    CREATING: 'Creating\u2026',
    DELETING: 'Deleting\u2026',
};
