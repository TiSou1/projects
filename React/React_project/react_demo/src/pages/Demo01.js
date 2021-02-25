import React from 'react';
import './App.scss';
import {Input,Button} from 'antd'
import 'antd/dist/antd.css'
const {Search} = Input;
class App extends React.Component {
  state = {
    list: [],
    value:''
  }
  handleChange = (e) => {
    let value = e.target.value;
    this.setState({
      value
    })
  }
  handleAdd = () => {
    const { list, value } = this.state;
    this.setState({
      list: [...list, value],
      value:''
    })
  }
  render() {
    const { list, value } = this.state;
    return (
      <div>
        tisou1
        <h1>hellow world</h1>
        <Input type='text' onChange={this.handleChange} style={{width:300}} value={value} />
        <Button type='primary' onClick={this.handleAdd}>添加</Button>
        <ul>
          {
            list.map((item, index) =>
              <li key={index}>{item}</li>
            )
          }
        </ul>
        <div>
          <Search enterButton='添加' style={{width:350 }}/>
        </div>
      </div>
    );
  }
}

export default App;
