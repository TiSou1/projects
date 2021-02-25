import React, { Component } from 'react';
class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    //箭头函数绑定this
    deleteItem = ()=>{
     // console.log(this.props.index);
     if(window.confirm(`确定删除${this.props.comment.name}的评论?`)){
        this.props.deleteItem(this.props.index);
     }    
    }
    componentDidMount(){
        console.log("CommentItem-conponentDidMount");
    }
    componentDidUpdate(){
        console.log("CommentItem-componentDidUpdate");
    }
    render() { 
      const {comment} = this.props;
     
        return (           
            <li>
                <div className="comment-item">
                    <button className="delete-item" onClick={this.deleteItem}>删除</button>
                    <h2 className="guy-say">{comment.name}说:</h2>
                    <p className="guy-say-conent">{comment.text}</p>
                </div>
            </li>               
         );
    }
}
 
export default CommentItem;