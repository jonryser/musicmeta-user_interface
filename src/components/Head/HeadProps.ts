export default interface HeadProps {
    data: HeadData;
    default?: PageTags;
    root?: string;
}

// NOTE: This interface should include all and only data that is being passed into the component
export interface HeadData {
    link?: LinkData[];
    meta?: MetaData[];
    script?: ScriptData[];
    title?: string;
}

// Must be in this order so the attributes are built per SEO team's specifications.
export enum LinkAttr {
    as = 'as',
    crossorigin = 'crossorigin',
    href = 'href',
    hreflang = 'hreflang',
    media = 'media',
    rel = 'rel',
    sizes = 'sizes',
    type = 'type',
}

export interface LinkData {
    [LinkAttr.as]?: string;
    [LinkAttr.crossorigin]?: string;
    [LinkAttr.href]?: string;
    [LinkAttr.hreflang]?: string;
    [LinkAttr.media]?: string;
    [LinkAttr.rel]?: string;
    [LinkAttr.sizes]?: string;
    [LinkAttr.type]?: string;
}

export interface LinkTags {
    canonical?: string[];
    dnsFetch?: string[];
    icon?: string[];
    pingback?: string[];
    preconnect?: string[];
    preloadFetch?: string[];
    preloadScript?: string[];
    preloadStyle?: string[];
    stylesheet?: string[];
}

// Must be in this order so the attributes are built per SEO team's specifications.
export enum MetaAttr {
    name = 'name',
    property = 'property',
    httpEquiv = 'httpEquiv',
    charSet = 'charSet',
    content = 'content',
    className = 'className',
}

export interface MetaData {
    [MetaAttr.charSet]?: string;
    [MetaAttr.className]?: string;
    [MetaAttr.content]?: string;
    [MetaAttr.httpEquiv]?: string;
    [MetaAttr.name]?: string;
    [MetaAttr.property]?: string;
}

export interface MetaTags {
    charSet?: string;
    className?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}

export interface PageTags {
    link?: LinkTags;
    meta?: MetaTags[];
    script?: ScriptTags[];
    style?: string[];
}

// Must be in this order so the attributes are built per SEO team's specifications.
export enum ScriptAttr {
    async = 'async',
    defer = 'defer',
    src = 'src',
    type = 'type',
}

export interface ScriptData {
    [ScriptAttr.async]?: boolean;
    custom?: {[key: string]: string};
    [ScriptAttr.defer]?: boolean;
    [ScriptAttr.src]?: string;
    [ScriptAttr.type]?: string;
    value?: string;
}

export interface ScriptTags {
    [key: string]: ScriptData;
}

export interface SimpleJson {
    [key: string]: string;
}
