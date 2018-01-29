import React from 'react'
import createReactClass from 'create-react-class';

React.createClass = createReactClass;

export default React.createClass({
    render() {
        console.log(this.props.match.params);
        console.log(this.props);


        return (
            <div>
                <h2>{this.props.match.params.loca + this.props.match.params.koka}</h2>
            </div>
        )
    }
})

