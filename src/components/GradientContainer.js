import React, { Component } from 'react'

export class GradientContainer extends Component {
    render() {
        return (
            <div style={{background: this.props.gradient}}>
                {this.props.children.map(c => <div key={c}>{c}</div>)}
            </div>
        )
    }
}

export default GradientContainer
