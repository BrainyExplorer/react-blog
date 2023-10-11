import React, { lazy } from "react";
import App, { authLoader } from "../pages/App";
import ErrorPage from "../components/ErrorPage";

import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  DashboardOutlined,
  EditOutlined,
  TableOutlined,
  BarsOutlined,
  UserOutlined,
  SettingOutlined,
  DesktopOutlined
} from "@ant-design/icons";


// const Login = lazy(() => import("../pages/login/Login"))
import Login from "../pages/login/Login"
import Category from '../pages/category/index.jsx'
import AddArticle from "../pages/article/AddArticle"
import ArticleList from '../pages/article/ArticleList'
// const AddArticle = lazy(() => import("../pages/article/AddArticle"));
// const ArticleList = lazy(() => import("../pages/article/ArticleList"));

// const Category = lazy(() => import('../pages/category/index.jsx'))




const routes = [
  {
    path: "/",
    element: <App />,
    loader: authLoader,
    children: [
      {
        // errorElement: <ErrorPage />,
        children: [
          // {
          //   index: true,
          //   title: "工作台",
          //   icon: <DashboardOutlined />,
          //   element: <Category />,
          // },
          {
            path: "category",
            title: "文章分类",
            icon: <TableOutlined />,
            element: <Category />,
          },
          // {
          //   path: "detail",
          //   title: "详情页",
          //   icon: <BarsOutlined />,
          //   element: <DetailPage />,
          // },
          {
            path: "article",
            title: "文章管理",
            icon: <UserOutlined />,
            children: [
              {
                path: "/article/addArticle/:id",
                title: "添加文章",
                icon:<DesktopOutlined />,
                element: <AddArticle />,
              },
              {
                path: "/article/articleList",
                title: "文章列表",
                icon:<SettingOutlined />,
                element: <ArticleList />,
              },
            ],
          },
          {
            path: "*",
            element: <Navigate to="/" replace={true} />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    // errorElement: <ErrorPage />,
  },
];

export { routes };

export default createBrowserRouter(routes);
