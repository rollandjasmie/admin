import React, { Component } from 'react';
import './DropDown.scss';

export default class DropDown extends Component {
    render() {
        return (
            <div className={`custom-dropdown ${this.props.className ? this.props.className : ''} `}>
            
                <div className="titre">{ this.props.title }</div>
                <div className="content">
                    { this.props.children }
                </div>
            </div>

        )
    }
}
