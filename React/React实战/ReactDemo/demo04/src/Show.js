import React, { Component } from 'react';

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { citys} = this.props;
      
        return (
            <div>
                {
                    citys.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>{item.city}</p>
                                <p>{item.tmp}℃</p>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Show;