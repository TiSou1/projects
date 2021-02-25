import React from "react";
import PropTypes from "prop-types";

class LiItem extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
}
//组件第一次存在dom中,函数不会执行
//如果已经存在dom中,函数才会被执行
shouldComponentUpdate(nextProps,nextstate){
    //console.log("child-Update");
    if(nextProps.value!==this.props.value){
        return true;
    }
    return false;
}
    render(){
        console.log("child-render");
        return (
            <li onClick={this.handleClick}>{this.props.name+this.props.value}</li>
        );
}
    handleClick(){
        //console.log(this.props.index);
        this.props.onDeleteClick(this.props.index);
    }
}
LiItem.propTypes = {
    value:PropTypes.string,
    index:PropTypes.number,
    onDeleteClick:PropTypes.func
}
LiItem.defaultProps = {
    name:"Siry-"
}


export default LiItem;