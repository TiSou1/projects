import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
class Page extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            lists: [
                { name: "Siry", id: 23 },
                { name: "TiSoul", id: 22 },
                { name: "wnagtsd", id: 20 },
            ]
         }
         //this.props.history.push("/home")
    }
    render() { 
        return ( 
            <div>
              
                <h1>页面</h1>
                <ul>
                    {
                        this.state.lists.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/list/${item.id}`}>{item.name}</Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
         );
    }
}
 
export default Page;