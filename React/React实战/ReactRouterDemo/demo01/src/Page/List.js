import React, { Component } from 'react';

class LIst extends Component {
    state = {
        id: null,
      
    }

    componentDidMount() {
        console.log(this.props);
        let { id } = this.props.match.params;
        this.setState({
            id
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>列表id:{this.state.id}</h1>              
            </React.Fragment>

        );
    }
}

export default LIst;