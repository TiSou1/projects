import React, { Component } from 'react';
import axios from "axios";
class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enter: true,
            loading: false,
            shows: null,
            error: null
        }
    }
    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillReceiveProps(newProps) {
        console.log("componentDidUpdate");
        const { inputName } = newProps;
        //更新状态
        this.setState({
            enter: false,
            loading: true
        });
        //发送请求
        const url = `https://api.github.com/search/users?q=${inputName}`;
        axios.get(url)
            .then((res) => {
                console.log(res);
                const { data } = res;
                console.log(data);
                const users = data.items.map((value, index) => {
                    return (
                        {
                            name: value.login,
                            avatar_url:value.avatar_url,
                            url: value.html_url
                        }
                    );
                });
                //更新状态
                this.setState({
                    loading:false,
                    shows: users
                });

            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading:false,
                    error:error.message
                });
            })
    }

    render() {
        const { enter, loading, shows, error } = this.state;
        if (enter) {
            return <p>请输入用户名</p>
        } else if (loading) {
            return <p>正在查询</p>
        } else if (error) {
            return <p>{error.message}</p>
        } else {
            return (
                <div>
                    {
                        shows.map((value, index) => {
                            return(
                            <div key={index} className="card">
                                <a href={value.url}>
                                    <img src={value.avatar_url} alt="头像"style={{width:100}}/>
                                </a>
                                <p>{value.name}</p>
                            </div>
                            )
                        })
                 }
                </div>
            );
        }

    }
}

export default Show;