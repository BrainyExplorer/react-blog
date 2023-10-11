import React, { useState, useEffect } from 'react'
import {
    VideoCameraTwoTone,
    HomeTwoTone,
    SmileTwoTone,
    SettingTwoTone,
    AppstoreTwoTone
} from '@ant-design/icons';
import Router from 'next/router';
import axios from 'axios';
import servicePath from '../../config/apiUrl';


import styles from './Header.module.css'

import { Row, Col, Menu, } from 'antd'
const Header = () => {

    const [navArray, setNavArray] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, [])

    const handleClick = (e) => {
        // if (e.key == 0) {
        //     Router.push('/')
        // } else {
        //     Router.push('/list?id=' + e.key)
        // }
        switch (e.key) {
            case '00':
                Router.push('/')
                break;
            case '01':
                Router.push('/')
            case '1':
                Router.push('/list?id=' + e.key)
            default:
                break;
        }
    }

    return (
        <div className={styles.header}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className={styles.header_logo}>小熊软糖</span>
                    <span className={styles.header_txt}>专注前端开发,一名有经验的前端工程师。</span>
                </Col>

                <Col className={styles.menu_div}
                 xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" 
                    onClick={handleClick}>
                        <Menu.Item key='00'>
                            <HomeTwoTone twoToneColor="blue" />
                            <span>首页</span>
                        </Menu.Item>
                        < Menu.Item key = '01' >
                            <AppstoreTwoTone twoToneColor = "#eb2f96" />
                            <span>归档</span>
                        </Menu.Item>
                        <Menu.SubMenu key="02" title="分类" icon={<SettingTwoTone  twoToneColor="blue"/>}>
                            {
                            navArray.map(item => {
                                return(
                                    <Menu.Item key={item.Id}>
                                        <VideoCameraTwoTone twoToneColor="#eb2f96" />
                                        <span>{item.typeName}</span>
                                    </Menu.Item>
                                )
                            })
                        }
                        </Menu.SubMenu>
                        
                        <Menu.Item key="03">
                            <SmileTwoTone twoToneColor="#52c41a" />
                            <span>生活</span>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div >
    )

}
export default Header