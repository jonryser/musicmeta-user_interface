import React from 'react';

interface ErrorProps {
    statusCode: number;
}

export default class Error extends React.PureComponent<ErrorProps> {

    static getInitialProps({ res, err }) {
        const statusCode: number = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode };
    }

    render() {
        return (
            <p>
                {this.props.statusCode ?
                    `An error ${this.props.statusCode} occurred on server`
                    : 'An error occurred on client'}
            </p>
        );
    }
}
