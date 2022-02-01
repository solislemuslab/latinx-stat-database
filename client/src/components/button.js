import React, { Component } from "react";

class Button extends Component {
    render() {
        return (
            <div className="button">
                {this.props.label}
            </div>
        );
    }
}

export default Button;