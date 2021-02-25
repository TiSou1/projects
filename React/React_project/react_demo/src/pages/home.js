import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom'
import './home.scss'
import { OmitProps } from 'antd/lib/transfer/ListBody';
export default function Home() {
    const columns = [
        {
            title: '地区',
            dataIndex: 'area'
        },
        {
            title: 'java',
            dataIndex: 'java'
        },
        {
            title: 'python',
            dataIndex: 'python'
        },
        {
            title: 'php',
            dataIndex: 'php'
        },
        {
            title: 'node',
            dataIndex: 'node'
        },
        {
            title: 'js',
            dataIndex: 'js'
        }
    ];

    const [data, setDate] = useState([]);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                const res = data;
                if (res.code === 0)
                    setDate(res.data)
            })
    }, []);
    const list = ['语言动态','语言地图','语言热搜','语音播报'];
    return <div className='home'>
        <h1>语言大数据报告</h1>
        <div className='wrap'>
            <div className='nav'>
                {
                    list.map((item,ind)=>{
                        return (
                        <a className={index == ind ? "checked" :""} onClick={()=>setIndex(ind) } key={ind}>{item}</a>
                        )
                    })
                    
                }
            </div>
            <p>数据来自网络</p>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}></Table>
            <Link to='/home'>返回首页</Link>
        </div>
    </div>
}
