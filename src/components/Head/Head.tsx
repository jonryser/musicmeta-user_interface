import React from 'react';
import NextHead from 'next/head';
// Components.
import HeadProps, {
    HeadData,
    LinkAttr,
    LinkData,
    LinkTags,
    MetaAttr,
    MetaData,
    ScriptAttr,
    ScriptData,
    ScriptTags,
    SimpleJson,
} from './HeadProps';
import HeadState from './HeadState';
// Utilities.
import { removeProtocolOrSlash } from './../../utils/Text';
// Constants.
import { ROOT_TOKEN } from './../../constants/AppConstants';

/**
 * NOTE: keys should be generated in the following convention:
 * {tagName}-{{relValueIfAvailable}-}{srcWithProtocolRemovedOrFronSlasheRemoved}
 */
export default class Head extends React.PureComponent<HeadProps, HeadState> {

    constructor(props: HeadProps) {
        super(props);
        this.state = this.buildStateObject(props.data || {});
    }

    // This should be looked at and potentially updated to getDerivedStateFromProps in future versions.
    // UNSAFE_componentWillReceiveProps will go away in React version 17!!!
    UNSAFE_componentWillReceiveProps(nextProps: HeadProps) {
        const newData = nextProps.data || {};
        if (JSON.stringify(newData) !== JSON.stringify(this.props.data || {})) {
            this.setState(this.buildStateObject(newData));
        }
    }

    render() {
        const state: HeadState = this.state;
        return this.props.data || this.props.default ? (
            <NextHead>
                {/* Meta tags MUST be first. DO NOT add anything above these. */}
                {state.meta}
                {/* Title MUST come after meta tags. DO NOT add anything above this. */}
                {state.title}
                {state.link}
                {state.style}
                {this.props.children}
                {state.script}
            </NextHead>
        ) : null;
    }

    private buildStateObject = (data: HeadData): HeadState => {
        return {
            link: this.getLinkTags(data.link),
            meta: this.getMetaTags(data.meta),
            script: this.getScriptTags(data.script),
            style: this.getStyles(),
            title: this.getTitleTag(data.title),
        };
    }

    private getLinks = (link: string[], rel: string, asValue?: string): JSX.Element[] => {
        const linkTags: string[] = link && Array.isArray(link) ? link : [];
        return linkTags.map((linkTag: string, index: number): JSX.Element => {
            if (linkTag && typeof linkTag === 'string') {
                const props: LinkData = {
                    [LinkAttr.href]: linkTag.replace(ROOT_TOKEN, this.props.root),
                    [LinkAttr.rel]: rel,
                };
                if (asValue) { props[LinkAttr.as] = asValue; }
                const key: string = `${rel}${asValue || ``}-${removeProtocolOrSlash(linkTag)}`;
                return (
                    <React.Fragment key={`headLinkDefault${key}${index}`}>
                        <link key={`link-${key}`} {...props} />
                    </React.Fragment>
                );
            }
        });
    }

    private getLinkTags = (link: LinkData[]): JSX.Element[] => {
        let linkArray: JSX.Element[] = [];
        const linkDefaults: LinkTags = this.props.default && this.props.default.link ? this.props.default.link : {};
        const dnsfetch: JSX.Element[] = this.getLinks(linkDefaults.dnsFetch, `dns-prefetch`);
        const preconnect: JSX.Element[] = this.getLinks(linkDefaults.preconnect, `preconnect`);
        const preloadFetch: JSX.Element[] = this.getLinks(linkDefaults.preloadFetch, `preload`, `fetch`);
        const preloadScript: JSX.Element[] = this.getLinks(linkDefaults.preloadScript, `preload`, `script`);
        const preloadStyle: JSX.Element[] = this.getLinks(linkDefaults.preloadStyle, `preload`, `style`);
        const stylesheet: JSX.Element[] = this.getLinks(linkDefaults.stylesheet, `stylesheet`);
        if (link && Array.isArray(link) && link.length > 0) {
            linkArray = link.map((linkData: LinkData, index: number): JSX.Element => {
                if (linkData && typeof linkData === 'object') {
                    const props: LinkData = {};
                    for (const prop in LinkAttr) {
                        if (linkData.hasOwnProperty(prop)) { props[prop] = linkData[prop]; }
                    }
                    if (Object.keys(props).length + 1) {
                        const key: string =
                            `${(props.rel || ``)}${(props.hreflang || ``)}${(removeProtocolOrSlash(props.href) || ``)}`;
                        return (
                            <React.Fragment key={`headLink${index}`}>
                                <link key={`link-${key || index}`} {...props} />
                            </React.Fragment>
                        );
                    }
                }
            });
        }
        linkArray = preloadStyle.concat(linkArray);
        linkArray = preloadScript.concat(linkArray);
        linkArray = preloadFetch.concat(linkArray);
        linkArray = preconnect.concat(linkArray);
        linkArray = dnsfetch.concat(linkArray);
        linkArray = stylesheet.concat(linkArray);
        return linkArray;
    }

    private getMetaTags = (meta: MetaData[]): JSX.Element[] => {
        const metaDefaults: MetaData[] = this.props.default && this.props.default.meta ? this.props.default.meta : [];
        const metaTags: MetaData[] = meta && Array.isArray(meta) ? meta : [];
        const allMetaTags: MetaData[] = metaDefaults.concat(metaTags);
        return allMetaTags.map((metaData: MetaData, index: number): JSX.Element => {
            if (metaData && typeof metaData === 'object') {
                const props: MetaData = {};
                for (const prop in MetaAttr) {
                    if (metaData.hasOwnProperty(prop)) { props[prop] = metaData[prop]; }
                }
                if (Object.keys(props).length + 1) {
                    const key: string =
                        `${props.name ? props.name :
                            props.property ? props.property :
                                props.httpEquiv ? props.httpEquiv :
                                    props.charSet ? props.charSet :
                                        index}`;
                    return (
                        <React.Fragment key={`headLink${index}`}>
                            <meta {...props} key={`meta-${key}`} />
                            <>{'\n'}</>
                        </React.Fragment>
                    );
                }
            }
        });
    }

    /**
     * Processes the default script data.
     * This script data has a different structure than the data returned from the CMS.
     */
    private getScripts = (scripts: ScriptTags[]): JSX.Element[] => {
        const scriptTags: ScriptTags[] = scripts && Array.isArray(scripts) ? scripts : [];
        return scriptTags.map((scriptTag: ScriptTags, index: number): JSX.Element => {
            if (scriptTag && typeof scriptTag === 'object') {
                for (const script in scriptTag) {
                    if (scriptTag.hasOwnProperty(script)) {
                        const currentScript: ScriptData = scriptTag[script];
                        const props: ScriptData = {
                            [ScriptAttr.src]: script.replace(ROOT_TOKEN, this.props.root),
                        };
                        const customAttributes: SimpleJson = currentScript.custom as SimpleJson;
                        if (script === 'inline' && currentScript.type && currentScript.value) {
                            return (
                                <React.Fragment key={`headScriptDefault${index}`}>
                                    <script
                                        key={`script-${currentScript.type}${index}`}
                                        type={currentScript.type}
                                        dangerouslySetInnerHTML={{ __html: currentScript.value }}
                                    />
                                </React.Fragment>
                            );
                        }
                        if (currentScript.async) { props[ScriptAttr.async] = currentScript.async; }
                        if (currentScript.defer) { props[ScriptAttr.defer] = currentScript.defer; }
                        if (customAttributes) {
                            for (const custAttr in customAttributes) {
                                if (customAttributes.hasOwnProperty(custAttr)) {
                                    props[custAttr] = customAttributes[custAttr].replace(ROOT_TOKEN, this.props.root);
                                }
                            }
                        }
                        return (
                            <React.Fragment key={`headScriptDefault${index}`}>
                                <script
                                    key={`script-${removeProtocolOrSlash(props[ScriptAttr.src]) || index}`}
                                    {...props}
                                />
                            </React.Fragment>
                        );
                    }
                }
            }
        });
    }

    /**
     * Processes dynamic script data.
     * This script data has a different structure than the default data.
     */
    private getScriptTags = (script: ScriptData[]): JSX.Element[] => {
        let scriptArray: JSX.Element[] = [];
        let seoTags: JSX.Element[] = [];
        const scriptDeafults: ScriptTags[] =
            this.props.default && this.props.default.script ? this.props.default.script : [];
        const defaultTags: JSX.Element[] = this.getScripts(scriptDeafults);
        if (script && Array.isArray(script) && script.length > 0) {
            scriptArray = script.map((scriptData: ScriptData, index: number) => {
                if (scriptData.type && scriptData.value) {
                    if (scriptData.type === 'application/ld+json') {
                        return;
                    }
                    return (
                        <React.Fragment key={`headScript${index}`}>
                            <script
                                key={`script-${scriptData.type}${index}`}
                                type={scriptData.type}
                                dangerouslySetInnerHTML={{ __html: scriptData.value }}
                            />
                        </React.Fragment>
                    );
                } else if (scriptData.src) {
                    const props: ScriptData = {};
                    for (const prop in ScriptAttr) {
                        if (scriptData.hasOwnProperty(prop)) { props[prop] = scriptData[prop]; }
                    }
                    if (Object.keys(props).length + 1) {
                        const key: string = `${(removeProtocolOrSlash(props.src) || ``)}`;
                        return (
                            <React.Fragment key={`headScript${index}`}>
                                <script key={`script-${key || index}`} {...props} />
                            </React.Fragment>
                        );
                    }
                }
            });
            seoTags = script.map((scriptData: ScriptData, index: number) => {
                if (scriptData.type && scriptData.type === 'application/ld+json' && scriptData.value) {
                    return (
                        <React.Fragment key={`headSeoScript${index}`}>
                            <script
                                key={`script-${scriptData.type}${index}`}
                                type={scriptData.type}
                                dangerouslySetInnerHTML={{ __html: scriptData.value }}
                            />
                        </React.Fragment>
                    );
                }
            });
        }
        return seoTags.concat(defaultTags.concat(scriptArray));
    }

    private getStyles = (styles?: string[]): JSX.Element => {
        const initialStyles: string[] = this.props.default && this.props.default.style ? this.props.default.style : [];
        const styleTags: string[] = styles && Array.isArray(styles) ? styles : [];
        const allStyleTags: string[] = initialStyles.concat(styleTags);
        let content: string = ``;
        for (const style of allStyleTags) {
            if (style) {
                content += style;
            }
        }
        return content && <React.Fragment key={`headStyle`}><style>{content}</style></React.Fragment>;
    }

    private getTitleTag = (title: string): JSX.Element => {
        return title && <React.Fragment><title key={`title-${title}`}>{title}</title><>{'\n'}</></React.Fragment>;
    }
}
