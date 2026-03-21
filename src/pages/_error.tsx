import React from 'react';
import { ERRORS } from '../constants/messages';

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
                    ERRORS.SERVER_ERROR(this.props.statusCode)
                    : ERRORS.CLIENT_ERROR}
            </p>
        );
    }
}
