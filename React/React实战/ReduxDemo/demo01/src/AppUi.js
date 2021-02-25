import React from 'react';
import 'antd/dist/antd.css';//引入样式
import { Button, Input, List } from 'antd';
function AppUi(props){ 
        return ( 
            <div>
            <div>
                <Input
                    placeholder="输入："
                    className="inputValue" 
                    onChange={props.onChange}
                    value={props.inputValue}/>
                <Button type="primary" onClick={props.onClick}>确定</Button>
            </div>
            <div className="list">
                <List
                    bordered
                    dataSource={props.list}
                    renderItem={(item,index) =>{                 
                   return (
                   <List.Item onClick={()=>props.deleteItem(index)}>
                        {item}
                    </List.Item>
                    )}
                }
                     />
            </div>
        </div>
         );
}
 
export default AppUi;