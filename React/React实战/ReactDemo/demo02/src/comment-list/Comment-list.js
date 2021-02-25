import React, { Component } from 'react';
import CommentItem from "../comment-item/Comment-item"
class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            index:""
         }
    }
    deleteItem = (index)=>{
      this.props.deleteItem(index);
      this.setState({
          index:index
      });
    }
    render() { 
       const {people} = this.props;
       const display = people.length==0?"block":"none";
        return ( 
            <div className="comment-list">
                  <h2>评论回复:</h2>
                  <h3 style={{display:display}}>暂无评论,点击左侧添加评论!!!</h3>
                <ul>
                   {
                       people.map((c,index)=>{
                           return <CommentItem 
                           index={index}
                           comment={c}
                           key={index}
                           deleteItem={this.deleteItem}
                           />
                       })
                   }
                </ul>
            </div>
         );
    }
}
 
export default CommentList;