import React, { Component } from 'react'

class Response extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
            {this.props.reponse?(<>{this.props.reponse}</>):null}
            </>
        );
    }
}

export default Response;