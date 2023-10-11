import React, { useState,useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd'
import { CalendarTwoTone, FolderOpenTwoTone, FireTwoTone } from '@ant-design/icons';

import Header from '../components/header/Header.js'
import Author from '../components/author/Author'
import Advert from '../components/advert/Advert'
import Footer from '../components/footer/Footer'

import styles from '../styles/Home.module.css'
import 'highlight.js/styles/monokai-sublime.css'
import axios from 'axios';
import { marked } from 'marked';
import hljs from 'highlight.js';
import servicePath from '../config/apiUrl.js';
import Link from 'next/link';

export default function MyList(list) {
  const [mylist, setMylist] = useState(list.data)
  useEffect(() => {
    setMylist(list.data)
  })
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,//这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
    gfm: true,       //启动类似Github样式的Markdown,填写true或者false
    pedantic: false,   //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false,   // 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    tables: true,       //支持Github形式的表格，必须打开gfm选项
    break: false,       //支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true,   //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    smartypants: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  })
  function createMarkup(item) {
    return { __html: item.introduce }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Header></Header>
      <Row className="comm-left" type="flex" justify='center'>
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List head={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className={styles.list_title}>
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className={styles.list_icon}>
                    <CalendarTwoTone twoToneColor="#52c41a" /><span>{item.addTime}</span>
                    <FolderOpenTwoTone twoToneColor="#eb2f96" /><span>{item.typeName}</span>
                    <FireTwoTone twoToneColor="orange" /><span>{item.view_count}</span>
                  </div>
                  <div className={styles.list_context}
                  dangerouslySetInnerHTML={createMarkup(item)}
                  ></div>
                </List.Item>
              )}
            >

            </List>
          </div>
        </Col>
        <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer></Footer>

    </div>
  )
}

MyList.getInitialProps = async (context) => {

  let id = context.query.id
  console.log(id,'id')
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(
      (res) => resolve(res.data)
    )
  })
  return await promise
}