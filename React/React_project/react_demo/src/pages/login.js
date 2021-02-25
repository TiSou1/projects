import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd'
import {useHistory} from 'react-router-dom'
const FormItem = Form.Item;

export default function Login() {
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const history = useHistory();
    return (
        <Form className='login-form'>
            <FormItem>
                <Input placeholder='输入用户名' maxLength={10} onChange={(e) => setName(e.target.value)} />
            </FormItem>
            <FormItem>
                <Input placeholder='输入密码' maxLength={16} type='password' onChange={(e) => { setPwd(e.target.value) }} />
            </FormItem>
            <label>{name}--{pwd}</label>
            <FormItem>
                <Button type='primary' onClick={()=>{
                   login(name,pwd)
                    .then(data=>{
                        if(data.code === 0)
                             history.push('/home');
                            
                    })
                }}>登录</Button>
            </FormItem>
        </Form>
    )
}

function login(name,pwd){
   return fetch('/login.json',{params:{name,pwd}})
        .then(res=>res.json())
}