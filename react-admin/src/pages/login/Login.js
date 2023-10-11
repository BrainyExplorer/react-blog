import React, { useState, Suspense } from 'react';
import { Card, Input, Button, Spin, message } from 'antd';
import { UserOutlined ,KeyOutlined} from '@ant-design/icons';
import { useLoginStore } from '../../stores/index'
import "../../static/css/Login.css"

import { useNavigate } from "react-router-dom"


function Login() {
    let navigate = useNavigate();
    const {login} = useLoginStore()
    
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = ()=>{
        setIsLoading(true)
        if(!userName){
            message.error('用户名不能为空')
        }else if(!password){
            message.error('密码不能为空')
        }
        let dataProps={
            'userName':userName,
            'password':password
        }
       
        login(dataProps,setIsLoading,navigate)
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }

    return (
        <div className="login-div">
            <Suspense fallback={<Spin size="large" tip="Loading..." spinning={isLoading} className="globa_spin" />}>
                <Card title="小熊 Blog  System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserOutlined  />}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined />}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Suspense>
        </div>
    )
}
export default Login