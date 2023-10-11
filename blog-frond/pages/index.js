import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Row, Col, List, } from 'antd'
import { CalendarTwoTone, FolderOpenTwoTone, FireTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'animate.css';


import Header from '../components/header/Header.js'
import Author from '../components/author/Author'
import Advert from '../components/advert/Advert'
import Footer from '../components/footer/Footer'

import servicePath from '../config/apiUrl';

import styles from '../styles/Home.module.css'
import 'highlight.js/styles/monokai-sublime.css'

import profilePic from "../static/image/img/4.jpg"

export default function Home(list) {
  const renderer = new marked.Renderer()
  const [stripe, setStripe] = useState(null)

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

  const [mylist, setMylist] = useState(list.data)
  return (
    <div className={styles.container}>
       <Header></Header>
       <section className={styles.section1}>内容1</section>
       <section>内容2</section>
       <section>内容3</section>
       <section>内容4</section>

    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        resolve(res.data)
      }
    )
  })
  return await promise
}


