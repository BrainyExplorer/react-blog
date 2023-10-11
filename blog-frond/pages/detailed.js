import React from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix, } from 'antd'
import { CalendarTwoTone, FolderOpenTwoTone, FireTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { marked } from 'marked';
import hljs from 'highlight.js';

import servicePath from '../config/apiUrl';


import Header from '../components/header/Header'
import Author from '../components/author/Author'
import Advert from '../components/advert/Advert'
import Footer from '../components/footer/Footer'
import Tocify from '../components/tocify/Tocify.tsx'


import styles from './detailed/detailed.module.css'
import 'highlight.js/styles/monokai-sublime.css'

const Detailed = (props) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

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

  let html = marked.parse(props?.article_content)

  function createMarkup() {
    return { __html: html }
  }

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className={styles.comm_main} type="flex" justify="center">
        <Col className={styles.comm_left} xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className={styles.bread_div}>
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className={styles.detailed_title}>
                React实战视频教程-小熊软糖Blog开发(更新08集)
              </div>

              < div className = {
                [styles.list_icon, styles.center].join(' ')
              } >
                <CalendarTwoTone twoToneColor="#52c41a" /> <span> 2022-01-01  </span>
                <FolderOpenTwoTone twoToneColor="#eb2f96" /> <span> 视频教程  </span>
                <FireTwoTone twoToneColor="orange" /><span> 5498  </span>
              </div>

              <div className={styles.detailed_content}
                dangerouslySetInnerHTML={createMarkup()}>
              </div>

            </div>

          </div>
        </Col>

        <Col className={styles.comm_right} xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />

    </>
  )
}

export default Detailed

Detailed.getInitialProps = async (context) => {
  console.log(context.query.id);
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById+ id).then(
      (res) => {
        if (res.data.data !== undefined) {
          resolve(res.data.data[0])
        }
      }
    )
  })
  return await promise
}