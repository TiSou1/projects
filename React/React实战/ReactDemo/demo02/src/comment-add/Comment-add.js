import React, { Component } from 'react';
class CommentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            text:""
         }
        this.submitClick = this.submitClick.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.textareaChange = this.textareaChange.bind(this);
    }
    submitClick(event){
        const comment = this.state;
        this.props.addComment(comment);
        this.setState({
            name:"",
            text:""
        });
        //清除默认行为
        event.preventDefault();
    }
    inputChange(e){
        this.setState({
            name:e.target.value
        });
    }
    textareaChange(e){
       this.setState({
        text:e.target.value
       });
    }
    render() { 
        return (  
            <div className="comment-add">
                <form  onSubmit={this.submitClick}>
                    <fieldset>
                    <legend>AddComment:</legend>
                    <p>用户名</p>
                    <input 
                    type="text"
                    placeholder="用户名" 
                    value={this.state.name}
                    onChange={this.inputChange}
                     />                           
                    <p>评论内容</p>
                    <textarea 
                    rows="5"
                    cols="23"
                    placeholder="评论内容"
                     value={this.state.text} 
                     onChange={this.textareaChange}
                     >
                    </textarea><br />
                    <input type="submit" value="提交" id="additem"/>
                    </fieldset>
                </form>
            </div>
        );
    }
}
 
export default CommentAdd;