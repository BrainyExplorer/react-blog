import React, { useState, useEffect, Suspense } from 'react'
import { Layout, Menu, Breadcrumb, Spin } from 'antd';

import {
    Outlet,
    useNavigate,
    useLocation,
    Navigate
} from "react-router-dom";
import { routes } from "../config/router";
import { useLoginStore } from "../stores/index"
import "../static/css/AdminIndex.css"
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export function authLoader() {
    return {
        isAdmin: true
    };
}

const App = () => {
    const navigate=useNavigate()
    const {pathname} = useLocation();
    const { userInfo } = useLoginStore();
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed );
    };
    const getItems = (children) => {
        return children?.map((item) => {
            return {
                key: item.index ?
                    "/" :
                    item.path .startsWith("/") ?
                    item.path :
                    `/${item.path}`,
                icon: item.icon,
                label: item.title,
                children: item.children ? getItems(item.children) : null,
            };
        });
    };
    const menuItems = getItems(
        routes[0].children[0].children?.filter((item) => item.path !== "*")
    );
    const onMenuClick = ({key}) => {
        navigate(key);
    };
    const renderOpenKeys = () => {
        const arr = pathname.split("/").slice(0, -1);
        const result = arr.map(
            (_, index) => "/" + arr.slice(1, index + 1).join("/")
        );
        return result;
    };
    
    if (!userInfo) {
        return <Navigate to="/login" replace={true} />;
      }

    return (
        <Suspense fallback={<Spin size="large" className="globa_spin"/>}>
        <>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                {/* 
                <Menu>
                    <SubMenu 
                    key="sub1"
                    onClick={handleClickArticle}
                     icon={<UserOutlined />} 
                     title="文章管理">
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="articleList">文章列表</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="留言管理">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        Files
                    </Menu.Item>
                </Menu> */}
                < Menu
                    theme = "dark"
                    defaultSelectedKeys = {[pathname]}
                    defaultOpenKeys = {renderOpenKeys()}
                    mode = "inline"
                    items = {menuItems}
                    onClick = {onMenuClick}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <div>
                            <Outlet/>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
        </>
            
    </Suspense>
    );
}

export default App;