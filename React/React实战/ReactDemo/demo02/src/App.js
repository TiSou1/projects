import React, { Component } from 'react';
import CommentAdd from "./comment-add/Comment-add";
import CommentList from "./comment-list/Comment-list";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          people:[
              {name:"Tom",text:"react挺难!"},
              {name:"Jack",text:"react不错!"},
              {name:"Siry",text:"react"}
            ]
         }
         this.addComment = this.addComment.bind(this);
    }
    //添加评论
    addComment(comment){
        //console.log(name,text);
        const {people} = this.state;
        people.unshift(comment);
        //更新状态
        this.setState({
            people:people
        });

    }
    //删除评论
    deleteItem = (index)=>{
        let {people} = this.state; 
        people.splice(index,1);
        this.setState({
            people
        });
    }
    componentDidMount(){
        console.log("App-conponentDidMount");
    }
    componentDidUpdate(){
        console.log("App-componentDidUpdate");
    }
    render() { 
      
        return (  
            <div className="main-content">
                <h1 className="head-title">请发表对React的评论</h1>
                <div>
                     <CommentAdd addComment={this.addComment}/>
                     <CommentList 
                    people={this.state.people}
                    deleteItem={this.deleteItem}
                     />
                </div>
            </div>
        );
    }
}
 
export default App;